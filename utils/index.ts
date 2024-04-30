import * as consts from './constants';
import { ChatId, Client, ClientOptions, Contact, GroupParticipant, Message, MessageContent, MessageSendOptions } from "whatsapp-web.js";
import { CommandDefinition } from '../interfaces/CommandDefinition';

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




export function processCommand(msg:Message, actions:CommandDefinition<Message>[]) {
  const command = msg.body.split(' ')[0].substring(consts.COMMAND_SYMBOL.length);
  const action = actions.find(action => msg.body.startsWith(`${consts.COMMAND_SYMBOL}${action.command}`));

  if (action) {
    action.handler(msg);
  } else {
    console.log(`Unknown command: ${command}`);
  }
}

export function log(message:string, severity = 'info') {
  console.log(`[${severity.toUpperCase()}] ${message}`);
}
