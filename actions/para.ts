import { Message, MessageMedia } from "whatsapp-web.js";
const Jimp = require("jimp");
const path = require("path");
const imagePath = path.resolve("./resources/images");
const fontPath = path.resolve("./resources/fonts");

export const para = async (msg: Message) => {
  const chat: any = await msg.getChat();
  if (chat.isGroup) {
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      const contact = await quotedMsg.getContact();
      try {
        await textOverlay(`${contact.pushname}`);
        const sticker: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/will_sticker.png`);

        quotedMsg.reply(sticker, chat.chatId, {
          mentions: [contact],
          sendMediaAsSticker: true,
        });

      } catch (error) {
        quotedMsg.reply(`Deu erro: ${error}`, chat.chatId, {
          mentions: [contact]
        });
      }
      return;
    }

    await textOverlay(`TODOS`);

    const stickerGeneral: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/will_sticker.png`)

    msg.reply(stickerGeneral, chat.chatId, {
      sendMediaAsSticker: true,
    });

    return;
  }
  return;
};

async function textOverlay(name: string) {
  const image = await Jimp.read(`${imagePath}/will_stop.jpg`);
  const font = await Jimp.loadFont(`${fontPath}/maximum_impact/GRJ3inO74NleyXBCDFftvUtn.ttf.fnt`);
  image.print(font, 40, 272, `${name}, PARA!!`, 353, 373);
  await image.writeAsync(`${imagePath}/will_sticker.png`);
}
