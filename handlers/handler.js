import { getCommand, loadCommands } from "./utils/commandLoader.js"; // adjust path if needed

export async function handleMessages(sock) {
  // Load all commands once
  await loadCommands();

  // Listen to incoming messages
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg?.message) return;

    const chatId = msg.key.remoteJid;

    // Get text from message
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      msg.message.videoMessage?.caption ||
      "";

    // Only respond to commands starting with "."
    if (!text.startsWith(".")) return;

    const args = text.slice(1).trim().split(/\s+/);
    const cmdName = args.shift().toLowerCase();

    const command = getCommand(cmdName);
    if (!command) return;

    try {
      // Execute the command
      await command.execute(sock, msg, args, chatId);
    } catch (err) {
      console.error("⚠ Command Error:", err);
      await sock.sendMessage(chatId, { text: "⚠ Command Failed!" });
    }
  });
}
