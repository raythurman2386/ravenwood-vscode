/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { type ExtensionContext, window, workspace } from 'vscode';

/** Web entry point. Registers a config-change listener that informs the user web cannot regenerate themes. */
export function activate(context: ExtensionContext): void {
  context.subscriptions.push(
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('ravenwood')) {
        window.showInformationMessage(
          'Configuration options are currently not available in vscode web.',
        );
      }
    }),
  );
}

/** No-op deactivate; subscriptions are auto-disposed via context.subscriptions. */
export function deactivate(): void {}

// vim: fdm=marker fmr={{{,}}}:
