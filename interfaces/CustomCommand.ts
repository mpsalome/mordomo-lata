import { MessageMedia } from "whatsapp-web.js"

export interface CustomCommand {
    name: string,
    type: string,  // Command types: count, answer, media, audio, document, sticker, gif
    count: number,
    answer: string
    media: MessageMedia
}