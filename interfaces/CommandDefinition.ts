import { Message } from 'whatsapp-web.js';
import { CommandHandler } from './CommandHandler'

export interface CommandDefinition<T extends Message = Message> {
  command: string;
  handler: CommandHandler<T>;
}
