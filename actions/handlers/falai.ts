import { Message, MessageMedia } from 'whatsapp-web.js';
import { COMMAND_SYMBOL } from '../../utils/constants';
import * as googleTTS from 'google-tts-api';
import { handleError } from '../../utils/index';

export default async (msg: Message) => {
    try {
        let audioUrl: string = '';
        if (msg.hasQuotedMsg) {
            const quotedMsg: Message = await msg.getQuotedMessage();
            const text: string = quotedMsg.body;
            audioUrl = await createAudioUrlFrom(text);
        } else {
            const text = msg.body.split(`${COMMAND_SYMBOL}falai`)[1];
            audioUrl = await createAudioUrlFrom(text);
        }
        await sendAudioMessage(msg, audioUrl);
    } catch (error) {
        handleError(error);
    }
};

async function createAudioUrlFrom(text: string): Promise<string> {
    try {
        const url = googleTTS.getAudioUrl(text, {
            lang: 'pt_br',
            slow: false,
            host: 'https://translate.google.com',
        });
        return url;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

async function sendAudioMessage(msg: Message, audioUrl: string): Promise<void> {
    try {
        const audioMedia: MessageMedia = await MessageMedia.fromUrl(audioUrl, { unsafeMime: true });
        msg.reply(audioMedia);
    } catch (error) {
        handleError(error);
    }
    return;
}
