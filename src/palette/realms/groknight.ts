/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

// GrokNight — GoForge t1734u locked dark neutrals/surfaces/status with
// Ravenwood emerald brand accents. Intentionally achromatic surfaces.
// Surfaces: terminal #0a0a0a, sidebar #111111, page #141414, card #1c1c1c,
// highlight/border #242424. Text #e1e1e1 / #c8c8c8 / muted #6c6c6c.
const palette: Palette = {
  bg0: '#0a0a0a',
  bg1: '#111111',
  bg: '#141414',
  bg2: '#1c1c1c',
  bg3: '#242424',
  bg4: '#2e2e2e',
  bg5: '#383838',
  grey0: '#6c6c6c',
  grey1: '#9a9a9a',
  grey2: '#c8c8c8',
  fg: '#e1e1e1',
  red: '#f7768e',
  orange: '#ff9e64',
  yellow: '#e0af68',
  green: '#9ece6a',
  aqua: '#34d399',
  blue: '#7aa2f7',
  purple: '#b4a7d6',
  dimRed: '#c15c6f',
  dimOrange: '#c77b4e',
  dimYellow: '#af8951',
  dimGreen: '#7ba153',
  dimAqua: '#29a577',
  dimBlue: '#5f7ec1',
  dimPurple: '#8c82a7',
  shadow: '#00000070',
  badge: '#10b981',
};

/** Surface hexes the palette slots cannot express on their own. */
export const surfaces = {
  sidebar: '#111111',
  terminal: '#0a0a0a',
  card: '#1c1c1c',
};

export default palette;
