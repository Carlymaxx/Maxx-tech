//  [MAXX-XMD EDITION]                                            
//  >> WhatsApp Bot using Baileys (CommonJS)                           
//  >> Scripted by Carly Maxx                                   
//  >> Version: 8.3.5-maxx 

const fs = require("fs");
const path = require("path");
const express = require("express");
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason 
} = require("@whiskeysockets/baileys");
require("dotenv").config();

const AUTH_FOLDER = path.join(__dirname, "auth_info_baileys");
fs.mkdirSync(AUTH_FOLDER, { recursive: true });

async function startBot() {
    // Load WhatsApp auth state
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true // QR will print for linking
    });

    // Auto-save creds
    sock.ev.on("creds.update", saveCreds);

    // Connection handling
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) console.log("\nScan this QR code with WhatsApp on your phone:\n", qr);

        if (connection === "open") console.log("✅ BOT CONNECTED!");
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startBot();
        }
    });
const qrcode = require("qrcode");

sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
        // Print QR in terminal as block
        qrcode.toString(qr, { type: "terminal", small: true }, (err, url) => {
            if (err) console.error("QR Error:", err);
            else console.log(url);
        });
    }

    if (connection === "open") console.log("✅ WhatsApp bot connected!");
    if (connection === "close") {
        const shouldReconnect = (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut);
        if (shouldReconnect) startBot();
    }
});


    // Express server
    const app = express();
    app.get("/", (req, res) => res.send("Maxx-XMD is Online ✅"));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // Commands placeholder (if you have commands)
    sock.commands = new Map(); // You can load commands dynamically here

    sock.ev.on("messages.upsert", async ({ messages }) => {
        if (!messages || messages.length === 0) return;
        const msg = messages[0];
        if (!msg || !msg.key || !msg.message) return;

        const chatId = msg.key.remoteJid;
        let text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            msg.message.imageMessage?.caption ||
            msg.message.videoMessage?.caption ||
            "";

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
