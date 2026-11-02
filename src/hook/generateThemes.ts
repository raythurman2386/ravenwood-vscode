/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

/**
 * Build-time theme generator. Writes the default dark + light theme JSON
 * files into the repo's `themes/` directory so they can be packaged with the
 * extension. Run via `npm run compile:themes`.
 *
 * This script MUST NOT import the `vscode` module (it is not available at
 * build time). It depends only on pure modules: `interface`, `themeData`,
 * and the palette/workbench/syntax/semantic generators they pull in.
 */

import { join } from 'node:path';
import { writeJsonFile } from '../fsUtil';
import type { Configuration, Palette } from '../interface';
import alfheim from '../palette/realms/alfheim';
import asgard from '../palette/realms/asgard';
import grokday, {
  surfaces as grokdaySurfaces,
} from '../palette/realms/grokday';
import groknight, {
  surfaces as groknightSurfaces,
} from '../palette/realms/groknight';
import helheim from '../palette/realms/helheim';
import jotunheim from '../palette/realms/jotunheim';
import muspelheim from '../palette/realms/muspelheim';
import nidavellir from '../palette/realms/nidavellir';
import svartalfheim from '../palette/realms/svartalfheim';
import vanaheim from '../palette/realms/vanaheim';
import { getSemanticFromPalette } from '../semantic';
import { buildSyntax } from '../syntax/rules';
import { getThemeData } from '../themeData';
import { materialWorkbench } from '../workbench/material';

const configuration: Configuration = {
  darkContrast: 'medium',
  lightContrast: 'medium',
  darkWorkbench: 'material',
  lightWorkbench: 'material',
  darkSelection: 'grey',
  lightSelection: 'grey',
  darkCursor: 'white',
  lightCursor: 'black',
  italicKeywords: false,
  italicComments: true,
  diagnosticTextBackgroundOpacity: '0%',
  highContrast: false,
};

async function generate(
  darkPath: string,
  lightPath: string,
  data: ReturnType<typeof getThemeData>,
): Promise<void> {
  await Promise.all([
    writeJsonFile(darkPath, data.dark),
    writeJsonFile(lightPath, data.light),
  ]);
}

generate(
  join(__dirname, '..', '..', 'themes', 'ravenwood-dark.json'),
  join(__dirname, '..', '..', 'themes', 'ravenwood-light.json'),
  getThemeData(configuration),
).catch((err: unknown) => {
  console.error('Failed to generate themes:', err);
  process.exit(1);
});

// --- Realm themes (static, build-time only)

interface RealmSurfaces {
  sidebar: string;
  terminal: string;
  card: string;
}

interface RealmDef {
  name: string;
  palette: Palette;
  isDark: boolean;
  /** Display label override; defaults to `Ravenwood <Capitalized name>`. */
  label?: string;
  /** Optional distinct surface hexes for sidebar/terminal/widgets (Grok realms). */
  surfaces?: RealmSurfaces;
}

const realms: RealmDef[] = [
  { name: 'asgard', palette: asgard, isDark: true },
  { name: 'vanaheim', palette: vanaheim, isDark: true },
  { name: 'alfheim', palette: alfheim, isDark: false },
  { name: 'svartalfheim', palette: svartalfheim, isDark: true },
  { name: 'nidavellir', palette: nidavellir, isDark: true },
  { name: 'jotunheim', palette: jotunheim, isDark: true },
  { name: 'muspelheim', palette: muspelheim, isDark: true },
  { name: 'helheim', palette: helheim, isDark: true },
  {
    name: 'grokday',
    label: 'Ravenwood GrokDay',
    palette: grokday,
    isDark: false,
    surfaces: grokdaySurfaces,
  },
  {
    name: 'groknight',
    label: 'Ravenwood GrokNight',
    palette: groknight,
    isDark: true,
    surfaces: groknightSurfaces,
  },
];

/** Default Configuration for static realm themes (material, grey selection, fg cursor, 0% diagnostic, italic keywords). */
const realmConfig: Configuration = {
  darkContrast: 'medium',
  lightContrast: 'medium',
  darkWorkbench: 'material',
  lightWorkbench: 'material',
  darkSelection: 'grey',
  lightSelection: 'grey',
  darkCursor: 'white',
  lightCursor: 'black',
  italicKeywords: true,
  italicComments: true,
  diagnosticTextBackgroundOpacity: '0%',
  highContrast: false,
};

function buildRealmTheme(realm: RealmDef): object {
  const variant = realm.isDark ? 'dark' : 'light';
  const workbench = {
    ...materialWorkbench(realm.palette, realmConfig, variant),
    ...surfaceOverrides(realm.surfaces),
  };
  const syntax = buildSyntax(realm.palette, true, true);
  const semantic = getSemanticFromPalette(realm.palette);

  return {
    name: realm.label ?? `Ravenwood ${capitalize(realm.name)}`,
    type: realm.isDark ? 'dark' : 'light',
    semanticHighlighting: true,
    semanticTokenColors: semantic,
    colors: workbench,
    tokenColors: syntax,
  };
}

/** Map distinct sidebar/terminal/card surfaces onto workbench keys that otherwise all use palette.bg. */
function surfaceOverrides(
  surfaces: RealmSurfaces | undefined,
): Record<string, string> {
  if (!surfaces) return {};
  const { sidebar, terminal, card } = surfaces;
  return {
    'sideBar.background': sidebar,
    'sideBar.border': sidebar,
    'sideBarTitle.background': sidebar,
    'sideBarTitle.border': sidebar,
    'sideBarSectionHeader.border': sidebar,
    'sideBarActivityBarTop.border': sidebar,
    'activityBar.background': sidebar,
    'activityBar.border': sidebar,
    'activityBar.activeBackground': sidebar,
    'panel.background': terminal,
    'panel.border': terminal,
    'terminal.background': terminal,
    'terminal.border': terminal,
    'terminalCursor.background': terminal,
    'editorWidget.background': card,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function generateRealms(): Promise<void> {
  await Promise.all(
    realms.map(async (realm) => {
      const theme = buildRealmTheme(realm);
      const filePath = join(
        __dirname,
        '..',
        '..',
        'themes',
        `ravenwood-${realm.name}.json`,
      );
      await writeJsonFile(filePath, theme);
      console.log(`✓ Generated themes/ravenwood-${realm.name}.json`);
    }),
  );
}

generateRealms().catch((err: unknown) => {
  console.error('Failed to generate realm themes:', err);
  process.exit(1);
});
