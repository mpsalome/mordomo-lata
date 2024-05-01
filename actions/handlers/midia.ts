import { Message, MessageMedia } from 'whatsapp-web.js';
import { handleError, replyQuotedMsg, log } from '../../utils/index';
import * as consts from '../../utils/constants';
const path = require("path");
const audioPath = path.resolve("./resources/audios");
const videoPath = path.resolve("./resources/videos");
const imagePath = path.resolve("./resources/images");

export default async (msg: Message) => {
    try {
        const requestedMedia = msg.body.split(` `)[1];
        if (requestedMedia === "lista") {
            const mediaList = consts.MIDIAS(consts.ARRAY_AUDIOS, consts.ARRAY_VIDEOS, consts.ARRAY_IMAGENS);
            replyQuotedMsg(msg, mediaList);
            return;
        }
        const media = await handleRequest(requestedMedia);
        media.data ? replyQuotedMsg(msg, media, undefined, { sendMediaAsDocument: false }) : msg.reply('Midia não encontrada');
    } catch (error) {
      handleError(error);
    }
};

async function handleRequest(requestedMedia: string): Promise<MessageMedia> {
  const mediaPaths: { [key: string]: string } = {
    ARRAY_AUDIOS: audioPath,
    ARRAY_VIDEOS: videoPath,
    ARRAY_IMAGENS: imagePath
  };

  const mediaType = getMediaType(requestedMedia);
  const mediaIndex = getMediaIndex(requestedMedia);

  if (mediaType && mediaIndex !== undefined) {
    const mediaPath = `${mediaPaths[mediaType]}/${consts[`${mediaType}`][mediaIndex]}`;
    try {
      const media:MessageMedia = await MessageMedia.fromFilePath(`${mediaPath}.mpeg`);
      return media;
    } catch (error) {
      log(`Error loading ${mediaType} media: ${error}`, 'error');
      throw error;
    }
  } else {
    log(`Invalid media type: ${requestedMedia}`, 'warn');
    throw new Error("undefined");
  }
}

function getMediaType(requestedMedia: string): 'ARRAY_AUDIOS' | 'ARRAY_VIDEOS' | 'ARRAY_IMAGENS' | undefined {
  if (consts.ARRAY_AUDIOS.includes(requestedMedia)) {
    return 'ARRAY_AUDIOS';
  } else if (consts.ARRAY_VIDEOS.includes(requestedMedia)) {
    return 'ARRAY_VIDEOS';
  } else if (consts.ARRAY_IMAGENS.includes(requestedMedia)) {
    return 'ARRAY_IMAGENS';
  }
  return undefined;
}

function getMediaIndex(requestedMedia: string): number | undefined {
  const mediaType = getMediaType(requestedMedia);
  if (mediaType) {
    return consts[`${mediaType}`].indexOf(requestedMedia);
  }
  return undefined;
}
