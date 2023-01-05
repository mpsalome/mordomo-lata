import ContactId from "./ContactId";
import Chat from "./Chat";

export default interface Contact {
    id: ContactId,
    isBlocked: boolean,
    isBusiness: boolean,
    isEnterprise: boolean,
    isGroup: boolean,
    isMe: boolean,
    isMyContact: boolean,
    isUser: boolean,
    isWAContact: boolean,
    name: string | null,
    number: string,
    pushname: string,
    shortName: string | null,
    block(): Promise<boolean>,
    getAbout(): Promise<string | null>
    getChat(): Promise<Chat>,
    getCommonGroups(): Promise<object[]>,
    getCountryCode(): Promise<string>,
    getFormattedNumber(): Promise<string>,
    getProfilePicUrl(): Promise<string>,
    unblock(): Promise<boolean>
} 