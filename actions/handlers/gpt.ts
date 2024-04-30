import { Message } from 'whatsapp-web.js';
import * as consts from '../../utils/constants'
const { Configuration, OpenAIApi } = require("openai");

export default async (msg: Message) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const question:string = msg.body.split(`${consts.COMMAND_SYMBOL}meconta`)[1];
    const answer:string = await askQuestion(question, openai);
    msg.reply(`${answer}`);
    return;
}

async function askQuestion(question: string, openai: any): Promise<string> {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${question}`,
            "max_tokens": 1000
        });
        return (completion.data.choices[0].text.trim());
    } catch (error) {
        return `Erro na API: ${error}`
    }
    
}
