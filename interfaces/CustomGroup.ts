import { ChatId } from "whatsapp-web.js";
import { CustomCommand } from "./CustomCommand";

export interface CustomGroupChat {
    chatId: ChatId,
    commands: Array<CustomCommand>
}
