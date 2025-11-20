module.exports = {
    name: "sticker",
    alias: ["s", "stik"],
    desc: "Convert Image/Video to Sticker",
    run: async (sock, msg, args, from) => {
        if (!msg.message.imageMessage && !msg.message.videoMessage)
            return await sock.sendMessage(from, { text: "Send image/video with caption .sticker" });

        let buffer = await sock.downloadMediaMessage(msg);
        await sock.sendMessage(from, { sticker: buffer }, { quoted: msg });
    }
};