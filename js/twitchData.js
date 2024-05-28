/**
 * Contains all static customizable variables related to username and twitch spam types and messages.
 *
 * @file Update of https://github.com/gummangummangumman/twitch_chat_simulator/blame/master/javascript/twitchData.js.
 * @author Kathryn DiPippo, gummangummangumman 2020.
 */

/* exported twitchData */

// eslint-disable-next-line no-unused-vars
const twitchData = {
  usernamePrefixes: [
    'crazy', 'universal', 'sick', 'insane', 'cool', 'fun', 'mad', 'generic',
    'Cpt', 'nice', 'Dan', 'VAC', 'SWE', 'Wizard', 'faceless',
    'best_', 'daddy', 'mama', 'mister_', 'davai', 'Nick', 'de_', 'the_', 'iAm',
    'Loungin', 'extra', 'BOT', 'dirty', 'shoutout_to_', 'devil', 'Only'],
  usernameSuffixes: [
    'Kappa', 'Sniper', 'marshmellow', 'Shrek', 'M', 'LUL', 'Games', 'HD', 'lolo',
    '_yolo', 'QQ', 'stone', 'xD', 'meister', 'eric', 'james', 'loser',
    'haha', 'noob', 'dude', 'Bro', 'shotgun', 'DADDY', 'OneTaps', 'winner',
    'xx', 'pepe', 'explosion', 'easy', 'Nut', '000', 'Biceps', 'gamer', 'Majestic',
    'zzzzz', 'vortex', 'sound', 'tv'],
  usernameColors: ['red', 'green', 'teal', 'blue', 'purple', 'yellow'],
  emotes: [
    ['4Head', '4head.png'],
    ['5Head', '5Head.png'],
    ['AYAYA', 'AYAYA.png'],
    ['BibleThump', 'BibleThump.png'],
    ['catJAM', 'catJAM.gif'],
    ['Clap', 'Clap.gif'],
    ['DansGame', 'dansgame.png'],
    ['D:', 'gasp.png'],
    ['FeelsDankMan', 'FeelsDankMan.png'],
    ['FeelsGoodMan', 'FeelsGoodMan.png'],
    ['FeelsWeirdMan', 'FeelsWeirdMan.png'],
    ['Jebaited', 'Jebaited.png'],
    ['Kappa', 'Kappa.png'],
    ['Kapp', 'Kapp.png'],
    ['KEKW', 'KEKW.png'],
    ['KKona', 'KKona.png'],
    ['Kreygasm', 'Kreygasm.png'],
    ['LULW', 'LULW.png'],
    ['LUL', 'LUL.png'],
    ['monkaS', 'monkaS.png'],
    ['monkaW', 'monkaW.png'],
    ['NotLikeThis', 'notlikethis.png'],
    ['OMEGALUL', 'OMEGALUL.png'],
    ['Pepega', 'Pepega.png'],
    ['PepeLaugh', 'PepeLaugh.png'],
    ['PogChamp', 'pogchamp.png'],
    ['POGGERS', 'POGGERS.png'],
    ['PogU', 'PogU.png'],
    ['Pog', 'Pog.png'],
    ['Sadge', 'Sadge.png'],
    ['SeriousSloth', 'SeriousSloth.png'],
    ['TriHard', 'TriHard.png'],
    ['WeirdChamp', 'WeirdChamp.png'],
    ['WutFace', 'wutface.png'],
    ['YEP', 'YEP.png'],
    ['<3', 'heart.png']
  ]
}

const messageData = {
  laughing: {
    '[KEKW]': 1,
    '[LULW]': 1,
    '[LUL]': 1,
    '[OMEGALUL]': 1,
    '[OMEGALUL][Clap]': 1
  },
  positive: {
    '300 IQ': 1,
    ez: 1,
    GG: 1,
    'holy shit': 1,
    SAVED: 1,
    WHAT: 1,
    '[4Head]': 1,
    '[5Head]': 1,
    '[catJAM]': 1,
    '[FeelsGoodMan]': 1,
    '[Jebaited]': 1,
    '[Kappa]': 1,
    '[Kreygasm]': 1,
    '[LUL]': 1,
    '[PogChamp]': 1,
    '[PogChamp][PogChamp][PogChamp][PogChamp][PogChamp]': 1,
    '[PogU]': 1,
    '[PogU][Clap]': 1,
    '[Pog]': 1,
    '[<3]': 1
  },
  negative: {
    BOT: 5,
    gg: 1,
    HAHAHAHA: 1,
    LMAO: 1,
    'My streamer [Sadge]': 1,
    'NA CS': 2,
    OMG: 1,
    RUINED: 1,
    'so bad omg': 1,
    xD: 1,
    '[4Head]': 1,
    '[BibleThump]': 1,
    '[D:]': 1,
    '[Kappa]': 1,
    '[KEKW]': 1,
    '[LUL]': 1,
    '[monkaS]': 1,
    '[NotLikeThis]': 1,
    '[OMEGALUL]': 1,
    '[OMEGALUL][Clap]': 1,
    '[Pepega]': 1,
    '[WeirdChamp]': 1,
    '[WutFace]': 1
  },
  jams: {
    '[catJAM]': 1
  },
  weebs: {
    'WEEBS OUT [DansGame]': 1,
    '[AYAYA][Clap]': 5,
    '[AYAYA][Clap][AYAYA][Clap][AYAYA][Clap]': 3,
    '[AYAYA][Clap][AYAYA][Clap][AYAYA][Clap][AYAYA][Clap][AYAYA][Clap]': 3
  }
}

const messageDataSum = {}
