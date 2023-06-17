export interface CustomCommand {
    name: string,
    type: string, // count, answer or media
    count: number,
    answer: string
    media: string
}