import MessageTypes from "./MessageTypes";
import MessageAck from "./MessageAck";
import Location from "./Location";
import MessageMedia from "./MessageMedia"
import Chat from "./Chat"
import Contact from "./Contact";
import MessageInfo from "./MessageInfo";
import MessageSendOptions from "./MessageSendOptions";
import Order from "./Order";


export default interface Message {
    ack: MessageAck,
    author: string,
    body: string,
    bradcast: boolean,
    deviceType: string,
    duration: string,
    fowardingScore: number, 
    from:  string
    fromMe:  boolean,
    hasMedia:  boolean,
    hasQuotedMsg:  boolean,
    id:  object,
    inviteV4:  object,
    isEphemeral:  boolean,
    isForwarded:  boolean,
    isGif:  boolean,
    isStarred:  boolean,
    isStatus:  boolean,
    links: {link: string, isSuspicious: boolean}[],
    location:  Location,
    mediaKey:  string,
    mentionedIds: string[],
    orderId:  string,
    rawData:  object,
    timestamp:  number,
    to:  string,
    token:  string,
    type:  MessageTypes,
    vCards: string[],
    acceptGroupV4Invite(): Promise<object>,
    delete(everyone: boolean): void, 
    downloadMedia(): Promise<MessageMedia>,
    forward(chat:  string | Chat): Promise<object>,
    getChat(): Promise<Chat>,
    getContact(): Promise<Contact>,
    getInfo(): Promise<MessageInfo>,
    getMentions(): Promise<Contact>,
    getOrder(): Promise<Order>,
    getPayment(): Promise<any>,
    getQuotedMessage(): Promise<Message>,
    react(reaction:string): Promise<object>,
    reload(): Promise<Message>,
    reply(content: string | MessageMedia | Location, chatId?: string, options?: MessageSendOptions): Promise<Message>,
    star(): void,
    unstar(): void,
}