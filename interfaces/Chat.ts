import Location from "./Location";
import Message from "./Message";
import MessageMedia from "./MessageMedia";
import Contact from "./Contact";
import Label from "./Label";
import MessageSendOptions from "./MessageSendOptions";

export default interface Chat {
    archived: boolean,
    id: object,
    isGroup: boolean,
    isMuted: boolean,
    isReadOnly: boolean,
    muteExpiration: number,
    name: string,
    pinned: boolean,
    timestamp: number,
    unreadCount: number,
    archive(): void,
    clearMessages(): Promise<boolean>,
    clearState(): void,
    delete(): Promise<boolean>,
    fetchMessages(searchOptions: {limit: number, fromMe: boolean}): Promise<Message[]>,
    getContact(): Promise<Contact>,
    getLabels(): Promise<Label>,
    markUnread(): void,
    mute(unmuteDate: Date): void,
    pin(): Promise<boolean>,
    sendMessage(content: string | MessageMedia | Location, options?: MessageSendOptions): Promise<Message>,
    sendSeen(): Promise<boolean>,
    sendStateRecording(): void,
    sendStateTyping(): void,
    unarchive(): void,
    unmute(): void,
    unpin(): void,
}