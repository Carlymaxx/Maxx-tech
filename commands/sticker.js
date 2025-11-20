module.exports = {
    name: "sticker",
    alias: ["s", "stik"],
    description: "Convert Image/Video to Sticker",
    execute: async (sock, msg, args, chatId) => {
        if (!msg.message.imageMessage && !msg.message.videoMessage) {
            return await sock.sendMessage(chatId, { text: "Send an image or video with caption .sticker" }, { quoted: msg });
        }

        try {
            const buffer = await sock.downloadMediaMessage(msg);
            await sock.sendMessage(chatId, { sticker: buffer }, { quoted: msg });
            console.log(`✅ Sticker sent to ${chatId}`);
        } catch (err) {
            console.error("⚠ Error creating sticker:", err);
            await sock.sendMessage(chatId, { text: "⚠ Failed to create sticker." }, { quoted: msg });
        }
    }
};
