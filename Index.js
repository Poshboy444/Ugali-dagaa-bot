const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        const msg = messages[0];
        if (!msg.message) return;
        const sender = msg.key.remoteJid;
        const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;

        if (messageContent?.toLowerCase().includes("ugali") || messageContent?.toLowerCase().includes("dagaa")) {
            await sock.sendMessage(sender, { text: "Karibu! Hii ni Ugali Dagaa Bot 🍽️. Unaweza kuweka oda hapa." });
        }
    });
}

startBot();
