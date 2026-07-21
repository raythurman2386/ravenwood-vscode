/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, SyntaxRule } from '../interface';
import { getPalette } from '../palette';
import { getDefaultSyntax } from './default';
import { getItalicSyntax } from './italic';

/** Return the TextMate scope rules for a variant, honoring the italicKeywords/italicComments flags. */
export function getSyntax(
  configuration: Configuration,
  variant: string,
): SyntaxRule[] {
  const palette = getPalette(configuration, variant);
  const italicComments = configuration.italicComments ?? true;
  let syntax: SyntaxRule[];
  if (configuration.italicKeywords === true) {
    syntax = getItalicSyntax(palette, italicComments);
  } else {
    syntax = getDefaultSyntax(palette, italicComments);
  }
  return syntax;
}

// vim: fdm=marker fmr={{{,}}}:
