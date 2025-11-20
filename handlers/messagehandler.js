const fs = require("fs");
const path = require("path");

// Load all commands dynamically
const commands = {};
const commandDir = path.join(__dirname, "../commands");
const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const commandPath = path.join(commandDir, file);
  try {
    const command = require(commandPath);
    if (command && command.name && typeof command.execute === "function") {
      commands[command.name.toLowerCase()] = command;
      console.log(`✅ Loaded command: ${command.name}`);
    } else {
      console.warn(`⚠ Skipping ${file}, missing name or execute function`);
    }
  } catch (err) {
    console.warn(`⚠ Failed to load command file ${file}:`, err.message);
  }
}

module.exports = async function handleMessage(sock, msg) {
  try {
    const text =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption ||
      "";
    if (!text) return;

    const sender = msg.key.remoteJid;
    console.log(`[📩] ${sender}: ${text}`);

    if (!text.startsWith(".")) return; // Only handle commands with '.' prefix

    const args = text.slice(1).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    const command = commands[commandName];
    if (!command) {
      return await sock.sendMessage(sender, {
        text: "❌ Unknown command. Type .menu to see available commands."
      });
    }

    await command.execute(sock, sender, args);
  } catch (err) {
    console.error("❌ Error in handleMessage:", err);
  }
};
