import { Message, MessageMedia } from 'whatsapp-web.js';
import consts from '../constants';
const path = require("path");
const audioPath = path.resolve("./resources/audios");
const videoPath = path.resolve("./resources/videos");


export const audio = async (msg: Message, requestedAudio: string) => {
  let emptyMessageMedia: MessageMedia = new MessageMedia(``, ``, ``);
  if (requestedAudio === "lista") {
    if (msg.hasQuotedMsg) {
      let quotedMsg = await msg.getQuotedMessage();
      quotedMsg.reply(`${consts.MIDIAS}`);
      return;
    }
    msg.reply(`${consts.MIDIAS}`);
    return;
  }
  switch (requestedAudio) {
    case 'acaba':
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\acaba.mpeg`))
      break;
    case `acompanha-o-grupo`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\acompanha-o-grupo.mpeg`))
      break;
    case `antigona`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\antigona.mpeg`))
      break;
    case `armadinho`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\armadinho.mpeg`))
      break;
    case `ban`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\ban.mpeg`))
      break;
    case `boca-de-leite`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\boca-de-leite.mpeg`))
      break;
    case `bola-rindo`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\bola-rindo.mpeg`))
      break;
    case `de-novo`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\de-novo.mpeg`))
      break;
    case `fogos`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\fogos.mpeg`))
      break;
    case `fora-do-brasil`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\fora-do-brasil.mpeg`))
      break;
    case `linda-de-bonita`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\linda-de-bonita.mpeg`))
      break;
    case `outra-vez`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\outra-vez.mpeg`))
      break;
    case `pao-em-lata-ost`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\pao-em-lata-ost.mpeg`))
      break;
    case `pintou-notificacao-rony`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\pintou-notificacao-rony.mpeg`))
      break;
    case `ratinho-estourado`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\ratinho-estourado.mpeg`))
      break;
    case `fnx`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${videoPath}\\fnx.mp4`))
      break;
    case `evita`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\evita.mpeg`))
      break;
    case `bom-de-leite`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\bom-de-leite.mpeg`))
      break;
    case `cala-boca`:
      emptyMessageMedia = await MessageMedia.fromFilePath(path.normalize(`${audioPath}\\cala-boca.mpeg`))
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
