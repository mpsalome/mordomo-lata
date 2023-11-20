import { Message } from 'whatsapp-web.js';
import consts from '../utils/constants';

export const comandos = async (msg: Message) => {
  if (msg.hasQuotedMsg) {
    let quotedMsg = await msg.getQuotedMessage();
    quotedMsg.reply(`${consts.COMANDOS(consts.ARRAY_COMANDOS)}`);
    return;
  }
  msg.reply(`${consts.COMANDOS(consts.ARRAY_COMANDOS)}`);
  return;
};
