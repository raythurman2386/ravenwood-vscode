/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// To add a new configuration option:
// 1. Edit package.json
// 2. Add the configuration option in this interface
// 3. utils.getConfiguration()
// 4. utils.isDefaultConfiguration()
// 5. generateThemes.ts

/** User-facing configuration options under the `ravenwood.*` namespace. All optional. */
export interface Configuration {
  darkContrast?: string;
  lightContrast?: string;
  darkWorkbench?: string;
  lightWorkbench?: string;
  darkSelection?: string;
  lightSelection?: string;
  darkCursor?: string;
  lightCursor?: string;
  italicKeywords?: boolean;
  italicComments?: boolean;
  diagnosticTextBackgroundOpacity?: string;
  highContrast?: boolean;
}

/** The full resolved color palette for a variant × contrast combination. */
export interface Palette {
  bg0: string;
  bg1: string;
  bg: string;
  bg2: string;
  bg3: string;
  bg4: string;
  bg5: string;
  grey0: string;
  grey1: string;
  grey2: string;
  fg: string;
  red: string;
  orange: string;
  yellow: string;
  green: string;
  aqua: string;
  blue: string;
  purple: string;
  dimRed: string;
  dimOrange: string;
  dimYellow: string;
  dimGreen: string;
  dimAqua: string;
  dimBlue: string;
  dimPurple: string;
  shadow: string;
  badge: string;
}

/** The full theme payload for both dark and light variants, written to themes/*.json. */
export interface ThemeData {
  dark: {
    name: string;
    type: string;
    semanticHighlighting: boolean;
    semanticTokenColors: Record<string, string>;
    colors: Record<string, string>;
    tokenColors: SyntaxRule[];
  };
  light: {
    name: string;
    type: string;
    semanticHighlighting: boolean;
    semanticTokenColors: Record<string, string>;
    colors: Record<string, string>;
    tokenColors: SyntaxRule[];
  };
}

/** A single TextMate token-coloring rule in the `tokenColors` array. */
export interface SyntaxRule {
  name: string;
  scope: string;
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

// vim: fdm=marker fmr={{{,}}}:
