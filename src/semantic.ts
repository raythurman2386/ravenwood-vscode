/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration } from './interface';
import { getPalette } from './palette';

/** Return the semantic-token color map for a variant. Used for LSP-provided tokens. */
export function getSemantic(
  configuration: Configuration,
  variant: string,
): Record<string, string> {
  const palette = getPalette(configuration, variant);
  return {
    // General {{{
    operatorOverload: `${palette.orange}`,
    memberOperatorOverload: `${palette.orange}`,
    // }}}
    // JavaScript {{{
    'variable.defaultLibrary:javascript': `${palette.purple}`,
    'property.defaultLibrary:javascript': `${palette.purple}`,
    // }}}
    // JavaScript React {{{
    'variable.defaultLibrary:javascriptreact': `${palette.purple}`,
    'property.defaultLibrary:javascriptreact': `${palette.purple}`,
    // }}}
    // TypeScript {{{
    'class:typescript': `${palette.aqua}`,
    'interface:typescript': `${palette.aqua}`,
    'enum:typescript': `${palette.purple}`,
    'enumMember:typescript': `${palette.blue}`,
    'namespace:typescript': `${palette.purple}`,
    'variable.defaultLibrary:typescript': `${palette.purple}`,
    'property.defaultLibrary:typescript': `${palette.purple}`,
    // }}}
    // TypeScript React {{{
    'class:typescriptreact': `${palette.aqua}`,
    'interface:typescriptreact': `${palette.aqua}`,
    'enum:typescriptreact': `${palette.purple}`,
    'enumMember:typescriptreact': `${palette.blue}`,
    'namespace:typescriptreact': `${palette.purple}`,
    'variable.defaultLibrary:typescriptreact': `${palette.purple}`,
    'property.defaultLibrary:typescriptreact': `${palette.purple}`,
    // }}}
    // Python {{{
    'intrinsic:python': `${palette.purple}`,
    'module:python': `${palette.blue}`,
    'class:python': `${palette.aqua}`,
    'function:python': `${palette.green}`,
    'method:python': `${palette.green}`,
    'parameter:python': `${palette.blue}`,
    'variable:python': `${palette.fg}`,
    'decorator:python': `${palette.yellow}`,
    'enumMember:python': `${palette.blue}`,
    'namespace:python': `${palette.purple}`,
    // }}}
    // Java {{{
    'class:java': `${palette.aqua}`,
    'interface:java': `${palette.aqua}`,
    'enum:java': `${palette.purple}`,
    'enumMember:java': `${palette.blue}`,
    'namespace:java': `${palette.purple}`,
    'typeParameter:java': `${palette.purple}`,
    'function:java': `${palette.green}`,
    'method:java': `${palette.green}`,
    'parameter:java': `${palette.blue}`,
    'variable:java': `${palette.fg}`,
    'property:java': `${palette.aqua}`,
    // }}}
    // C# {{{
    'class:csharp': `${palette.aqua}`,
    'interface:csharp': `${palette.aqua}`,
    'enum:csharp': `${palette.purple}`,
    'enumMember:csharp': `${palette.blue}`,
    'namespace:csharp': `${palette.purple}`,
    'typeParameter:csharp': `${palette.purple}`,
    'function:csharp': `${palette.green}`,
    'method:csharp': `${palette.green}`,
    'parameter:csharp': `${palette.blue}`,
    'variable:csharp': `${palette.fg}`,
    'property:csharp': `${palette.aqua}`,
    // }}}
    // C++ {{{
    'class:cpp': `${palette.aqua}`,
    'struct:cpp': `${palette.aqua}`,
    'enum:cpp': `${palette.purple}`,
    'enumMember:cpp': `${palette.blue}`,
    'namespace:cpp': `${palette.purple}`,
    'typeParameter:cpp': `${palette.purple}`,
    'function:cpp': `${palette.green}`,
    'method:cpp': `${palette.green}`,
    'parameter:cpp': `${palette.blue}`,
    'variable:cpp': `${palette.fg}`,
    'field:cpp': `${palette.aqua}`,
    // }}}
    // Rust {{{
    'macro:rust': `${palette.aqua}`,
    'namespace:rust': `${palette.purple}`,
    'selfKeyword:rust': `${palette.purple}`,
    'struct:rust': `${palette.aqua}`,
    'enum:rust': `${palette.aqua}`,
    'trait:rust': `${palette.aqua}`,
    'typeAlias:rust': `${palette.aqua}`,
    'function:rust': `${palette.green}`,
    'method:rust': `${palette.green}`,
    'parameter:rust': `${palette.blue}`,
    'variable:rust': `${palette.blue}`,
    'field:rust': `${palette.fg}`,
    'constant:rust': `${palette.purple}`,
    'lifetime:rust': `${palette.purple}`,
    'module:rust': `${palette.purple}`,
    // }}}
    // Go {{{
    'namespace:go': `${palette.blue}`,
    'type:go': `${palette.aqua}`,
    'struct:go': `${palette.aqua}`,
    'interface:go': `${palette.aqua}`,
    'function:go': `${palette.green}`,
    'method:go': `${palette.green}`,
    'variable:go': `${palette.blue}`,
    'parameter:go': `${palette.blue}`,
    'field:go': `${palette.aqua}`,
    'constant:go': `${palette.purple}`,
    'typeParameter:go': `${palette.purple}`,
    // }}}
  };
}

// vim: fdm=marker fmr={{{,}}}:
