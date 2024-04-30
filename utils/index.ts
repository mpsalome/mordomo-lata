import * as consts from './constants';
import { ChatId, Client, ClientOptions, Contact, GroupParticipant, Message, MessageContent, MessageSendOptions } from "whatsapp-web.js";
import { CommandDefinition } from '../interfaces/CommandDefinition';
import winston from 'winston';
import chalk from 'chalk';

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

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format((info) => {
      const coloredLevel = getColorizedLevel(info.level);
      info.level = coloredLevel;
      return info;
    })(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

function getColorizedLevel(level: string): string {
  switch (level) {
    case 'info':
      return chalk.bgBlueBright(`[${level.toUpperCase()}]`);
    case 'warn':
      return chalk.bgYellow(`[${level.toUpperCase()}]`);
    case 'error':
      return chalk.bgRed(`[${level.toUpperCase()}]`);
    default:
      return chalk.bgWhite(`[${level.toUpperCase()}]`);
  }
}

export function log(message: string, level: 'info' | 'warn' | 'error' | 'default'): void {
  logger.log(level, message);
}