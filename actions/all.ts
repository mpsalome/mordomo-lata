import { Message } from 'whatsapp-web.js';

export const all = async (msg: Message) => {
  let chat: any = await msg.getChat();
  if (chat.isGroup) {
    let participants = chat.participants;
    if(msg.hasQuotedMsg){
      let quotedMsg = await msg.getQuotedMessage();
      quotedMsg.reply(`🚨 *ATENÇÃO* 🚨`, chat.chatId, { mentions: participants })
      return;
    }
    msg.reply(`🚨 *ATENÇÃO* 🚨`, chat.chatId, { mentions: participants });
    return;
  }
  return;
};
