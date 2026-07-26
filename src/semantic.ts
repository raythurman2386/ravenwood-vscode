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
    // JSX {{{
    'class:javascriptreact': `${palette.aqua}`,
    'function:javascriptreact': `${palette.green}`,
    'method:javascriptreact': `${palette.green}`,
    'variable:javascriptreact': `${palette.fg}`,
    'parameter:javascriptreact': `${palette.blue}`,
    'property:javascriptreact': `${palette.aqua}`,
    'type:javascriptreact': `${palette.aqua}`,
    'enum:javascriptreact': `${palette.purple}`,
    'enumMember:javascriptreact': `${palette.blue}`,
    'namespace:javascriptreact': `${palette.purple}`,
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
    // JSON {{{
    'property:json': `${palette.aqua}`,
    'string:json': `${palette.yellow}`,
    'number:json': `${palette.purple}`,
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
    // C {{{
    'function:c': `${palette.green}`,
    'method:c': `${palette.green}`,
    'variable:c': `${palette.fg}`,
    'type:c': `${palette.aqua}`,
    'macro:c': `${palette.aqua}`,
    'parameter:c': `${palette.blue}`,
    'namespace:c': `${palette.purple}`,
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
    // GraphQL {{{
    'type:graphql': `${palette.aqua}`,
    'variable:graphql': `${palette.fg}`,
    'function:graphql': `${palette.green}`,
    'parameter:graphql': `${palette.blue}`,
    'property:graphql': `${palette.aqua}`,
    'enum:graphql': `${palette.aqua}`,
    'enumMember:graphql': `${palette.blue}`,
    'namespace:graphql': `${palette.purple}`,
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
    // Kotlin {{{
    'class:kotlin': `${palette.aqua}`,
    'function:kotlin': `${palette.green}`,
    'method:kotlin': `${palette.green}`,
    'parameter:kotlin': `${palette.blue}`,
    'variable:kotlin': `${palette.fg}`,
    'property:kotlin': `${palette.aqua}`,
    'enum:kotlin': `${palette.purple}`,
    'enumMember:kotlin': `${palette.blue}`,
    'namespace:kotlin': `${palette.purple}`,
    'typeParameter:kotlin': `${palette.purple}`,
    // }}}
    // LaTex {{{
    'function:latex': `${palette.green}`,
    'variable:latex': `${palette.fg}`,
    'parameter:latex': `${palette.blue}`,
    'type:latex': `${palette.aqua}`,
    'namespace:latex': `${palette.purple}`,
    'macro:latex': `${palette.aqua}`,
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
    // Pug {{{
    'tag:pug': `${palette.aqua}`,
    'class:pug': `${palette.aqua}`,
    'type:pug': `${palette.aqua}`,
    'function:pug': `${palette.green}`,
    'method:pug': `${palette.green}`,
    'variable:pug': `${palette.fg}`,
    'parameter:pug': `${palette.blue}`,
    'property:pug': `${palette.aqua}`,
    'namespace:pug': `${palette.purple}`,
    'module:pug': `${palette.purple}`,
    'constant:pug': `${palette.purple}`,
    'macro:pug': `${palette.aqua}`,
    // }}}
    // Proto {{{
    'class:proto': `${palette.aqua}`,
    'enum:proto': `${palette.purple}`,
    'enumMember:proto': `${palette.blue}`,
    'function:proto': `${palette.green}`,
    'method:proto': `${palette.green}`,
    'variable:proto': `${palette.fg}`,
    'parameter:proto': `${palette.blue}`,
    'property:proto': `${palette.aqua}`,
    'type:proto': `${palette.aqua}`,
    'namespace:proto': `${palette.purple}`,
    // }}}
    // Html {{{
    'tag:html': `${palette.aqua}`,
    'class:html': `${palette.aqua}`,
    'type:html': `${palette.aqua}`,
    'function:html': `${palette.green}`,
    'method:html': `${palette.green}`,
    'variable:html': `${palette.blue}`,
    'parameter:html': `${palette.blue}`,
    'property:html': `${palette.aqua}`,
    'namespace:html': `${palette.purple}`,
    'module:html': `${palette.purple}`,
    'constant:html': `${palette.purple}`,
    'macro:html': `${palette.aqua}`,
    // }}}
    // Xml {{{
    'tag:xml': `${palette.aqua}`,
    'class:xml': `${palette.aqua}`,
    'type:xml': `${palette.aqua}`,
    'function:xml': `${palette.green}`,
    'method:xml': `${palette.green}`,
    'variable:xml': `${palette.blue}`,
    'parameter:xml': `${palette.blue}`,
    'property:xml': `${palette.aqua}`,
    'namespace:xml': `${palette.purple}`,
    'module:xml': `${palette.purple}`,
    'constant:xml': `${palette.purple}`,
    'macro:xml': `${palette.aqua}`,
    // }}}
    // Perl {{{
    'package:perl': `${palette.purple}`,
    'function:perl': `${palette.green}`,
    'method:perl': `${palette.green}`,
    'variable:perl': `${palette.fg}`,
    'namespace:perl': `${palette.purple}`,
    // }}}
    // Shell {{{
    'function:shellscript': `${palette.green}`,
    'variable:shellscript': `${palette.fg}`,
    'parameter:shellscript': `${palette.blue}`,
    // }}}
    // PowerShell {{{
    'function:powershell': `${palette.green}`,
    'method:powershell': `${palette.green}`,
    'variable:powershell': `${palette.fg}`,
    'parameter:powershell': `${palette.blue}`,
    'type:powershell': `${palette.aqua}`,
    'namespace:powershell': `${palette.purple}`,
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
    // Dart {{{
    'class:dart': `${palette.aqua}`,
    'enum:dart': `${palette.aqua}`,
    'function:dart': `${palette.green}`,
    'method:dart': `${palette.green}`,
    'parameter:dart': `${palette.blue}`,
    'variable:dart': `${palette.fg}`,
    'property:dart': `${palette.aqua}`,
    'typeParameter:dart': `${palette.purple}`,
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
    // Markdown {{{
    'heading:markdown': `${palette.aqua}`,
    'emphasis:markdown': `${palette.fg}`,
    'strong:markdown': `${palette.fg}`,
    'link:markdown': `${palette.green}`,
    'code:markdown': `${palette.green}`,
    'string:markdown': `${palette.yellow}`,
    'type:markdown': `${palette.aqua}`,
    'variable:markdown': `${palette.fg}`,
    'function:markdown': `${palette.green}`,
    'parameter:markdown': `${palette.blue}`,
    'property:markdown': `${palette.aqua}`,
    'namespace:markdown': `${palette.purple}`,
    'keyword:markdown': `${palette.red}`,
    'comment:markdown': `${palette.grey0}`,
    'operator:markdown': `${palette.orange}`,
    'number:markdown': `${palette.purple}`,
    'macro:markdown': `${palette.aqua}`,
    'enumMember:markdown': `${palette.blue}`,
    'class:markdown': `${palette.aqua}`,
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
    // reStructuredText {{{
    'namespace:restructuredtext': `${palette.purple}`,
    'type:restructuredtext': `${palette.aqua}`,
    'function:restructuredtext': `${palette.green}`,
    'parameter:restructuredtext': `${palette.blue}`,
    'variable:restructuredtext': `${palette.fg}`,
    'macro:restructuredtext': `${palette.aqua}`,
    'class:restructuredtext': `${palette.aqua}`,
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
    // PureScript {{{
    'type:purescript': `${palette.aqua}`,
    'typeAlias:purescript': `${palette.aqua}`,
    'function:purescript': `${palette.green}`,
    'module:purescript': `${palette.purple}`,
    'class:purescript': `${palette.aqua}`,
    // }}}
    // Scala {{{
    'class:scala': `${palette.aqua}`,
    'trait:scala': `${palette.aqua}`,
    'object:scala': `${palette.aqua}`,
    'enum:scala': `${palette.aqua}`,
    'function:scala': `${palette.green}`,
    'method:scala': `${palette.green}`,
    'parameter:scala': `${palette.blue}`,
    'variable:scala': `${palette.fg}`,
    'typeParameter:scala': `${palette.purple}`,
    'namespace:scala': `${palette.purple}`,
    // }}}
    // SQL {{{
    'function:sql': `${palette.green}`,
    'variable:sql': `${palette.fg}`,
    'type:sql': `${palette.aqua}`,
    'parameter:sql': `${palette.blue}`,
    // }}}
    // Swift {{{
    'class:swift': `${palette.aqua}`,
    'struct:swift': `${palette.aqua}`,
    'enum:swift': `${palette.aqua}`,
    'protocol:swift': `${palette.aqua}`,
    'function:swift': `${palette.green}`,
    'method:swift': `${palette.green}`,
    'parameter:swift': `${palette.blue}`,
    'variable:swift': `${palette.fg}`,
    'property:swift': `${palette.aqua}`,
    // }}}
    // Fish {{{
    'function:fish': `${palette.orange}`,
    'variable:fish': `${palette.blue}`,
    'parameter:fish': `${palette.blue}`,
    'keyword:fish': `${palette.red}`,
    'constant:fish': `${palette.purple}`,
    // }}}
    // CSS {{{
    'property:css': `${palette.aqua}`,
    'variable:css': `${palette.fg}`,
    'function:css': `${palette.green}`,
    'method:css': `${palette.green}`,
    'type:css': `${palette.aqua}`,
    'class:css': `${palette.aqua}`,
    'parameter:css': `${palette.blue}`,
    'namespace:css': `${palette.purple}`,
    'constant:css': `${palette.purple}`,
    'keyword:css': `${palette.red}`,
    // }}}
    // Diff {{{
    'type:diff': `${palette.aqua}`,
    'variable:diff': `${palette.fg}`,
    'function:diff': `${palette.green}`,
    'parameter:diff': `${palette.blue}`,
    'namespace:diff': `${palette.purple}`,
    // }}}
    // YAML {{{
    'type:yaml': `${palette.aqua}`,
    'variable:yaml': `${palette.fg}`,
    'parameter:yaml': `${palette.blue}`,
    'property:yaml': `${palette.aqua}`,
    'namespace:yaml': `${palette.purple}`,
    'function:yaml': `${palette.green}`,
    'method:yaml': `${palette.green}`,
    'keyword:yaml': `${palette.red}`,
    'string:yaml': `${palette.yellow}`,
    'number:yaml': `${palette.purple}`,
    'comment:yaml': `${palette.grey0}`,
    'operator:yaml': `${palette.orange}`,
    'enumMember:yaml': `${palette.blue}`,
    'class:yaml': `${palette.aqua}`,
    'macro:yaml': `${palette.aqua}`,
    // }}}
    // TOML {{{
    'property:toml': `${palette.aqua}`,
    'string:toml': `${palette.yellow}`,
    'number:toml': `${palette.purple}`,
    'keyword:toml': `${palette.red}`,
    'variable:toml': `${palette.fg}`,
    'type:toml': `${palette.aqua}`,
    'namespace:toml': `${palette.purple}`,
    'parameter:toml': `${palette.blue}`,
    'function:toml': `${palette.green}`,
    // }}}
  };
}

// vim: fdm=marker fmr={{{,}}}:
