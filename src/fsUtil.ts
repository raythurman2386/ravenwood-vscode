/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import * as fs from 'node:fs';
import { join } from 'node:path';

/** Recursively create the parent directory and write JSON data with 2-space indentation. */
export async function writeJsonFile(
  path: string,
  data: unknown,
): Promise<void> {
  await fs.promises.mkdir(join(path, '..'), { recursive: true });
  await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
}
