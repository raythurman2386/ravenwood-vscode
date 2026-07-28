# Architecture

Ravenwood is a VS Code theme extension that dynamically regenerates its theme JSON files at runtime when the user changes any `ravenwood.*` configuration option. The same generation logic runs at build time to ship default `themes/ravenwood-dark.json` and `themes/ravenwood-light.json` files in the extension package.

## Module Layout

```
src/
├── index-client.ts      Desktop entry point — registers config-change listener
├── index-web.ts         Web entry point — informs user web cannot regenerate
├── interface.ts         TypeScript interfaces + union types (Configuration, Palette, ThemeData, SyntaxRule)
├── themeData.ts         Pure ThemeData builder (shared by runtime + build-time)
├── utils.ts             Utils class — config detection, file writing, regeneration
├── validation.ts        Pure validateConfig() — checks enum values, no vscode dependency
├── fsUtil.ts            Shared writeJsonFile() — used by utils.ts and generateThemes.ts
├── semantic.ts          LSP semantic token colors
├── hook/
│   └── generateThemes.ts   Build-time script that writes default themes/*.json + 8 realm themes
├── palette/
│   ├── index.ts            getPalette — picks foreground + background by variant × contrast
│   ├── dark/
│   │   ├── foreground.ts
│   │   └── background/{soft,medium,hard}.ts
│   ├── light/
│   │   ├── foreground.ts
│   │   └── background/{soft,medium,hard}.ts
│   └── realms/
│       ├── asgard.ts           Dark — golden/majestic (gold, royal purple)
│       ├── vanaheim.ts        Dark — verdant/fertile (deep greens, earth browns)
│       ├── alfheim.ts          Light — ethereal/luminous (pastels, silvery whites)
│       ├── svartalfheim.ts    Dark — subterranean (deep indigos, charcoal)
│       ├── nidavellir.ts      Dark — forge/industry (amber, molten gold, steel)
│       ├── jotunheim.ts       Dark — cold/vast (ice blues, frost whites)
│       ├── muspelheim.ts      Dark — fire/primordial (deep reds, magma, black)
│       └── helheim.ts         Dark — desolate/muted (muted purples, greys)
├── workbench/
│   ├── index.ts            getWorkbench — dispatches by workbench style
│   ├── common.ts           shared helpers (selection, cursor, diagnostic, variant colors)
│   ├── base.ts             base token map (shared ~95% across all three styles)
│   ├── material.ts         material style — the default (no overrides)
│   ├── flat.ts             flat style — overrides list/sidebar/tab backgrounds
│   └── highContrast.ts    high-contrast style — darker activity bar / sidebar
└── syntax/
    ├── index.ts            getSyntax — dispatches to buildSyntax with italicKeywords/italicComments flags
    └── rules.ts            Canonical SYNTAX_RULES array + buildSyntax() — single source of truth for all TextMate rules
```

## Runtime Regeneration Flow

```
User changes ravenwood.* in settings.json
        │
        ▼
VS Code fires onDidChangeConfiguration
        │
        ▼
index-client.ts activate()
  └─ Utils.detectConfigChanges(event, cb)
       └─ if event.affectsConfiguration("ravenwood") → invoke cb
            └─ Utils.getConfiguration()      reads 12 settings
             └─ Utils.getThemeData(cfg)        → themeData.getThemeData(cfg)
                 ├─ getSemantic(cfg, "dark" | "light")
                 ├─ getWorkbench(cfg, "dark" | "light")
                 │    └─ getPalette(cfg, variant)
                 │         └─ merges background + foreground palette files
                 │    └─ materialWorkbench | flatWorkbench | highContrastWorkbench
                 │         └─ getBaseWorkbenchTokens(...) → apply style overrides → applyHighContrastFlag
                 └─ getSyntax(cfg, "dark" | "light")
                      └─ buildSyntax(palette, italicKeywords, italicComments)
                           └─ iterates SYNTAX_RULES applying per-rule italicizeKeywords / onlyWhenItalicKeywords / italicKeywordsScope flags
            └─ Utils.generate(darkPath, lightPath, data)
                 └─ Promise.all([writeJsonFile(dark), writeJsonFile(light)])
        │
        ▼
VS Code reloads themes/ravenwood-{dark,light}.json automatically
```

The `activate()` function receives an `ExtensionContext` and pushes the `onDidChangeConfiguration` subscription into `context.subscriptions`, so the listener is cleaned up on deactivate.

### Newly-Installed Detection

On activation, `Utils.isNewlyInstalled(context)` uses `ExtensionContext.globalState` to persist the installed version string under the key `ravenwood.installedVersion`. If the stored version differs from the current `package.json` version (first install or upgrade), it updates the stored version and returns `true`. If the user's config is also non-default, themes are regenerated once to honor those settings. Subsequent activations with the same version skip this path.

### Configuration Validation

