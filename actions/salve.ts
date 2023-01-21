import { Contact, Message, MessageMedia } from "whatsapp-web.js";
const Jimp = require("jimp");
const path = require("path");
const imagePath = path.resolve("./resources/images");
const fontPath = path.resolve("./resources/fonts");

export const salve = async (msg: Message) => {
  const mentioned: Contact[] = await msg.getMentions();
  const chat: any = await msg.getChat();
  if (chat.isGroup) {
    if (msg.body.split(` `).length > 1 && mentioned) {
      await textOverlay(`${mentioned[0].pushname}`);
      const stickerGeneral: MessageMedia = MessageMedia.fromFilePath(`${imagePath}/salve_sticker.png`)

      msg.reply(stickerGeneral, chat.chatId, {
        sendMediaAsSticker: true,
      });
  
      return;
    }

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

    msg.reply(stickerGeneral, chat.chatId, {
      sendMediaAsSticker: true,
    });

    return;
  }
  return;
};

async function textOverlay(name: string) {
  const image = await Jimp.read(`${imagePath}/salve_blank.png`);
  const font = await Jimp.loadFont(`${fontPath}/bebas_neue/fn0Aw5cPObO5pPproIXmFG1e.ttf.fnt`);
  image.print(font, 12, 375, `${name}`);
  await image.writeAsync(`${imagePath}/salve_sticker.png`);
}
