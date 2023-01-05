import { GroupChat } from 'whatsapp-web.js';

import { Message } from 'whatsapp-web.js'; 

export const  nomepadrao = async (msg: Message, defaultGroupTitle: string) => {
    let chat:any = await msg.getChat();
    if (chat.isGroup) {
        chat.setSubject(defaultGroupTitle);
    }
    return;
}