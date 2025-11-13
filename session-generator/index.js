const express = require("express");
const path = require("path");
const fs = require("fs");
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const AUTH_FOLDER = path.join(__dirname, "auth_info_baileys");
fs.mkdirSync(AUTH_FOLDER, { recursive: true });

let sock;
const otpStore = {}; // { number: code }

// Initialize WhatsApp bot
async function initBot() {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);
    sock = makeWASocket({ auth: state });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "open") console.log("✅ BOT CONNECTED!");
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) initBot();
        }
    });
}

initBot();

// Send linking code via WhatsApp
app.get("/send-code", async (req, res) => {
    try {
        const number = req.query.number;
        if (!number) return res.json({ error: "No number provided." });

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[number] = code;

        await sock.sendMessage(number + "@s.whatsapp.net", { text: `Your Maxx-XMD linking code is: ${code}` });

        res.json({ message: "✅ Linking code sent to WhatsApp!" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Verify code and generate session
app.get("/verify-code", async (req, res) => {
    try {
        const { number, code } = req.query;
        if (!number || !code) return res.json({ error: "Number/code missing." });

        if (otpStore[number] !== code) return res.json({ error: "Invalid code." });
        delete otpStore[number];

        const credsPath = path.join(AUTH_FOLDER, "creds.json");
        if (!fs.existsSync(credsPath)) return res.json({ error: "Session not ready." });

        const sessionData = fs.readFileSync(credsPath);
        const sessionBase64 = Buffer.from(sessionData).toString("base64");

        // Send session ID to WhatsApp
        await sock.sendMessage(number + "@s.whatsapp.net", { text: `✅ Maxx-XMD connected!\nSession ID:\n${sessionBase64}` });

        res.json({ session: sessionBase64 });
    } catch (err) {
        res.json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Session generator running on port ${PORT}`));
