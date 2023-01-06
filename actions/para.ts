import { Message } from "whatsapp-web.js";

export const para = async (msg: Message) => {
  let chat: any = await msg.getChat();
  if (chat.isGroup) {
    if (msg.hasQuotedMsg) {
      let quotedMsg = await msg.getQuotedMessage();
      let contact = await quotedMsg.getContact();
      quotedMsg.reply(`🚨 *PARE, ${contact.pushname}* 🚨`, chat.chatId, {
        mentions: [contact],
      });
      return;
    }
    msg.reply(`🚨 *PARA* 🚨`);
    return;
  }
  return;
};
