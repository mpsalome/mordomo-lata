import { Message } from 'whatsapp-web.js';

export const sticker = async (msg: Message) => {
    const media = await msg.downloadMedia();
    const chat: any = await msg.getChat();
    if (chat.isGroup) {
        let participants = chat.participants;
        if (msg.hasQuotedMsg) {
            let quotedMsg = await msg.getQuotedMessage();
            quotedMsg.reply(media, chat.chatId, { mentions: participants, sendMediaAsSticker: true })
            return;
        }
        msg.reply(media, chat.chatId, { mentions: participants, sendMediaAsSticker: true });
        return;
    }
    return;
};
