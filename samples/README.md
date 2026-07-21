# Language Samples

One representative file per language covered by the Ravenwood theme. Open any of these files in VS Code with Ravenwood active to inspect syntax highlighting coverage.

## Languages

| File | Language | Notes |
| ---- | -------- | ----- |
| `rust.rs` | Rust | Expanded in 0.3.0 — functions, macros, lifetimes, types/struct/enum/trait, Self, type params, constants |
| `go.go` | Go | Includes generics (Go 1.18+ type params), channels, interfaces |
| `python.py` | Python | f-strings, magic methods, decorators, type hints, dataclasses |
| `typescript.ts` | TypeScript | generics, enums, async generators, namespaces |
| `react.tsx` | TSX | JSX, React.FC, hooks |
| `javascript.js` | JavaScript | async/await, arrow functions, exports |
| `swift.swift` | Swift | attributes, structs, classes, protocols |
| `sql.sql` | SQL | CREATE/ALTER/DROP, functions, CTEs, variables |
| `java.java` | Java | records, sealed interfaces, pattern matching |
| `kotlin.kt` | Kotlin | coroutines, data classes, @OptIn |
| `scala.scala` | Scala | case classes, sealed traits, string interpolation |
| `groovy.groovy` | Groovy | annotations, GStrings |
| `c.c` | C | structs, function pointers, macros |
| `cpp.cpp` | C++ | templates, namespaces, RAII |
| `csharp.cs` | C# | records, pattern matching, init properties |
| `fsharp.fs` | F# | discriminated unions, computation expressions |
| `php.php` | PHP | enums, traits, readonly, match expr |
| `ruby.rb` | Ruby | modules, classes, regex |
| `haskell.hs` | Haskell | type classes, ADTs, do-notation |
| `lua.lua` | Lua | metatables, methods |
| `r.r` | R | reference classes |
| `perl.pl` | Perl | packages, subroutines |
| `commonlisp.lisp` | Common Lisp | CLOS, generics |
| `clojure.clj` | Clojure | records, protocols, atoms |
| `shell.sh` | Bash | functions, heredocs, conditionals |
| `fish.fish` | Fish | functions, conditionals |
| `powershell.ps1` | PowerShell | classes, cmdlets |
| `erlang.erl` | Erlang | OTP, records, behaviours |
| `elixir.ex` | Elixir | modules, Agent, structs |
| `ocaml.ml` | OCaml | module types, records |
| `julia.jl` | Julia | structs, macros |
| `elm.elm` | Elm | type aliases, ADTs |
| `purescript.purs` | PureScript | effects, Maybe |
| `coffeescript.coffee` | CoffeeScript | classes, fat arrows |

## Markup & Config

| File | Type |
| ---- | ---- |
| `markdown.md` | Markdown |
| `restructuredtext.rst` | reStructuredText |
| `latex.tex` | LaTeX |
| `html.html` | HTML |
| `css.css` | CSS |
| `scss.scss` | SCSS |
| `stylus.styl` | Stylus |
| `pug.pug` | Pug |
| `json.json` | JSON |
| `yaml.yaml` | YAML |
| `toml.toml` | TOML |
| `graphql.graphql` | GraphQL |
| `Dockerfile` | Dockerfile |
| `Makefile` | Makefile |
| `cmake.cmake` | CMake |
| `proto.proto` | Protobuf |
| `diff.diff` | Diff |
| `viml.vim` | VimL |
| `tmux.conf` | Tmux |
| `gitconfig.ini` | Git/INI |

## Inspecting

1. Open the workspace in VS Code.
2. Select the **Ravenwood Dark** (or Light) color theme.
3. To compare italic vs non-italic keyword mode, toggle `ravenwood.italicKeywords` and reload.
4. To compare workbench styles, set `ravenwood.darkWorkbench` to `flat` or `high-contrast`.
5. To compare contrast levels, set `ravenwood.darkContrast` to `soft` or `hard`.

These files are excluded from the packaged `.vsix` via `.vscodeignore` — they are for local inspection only.