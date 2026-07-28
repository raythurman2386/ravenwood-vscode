/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration } from './interface';

/** Allowed values for each enum-typed configuration field. */
const ALLOWED: Array<{
  key: keyof Configuration;
  values: readonly string[];
}> = [
  { key: 'darkContrast', values: ['soft', 'medium', 'hard'] },
  { key: 'lightContrast', values: ['soft', 'medium', 'hard'] },
  { key: 'darkWorkbench', values: ['material', 'flat', 'high-contrast'] },
  { key: 'lightWorkbench', values: ['material', 'flat', 'high-contrast'] },
  {
    key: 'darkCursor',
    values: [
      'white',
      'red',
      'orange',
      'yellow',
      'green',
      'aqua',
      'blue',
      'purple',
    ],
  },
  {
    key: 'lightCursor',
    values: [
      'black',
      'red',
      'orange',
      'yellow',
      'green',
      'aqua',
      'blue',
      'purple',
    ],
  },
  {
    key: 'darkSelection',
    values: [
      'grey',
      'red',
      'orange',
      'yellow',
      'green',
      'aqua',
      'blue',
      'purple',
    ],
  },
  {
    key: 'lightSelection',
    values: [
      'grey',
      'red',
      'orange',
      'yellow',
      'green',
      'aqua',
      'blue',
      'purple',
    ],
  },
  {
    key: 'diagnosticTextBackgroundOpacity',
    values: ['0%', '12.5%', '25%', '37.5%', '50%'],
  },
];

/** Return warning strings for any config value that's set but not a valid enum member. Pure — no vscode dependency. */
export function validateConfig(configuration: Configuration): string[] {
  // {{{
  const warnings: string[] = [];
  for (const { key, values } of ALLOWED) {
    const value = configuration[key] as string | undefined;
    if (value !== undefined && !values.includes(value)) {
      warnings.push(
        `ravenwood.${String(key)}="${value}" is not one of ${values.join(', ')}`,
      );
    }
  }
  return warnings;
} // }}}

// vim: fdm=marker fmr={{{,}}}:
