/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function symbolIconColors(palette: Palette): Record<string, string> {
  // {{{
  return {
    'symbolIcon.colorForeground': `${palette.fg}`,
    'symbolIcon.snippetForeground': `${palette.fg}`,
    'symbolIcon.fieldForeground': `${palette.fg}`,
    'symbolIcon.fileForeground': `${palette.fg}`,
    'symbolIcon.folderForeground': `${palette.fg}`,
    'symbolIcon.textForeground': `${palette.fg}`,
    'symbolIcon.unitForeground': `${palette.fg}`,
    'symbolIcon.keywordForeground': `${palette.red}`,
    'symbolIcon.operatorForeground': `${palette.orange}`,
    'symbolIcon.classForeground': `${palette.yellow}`,
    'symbolIcon.eventForeground': `${palette.yellow}`,
    'symbolIcon.interfaceForeground': `${palette.yellow}`,
    'symbolIcon.structForeground': `${palette.yellow}`,
    'symbolIcon.functionForeground': `${palette.green}`,
    'symbolIcon.keyForeground': `${palette.green}`,
    'symbolIcon.methodForeground': `${palette.green}`,
    'symbolIcon.stringForeground': `${palette.green}`,
    'symbolIcon.constantForeground': `${palette.aqua}`,
    'symbolIcon.enumeratorMemberForeground': `${palette.aqua}`,
    'symbolIcon.nullForeground': `${palette.aqua}`,
    'symbolIcon.propertyForeground': `${palette.aqua}`,
    'symbolIcon.typeParameterForeground': `${palette.aqua}`,
    'symbolIcon.arrayForeground': `${palette.blue}`,
    'symbolIcon.referenceForeground': `${palette.blue}`,
    'symbolIcon.variableForeground': `${palette.blue}`,
    'symbolIcon.booleanForeground': `${palette.purple}`,
    'symbolIcon.constructorForeground': `${palette.purple}`,
    'symbolIcon.enumeratorForeground': `${palette.purple}`,
    'symbolIcon.moduleForeground': `${palette.purple}`,
    'symbolIcon.namespaceForeground': `${palette.purple}`,
    'symbolIcon.numberForeground': `${palette.purple}`,
    'symbolIcon.objectForeground': `${palette.purple}`,
    'symbolIcon.packageForeground': `${palette.purple}`,
  };
} // }}}
// vim: fdm=marker fmr={{{,}}}:
