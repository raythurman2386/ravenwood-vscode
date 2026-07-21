/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

/**
 * Build-time theme generator. Writes the default dark + light theme JSON
 * files into the repo's `themes/` directory so they can be packaged with the
 * extension. Run via `npm run compile:themes`.
 *
 * This script MUST NOT import the `vscode` module (it is not available at
 * build time). It depends only on pure modules: `interface`, `themeData`,
 * and the palette/workbench/syntax/semantic generators they pull in.
 */

import * as fs from 'node:fs';
import { join } from 'node:path';
import type { Configuration } from '../interface';
import { getThemeData } from '../themeData';

const configuration: Configuration = {
  darkContrast: 'medium',
  lightContrast: 'medium',
  darkWorkbench: 'material',
  lightWorkbench: 'material',
  darkSelection: 'grey',
  lightSelection: 'grey',
  darkCursor: 'white',
  lightCursor: 'black',
  italicKeywords: false,
  italicComments: true,
  diagnosticTextBackgroundOpacity: '0%',
  highContrast: false,
};

async function writeFile(path: string, data: unknown): Promise<void> {
  // {{{
  await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
} // }}}

async function generate(
  darkPath: string,
  lightPath: string,
  data: ReturnType<typeof getThemeData>,
): Promise<void> {
  // {{{
  await Promise.all([
    writeFile(darkPath, data.dark),
    writeFile(lightPath, data.light),
  ]);
} // }}}

generate(
  join(__dirname, '..', '..', 'themes', 'ravenwood-dark.json'),
  join(__dirname, '..', '..', 'themes', 'ravenwood-light.json'),
  getThemeData(configuration),
).catch((err: unknown) => {
  console.error('Failed to generate themes:', err);
  process.exit(1);
});

// vim: fdm=marker fmr={{{,}}}:
