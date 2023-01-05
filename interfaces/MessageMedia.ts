export default interface MessageMedia {
    data: string,
    filename: string | null,
    filesize: string | null,
    mimetype: string,
    fromFilePath(filePath:string): MessageMedia,
    fromUrl(url:string, options?:object): Promise<MessageMedia>
}