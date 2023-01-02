export const  nomepadrao = async (msg, defaultGroupTitle: String) => {
    let chat = await msg.getChat();
    if (chat.isGroup) {
        chat.setSubject(defaultGroupTitle);
    }
    return;
}