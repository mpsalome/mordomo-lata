import { Message, MessageMedia } from 'whatsapp-web.js';

export const sticker = async (msg: Message) => {
    let media: MessageMedia = new MessageMedia(``, ``, ``);
    if (msg.hasMedia) {
        media = await msg.downloadMedia();
    } else {
        if (msg.hasQuotedMsg) {
            let quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                media = await quotedMsg.downloadMedia();
            } else {
                return;
            }
        }
    }
    const chat: any = await msg.getChat();
    if (msg.hasQuotedMsg) {
        let quotedMsg = await msg.getQuotedMessage();
        quotedMsg.reply(media, chat.chatId, { sendMediaAsSticker: true })
        return;
    }
    msg.reply(media, chat.chatId, { sendMediaAsSticker: true });
    return;
};
