import Chat from "./Chat";

export default interface Label {
    hexColor: string,
    id: string,
    name: string,
    getChats(): Promise<Chat[]>
}