import { Message } from 'whatsapp-web.js';
import { COMMAND_SYMBOL } from '../../utils/constants';
import OpenAI from 'openai';
import { handleError, log } from '../../utils/index';

export default async (msg: Message) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        const question:string = msg.body.split(`${COMMAND_SYMBOL}meconta`)[1];
        const answer:string = await askQuestion(question, openai);
        msg.reply(`${answer}`);
    } catch (error) {
        handleError(error);
    }
    return;
}

async function askQuestion(question: string, openai:OpenAI): Promise<string> {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages:  [{"role": "user", "content": `${question}`}],
            "max_tokens": 1000
        });
        log(JSON.stringify(completion))
        return ((completion.choices[0].message.content ?? 'Algum erro com a API').toString().trim());
    } catch (error) {
        handleError(error);
        throw error;
    }
}
