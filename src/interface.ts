/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// To add a new configuration option:
// 1. Edit package.json (declares the `enum` constraint for the UI)
// 2. Add the configuration option to the `Configuration` interface below
// The type system (union types + `never` exhaustiveness checks in every
// dispatch site) catches the rest — no manual 5-place checklist required.

export type Contrast = 'soft' | 'medium' | 'hard';
export type WorkbenchStyle = 'material' | 'flat' | 'high-contrast';
export type Hue =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'aqua'
  | 'blue'
  | 'purple';
export type DarkCursorColor = 'white' | Hue;
export type LightCursorColor = 'black' | Hue;
export type SelectionColor = 'grey' | Hue;
export type DiagnosticOpacity = '0%' | '12.5%' | '25%' | '37.5%' | '50%';

/** User-facing configuration options under the `ravenwood.*` namespace. All optional. */
export interface Configuration {
  darkContrast?: Contrast;
  lightContrast?: Contrast;
  darkWorkbench?: WorkbenchStyle;
  lightWorkbench?: WorkbenchStyle;
  darkSelection?: SelectionColor;
  lightSelection?: SelectionColor;
  darkCursor?: DarkCursorColor;
  lightCursor?: LightCursorColor;
  italicKeywords?: boolean;
  italicComments?: boolean;
  diagnosticTextBackgroundOpacity?: DiagnosticOpacity;
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
