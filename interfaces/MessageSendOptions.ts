import Contact from "./Contact";
import MessageMedia from "./MessageMedia";

export default interface MessageSendOptions {
    linkPreview: boolean,
    sendAudioAsVoice: boolean,
    sendVideoAsGif: boolean,
    sendMediaAsSticker: boolean,
    sendMediaAsDocument: boolean,
    parseVCards: boolean,
    caption: string,
    quotedMessageId: string,
    mentions: Contact[],
    sendSeen: boolean,
    stickerAuthor: string,
    stickerName: string,
    stickerCategories: string[],
    media: MessageMedia
}