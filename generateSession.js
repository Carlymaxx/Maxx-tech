import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import fs from "fs";

const OWNER_NUMBER = "254725979273@s.whatsapp.net"; // your WhatsApp number

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

      // Convert your creds.json into Base64 encoded Session ID
      const creds = fs.readFileSync("./auth_info/creds.json", "utf8");
      const sessionId = Buffer.from(creds).toString("base64");

      // Send it as a clean message
      await sock.sendMessage(OWNER_NUMBER, {
        text: `✅ *MAXX~XMD Session Connected!*\n\nHere is your *Session ID* 👇\n\n\`\`\`${sessionId}\`\`\`\n\nPaste this in your config.js file like:\n\nSESSION_ID: "${sessionId}"`,
      });

      console.log("📤 Session ID sent to your WhatsApp!");
    } else if (connection === "close") {
      console.log("⚠ Connection closed, reconnecting...");
      start();
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

start();