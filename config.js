const fs = require('fs');
const path = require('path');
const { getConfig } = require('./lib/configdb');
const settings = require('./settingss');

if (fs.existsSync(path.resolve('config.env'))) {
  require('dotenv').config({ path: path.resolve('config.env') });
}

function convertToBool(text, trueValue = 'true') {
  return text === trueValue;
}

module.exports = {
  SESSION_ID: settings.SESSION_ID || process.env.SESSION_ID || "",
  PREFIX: getConfig("PREFIX") || settings.PREFIX || ".",
  CHATBOT: getConfig("CHATBOT") || "on",
  BOT_NAME: getConfig("BOT_NAME") || process.env.BOT_NAME || "Carly Maxx",
  MODE: getConfig("MODE") || process.env.MODE || "private",
  REPO: process.env.REPO || "https://github.com/Carlymaxx/Maxx-tech",
  PAIRING_CODE: process.env.PARING_CODE || 'true',
  BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",

  OWNER_NUMBER: "0725979273",
  OWNER_NAME: getConfig("OWNER_NAME") || process.env.OWNER_NAME || "Carly Maxx",
  DEV: process.env.DEV || "254740007567",
  DEVELOPER_NUMBER: '254740007567@s.whatsapp.net',
  
  MENU_AUDIO_URL: getConfig("MENU_AUDIO_URL") || process.env.MENU_AUDIO_URL || 'https://files.catbox.moe/vkvci3.mp3',
  AUDIO_URL: getConfig("AUDIO_URL") || process.env.AUDIO_URL || 'https://files.catbox.moe/vkvci3.mp3',
  AUDIO_URL2: getConfig("AUDIO_URL2") || process.env.AUDIO_URL2 || 'https://files.catbox.moe/vkvci3.mp3',
  
  NEWSLETTER_JID: process.env.NEWSLETTER_JID || '120363299029326322@newsletter',

  AUTO_REPLY: getConfig("AUTO_REPLY") || process.env.AUTO_REPLY || "false",
  AUTO_STATUS_REPLY: getConfig("AUTO_STATUS_REPLY") || process.env.AUTO_STATUS_REPLY || "false",
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*Just seen ur status 😆 🤖*",
  READ_MESSAGE: getConfig("READ_MESSAGE") || process.env.READ_MESSAGE || "false",
  REJECT_MSG: process.env.REJECT_MSG || "*📵 Calls are not allowed on this number unless you have permission. 🚫*",
  ALIVE_IMG: getConfig("ALIVE_IMG") || process.env.ALIVE_IMG || "https://url.maxx-xmd.online/Maxx.xm472dqv.jpeg",
  LIVE_MSG: process.env.LIVE_MSG || "> ʙᴏᴛ ɪs sᴘᴀʀᴋɪɴɢ ᴀᴄᴛɪᴠᴇ ᴀɴᴅ ᴀʟɪᴠᴇ\n\n\n> ɢɪᴛʜᴜʙ :* github.com/Carlymaxx/Maxx-tech",

  AUTO_REACT: getConfig("AUTO_REACT") || process.env.AUTO_REACT || "false",
  OWNER_REACT: getConfig("OWNER_REACT") || process.env.OWNER_REACT || "false",
  CUSTOM_REACT: getConfig("CUSTOM_REACT") || process.env.CUSTOM_REACT || "false",
  CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
  STICKER_NAME: process.env.STICKER_NAME || "Maxx-XMD",
  AUTO_STICKER: getConfig("AUTO_STICKER") || process.env.AUTO_STICKER || "false",

  AUTO_RECORDING: getConfig("AUTO_RECORDING") || process.env.AUTO_RECORDING || "true",
  AUTO_TYPING: getConfig("AUTO_TYPING") || process.env.AUTO_TYPING || "true",
  MENTION_REPLY: getConfig("MENTION_REPLY") || process.env.MENTION_REPLY || "true",
  MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || process.env.MENU_IMAGE_URL || "https://url.maxx-xmd.online/Maxx.xm472dqv.jpeg",

  ANTI_DELETE: getConfig("ANTI_DELETE") || process.env.ANTI_DELETE || "true",
  ANTI_CALL: getConfig("ANTI_CALL") || process.env.ANTI_CALL || "false",
  ANTI_BAD_WORD: getConfig("ANTI_BAD_WORD") || process.env.ANTI_BAD_WORD || "false",
  ANTI_LINK: getConfig("ANTI_LINK") || process.env.ANTI_LINK || "true",
  ANTI_VV: getConfig("ANTI_VV") || process.env.ANTI_VV || "true",
  DELETE_LINKS: getConfig("DELETE_LINKS") || process.env.DELETE_LINKS || "false",
  ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
  ANTI_BOT: getConfig("ANTI_BOT") || process.env.ANTI_BOT || "true",
  PM_BLOCKER: getConfig("PM_BLOCKER") || process.env.PM_BLOCKER || "true",

  DESCRIPTION: process.env.DESCRIPTION || "*ᴍᴀᴅᴇ ʙʏ Carly Maxx*",
  PUBLIC_MODE: getConfig("PUBLIC_MODE") || process.env.PUBLIC_MODE || "true",
  ALWAYS_ONLINE: getConfig("ALWAYS_ONLINE") || process.env.ALWAYS_ONLINE || "false",
  AUTO_STATUS_REACT: getConfig("AUTO_STATUS_REACT") || process.env.AUTO_STATUS_REACT || "true",
  AUTO_STATUS_SEEN: getConfig("AUTO_STATUS_SEEN") || process.env.AUTO_STATUS_SEEN || "true",
  AUTO_BIO: getConfig("AUTO_BIO") || process.env.AUTO_BIO || "false",
  WELCOME: getConfig("WELCOME") || process.env.WELCOME || "false",
  GOODBYE: getConfig("GOODBYE") || process.env.GOODBYE || "false",
  ADMIN_ACTION: getConfig("ADMIN_ACTION") || process.env.ADMIN_ACTION || "false",
  version: process.env.version || "1.5.0",
  TIMEZONE: settings.TIMEZONE || process.env.TIMEZONE || "Africa/Harare",

  MENU_IMAGES: {
    '1': process.env.DOWNLOAD_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.0dhfcjpi.jpeg",
    '2': process.env.GROUP_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.xm472dqv.jpeg",
    '3': process.env.FUN_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.0dhfcjpi.jpeg",
    '4': process.env.OWNER_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.0dhfcjpi.jpeg",
    '5': process.env.AI_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.zjrmnw18.jpeg",
    '6': process.env.ANIME_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.h0gop5c7.jpeg",
    '7': process.env.CONVERT_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.0dhfcjpi.jpeg",
    '8': process.env.OTHER_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.zjrmnw18.jpeg",
    '9': process.env.REACTION_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.xm472dqv.jpeg",
    '10': process.env.MAIN_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.0dhfcjpi.jpeg",
    '11': process.env.LOGO_MAKER_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.h0gop5c7.jpeg",
    '12': process.env.SETTINGS_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.0dhfcjpi.jpeg",
    '13': process.env.AUDIO_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.h0gop5c7.jpeg",
    '14': process.env.PRIVACY_MENU_IMAGE || "https://url.maxx-xmd.online/Maxx.xm472dqv.jpeg"
  }
};