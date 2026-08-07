/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import {
  type ConfigurationChangeEvent,
  commands,
  type ExtensionContext,
  window,
  workspace,
} from 'vscode';
import { writeJsonFile } from './fsUtil';
import type {
  Configuration,
  Contrast,
  DarkCursorColor,
  DiagnosticOpacity,
  LightCursorColor,
  SelectionColor,
  ThemeData,
  WorkbenchStyle,
} from './interface';
import { getThemeData } from './themeData';
import { validateConfig } from './validation';

let promptActive = false;

/** Utility class for detecting config changes, reading configuration, and regenerating theme files. */
export default class Utils {
  /** Invoke `onConfigChange` if the event affects any `ravenwood.*` setting. */
  detectConfigChanges(
    event: ConfigurationChangeEvent,
    onConfigChange: () => void,
  ): void {
    if (event.affectsConfiguration('ravenwood')) {
      onConfigChange();
    }
  }
  /** Read all 12 `ravenwood.*` settings from the VS Code workspace configuration. */
  getConfiguration(): Configuration {
    const workspaceConfiguration = workspace.getConfiguration('ravenwood');
    return {
      darkContrast: workspaceConfiguration.get<Contrast>('darkContrast'),
      lightContrast: workspaceConfiguration.get<Contrast>('lightContrast'),
      darkWorkbench:
        workspaceConfiguration.get<WorkbenchStyle>('darkWorkbench'),
      lightWorkbench:
        workspaceConfiguration.get<WorkbenchStyle>('lightWorkbench'),
      darkSelection:
        workspaceConfiguration.get<SelectionColor>('darkSelection'),
      lightSelection:
        workspaceConfiguration.get<SelectionColor>('lightSelection'),
      darkCursor: workspaceConfiguration.get<DarkCursorColor>('darkCursor'),
      lightCursor: workspaceConfiguration.get<LightCursorColor>('lightCursor'),
      italicKeywords: workspaceConfiguration.get<boolean>('italicKeywords'),
      italicComments: workspaceConfiguration.get<boolean>('italicComments'),
      diagnosticTextBackgroundOpacity:
        workspaceConfiguration.get<DiagnosticOpacity>(
          'diagnosticTextBackgroundOpacity',
        ),
      highContrast: workspaceConfiguration.get<boolean>('highContrast'),
    };
  }
  /** Return true iff every configuration value matches its documented default. Treats `undefined` (unset) as the default for each field, so a user who never touched settings is considered default. */
  isDefaultConfiguration(configuration: Configuration): boolean {
    const is = <T>(value: T | undefined, def: T): boolean =>
      value === undefined || value === def;
    return (
      is(configuration.italicKeywords, false) &&
      is(configuration.italicComments, true) &&
      is(configuration.lightWorkbench, 'material') &&
      is(configuration.darkWorkbench, 'material') &&
      is(configuration.lightContrast, 'medium') &&
      is(configuration.darkContrast, 'medium') &&
      is(configuration.darkCursor, 'white') &&
      is(configuration.lightCursor, 'black') &&
      is(configuration.darkSelection, 'grey') &&
      is(configuration.lightSelection, 'grey') &&
      is(configuration.diagnosticTextBackgroundOpacity, '0%') &&
      is(configuration.highContrast, false)
    );
  }
  /** Build the full ThemeData (dark + light) for a configuration via the shared `themeData` module. */
  getThemeData(configuration: Configuration): ThemeData {
    return getThemeData(configuration);
  }
  /** Return true on first activation or after an upgrade (when the stored version differs from the current version). Uses `ExtensionContext.globalState` which persists across extension versions. */
  async isNewlyInstalled(context: ExtensionContext): Promise<boolean> {
    const key = 'ravenwood.installedVersion';
    const currentVersion: string = context.extension.packageJSON.version;
    const storedVersion: string | undefined = context.globalState.get(key);
    if (storedVersion !== currentVersion) {
      await context.globalState.update(key, currentVersion);
      return true;
    }
    return false;
  }
  /** Write both the dark and light theme JSON files in parallel. */
  async generate(
    darkPath: string,
    lightPath: string,
    data: ThemeData,
  ): Promise<void> {
    await Promise.all([
      writeJsonFile(darkPath, data.dark),
      writeJsonFile(lightPath, data.light),
    ]);
  }
  /** Prompt the user to reload the window so VS Code re-reads the regenerated theme JSON files. VS Code caches theme JSON in memory, so overwriting the file on disk is not enough — a window reload is required to apply the changes. */
  promptToReload(): void {
    if (promptActive) {
      return;
    }
    promptActive = true;
    const action = 'Reload window';
    window
      .showInformationMessage(
        'Ravenwood: configuration changed — reload required to apply.',
        action,
      )
      .then((selectedAction: string | undefined) => {
        promptActive = false;
        if (selectedAction === action) {
          commands.executeCommand('workbench.action.reloadWindow');
        }
      });
  }
  /** Return warning strings for any config value that's set but not a valid enum member. Delegates to the pure `validateConfig` helper. */
  validateConfiguration(): string[] {
    return validateConfig(this.getConfiguration());
  }
}
