import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import fs from "fs";
import path from "path";
import express from "express";

const OWNER_NUMBER = "254100638635@s.whatsapp.net"; 
const AUTH_FOLDER = path.join(process.cwd(), "auth_info_baileys");

// Keep bot alive on Heroku
const app = express();
app.get("/", (req, res) => res.send("Maxx-XMD is Online ✅"));
app.listen(process.env.PORT || 3000);

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

    const sock = makeWASocket({ auth: state });
    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
        if (connection === "open") {
            console.log("✅ BOT CONNECTED!");

            // Send Session ID only once
            const credsPath = path.join(AUTH_FOLDER, "creds.json");
            if (fs.existsSync(credsPath)) {
                const creds = fs.readFileSync(credsPath, "utf8");
                const sessionID = Buffer.from(creds).toString("base64");

                await sock.sendMessage(OWNER_NUMBER, {
                    text: `✅ *MAXX~XMD SESSION ACTIVE*\n\nSESSION_ID:\n\\\${sessionID}\\\\n\n⚠ Keep it Private!`
                });

                console.log("✅ Session ID sent to:", OWNER_NUMBER);
            }
        }

        // Auto-reconnect forever (always online)
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startBot();
        }
    });
}

startBot();