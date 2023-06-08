require('dotenv').config()
const { Client } = require('whatsapp-web.js');
const raspberryArgs = {
  puppeteer: {
    executablePath: '/usr/bin/chromium-browser',
    headless: true,
    args: ['--no-sandbox'],
  }
};
const client = new Client(process.argv[2] ? raspberryArgs : {});
import consts from './constants';
const qrcode = require('qrcode-terminal');

//actions on msg received
import { teste } from './actions/teste';
import { nomepadrao } from './actions/nomepadrao';
import { all } from './actions/all';
import { audio } from './actions/midia';
import { para } from './actions/para';
import { comandos } from './actions/comandos';
import { sticker } from './actions/sticker';
import { salve } from './actions/salve';
import { gpt } from './actions/gpt';
import { falai } from './actions/falai';
import { burro } from './actions/burro';
import { criacomando } from './actions/criacomando'
import { lecomando } from './actions/lecomando'
import { atualizacomando } from './actions/atualizacomando'

//interfaces imports
import { Message } from 'whatsapp-web.js';

client.initialize();

client.on('call', async (call: any) => {
  console.log('Call received, rejecting. GOTO Line 261 to disable', call);
  if (consts.REJECT_CALLS) await call.reject();
  await client.sendMessage(
    call.from,
    `[${call.fromMe ? 'Outgoing' : 'Incoming'}] Phone call from ${call.from
    }, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'
    } call. ${consts.REJECT_CALLS
      ? 'This call was automatically rejected by the script.'
      : ''
    }`
  );
});

client.on('loading_screen', (percent: string, message: string) => {
  console.log(consts.LOADING_SCREEN, percent, message);
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log(consts.AUTHENTICATED);
});

client.on('auth_failure', (msg: Message) => {
  console.error(consts.AUTH_FAILURE, msg);
});

client.on('ready', () => {
  console.log(consts.READY);
});

client.on('disconnected', (reason: any) => {
  console.log(consts.DISCONNECTED, reason);
});

client.on('message', async (msg: Message) => {
  if (process.env.RANDOMLY_ANSWER && !msg.body.startsWith(`${consts.COMMAND_SYMBOL}`) && Math.random() <= Number(process.env.RANDOMLY_ANSWER_CHANCE)) {
    msg.body = `!evil ${msg.body}`;
    gpt(msg);
    return;
  }

  if (!msg.body.startsWith(`${consts.COMMAND_SYMBOL}`)) return;

  //used commands that have parameters
  if (msg.body.startsWith(`${consts.COMMAND_SYMBOL}midia`) || msg.body.startsWith(`${consts.COMMAND_SYMBOL}mídia`)) {
    let requestedAudio = msg.body.split(` `)[1];
    audio(msg, requestedAudio);
    return;
  } else if (msg.body.startsWith(`${consts.COMMAND_SYMBOL}salve`)) {
    salve(msg);
    return;
  } else if (msg.body.startsWith(`${consts.COMMAND_SYMBOL}meconta`) || msg.body.startsWith(`${consts.COMMAND_SYMBOL}dan`) || msg.body.startsWith(`${consts.COMMAND_SYMBOL}stan`) || msg.body.startsWith(`${consts.COMMAND_SYMBOL}dude`) || msg.body.startsWith(`${consts.COMMAND_SYMBOL}mongo`) || msg.body.startsWith(`${consts.COMMAND_SYMBOL}evil`)) {
    gpt(msg);
    return;
  } else if (msg.body.startsWith(`${consts.COMMAND_SYMBOL}falai`)) {
    falai(msg);
    return;
  } else if (msg.body.startsWith(`${consts.COMMAND_SYMBOL}criacomando`)) {
    criacomando(msg);
    return;
  } else if (msg.body.startsWith(`${consts.COMMAND_SYMBOL}atualizacomando`)) {
    atualizacomando(msg);
    return;
  }

  switch (msg.body) {
    case `${consts.COMMAND_SYMBOL}teste`:
      teste(msg);
      break;
    case `${consts.COMMAND_SYMBOL}nomepadrao`:
      nomepadrao(msg, consts.DEFAULT_GROUP_TITLE);
      break;
    case `${consts.COMMAND_SYMBOL}all`:
      all(msg);
      break;
    case `${consts.COMMAND_SYMBOL}para`:
      para(msg);
      break;
    case `${consts.COMMAND_SYMBOL}comandos`:
      comandos(msg);
      break;
    case `${consts.COMMAND_SYMBOL}sticker`:
      sticker(msg);
      break;
    case `${consts.COMMAND_SYMBOL}burro`:
      burro(msg);
      break;
    default:
      break;
  }

  //custom commands that don't match any of the criterias used above
  lecomando(msg);

  return;
});