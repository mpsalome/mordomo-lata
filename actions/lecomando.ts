import { Chat, Message, ChatId } from "whatsapp-web.js";
import { CustomGroupChat } from "../interfaces/CustomGroup";
import { CustomCommand } from "../interfaces/CustomCommand";
import consts from '../utils/constants';

const fs = require("fs");
const path = require("path");


export const lecomando = async (msg: Message) => {

    const chat: Chat = await msg.getChat();
    const chatId: ChatId = chat.id;
    const groups: Array<CustomGroupChat> = JSON.parse(fs.readFileSync(path.resolve("./resources/json/groups.json"), "utf-8"));
    const groupChatIndex: number = getGroupChatIndex(groups, chatId);

    if (groupChatIndex < 0) return;

    const commands: Array<CustomCommand> = groups[groupChatIndex].commands;
    const commandName = msg.body.split(`${consts.COMMAND_SYMBOL}`)[1];
    const commandIndex: number = getCommandIndex(commands, commandName);
    const commandUsed: CustomCommand = commands[commandIndex];

    if (commandIndex < 0) return;

    let reply = "";

    await updateGroupChatCommand(chatId, commandIndex);

    if (commandUsed.type === "count") {
        const vezes: string = commandUsed.count > 1 ? "vezes" : "vez";
        reply = `${commandUsed.answer} ${commandUsed.count} ${vezes}`;
    } else {
        reply = `${commandUsed.answer}`;
    }

    chat.sendMessage(reply);

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

async function updateGroupChatCommand(chatId: ChatId, commandIndex: number): Promise<void> {

    await fs.readFile(path.resolve("./resources/json/groups.json"), 'utf8', function readFileCallback(err: Error, data: string) {
        if (err) {
            console.log(err);
        } else {
            const groups: Array<CustomGroupChat> = JSON.parse(data);

            const groupChatIndex: number = getGroupChatIndex(groups, chatId);

            groups[groupChatIndex].commands[commandIndex].count++;

            const json = JSON.stringify(groups);

            fs.writeFileSync(path.resolve("./resources/json/groups.json"), json, 'utf8');
        }
    });

    return;
}