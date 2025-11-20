module.exports = {
    name: "save",           // command name
    desc: "Save WhatsApp status", // description
    execute: async (sock, msg, args, chatId) => {
        if (!args[0]) {
            return await sock.sendMessage(chatId, { text: "Example usage: .save 3" }, { quoted: msg });
        }

        let index = Number(args[0]) - 1;

        try {
            const statuses = await sock.fetchStatus(chatId);
            if (!statuses || statuses.length === 0) {
                return await sock.sendMessage(chatId, { text: "No statuses found." }, { quoted: msg });
            }

            if (index < 0 || index >= statuses.length) {
                return await sock.sendMessage(chatId, { text: `Invalid index. There are ${statuses.length} statuses.` }, { quoted: msg });
            }

            const target = statuses[index];
            const media = await sock.downloadMediaMessage(target);

            await sock.sendMessage(chatId, { video: media }, { quoted: msg });
            console.log(`✅ Status #${index + 1} sent to ${chatId}`);
        } catch (err) {
            console.error("⚠ Error saving status:", err);
            await sock.sendMessage(chatId, { text: "⚠ Failed to save status." }, { quoted: msg });
        }
    }
};
