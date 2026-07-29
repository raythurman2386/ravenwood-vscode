/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, Palette } from '../interface';
import { getPalette } from '../palette';
import { flatWorkbench } from './flat';
import { highContrastWorkbench } from './highContrast';
import { materialWorkbench } from './material';

/** Dispatch to the correct workbench style builder (material / flat / highContrast) for the variant. */
export function getWorkbench(
  configuration: Configuration,
  variant: string,
): Record<string, string> {
  const palette: Palette = getPalette(configuration, variant);
  if (variant === 'dark') {
    switch (configuration.darkWorkbench) {
      case 'material':
        return materialWorkbench(palette, configuration, 'dark');
      case 'flat':
        return flatWorkbench(palette, configuration, 'dark');
      case 'high-contrast':
        return highContrastWorkbench(palette, configuration, 'dark');
      case undefined:
        return materialWorkbench(palette, configuration, 'dark');
      default: {
        const _exhaustive: never = configuration.darkWorkbench;
        throw new Error(`Unhandled darkWorkbench: ${_exhaustive as string}`);
      }
    }
  } else if (variant === 'light') {
    switch (configuration.lightWorkbench) {
      case 'material':
        return materialWorkbench(palette, configuration, 'light');
      case 'flat':
        return flatWorkbench(palette, configuration, 'light');
      case 'high-contrast':
        return highContrastWorkbench(palette, configuration, 'light');
      case undefined:
        return materialWorkbench(palette, configuration, 'light');
      default: {
        const _exhaustive: never = configuration.lightWorkbench;
        throw new Error(`Unhandled lightWorkbench: ${_exhaustive as string}`);
      }
    }
  } else {
    throw new Error(`Unknown variant: ${variant}`);
  }
}
