module.exports = {
  name: "menu", // command name
  description: "Shows the bot menu",

  async execute(bot, message, args) {
    const from = message.key.remoteJid;

    // Example menu text
    const menuText = `
👋 Hello! I'm *Carly Maxx* 🤖
Here are my available commands:

*Fun Commands*
- .ping → check bot status
- .joke → random joke
- .meme → random meme

*Utility Commands*
- .menu → show this menu
- .alive → bot status
- .help → help guide

*Owner Commands*
- .ban → ban user
- .unban → unban user

⚡ Powered by MAXX-XMD
`;

    // Send menu as text
    await bot.sendMessage(from, { text: menuText });
  },
};