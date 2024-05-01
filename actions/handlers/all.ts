import { Chat, Client, Contact, GroupChat, GroupParticipant, Message } from 'whatsapp-web.js';
import { replyQuotedMsg, getContactsFrom } from '../../utils/index';
import { log, handleError } from '../../utils/';

export default async (msg: Message, client: Client) => {
  try {
    const chat: Chat = await msg.getChat();

    if (chat.isGroup) {
      const group: GroupChat = chat as GroupChat;
      const participants: GroupParticipant[] = group.participants;
      const mentions: Contact[] = await getContactsFrom(participants, client);

      let text = `🚨 *ATENÇÃO* 🚨\n`;
      mentions.forEach(contact => {
        text += `@${contact.id.user} `;
      });

      log(`Sending message in group: ${group.name} - mentions ${ JSON.stringify(mentions) }` , 'info');
      await replyQuotedMsg(msg, text.trim(), group.id, { mentions });
    }
  } catch (error) {
    handleError(error);
  }
};
