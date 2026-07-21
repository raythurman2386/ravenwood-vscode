/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { join } from 'node:path';
import { type ExtensionContext, window, workspace } from 'vscode';
import Utils from './utils';

/** Desktop extension entry point. Registers a config-change listener that regenerates theme JSON files. */
export async function activate(context: ExtensionContext): Promise<void> {
  // {{{
  const utils = new Utils();
  const darkPath = join(__dirname, '..', 'themes', 'ravenwood-dark.json');
  const lightPath = join(__dirname, '..', 'themes', 'ravenwood-light.json');

  // Regenerate theme files when user configuration changes.
  context.subscriptions.push(
    workspace.onDidChangeConfiguration((event) => {
      utils.detectConfigChanges(event, async () => {
        try {
          await utils.generate(
            darkPath,
            lightPath,
            utils.getThemeData(utils.getConfiguration()),
          );
        } catch (err) {
          window.showErrorMessage(
            `Ravenwood failed to regenerate theme files: ${String(err)}`,
          );
        }
      });
    }),
  );

  // Regenerate theme files if it's newly installed but the user settings are not the default.
  const newlyInstalled = await utils.isNewlyInstalled();
  if (newlyInstalled) {
    const configuration = utils.getConfiguration();
    if (!utils.isDefaultConfiguration(configuration)) {
      try {
        await utils.generate(
          darkPath,
          lightPath,
          utils.getThemeData(configuration),
        );
      } catch (err) {
        window.showErrorMessage(
          `Ravenwood failed to regenerate theme files: ${String(err)}`,
        );
      }
    }
  }
} // }}}

/** No-op deactivate; subscriptions are auto-disposed via context.subscriptions. */
export function deactivate(): void {}

// vim: fdm=marker fmr={{{,}}}:
