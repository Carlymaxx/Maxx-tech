module.exports = {
  name: "ping",
  description: "Check bot status",
  execute: async (sock, sender) => {
    await sock.sendMessage(sender, { text: "✅ MAXX~XMD is online!" });
  }
};