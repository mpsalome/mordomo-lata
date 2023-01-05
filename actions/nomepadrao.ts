import Message from '../interfaces/Message';

export const  nomepadrao = async (msg: Message, defaultGroupTitle: String) => {
    let chat = await msg.getChat();
    if (chat.isGroup) {
        chat.setSubject(defaultGroupTitle);
    }
    return;
}