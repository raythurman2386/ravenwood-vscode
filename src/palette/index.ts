/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import { Configuration, Palette } from "../interface";
import { default as darkForeground } from "./dark/foreground";
import { default as darkBackgroundHard } from "./dark/background/hard";
import { default as darkBackgroundMedium } from "./dark/background/medium";
import { default as darkBackgroundSoft } from "./dark/background/soft";
import { default as lightForeground } from "./light/foreground";
import { default as lightBackgroundHard } from "./light/background/hard";
import { default as lightBackgroundMedium } from "./light/background/medium";
import { default as lightBackgroundSoft } from "./light/background/soft";

export function getPalette(
  configuration: Configuration,
  variant: string,
): Palette {
  let paletteBackground;
  let paletteForeground;
  if (variant === "dark") {
    paletteForeground = darkForeground;
    switch (
      configuration.darkContrast // {{{
    ) {
      case "hard": {
        paletteBackground = darkBackgroundHard;
        break;
      }
      case "medium": {
        paletteBackground = darkBackgroundMedium;
        break;
      }
      case "soft": {
        paletteBackground = darkBackgroundSoft;
        break;
      }
      default: {
        paletteBackground = darkBackgroundMedium;
      }
    } // }}}
  } else {
    paletteForeground = lightForeground;
    switch (
      configuration.lightContrast // {{{
    ) {
      case "hard": {
        paletteBackground = lightBackgroundHard;
        break;
      }
      case "medium": {
        paletteBackground = lightBackgroundMedium;
        break;
      }
      case "soft": {
        paletteBackground = lightBackgroundSoft;
        break;
      }
      default: {
        paletteBackground = lightBackgroundMedium;
      }
    } // }}}
  }
  return {
    ...paletteBackground,
    ...paletteForeground,
  };
}

// vim: fdm=marker fmr={{{,}}}:
