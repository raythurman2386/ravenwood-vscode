/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function testingColors(palette: Palette): Record<string, string> {
  return {
    'testing.iconFailed': `${palette.red}`,
    'testing.iconErrored': `${palette.red}`,
    'testing.iconPassed': `${palette.aqua}`,
    'testing.runAction': `${palette.aqua}`,
    'testing.iconQueued': `${palette.blue}`,
    'testing.iconUnset': `${palette.yellow}`,
    'testing.iconSkipped': `${palette.purple}`,
    'testing.iconErrored.retired': `${palette.dimRed}`,
    'testing.iconFailed.retired': `${palette.dimRed}`,
    'testing.iconPassed.retired': `${palette.dimAqua}`,
    'testing.iconQueued.retired': `${palette.dimBlue}`,
    'testing.iconUnset.retired': `${palette.dimYellow}`,
    'testing.iconSkipped.retired': `${palette.dimPurple}`,
    'testing.coverCountBadgeForeground': `${palette.bg}`,
    'testing.message.error.badgeBackground': `${palette.red}`,
    'testing.message.error.badgeBorder': `${palette.red}`,
    'testing.message.error.badgeForeground': `${palette.bg}`,
    'testing.coverCountBadgeBackground': `${palette.badge}`,
    'testing.coveredBackground': `${palette.dimGreen}30`,
    'testing.coveredBorder': `${palette.green}`,
    'testing.coveredGutterBackground': `${palette.dimGreen}30`,
    'testing.uncoveredBackground': `${palette.dimRed}30`,
    'testing.uncoveredBorder': `${palette.red}`,
    'testing.uncoveredGutterBackground': `${palette.dimRed}30`,
    'testing.uncoveredBranchBackground': `${palette.dimRed}40`,
    'testing.peekBorder': `${palette.bg4}`,
    'testing.peekHeaderBackground': `${palette.bg1}`,
    'testing.message.error.lineBackground': `${palette.dimRed}20`,
    'testing.message.info.decorationForeground': `${palette.blue}`,
    'testing.message.info.lineBackground': `${palette.dimBlue}20`,
    'testing.messagePeekBorder': `${palette.bg4}`,
    'testing.messagePeekHeaderBackground': `${palette.bg1}`,
  };
}
