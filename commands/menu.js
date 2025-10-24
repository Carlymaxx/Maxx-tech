module.exports = {
  name: "menu", // command name, use with your prefix, e.g., .menu
  description: "Shows the MAXX-XMD bot menu",
  execute: async (bot, msg, args) => {
    // You can customize this menu message however you like
    const menuMessage = `
👋 Hello! I am *MAXX-XMD Bot* 🤖

📜 *BOT MENU*

1️⃣ Fun Commands
2️⃣ AI Commands
3️⃣ Owner Commands
4️⃣ Group Commands
5️⃣ Other Commands

Type the command with prefix to run it. Example: *.ping*

Owner: Carly Maxx
`;

    // Send the message back to the chat
    await bot.sendMessage(msg.from, { text: menuMessage });
  }
};