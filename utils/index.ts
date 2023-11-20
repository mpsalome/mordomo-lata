import { ChatId, Client, Contact, GroupParticipant, Message, MessageContent, MessageSendOptions } from "whatsapp-web.js";

export async function replyQuotedMsg(msg: Message, content: MessageContent, chatId?: ChatId | undefined, options?: MessageSendOptions | undefined) {
    if (msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        quotedMsg.reply(content, chatId?._serialized, options)
        return;
    }
    msg.reply(content, chatId?._serialized, options)
}

export async function getContactsFrom(participantArray: GroupParticipant[], client: Client): Promise<Contact[]> {
    const contactArray: Contact[] = []

    for (const participant of participantArray) {
        const contact = await client.getContactById(participant.id._serialized);
        contactArray.push(contact);
    }

    return contactArray
}
