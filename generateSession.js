import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import fs from "fs";

const OWNER_NUMBER = "254725979273@s.whatsapp.net"; // your WhatsApp number in international format with @s.whatsapp.net

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "open") {
      console.log("✅ Connected Successfully!");

      // Read your creds (Session ID data)
      const creds = fs.readFileSync("./auth_info/creds.json", "utf8");

      // Send it to your WhatsApp number
      await sock.sendMessage(OWNER_NUMBER, {
        text: `✅ *MAXX~XMD Session Connected!*\n\nYour session data:\n\n\`\`\`${creds}\`\`\``,
      });

      console.log("📤 Session ID sent to your WhatsApp number!");
    } else if (connection === "close") {
      console.log("⚠ Connection closed, reconnecting...");
      start();
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

start();