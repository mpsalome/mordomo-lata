import { Message, MessageMedia, Chat } from 'whatsapp-web.js';
import { replyQuotedMsg } from '../../utils/index'
const path = require("path");
const audioPath = path.resolve("./resources/audios");
const imagePath = path.resolve("./resources/images");

export default async (msg: Message) => {
  const donkey_image: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/burro.jpeg`);
  const donkey_audio: MessageMedia = MessageMedia.fromFilePath(`${audioPath}/burro.mpeg`);
  const chat: Chat = await msg.getChat();
  replyQuotedMsg(msg, donkey_image, chat.id, { sendMediaAsSticker: true })
  replyQuotedMsg(msg, donkey_audio, chat.id)
  return;
};