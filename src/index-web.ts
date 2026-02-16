/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { workspace, window } from "vscode";

export function activate() {
  workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("ravenwood")) {
      window.showInformationMessage(
        "Configuration options are currently not available in vscode web.",
      );
    }
  });
}

export function deactivate() {}

// vim: fdm=marker fmr={{{,}}}:
