import { Chat, Message, ChatId } from "whatsapp-web.js";
import { CustomGroupChat } from "../interfaces/CustomGroup";
import { CustomCommand } from "../interfaces/CustomCommand";
import consts from '../constants';

const fs = require("fs");
const path = require("path");


export const atualizacomando = async (msg: Message) => {

    const chat: Chat = await msg.getChat();
    const chatId: ChatId = chat.id;
    const groups: Array<CustomGroupChat> = JSON.parse(fs.readFileSync(path.resolve("./resources/json/groups.json"), "utf-8"));
    const groupChatIndex: number = getGroupChatIndex(groups, chatId);

    if (groupChatIndex < 0) return;

    //!atualizacomando grosso; fui grosso
    const commands: Array<CustomCommand> = groups[groupChatIndex].commands;
    const subMsg: string = msg.body.split(`${consts.COMMAND_SYMBOL}atualizacomando`)[1].trim();
    const commandName = subMsg.split(`;`)[0].trim();
    const newAnswer = subMsg.split(`;`)[1].trim();
    const commandIndex: number = getCommandIndex(commands, commandName);

    await updateGroupChatCommand(chatId, commandIndex, newAnswer);

    chat.sendMessage("Comando atualizado.");

    return;
};

function getGroupChatIndex(groups: Array<CustomGroupChat>, chatId: ChatId): number {
    const groupChatIndex: number = groups.findIndex((groupChat: CustomGroupChat) => groupChat.chatId._serialized === chatId._serialized);

    return groupChatIndex;
}

function getCommandIndex(commands: Array<CustomCommand>, commandName: string): number {
    const commmandIndex: number = commands.findIndex((command: CustomCommand) => command.name === commandName);

    return commmandIndex;
}

async function updateGroupChatCommand(chatId: ChatId, commandIndex: number, newAnswer: string): Promise<void> {

    await fs.readFile(path.resolve("./resources/json/groups.json"), 'utf8', function readFileCallback(err: Error, data: string) {
        if (err) {
            console.log(err);
        } else {
            const groups: Array<CustomGroupChat> = JSON.parse(data);

            const groupChatIndex: number = getGroupChatIndex(groups, chatId);

            groups[groupChatIndex].commands[commandIndex].answer = newAnswer;

            const json = JSON.stringify(groups);

            fs.writeFileSync(path.resolve("./resources/json/groups.json"), json, 'utf8');
        }
    });

    return;
}