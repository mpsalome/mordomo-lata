import { Message, MessageMedia } from 'whatsapp-web.js';
import consts from '../constants';
const Jimp = require("jimp");
const path = require("path");
const imagePath = path.resolve("./resources/images");
const fontPath = path.resolve("./resources/fonts");

export const sticker = async (msg: Message) => {
    let media: MessageMedia = new MessageMedia(``, ``, ``);
    if (msg.hasMedia) {
        media = await getMessageMedia(msg);
    } else {
        if (msg.hasQuotedMsg) {
            let quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                media = await getMessageMedia(msg);
            } else {
                return;
            }
        }
    }
    const chat: any = await msg.getChat();
    if (msg.hasQuotedMsg) {
        let quotedMsg = await msg.getQuotedMessage();
        media = await getMessageMedia(msg);
        quotedMsg.reply(media, chat.chatId, { sendMediaAsSticker: true })
        return;
    }
    msg.reply(media, chat.chatId, { sendMediaAsSticker: true });
    return;
};

async function getMessageMedia(msg: Message) {
    let media: MessageMedia = await msg.downloadMedia();
    if (msg.body.split(` `).length > 1) {
        await textOverlay(media.data, msg.body.split(`${consts.COMMAND_SYMBOL}sticker`)[1]);
        media = await MessageMedia.fromFilePath(`${imagePath}/sticker.png`);
        return media;
    }
    return media
}

async function textOverlay(base64: string, text: string) {
    const imageBuffer = Buffer.from(base64, 'base64');
    const image = await Jimp.read(imageBuffer);
    const font = await Jimp.loadFont(`${fontPath}/maximum_impact/GRJ3inO74NleyXBCDFftvUtn.ttf.fnt`);
    image.print(font, 40, 272, `${text}`);
    await image.writeAsync(`${imagePath}/sticker.png`);
}
