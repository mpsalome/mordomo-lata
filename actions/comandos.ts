import { Message } from 'whatsapp-web.js';
import consts from '../constants';

export const comandos = async (msg: Message) => {
  if (msg.hasQuotedMsg) {
    let quotedMsg = await msg.getQuotedMessage();
    quotedMsg.reply(`${consts.COMANDOS}`);
    return;
  }
  msg.reply(`${consts.COMANDOS}`);
  return;
};
