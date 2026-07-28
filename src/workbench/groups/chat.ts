/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function chatColors(palette: Palette): Record<string, string> {
  // {{{
  return {
    'chat.requestBackground': `${palette.bg1}`,
    'chat.requestBorder': `${palette.bg}00`,
    'chat.slashCommandBackground': `${palette.bg2}`,
    'chat.slashCommandForeground': `${palette.aqua}`,
    'chat.avatarBackground': `${palette.bg1}`,
    'chat.avatarForeground': `${palette.fg}`,
    'chat.editedFileForeground': `${palette.aqua}`,
    'chat.linesAddedForeground': `${palette.green}`,
    'chat.linesRemovedForeground': `${palette.red}`,
    'chat.requestCodeBorder': `${palette.bg5}`,
    'chat.requestBubbleBackground': `${palette.bg1}`,
    'chat.requestBubbleHoverBackground': `${palette.bg2}`,
    'chat.checkpointSeparator': `${palette.bg4}`,
    'chat.thinkingShimmer': `${palette.dimAqua}60`,
    'chatManagement.sashBorder': `${palette.bg5}`,
    'inlineChat.background': `${palette.bg1}`,
    'inlineChat.foreground': `${palette.fg}`,
    'inlineChat.border': `${palette.bg4}`,
    'inlineChat.shadow': `${palette.shadow}`,
    'inlineChatInput.background': `${palette.bg}`,
    'inlineChatInput.border': `${palette.bg4}`,
    'inlineChatInput.focusBorder': `${palette.badge}`,
    'inlineChatInput.placeholderForeground': `${palette.grey0}`,
    'inlineChatDiff.inserted': `${palette.dimGreen}30`,
    'inlineChatDiff.removed': `${palette.dimRed}30`,
    'interactive.activeCodeBorder': `${palette.bg4}`,
    'interactive.inactiveCodeBorder': `${palette.bg}00`,
    'chatParticipant.foreground': `${palette.aqua}`,
    'chatParticipant.background': `${palette.bg2}`,
    'chatParticipant.border': `${palette.bg}00`,
    'chatStatus.foreground': `${palette.grey2}`,
    'chatStatus.background': `${palette.bg1}`,
    'chatStatus.border': `${palette.bg}00`,
    'chatStatus.errorForeground': `${palette.red}`,
    'chatStatus.warningForeground': `${palette.yellow}`,
    'chatStatus.infoForeground': `${palette.blue}`,
    'chatSession.foreground': `${palette.grey2}`,
    'chatSession.background': `${palette.bg1}`,
    'chatSession.border': `${palette.bg}00`,
    'chatEdit.background': `${palette.bg1}`,
    'chatEdit.foreground': `${palette.fg}`,
    'chatEdit.border': `${palette.bg4}`,
    'agent.foreground': `${palette.purple}`,
    'agent.background': `${palette.bg2}`,
    'agent.border': `${palette.bg}00`,
    'agentDashboard.background': `${palette.bg}`,
    'agentDashboard.foreground': `${palette.fg}`,
    'agentDashboard.border': `${palette.bg5}`,
    'simpleChat.background': `${palette.bg}`,
    'simpleChat.foreground': `${palette.fg}`,
    'simpleChat.border': `${palette.bg5}`,
    'simpleChat.inputBackground': `${palette.bg}`,
    'simpleChat.inputForeground': `${palette.fg}`,
    'simpleChat.inputBorder': `${palette.bg5}`,
    'simpleChat.inputFocusBorder': `${palette.badge}`,
    'agentSessionReadIndicator.foreground': `${palette.aqua}`,
    'agentSessionSelectedBadge.border': `${palette.badge}`,
    'agentSessionSelectedUnfocusedBadge.border': `${palette.bg5}`,
    'agentStatusIndicator.background': `${palette.bg1}`,
    'aiCustomizationManagement.sashBorder': `${palette.bg5}`,
  };
} // }}}
// vim: fdm=marker fmr={{{,}}}:
