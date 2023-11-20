import { Message } from 'whatsapp-web.js';
import { replyQuotedMsg } from '../utils/index'

export const teste = (msg: Message) => {
    replyQuotedMsg(msg, 'testado');
    return;
}