// MAXX~XMD BOT ⚡
// Developed by Carly Maxx
// Combined version — Baileys + Utilities

import fs from "fs-extra";
import chalk from "chalk";
import qrcode from "qrcode-terminal";
import moment from "moment-timezone";
import pino from "pino";
import dotenv from "dotenv";
import { exec } from "child_process";
import path from "path";
import gtts from "node-gtts";
import translatte from "translatte";
import waStickerPkg from "wa-sticker-formatter";
const { toBuffer } = waStickerPkg;
import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from "@whiskeysockets/baileys";

// ✅ Import your message handler (ESM-style import)
import handleMessage from "./handlers/messageHandler.js";

dotenv.config();

const BOT_NAME = "MAXX~XMD";
const OWNER_NAME = "Carly Maxx";
const OWNER_NUMBER = "254100638635";
const AUTH_DIR = "./auth_info";

async function startBot() {
  console.log(chalk.blue("🚀 Starting MAXX~XMD WhatsApp Bot..."));

  if (!fs.existsSync(AUTH_DIR)) fs.mkdirSync(AUTH_DIR, { recursive: true });
  if (process.argv.includes("--force-pair") && fs.existsSync(AUTH_DIR)) {
    fs.rmSync(AUTH_DIR, { recursive: true, force: true });
    console.log(chalk.red("🗑 Old session removed. Forcing new pairing..."));
  }

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  console.log(chalk.gray(`ℹ Using Baileys version: ${version.join(".")}`));

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" })
  });

  // QR Code
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log(chalk.green("📷 Scan this QR code in WhatsApp → Linked Devices:"));
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log(chalk.magenta(`✅ ${BOT_NAME} Connected Successfully as ${OWNER_NAME}`));
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = reason !== DisconnectReason.loggedOut;
      console.log(chalk.red("⚠ Connection closed. Reconnecting..."));
      if (shouldReconnect) startBot();
      else console.log(chalk.red("❌ Logged out. Please re-pair."));
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // 🎯 Command Handler
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    if (!text) return;

    console.log(chalk.cyan(`💬 ${from} → ${text}`));

    // Commands
    if (text === "!help") {
      const menu = `
╔═══🔥 ${BOT_NAME} COMMANDS 🔥═══╗
🎨 !sticker — Image to Sticker
🌐 !tr [lang] [text] — Translate text
🎧 !say [text] — Text to Speech
📞 !owner — Show Owner Info
🕒 !time — Current Nairobi Time
🏓 !ping — Check if alive
╚════════════════════════════╝`;
      await sock.sendMessage(from, { text: menu });
    }

    else if (text === "!ping") {
      await sock.sendMessage(from, { text: `${BOT_NAME} is online 🏓` });
    }

    else if (text === "!owner") {
      await sock.sendMessage(from, {
        text: `👑 Owner: ${OWNER_NAME}\n📞 wa.me/${OWNER_NUMBER}`
      });
    }

    else if (text === "!time") {
      const time = moment().tz("Africa/Nairobi").format("HH:mm:ss, MMM Do YYYY");
      await sock.sendMessage(from, { text:` 🕒 Current time: ${time}` });
    }

    
    // 🖼 Sticker Maker
    else if (text === "!sticker" && msg.message.imageMessage) {
      const buffer = await sock.downloadMediaMessage(msg);
      const sticker = await toBuffer(buffer, {
        pack: "MAXX~XMD",
        author: "Carly Maxx"
      });
      await sock.sendMessage(from, { sticker });
    }

    // 🌍 Translator
    else if (text.startsWith("!tr ")) {
      const [ , lang, ...rest ] = text.split(" ");
      const phrase = rest.join(" ");
      const result = await translatte(phrase, { to: lang || "en" });
      await sock.sendMessage(from, { text: `🌐 ${result.text} `});
    }

    // 🔊 Text-to-Speech
    else if (text.startsWith("!say ")) {
      const phrase = text.slice(5);
      const tts = gtts("en");
      const filePath = path.resolve("./tts.mp3");
      tts.save(filePath, phrase, async () => {
        await sock.sendMessage(from, {
          audio: { url: filePath },
          mimetype: "audio/mpeg",
          ptt: true
        });
        fs.unlinkSync(filePath);
      });
    }
  });
}

startBot().catch((err) => console.error("❌ Fatal error:", err));
