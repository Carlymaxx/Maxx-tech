module.exports = {
    name: "ping",
    description: "Check bot status",
    execute: async (sock, msg, args, chatId) => {
        await sock.sendMessage(chatId, { text: "✅ MAXX~XMD is online!" }, { quoted: msg });
    }
};
