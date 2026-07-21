/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import * as fs from 'node:fs';
import { join } from 'node:path';
import { type ConfigurationChangeEvent, workspace } from 'vscode';
import type { Configuration, ThemeData } from './interface';
import { getThemeData } from './themeData';

/** Utility class for detecting config changes, reading configuration, and regenerating theme files. */
export default class Utils {
  /** Invoke `onConfigChange` if the event affects any `ravenwood.*` setting. */
  detectConfigChanges(
    // {{{
    event: ConfigurationChangeEvent,
    onConfigChange: () => void,
  ): void {
    if (event.affectsConfiguration('ravenwood')) {
      onConfigChange();
    }
  } // }}}
  /** Read all 12 `ravenwood.*` settings from the VS Code workspace configuration. */
  getConfiguration(): Configuration {
    // {{{
    const workspaceConfiguration = workspace.getConfiguration('ravenwood');
    return {
      darkContrast: workspaceConfiguration.get<string>('darkContrast'),
      lightContrast: workspaceConfiguration.get<string>('lightContrast'),
      darkWorkbench: workspaceConfiguration.get<string>('darkWorkbench'),
      lightWorkbench: workspaceConfiguration.get<string>('lightWorkbench'),
      darkSelection: workspaceConfiguration.get<string>('darkSelection'),
      lightSelection: workspaceConfiguration.get<string>('lightSelection'),
      darkCursor: workspaceConfiguration.get<string>('darkCursor'),
      lightCursor: workspaceConfiguration.get<string>('lightCursor'),
      italicKeywords: workspaceConfiguration.get<boolean>('italicKeywords'),
      italicComments: workspaceConfiguration.get<boolean>('italicComments'),
      diagnosticTextBackgroundOpacity: workspaceConfiguration.get<string>(
        'diagnosticTextBackgroundOpacity',
      ),
      highContrast: workspaceConfiguration.get<boolean>('highContrast'),
    };
  } // }}}
  /** Return true iff every configuration value matches its documented default. */
  isDefaultConfiguration(configuration: Configuration): boolean {
    // {{{
    return (
      configuration.italicKeywords === false &&
      configuration.italicComments === true &&
      configuration.lightWorkbench === 'material' &&
      configuration.darkWorkbench === 'material' &&
      configuration.lightContrast === 'medium' &&
      configuration.darkContrast === 'medium' &&
      configuration.darkCursor === 'white' &&
      configuration.lightCursor === 'black' &&
      configuration.darkSelection === 'grey' &&
      configuration.lightSelection === 'grey' &&
      configuration.diagnosticTextBackgroundOpacity === '0%' &&
      configuration.highContrast === false
    );
  } // }}}
  /** Build the full ThemeData (dark + light) for a configuration via the shared `themeData` module. */
  getThemeData(configuration: Configuration): ThemeData {
    // {{{
    return getThemeData(configuration);
  } // }}}
  /** Return true on first activation (when the `.flag` sentinel file is absent) and create the flag. */
  async isNewlyInstalled(): Promise<boolean> {
    // {{{
    const flagPath = join(__dirname, '..', '.flag');
    if (!fs.existsSync(flagPath)) {
      await this.writeFile(flagPath, '');
      return true;
    } else {
      return false;
    }
  } // }}}
  /** Write JSON-serialized data to a path, replacing the file if it exists. */
  private async writeFile(path: string, data: unknown): Promise<void> {
    // {{{
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
  } // }}}
  /** Write both the dark and light theme JSON files in parallel. */
  async generate(
    darkPath: string,
    lightPath: string,
    data: ThemeData,
  ): Promise<void> {
    // {{{
    await Promise.all([
      this.writeFile(darkPath, data.dark),
      this.writeFile(lightPath, data.light),
    ]);
  } // }}}
}

// vim: fdm=marker fmr={{{,}}}:
