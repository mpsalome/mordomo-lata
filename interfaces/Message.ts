import MessageTypes from "./MessageTypes";
import MessageAck from "./MessageAck";
import Location from "./Location";

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
    vCards: string[]
}