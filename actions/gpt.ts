import { Message } from 'whatsapp-web.js';
import consts from '../constants';
const { Configuration, OpenAIApi } = require("openai");

export const gpt = async (msg: Message) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    if (msg.body.includes(`!meconta`)) {
        const question = msg.body.split(`!meconta`)[1];
        const answer = await askQuestion(question, openai);
        msg.reply(`${answer}`);
    } else {
        const jailbreak_type = msg.body.split(/!(.*)/s)[1].split(" ")[0];
        const question = msg.body.split(/!(.*)/s)[1].split(/ (.*)/s)[1];
        
        let jailbreak_prompt = "";

        switch (jailbreak_type) {
            case 'dan':
                jailbreak_prompt = consts.JAILBREAK_GPT_DAN;
                break;
            case 'stan':
                jailbreak_prompt = consts.JAILBREAK_GPT_STAN;
                break;
            case 'dude':
                jailbreak_prompt = consts.JAILBREAK_GPT_DUDE;

                break;
            case 'mongo':
                jailbreak_prompt = consts.JAILBREAK_GPT_MONGO;
                break;
            case 'evil':
                jailbreak_prompt = consts.JAILBREAK_GPT_EVIL;
                break;
            default:
                jailbreak_prompt = consts.JAILBREAK_GPT_MONGO;
                break;
        }

        const answer = await askJailBreakQuestion(jailbreak_prompt, question, openai);
        msg.reply(`${answer}`);
    }

    return;
}

async function askQuestion(question: string, openai: any) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${question}`,
        "max_tokens": 1000
    });
    return (completion.data.choices[0].text.trim());
}

async function askJailBreakQuestion(jailbreak_prompt: string, question: string, openai: any) {
    const prompt = `${jailbreak_prompt} ${question}`;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        "max_tokens": 1000
    });
    return (completion.data.choices[0].text.trim());
}