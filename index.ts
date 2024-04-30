const qrcode = require('qrcode-terminal');
import { Client, ClientOptions, Message } from 'whatsapp-web.js';
import dotenv from 'dotenv';
import * as utils from './utils/index';
import * as consts from './utils/constants';
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
  if (consts.REJECT_CALLS) await call.reject();
  await client.sendMessage(
    call.from,
    `[${call.fromMe ? 'Outgoing' : 'Incoming'}] Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. ${consts.REJECT_CALLS ? 'This call was automatically rejected by the script.' : ''}`
  );
});

client.on('loading_screen', (percent: string, message: string) => {
  utils.log(`${consts.LOADING_SCREEN} ${percent} ${message}`);
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  utils.log(consts.AUTHENTICATED);
});

client.on('auth_failure', (msg: Message) => {
  utils.log(consts.AUTH_FAILURE, 'error');
});

client.on('ready', () => {
  utils.log(consts.READY);
});

client.on('disconnected', (reason: any) => {
  utils.log(`${consts.DISCONNECTED} ${reason}`, 'error');
});

client.on('message', async (msg: Message) => {
  if (!msg.body.startsWith(consts.COMMAND_SYMBOL)) return;
  utils.processCommand(msg, [
    { command: 'midia', handler: actions.audioHandler },
    { command: 'salve', handler: actions.salveHandler },
    { command: 'meconta|dan|stan|dude|mongo|evil', handler: actions.gptHandler },
    { command: 'falai', handler: actions.falaiHandler },
    { command: 'criacomando', handler: actions.criacomandoHandler },
    { command: 'atualizacomando', handler: actions.atualizacomandoHandler },
    { command: 'teste', handler: actions.testeHandler },
    { command: 'nomepadrao', handler: (msg:Message) => actions.nomepadraoHandler(msg, consts.DEFAULT_GROUP_TITLE) },
    { command: 'all', handler: (msg:Message) => actions.allHandler(msg, client) },
    { command: 'para', handler: actions.paraHandler },
    { command: 'comandos', handler: actions.comandosHandler },
    { command: 'sticker', handler: actions.stickerHandler },
    { command: 'burro', handler: actions.burroHandler }
  ]);
});
