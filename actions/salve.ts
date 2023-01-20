import { Message, MessageMedia } from "whatsapp-web.js";
const Jimp = require("jimp");
const path = require("path");
const imagePath = path.resolve("./resources/images");

export const salve = async (msg: Message) => {
  const chat: any = await msg.getChat();
  if (chat.isGroup) {
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      const contact = await quotedMsg.getContact();
      try {
        await textOverlay(`${contact.pushname}`);
        const sticker: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/salve_sticker.png`);

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

    await textOverlay(`PESSOAL`);

    const stickerGeneral: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/salve_sticker.png`)
    const participants = chat.participants;

    msg.reply(stickerGeneral, chat.chatId, {
      mentions: participants,
      sendMediaAsSticker: true,
    });

    return;
  }
  return;
};

async function textOverlay(name: string) {
  const image = await Jimp.read(`${imagePath}/salve_blank.png`);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  image.print(font, 19, 418, `${name}`);
  await image.writeAsync(`${imagePath}/salve_sticker.png`);
}
