module.exports = {
  name: "ping",
  description: "Check bot status",
  execute: async (bot, msg, args) => {
    await bot.sendMessage(msg.from, { text: "Pong! ✅ Bot is active." });
  }
};