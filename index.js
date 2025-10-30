import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import fs from "fs";
import path from "path";
import express from "express";

const OWNER_NUMBER = "254100638635@s.whatsapp.net";
const AUTH_FOLDER = path.join(process.cwd(), "auth_info_baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

    const sock = makeWASocket({ auth: state });

    const app = express();
    app.get("/", (req, res) => res.send("Maxx-XMD is Online ✅"));
    app.listen(process.env.PORT || 3000);

    sock.ev.on("creds.update", saveCreds);

    if (!state.creds.registered) {
        const phoneNumber = "254100638635";
        const code = await sock.requestPairingCode(phoneNumber);
        console.log("\n📌 Enter this code in your WhatsApp:");
        console.log("🔑 Pairing Code:", code, "\n");
    }

    sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
        if (connection === "open") {
            console.log("✅ BOT CONNECTED!");
        }

        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startBot();
        }
    });
}

startBot();