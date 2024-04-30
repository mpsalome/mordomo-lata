import { Message, Client } from 'whatsapp-web.js';

export interface CommandHandler<T extends Message = Message> {
  (msg: T, client?: Client): void;
}
