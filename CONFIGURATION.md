# Configuration Reference

Ravenwood exposes 12 configuration options under the `ravenwood.*` namespace in VS Code's `settings.json`. All options are optional; when a value is unset or matches its default, the extension ships the prebuilt `themes/*.json` files unchanged.

Dark and light variants are configured independently. Most options take an enum of palette hues (`red`, `orange`, `yellow`, `green`, `aqua`, `blue`, `purple`) plus a neutral (`grey` for selection, `white`/`black` for cursor).

## Contrast

### `ravenwood.darkContrast`

Background contrast level for the dark variant.

- **Type:** `string`
- **Default:** `"medium"`
- **Allowed:** `"soft"` | `"medium"` | `"hard"`

### `ravenwood.lightContrast`

Background contrast level for the light variant.

- **Type:** `string`
- **Default:** `"medium"`
- **Allowed:** `"soft"` | `"medium"` | `"hard"`

## Workbench Style

### `ravenwood.darkWorkbench`

Workbench UI style for the dark variant.

- **Type:** `string`
- **Default:** `"material"`
- **Allowed:** `"material"` | `"flat"` | `"high-contrast"`

### `ravenwood.lightWorkbench`

Workbench UI style for the light variant.

- **Type:** `string`
- **Default:** `"material"`
- **Allowed:** `"material"` | `"flat"` | `"high-contrast"`

## Cursor Color

### `ravenwood.darkCursor`

The cursor color in the dark variant.

- **Type:** `string`
- **Default:** `"white"` (maps to `palette.fg`)
- **Allowed:** `"white"` | `"red"` | `"orange"` | `"yellow"` | `"green"` | `"aqua"` | `"blue"` | `"purple"`

### `ravenwood.lightCursor`

The cursor color in the light variant.

- **Type:** `string`
- **Default:** `"black"` (maps to `palette.fg`)
- **Allowed:** `"black"` | `"red"` | `"orange"` | `"yellow"` | `"green"` | `"aqua"` | `"blue"` | `"purple"`

## Selection Color

### `ravenwood.darkSelection`

Background color of selected text in the dark variant.

- **Type:** `string`
- **Default:** `"grey"`
- **Allowed:** `"grey"` | `"red"` | `"orange"` | `"yellow"` | `"green"` | `"aqua"` | `"blue"` | `"purple"`

### `ravenwood.lightSelection`

Background color of selected text in the light variant.

- **Type:** `string`
- **Default:** `"grey"`
- **Allowed:** `"grey"` | `"red"` | `"orange"` | `"yellow"` | `"green"` | `"aqua"` | `"blue"` | `"purple"`

## Italics

### `ravenwood.italicKeywords`

Italicize keywords (e.g. `if`, `return`, `class`) across all supported languages.

- **Type:** `boolean`
- **Default:** `false`

### `ravenwood.italicComments`

Italicize comments across all languages.

- **Type:** `boolean`
- **Default:** `true`

## Diagnostics & Accessibility

### `ravenwood.diagnosticTextBackgroundOpacity`

The opacity of the background color of [diagnostic text](https://code.visualstudio.com/updates/v1_52#_error-background-colors) (error / warning / info underlines and squiggle backgrounds).

- **Type:** `string`
- **Default:** `"0%"`
- **Allowed:** `"0%"` | `"12.5%"` | `"25%"` | `"37.5%"` | `"50%"`

Higher values make the colored background behind diagnostic text more visible.

### `ravenwood.highContrast`

Whether to add an additional border around items across the UI to increase the contrast. Adds `contrastBorder` and `contrastActiveBorder` workbench tokens regardless of the chosen workbench style.

- **Type:** `boolean`
- **Default:** `false`

## Example

```json
{
  "ravenwood.darkContrast": "hard",
  "ravenwood.darkWorkbench": "flat",
  "ravenwood.darkCursor": "aqua",
  "ravenwood.darkSelection": "blue",
  "ravenwood.italicKeywords": true,
  "ravenwood.italicComments": true,
  "ravenwood.diagnosticTextBackgroundOpacity": "25%",
  "ravenwood.highContrast": true
}
```

With the above settings, Ravenwood regenerates `themes/ravenwood-dark.json` and `themes/ravenwood-light.json` on save; VS Code reloads the theme automatically. No reload prompt is shown.