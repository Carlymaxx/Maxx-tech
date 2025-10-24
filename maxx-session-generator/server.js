import express from "express";
import qrcode from "qrcode";
import pino from "pino";
import fs from "fs";
import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} from "@whiskeysockets/baileys";

const app = express();
const PORT = process.env.PORT || 3000;

// Homepage
app.get("/", (req, res) => {
  res.send(`
    <h1>✅ MAXX~XMD WhatsApp Session Generator</h1>
    <p>To generate a QR Code: <a href="/qr">/qr</a></p>
    <p>To generate a Pairing Code (for mobile number): /pair?number=2547xxxxxxx</p>
  `);
});

// === QR Code Generator ===
app.get("/qr", async (req, res) => {
  const { state, saveCreds } = await useMultiFileAuthState("./sessions");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: "silent" }),
  });

  sock.ev.on("connection.update", (update) => {
    const { qr } = update;
    if (qr) {
      qrcode.toDataURL(qr, (err, url) => {
        if (err) return res.send("Error generating QR");
        res.send(`
          <h2>📱 Scan this QR with your WhatsApp</h2>
          <img src="${url}" width="300"/>
          <p>After connecting, your session will be saved automatically.</p>
        `);
      });
    }
  });

  sock.ev.on("creds.update", saveCreds);
});

// === Pairing Code Generator ===
app.get("/pair", async (req, res) => {
  const number = req.query.number;
  if (!number) return res.send("⚠️ Please include ?number=2547xxxxxxx");

  try {
    const { state, saveCreds } = await useMultiFileAuthState("./sessions");
    const sock = makeWASocket({
      printQRInTerminal: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, fs)
      },
      browser: ["MAXX-XMD Generator", "Chrome", "1.0.0"]
    });

    const code = await sock.requestPairingCode(number);
    res.send(`
      <h3>✅ Pairing Code Generated</h3>
      <p>Use this code in WhatsApp Linked Devices:</p>
      <h1>${code}</h1>
      <p>After pairing, your session will be saved automatically.</p>
    `);

    sock.ev.on("creds.update", saveCreds);
  } catch (err) {
    console.error(err);
    res.send("❌ Error generating pairing code");
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 MAXX~XMD Generator running on port ${PORT}`)
);