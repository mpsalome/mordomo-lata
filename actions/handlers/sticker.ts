import { Chat, Message, MessageMedia } from 'whatsapp-web.js';
import { replyQuotedMsg, handleError } from '../../utils';

export default async function processMessage(msg: Message): Promise<void> {
    try {
        const chat: Chat = await msg.getChat();
        let media: MessageMedia = {} as MessageMedia;

        if (msg.hasMedia && !msg.hasQuotedMsg) {
            media = await msg.downloadMedia();
        } else if (msg.hasQuotedMsg && (await msg.getQuotedMessage()).hasMedia) {
            const quotedMsg: Message = await msg.getQuotedMessage();
            media = await quotedMsg.downloadMedia();
        }

        await replyQuotedMsg(msg, media, chat.id, { sendMediaAsSticker: true });
    } catch (error) {
        handleError(error);
    }
}
