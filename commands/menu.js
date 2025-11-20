const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

// Optional: add your bot info here
const BOT_INFO = {
    botName: "MAXX~XMD Bot",
    ownerName: "Carly Maxx",
    prefix: "."
};

module.exports = {
    name: "menu",
    alias: ["help"],
    description: "Display bot menu dynamically",
    execute: async (sock, msg, args, chatId) => {
        const nairobiTime = moment().tz("Africa/Nairobi").format("HH:mm:ss");
        const nairobiDate = moment().tz("Africa/Nairobi").format("YYYY-MM-DD");

        // Load all commands dynamically
        const commandsPath = path.join(__dirname);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

        const commandList = commandFiles
            .map(file => {
                const cmd = require(path.join(commandsPath, file));
                return cmd.name ? `• ${cmd.name}` : null;
            })
            .filter(Boolean)
            .join("\n");

        const text = `
┌──⭓ ${BOT_INFO.botName} MENU
│
│ 👤 Owner: ${BOT_INFO.ownerName}
│ 🆔 Prefix: ${BOT_INFO.prefix}
│ 🕒 Time (Nairobi, Ruiru): ${nairobiTime}
│ 📅 Date: ${nairobiDate}
│
│ 📌 Available Commands:
${commandList}
└──────────────⭓
        `;

        await sock.sendMessage(chatId, {
            image: { url: "https://ibb.co/jZhpV4Vb.jpg" },
            caption: text
        }, { quoted: msg });
    }
};
