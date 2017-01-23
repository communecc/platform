// Copyright (c) 2015 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import keyMirror from 'keymirror';

import audioIcon from 'images/icons/audio.png';
import videoIcon from 'images/icons/video.png';
import excelIcon from 'images/icons/excel.png';
import pptIcon from 'images/icons/ppt.png';
import pdfIcon from 'images/icons/pdf.png';
import codeIcon from 'images/icons/code.png';
import wordIcon from 'images/icons/word.png';
import patchIcon from 'images/icons/patch.png';
import genericIcon from 'images/icons/generic.png';

import logoImage from 'images/logo_compact.png';
import logoWebhook from 'images/webhook_icon.jpg';

import solarizedDarkCSS from '!!file?name=files/code_themes/[hash].[ext]!highlight.js/styles/solarized-dark.css';
import solarizedDarkIcon from 'images/themes/code_themes/solarized-dark.png';

import solarizedLightCSS from '!!file?name=files/code_themes/[hash].[ext]!highlight.js/styles/solarized-light.css';
import solarizedLightIcon from 'images/themes/code_themes/solarized-light.png';

import githubCSS from '!!file?name=files/code_themes/[hash].[ext]!highlight.js/styles/github.css';
import githubIcon from 'images/themes/code_themes/github.png';

import monokaiCSS from '!!file?name=files/code_themes/[hash].[ext]!highlight.js/styles/monokai.css';
import monokaiIcon from 'images/themes/code_themes/monokai.png';

import defaultThemeImage from 'images/themes/organization.png';
import mattermostDarkThemeImage from 'images/themes/mattermost_dark.png';
import mattermostThemeImage from 'images/themes/mattermost.png';
import windows10ThemeImage from 'images/themes/windows_dark.png';

export const Preferences = {
    CATEGORY_DIRECT_CHANNEL_SHOW: 'direct_channel_show',
    CATEGORY_DISPLAY_SETTINGS: 'display_settings',
    DISPLAY_PREFER_NICKNAME: 'nickname_full_name',
    DISPLAY_PREFER_FULL_NAME: 'full_name',
    CATEGORY_ADVANCED_SETTINGS: 'advanced_settings',
    TUTORIAL_STEP: 'tutorial_step',
    CHANNEL_DISPLAY_MODE: 'channel_display_mode',
    CHANNEL_DISPLAY_MODE_CENTERED: 'centered',
    CHANNEL_DISPLAY_MODE_FULL_SCREEN: 'full',
    CHANNEL_DISPLAY_MODE_DEFAULT: 'full',
    MESSAGE_DISPLAY: 'message_display',
    MESSAGE_DISPLAY_CLEAN: 'clean',
    MESSAGE_DISPLAY_COMPACT: 'compact',
    MESSAGE_DISPLAY_DEFAULT: 'clean',
    COLLAPSE_DISPLAY: 'collapse_previews',
    COLLAPSE_DISPLAY_DEFAULT: 'false',
    USE_MILITARY_TIME: 'use_military_time',
    CATEGORY_THEME: 'theme',
    CATEGORY_FLAGGED_POST: 'flagged_post',
    CATEGORY_NOTIFICATIONS: 'notifications',
    EMAIL_INTERVAL: 'email_interval'
};

export const ActionTypes = keyMirror({
    RECEIVED_ERROR: null,

    CLICK_CHANNEL: null,
    CREATE_CHANNEL: null,
    LEAVE_CHANNEL: null,
    CREATE_POST: null,
    CREATE_COMMENT: null,
    POST_DELETED: null,
    REMOVE_POST: null,

    RECEIVED_CHANNELS: null,
    RECEIVED_CHANNEL: null,
    RECEIVED_MORE_CHANNELS: null,
    RECEIVED_CHANNEL_EXTRA_INFO: null,

    FOCUS_POST: null,
    RECEIVED_POSTS: null,
    RECEIVED_FOCUSED_POST: null,
    RECEIVED_POST: null,
    RECEIVED_EDIT_POST: null,
    RECEIVED_SEARCH: null,
    RECEIVED_SEARCH_TERM: null,
    RECEIVED_POST_SELECTED: null,
    RECEIVED_MENTION_DATA: null,
    RECEIVED_ADD_MENTION: null,

    RECEIVED_PROFILES_FOR_DM_LIST: null,
    RECEIVED_PROFILES: null,
    RECEIVED_DIRECT_PROFILES: null,
    RECEIVED_ME: null,
    RECEIVED_SESSIONS: null,
    RECEIVED_AUDITS: null,
    RECEIVED_TEAMS: null,
    RECEIVED_STATUSES: null,
    RECEIVED_PREFERENCE: null,
    RECEIVED_PREFERENCES: null,
    DELETED_PREFERENCES: null,
    RECEIVED_FILE_INFOS: null,
    RECEIVED_ANALYTICS: null,

    RECEIVED_INCOMING_WEBHOOKS: null,
    RECEIVED_INCOMING_WEBHOOK: null,
    REMOVED_INCOMING_WEBHOOK: null,
    RECEIVED_OUTGOING_WEBHOOKS: null,
    RECEIVED_OUTGOING_WEBHOOK: null,
    UPDATED_OUTGOING_WEBHOOK: null,
    REMOVED_OUTGOING_WEBHOOK: null,
    RECEIVED_COMMANDS: null,
    RECEIVED_COMMAND: null,
    UPDATED_COMMAND: null,
    REMOVED_COMMAND: null,
    RECEIVED_OAUTHAPPS: null,
    RECEIVED_OAUTHAPP: null,
    REMOVED_OAUTHAPP: null,

    RECEIVED_CUSTOM_EMOJIS: null,
    RECEIVED_CUSTOM_EMOJI: null,
    UPDATED_CUSTOM_EMOJI: null,
    REMOVED_CUSTOM_EMOJI: null,

    RECEIVED_MSG: null,

    RECEIVED_MY_TEAM: null,
    CREATED_TEAM: null,

    RECEIVED_CONFIG: null,
    RECEIVED_LOGS: null,
    RECEIVED_SERVER_AUDITS: null,
    RECEIVED_SERVER_COMPLIANCE_REPORTS: null,
    RECEIVED_ALL_TEAMS: null,
    RECEIVED_ALL_TEAM_LISTINGS: null,
    RECEIVED_TEAM_MEMBERS: null,
    RECEIVED_MEMBERS_FOR_TEAM: null,

    RECEIVED_LOCALE: null,

    SHOW_SEARCH: null,

    USER_TYPING: null,

    TOGGLE_IMPORT_THEME_MODAL: null,
    TOGGLE_INVITE_MEMBER_MODAL: null,
    TOGGLE_LEAVE_TEAM_MODAL: null,
    TOGGLE_DELETE_POST_MODAL: null,
    TOGGLE_GET_POST_LINK_MODAL: null,
    TOGGLE_GET_TEAM_INVITE_LINK_MODAL: null,
    TOGGLE_GET_PUBLIC_LINK_MODAL: null,

    SUGGESTION_PRETEXT_CHANGED: null,
    SUGGESTION_RECEIVED_SUGGESTIONS: null,
    SUGGESTION_CLEAR_SUGGESTIONS: null,
    SUGGESTION_COMPLETE_WORD: null,
    SUGGESTION_SELECT_NEXT: null,
    SUGGESTION_SELECT_PREVIOUS: null
});

