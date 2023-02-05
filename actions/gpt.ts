import { Message } from 'whatsapp-web.js';
const { Configuration, OpenAIApi } = require("openai");

export const gpt = async (msg: Message) => {
    const question = msg.body.split(`!meconta`)[1];

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const answer = await askQuestion(question, openai);
    msg.reply(`${answer}`);
    return;
}

async function askQuestion(question: string, openai: any) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${question}`,
        "max_tokens": 1000 
    });
    return(completion.data.choices[0].text.trim());
}
