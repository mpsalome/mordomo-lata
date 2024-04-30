import { Message } from 'whatsapp-web.js';
import { replyQuotedMsg } from '../../utils/index'

export default (msg: Message) => {
    replyQuotedMsg(msg, 'testado');
    return;
}