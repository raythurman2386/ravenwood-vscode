/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, Palette } from '../interface';
import { default as darkBackgroundHard } from './dark/background/hard';
import { default as darkBackgroundMedium } from './dark/background/medium';
import { default as darkBackgroundSoft } from './dark/background/soft';
import { default as darkForeground } from './dark/foreground';
import { default as lightBackgroundHard } from './light/background/hard';
import { default as lightBackgroundMedium } from './light/background/medium';
import { default as lightBackgroundSoft } from './light/background/soft';
import { default as lightForeground } from './light/foreground';

/**
 * Resolve the full Palette for a variant and contrast level.
 * Merges the variant's background file (chosen by contrast) with the
 * variant's foreground file. Throws on unknown variants.
 */
export function getPalette(
  configuration: Configuration,
  variant: string,
): Palette {
  let paletteBackground: Partial<Palette>;
  let paletteForeground: Partial<Palette>;
  if (variant === 'dark') {
    paletteForeground = darkForeground;
    switch (
      configuration.darkContrast // {{{
    ) {
      case 'hard': {
        paletteBackground = darkBackgroundHard;
        break;
      }
      case 'medium': {
        paletteBackground = darkBackgroundMedium;
        break;
      }
      case 'soft': {
        paletteBackground = darkBackgroundSoft;
        break;
      }
      default: {
        paletteBackground = darkBackgroundMedium;
      }
    } // }}}
  } else if (variant === 'light') {
    paletteForeground = lightForeground;
    switch (
      configuration.lightContrast // {{{
    ) {
      case 'hard': {
        paletteBackground = lightBackgroundHard;
        break;
      }
      case 'medium': {
        paletteBackground = lightBackgroundMedium;
        break;
      }
      case 'soft': {
        paletteBackground = lightBackgroundSoft;
        break;
      }
      default: {
        paletteBackground = lightBackgroundMedium;
      }
    } // }}}
  } else {
    throw new Error(`Unknown variant: ${variant}`);
  }
  return {
    ...paletteBackground,
    ...paletteForeground,
  } as Palette;
}

// vim: fdm=marker fmr={{{,}}}:
