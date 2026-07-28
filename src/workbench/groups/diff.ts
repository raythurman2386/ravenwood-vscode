/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function diffColors(palette: Palette): Record<string, string> {
  // {{{
  return {
    'diffEditor.insertedTextBackground': `${palette.dimAqua}30`,
    'diffEditor.removedTextBackground': `${palette.dimRed}30`,
    'diffEditor.diagonalFill': `${palette.bg5}`,
    'diffEditor.unchangedRegionBackground': `${palette.bg1}`,
    'diffEditor.unchangedRegionForeground': `${palette.grey1}`,
    'diffEditor.unchangedRegionShadow': `${palette.shadow}`,
    'diffEditor.unchangedCodeBackground': `${palette.bg2}`,
    'diffEditor.border': `${palette.bg4}`,
    'diffEditor.move.border': `${palette.dimBlue}80`,
    'diffEditor.moveActive.border': `${palette.blue}`,
    'diffEditor.insertedLineBackground': `${palette.dimAqua}30`,
    'diffEditor.removedLineBackground': `${palette.dimRed}30`,
    'diffEditor.insertedTextBorder': `${palette.dimAqua}`,
    'diffEditor.removedTextBorder': `${palette.dimRed}`,
    'diffEditorGutter.insertedLineBackground': `${palette.dimAqua}30`,
    'diffEditorGutter.removedLineBackground': `${palette.dimRed}30`,
    'diffEditorOverview.insertedForeground': `${palette.dimAqua}`,
    'diffEditorOverview.removedForeground': `${palette.dimRed}`,
    'multiDiffEditor.background': `${palette.bg}`,
    'multiDiffEditor.border': `${palette.bg5}`,
    'multiDiffEditor.headerBackground': `${palette.bg1}`,
    'merge.incomingHeaderBackground': `${palette.dimAqua}80`,
    'merge.incomingContentBackground': `${palette.dimAqua}40`,
    'merge.currentHeaderBackground': `${palette.dimBlue}80`,
    'merge.currentContentBackground': `${palette.dimBlue}40`,
    'merge.border': `${palette.bg}00`,
    'mergeEditor.change.background': `${palette.dimBlue}30`,
    'mergeEditor.change.word.background': `${palette.dimBlue}40`,
    'mergeEditor.conflict.unhandledUnfocused.border': `${palette.yellow}`,
    'mergeEditor.conflict.unhandledFocused.border': `${palette.yellow}`,
    'mergeEditor.conflict.handledUnfocused.border': `${palette.bg5}`,
    'mergeEditor.conflict.handledFocused.border': `${palette.bg4}`,
    'mergeEditor.conflict.handled.minimapOverViewRuler': `${palette.dimBlue}`,
    'mergeEditor.conflict.unhandled.minimapOverViewRuler': `${palette.dimYellow}`,
    'mergeEditor.conflictingLines.background': `${palette.dimYellow}30`,
    'mergeEditor.changeBase.background': `${palette.dimAqua}30`,
    'mergeEditor.changeBase.word.background': `${palette.dimAqua}40`,
    'mergeEditor.conflict.input1.background': `${palette.dimBlue}30`,
    'mergeEditor.conflict.input2.background': `${palette.dimAqua}30`,
    'merge.commonContentBackground': `${palette.dimPurple}40`,
    'merge.commonHeaderBackground': `${palette.dimPurple}80`,
  };
} // }}}
// vim: fdm=marker fmr={{{,}}}:
