import { Chat, Message, MessageMedia } from 'whatsapp-web.js';
import { replyQuotedMsg } from '../utils';

export const sticker = async (msg: Message) => {
    const chat: Chat = await msg.getChat();
    let media: MessageMedia = (msg.hasMedia && !msg.hasQuotedMsg) ? await msg.downloadMedia() : {} as MessageMedia
    if (msg.hasQuotedMsg && (await msg.getQuotedMessage()).hasMedia) {
        const quotedMsg:Message = await msg.getQuotedMessage();
        media = await quotedMsg.downloadMedia();
    }
    replyQuotedMsg(msg, media, chat.id, { sendMediaAsSticker: true })
    return;
};
