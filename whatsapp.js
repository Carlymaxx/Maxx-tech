const makeWASocket = require("@whiskeysockets/baileys").default;
const { useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");
const moment = require("moment-timezone");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info_baileys");

  const sock = makeWASocket({
    auth: state,
  });

  // 🔹 Show QR Code when needed
  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;
    if (qr) {
      console.log("📱 Scan this QR to link your WhatsApp:");
      qrcode.generate(qr, { small: true });
    }
    if (connection === "open") {
      console.log("✅ Connected! Maxx~XMD Bot is now online 🎉");
    } else if (connection === "close") {
      console.log("❌ Connection closed. Reconnecting...");
      startBot(); // auto reconnect
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // 🔹 Message handler
  sock.ev.on("messages.upsert", async (msg) => {
    const m = msg.messages[0];
    if (!m.message || m.key.fromMe) return;

    const text =
      m.message.conversation?.toLowerCase() ||
      m.message.extendedTextMessage?.text?.toLowerCase() ||
      "";

    if (text === "!ping") {
      await sock.sendMessage(m.key.remoteJid, { text: "🏓 Pong! Maxx~XMD is alive!" });
    } else if (text === "!menu") {
      await sock.sendMessage(m.key.remoteJid, {
        text: `💠 MAXX~XMD BOT MENU 💠
────────────────────────
📡 Ping → !ping
⚙ Uptime → !uptime
🕓 Time → !time
👑 Owner → CarlyMaxx
🏙 Location → Ruiru
────────────────────────`,
      });
    } else if (text === "!time") {
      const time = moment().tz("Africa/Nairobi").format("dddd, MMMM Do YYYY, h:mm:ss a");
      await sock.sendMessage(m.key.remoteJid, { text: `🕓 Nairobi Time: ${time}` });
    } else if (text === "!alive") {
      await sock.sendMessage(m.key.remoteJid, { text: "🤖 Maxx~XMD Bot is Alive and Running!" });
    }
  });
}

startBot();