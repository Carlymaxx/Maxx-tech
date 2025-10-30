module.exports = {
    name: "toimg",
    desc: "Convert sticker to image",
    run: async (sock, msg, args, from) => {
        if (!msg.message.stickerMessage)
            return await sock.sendMessage(from, { text: "Reply to a sticker with .toimg" });

        let buffer = await sock.downloadMediaMessage(msg);
        await sock.sendMessage(from, { image: buffer }, { quoted: msg });
    }
};