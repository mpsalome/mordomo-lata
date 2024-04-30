import { Message, MessageMedia } from 'whatsapp-web.js';
import { replyQuotedMsg } from '../../utils/index'
import * as consts from '../../utils/constants';
const path = require("path");
const audioPath = path.resolve("./resources/audios");
const videoPath = path.resolve("./resources/videos");
const imagePath = path.resolve("./resources/images");

export default async (msg: Message) => {
  const requestedAudio = msg.body.split(` `)[1];
  if (requestedAudio === "lista") {
    replyQuotedMsg(msg, consts.MIDIAS(consts.ARRAY_AUDIOS, consts.ARRAY_VIDEOS, consts.ARRAY_IMAGENS))
    return;
  }
  const media = await handleRequest(requestedAudio)
  media.data ? replyQuotedMsg(msg, media) : msg.reply('Midia não encontrada')
  return;
};

async function handleRequest(requestedAudio: string): Promise<MessageMedia> {
  let media: MessageMedia = {} as MessageMedia;
  switch (requestedAudio) {
    case consts.ARRAY_AUDIOS[0]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[0]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[1]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[1]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[2]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[2]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[3]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[3]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[4]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[4]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[5]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[5]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[6]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[6]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[7]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[7]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[8]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[8]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[9]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[9]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[10]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[10]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[11]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[11]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[12]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[12]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[13]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[13]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[14]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[14]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[15]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[15]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[16]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[16]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[17]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[17]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[18]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[18]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[19]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[19]}.mpeg`)
      break;
    case consts.ARRAY_AUDIOS[20]:
      media = await MessageMedia.fromFilePath(`${audioPath}/${consts.ARRAY_AUDIOS[20]}.mpeg`)
      break;
    case consts.ARRAY_VIDEOS[0]:
      media = await MessageMedia.fromFilePath(`${videoPath}/${consts.ARRAY_VIDEOS[0]}.mp4`)
      break;
    case consts.ARRAY_VIDEOS[1]:
      media = await MessageMedia.fromFilePath(`${videoPath}/${consts.ARRAY_VIDEOS[1]}.mp4`)
      break;
    case consts.ARRAY_IMAGENS[0]:
      media = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[0]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[1]:
      media = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[1]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[2]:
      media = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[2]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[3]:
      media = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[3]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[4]:
      media = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[4]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[5]:
      media = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[5]}.jpeg`)
      break;
    case consts.ARRAY_IMAGENS[6]:
      media = await MessageMedia.fromFilePath(`${imagePath}/${consts.ARRAY_IMAGENS[6]}.jpeg`)
      break;
    default:
      media.data = '';
      break;
  }
  return media
}