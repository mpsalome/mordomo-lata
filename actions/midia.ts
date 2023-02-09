import { Message, MessageMedia } from 'whatsapp-web.js';
import consts from '../constants';
const path = require("path");
const audioPath = path.resolve("./resources/audios");
const videoPath = path.resolve("./resources/videos");
const imagePath = path.resolve("./resources/images");

export const audio = async (msg: Message, requestedAudio: string) => {
  let emptyMessageMedia: MessageMedia = new MessageMedia(``, ``, ``);
  if (requestedAudio === "lista") {
    if (msg.hasQuotedMsg) {
      let quotedMsg = await msg.getQuotedMessage();
      quotedMsg.reply(consts.MIDIAS(consts.ARRAY_AUDIOS, consts.ARRAY_VIDEOS, consts.ARRAY_IMAGENS));
      return;
    }
    msg.reply(consts.MIDIAS(consts.ARRAY_AUDIOS, consts.ARRAY_VIDEOS, consts.ARRAY_IMAGENS));
    return;
  }
  switch (requestedAudio) {
    case consts.ARRAY_AUDIOS[0]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[0]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[1]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[1]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[2]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[2]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[3]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[3]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[4]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[4]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[5]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[5]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[6]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[6]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[7]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[7]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[8]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[8]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[9]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[9]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[10]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[10]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[11]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[11]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[12]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[12]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[13]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[13]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[14]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[14]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[15]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[15]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[16]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[16]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[17]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[17]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[18]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[18]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[19]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[19]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[20]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[20]}.mpeg`)
      break;
    case consts.ARRAY_VIDEOS[0]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${videoPath}/${consts.ARRAY_VIDEOS[0]}.mp4`)
      break;
    case consts.ARRAY_VIDEOS[1]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${videoPath}/${consts.ARRAY_VIDEOS[1]}.mp4`)
      break;
    case consts.ARRAY_IMAGENS[0]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[0]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[1]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[1]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[2]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[2]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[3]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[3]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[4]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[4]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[5]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[5]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[6]:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[6]}.jpeg`)
      break;
    default:
      emptyMessageMedia.data = '';
      break;
  }
  if (emptyMessageMedia.data === '') {
    msg.reply('Midia não encontrada')
    return;
  }
  if (msg.hasQuotedMsg) {
    let quotedMsg = await msg.getQuotedMessage();
    quotedMsg.reply(emptyMessageMedia);
    return;
  }
  msg.reply(emptyMessageMedia);
  return;
};