On activation, `Utils.validateConfiguration()` calls the pure `validateConfig()` function in `src/validation.ts` to check each enum-valued config field against its allowed values. If a user has set an invalid value (e.g., a typo like `"darkContrast": "Meduim"` via raw JSON editing — bypassing VS Code's `enum` UI constraint), a `window.showWarningMessage` lists the invalid settings. This catches misconfigurations that would otherwise silently fall through to the `case undefined:` default branch in the dispatch functions.

## Build-Time Generation

`src/hook/generateThemes.ts` is run by `npm run compile:themes` (part of `npm run compile`). It builds a default `Configuration` (all defaults) and calls the same pure `getThemeData()` helper from `src/themeData.ts`, writing the result into `themes/ravenwood-{dark,light}.json`. This script must **not** import the `vscode` module (it runs under plain Node), which is why the `ThemeData` builder lives in the separate `src/themeData.ts` module rather than in `src/utils.ts`.

### Realm Themes

After generating the base Dark/Light themes, `generateThemes.ts` also generates 8 static realm theme JSONs. Each realm palette lives in `src/palette/realms/<name>.ts` and conforms to the same `Palette` interface used by the base themes. The realm themes are built using the existing `materialWorkbench()`, `buildSyntax()`, and `getSemanticFromPalette()` functions directly — bypassing the `getPalette(config, variant)` dispatcher since realms have no user-configurable options.

Realm themes are **static artistic statements**: fixed material workbench style, grey selection, fg cursor, 0% diagnostic opacity, italic keywords + comments. They use the same 971 workbench color keys and full semantic token coverage as the base themes, but are not affected by runtime configuration changes. The `getSemanticFromPalette()` function in `src/semantic.ts` is the palette-direct variant of `getSemantic()` — it accepts a `Palette` directly instead of a `(Configuration, variant)` pair.

## Palette

Each variant (`dark` / `light`) has three contrast levels (`soft` / `medium` / `hard`). The palette is split into:

- **Background files** (`palette/{variant}/background/*.ts`) — `bg0`–`bg5`, `grey0`–`grey2`, `shadow` (11 keys).
- **Foreground files** (`palette/{variant}/foreground.ts`) — `fg`, 7 hues, 7 dim hues, `badge` (16 keys).

`getPalette()` merges a background file with a foreground file into the full 27-key `Palette`. Each palette file is annotated with `satisfies Partial<Palette>` so a misspelled key fails at compile time.

## Workbench Styles

The three workbench styles (`material`, `flat`, `highContrast`) share ~95% of their token map. The common tokens live in `src/workbench/base.ts` as `getBaseWorkbenchTokens()`. Each style file (`material.ts`, `flat.ts`, `highContrast.ts`) calls the base and spreads its own overrides on top. The `highContrast` config flag is applied last via `applyHighContrastFlag()` in `base.ts`, adding `contrastBorder` / `contrastActiveBorder`.

## Syntax Rules

A single canonical `SYNTAX_RULES` array in `src/syntax/rules.ts` defines all TextMate scope rules. `getSyntax()` calls `buildSyntax(palette, italicKeywords, italicComments)` which iterates the array and applies per-rule flags:

- **`italicizeKeywords: true`** — the rule's `fontStyle` gets `"italic"` appended when `italicKeywords` is enabled
- **`onlyWhenItalicKeywords: true`** — the rule is only emitted when `italicKeywords` is enabled (e.g., the "Keyword Italic" split rules)
- **`onlyWhenNotItalicKeywords: true`** — the rule is only emitted when `italicKeywords` is disabled (e.g., the default-mode "Ruby purple" combined rule)
- **`italicKeywordsScope: string`** — overrides the rule's `scope` when `italicKeywords` is enabled (e.g., Go rules that shift scopes between variants)

The `italicComments` flag is handled separately — `buildSyntax` appends the Comment rule with or without `fontStyle: "italic"` based on the flag. This replaces the previous two-file design (`default.ts` + `italic.ts`) that required manual sync between 7400+ lines of duplicated rules.

The theme ships TextMate syntax rules for 35+ languages. Rust has the deepest coverage (9 TextMate rules + 15 LSP semantic tokens), followed by Go (6 TextMate + 11 semantic). Python, TypeScript, Swift, SQL, GraphQL, Dart, and SASS/SCSS also have expanded coverage with explicit scope rules for modern language features (f-strings, generics, type hints, attributes).

## Semantic Tokens

LSP semantic token mappings live in `src/semantic.ts`. Currently covers 11 language IDs: Go, TypeScript, JavaScript, JavaScriptReact, TypeScriptReact, Python, Rust, Java, C#, C++, and Elm. Each language gets a scoped set of token-type to palette-color mappings (e.g., `function:go` maps to `palette.orange`). Token types include `class`, `function`, `method`, `variable`, `parameter`, `property`, `type`, `struct`, `enum`, `module`, `namespace`, `typeParameter`, `decorator`, `macro`, and more.

## Adding a New Configuration Option

When introducing a new `ravenwood.*` setting, update **two** locations (this list also appears at the top of `src/interface.ts`):

1. `package.json` — add to `contributes.configuration.properties` (declares the `enum` constraint for the UI)
2. `src/interface.ts` — add the property to the `Configuration` interface with a proper union type

The type system (union types + `never` exhaustiveness checks in every dispatch site) catches the rest — no manual 5-place checklist required. If the new option is enum-valued, add it to the `ALLOWED` array in `src/validation.ts` so `validateConfig()` can warn users who set invalid values via raw JSON editing. If the new option has variant-specific dispatching, add an `else if (variant === ...) { ... }` branch to the relevant dispatcher — these now `throw` on unknown variants rather than silently falling back.