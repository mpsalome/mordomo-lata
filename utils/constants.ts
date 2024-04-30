export const COMMAND_SYMBOL = '!';
export const REJECT_CALLS = true;
export const LOADING_SCREEN = 'LOADING SCREEN';
export const QR = 'QR RECEIVED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTH_FAILURE = 'AUTHENTICATION FAILURE';
export const READY = 'READY';
export const DISCONNECTED = 'Client was logged out';
export const GROUP_JOIN = 'User joined.';
export const GROUP_LEAVE = 'User left.';
export const GROUP_UPDATE = 'Group updated';
export const CHANGE_STATE = 'CHANGE STATE';
export const MESSAGE_RECEIVED = 'MESSAGE RECEIVED';
export const DEFAULT_GROUP_TITLE = process.env.NOME_PADRAO || '🍞🛢️ Pão em Lata';

export function COMANDOS(comandos:string[]) {
  return `*Lista de comandos:*\n\n${comandos.map((comando:string) => `${comando}`).join(`\n`)}`;
}

export const ARRAY_COMANDOS = [
  'all',
  'comandos',
  'midia lista',
  'midia [nome da midia]',
  'para',
  'nomepadrao',
  'teste',
  'sticker',
  'meconta [contexto|pergunta|pedido]',
  'falai',
  'burro'
];

export const ARRAY_AUDIOS = [
  'acaba',
  'acompanha-o-grupo',
  'antigona',
  'armandinho',
  'ban',
  'boca-de-leite',
  'bola-rindo',
  'de-novo',
  'fogos',
  'fora-do-brasil',
  'linda-de-bonita',
  'outra-vez',
  'pao-em-lata-ost',
  'pintou-notificacao-rony',
  'ratinho-estourado',
  'evita',
  'bom-de-leite',
  'cala-boca',
  'nossa-veio',
  'mim-de',
  'venha-baiano'
];

export const ARRAY_VIDEOS = [
  'fnx',
  'ditadura'
];

export const ARRAY_IMAGENS = [
  'domingo',
  'segunda-feira',
  'terca-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sabado'
];

export function MIDIAS(audios:string[], videos:string[], images:string[]) {
  return `*Lista de midias:*\n\n*Áudios:*\n${audios.map((audio:string) => `midia ${audio}`).join('\n')}\n\n*Vídeos:* \n${videos.map((video:string) => `midia ${video}`).join('\n')}\n\n*Imagens:* \n${images.map((image:string) => `midia ${image}`).join('\n')}`;
}
