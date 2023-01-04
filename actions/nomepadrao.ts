export const  nomepadrao = async (msg: any, defaultGroupTitle: String) => {
    let chat = await msg.getChat();
    if (chat.isGroup) {
        chat.setSubject(defaultGroupTitle);
    }
    return;
}