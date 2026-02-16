/*---------------------------------------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <i@sainnhe.dev>
 *  License:    MIT
 *--------------------------------------------------------------------------------------------*/

import { Configuration } from "../interface";
import { getPalette } from "../palette";
import { getDefaultSyntax } from "./default";
import { getItalicSyntax } from "./italic";

export function getSyntax(configuration: Configuration, variant: string) {
  const palette = getPalette(configuration, variant);
  let syntax: any;
  if (configuration.italicKeywords === true) {
    syntax = getItalicSyntax(palette, configuration.italicComments);
  } else {
    syntax = getDefaultSyntax(palette, configuration.italicComments);
  }
  return syntax;
}

// vim: fdm=marker fmr={{{,}}}:
