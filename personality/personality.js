import { html } from '../node_modules/lit-html/lit-html.js';
import { classMap } from '../node_modules/lit-html/directives/class-map.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';

import { getIndex, isKorean, isJapanese } from '../util.js';


export const personality1 = [
  {
    hj: '更',
    meanings: ['to change/more', 'changer/davantage', '고치다/다시', 'あらためる']
  },
  {
    hj: '便',
    meanings: ['convenient/easy', 'commode/facile', '편하다/쉬다', 'らく']
  },
  {
    hj: '史',
    meanings: ['history', 'histoire', '역사', 'れきし']
  },
  {
    hj: '使',
    meanings: ['to use/to employ/to cause/to send', 'utiliser/employer/causer/envoyer', '부리다/하여금/보내다', '使う/つかう']
  }
];

export const personality2 = [
  {
    hj: '起',
    meanings: ['qǐ', 'to get up/to raise (sth)/to start']
  },
  {
    hj: '趣',
    meanings: ['qù', 'interesting/amusing']
  },
  {
    hj: '超',
    meanings: ['chāo', 'to surpass/to cross', 'super-']
  },
  {
    hj: '越',
    meanings: ['yuè', 'to surpass/to exceed/to climb over']
  }
];

export const personality3 = [
  {
    hj: '市',
    pinyin: 'shì',
    meanings: ['city/market', 'ville/marché', '시가/저자/시장/장', 'し/いち/いちば/しせい']
  },
  {
    hj: '師',
    pinyin: 'shī',
    meanings: ['teacher/master/model', 'professeur/maitre/modèle', '스승', 'し/ししょう/しはん/きょうし']
  }
];


export const personality4 = [
  {
    hj: '書',
    pinyin: 'shū',
    meanings: ['book/document/letter/to write', 'livre/document/lettre/écrire', '글/글씨/글자/편지/서류/쓰다', 'しょ/しょるい/ぶんしょ/かく']
  },
  {
    hj: '妻',
    pinyin: 'qī',
    meanings: ['wife', 'femme/épouse', '아내', 'つま']
  },
  {
    hj: '事',
    pinyin: 'shì',
    meanings: ['affair/work/case/situation/thing', 'affaire/travail/accident/fait/chose (immatérielle)', '직업/사업/사고/일', 'しごと/じぎょう/じこ/こと']
  }
];

export const personality5 = [
  {
    hj: '老',
    pinyin: 'lǎo',
    meanings: ['[lǎo]/old']
  },
  {
    hj: '都',
    pinyin: 'dū/dōu',
    meanings: ['[dū]/capital city', '[dōu]/all/entirely']
  },
  {
    hj: '著',
    pinyin: 'zhù/zháo/zhuó/zhe',
    meanings: ['[zhù]/to write', '[zháo]/to come in contact with', '[zhuó]/to wear/to use/to apply', '[zhe]/-ing']
  },
  {
    hj: '者',
    pinyin: 'zhě',
    meanings: ['[zhě]/-er/-ist']
  }
]

export const createCard = (name = getLastPersonality()) => {

  const index = getIndex(name);
  const elements = eval(name);

  return html`
  <style>
    html {
      --inner-width: 500px;

      --hanja-font-size: 91px;
      --meaning-font-size: 18px;

      --separator-height: 11px;
    }
    .element {
      display: flex;
      align-items: flex-start;

      font-size: 24px;
      width: var(--inner-width);

      /* margin: 0 0 6px; */
    }
    .separator {
      width: 200px;
      height: 2px;
      background: #dbdbdb;
      border-radius: 50%;

      margin-top: calc(var(--separator-height) / 2 + 6px);
      margin-bottom: calc(var(--separator-height) / 2 - 6px);
    }
    .separator:last-of-type {
      display: none;
    }

    .character {
      font-size: var(--hanja-font-size);
      color: #424242;
      font-family: KaiTi;
      text-shadow: 0 1px 0px black;
    }
    .meanings {
      display: flex;
      font-size: 20px;
      flex-wrap: wrap;
      margin: 21px 0 0 27px;
    }
    .meanings > span {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;

      padding: 0 9px;
      margin: 0 3px 4px 0;
      height: 31px;

      font-size: var(--meaning-font-size);
      color: #fff;
      border-radius: 3px;
      box-sizing: border-box;
    }
    .meanings > span.korean {
      font-size: calc(var(--meaning-font-size) - 1px);
      line-height: 1px;
      padding-top: 2px;
    }
  </style>
  <div class="card">
    <header>
      <span>personality #${index}</span>
    </header>

    ${elements.map(e => html`
    <div class="element">
      <span class="character chinese">${e.hj}</span>
      <div class="meanings horiz">
        ${e.meanings.map((m, i) => m.split('/').map(m => html
          `<span style="${styleMap({background: colors[i]})}" class="${setClass(m)}">${m}</span>`
        ))}
      </div>
    </div>
    <div class="separator"></div>
    `)}
  </div>
  `
};

const setClass = (m) => classMap({
  korean: isKorean(m),
  chinese: isJapanese(m)
});

import * as _self from './personality.js';
const getLastPersonality = () => {
  const personalities = Object.keys(_self).filter(p => p.match(/^personality/));
  return personalities.reverse()[0];
}

const colors = ['#795548', '#4caf50', '#ffb300', '#1976d2', '#673ab7'].shuffle();