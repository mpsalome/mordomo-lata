const { Client } = require('whatsapp-web.js');
const client = new Client({
  puppeteer: {
    executablePath: '/usr/bin/chromium-browser',
    headless: true,
    args: ['--no-sandbox'],
  }
});
import consts from './constants';
const qrcode = require('qrcode-terminal');

//actions on msg received
import { teste } from './actions/teste';
import { nomepadrao } from './actions/nomepadrao';
import { all } from './actions/all';

//interfaces imports
import { Message } from 'whatsapp-web.js';

client.initialize();

client.on('call', async (call: any) => {
  console.log('Call received, rejecting. GOTO Line 261 to disable', call);
  if (consts.REJECT_CALLS) await call.reject();
  await client.sendMessage(
    call.from,
    `[${call.fromMe ? 'Outgoing' : 'Incoming'}] Phone call from ${
      call.from
    }, type ${call.isGroup ? 'group' : ''} ${
      call.isVideo ? 'video' : 'audio'
    } call. ${
      consts.REJECT_CALLS
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

client.on('message_create', (msg: Message) => {
  // Fired on all message creations, including your own
  if (msg.fromMe) {
    // do stuff here
  }
});

client.on('message_revoke_everyone', async (after: any, before: any) => {
  // Fired whenever a message is deleted by anyone (including you)
  console.log(after); // message after it was deleted.
  if (before) {
    console.log(before); // message before it was deleted.
  }
});

client.on('group_join', (notification: any) => {
  // User has joined or been added to the group.
  console.log('join', notification);
  notification.reply(consts.GROUP_JOIN);
});

client.on('group_leave', (notification: any) => {
  // User has left or been kicked from the group.
  console.log('leave', notification);
  notification.reply(consts.GROUP_LEAVE);
});

client.on('group_update', (notification: any) => {
  // Group picture, subject or description has been updated.
  console.log(consts.GROUP_UPDATE, notification);
});

client.on('change_state', (state: any) => {
  console.log(consts.CHANGE_STATE, state);
});

client.on('message', async (msg: Message) => {
  console.log(consts.MESSAGE_RECEIVED, msg);
  if (!msg.body.startsWith(`${consts.COMMAND_SYMBOL}`)) return;

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

    default:
      break;
  }
});
