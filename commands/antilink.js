module.exports = {
    name: "antilink",
    desc: "Enable or disable anti-link",
    run: async (sock, msg, args, from) => {
        if (!args[0]) return sock.sendMessage(from, { text: "Use: .antilink on / off" });

        if (args[0].toLowerCase() === "on") {
            global.antilink = true;
            sock.sendMessage(from, { text: "✅ Anti-Link Enabled" });
        } else if (args[0].toLowerCase() === "off") {
            global.antilink = false;
            sock.sendMessage(from, { text: "🛑 Anti-Link Disabled" });
        }
    }
};