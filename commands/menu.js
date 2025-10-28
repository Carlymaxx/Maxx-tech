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