import ContactId from "./ContactId"

export default interface MessageInfo {
    delivery: {id: ContactId, t: number}[],
    deliveryRemaining: number,
    played: {id: ContactId, t: number}[],
    playedRemaining: number,
    read: {id: ContactId, t: number}[],
    readRemaining: number
}