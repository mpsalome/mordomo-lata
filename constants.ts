export default {
  COMMAND_SYMBOL: '!',
  REJECT_CALLS: true,
  LOADING_SCREEN: 'LOADING SCREEN',
  QR: 'QR RECEIVED',
  AUTHENTICATED: 'AUTHENTICATED',
  AUTH_FAILURE: 'AUTHENTICATION FAILURE',
  READY: 'READY',
  DISCONNECTED: 'Client was logged out',
  GROUP_JOIN: 'User joined.',
  GROUP_LEAVE: 'User left.',
  GROUP_UPDATE: 'Group updated',
  CHANGE_STATE: 'CHANGE STATE',
  MESSAGE_RECEIVED: 'MESSAGE RECEIVED',
  DEFAULT_GROUP_TITLE: '🍞🛢️ Pão em Lata',
  COMANDOS:`*Lista de comandos:*\nall\nmidia,midia lista\npara\nnomepadrao\nteste`,
  ARRAY_AUDIOS: [
    'acaba',
    `acompanha-o-grupo`,
    `antigona`,
    `armadinho`,
    `ban`,
    `boca-de-leite`,
    `bola-rindo`,
    `de-novo`,
    `fogos`,
    `fora-do-brasil`,
    `linda-de-bonita`,
    `outra-vez`,
    `pao-em-lata-ost`,
    `pintou-notificacao-rony`,
    `ratinho-estourado`,
    `evita`,
    `bom-de-leite`,
    `cala-boca`,
    `nossa-veio`,
    `mim-de`,
  ],
  ARRAY_VIDEOS: [
    `fnx`,
  ],
  MIDIAS: (audios: Array<String>, videos: Array<String>) => (
    `*Lista de midias:*\n\n*Áudios:*\n${audios.map(audio => `midia ${audio}`).join('\n')}\n\n*Vídeos:* \n${videos.map(audio => `midia ${audio}`).join('\n')}`
  )
};
