const express = require('express');
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const AUTH_FILE = path.join(__dirname, 'session.json');
const OTP_STORE = {}; // Temporary OTP storage

const { state, saveState } = useSingleFileAuthState(AUTH_FILE);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let sock;

// Start bot
async function startBot() {
    const { version } = await fetchLatestBaileysVersion();
    sock = makeWASocket({
        auth: state,
        version
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') console.log('✅ BOT CONNECTED!');
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) startBot();
        }
    });

    // Listen to incoming messages for OTP verification
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        const from = msg.key.remoteJid;

        if (OTP_STORE[from] && OTP_STORE[from].code === text) {
            // OTP verified
            const sessionId = crypto.randomBytes(16).toString('hex');
            await sock.sendMessage(from, { text: `✅ Maxx-XMD linked successfully!\nSession ID:\n${sessionId}` });

            console.log(`User ${from} linked successfully. Session ID: ${sessionId}`);
            delete OTP_STORE[from];
        }
    });
}

startBot();

// Serve simple page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Generate OTP endpoint
app.post('/generate-otp', async (req, res) => {
    const { number } = req.body;
    if (!number) return res.status(400).send('Number required');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    OTP_STORE[`${number}@s.whatsapp.net`] = { code: otp, timestamp: Date.now() };

    // Send OTP to user's WhatsApp
    try {
        await sock.sendMessage(`${number}@s.whatsapp.net`, { text: `Your Maxx-XMD verification code is: ${otp}` });
        res.send(`OTP sent to ${number} ✅`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to send OTP. Make sure the bot is connected.');
    }
});

app.listen(PORT, () => console.log(`Session generator running on port ${PORT}`));
