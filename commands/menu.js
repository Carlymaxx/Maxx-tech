const moment = require("moment-timezone");

module.exports = {
  name: "menu",
  description: "Show bot menu and info",
  execute: async (sock, sender) => {
    const nairobiTime = moment().tz("Africa/Nairobi").format("HH:mm:ss");
    const nairobiDate = moment().tz("Africa/Nairobi").format("YYYY-MM-DD");

    await sock.sendMessage(sender, {
      image: { url: "https://ibb.co/jZhpV4Vb.jpg" },
      caption: `*MAXX~XMD Bot is Alive ✅*
Welcome to the real bot made by Carly Maxx!

🕒 Time (Nairobi, Ruiru): ${nairobiTime}
📅 Date: ${nairobiDate}

Type .ping to check bot status`
    });
  }
};
module.exports = {
    name: "menu",
    alias: ["help"],
    desc: "Display bot menu",
    run: async (sock, msg, args, from, info) => {

        const text = `
┌──⭓ ${info.botName} MENU
│
│ 👤 Owner: ${info.ownerName}
│ 🆔 Prefix: ${info.prefix}
│
│ 📌 Available Commands:
│ • menu
│ • ping
│ • welcome
│ • goodbye
│ • antidelete
│
└──────────────⭓
        `;

        await sock.sendMessage(from, { text }, { quoted: msg });
    }
};