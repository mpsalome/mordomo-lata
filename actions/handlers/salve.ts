import { Chat, Message, MessageMedia, Contact } from "whatsapp-web.js";
import { replyQuotedMsg, handleError } from "../../utils/index";
const Jimp = require("jimp");
const path = require("path");

const imagePath = path.resolve("./resources/images");
const fontPath = path.resolve("./resources/fonts");

export default async function processMessage(msg: Message): Promise<void> {
  try {
    const chat: Chat = await msg.getChat();
    if (!chat.isGroup) return;
    const sticker: MessageMedia = await getSticker(msg);
    await replyQuotedMsg(msg, sticker, chat.id, { sendMediaAsSticker: true });
  } catch (error) {
    handleError(error);
  }
}
async function createStickerImageWithContact(name: string): Promise<string> {
  try {
    const image = await Jimp.read(`${imagePath}/salve_blank.png`);
    const font = await Jimp.loadFont(`${fontPath}/bebas_neue/fn0Aw5cPObO5pPproIXmFG1e.ttf.fnt`);
    image.print(font, 12, 375, `${name}`);
    await image.writeAsync(`${imagePath}/salve_sticker.png`);
    return `${imagePath}/salve_sticker.png`;
  } catch (error) {
    throw error;
  }
}

async function getSticker(msg: Message): Promise<MessageMedia> {
  try {
    const name: string = await getContactName(msg);
    const filePath: string = await createStickerImageWithContact(name);
    return MessageMedia.fromFilePath(filePath);
  } catch (error) {
    throw error;
  }
}

async function getContactName(msg: Message): Promise<string> {
  try {
    const mentioned: Contact[] = await msg.getMentions();
    
    if (msg.body.split(" ").length > 1 && mentioned) return mentioned[0].pushname;
    
    if (msg.hasQuotedMsg) {
      const quotedMsg: Message = await msg.getQuotedMessage();
      const contact: Contact = await quotedMsg.getContact();
      return contact.pushname;
    }

    return "PESSOAL";
  } catch (error) {
    throw error;
  }
}