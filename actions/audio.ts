import { Message, MessageMedia } from 'whatsapp-web.js';
const path = require("path");
const audioPath = path.resolve("./resources/audios");

export const audio = async (msg: Message, requestedAudio: string) => {
  let emptyMessageMedia: MessageMedia = new MessageMedia(``, ``, ``);
  if(requestedAudio==="lista") {
    if (msg.hasQuotedMsg) {
      let quotedMsg = await msg.getQuotedMessage();
      quotedMsg.reply(`*Lista de áudios:*\n!audio acaba\n!audio acompanha-o-grupo\n!audio antigona\n!audio armadinho\n!audio ban\n!audio boca-de-leite\n!audio bola-rindo\n!audio de-novo\n!audio fogos\n!audio fora-do-brasil\n!audio linda-de-bonita\n!audio outra-vez\n!audio pao-em-lata-ost\n!audio pintou-notificacao-rony\n!audio ratinho-estourado`);
      return;
    }
    msg.reply(`*Lista de áudios:*\n!audio acaba\n!audio acompanha-o-grupo\n!audio antigona\n!audio armadinho\n!audio ban\n!audio boca-de-leite\n!audio bola-rindo\n!audio de-novo\n!audio fogos\n!audio fora-do-brasil\n!audio linda-de-bonita\n!audio outra-vez\n!audio pao-em-lata-ost\n!audio pintou-notificacao-rony\n!audio ratinho-estourado`);
    return;
  }
  switch (requestedAudio) {
    case 'acaba':
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\acaba.mpeg`)
      break;
    case `acompanha-o-grupo`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\acompanha-o-grupo.mpeg`)
      break;
    case `antigona`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\antigona.mpeg`)
      break;
    case `armadinho`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\armadinho.mpeg`)
      break;
    case `ban`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\ban.mpeg`)
      break;
    case `boca-de-leite`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\boca-de-leite.mpeg`)
      break;
    case `bola-rindo`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\bola-rindo.mpeg`)
      break;
    case `de-novo`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\de-novo.mpeg`)
      break;
    case `fogos`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\fogos.mpeg`)
      break;
    case `fora-do-brasil`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\fora-do-brasil.mpeg`)
      break;
    case `linda-de-bonita`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\linda-de-bonita.mpeg`)
      break;
    case `outra-vez`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\outra-vez.mpeg`)
      break;
    case `pao-em-lata-ost`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\pao-em-lata-ost.mpeg`)
      break;
    case `pintou-notificacao-rony`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\pintou-notificacao-rony.mpeg`)
      break;
    case `ratinho-estourado`:
      emptyMessageMedia = await MessageMedia.fromFilePath(`${audioPath}\\ratinho-estourado.mpeg`)
    default:
      emptyMessageMedia.data = '';
      break;
  }
  if ( emptyMessageMedia.data === '') {
    msg.reply('Áudio não encontrado') 
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
