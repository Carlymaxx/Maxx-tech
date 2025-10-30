import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import express from "express";
import path from "path";

const AUTH_FOLDER = path.join(process.cwd(), "auth_info_baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);
    const sock = makeWASocket({ auth: state });

require('dotenv').config();

const ownerNumber = process.env.OWNER_NUMBER;
const apiKey = process.env.WHATSAPP_API_KEY;
    // Express server
    const app = express();
    app.get("/", (req, res) => res.send("Maxx-XMD is Online ✅"));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "open") console.log("✅ BOT CONNECTED!");
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startBot();
        }
    });
}

startBot();