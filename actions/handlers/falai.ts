import { Message, MessageMedia } from 'whatsapp-web.js';
import * as consts from '../../utils/constants';
import * as googleTTS from 'google-tts-api';

export default async (msg: Message) => {
    let audioUrl: string = ''

    if (msg.hasQuotedMsg) {
        const quotedMsg: Message = await msg.getQuotedMessage();
        const text: string = quotedMsg.body;
        audioUrl = await createAudioUrlFrom(text);
    } else {
        const text = msg.body.split(`${consts.COMMAND_SYMBOL}falai`)[1]
        audioUrl = await createAudioUrlFrom(text);
    }
    await sendAudioMessage(msg, audioUrl);
    return
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
