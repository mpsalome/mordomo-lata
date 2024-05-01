import { Message, MessageMedia, Chat } from 'whatsapp-web.js';
import { replyQuotedMsg, log } from '../../utils/index';
const path = require("path");

const audioPath = path.resolve("./resources/audios");
const imagePath = path.resolve("./resources/images");

export default async (msg: Message) => {
  try {
    const donkeyImage: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/burro.jpeg`);
    const donkeyAudio: MessageMedia = MessageMedia.fromFilePath(`${audioPath}/burro.mpeg`);
    const chat: Chat = await msg.getChat();
    
    replyQuotedMsg(msg, donkeyImage, chat.id, { sendMediaAsSticker: true });
    replyQuotedMsg(msg, donkeyAudio, chat.id);
  } catch (error) {
    log(`Error: ${error.message}`, 'error');
  }
};
