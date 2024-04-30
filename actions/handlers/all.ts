import { Chat, Client, Contact, GroupChat, GroupParticipant, Message } from 'whatsapp-web.js';
import { replyQuotedMsg, getContactsFrom } from '../../utils/index'

export default async (msg: Message, client: Client) => {
  const chat: Chat = await msg.getChat()
  if (chat.isGroup) {
    const group: GroupChat = chat as GroupChat;
    const participants: GroupParticipant[] = group.participants
    const mentions: Contact[] = await getContactsFrom(participants, client)
    let text = `🚨 *ATENÇÃO* 🚨\n`
    mentions.forEach( contact => {
      text+= `@${contact.id.user} `
    })
    replyQuotedMsg(msg, text.trim(), group.id, { mentions })
    return;
  }
  return;
};
