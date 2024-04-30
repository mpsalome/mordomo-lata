import * as consts from './constants';
import { ChatId, Client, ClientOptions, Contact, GroupParticipant, Message, MessageContent, MessageSendOptions } from "whatsapp-web.js";
import { CommandDefinition } from '../interfaces/CommandDefinition';
import winston from 'winston';

const { combine, timestamp, printf, colorize, align } = winston.format;

export async function replyQuotedMsg(msg: Message, content: MessageContent, chatId?:ChatId, options?: MessageSendOptions) {
  if (msg.hasQuotedMsg) {
    const quotedMsg = await msg.getQuotedMessage();
    await quotedMsg.reply(content, chatId?._serialized, options);
  } else {
    await msg.reply(content, chatId?._serialized, options);
  }
}

// Improved function with potential error handling using try/catch
export async function getContactsFrom(participantArray: GroupParticipant[], client: Client): Promise<Contact[]> {
  const contactArray: Contact[] = [];

  for (const participant of participantArray) {
    try {
      const contact = await client.getContactById(participant.id._serialized);
      contactArray.push(contact);
    } catch (error) {
      console.error(`Error getting contact for participant ${participant.id._serialized}:`, error);
    }
  }

  return contactArray;
}

export function processCommand(msg: Message, actions: CommandDefinition<Message>[]) {
  const command = msg.body?.split(' ')[0]?.substring(consts.COMMAND_SYMBOL.length);
  const action = actions.find(action => msg.body?.startsWith(`${consts.COMMAND_SYMBOL}${action.command}`));

  if (action) {
    action.handler(msg);
  } else {
    console.log(`Unknown command: ${command}`);
  }
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'combined.log',
    }),
    new winston.transports.File({
      filename: 'app-error.log',
      level: 'error',
    }),
  ],
});

export function log(message: string, level: 'info' | 'warn' | 'error' | 'default' = 'info'): void {
  logger.log(level, message);
}
