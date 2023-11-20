import { Message } from 'whatsapp-web.js';
import { replyQuotedMsg } from '../utils/index'
import consts from '../utils/constants';

export const comandos = async (msg: Message) => {
  replyQuotedMsg(msg, `${consts.COMANDOS(consts.ARRAY_COMANDOS)}`)
  return;
};
