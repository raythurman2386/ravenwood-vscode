/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';
import type { WorkbenchVariantColors } from '../common';

export function debugColors(
  palette: Palette,
  variantColors: WorkbenchVariantColors,
): Record<string, string> {
  // {{{
  return {
    'debugToolBar.background': `${variantColors.mainBg}`,
    'debugToolBar.border': `${palette.bg5}`,
    'debugTokenExpression.name': `${palette.blue}`,
    'debugTokenExpression.value': `${palette.green}`,
    'debugTokenExpression.string': `${palette.yellow}`,
    'debugTokenExpression.boolean': `${palette.purple}`,
    'debugTokenExpression.number': `${palette.purple}`,
    'debugTokenExpression.type': `${palette.aqua}`,
    'debugTokenExpression.error': `${palette.red}`,
    'debugIcon.breakpointForeground': `${palette.red}`,
    'debugIcon.breakpointDisabledForeground': `${palette.dimRed}`,
    'debugIcon.breakpointUnverifiedForeground': `${palette.grey2}`,
    'debugIcon.breakpointCurrentStackframeForeground': `${palette.blue}`,
    'debugIcon.breakpointStackframeForeground': `${palette.red}`,
    'debugIcon.startForeground': `${palette.aqua}`,
    'debugIcon.pauseForeground': `${palette.yellow}`,
    'debugIcon.stopForeground': `${palette.red}`,
    'debugIcon.disconnectForeground': `${palette.purple}`,
    'debugIcon.restartForeground': `${palette.aqua}`,
    'debugIcon.stepOverForeground': `${palette.blue}`,
    'debugIcon.stepIntoForeground': `${palette.blue}`,
    'debugIcon.stepOutForeground': `${palette.blue}`,
    'debugIcon.continueForeground': `${palette.blue}`,
    'debugIcon.stepBackForeground': `${palette.blue}`,
    'debugConsole.infoForeground': `${palette.green}`,
    'debugConsole.warningForeground': `${palette.yellow}`,
    'debugConsole.errorForeground': `${palette.red}`,
    'debugConsole.sourceForeground': `${palette.purple}`,
    'debugConsoleInputIcon.foreground': `${palette.aqua}`,
    'debugView.exceptionLabelBackground': `${palette.red}`,
    'debugView.exceptionLabelForeground': `${palette.bg}`,
    'debugView.stateLabelBackground': `${palette.bg3}`,
    'debugView.stateLabelForeground': `${palette.fg}`,
    'debugView.valueChangedHighlight': `${palette.yellow}`,
    'debugExceptionWidget.background': `${palette.bg1}`,
    'debugExceptionWidget.border': `${palette.red}`,
  };
} // }}}
// vim: fdm=marker fmr={{{,}}}:
