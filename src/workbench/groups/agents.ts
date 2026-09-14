/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

/**
 * VS Code ≥1.135 Agents Window (sessions workbench) color tokens.
 * Unknown IDs are ignored by older VS Code versions, so these are safe
 * to ship against engines.vscode ^1.97.0.
 *
 * Keys match microsoft/vscode `src/vs/sessions/common/theme.ts` plus
 * `agentsVoice.*` from `contrib/agentsVoice`.
 */
export function agentsWindowColors(palette: Palette): Record<string, string> {
  return {
    'agents.background': `${palette.bg}`,
    'agentsPanel.background': `${palette.bg1}`,
    'agentsPanel.foreground': `${palette.fg}`,
    'agentsPanel.border': `${palette.bg5}`,
    'agentsCard.border': `${palette.bg5}`,
    'agentsBottomPanel.border': `${palette.bg5}`,
    'agentsGradient.tintColor': `${palette.badge}`,
    'agentFeedbackEditorWidget.background': `${palette.bg2}`,
    'agentFeedbackEditorWidget.border': `${palette.bg4}`,
    'agentFeedbackInputWidget.border': `${palette.bg4}`,
    'agentsUpdateButton.downloadingBackground': `${palette.badge}66`,
    'agentsUpdateButton.downloadedBackground': `${palette.badge}b3`,
    'agentsChatInput.background': `${palette.bg}`,
    'agentsChatInput.foreground': `${palette.fg}`,
    'agentsChatInput.border': `${palette.bg5}`,
    'agentsChatInput.focusBorder': `${palette.badge}`,
    'agentsChatInput.placeholderForeground': `${palette.grey0}`,
    'agentsNewSessionButton.background': `${palette.bg}00`,
    'agentsNewSessionButton.foreground': `${palette.fg}`,
    'agentsNewSessionButton.border': `${palette.bg5}`,
    'agentsNewSessionButton.hoverBackground': `${palette.bg2}`,
    'agentsBadge.background': `${palette.badge}`,
    'agentsBadge.foreground': `${palette.bg}`,
    'agentsUnreadBadge.background': `${palette.badge}`,
    'agentsUnreadBadge.foreground': `${palette.bg}`,
    'activeSessionView.background': `${palette.bg1}`,
    'activeSessionView.foreground': `${palette.fg}`,
    'inactiveSessionView.background': `${palette.bg}`,
    'inactiveSessionView.foreground': `${palette.grey1}`,
    'agentsVoice.speakingForeground': `${palette.purple}`,
    'agentsVoice.speakingBackground': `${palette.dimPurple}14`,
  };
}
