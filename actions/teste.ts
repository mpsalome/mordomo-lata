import { Message } from 'whatsapp-web.js'; 

export const teste = (msg: Message)=> {
    msg.reply('testado');
    return;
}