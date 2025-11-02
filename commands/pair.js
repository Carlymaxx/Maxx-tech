// commands/pair.js
module.exports = {
    name: "pair",
    description: "Pair a new device using phone number",
    execute: async (msg, sock, args) => {
        try {
            if (!args[0]) {
                return sock.sendMessage(msg.key.remoteJid, { text: "📌 Usage: .pair 2547xxxxxxxx" });
            }

            const phoneNumber = args[0].replace(/[^0-9]/g, "");
            const code = await sock.requestPairingCode(phoneNumber);

            await sock.sendMessage(msg.key.remoteJid, {
                text: `✅ Pairing Code for *${phoneNumber}*:\n\n*${code}*\n\nEnter this code on WhatsApp Linked Devices.`
            });

        } catch (err) {
            console.error(err);
            sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to generate pairing code." });
        }
    }
};