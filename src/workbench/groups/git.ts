/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function gitColors(palette: Palette): Record<string, string> {
  return {
    'gitDecoration.addedResourceForeground': `${palette.green}a0`,
    'gitDecoration.modifiedResourceForeground': `${palette.blue}a0`,
    'gitDecoration.deletedResourceForeground': `${palette.red}a0`,
    'gitDecoration.untrackedResourceForeground': `${palette.yellow}a0`,
    'gitDecoration.ignoredResourceForeground': `${palette.bg5}`,
    'gitDecoration.conflictingResourceForeground': `${palette.purple}a0`,
    'gitDecoration.submoduleResourceForeground': `${palette.orange}a0`,
    'gitDecoration.stageDeletedResourceForeground': `${palette.aqua}a0`,
    'gitDecoration.stageModifiedResourceForeground': `${palette.aqua}a0`,
    'gitDecoration.renamedResourceForeground': `${palette.purple}a0`,
    'git.blame.editorDecorationForeground': `${palette.grey0}a0`,
    'scmGraph.foreground1': `${palette.red}`,
    'scmGraph.foreground2': `${palette.yellow}`,
    'scmGraph.foreground3': `${palette.green}`,
    'scmGraph.foreground4': `${palette.blue}`,
    'scmGraph.foreground5': `${palette.purple}`,
    'scmGraph.historyItemHoverLabelForeground': `${palette.fg}`,
    'scmGraph.historyItemHoverAdditionsForeground': `${palette.green}`,
    'scmGraph.historyItemHoverDeletionsForeground': `${palette.red}`,
    'scmGraph.historyItemRefColor': `${palette.blue}`,
    'scmGraph.historyItemRemoteRefColor': `${palette.purple}`,
    'scmGraph.historyItemBaseRefColor': `${palette.aqua}`,
    'scmGraph.historyItemHoverDefaultLabelForeground': `${palette.grey2}`,
    'scmGraph.historyItemHoverDefaultLabelBackground': `${palette.bg3}`,
    'gitlens.gutterBackgroundColor': `${palette.bg}`,
    'gitlens.gutterForegroundColor': `${palette.fg}`,
    'gitlens.gutterUncommittedForegroundColor': `${palette.blue}`,
    'gitlens.trailingLineForegroundColor': `${palette.grey1}`,
    'gitlens.lineHighlightBackgroundColor': `${palette.bg}`,
    'gitlens.lineHighlightOverviewRulerColor': `${palette.badge}`,
    'gitlens.closedPullRequestIconColor': `${palette.red}`,
    'gitlens.openPullRequestIconColor': `${palette.aqua}`,
    'gitlens.mergedPullRequestIconColor': `${palette.purple}`,
    'gitlens.unpushlishedChangesIconColor': `${palette.blue}`,
    'gitlens.unpublishedCommitIconColor': `${palette.yellow}`,
    'gitlens.unpulledChangesIconColor': `${palette.orange}`,
    'gitlens.decorations.addedForegroundColor': `${palette.green}`,
    'gitlens.decorations.copiedForegroundColor': `${palette.purple}`,
    'gitlens.decorations.deletedForegroundColor': `${palette.red}`,
    'gitlens.decorations.ignoredForegroundColor': `${palette.grey2}`,
    'gitlens.decorations.modifiedForegroundColor': `${palette.blue}`,
    'gitlens.decorations.untrackedForegroundColor': `${palette.yellow}`,
    'gitlens.decorations.renamedForegroundColor': `${palette.purple}`,
    'gitlens.decorations.branchAheadForegroundColor': `${palette.aqua}`,
    'gitlens.decorations.branchBehindForegroundColor': `${palette.orange}`,
    'gitlens.decorations.branchDivergedForegroundColor': `${palette.yellow}`,
    'gitlens.decorations.branchUpToDateForegroundColor': `${palette.fg}`,
    'gitlens.decorations.branchUnpublishedForegroundColor': `${palette.blue}`,
    'gitlens.decorations.branchMissingUpstreamForegroundColor': `${palette.red}`,
  };
}
