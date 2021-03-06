import { html } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';
import { getIndex } from '../util.js';



export const getHanmun = async (character) => (await (await fetch(`http://www.hangulhanja.com/api/hanmuns/${character}?eager=hangeuls`)).json()).hanmun;
export const createBoardArray = async (stringboard) => {
  const board = [];

  const details = getStringBoardDetails(stringboard);

  for (const d of details) {
    const hanmun = await getHanmun(d.character);
    board.push({
      hj: hanmun.symbol,
      pinyins: hanmun.pinyin.split('|'),
      hg: [...new Set(hanmun.hangeuls.map(h => h.symbol))],
      type: d.type,
      meanings: hanmun.meanings.replace(/\||\/\//g, '/').split('/').map(m => m.trim())
    })
  }
  
  return JSON.stringify(board, null, '');
}
window.createBoardArray = createBoardArray;

export const getStringBoardDetails = (string) => {
  const details = [];
  let e, type;
  for (let i = 0; i < string.length; ++i) {
    details.push(e = { character: string[i] });
    /* types */
    type = /^[ajvn]+/.exec(string.slice(i + 1));
    if (!type) {
      console.warn(`${e.character} has no type defined`);
    }
    type = type ? type[0] : '';
    
    e.type = type;
    i += type.length;
  }
  return details;
}



// 初步者漢語實際學習表記冬天愛感冒
// export const board1 = [
//   { hj: '初', hg: '초', type: 'an' }
// ];

// 撤v回vn政n府n抗v議v示v威n破vnj損vj依va毀v雕vn刻van像van壁n
export const board2 = [
  {
    hj: "撤",
    pinyins: ["chè"],
    hg: ["철"],
    type: "v",
    meanings: ["to remove", "to take away", "to withdraw"]
  },
  {
    hj: "回",
    pinyins: ["huí"],
    hg: ["회"],
    type: "vn",
    meanings: [
      "to circle",
      "to revolve",
      "to go back",
      "to turn around",
      "to return",
      "to answer"
    ]
  },
  {
    hj: "政",
    pinyins: ["zhèng"],
    hg: ["정"],
    type: "n",
    meanings: ["political", "politics", "government"]
  },
  {
    hj: "府",
    pinyins: ["fǔ"],
    hg: ["부"],
    type: "n",
    meanings: [
      "seat of government",
      "official resident",
      "mansion",
      "presidential palace"
    ]
  },
  {
    hj: "抗",
    pinyins: ["kàng"],
    hg: ["강", "항"],
    type: "v",
    meanings: ["to resist", "to fight", "to defy", "anti-"]
  },
  {
    hj: "議",
    pinyins: ["yì"],
    hg: ["의"],
    type: "v",
    meanings: ["to comment on", "to discuss", "to suggest"]
  },
  {
    hj: "示",
    pinyins: ["shì"],
    hg: ["시", "기", "치"],
    type: "v",
    meanings: ["to show", "to reveal"]
  },
  {
    hj: "威",
    pinyins: ["wēi"],
    hg: ["위"],
    type: "n",
    meanings: ["dignity", "prestige", "power", "might"]
  },
  {
    hj: "破",
    pinyins: ["pò"],
    hg: ["파"],
    type: "vnj",
    meanings: [
      "broken",
      "damaged",
      "worn out",
      "to destroy",
      "to break",
      "to defeat"
    ]
  },
  {
    hj: "損",
    pinyins: ["sǔn"],
    hg: ["손"],
    type: "vj",
    meanings: ["to decrease", "to damage", "to harm"]
  },
  {
    hj: "依",
    pinyins: ["yī"],
    hg: ["의"],
    type: "va",
    meanings: ["to depend on", "according to"]
  },
  {
    hj: "毀",
    pinyins: ["huǐ"],
    hg: ["훼"],
    type: "v",
    meanings: ["to damage", "to ruin", "to destroy", "to defame"]
  },
  {
    hj: "雕",
    pinyins: ["diāo"],
    hg: ["조"],
    type: "vn",
    meanings: ["to carve", "to engrave"]
  },
  {
    hj: "刻",
    pinyins: ["kè"],
    hg: ["각"],
    type: "van",
    meanings: [
      "to carve",
      "to engrave",
      "oppressive",
      "severe",
      "moment",
      "classifier for short time intervals"
    ]
  },
  {
    hj: "像",
    pinyins: ["xiàng"],
    hg: ["상"],
    type: "van",
    meanings: [
      "image",
      "appearance",
      "portrait",
      "to ressemble",
      "to look like"
    ]
  },
  {
    hj: "壁",
    pinyins: ["bì"],
    hg: ["벽"],
    type: "n",
    meanings: ["wall", "rampart", "barrier"]
  }
];

// 喜vn歡j數an字n已a經vn去vj世n杯vnj買v覺v得v值nj圖nv書nv館n
export const board3 = [
  {
    hj: "喜",
    pinyins: ["xǐ"],
    hg: ["희"],
    type: "vn",
    meanings: [
      "to be fond of",
      "to like",
      "to enjoy",
      "to be happy",
      "happiness",
      "delight",
      "glad"
    ]
  },
  {
    hj: "歡",
    pinyins: ["huān"],
    hg: ["환"],
    type: "j",
    meanings: ["joyous", "happy", "pleased"]
  },
  {
    hj: "數",
    pinyins: ["shù"],
    hg: ["촉", "삭", "수", "숫"],
    type: "an",
    meanings: ["number", "figure", "several"]
  },
  {
    hj: "字",
    pinyins: ["zì"],
    hg: ["자"],
    type: "n",
    meanings: ["letter", "character", "symbol"]
  },
  {
    hj: "已",
    pinyins: ["yǐ"],
    hg: ["이"],
    type: "a",
    meanings: ["already"]
  },
  {
    hj: "經",
    pinyins: ["jīng"],
    hg: ["경"],
    type: "vn",
    meanings: [
      "to endure",
      "to pass through",
      "to undergo",
      "to bear",
      "channel",
      "nerve",
      "abbr. for economics"
    ]
  },
  {
    hj: "去",
    pinyins: ["qù"],
    hg: ["거"],
    type: "vj",
    meanings: [
      "to go",
      "(of a time, event, etc) just passed or elapsed",
      "to remove",
      "to get rid of"
    ]
  },
  {
    hj: "世",
    pinyins: ["shì"],
    hg: ["세"],
    type: "n",
    meanings: [
      "world",
      "generation",
      "descendant",
      "era",
      "epoch",
      "life",
      "lifetime"
    ]
  },
  {
    hj: "杯",
    pinyins: ["bēi"],
    hg: ["배"],
    type: "vnj",
    meanings: ["cup", "trophy cup"]
  },
  {
    hj: "買",
    pinyins: ["mǎi"],
    hg: ["매"],
    type: "v",
    meanings: ["to buy", "to purchase"]
  },
  {
    hj: "覺",
    pinyins: ["jué"],
    hg: ["교", "각"],
    type: "v",
    meanings: ["to be aware (of)", "to feel", "to find that"]
  },
  {
    hj: "得",
    pinyins: ["dé", "de"],
    hg: ["득"],
    type: "v",
    meanings: ["to obtain", "to get", "to gain", "to catch", "to make clear"]
  },
  {
    hj: "值",
    pinyins: ["zhí"],
    hg: ["치"],
    type: "nj",
    meanings: ["value", "(to be) worth"]
  },
  {
    hj: "圖",
    pinyins: ["tú"],
    hg: ["도"],
    type: "nv",
    meanings: [
      "diagram",
      "picture",
      "drawing",
      "to plan",
      "to scheme",
      "to attempt"
    ]
  },
  {
    hj: "書",
    pinyins: ["shū"],
    hg: ["서"],
    type: "nv",
    meanings: ["book", "letter", "document", "to write"]
  },
  {
    hj: "館",
    pinyins: ["guǎn"],
    hg: ["관"],
    type: "n",
    meanings: [
      "building",
      "term for certain service establishments",
      "embassy or consulate"
    ]
  }
];

// 市n民n暴j力n對vaj事n態n集v結v續v行v進v統vn制v主n要nv
export const board4 = [
  {
    hj: "市",
    pinyins: ["shì"],
    hg: ["시"],
    type: "n",
    meanings: ["city", "market"]
  },
  {
    hj: "民",
    pinyins: ["mín"],
    hg: ["민"],
    type: "n",
    meanings: ["the people", "citizens"]
  },
  {
    hj: "暴",
    pinyins: ["bào"],
    hg: ["포", "폭"],
    type: "j",
    meanings: ["violent", "cruel", "sudden"]
  },
  {
    hj: "力",
    pinyins: ["lì"],
    hg: ["역", "력"],
    type: "n",
    meanings: ["power", "force", "strength", "ability"]
  },
  {
    hj: "對",
    pinyins: ["duì"],
    hg: ["대"],
    type: "vaj",
    meanings: [
      "to face",
      "to confront",
      "to match",
      "towards",
      "at",
      "right",
      "correct"
    ]
  },
  {
    hj: "事",
    pinyins: ["shì"],
    hg: ["사"],
    type: "n",
    meanings: ["work", "affair", "matter", "situation", "thing", "item"]
  },
  {
    hj: "態",
    pinyins: ["tài"],
    hg: ["태"],
    type: "n",
    meanings: ["attitude", "state"]
  },
  {
    hj: "集",
    pinyins: ["jí"],
    hg: ["집"],
    type: "v",
    meanings: ["to gather", "to collect", "to assemble together"]
  },
  {
    hj: "結",
    pinyins: ["jié", "jiē"],
    hg: ["결", "계"],
    type: "v",
    meanings: ["to tie", "to bind", "firm", "solid"]
  },
  {
    hj: "續",
    pinyins: ["xù"],
    hg: ["속"],
    type: "v",
    meanings: ["to join", "to continue", "to replenish"]
  },
  {
    hj: "行",
    pinyins: ["xíng", "háng", "xìng"],
    hg: ["행", "항"],
    type: "v",
    meanings: [
      "to go",
      "to walk",
      "to perform",
      "to do",
      "row",
      "series",
      "behavior",
      "conduct"
    ]
  },
  {
    hj: "進",
    pinyins: ["jìn"],
    hg: ["신", "진"],
    type: "v",
    meanings: ["to advance", "to enter", "to come (or go) into"]
  },
  {
    hj: "統",
    pinyins: ["tǒng"],
    hg: ["통"],
    type: "vn",
    meanings: ["to gather", "to unify", "to unite", "whole"]
  },
  {
    hj: "制",
    pinyins: ["zhì"],
    hg: ["제"],
    type: "v",
    meanings: ["to control", "to regulate", "variant of 製"]
  },
  {
    hj: "主",
    pinyins: ["zhǔ"],
    hg: ["주"],
    type: "n",
    meanings: ["main", "master"]
  },
  {
    hj: "要",
    pinyins: ["yào", "yāo"],
    hg: ["요"],
    type: "nv",
    meanings: [
      "important",
      "vital",
      "necessary",
      "protecting",
      "contour",
      "may",
      "will",
      "going to",
      "(used in comparison) must be",
      "to want",
      "to demand",
      "to request"
    ]
  }
];

// 小ja說v昨n天n隨v便vaj妻n子n菜n
export const board5 = [
  {
    hj: "小",
    pinyins: ["xiǎo"],
    hg: ["소"],
    type: "ja",
    meanings: ["small", "tiny", "young"]
  },
  {
    hj: "說",
    pinyins: ["shuō", "shuì"],
    hg: ["세", "설", "탈", "열"],
    type: "v",
    meanings: ["to speak", "to explain", "to say", "to persuade"]
  },
  {
    hj: "昨",
    pinyins: ["zuó"],
    hg: ["작"],
    type: "n",
    meanings: ["yesterday"]
  },
  {
    hj: "天",
    pinyins: ["tiān"],
    hg: ["천"],
    type: "n",
    meanings: ["day", "sky", "heaven"]
  },
  {
    hj: "隨",
    pinyins: ["suí"],
    hg: ["수", "타"],
    type: "v",
    meanings: ["to follow", "to allow"]
  },
  {
    hj: "便",
    pinyins: ["biàn"],
    hg: ["변", "편"],
    type: "vaj",
    meanings: ["to relieve oneself", "convenient", "easy", "simple"]
  },
  {
    hj: "妻",
    pinyins: ["qī"],
    hg: ["처"],
    type: "n",
    meanings: ["wife"]
  },
  {
    hj: "子",
    pinyins: ["zǐ", "zi"],
    hg: ["자"],
    type: "n",
    meanings: ["son", "child", "small thing", "noun suffix"]
  },
  {
    hj: "菜",
    pinyins: ["cài"],
    hg: ["채"],
    type: "n",
    meanings: ["vegetable", "cuisine"]
  }
];

// 能an香jn媽n狗n肉n常aj坐n起v床n
export const board6 = [
  {
    hj: "能",
    pinyins: ["néng"],
    hg: ["내", "능"],
    type: "an",
    meanings: ["can", "to be able to", "ability", "(physics) energy"]
  },
  {
    hj: "香",
    pinyins: ["xiāng"],
    hg: ["향"],
    type: "jn",
    meanings: [
      "fragrance",
      "scent",
      "sweet smelling",
      "aromatic",
      "savory",
      "appetizing"
    ]
  },
  {
    hj: "媽",
    pinyins: ["mā"],
    hg: ["마", "모"],
    type: "n",
    meanings: ["ma", "mom", "mother"]
  },
  {
    hj: "狗",
    pinyins: ["gǒu"],
    hg: ["구"],
    type: "n",
    meanings: ["dog"]
  },
  {
    hj: "肉",
    pinyins: ["ròu"],
    hg: ["유", "육"],
    type: "n",
    meanings: ["flesh", "meat", "pulp (of a fruit)"]
  },
  {
    hj: "常",
    pinyins: ["cháng"],
    hg: ["상"],
    type: "aj",
    meanings: ["always", "ever", "often", "frequently", "common", "general"]
  },
  {
    hj: "坐",
    pinyins: ["zuò"],
    hg: ["좌"],
    type: "n",
    meanings: ["seat"]
  },
  {
    hj: "起",
    pinyins: ["qǐ"],
    hg: ["기"],
    type: "v",
    meanings: [
      "to rise",
      "to raise",
      "to get up",
      "classifier for groups (batch, group, etc...)"
    ]
  },
  {
    hj: "床",
    pinyins: ["chuáng"],
    hg: ["상"],
    type: "n",
    meanings: ["bed", "classifier for beds", "couch"]
  }
];

// 出v租vn車n打v電n話n蘋n果n都na
export const board7 = [
  {
    hj: "出",
    pinyins: ["chū"],
    hg: ["출", "척"],
    type: "v",
    meanings: ["to come out", "to go out", "to rise", "to go beyond"]
  },
  {
    hj: "租",
    pinyins: ["zū"],
    hg: ["조", "저"],
    type: "vn",
    meanings: ["to hire", "to rent (out)", "to lease (out)", "rent"]
  },
  {
    hj: "車",
    pinyins: ["chē"],
    hg: ["거", "차"],
    type: "n",
    meanings: ["machine", "vehicle", "car"]
  },
  {
    hj: "打",
    pinyins: ["dǎ"],
    hg: ["타"],
    type: "v",
    meanings: ["to beat", "to hit", "to strike", "to break", "to fetch"]
  },
  {
    hj: "電",
    pinyins: ["diàn"],
    hg: ["전"],
    type: "n",
    meanings: ["electric", "electricity", "electrical"]
  },
  {
    hj: "話",
    pinyins: ["huà"],
    hg: ["화"],
    type: "n",
    meanings: ["spoken words", "speech", "talk", "words"]
  },
  {
    hj: "蘋",
    pinyins: ["píng"],
    hg: ["평", "빈"],
    type: "n",
    meanings: ["apple"]
  },
  {
    hj: "果",
    pinyins: ["guǒ"],
    hg: ["관", "과"],
    type: "n",
    meanings: ["fruit", "result", "indeed"]
  },
  {
    hj: "都",
    pinyins: ["dū", "dōu"],
    hg: ["지", "도"],
    type: "na",
    meanings: ["capital city", "metropolis", "all", "entirely"]
  }
];

// 借v謝v拿v手n茶n吃v更va歲n點n
export const board8 = [
  {
    hj: "借",
    pinyins: ["jiè"],
    hg: ["차"],
    type: "v",
    meanings: ["to lend", "to borrow"]
  },
  {
    hj: "謝",
    pinyins: ["xiè"],
    hg: ["사"],
    type: "v",
    meanings: [
      "to thank",
      "to apologize",
      "to wither (of flowers, leaves, etc...)",
      "to decline"
    ]
  },
  {
    hj: "拿",
    pinyins: ["ná"],
    hg: ["나"],
    type: "v",
    meanings: ["to hold", "to seize", "to catch"]
  },
  {
    hj: "手",
    pinyins: ["shǒu"],
    hg: ["수"],
    type: "n",
    meanings: [
      "hand",
      "person engaged in certain types of work",
      "person skilled in certain types of work",
      "classifier for skill"
    ]
  },
  {
    hj: "茶",
    pinyins: ["chá"],
    hg: ["차", "다"],
    type: "n",
    meanings: ["tea", "tea plant"]
  },
  {
    hj: "吃",
    pinyins: ["chī"],
    hg: ["흘"],
    type: "v",
    meanings: ["to eat", "to consume"]
  },
  {
    hj: "更",
    pinyins: ["gēng", "gèng"],
    hg: ["갱", "경"],
    type: "va",
    meanings: ["to change", "to replace", "more", "even more", "further"]
  },
  {
    hj: "歲",
    pinyins: ["suì"],
    hg: ["세"],
    type: "n",
    meanings: ["year", "classifier for years (of age)"]
  },
  {
    hj: "點",
    pinyins: ["diǎn"],
    hg: ["점", "다"],
    type: "n",
    meanings: ["point", "dot", "drop", "cure"]
  }
];

// 比van長vjn城n玩vn
export const board9 = [
  {
    hj: "比",
    pinyins: [ "bǐ" ],
    hg: [ "비" ],
    type: "van",
    meanings: [
      "to compare",
      "to contrast",
      "particle used for comparison and \"-er than\"",
      "ratio"
    ]
  },
  {
    hj: "長",
    pinyins: [ "zhǎng", "cháng" ],
    hg: [ "장" ],
    type: "vjn",
    meanings: [
      "chief",
      "head",
      "to grow",
      "to develop",
      "to increase",
      "to enhance",
      "length",
      "long"
    ]
  },
  {
    hj: "城",
    pinyins: [ "chéng" ],
    hg: [ "성" ],
    type: "n",
    meanings: [ "city walls", "ramparts", "city", "town" ]
  },
  {
    hj: "玩",
    pinyins: [ "wán" ],
    hg: [ "완" ],
    type: "vn",
    meanings: [
      "to keep sth for entertainment",
      "sth used for amusement",
      "to play",
      "to have fun"
    ]
  }
];

// 腦n
export const board10 = [
  {
    hj: "腦",
    pinyins: [ "nǎo" ],
    hg: [ "뇌" ],
    type: "n",
    meanings: [ "brain", "mind", "head", "essence" ]
  }
];

// 趣vj味n愛vn好vaj
export const board11 = [
  {
    hj: "趣",
    pinyins: [ "qù" ],
    hg: [ "취", "추", "촉" ],
    type: "vj",
    meanings: [ "interesting", "to interest" ]
  },
  {
    hj: "味",
    pinyins: [ "wèi" ],
    hg: [ "미", "매" ],
    type: "n",
    meanings: [ "taste", "smell", "classifier for drugs (in tcm)" ]
  },
  {
    hj: "愛",
    pinyins: [ "ài" ],
    hg: [ "애" ],
    type: "vn",
    meanings: [ "to love", "to be fond of", "to like", "affection" ]
  },
  {
    hj: "好",
    pinyins: [ "hǎo", "hào" ],
    hg: [ "호" ],
    type: "vaj",
    meanings: [
      "good",
      "well",
      "proper",
      "very",
      "to be fond of",
      "to have a tendency to"
    ]
  }
];

// 老j師n看v電nj影n視v對vaj不a起v
export const board12 = [
  {
    hj: "老",
    pinyins: ["lǎo"],
    hg: ["노", "로"],
    type: "j",
    meanings: ["old"]
  },
  {
    hj: "師",
    pinyins: ["shī"],
    hg: ["사"],
    type: "n",
    meanings: ["teacher", "master", "expert"]
  },
  {
    hj: "看",
    pinyins: ["kàn"],
    hg: ["간"],
    type: "v",
    meanings: ["to see", "to look at", "to watch", "to read"]
  },
  {
    hj: "電",
    pinyins: ["diàn"],
    hg: ["전"],
    type: "nj",
    meanings: ["electric", "electricity", "electrical"]
  },
  {
    hj: "影",
    pinyins: ["yǐng"],
    hg: ["영"],
    type: "n",
    meanings: [
      "shadow",
      "reflection",
      "movie",
      "film",
      "photograph",
      "image",
      "picture"
    ]
  },
  {
    hj: "視",
    pinyins: ["shì"],
    hg: ["시"],
    type: "v",
    meanings: ["to look at", "to regard", "to inspect"]
  },
  {
    hj: "對",
    pinyins: ["duì"],
    hg: ["대"],
    type: "vaj",
    meanings: [
      "to face",
      "to confront",
      "to match",
      "towards",
      "at",
      "right",
      "correct"
    ]
  },
  {
    hj: "不",
    pinyins: ["bù"],
    hg: ["부", "불"],
    type: "a",
    meanings: ["(negative prefix)", "not", "no"]
  },
  {
    hj: "起",
    pinyins: ["qǐ"],
    hg: ["기"],
    type: "v",
    meanings: [
      "to rise",
      "to raise",
      "to get up",
      "classifier for groups (batch, group, etc...)"
    ]
  }
];


// 這n個n東n西n
export const board13 = [
  {
    hj: "這",
    pinyins: ["zhè"],
    hg: ["저"],
    type: "n",
    meanings: ["this", "these"]
  },
  {
    hj: "個",
    pinyins: ["gè"],
    hg: ["개"],
    type: "n",
    meanings: [
      "individual",
      "this",
      "that",
      "!classifier for people or objects in general"
    ]
  },
  {
    hj: "東",
    pinyins: ["dōng"],
    hg: ["동"],
    type: "n",
    meanings: ["east"]
  },
  {
    hj: "西",
    pinyins: ["xī"],
    hg: ["서"],
    type: "n",
    meanings: ["the West"]
  }
];

// 貴j
export const board14 = [
  {
    hj: "貴",
    pinyins: ["guì"],
    hg: ["귀"],
    type: "j",
    meanings: ["expensive", "precious", "noble"]
  }
];

// 種n用v於a建v立va網n頁n標n準n
export const board15 = [
  {
    hj: "種",
    pinyins: ["zhǒng", "zhòng"],
    hg: ["종"],
    type: "n",
    meanings: [
      "seed",
      "kind",
      "type",
      "species",
      "to plant",
      "to grow",
      "to cultivate"
    ]
  },
  {
    hj: "用",
    pinyins: ["yòng"],
    hg: ["용"],
    type: "v",
    meanings: ["to use", "to employ"]
  },
  {
    hj: "於",
    pinyins: ["yú"],
    hg: ["오", "어"],
    type: "a",
    meanings: ["at", "in", "from"]
  },
  {
    hj: "建",
    pinyins: ["jiàn"],
    hg: ["건"],
    type: "v",
    meanings: [
      "to establish",
      "to build",
      "to set up",
      "to construct",
      "to found"
    ]
  },
  {
    hj: "立",
    pinyins: ["lì"],
    hg: ["입", "립"],
    type: "va",
    meanings: [
      "to stand",
      "to set up",
      "to establish",
      "to lay down",
      "at once",
      "immediately"
    ]
  },
  {
    hj: "網",
    pinyins: ["wǎng"],
    hg: ["망"],
    type: "n",
    meanings: ["net", "network"]
  },
  {
    hj: "頁",
    pinyins: ["yè"],
    hg: ["혈", "엽"],
    type: "n",
    meanings: ["page", "leaf"]
  },
  {
    hj: "標",
    pinyins: ["biāo"],
    hg: ["표"],
    type: "n",
    meanings: [
      "the topmost branches of a tree",
      "indication",
      "sign",
      "mark"
    ]
  },
  {
    hj: "準",
    pinyins: ["zhǔn"],
    hg: ["준", "절"],
    type: "n",
    meanings: ["standard"]
  }
];

// 軟j件n概j念nv
export const board16 = [
  {
    hj: "軟",
    pinyins: ["ruǎn"],
    hg: ["연"],
    type: "j",
    meanings: ["soft", "flexible"]
  },
  {
    hj: "件",
    pinyins: ["jiàn"],
    hg: ["건"],
    type: "n",
    meanings: [
      "item",
      "component",
      "case",
      "matter",
      "classifier for events"
    ]
  },
  {
    hj: "概",
    pinyins: ["gài"],
    hg: ["개"],
    type: "j",
    meanings: ["general", "approximate"]
  },
  {
    hj: "念",
    pinyins: ["niàn"],
    hg: ["념", "염"],
    type: "nv",
    meanings: ["a thinking", "remembrance", "idea", "to miss (sb)"]
  }
];

// 應v用v早n期n

let colorsForFunBoard;
window.getColorsForFunBoard = () => colorsForFunBoard;
export const createFunBoard = async (imgUrl) => {

  let board = board2.concat(board3).concat(board4).concat(board5).concat(board6).concat(board7).concat(board8).concat(board9).concat(board10).concat(board11).concat(board12);
  board.shift(); board.shift();
  board = board.concat(board).concat(board);
  board.splice(0, 11);
  for (const s of 't') {
    board = board.concat(board).concat(board).concat(board);
  }

  board = [];
  for (let i = 0; i < 1156; ++i) {
    board.push({ hj: '甲', meanings: [], hg: [], pinyins: [], type: '' });
  }

  colorsForFunBoard = await getImageProminentColors(imgUrl, Math.sqrt(board.length), Math.sqrt(board.length), 0);

  return createBoard(board);
}

export const createBoard = (board) => {
  let index;

  if (board === undefined) {
    board = getLastBoardName();
  }

  if (typeof board === 'string') {
    index = getIndex(board);
    board = eval(board);
  }

  const content = ['hanjas', 'meanings', 'hanguls'];
  let contentIndex = 0;
  const switchContent = (el) => {
    contentIndex = ++contentIndex === content.length ? 0 : contentIndex;
    content.forEach(c => el.removeAttribute(c));
    el.setAttribute(content[contentIndex], '');
  }

  return html`
  <style>
    html {
      --hanja-size: 180px;
      --pinyin-size: 28px;

      --meaning-size: 25px;
      --long-meaning-size: calc(var(--meaning-size) - 6px);

      --hangul-size: 100px;

      --dot-size: 14px;

      --case-top-offset: 0px;
      --case-left-offset: 0px;
    }

    .card {
      flex-wrap: wrap;
      flex-direction: row;
      
      padding: 30px 30px 30px;
      box-sizing: border-box;

      /* background: black; */
      color: #424242;
    }
    .card > header {
      box-shadow: none;
      padding-right: 4px;
    }
    .card.dark {
      color: #e8e8e8;
    }

    .case {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(100% / ${Math.sqrt(board.length)});
      height: calc(100% / ${Math.sqrt(board.length)});
      padding: 0px;
      box-sizing: border-box;
    }

    .legend {
      opacity: .8;

      display: flex;
      align-items: center;

      /* color: #565656; */
      margin-top: 1px;
    }
    .legend > span:nth-child(2n) {
      font-family: NanumSquare;
      /* font-weight: bold; */
      margin: 0 6px 0 0px;
    }
    .legend .dot {
      width: 9px;
      height: 9px;
      margin: 0 4px 0 4px;
    }

    .hanja {
      font-family: /* 'EmojiSymbols', */'UD Digi Kyokasho NK-R';
      font-size: var(--hanja-size);
      height: var(--hanja-size);
      line-height: var(--hanja-size);
    }
    .hanja-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: var(--hanja-size);
      position: relative;
      top: calc(var(--case-top-offset) + 8px) !important;
    }
    .colors {
      display: flex;
    }
    .pinyins {
      font-size: var(--pinyin-size);
      color: #8e8e8e;
    }
    .hanja, .hanja-info, .meanings, .hangul {
      position: relative;
      top: var(--case-top-offset);
      left: var(--case-left-offset);
    }

    .sep-dot {
      content: '•';
      font-family: Arial;
      font-weight: 100;
      font-size: .6em;
      margin: 0 0px !important;
    }
    .sep-dot:first-of-type {
      display: none;
    }

    /* DOTS */
    .dot {
      display: block;
      font-family: "Roboto";
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: 50%;
      margin: 0 2px;
    }
    .a { background: orange }
    .v { background: #f7dd00 }
    .j { background: green }
    .n { background: #454545 }
    .card.dark .a { background: #ff9800 }
    .card.dark .v { background: #ffeb3b }
    .card.dark .j { background: #43a047 }
    .card.dark .n { background: black }

    /* HANGULS */
    .hangul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      font-family: NanumMyeongjo, NanumSquare;
      font-weight: bold;
      font-size: var(--hangul-size);
    }
    .hangul > span:not(.sep-dot) {
      margin: 6px;
    }

    .hangul2 {
      font-size: 62px;
    }

    .hangul3 {
      font-size: 48px;
    }

    .hangul4 {
      font-size: 36px;
      width: 115px;
    }
    .hangul4 > span:nth-of-type(5) {
      display: none;
    }

    .meanings {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: var(--meaning-size);
      white-space: nowrap;
      font-weight: 900;
    }
    .meanings[long] {
      font-size: var(--long-meaning-size);
      white-space: normal;
    }



    .hanja, .hanja-info, .legend, .hangul, .meanings {
      display: none;
    }
    .card[hanjas] .hanja,
    .card[hanjas] .legend,
    .card[hanjas] .hanja-info {
      display: inherit;
    }

    .card[meanings] .meanings {
      display: inherit;
    }

    .card[hanguls] .hangul {
      display: inherit;
    }
  </style>
  
  <div class="card" @click="${function () { switchContent(this) }}" hanjas>
    <header>
      <span style="${styleMap({visibility: index ? 'visible' : 'hidden'})}">board #${index}</span>
      <div class="legend">
        <span class="dot v"></span><span>동</span>
        <span class="dot a"></span><span>부</span>
        <span class="dot j"></span><span>형용</span>
        <span class="dot n"></span><span>명</span>
      </div>
    </header>

    ${board.map((b, i) => html`
    <div class="case">
      <div class="hangul hangul${b.hg.length}">
        ${b.hg.map(hg => html`<span class="sep-dot">•</span><span>${hg}</span>`)}
      </div>

      <div class="meanings" ?long="${longMeaning(b.meanings)}">
        ${b.meanings.map(m => m[0] !== '!' ? html`<span>${formatMeaning(m)}</span>` : null)}
      </div>

      <span class="hanja" style="${colorsForFunBoard ? hanjaFunBoardColor(i) : ''}">${b.hj}</span>
      <div class="hanja-info">
        <div class="colors">
          ${b.type.split('').map(t => html`<span class="dot ${t}"></span>`)}
        </div>
        <span class="pinyins">${b.pinyins.join('/')}</span>
      </div>
    </div>`)}
  </div>
  `;
}

const longMeaning = (meanings) => (meanings.length > 6) || meanings.findIndex(m => formatMeaning(m).length > 28) > -1;
const formatMeaning = (meaning) => meaning.replace(/\(.*\)/g, '').trim();


/**
 * Board related functions
 */
import * as _self from './boards.js';

const getLastBoardName = () => {
  const boards = Object.keys(_self).filter(p => p.match(/^board/));
  let top = getIndex(boards[0]);
  for (const b of boards) {
    if (getIndex(b) > top) {
      top = getIndex(b);
    }
  }
  return `board${top}`;
}

export const getRandom = () => {
  const boards = Object.keys(_self).filter(p => p.match(/^board/));
  const board = eval(boards[Math.floor(Math.random() * boards.length)]);
  return board[Math.floor(Math.random() * board.length)];
}

window.isInBoard = (character) => {
  const inboards = [];

  const boards = Object.keys(_self).filter(p => p.match(/^board/));
  for (const board of boards) {
    let o = eval(board);
    if (o.findIndex(p => p.hj === character) > -1) {
      inboards.push(board);
    }
  }

  return inboards;
}

export const getHanjas = () => {
  const characters = new Set;
  const hanjas = Object.keys(_self).filter(p => p.match(/^board/)).map(n => eval(n)).reduce((a, b) => a.concat(b));
  const uniques = [];

  for (const h of hanjas) {
    if (!characters.has(h.hj)) {
      characters.add(h.hj);
      uniques.push(h);
    }
  }

  return uniques;
}

export const getHanjasCount = () => {
  const boards = Object.keys(_self).filter(p => p.match(/^board/));
  let total = 0;
  for (const board of boards) {
    let o = eval(board);
    total += o.length;
  }
  return total;
}

const hanjaFunBoardColor = (i) => styleMap({
  color: colorsForFunBoard[i] ? colorsForFunBoard[i].toString() : ''
});


const createEmptyContext = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext('2d');
}
const getImageContext = async (url) => {
  const img = new Image();
  img.src = url;
  await new Promise(resolve => img.addEventListener('load', resolve));
  const context = createEmptyContext(img.width, img.height);
  context.drawImage(img, 0, 0);
  return context;
}

