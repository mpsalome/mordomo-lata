import { Message, MessageMedia } from 'whatsapp-web.js';
import * as googleTTS from 'google-tts-api';

export const falai = async (msg: Message) => {
    if (msg.hasQuotedMsg) {
        const quotedMsg: Message = await msg.getQuotedMessage();
        const text: string = quotedMsg.body;
        const audioUrl = await createAudioUrlFrom(text);
        await sendAudioMessage(quotedMsg, audioUrl);
        return;
    } else {
        const text: string = msg.body.split(`!falai`)[1];
        const audioUrl = await createAudioUrlFrom(text);
        await sendAudioMessage(msg, audioUrl);
        return;
    }
}

async function createAudioUrlFrom(text: string): Promise<string> {
    const url = googleTTS.getAudioUrl(text, {
        lang: 'pt_br',
        slow: false,
        host: 'https://translate.google.com',
    });
    return url;
}

async function sendAudioMessage(msg: Message, audioUrl: string): Promise<void> {
    const audioMedia: MessageMedia = await MessageMedia.fromUrl(audioUrl, { unsafeMime: true });
    msg.reply(audioMedia);
    return;
}