export const WebrtcActionTypes = keyMirror({
    INITIALIZE: null,
    NOTIFY: null,
    CHANGED: null,
    ANSWER: null,
    DECLINE: null,
    CANCEL: null,
    NO_ANSWER: null,
    BUSY: null,
    FAILED: null,
    UNSUPPORTED: null,
    MUTED: null,
    IN_PROGRESS: null,
    DISABLED: null,
    RHS: null
});

export const UserStatuses = {
    OFFLINE: 'offline',
    AWAY: 'away',
    ONLINE: 'online'
};

export const SocketEvents = {
    POSTED: 'posted',
    POST_EDITED: 'post_edited',
    POST_DELETED: 'post_deleted',
    CHANNEL_DELETED: 'channel_deleted',
    CHANNEL_VIEWED: 'channel_viewed',
    DIRECT_ADDED: 'direct_added',
    NEW_USER: 'new_user',
    LEAVE_TEAM: 'leave_team',
    USER_ADDED: 'user_added',
    USER_REMOVED: 'user_removed',
    USER_UPDATED: 'user_updated',
    TYPING: 'typing',
    PREFERENCE_CHANGED: 'preference_changed',
    EPHEMERAL_MESSAGE: 'ephemeral_message',
    STATUS_CHANGED: 'status_change',
    HELLO: 'hello',
    WEBRTC: 'webrtc'
};

export const TutorialSteps = {
    INTRO_SCREENS: 0,
    POST_POPOVER: 1,
    CHANNEL_POPOVER: 2,
    MENU_POPOVER: 3
};

