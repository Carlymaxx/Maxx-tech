// handlers/messageHandler.js
import fetch from "node-fetch";

export default async function handleMessage(sock, msg) {
  try {
    const messageContent =
      msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    if (!messageContent) return;

    const sender = msg.key.remoteJid;
    const text = messageContent.trim();
    const lowerText = text.toLowerCase();

    console.log(`[📩] ${sender}: ${text}`);

    // Simple direct responses
    if (lowerText === "ping") {
      await sock.sendMessage(sender, { text: "Pong ✅" });
      return;
    }

    if (lowerText === "hi" || lowerText === "hello") {
      await sock.sendMessage(sender, { text: "👋 Hello! I'm MAXX~XMD bot." });
      return;
    }

    // Prefix-based command handling
    if (!text.startsWith("!")) return; // Only commands with '!' prefix

    const args = text.trim().split(/\s+/);
    const command = args.shift().slice(1).toLowerCase(); // remove '!' prefix

    const reply = async (msgText) => {
      await sock.sendMessage(sender, { text: msgText });
    };

    switch (command) {
      case "ping":
        reply("✅ MAXX~XMD is online and running smoothly!");
        break;

      case "menu":
        reply(`*📜 MAXX~XMD MAIN MENU 📜*

👋 Hi there!
Here are my available commands:

> ⚡ !ping – Check if I’m online
> 🎥 !tiktok <url> – Download a TikTok video
> 🧾 !menu – Show this menu

💡 Tip: More features coming soon!*
`);
        break;

      case "tiktok":
        try {
          if (!args[0]) return reply("Please provide a TikTok link!");
          reply("⏳ Fetching your TikTok video...");

          const url = args[0];
          const response = await fetch(
            `https://api.tiklydown.me/api/download?url=${url}`
          );
          const data = await response.json();

          if (data && data.video && data.video.noWatermark) {
            await sock.sendMessage(sender, {
              video: { url: data.video.noWatermark },
              caption: "🎬 Here is your TikTok video!",
            });
          } else {
            reply("❌ Failed to fetch TikTok video. Please check the URL.");
          }
        } catch (error) {
          console.error("TikTok command error:", error);
          reply("⚠ An error occurred while processing your request.");
        }
        break;

      default:
        reply("❓ Unknown command. Type !menu to see available commands.");
    }
  } catch (err) {
    console.error("❌ Error in handleMessage:", err);
  }
}