CanvasRenderingContext2D.prototype.extract = function (sx, sy, sw, sh) {
  const context = createEmptyContext(sw, sh);
  context.putImageData(this.getImageData(sx, sy, sw, sh), 0, 0);
  return context;
}
CanvasRenderingContext2D.prototype.stampInDocument = function () {
  document.body.append(this.canvas);
}

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  isSimilar (color, range) {
    const leftRange = Math.floor((range - 1) / 2);
    const rightRange = Math.ceil((range - 1) / 2);
    return (color.r >= this.r - leftRange && color.r <= this.r + rightRange)
      && (color.g >= this.g - leftRange && color.g <= this.g + rightRange)
      && (color.b >= this.b - leftRange && color.b <= this.b + rightRange);
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;
  }

  isBlack() {
    return !(this.r && this.g && this.b);
  }
}


const getImageProminentColors = async (url, widthDivision, heightDivision, similarRange = 5) => {
  if (!heightDivision) {
    heightDivision = widthDivision;
  }

  const context = await getImageContext(url);
  const width = context.canvas.width;
  const height = context.canvas.height;
  const subw = Math.floor(width / widthDivision); // changed floor to ceil !
  const subh = Math.floor(height / heightDivision); // changed floor to ceil !
  const colors = [];


  let pixels, clusters;
  for (let y = 0; y < subh * heightDivision; y += subh) {
    for (let x = 0; x < subw * widthDivision; x += subw) {
      pixels = context.getImageData(x, y, subw, subh).data;
      clusters = [];

      let color, registered;
      for (let offset = 0, datasize = subw * subh * 4; offset <= datasize; offset += 4) {
        color = new Color(pixels[offset], pixels[offset + 1], pixels[offset + 2]);
        if (color.isBlack()) {
          continue;
        }
        registered = false;
        for (const c of clusters) {
          if (color.isSimilar(c.color, similarRange)) {
            c.count++;
            registered = true;
          }
        }

        if (!registered) {
          clusters.push({ color, count: 1 });
        }
      }

      if (clusters.length === 0) {
        colors.push(new Color(0, 0, 0));
      }
      else {
        colors.push(clusters.sort((a, b) => b.count - a.count)[0].color);
      }
    }
  }

  return colors;
}