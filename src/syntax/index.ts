/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, SyntaxRule } from '../interface';
import { getPalette } from '../palette';
import { buildSyntax } from './rules';

/** Return the TextMate scope rules for a variant, honoring the italicKeywords/italicComments flags. */
export function getSyntax(
  configuration: Configuration,
  variant: string,
): SyntaxRule[] {
  const palette = getPalette(configuration, variant);
  const italicComments = configuration.italicComments ?? true;
  const italicKeywords = configuration.italicKeywords === true;
  return buildSyntax(palette, italicKeywords, italicComments);
}
