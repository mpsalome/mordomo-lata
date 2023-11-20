import { ChatId, Message, MessageContent, MessageSendOptions } from "whatsapp-web.js";

export async function replyQuotedMsg(msg: Message, content: MessageContent, chatId?: ChatId | undefined, options?: MessageSendOptions | undefined) {
    if (msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        quotedMsg.reply(content, chatId?._serialized, options)
        return;
    }
    msg.reply(content, chatId?._serialized, options)
}