export const Constants = {
    Preferences,
    SocketEvents,
    ActionTypes,
    WebrtcActionTypes,
    UserStatuses,
    TutorialSteps,

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    StatTypes: keyMirror({
        TOTAL_USERS: null,
        TOTAL_PUBLIC_CHANNELS: null,
        TOTAL_PRIVATE_GROUPS: null,
        TOTAL_POSTS: null,
        TOTAL_TEAMS: null,
        TOTAL_FILE_POSTS: null,
        TOTAL_HASHTAG_POSTS: null,
        TOTAL_IHOOKS: null,
        TOTAL_OHOOKS: null,
        TOTAL_COMMANDS: null,
        TOTAL_SESSIONS: null,
        POST_PER_DAY: null,
        USERS_WITH_POSTS_PER_DAY: null,
        RECENTLY_ACTIVE_USERS: null,
        NEWLY_CREATED_USERS: null
    }),
    STAT_MAX_ACTIVE_USERS: 20,
    STAT_MAX_NEW_USERS: 20,

    UserUpdateEvents: {
        USERNAME: 'username',
        FULLNAME: 'fullname',
        NICKNAME: 'nickname',
        EMAIL: 'email',
        LANGUAGE: 'language'
    },

    ScrollTypes: {
        FREE: 1,
        BOTTOM: 2,
        SIDEBBAR_OPEN: 3,
        NEW_MESSAGE: 4,
        POST: 5
    },

    SPECIAL_MENTIONS: ['all', 'channel', 'here'],
    CHARACTER_LIMIT: 4000,
    IMAGE_TYPES: ['jpg', 'gif', 'bmp', 'png', 'jpeg'],
    AUDIO_TYPES: ['mp3', 'wav', 'wma', 'm4a', 'flac', 'aac', 'ogg'],
    VIDEO_TYPES: ['mp4', 'avi', 'webm', 'mkv', 'wmv', 'mpg', 'mov', 'flv'],
    PRESENTATION_TYPES: ['ppt', 'pptx'],
    SPREADSHEET_TYPES: ['xlsx', 'csv'],
    WORD_TYPES: ['doc', 'docx'],
    CODE_TYPES: ['as', 'applescript', 'osascript', 'scpt', 'bash', 'sh', 'zsh', 'clj', 'boot', 'cl2', 'cljc', 'cljs', 'cljs.hl', 'cljscm', 'cljx', 'hic', 'coffee', '_coffee', 'cake', 'cjsx', 'cson', 'iced', 'cpp', 'c', 'cc', 'h', 'c++', 'h++', 'hpp', 'cs', 'csharp', 'css', 'd', 'di', 'dart', 'delphi', 'dpr', 'dfm', 'pas', 'pascal', 'freepascal', 'lazarus', 'lpr', 'lfm', 'diff', 'django', 'jinja', 'dockerfile', 'docker', 'erl', 'f90', 'f95', 'fsharp', 'fs', 'gcode', 'nc', 'go', 'groovy', 'handlebars', 'hbs', 'html.hbs', 'html.handlebars', 'hs', 'hx', 'java', 'jsp', 'js', 'jsx', 'json', 'jl', 'kt', 'ktm', 'kts', 'less', 'lisp', 'lua', 'mk', 'mak', 'md', 'mkdown', 'mkd', 'matlab', 'm', 'mm', 'objc', 'obj-c', 'ml', 'perl', 'pl', 'php', 'php3', 'php4', 'php5', 'php6', 'ps', 'ps1', 'pp', 'py', 'gyp', 'r', 'ruby', 'rb', 'gemspec', 'podspec', 'thor', 'irb', 'rs', 'scala', 'scm', 'sld', 'scss', 'st', 'sql', 'swift', 'tex', 'txt', 'vbnet', 'vb', 'bas', 'vbs', 'v', 'veo', 'xml', 'html', 'xhtml', 'rss', 'atom', 'xsl', 'plist', 'yaml'],
    PDF_TYPES: ['pdf'],
    PATCH_TYPES: ['patch'],
    ICON_FROM_TYPE: {
        audio: audioIcon,
        video: videoIcon,
        spreadsheet: excelIcon,
        presentation: pptIcon,
        pdf: pdfIcon,
        code: codeIcon,
        word: wordIcon,
        patch: patchIcon,
        other: genericIcon
    },
    ICON_NAME_FROM_TYPE: {
        audio: 'audio',
        video: 'video',
        spreadsheet: 'excel',
        presentation: 'ppt',
        pdf: 'pdf',
        code: 'code',
        word: 'word',
        patch: 'patch',
        other: 'generic'
    },
    MAX_DISPLAY_FILES: 5,
    MAX_UPLOAD_FILES: 5,
    THUMBNAIL_WIDTH: 128,
    THUMBNAIL_HEIGHT: 100,
    WEB_VIDEO_WIDTH: 640,
    WEB_VIDEO_HEIGHT: 480,
    MOBILE_VIDEO_WIDTH: 480,
    MOBILE_VIDEO_HEIGHT: 360,
    MOBILE_SCREEN_WIDTH: 768,
    SCROLL_DELAY: 2000,
    SCROLL_PAGE_FRACTION: 3,
    DEFAULT_CHANNEL: 'town-square',
    DEFAULT_CHANNEL_UI_NAME: 'Time Square',
    OFFTOPIC_CHANNEL: 'off-topic',
    OFFTOPIC_CHANNEL_UI_NAME: 'Off-Topic',
    GITLAB_SERVICE: 'gitlab',
    GOOGLE_SERVICE: 'google',
    OFFICE365_SERVICE: 'office365',
    EMAIL_SERVICE: 'email',
    LDAP_SERVICE: 'ldap',
    SAML_SERVICE: 'saml',
    USERNAME_SERVICE: 'username',
    SIGNIN_CHANGE: 'signin_change',
    PASSWORD_CHANGE: 'password_change',
    SIGNIN_VERIFIED: 'verified',
    SESSION_EXPIRED: 'expired',
    POST_CHUNK_SIZE: 60,
    MAX_POST_CHUNKS: 3,
    POST_FOCUS_CONTEXT_RADIUS: 10,
    POST_LOADING: 'loading',
    POST_FAILED: 'failed',
    POST_DELETED: 'deleted',
    POST_TYPE_EPHEMERAL: 'system_ephemeral',
    POST_TYPE_JOIN_LEAVE: 'system_join_leave',
    POST_TYPE_ATTACHMENT: 'slack_attachment',
    SYSTEM_MESSAGE_PREFIX: 'system_',
    SYSTEM_MESSAGE_PROFILE_NAME: 'System',
    SYSTEM_MESSAGE_PROFILE_IMAGE: logoImage,
    RESERVED_TEAM_NAMES: [
        'www',
        'web',
        'admin',
        'support',
        'notify',
        'test',
        'demo',
        'mail',
        'team',
        'channel',
        'internal',
        'localhost',
        'dockerhost',
        'stag',
        'post',
        'cluster',
        'api'
    ],
    RESERVED_USERNAMES: [
        'valet',
        'all',
        'channel',
        'here',
        'matterbot'
    ],
    MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    MAX_DMS: 20,
    MAX_CHANNEL_POPOVER_COUNT: 100,
    DM_CHANNEL: 'D',
    OPEN_CHANNEL: 'O',
    PRIVATE_CHANNEL: 'P',
    INVITE_TEAM: 'I',
    OPEN_TEAM: 'O',
    MAX_POST_LEN: 4000,
    EMOJI_SIZE: 16,
    FLAG_ICON_OUTLINE_SVG: "<svg width='12px' height='12px' viewBox='0 0 48 48' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;'> <g> <g transform='matrix(1,0,0,0.957537,-0.5,1.42123)'> <path d='M2.5,0.5C1.4,0.5 0.5,1.4 0.5,2.5L0.5,45.6C0.5,46.7 1.4,47.6 2.5,47.6C3.6,47.6 4.5,46.7 4.5,45.6L4.5,2.5C4.4,1.4 3.5,0.5 2.5,0.5Z'/> </g> <g transform='matrix(0.923469,0,0,0.870026,1.64285,2.0085)'> <path d='M46.4,3.5C43.3,2.1 40.1,1.4 36.5,1.4C32.1,1.4 27.8,2.4 23.6,3.4C19.4,4.4 15.5,5.3 11.6,5.3C10.5,5.3 9.4,5.2 8.4,5.1L8.4,37C9.4,37.1 10.5,37.2 11.6,37.2C16,37.2 20.3,36.2 24.5,35.2C28.7,34.2 32.6,33.3 36.5,33.3C39.5,33.3 42.3,33.9 44.8,35.1C45.4,35.4 46.1,35.3 46.7,35C47.3,34.6 47.6,34 47.6,33.3L47.6,5.3C47.5,4.6 47.1,3.9 46.4,3.5Z' style='stroke-width:3.23px; fill:none;'/> </g> </g> </svg>",
    FLAG_ICON_SVG: "<svg width='12px' height='12px' viewBox='0 0 48 48' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;'> <g> <g transform='matrix(1,0,0,0.957537,-0.5,1.42123)'> <path d='M2.5,0.5C1.4,0.5 0.5,1.4 0.5,2.5L0.5,45.6C0.5,46.7 1.4,47.6 2.5,47.6C3.6,47.6 4.5,46.7 4.5,45.6L4.5,2.5C4.4,1.4 3.5,0.5 2.5,0.5Z'/> </g> <g transform='matrix(0.923469,0,0,0.870026,1.64285,2.0085)'> <path d='M46.4,3.5C43.3,2.1 40.1,1.4 36.5,1.4C32.1,1.4 27.8,2.4 23.6,3.4C19.4,4.4 15.5,5.3 11.6,5.3C10.5,5.3 9.4,5.2 8.4,5.1L8.4,37C9.4,37.1 10.5,37.2 11.6,37.2C16,37.2 20.3,36.2 24.5,35.2C28.7,34.2 32.6,33.3 36.5,33.3C39.5,33.3 42.3,33.9 44.8,35.1C45.4,35.4 46.1,35.3 46.7,35C47.3,34.6 47.6,34 47.6,33.3L47.6,5.3C47.5,4.6 47.1,3.9 46.4,3.5Z' style='stroke-width:3.23px;'/> </g> </g> </svg>",
    ATTACHMENT_ICON_SVG: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 48 48' enable-background='new 0 0 48 48' xml:space='preserve'><g><path d='M43.922,6.653c-2.643-2.644-6.201-4.107-9.959-4.069c-3.774,0.019-7.32,1.497-9.983,4.161l-12.3,12.3l-8.523,8.521   c-4.143,4.144-4.217,10.812-0.167,14.862c1.996,1.996,4.626,2.989,7.277,2.989c2.73,0,5.482-1.055,7.583-3.156l15.547-15.545   c0.002-0.002,0.002-0.004,0.004-0.005l5.358-5.358c1.394-1.393,2.176-3.24,2.201-5.2c0.026-1.975-0.716-3.818-2.09-5.192   c-2.834-2.835-7.496-2.787-10.394,0.108L9.689,29.857c-0.563,0.563-0.563,1.474,0,2.036c0.281,0.28,0.649,0.421,1.018,0.421   c0.369,0,0.737-0.141,1.018-0.421l18.787-18.788c1.773-1.774,4.609-1.824,6.322-0.11c0.82,0.82,1.263,1.928,1.247,3.119   c-0.017,1.205-0.497,2.342-1.357,3.201l-5.55,5.551c-0.002,0.002-0.002,0.004-0.004,0.005L15.814,40.225   c-3.02,3.02-7.86,3.094-10.789,0.167c-2.928-2.929-2.854-7.77,0.167-10.791l0.958-0.958c0.001-0.002,0.004-0.002,0.005-0.004   L26.016,8.78c2.123-2.124,4.951-3.303,7.961-3.317c2.998,0.02,5.814,1.13,7.91,3.226c4.35,4.351,4.309,11.472-0.093,15.873   L25.459,40.895c-0.563,0.562-0.563,1.473,0,2.035c0.281,0.281,0.65,0.422,1.018,0.422c0.369,0,0.737-0.141,1.018-0.422   L43.83,26.596C49.354,21.073,49.395,12.126,43.922,6.653z'></path></g></svg>",
    MATTERMOST_ICON_SVG: "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'viewBox='0 0 500 500' style='enable-background:new 0 0 500 500;' xml:space='preserve'> <style type='text/css'> .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#222222;} </style> <g id='XMLID_1_'> <g id='XMLID_3_'> <path id='XMLID_4_' class='st0' d='M396.9,47.7l2.6,53.1c43,47.5,60,114.8,38.6,178.1c-32,94.4-137.4,144.1-235.4,110.9 S51.1,253.1,83,158.7C104.5,95.2,159.2,52,222.5,40.5l34.2-40.4C150-2.8,49.3,63.4,13.3,169.9C-31,300.6,39.1,442.5,169.9,486.7 s272.6-25.8,316.9-156.6C522.7,223.9,483.1,110.3,396.9,47.7z'/> </g> <path id='XMLID_2_' class='st0' d='M335.6,204.3l-1.8-74.2l-1.5-42.7l-1-37c0,0,0.2-17.8-0.4-22c-0.1-0.9-0.4-1.6-0.7-2.2 c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.2c-0.7-1.2-1.8-2.1-3.1-2.6c-1.4-0.5-2.9-0.4-4.2,0.2c0,0-0.1,0-0.1,0 c-0.2,0.1-0.3,0.1-0.4,0.2c-0.6,0.3-1.2,0.7-1.8,1.3c-3,3-13.7,17.2-13.7,17.2l-23.2,28.8l-27.1,33l-46.5,57.8 c0,0-21.3,26.6-16.6,59.4s29.1,48.7,48,55.1c18.9,6.4,48,8.5,71.6-14.7C336.4,238.4,335.6,204.3,335.6,204.3z'/> </g> </svg>",
    ONLINE_ICON_SVG: "<svg version='1.1'id='Layer_1' xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#' xmlns:svg='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:cc='http://creativecommons.org/ns#' inkscape:version='0.48.4 r9939' sodipodi:docname='TRASH_1_4.svg'xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-243 245 12 12'style='enable-background:new -243 245 12 12;' xml:space='preserve'> <sodipodi:namedview  inkscape:cx='26.358185' inkscape:zoom='1.18' bordercolor='#666666' pagecolor='#ffffff' borderopacity='1' objecttolerance='10' inkscape:cy='139.7898' gridtolerance='10' guidetolerance='10' showgrid='false' showguides='true' id='namedview6' inkscape:pageopacity='0' inkscape:pageshadow='2' inkscape:guide-bbox='true' inkscape:window-width='1366' inkscape:current-layer='Layer_1' inkscape:window-height='705' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:window-x='-8'> <sodipodi:guide  position='50.036793,85.991376' orientation='1,0' id='guide2986'></sodipodi:guide> <sodipodi:guide  position='58.426196,66.216355' orientation='0,1' id='guide3047'></sodipodi:guide> </sodipodi:namedview> <g> <path class='online--icon' d='M-236,250.5C-236,250.5-236,250.5-236,250.5C-236,250.5-236,250.5-236,250.5C-236,250.5-236,250.5-236,250.5z'/> <ellipse class='online--icon' cx='-238.5' cy='248' rx='2.5' ry='2.5'/> </g> <path class='online--icon' d='M-238.9,253.8c0-0.4,0.1-0.9,0.2-1.3c-2.2-0.2-2.2-2-2.2-2s-1,0.1-1.2,0.5c-0.4,0.6-0.6,1.7-0.7,2.5c0,0.1-0.1,0.5,0,0.6 c0.2,1.3,2.2,2.3,4.4,2.4c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0C-238.7,255.7-238.9,254.8-238.9,253.8z'/> <g> <g> <path class='online--icon' d='M-232.3,250.1l1.3,1.3c0,0,0,0.1,0,0.1l-4.1,4.1c0,0,0,0-0.1,0c0,0,0,0,0,0l-2.7-2.7c0,0,0-0.1,0-0.1l1.2-1.2 c0,0,0.1,0,0.1,0l1.4,1.4l2.9-2.9C-232.4,250.1-232.3,250.1-232.3,250.1z'/> </g> </g> </svg>",
    AWAY_ICON_SVG: "<svg version='1.1'id='Layer_1' xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#' xmlns:svg='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:cc='http://creativecommons.org/ns#' inkscape:version='0.48.4 r9939' sodipodi:docname='TRASH_1_4.svg'xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-299 391 12 12'style='enable-background:new -299 391 12 12;' xml:space='preserve'> <sodipodi:namedview  inkscape:cx='26.358185' inkscape:zoom='1.18' bordercolor='#666666' pagecolor='#ffffff' borderopacity='1' objecttolerance='10' inkscape:cy='139.7898' gridtolerance='10' guidetolerance='10' showgrid='false' showguides='true' id='namedview6' inkscape:pageopacity='0' inkscape:pageshadow='2' inkscape:guide-bbox='true' inkscape:window-width='1366' inkscape:current-layer='Layer_1' inkscape:window-height='705' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:window-x='-8'> <sodipodi:guide  position='50.036793,85.991376' orientation='1,0' id='guide2986'></sodipodi:guide> <sodipodi:guide  position='58.426196,66.216355' orientation='0,1' id='guide3047'></sodipodi:guide> </sodipodi:namedview> <g> <ellipse class='away--icon' cx='-294.6' cy='394' rx='2.5' ry='2.5'/> <path class='away--icon' d='M-293.8,399.4c0-0.4,0.1-0.7,0.2-1c-0.3,0.1-0.6,0.2-1,0.2c-2.5,0-2.5-2-2.5-2s-1,0.1-1.2,0.5c-0.4,0.6-0.6,1.7-0.7,2.5 c0,0.1-0.1,0.5,0,0.6c0.2,1.3,2.2,2.3,4.4,2.4c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.7,0,1.4-0.1,2-0.3 C-293.3,401.5-293.8,400.5-293.8,399.4z'/> </g> <path class='away--icon' d='M-287,400c0,0.1-0.1,0.1-0.1,0.1l-4.9,0c-0.1,0-0.1-0.1-0.1-0.1v-1.6c0-0.1,0.1-0.1,0.1-0.1l4.9,0c0.1,0,0.1,0.1,0.1,0.1 V400z'/> </svg>",
    OFFLINE_ICON_SVG: "<svg version='1.1'id='Layer_1' xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#' xmlns:svg='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:cc='http://creativecommons.org/ns#' inkscape:version='0.48.4 r9939' sodipodi:docname='TRASH_1_4.svg'xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-299 391 12 12'style='enable-background:new -299 391 12 12;' xml:space='preserve'> <sodipodi:namedview  inkscape:cx='26.358185' inkscape:zoom='1.18' bordercolor='#666666' pagecolor='#ffffff' borderopacity='1' objecttolerance='10' inkscape:cy='139.7898' gridtolerance='10' guidetolerance='10' showgrid='false' showguides='true' id='namedview6' inkscape:pageopacity='0' inkscape:pageshadow='2' inkscape:guide-bbox='true' inkscape:window-width='1366' inkscape:current-layer='Layer_1' inkscape:window-height='705' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:window-x='-8'> <sodipodi:guide  position='50.036793,85.991376' orientation='1,0' id='guide2986'></sodipodi:guide> <sodipodi:guide  position='58.426196,66.216355' orientation='0,1' id='guide3047'></sodipodi:guide> </sodipodi:namedview> <g> <g> <ellipse class='offline--icon' cx='-294.5' cy='394' rx='2.5' ry='2.5'/> <path class='offline--icon' d='M-294.3,399.7c0-0.4,0.1-0.8,0.2-1.2c-0.1,0-0.2,0-0.4,0c-2.5,0-2.5-2-2.5-2s-1,0.1-1.2,0.5c-0.4,0.6-0.6,1.7-0.7,2.5 c0,0.1-0.1,0.5,0,0.6c0.2,1.3,2.2,2.3,4.4,2.4h0.1h0.1c0.3,0,0.7,0,1-0.1C-293.9,401.6-294.3,400.7-294.3,399.7z'/> </g> </g> <g> <path class='offline--icon' d='M-288.9,399.4l1.8-1.8c0.1-0.1,0.1-0.3,0-0.3l-0.7-0.7c-0.1-0.1-0.3-0.1-0.3,0l-1.8,1.8l-1.8-1.8c-0.1-0.1-0.3-0.1-0.3,0 l-0.7,0.7c-0.1,0.1-0.1,0.3,0,0.3l1.8,1.8l-1.8,1.8c-0.1,0.1-0.1,0.3,0,0.3l0.7,0.7c0.1,0.1,0.3,0.1,0.3,0l1.8-1.8l1.8,1.8 c0.1,0.1,0.3,0.1,0.3,0l0.7-0.7c0.1-0.1,0.1-0.3,0-0.3L-288.9,399.4z'/> </g> </svg>",
    MENU_ICON: "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'width='4px' height='16px' viewBox='0 0 8 32' enable-background='new 0 0 8 32' xml:space='preserve'> <g> <circle cx='4' cy='4.062' r='4'/> <circle cx='4' cy='16' r='4'/> <circle cx='4' cy='28' r='4'/> </g> </svg>",
    COMMENT_ICON: "<svg version='1.1' id='Layer_2' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'width='15px' height='15px' viewBox='1 1.5 15 15' enable-background='new 1 1.5 15 15' xml:space='preserve'> <g> <g> <path fill='#211B1B' d='M14,1.5H3c-1.104,0-2,0.896-2,2v8c0,1.104,0.896,2,2,2h1.628l1.884,3l1.866-3H14c1.104,0,2-0.896,2-2v-8 C16,2.396,15.104,1.5,14,1.5z M15,11.5c0,0.553-0.447,1-1,1H8l-1.493,2l-1.504-1.991L5,12.5H3c-0.552,0-1-0.447-1-1v-8 c0-0.552,0.448-1,1-1h11c0.553,0,1,0.448,1,1V11.5z'/> </g> </g> </svg>",
    REPLY_ICON: "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'viewBox='-158 242 18 18' style='enable-background:new -158 242 18 18;' xml:space='preserve'> <path d='M-142.2,252.6c-2-3-4.8-4.7-8.3-4.8v-3.3c0-0.2-0.1-0.3-0.2-0.3s-0.3,0-0.4,0.1l-6.9,6.2c-0.1,0.1-0.1,0.2-0.1,0.3 c0,0.1,0,0.2,0.1,0.3l6.9,6.4c0.1,0.1,0.3,0.1,0.4,0.1c0.1-0.1,0.2-0.2,0.2-0.4v-3.8c4.2,0,7.4,0.4,9.6,4.4c0.1,0.1,0.2,0.2,0.3,0.2 c0,0,0.1,0,0.1,0c0.2-0.1,0.3-0.3,0.2-0.4C-140.2,257.3-140.6,255-142.2,252.6z M-150.8,252.5c-0.2,0-0.4,0.2-0.4,0.4v3.3l-6-5.5 l6-5.3v2.8c0,0.2,0.2,0.4,0.4,0.4c3.3,0,6,1.5,8,4.5c0.5,0.8,0.9,1.6,1.2,2.3C-144,252.8-147.1,252.5-150.8,252.5z'/> </svg>",
    SCROLL_BOTTOM_ICON: "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'viewBox='-239 239 21 23' style='enable-background:new -239 239 21 23;' xml:space='preserve'> <path d='M-239,241.4l2.4-2.4l8.1,8.2l8.1-8.2l2.4,2.4l-10.5,10.6L-239,241.4z M-228.5,257.2l8.1-8.2l2.4,2.4l-10.5,10.6l-10.5-10.6 l2.4-2.4L-228.5,257.2z'/> </svg>",
    UPDATE_TYPING_MS: 5000,
    THEMES: {
        default: {
            type: 'Organization',
            sidebarBg: '#2071a7',
            sidebarText: '#fff',
            sidebarUnreadText: '#fff',
            sidebarTextHoverBg: '#136197',
            sidebarTextActiveBorder: '#7AB0D6',
            sidebarTextActiveColor: '#FFFFFF',
            sidebarHeaderBg: '#2f81b7',
            sidebarHeaderTextColor: '#FFFFFF',
            onlineIndicator: '#7DBE00',
            awayIndicator: '#DCBD4E',
            mentionBj: '#FBFBFB',
            mentionColor: '#2071A7',
            centerChannelBg: '#f2f4f8',
            centerChannelColor: '#333333',
            newMessageSeparator: '#FF8800',
            linkColor: '#2f81b7',
            buttonBg: '#1dacfc',
            buttonColor: '#FFFFFF',
            mentionHighlightBg: '#fff2bb',
            mentionHighlightLink: '#2f81b7',
            codeTheme: 'github',
            image: defaultThemeImage
        },
        mattermost: {
            type: 'Commune',
            sidebarBg: '#fafafa',
            sidebarText: '#333333',
            sidebarUnreadText: '#333333',
            sidebarTextHoverBg: '#e6f2fa',
            sidebarTextActiveBorder: '#378FD2',
            sidebarTextActiveColor: '#111111',
            sidebarHeaderBg: '#3481B9',
            sidebarHeaderTextColor: '#ffffff',
            onlineIndicator: '#7DBE00',
            awayIndicator: '#DCBD4E',
            mentionBj: '#2389d7',
            mentionColor: '#ffffff',
            centerChannelBg: '#ffffff',
            centerChannelColor: '#333333',
            newMessageSeparator: '#FF8800',
            linkColor: '#2389d7',
            buttonBg: '#23A2FF',
            buttonColor: '#FFFFFF',
            mentionHighlightBg: '#fff2bb',
            mentionHighlightLink: '#2f81b7',
            codeTheme: 'github',
            image: mattermostThemeImage
        },
        mattermostDark: {
            type: 'Commune CC Dark',
            sidebarBg: '#1B2C3E',
            sidebarText: '#fff',
            sidebarUnreadText: '#fff',
            sidebarTextHoverBg: '#4A5664',
            sidebarTextActiveBorder: '#66B9A7',
            sidebarTextActiveColor: '#FFFFFF',
            sidebarHeaderBg: '#1B2C3E',
            sidebarHeaderTextColor: '#FFFFFF',
            onlineIndicator: '#55C5B2',
            awayIndicator: '#A9A14C',
            mentionBj: '#B74A4A',
            mentionColor: '#FFFFFF',
            centerChannelBg: '#2F3E4E',
            centerChannelColor: '#DDDDDD',
            newMessageSeparator: '#5de5da',
            linkColor: '#A4FFEB',
            buttonBg: '#4CBBA4',
            buttonColor: '#FFFFFF',
            mentionHighlightBg: '#984063',
            mentionHighlightLink: '#A4FFEB',
            codeTheme: 'solarized-dark',
            image: mattermostDarkThemeImage
        },
        windows10: {
            type: 'Windows Dark',
            sidebarBg: '#171717',
            sidebarText: '#fff',
            sidebarUnreadText: '#fff',
            sidebarTextHoverBg: '#302e30',
            sidebarTextActiveBorder: '#196CAF',
            sidebarTextActiveColor: '#FFFFFF',
            sidebarHeaderBg: '#1f1f1f',
            sidebarHeaderTextColor: '#FFFFFF',
            onlineIndicator: '#0177e7',
            awayIndicator: '#A9A14C',
            mentionBj: '#0177e7',
            mentionColor: '#FFFFFF',
            centerChannelBg: '#1F1F1F',
            centerChannelColor: '#DDDDDD',
            newMessageSeparator: '#CC992D',
            linkColor: '#0D93FF',
            buttonBg: '#0177e7',
            buttonColor: '#FFFFFF',
            mentionHighlightBg: '#784098',
            mentionHighlightLink: '#A4FFEB',
            codeTheme: 'monokai',
            image: windows10ThemeImage
        }
    },
    THEME_ELEMENTS: [
        {
            group: 'sidebarElements',
            id: 'sidebarBg',
            uiName: 'Sidebar BG'
        },
        {
            group: 'sidebarElements',
            id: 'sidebarText',
            uiName: 'Sidebar Text'
        },
        {
            group: 'sidebarElements',
            id: 'sidebarHeaderBg',
            uiName: 'Sidebar Header BG'
        },
        {
            group: 'sidebarElements',
            id: 'sidebarHeaderTextColor',
            uiName: 'Sidebar Header Text'
        },
        {
            group: 'sidebarElements',
            id: 'sidebarUnreadText',
            uiName: 'Sidebar Unread Text'
        },
        {
            group: 'sidebarElements',
            id: 'sidebarTextHoverBg',
            uiName: 'Sidebar Text Hover BG'
        },
        {
            group: 'sidebarElements',
            id: 'sidebarTextActiveBorder',
            uiName: 'Sidebar Text Active Border'
        },
        {
            group: 'sidebarElements',
            id: 'sidebarTextActiveColor',
            uiName: 'Sidebar Text Active Color'
        },
        {
            group: 'sidebarElements',
            id: 'onlineIndicator',
            uiName: 'Online Indicator'
        },
        {
            group: 'sidebarElements',
            id: 'awayIndicator',
            uiName: 'Away Indicator'
        },
        {
            group: 'sidebarElements',
            id: 'mentionBj',
            uiName: 'Mention Jewel BG'
        },
        {
            group: 'sidebarElements',
            id: 'mentionColor',
            uiName: 'Mention Jewel Text'
        },
        {
            group: 'centerChannelElements',
            id: 'centerChannelBg',
            uiName: 'Center Channel BG'
        },
        {
            group: 'centerChannelElements',
            id: 'centerChannelColor',
            uiName: 'Center Channel Text'
        },
        {
            group: 'centerChannelElements',
            id: 'newMessageSeparator',
            uiName: 'New Message Separator'
        },
        {
            group: 'centerChannelElements',
            id: 'mentionHighlightBg',
            uiName: 'Mention Highlight BG'
        },
        {
            group: 'linkAndButtonElements',
            id: 'linkColor',
            uiName: 'Link Color'
        },
        {
            group: 'centerChannelElements',
            id: 'mentionHighlightLink',
            uiName: 'Mention Highlight Link'
        },
        {
            group: 'linkAndButtonElements',
            id: 'buttonBg',
            uiName: 'Button BG'
        },
        {
            group: 'linkAndButtonElements',
            id: 'buttonColor',
            uiName: 'Button Text'
        },
        {
            group: 'centerChannelElements',
            id: 'codeTheme',
            uiName: 'Code Theme',
            themes: [
                {
                    id: 'solarized-dark',
                    uiName: 'Solarized Dark',
                    cssURL: solarizedDarkCSS,
                    iconURL: solarizedDarkIcon
                },
                {
                    id: 'solarized-light',
                    uiName: 'Solarized Light',
                    cssURL: solarizedLightCSS,
                    iconURL: solarizedLightIcon
                },
                {
                    id: 'github',
                    uiName: 'GitHub',
                    cssURL: githubCSS,
                    iconURL: githubIcon
                },
                {
                    id: 'monokai',
                    uiName: 'Monokai',
                    cssURL: monokaiCSS,
                    iconURL: monokaiIcon
                }
            ]
        }
    ],
    DEFAULT_CODE_THEME: 'github',
    FONTS: {
        'Droid Serif': 'font--droid_serif',
        'Roboto Slab': 'font--roboto_slab',
        Lora: 'font--lora',
        Arvo: 'font--arvo',
        'Open Sans': 'font--open_sans',
        Roboto: 'font--roboto',
        'PT Sans': 'font--pt_sans',
        Lato: 'font--lato',
        'Source Sans Pro': 'font--source_sans_pro',
        'Exo 2': 'font--exo_2',
        Ubuntu: 'font--ubuntu'
    },
    DEFAULT_FONT: 'Open Sans',
    KeyCodes: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        CAPS_LOCK: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        CMD: 91,
        MENU: 93,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUM_LOCK: 144,
        SEMICOLON: 186,
        EQUAL: 187,
        COMMA: 188,
        DASH: 189,
        PERIOD: 190,
        FORWARD_SLASH: 191,
        TILDE: 192,
        OPEN_BRACKET: 219,
        BACK_SLASH: 220,
        CLOSE_BRACKET: 221
    },
    CODE_PREVIEW_MAX_FILE_SIZE: 500000, // 500 KB
    HighlightedLanguages: {
        actionscript: {name: 'ActionScript', extensions: ['as']},
        applescript: {name: 'AppleScript', extensions: ['applescript', 'osascript', 'scpt']},
        bash: {name: 'Bash', extensions: ['bash', 'sh', 'zsh']},
        clojure: {name: 'Clojure', extensions: ['clj', 'boot', 'cl2', 'cljc', 'cljs', 'cljs.hl', 'cljscm', 'cljx', 'hic']},
        coffeescript: {name: 'CoffeeScript', extensions: ['coffee', '_coffee', 'cake', 'cjsx', 'cson', 'iced']},
        cpp: {name: 'C/C++', extensions: ['cpp', 'c', 'cc', 'h', 'c++', 'h++', 'hpp']},
        cs: {name: 'C#', extensions: ['cs', 'csharp']},
        css: {name: 'CSS', extensions: ['css']},
        d: {name: 'D', extensions: ['d', 'di']},
        dart: {name: 'Dart', extensions: ['dart']},
        delphi: {name: 'Delphi', extensions: ['delphi', 'dpr', 'dfm', 'pas', 'pascal', 'freepascal', 'lazarus', 'lpr', 'lfm']},
        diff: {name: 'Diff', extensions: ['diff', 'patch']},
        django: {name: 'Django', extensions: ['django', 'jinja']},
        dockerfile: {name: 'Dockerfile', extensions: ['dockerfile', 'docker']},
        erlang: {name: 'Erlang', extensions: ['erl']},
        fortran: {name: 'Fortran', extensions: ['f90', 'f95']},
        fsharp: {name: 'F#', extensions: ['fsharp', 'fs']},
        gcode: {name: 'G-Code', extensions: ['gcode', 'nc']},
        go: {name: 'Go', extensions: ['go']},
        groovy: {name: 'Groovy', extensions: ['groovy']},
        handlebars: {name: 'Handlebars', extensions: ['handlebars', 'hbs', 'html.hbs', 'html.handlebars']},
        haskell: {name: 'Haskell', extensions: ['hs']},
        haxe: {name: 'Haxe', extensions: ['hx']},
        java: {name: 'Java', extensions: ['java', 'jsp']},
        javascript: {name: 'JavaScript', extensions: ['js', 'jsx']},
        json: {name: 'JSON', extensions: ['json']},
        julia: {name: 'Julia', extensions: ['jl']},
        kotlin: {name: 'Kotlin', extensions: ['kt', 'ktm', 'kts']},
        less: {name: 'Less', extensions: ['less']},
        lisp: {name: 'Lisp', extensions: ['lisp']},
        lua: {name: 'Lua', extensions: ['lua']},
        makefile: {name: 'Makefile', extensions: ['mk', 'mak']},
        markdown: {name: 'Markdown', extensions: ['md', 'mkdown', 'mkd']},
        matlab: {name: 'Matlab', extensions: ['matlab', 'm']},
        objectivec: {name: 'Objective C', extensions: ['mm', 'objc', 'obj-c']},
        ocaml: {name: 'OCaml', extensions: ['ml']},
        perl: {name: 'Perl', extensions: ['perl', 'pl']},
        php: {name: 'PHP', extensions: ['php', 'php3', 'php4', 'php5', 'php6']},
        powershell: {name: 'PowerShell', extensions: ['ps', 'ps1']},
        puppet: {name: 'Puppet', extensions: ['pp']},
        python: {name: 'Python', extensions: ['py', 'gyp']},
        r: {name: 'R', extensions: ['r']},
        ruby: {name: 'Ruby', extensions: ['ruby', 'rb', 'gemspec', 'podspec', 'thor', 'irb']},
        rust: {name: 'Rust', extensions: ['rs']},
        scala: {name: 'Scala', extensions: ['scala']},
        scheme: {name: 'Scheme', extensions: ['scm', 'sld']},
        scss: {name: 'SCSS', extensions: ['scss']},
        smalltalk: {name: 'Smalltalk', extensions: ['st']},
        sql: {name: 'SQL', extensions: ['sql']},
        swift: {name: 'Swift', extensions: ['swift']},
        tex: {name: 'TeX', extensions: ['tex']},
        text: {name: 'Text', extensions: ['txt']},
        vbnet: {name: 'VB.Net', extensions: ['vbnet', 'vb', 'bas']},
        vbscript: {name: 'VBScript', extensions: ['vbs']},
        verilog: {name: 'Verilog', extensions: ['v', 'veo']},
        xml: {name: 'HTML, XML', extensions: ['xml', 'html', 'xhtml', 'rss', 'atom', 'xsl', 'plist']},
        yaml: {name: 'YAML', extensions: ['yaml']}
    },
    PostsViewJumpTypes: {
        BOTTOM: 1,
        POST: 2,
        SIDEBAR_OPEN: 3
    },
    NotificationPrefs: {
        MENTION: 'mention'
    },
    Integrations: {
        COMMAND: 'commands',
        INCOMING_WEBHOOK: 'incoming_webhooks',
        OUTGOING_WEBHOOK: 'outgoing_webhooks',
        OAUTH_APP: 'oauth2-apps'
    },
    FeatureTogglePrefix: 'feature_enabled_',
    PRE_RELEASE_FEATURES: {
        MARKDOWN_PREVIEW: {
            label: 'markdown_preview', // github issue: https://github.com/mattermost/platform/pull/1389
            description: 'Show markdown preview option in message input box'
        },
        EMBED_PREVIEW: {
            label: 'embed_preview',
            description: 'Show preview snippet of links below message'
        },
        WEBRTC_PREVIEW: {
            label: 'webrtc_preview',
            description: 'Enable WebRTC one on one calls'
        }
    },
    OVERLAY_TIME_DELAY: 400,
    WEBRTC_TIME_DELAY: 750,
    WEBRTC_CLEAR_ERROR_DELAY: 15000,
    DEFAULT_MAX_USERS_PER_TEAM: 50,
    MIN_TEAMNAME_LENGTH: 4,
    MAX_TEAMNAME_LENGTH: 15,
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 22,
    MAX_NICKNAME_LENGTH: 22,
    MIN_PASSWORD_LENGTH: 5,
    MAX_PASSWORD_LENGTH: 64,
    MIN_TRIGGER_LENGTH: 1,
    MAX_TRIGGER_LENGTH: 128,
    MAX_TEXTSETTING_LENGTH: 1024,
    MAX_SITENAME_LENGTH: 30,
    TIME_SINCE_UPDATE_INTERVAL: 30000,
    MIN_HASHTAG_LINK_LENGTH: 3,
    CHANNEL_SCROLL_ADJUSTMENT: 100,
    EMOJI_PATH: '/static/emoji',
    DEFAULT_WEBHOOK_LOGO: logoWebhook,
    MHPNS: 'https://push.youcommune.com',
    MTPNS: 'http://push-test.youcommune.com',
    BOT_NAME: 'BOT',
    MAX_PREV_MSGS: 100,
    POST_COLLAPSE_TIMEOUT: 1000 * 60 * 5, // five minutes
    LICENSE_EXPIRY_NOTIFICATION: 1000 * 60 * 60 * 24 * 15, // 15 days
    LICENSE_GRACE_PERIOD: 1000 * 60 * 60 * 24 * 15, // 15 days
    PERMISSIONS_ALL: 'all',
    PERMISSIONS_TEAM_ADMIN: 'team_admin',
    PERMISSIONS_SYSTEM_ADMIN: 'system_admin',
    MENTION_CHANNELS: 'mention.channels',
    MENTION_MORE_CHANNELS: 'mention.morechannels',
    MENTION_MEMBERS: 'mention.members',
    MENTION_NONMEMBERS: 'mention.nonmembers',
    MENTION_SPECIAL: 'mention.special',
    DEFAULT_NOTIFICATION_DURATION: 5000
};

export default Constants;
