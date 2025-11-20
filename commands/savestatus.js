module.exports = {
    name: "save",
    desc: "Save WhatsApp status",
    run: async (sock, msg, args, from) => {
        if (!args[0]) return sock.sendMessage(from, { text: "Example: .save 3" });

        let index = Number(args[0]) - 1;
        let statuses = await sock.getStatus();
        let target = statuses[index];

        if (!target) return sock.sendMessage(from, { text: "Status not found." });

        let media = await sock.downloadMediaMessage(target);
        await sock.sendMessage(from, { video: media }, { quoted: msg });
    }
};