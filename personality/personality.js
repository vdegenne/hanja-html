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
  }
]

const _name = 'personality1';

export const createCard = (name = _name) => {

  const index = getIndex(name);
  const elements = eval(name);

  return html`
  <style>
    html {
      --inner-width: 500px;

      --hanja-font-size: 106px;
      --meaning-font-size: 22px;
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
      margin: 31px 0 18px 0;
    }
    .separator:last-of-type {
      display: none;
    }

    .character {
      font-size: var(--hanja-font-size);
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

      padding: 0 10px;
      margin: 0 3px 4px 0;
      height: 36px;

      font-size: var(--meaning-font-size);
      color: #fff;
      border-radius: 3px;
      box-sizing: border-box;
    }
    .meanings > span.korean {
      font-size: calc(var(--meaning-font-size) - 4px);
      line-height: 1px;
      padding-top: 3px;
    }
  </style>
  <div class="card border">
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
})

const colors = ['#ff0058', '#2ccf33', '#ffc107', 'blue'];