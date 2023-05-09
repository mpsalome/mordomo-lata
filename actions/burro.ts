import { Message, MessageMedia, Chat } from 'whatsapp-web.js';
const path = require("path");
const audioPath = path.resolve("./resources/audios");
const imagePath = path.resolve("./resources/images");

export const burro = async (msg: Message) => {
  const donkey_image: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/burro.jpeg`);
  const donkey_audio: MessageMedia = MessageMedia.fromFilePath(`${audioPath}/burro.mpeg`);
  const chat: Chat = await msg.getChat();
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      quotedMsg.reply(donkey_image, undefined, { sendMediaAsSticker: true });
      quotedMsg.reply(donkey_audio);
      return;
    }
    chat.sendMessage(donkey_image, { sendMediaAsSticker: true });
    chat.sendMessage(donkey_audio);
    return;
};
