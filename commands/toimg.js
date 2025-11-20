module.exports = {
    name: "toimg",
    description: "Convert sticker to image",
    execute: async (sock, msg, args, chatId) => {
        if (!msg.message.stickerMessage) {
            return await sock.sendMessage(chatId, { text: "Reply to a sticker with .toimg" }, { quoted: msg });
        }

        try {
            const buffer = await sock.downloadMediaMessage(msg);
            await sock.sendMessage(chatId, { image: buffer }, { quoted: msg });
            console.log(`✅ Sticker converted to image for ${chatId}`);
        } catch (err) {
            console.error("⚠ Error converting sticker to image:", err);
            await sock.sendMessage(chatId, { text: "⚠ Failed to convert sticker to image." }, { quoted: msg });
        }
    }
};
