// Maxx-XMD Edition (Fixed)

const fs = require("fs");
const path = require("path");
const express = require("express");
const qrcode = require("qrcode");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");
require("dotenv").config();

const AUTH_FOLDER = path.join(__dirname, "auth_info_baileys");
fs.mkdirSync(AUTH_FOLDER, { recursive: true });

// --- EXPRESS (run once only) ---
const app = express();
app.get("/", (req, res) => res.send("MAXX-XMD is Online ✅"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

    const sock = makeWASocket({
        auth: state,
        browser: ["Maxx-XMD", "Chrome", "1.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    // --- SINGLE CLEAN CONNECTION HANDLER ---
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log("\nScan this QR:\n");
            qrcode.toString(qr, { type: "terminal", small: true }, (err, qrStr) => {
                if (!err) console.log(qrStr);
            });
        }

        if (connection === "open") {
            console.log("✅ BOT CONNECTED!");
        }

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;

            if (reason !== DisconnectReason.loggedOut) {
                console.log("♻ Reconnecting...");
                startBot();
            } else {
                console.log("❌ Logged out. Scan new QR.");
                startBot();
            }
        }
    });

    // --- COMMAND HANDLER ---
    sock.commands = new Map();

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg || !msg.message) return;

        const chatId = msg.key.remoteJid;
        let text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            msg.message.imageMessage?.caption ||
            msg.message.videoMessage?.caption ||
            "";

        if (!text.startsWith(".")) return;

        const args = text.slice(1).trim().split(/\s+/);
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

// Start the bot once
startBot();
