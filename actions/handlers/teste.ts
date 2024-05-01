import { Message } from 'whatsapp-web.js';
import { replyQuotedMsg, handleError } from '../../utils/index';

export default function processMessage(msg: Message): void {
    try {
        replyQuotedMsg(msg, 'testado');
    } catch (error) {
        handleError(error);
    }
}
