const qrcode = require('qrcode-terminal');
import { Client, ClientOptions, Message } from 'whatsapp-web.js';
import dotenv from 'dotenv';
import * as utils from './utils/index';
import {REJECT_CALLS, LOADING_SCREEN, AUTHENTICATED, AUTH_FAILURE, READY, DISCONNECTED, COMMAND_SYMBOL, DEFAULT_GROUP_TITLE} from './utils/constants';
import * as actions from './actions';

dotenv.config();


const raspberryArgs = {
  puppeteer: {
    executablePath: '/usr/bin/chromium-browser',
    headless: true,
    args: ['--no-sandbox'],
  }
};

const clientConfig:ClientOptions = {
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  },
  ...(process.argv[2] && raspberryArgs) 
  }

const client = new Client(clientConfig);


client.initialize();

client.on('call', async (call: any) => {
  if (REJECT_CALLS) await call.reject();
  await client.sendMessage(
    call.from,
    `[${call.fromMe ? 'Outgoing' : 'Incoming'}] Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. ${REJECT_CALLS ? 'This call was automatically rejected by the script.' : ''}`
  );
});

client.on('loading_screen', (percent: string, message: string) => {
  utils.log(`${LOADING_SCREEN} ${percent} ${message}`, 'info');
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  utils.log(AUTHENTICATED, 'info');
});

client.on('auth_failure', (msg: Message) => {
  utils.log(AUTH_FAILURE, 'error');
});

client.on('ready', () => {
  utils.log(READY, 'info');
});

client.on('disconnected', (reason: any) => {
  utils.log(`${DISCONNECTED} ${reason}`, 'error');
});

client.on('message', async (msg: Message) => {
  if (!msg.body.startsWith(COMMAND_SYMBOL)) return;
  utils.processCommand(msg, [
    { command: 'midia', handler: actions.audioHandler },
    { command: 'salve', handler: actions.salveHandler },
    { command: 'meconta', handler: actions.gptHandler },
    { command: 'falai', handler: actions.falaiHandler },
    { command: 'criacomando', handler: actions.criacomandoHandler },
    { command: 'atualizacomando', handler: actions.atualizacomandoHandler },
    { command: 'teste', handler: actions.testeHandler },
    { command: 'nomepadrao', handler: (msg:Message) => actions.nomepadraoHandler(msg, DEFAULT_GROUP_TITLE) },
    { command: 'all', handler: (msg:Message) => actions.allHandler(msg, client) },
    { command: 'para', handler: actions.paraHandler },
    { command: 'comandos', handler: actions.comandosHandler },
    { command: 'sticker', handler: actions.stickerHandler },
    { command: 'burro', handler: actions.burroHandler }
  ]);
});
