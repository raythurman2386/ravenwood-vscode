/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

// GrokDay — GoForge t1734u locked light neutrals/surfaces/status with
// Ravenwood emerald brand accents. Intentionally achromatic surfaces.
// Surfaces: page #eeeeee, raised/terminal #f5f5f5, sidebar #eaeaea,
// code #e4e4e4, highlight/border #dedede. Text #262626 / #444444 /
// muted (icons) #767676.
const palette: Palette = {
  bg0: '#e4e4e4',
  bg1: '#eaeaea',
  bg: '#eeeeee',
  bg2: '#e4e4e4',
  bg3: '#dedede',
  bg4: '#d4d4d4',
  bg5: '#c8c8c8',
  grey0: '#767676',
  grey1: '#5c5c5c',
  grey2: '#444444',
  fg: '#262626',
  red: '#cd3048',
  orange: '#c2561a',
  yellow: '#a27612',
  green: '#378e23',
  aqua: '#047857',
  blue: '#2f64d2',
  purple: '#6a619c',
  dimRed: '#a4263a',
  dimOrange: '#9b4515',
  dimYellow: '#7f5c0e',
  dimGreen: '#296e1a',
  dimAqua: '#036046',
  dimBlue: '#2650a8',
  dimPurple: '#554e7d',
  shadow: '#3c474d20',
  badge: '#047857',
};

/** Surface hexes the palette slots cannot express on their own. */
export const surfaces = {
  sidebar: '#eaeaea',
  terminal: '#f5f5f5',
  card: '#f5f5f5',
};

export default palette;
