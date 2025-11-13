//  [MAXX-XMD EDITION]                                            
//  >> WhatsApp Bot using Baileys (CommonJS)                           
//  >> Scripted by Carly Maxx                                   
//  >> Version: 8.3.5-maxx 

const fs = require("fs");
const path = require("path");
const express = require("express");
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
require("dotenv").config();

const AUTH_FOLDER = path.join(__dirname, "auth_info_baileys");
fs.mkdirSync(AUTH_FOLDER, { recursive: true });

async function startBot() {
    // Load WhatsApp auth state
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    // Express server
    const app = express();
    app.get("/", (req, res) => res.send("Maxx-XMD is Online ✅"));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // Auto-save creds
    sock.ev.on("creds.update", saveCreds);

    // Connection handling
    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "open") console.log("✅ BOT CONNECTED!");
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startBot();
        }
    });

    // Command handling
 sock.ev.on('messages.upsert', async ({ messages }) => {
    if (!messages || messages.length === 0) return;

    const msg = messages[0];

    // ✅ Ignore messages without content
    if (!msg || !msg.key || !msg.message) return;

    // Get the sender's ID safely
    const chatId = msg.key.remoteJid;

    // Get message text safely
    let text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        msg.message.imageMessage?.caption ||
        msg.message.videoMessage?.caption ||
        "";

    // Ignore non-command messages (not starting with .)
    if (!text.startsWith(".")) return;

    const args = text.slice(1).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const command = sock.commands.get(cmdName);
    if (!command) return;

    try {
        await command.execute(sock, msg, args, chatId);
    } catch (err) {
        console.log("Command Error:", err);
        await sock.sendMessage(chatId, { text: "⚠ Command Failed!" });
    }
});

}

// Start the bot
startBot();
