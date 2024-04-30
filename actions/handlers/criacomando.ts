import { Chat, Message, ChatId } from "whatsapp-web.js";
import { CustomGroupChat } from "../../interfaces/CustomGroup";
import { CustomCommand } from "../../interfaces/CustomCommand";
import * as consts from '../../utils/constants';

const fs = require("fs");
const path = require("path");

export default async (msg: Message) => {

    const chat: Chat = await msg.getChat();
    const chatId: ChatId = chat.id;

    if (!chat.isGroup) {
        msg.reply("🚨 Comando só pode ser utilizado em grupos.", chatId.toString(), {});
        return;
    }

    //!criacomando grosso; answer; você foi grosso
    const subMsg: string = msg.body.split(`${consts.COMMAND_SYMBOL}criacomando`)[1].trim();
    const commandName: string = subMsg.split(";")[0].trim();
    const commandType: string = subMsg.split(";")[1].trim();
    const commandAnswer: string = subMsg.split(";")[2].trim();

    const newCommand: CustomCommand = {
        "name": commandName,
        "type": commandType,
        "count": 0,
        "answer": commandAnswer,
    };

    await insertGroupChatCommand(chatId, newCommand);

    msg.reply("Comando criado!");

    return;
};

async function insertGroupChatCommand(chatId: ChatId, newCommand: CustomCommand): Promise<void> {

    await fs.readFile(path.resolve("./resources/json/groups.json"), 'utf8', function readFileCallback(err: Error, data: string) {
        if (err) {
            console.log(err);
        } else {
            const groups: Array<CustomGroupChat> = JSON.parse(data);

            const groupChatIndex: number = getGroupChatIndex(groups, chatId);

            if (groupChatIndex > 0) {
                groups[groupChatIndex].commands.push(newCommand);
            } else {
                groups.push({
                    chatId: chatId,
                    commands: [{
                        ...newCommand
                    }]
                })
            }

            const json = JSON.stringify(groups);

            fs.writeFileSync(path.resolve("./resources/json/groups.json"), json, 'utf8');
        }
    });

    return;
}

function getGroupChatIndex(groups: Array<CustomGroupChat>, chatId: ChatId): number {
    const groupChatIndex: number = groups.findIndex((groupChat: CustomGroupChat) => groupChat.chatId._serialized === chatId._serialized);

    return groupChatIndex;
}
