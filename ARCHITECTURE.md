# Architecture

Ravenwood is a VS Code theme extension that dynamically regenerates its theme JSON files at runtime when the user changes any `ravenwood.*` configuration option. The same generation logic runs at build time to ship default `themes/ravenwood-dark.json` and `themes/ravenwood-light.json` files in the extension package.

## Module Layout

```
src/
├── index-client.ts      Desktop entry point — registers config-change listener
├── index-web.ts         Web entry point — informs user that web cannot regenerate
├── interface.ts         TypeScript interfaces (Configuration, Palette, ThemeData, SyntaxRule)
├── themeData.ts         Pure ThemeData builder (shared by runtime + build-time)
├── utils.ts             Utils class — config detection, file writing, regeneration
├── semantic.ts          LSP semantic token colors
├── hook/
│   └── generateThemes.ts   Build-time script that writes default themes/*.json
├── palette/
│   ├── index.ts            getPalette — picks foreground + background by variant × contrast
│   ├── dark/
│   │   ├── foreground.ts
│   │   └── background/{soft,medium,hard}.ts
│   └── light/
│       ├── foreground.ts
│       └── background/{soft,medium,hard}.ts
├── workbench/
│   ├── index.ts            getWorkbench — dispatches by workbench style
│   ├── common.ts           shared helpers (selection, cursor, diagnostic, variant colors)
│   ├── base.ts             base token map (shared ~95% across all three styles)
│   ├── material.ts         material style — the default (no overrides)
│   ├── flat.ts             flat style — overrides list/sidebar/tab backgrounds
│   └── highContrast.ts    high-contrast style — darker activity bar / sidebar
└── syntax/
    ├── index.ts            getSyntax — picks default vs italic variant
    ├── default.ts          default TextMate scope rules
    └── italic.ts           italic-keyword TextMate scope rules
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
                      └─ getDefaultSyntax | getItalicSyntax (based on italicKeywords)
            └─ Utils.generate(darkPath, lightPath, data)
                 └─ Promise.all([writeFile(dark), writeFile(light)])
        │
        ▼
VS Code reloads themes/ravenwood-{dark,light}.json automatically
```

The `activate()` function receives an `ExtensionContext` and pushes the `onDidChangeConfiguration` subscription into `context.subscriptions`, so the listener is cleaned up on deactivate.

### Newly-Installed Detection

On activation, `Utils.isNewlyInstalled()` checks for a `.flag` file alongside the extension. If absent (first run), it creates the flag and returns `true`. If the user's config is also non-default, themes are regenerated once to honor those settings. Subsequent activations skip this path.

## Build-Time Generation

`src/hook/generateThemes.ts` is run by `npm run compile:themes` (part of `npm run compile`). It builds a default `Configuration` (all defaults) and calls the same pure `getThemeData()` helper from `src/themeData.ts`, writing the result into `themes/ravenwood-{dark,light}.json`. This script must **not** import the `vscode` module (it runs under plain Node), which is why the `ThemeData` builder lives in the separate `src/themeData.ts` module rather than in `src/utils.ts`.

## Palette

Each variant (`dark` / `light`) has three contrast levels (`soft` / `medium` / `hard`). The palette is split into:

- **Background files** (`palette/{variant}/background/*.ts`) — `bg0`–`bg5`, `grey0`–`grey2`, `shadow` (11 keys).
- **Foreground files** (`palette/{variant}/foreground.ts`) — `fg`, 7 hues, 7 dim hues, `badge` (16 keys).

`getPalette()` merges a background file with a foreground file into the full 27-key `Palette`. Each palette file is annotated with `satisfies Partial<Palette>` so a misspelled key fails at compile time.

## Workbench Styles

The three workbench styles (`material`, `flat`, `highContrast`) share ~95% of their token map. The common tokens live in `src/workbench/base.ts` as `getBaseWorkbenchTokens()`. Each style file (`material.ts`, `flat.ts`, `highContrast.ts`) calls the base and spreads its own overrides on top. The `highContrast` config flag is applied last via `applyHighContrastFlag()` in `base.ts`, adding `contrastBorder` / `contrastActiveBorder`.

## Syntax Rules

Two TextMate rule arrays exist: `default.ts` (regular) and `italic.ts` (italic keywords). `getSyntax()` picks one based on `configuration.italicKeywords`. The `italicComments` flag defaults to `true` when unset, matching the documented default.

Rust has the deepest syntax coverage (9 TextMate rules + 15 LSP semantic tokens), followed by Go (6 TextMate + 8 semantic). Python, Swift, SQL, and TypeScript also have expanded coverage with explicit scope rules for modern language features (f-strings, generics, type hints, attributes). Both `default.ts` and `italic.ts` mirror each other in language coverage; the italic variant adds `fontStyle: "italic"` to keyword/declaration rules.

## Adding a New Configuration Option

When introducing a new `ravenwood.*` setting, update **all five** of these locations (this list also appears at the top of `src/interface.ts`):

1. `package.json` — add to `contributes.configuration.properties`
2. `src/interface.ts` — add the property to the `Configuration` interface
3. `src/utils.ts` — read it in `getConfiguration()`
4. `src/utils.ts` — compare it in `isDefaultConfiguration()`
5. `src/hook/generateThemes.ts` — include its default value in the build-time `configuration` object

Also add an `else if (variant === ...) { ... }` branch to any variant-dispatching function (in `palette/index.ts`, `workbench/index.ts`, `workbench/common.ts`) if the new option is variant-specific — these now `throw` on unknown variants rather than silently falling back to light.