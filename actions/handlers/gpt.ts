import { Message } from 'whatsapp-web.js';
import { COMMAND_SYMBOL } from '../../utils/constants';
const { Configuration, OpenAIApi } = require("openai");
import { log } from '../../utils/index';

export default async (msg: Message) => {
    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
    
        const openai = new OpenAIApi(configuration);
    
        const question:string = msg.body.split(`${COMMAND_SYMBOL}meconta`)[1];
        const answer:string = await askQuestion(question, openai);
        msg.reply(`${answer}`);
    } catch (error) {
        log(`Error: ${error.message}`, 'error');
    }
    return;
}

async function askQuestion(question: string, openai: typeof OpenAIApi): Promise<string> {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${question}`,
            "max_tokens": 1000
        });
        return (completion.data.choices[0].text.trim());
    } catch (error) {
        log(`Error in OpenAI API: ${error.message}`, 'error');
        throw error;
    }
}
