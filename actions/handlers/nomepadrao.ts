import { Message, Chat, GroupChat } from 'whatsapp-web.js';
import { handleError } from '../../utils/index';

export default async (msg: Message, defaultGroupTitle: string) => {
    try {
        const chat:Chat | undefined = await msg.getChat();
        if (chat && chat.isGroup) {
            const group:GroupChat = chat as GroupChat;
            await group.setSubject(defaultGroupTitle);
        }
    } catch (error) {
        handleError(error);
    }
}
