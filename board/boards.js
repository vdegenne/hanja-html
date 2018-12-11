import { html } from '../node_modules/lit-html/lit-html.js';
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

//(async () => console.log(await createBoardArray('出v租vn車n打v電n話n蘋n果n都na')))();



// 初步者漢語實際學習表記冬天愛感冒
export const board1 = [
  { hj: '初', hg: '초', type: 'an' }
];

// 撤回政府抗議示威破損依毀雕刻像壁
export const board2 = [
  { hj: '撤', hg: '철', type: 'v' },
  { hj: '回', hg: '회', type: 'vn' },
  { hj: '政', hg: '정', type: 'n' },
  { hj: '府', hg: '부', type: 'n' },
  { hj: '抗', hg: '항', type: 'v' },
  { hj: '議', hg: '의', type: 'v' },
  { hj: '示', hg: '시', type: 'v' },
  { hj: '威', hg: '위', type: 'n' },
  { hj: '破', hg: '파', type: 'vnj' },
  { hj: '損', hg: '손', type: 'vj' },
  { hj: '依', hg: '의', type: 'va' },
  { hj: '毀', hg: '훼', type: 'v' },
  { hj: '雕', hg: '조', type: 'vn' },
  { hj: '刻', hg: '각', type: 'van' },
  { hj: '像', hg: '상', type: 'van' },
  { hj: '壁', hg: '벽', type: 'n' },
];

// 喜歡數字已經去世杯買覺得值圖書館
export const board3 = [
  { hj: '喜', hg: '희', type: 'vn' },
  { hj: '歡', hg: '환', type: 'j' },
  { hj: '數', hg: '수', type: 'an' }, // 수숫삭촉
  { hj: '字', hg: '자', type: 'n' },
  { hj: '已', hg: '이', type: 'a' },
  { hj: '經', hg: '경', type: 'vn' },
  { hj: '去', hg: '거', type: 'vj' },
  { hj: '世', hg: '세', type: 'n' },
  { hj: '杯', hg: '배', type: 'vnj' },
  { hj: '買', hg: '매', type: 'v' },
  { hj: '覺', hg: '각', type: 'v' }, // 각교
  { hj: '得', hg: '득', type: 'v' },
  { hj: '值', hg: '치', type: 'nj' },
  { hj: '圖', hg: '도', type: 'nv' },
  { hj: '書', hg: '서', type: 'nv' },
  { hj: '館', hg: '관', type: 'n' },
];

// 市民暴力對事態集結續行進統制主要
export const board4 = [
  { hj: '市', hg: '시', type: 'n' },
  { hj: '民', hg: '민', type: 'n' },
  { hj: '暴', hg: '폭포', type: 'j' },
  { hj: '力', hg: '력', type: 'n' },
  { hj: '對', hg: '대', type: 'vaj' },
  { hj: '事', hg: '사', type: 'n' },
  { hj: '態', hg: '태', type: 'n' },
  { hj: '集', hg: '집', type: 'v' },
  { hj: '結', hg: '결계', type: 'v' },
  { hj: '續', hg: '속', type: 'v' },
  { hj: '行', hg: '행항', type: 'v' },
  { hj: '進', hg: '진신', type: 'v' },
  { hj: '統', hg: '통', type: 'vn' },
  { hj: '制', hg: '제', type: 'v' },
  { hj: '主', hg: '주', type: 'n' },
  { hj: '要', hg: '요', type: 'nv' },
];

// 小說昨天隨便妻子菜
export const board5 = [
  { hj: '小', hg: '소', type: 'ja' },
  { hj: '說', hg: '설세열탈', type: 'v' },
  { hj: '昨', hg: '작', type: 'n' },
  { hj: '天', hg: '천', type: 'n' },
  { hj: '隨', hg: '수타', type: 'v' },
  { hj: '便', hg: '편변', type: 'vaj' },
  { hj: '妻', hg: '처', type: 'n' },
  { hj: '子', hg: '자', type: 'n' },
  { hj: '菜', hg: '채', type: 'n' }
]

// 能香媽狗肉常坐起床
export const board6 = [
  { hj: '能', hg: '능', type: 'an' },
  { hj: '香', hg: '향', type: 'jn' },
  { hj: '媽', hg: '마모', type: 'n' },
  { hj: '狗', hg: '구', type: 'n' },
  { hj: '肉', hg: '육유', type: 'n' },
  { hj: '常', hg: '상', type: 'aj' },
  { hj: '坐', hg: '좌', type: 'n' },
  { hj: '起', hg: '기', type: 'v' },
  { hj: '床', hg: '상', type: 'n' }
]

// 出v租vn車n打v電n話n蘋n果n都na
const board7 = [
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





export const createBoard = (board) => {

  const index = getIndex(board);
  board = eval(board);

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
      --hanja-size: 110px;
      --dot-size: 19px;
      --case-top-offset: 6px;
    }

    .card {
      flex-wrap: wrap;
      flex-direction: row;
      
      padding: 25px;
      box-sizing: border-box;
    }
    .card > header {
      background: #f5f5f5;
      box-shadow: none;
      padding-right: 4px;
    }

    .case {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(100% / ${Math.sqrt(board.length)});
      height: calc(100% / ${Math.sqrt(board.length)});
      padding: 10px;
      box-sizing: border-box;

      /* border: 1px solid grey; */

      position: relative;
      top: var(--case-top-offset);
      left: -5px;

      color: black;
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
      font-weight: bold;
      margin: 0 6px 0 0px;
    }
    .legend .dot {
      font-size: 43px;
    }

    .hanja {
      font-family: 'UD Digi Kyokasho NK-R';

      /* margin: 0 0 10px 0; */

      font-size: var(--hanja-size);
      height: var(--hanja-size);
      line-height: var(--hanja-size);
    }
    .hanja-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: var(--hanja-size);
      /* margin-top: 10px; */
      position: relative;
      top: 10px;
    }
    .colors {
      display: flex;
    }
    .pinyins {
      color: #afafaf;
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
      font-size: 58px;
      line-height: 21px;
    }
    .a { color: orange }
    .v { color: #f7dd00 }
    .j { color: green }
    .n { color: black }


    /* HANGULS */
    .hangul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      font-family: NanumSquare;
      font-weight: bold;
      font-size: 3.4em;

      position: relative;
      top: calc(-1 * var(--case-top-offset));
    }
    .hangul > span:not(.sep-dot) {
      margin: 6px;
    }

    .hangul2 {
      font-size: 2.6em;
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
      font-size: 23px;
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
  
  <div class="card border" @click="${function (e) { switchContent(this) }}" hanjas>
    <header>
      <span>board #${index}</span>
      <div class="legend">
        <span class="dot v">•</span><span>동</span>
        <span class="dot a">•</span><span>부</span>
        <span class="dot j">•</span><span>형용</span>
        <span class="dot n">•</span><span>명</span>
      </div>
    </header>

    ${board.map(b => html`
    <div class="case">
      <div class="hangul hangul${b.hg.length}">
        ${b.hg.map(hg => html`<span class="sep-dot">•</span><span>${hg}</span>`)}
      </div>

      <div class="meanings">
        ${b.meanings.map(m => html`<span>${m}</span>`)}
      </div>

      <span class="hanja">${b.hj}</span>
      <div class="hanja-info">
        <div class="colors">
          ${b.type.split('').map(t => html`<span class="dot ${t}">•</span>`)}
        </div>
        <span class="pinyins">${b.pinyins.join('/')}</span>
      </div>
    </div>`)}
  </div>
  `;
}