const makeWASocket = require("@whiskeysockets/baileys").default;
const {
    DisconnectReason,
    useMultiFileAuthState
} = require("@whiskeysockets/baileys");
const readline = require("readline");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    sock.ev.on('creds.update', saveCreds);

    // If not logged in, use phone number to get pairing code
    if (!sock.authState.creds.registered) {
        let phoneNumber = await ask("Enter your WhatsApp number (e.g. 2547XXXXXXXX): ");
        phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

        const code = await sock.requestPairingCode(phoneNumber);
        console.log("\n📌 Enter this code on your WhatsApp to link the bot:");
        console.log("🔑 Pairing Code:", code, "\n");
    }

    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === "open") console.log("✅ BOT CONNECTED SUCCESSFULLY!");
        if (connection === "close")
            if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut)
                startBot();
    });
}

function ask(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(res => rl.question(question, ans => { rl.close(); res(ans); }));
}

startBot();