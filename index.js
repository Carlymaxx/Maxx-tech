const express = require("express");
const moment = require("moment-timezone");
const app = express();

const startTime = Date.now();

function getUptime() {
  const diff = Date.now() - startTime;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  return `${hr}h ${min % 60}m ${sec % 60}s`;
}

function getNairobiTime() {
  return moment().tz("Africa/Nairobi").format("dddd, MMMM Do YYYY, h:mm:ss a");
}

const menu = `
💠 MAXX~XMD BOT MENU 💠
────────────────────────
📡 Ping          → !ping
⚙ Uptime        → !uptime
🕓 Nairobi Time  → !time
🏙 Location      → Ruiru
👑 Owner         → CarlyMaxx
💬 Status        → Bot Alive
────────────────────────
Type any of the commands above.
`;
app.post("/api/link", (req, res) => {
  const number = req.body.number;
  if (!number) return res.json({ error: "Invalid number!" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[number] = code;

  res.json({ code });
});

app.get("/api/message", (req, res) => {
  const msg = (req.query.text || "").toLowerCase().trim();
  let reply;

  switch (msg) {
    case "menu":
    case "!menu":
      reply = menu;
      break;
    case "ping":
    case "!ping":
      reply = `🏓 Pong! Latency ${(Math.random() * 100).toFixed(1)}ms`;
      break;
    case "uptime":
    case "!uptime":
      reply = `⏱ Bot Uptime: ${getUptime()}`;
      break;
    case "time":
    case "!time":
      reply = `🕓 Nairobi Time: ${getNairobiTime()}`;
      break;
    case "alive":
    case "!alive":
      reply = "🤖 Maxx~XMD Bot is Alive and Running!";
      break;
    default:
      reply = "❓ Unknown command.\nType !menu to see available commands.";
  }

  res.json({ reply });
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Maxx~XMD Bot</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: #0d0d0d;
            color: #00ffcc;
            text-align: center;
            padding-top: 100px;
          }
          a {
            color: #00ffff;
            text-decoration: none;
            border: 1px solid #00ffff;
            padding: 10px 20px;
            border-radius: 8px;
          }
          a:hover {
            background: #00ffff;
            color: #0d0d0d;
          }
        </style>
      </head>
      <body>
        <h1>🤖 Maxx~XMD Bot is Running</h1>
        <p>Owner: <strong>CarlyMaxx</strong></p>
        <a href="https://github.com/Carlymaxx/Maxx-tech.git" target="_blank">
          🌐 Visit GitHub Repo
        </a>
      </body>
    </html>
  `);
});

const port = 3000;
const githubRepo = "https://github.com/Carlymaxx/Maxx-tech.git";

app.listen(port, () => {
  console.log(`✅ Maxx~XMD Bot running — Repo: ${githubRepo}`);
});