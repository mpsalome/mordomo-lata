export const  nomepadrao = async (msg, defaultGroupTitle) => {
    let chat = await msg.getChat();
    if (chat.isGroup) {
        chat.setSubject(defaultGroupTitle);
    }
    return;
}