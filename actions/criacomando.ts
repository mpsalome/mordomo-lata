import { Message, } from 'whatsapp-web.js';
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const criacomando = async (msg: Message) => {
    const query: string = msg.body.split(`!criacomando`)[1];
    const params: string[] = query.split(` `);
    insertCommand(params);





    // if (msg.hasQuotedMsg) {
    //     const quotedMsg: Message = await msg.getQuotedMessage();
    //     const text: string = quotedMsg.body;
    //     const audioUrl = await createAudioUrlFrom(text);
    //     await sendAudioMessage(quotedMsg, audioUrl);
    //     return;
    // } else {
    //     const text: string = msg.body.split(`!falai`)[1];
    //     const audioUrl = await createAudioUrlFrom(text);
    //     await sendAudioMessage(msg, audioUrl);
    //     return;
    // }
}



async function insertCommand(params: string[]) {
    await prisma.command.create({
        data: {
            name: params[0],
            type: params[1],
            uses: Number(params[2])
        },
    }).then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
    return;
}

async function returnCommand(commandName: string) {
    const command = await prisma.command.findFirst({
        where: {
            name: commandName
        }
    });
    return command;
}

async function updateCommand(command: PrismaClient["command"]) {
    const post = await prisma.command.update({
        where: { name: command.n },
        data: { published: true },
    })
    return command;
}