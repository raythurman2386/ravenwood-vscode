/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { Palette, Configuration } from "../interface";

export function getSelectionColors(
  palette: Palette,
  configuration: Configuration,
  variant: string,
) {
  let selectionBg: string;
  let editorSelectionBg: string;
  let editorSelectionBgHl: string;
  if (variant === "dark") {
    switch (configuration.darkSelection) {
      case "grey":
        selectionBg = `${palette.bg4}e0`;
        editorSelectionBg = `${palette.bg4}c0`;
        editorSelectionBgHl = `${palette.bg4}60`;
        break;
      case "red":
        selectionBg = `${palette.dimRed}60`;
        editorSelectionBg = `${palette.dimRed}40`;
        editorSelectionBgHl = `${palette.dimRed}20`;
        break;
      case "orange":
        selectionBg = `${palette.dimOrange}60`;
        editorSelectionBg = `${palette.dimOrange}40`;
        editorSelectionBgHl = `${palette.dimOrange}20`;
        break;
      case "yellow":
        selectionBg = `${palette.dimYellow}60`;
        editorSelectionBg = `${palette.dimYellow}40`;
        editorSelectionBgHl = `${palette.dimYellow}20`;
        break;
      case "green":
        selectionBg = `${palette.dimGreen}60`;
        editorSelectionBg = `${palette.dimGreen}40`;
        editorSelectionBgHl = `${palette.dimGreen}20`;
        break;
      case "aqua":
        selectionBg = `${palette.dimAqua}60`;
        editorSelectionBg = `${palette.dimAqua}40`;
        editorSelectionBgHl = `${palette.dimAqua}20`;
        break;
      case "blue":
        selectionBg = `${palette.dimBlue}60`;
        editorSelectionBg = `${palette.dimBlue}40`;
        editorSelectionBgHl = `${palette.dimBlue}20`;
        break;
      case "purple":
        selectionBg = `${palette.dimPurple}60`;
        editorSelectionBg = `${palette.dimPurple}40`;
        editorSelectionBgHl = `${palette.dimPurple}20`;
        break;
      default:
        selectionBg = `${palette.bg4}e0`;
        editorSelectionBg = `${palette.bg4}c0`;
        editorSelectionBgHl = `${palette.bg4}60`;
    }
  } else {
    switch (configuration.lightSelection) {
      case "grey":
        selectionBg = `${palette.bg4}c0`;
        editorSelectionBg = `${palette.bg4}a0`;
        editorSelectionBgHl = `${palette.bg4}50`;
        break;
      case "red":
        selectionBg = `${palette.dimRed}60`;
        editorSelectionBg = `${palette.dimRed}40`;
        editorSelectionBgHl = `${palette.dimRed}20`;
        break;
      case "orange":
        selectionBg = `${palette.dimOrange}60`;
        editorSelectionBg = `${palette.dimOrange}40`;
        editorSelectionBgHl = `${palette.dimOrange}20`;
        break;
      case "yellow":
        selectionBg = `${palette.dimYellow}60`;
        editorSelectionBg = `${palette.dimYellow}40`;
        editorSelectionBgHl = `${palette.dimYellow}20`;
        break;
      case "green":
        selectionBg = `${palette.dimGreen}60`;
        editorSelectionBg = `${palette.dimGreen}40`;
        editorSelectionBgHl = `${palette.dimGreen}20`;
        break;
      case "aqua":
        selectionBg = `${palette.dimAqua}60`;
        editorSelectionBg = `${palette.dimAqua}40`;
        editorSelectionBgHl = `${palette.dimAqua}20`;
        break;
      case "blue":
        selectionBg = `${palette.dimBlue}60`;
        editorSelectionBg = `${palette.dimBlue}40`;
        editorSelectionBgHl = `${palette.dimBlue}20`;
        break;
      case "purple":
        selectionBg = `${palette.dimPurple}60`;
        editorSelectionBg = `${palette.dimPurple}40`;
        editorSelectionBgHl = `${palette.dimPurple}20`;
        break;
      default:
        selectionBg = `${palette.bg4}c0`;
        editorSelectionBg = `${palette.bg4}a0`;
        editorSelectionBgHl = `${palette.bg4}50`;
    }
  }
  return { selectionBg, editorSelectionBg, editorSelectionBgHl };
}

export function getCursorColor(
  palette: Palette,
  configuration: Configuration,
  variant: string,
) {
  if (variant === "dark") {
    switch (configuration.darkCursor) {
      case "white":
        return palette.fg;
      case "red":
        return palette.red;
      case "orange":
        return palette.orange;
      case "yellow":
        return palette.yellow;
      case "green":
        return palette.green;
      case "aqua":
        return palette.aqua;
      case "blue":
        return palette.blue;
      case "purple":
        return palette.purple;
      default:
        return palette.fg;
    }
  } else {
    switch (configuration.lightCursor) {
      case "black":
        return palette.fg;
      case "red":
        return palette.red;
      case "orange":
        return palette.orange;
      case "yellow":
        return palette.yellow;
      case "green":
        return palette.green;
      case "aqua":
        return palette.aqua;
      case "blue":
        return palette.blue;
      case "purple":
        return palette.purple;
      default:
        return palette.fg;
    }
  }
}

export function getDiagnosticOpacity(configuration: Configuration) {
  switch (configuration.diagnosticTextBackgroundOpacity) {
    case "0%":
      return "00";
    case "12.5%":
      return "20";
    case "25%":
      return "40";
    case "37.5%":
      return "60";
    case "50%":
      return "80";
    default:
      return "00";
  }
}

export function getWorkbenchVariantColors(palette: Palette, variant: string) {
  const isDark = variant === "dark";
  return {
    mainBg: isDark ? `${palette.bg}` : `${palette.bg2}`,
    suggestWidgetBg: isDark ? `${palette.bg}` : `${palette.bg3}`,
    inputValidationBgError: isDark ? `${palette.dimRed}40` : `${palette.bg3}`,
    inputValidationFgError: isDark ? `${palette.fg}` : `${palette.red}`,
    inputValidationBgInfo: isDark ? `${palette.dimBlue}40` : `${palette.bg3}`,
    inputValidationFgInfo: isDark ? `${palette.fg}` : `${palette.blue}`,
    inputValidationBgWarning: isDark
      ? `${palette.dimYellow}40`
      : `${palette.bg3}`,
    inputValidationFgWarning: isDark ? `${palette.fg}` : `${palette.yellow}`,
    wordHighlightBg: isDark ? `${palette.bg4}58` : `${palette.bg4}48`,
    wordHighlightStrongBg: isDark ? `${palette.bg4}b0` : `${palette.bg4}90`,
    hoverHighlightBg: isDark ? `${palette.bg4}b0` : `${palette.bg4}90`,
    lineHighlightBg: isDark ? `${palette.bg3}90` : `${palette.bg3}70`,
    terminalAnsiBlack: isDark ? `${palette.bg2}` : `${palette.fg}`,
    terminalAnsiBrightBlack: isDark ? `${palette.grey1}` : `${palette.fg}`,
    terminalAnsiBrightWhite: isDark ? `${palette.fg}` : `${palette.bg2}`,
    terminalAnsiWhite: isDark ? `${palette.fg}` : `${palette.grey1}`,
    welcomePageButtonHoverBg: isDark ? `${palette.bg}a0` : `${palette.bg2}a0`,
  };
}

// vim: fdm=marker fmr={{{,}}}:
