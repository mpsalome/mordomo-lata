import { Message, MessageMedia, Chat, Contact } from "whatsapp-web.js";
import {handleError} from '../../utils/index'
const Jimp = require("jimp");
const path = require("path");
const imagePath = path.resolve("./resources/images");
const fontPath = path.resolve("./resources/fonts");

export default async function processMessage(msg: Message): Promise<void> {
  try {
    const chat:Chat = await msg.getChat();
    
    if (chat.isGroup) {
      if (msg.hasQuotedMsg) {
        const quotedMsg:Message = await msg.getQuotedMessage();
        const contact:Contact = await quotedMsg.getContact();
        
        try {
          await textOverlay(contact.pushname);
          const sticker: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/will_sticker.png`);

          await quotedMsg.reply(sticker, chat.id._serialized, {
            mentions: [contact],
            sendMediaAsSticker: true,
          });
        } catch (error) {
          handleError(error);
          await quotedMsg.reply(`Deu erro: ${error}`, chat.id._serialized, {
            mentions: [contact]
          });
        }
      } else {
        await textOverlay(`TODOS`);
        const stickerGeneral: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/will_sticker.png`);
        
        await msg.reply(stickerGeneral, chat.id._serialized, {
          sendMediaAsSticker: true,
        });
      }
    }
  } catch (error) {
    handleError(error);
  }
}

async function textOverlay(name: string): Promise<void> {
  try {
    const image = await Jimp.read(`${imagePath}/will_stop.jpg`);
    const font = await Jimp.loadFont(`${fontPath}/maximum_impact/GRJ3inO74NleyXBCDFftvUtn.ttf.fnt`);
    image.print(font, 40, 272, `${name}, PARA!!`, 353, 373);
    await image.writeAsync(`${imagePath}/will_sticker.png`);
  } catch (error) {
    throw error;
  }
}
