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
    // Elm {{{
    'type:elm': `${palette.aqua}`,
    'typeAlias:elm': `${palette.aqua}`,
    'function:elm': `${palette.green}`,
    'module:elm': `${palette.purple}`,
    // }}}
    // Erlang {{{
    'module:erlang': `${palette.purple}`,
    'function:erlang': `${palette.green}`,
    'type:erlang': `${palette.aqua}`,
    'record:erlang': `${palette.aqua}`,
    'macro:erlang': `${palette.aqua}`,
    'variable:erlang': `${palette.fg}`,
    // }}}
    // Elixir {{{
    'module:elixir': `${palette.purple}`,
    'function:elixir': `${palette.green}`,
    'method:elixir': `${palette.green}`,
    'parameter:elixir': `${palette.blue}`,
    'variable:elixir': `${palette.fg}`,
    'struct:elixir': `${palette.aqua}`,
    'macro:elixir': `${palette.aqua}`,
    'namespace:elixir': `${palette.purple}`,
    // }}}
    // F# {{{
    'module:fsharp': `${palette.purple}`,
    'type:fsharp': `${palette.aqua}`,
    'function:fsharp': `${palette.green}`,
    'method:fsharp': `${palette.green}`,
    'parameter:fsharp': `${palette.blue}`,
    'variable:fsharp': `${palette.fg}`,
    'property:fsharp': `${palette.aqua}`,
    'enum:fsharp': `${palette.aqua}`,
    'namespace:fsharp': `${palette.purple}`,
    // }}}
    // Julia {{{
    'struct:julia': `${palette.aqua}`,
    'function:julia': `${palette.green}`,
    'method:julia': `${palette.green}`,
    'parameter:julia': `${palette.blue}`,
    'variable:julia': `${palette.fg}`,
    'module:julia': `${palette.purple}`,
    'macro:julia': `${palette.aqua}`,
    // }}}
    // PHP {{{
    'class:php': `${palette.aqua}`,
    'interface:php': `${palette.aqua}`,
    'enum:php': `${palette.aqua}`,
    'function:php': `${palette.green}`,
    'method:php': `${palette.green}`,
    'parameter:php': `${palette.blue}`,
    'variable:php': `${palette.fg}`,
    'property:php': `${palette.aqua}`,
    'namespace:php': `${palette.purple}`,
    // }}}
    // Perl {{{
    'package:perl': `${palette.purple}`,
    'function:perl': `${palette.green}`,
    'method:perl': `${palette.green}`,
    'variable:perl': `${palette.fg}`,
    'namespace:perl': `${palette.purple}`,
    // }}}
    // Clojure {{{
    'function:clojure': `${palette.green}`,
    'method:clojure': `${palette.green}`,
    'variable:clojure': `${palette.fg}`,
    'namespace:clojure': `${palette.purple}`,
    'protocol:clojure': `${palette.aqua}`,
    'record:clojure': `${palette.aqua}`,
    // }}}
    // CoffeeScript {{{
    'class:coffeescript': `${palette.aqua}`,
    'function:coffeescript': `${palette.green}`,
    'method:coffeescript': `${palette.green}`,
    'parameter:coffeescript': `${palette.blue}`,
    'variable:coffeescript': `${palette.fg}`,
    // }}}
    // Groovy {{{
    'class:groovy': `${palette.aqua}`,
    'function:groovy': `${palette.green}`,
    'method:groovy': `${palette.green}`,
    'parameter:groovy': `${palette.blue}`,
    'variable:groovy': `${palette.fg}`,
    'property:groovy': `${palette.aqua}`,
    'namespace:groovy': `${palette.purple}`,
    // }}}
    // Lua {{{
    'class:lua': `${palette.aqua}`,
    'function:lua': `${palette.green}`,
    'method:lua': `${palette.green}`,
    'parameter:lua': `${palette.blue}`,
    'variable:lua': `${palette.fg}`,
    'table:lua': `${palette.aqua}`,
    'property:lua': `${palette.aqua}`,
    // }}}
    // R {{{
    'class:r': `${palette.aqua}`,
    'function:r': `${palette.green}`,
    'method:r': `${palette.green}`,
    'parameter:r': `${palette.blue}`,
    'variable:r': `${palette.fg}`,
    'namespace:r': `${palette.purple}`,
    // }}}
    // Common Lisp {{{
    'function:commonlisp': `${palette.green}`,
    'method:commonlisp': `${palette.green}`,
    'variable:commonlisp': `${palette.fg}`,
    'class:commonlisp': `${palette.aqua}`,
    'package:commonlisp': `${palette.purple}`,
    'generic:commonlisp': `${palette.aqua}`,
    // }}}
    // Ruby {{{
    'class:ruby': `${palette.aqua}`,
    'module:ruby': `${palette.purple}`,
    'function:ruby': `${palette.green}`,
    'method:ruby': `${palette.green}`,
    'parameter:ruby': `${palette.blue}`,
    'variable:ruby': `${palette.fg}`,
    'constant:ruby': `${palette.purple}`,
    'namespace:ruby': `${palette.purple}`,
    // }}}
    // Haskell {{{
    'class:haskell': `${palette.aqua}`,
    'type:haskell': `${palette.aqua}`,
    'function:haskell': `${palette.green}`,
    'method:haskell': `${palette.green}`,
    'variable:haskell': `${palette.fg}`,
    'typeParameter:haskell': `${palette.purple}`,
    'module:haskell': `${palette.purple}`,
    // }}}
    // OCaml {{{
    'module:ocaml': `${palette.purple}`,
    'type:ocaml': `${palette.aqua}`,
    'function:ocaml': `${palette.green}`,
    'method:ocaml': `${palette.green}`,
    'parameter:ocaml': `${palette.blue}`,
    'variable:ocaml': `${palette.fg}`,
    'variant:ocaml': `${palette.aqua}`,
    'moduleType:ocaml': `${palette.aqua}`,
    // }}}
  };
}

// vim: fdm=marker fmr={{{,}}}:
