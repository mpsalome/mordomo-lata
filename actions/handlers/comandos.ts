import { Message } from 'whatsapp-web.js';
import { replyQuotedMsg } from '../../utils/index'
import * as consts from '../../utils/constants';

export default async (msg: Message) => {
  replyQuotedMsg(msg, `${consts.COMANDOS(consts.ARRAY_COMANDOS)}`)
  return;
};
