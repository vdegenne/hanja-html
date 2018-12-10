import { html } from '../node_modules/lit-html/lit-html.js';
import { classMap } from '../node_modules/lit-html/directives/class-map.js';

import { getIndex, isKorean } from '../util.js';

export const translation1 = {
  'en': 'often [오프텐]',
  'fr': 'souvent [수방]',
  'kr': '자주 [jaju]',
  'cn': '經常/经常 [jīng cháng]',
  'jp': 'よく [yoku / 요쿠]'
}

export const createTranslationCard = (translation) => {

  const index = getIndex(translation);
  translation = eval(translation);

  return html`
  <style>
    .card { border-color: #d4d4d4; }

    .translation {
      width: 530px;
      font-size: 45px;

      display: flex;
      align-items: center;

      margin: 20px 0;

      white-space: nowrap;
    }

    .flag {
      font-size: 50px;
      margin: 0 20px 0;
    }

    .trans.korean {
      font-family: NanumSquareRound;
    }
    
    .pronounciations {
      font-size: 24px;

      font-family: Roboto;
      color: #888888;
      
      margin-left: 18px;
    }
    .pronounciations:before {
      content: '[';
      margin-right: 3px;
    }
    .pronounciations:after {
      content: ']';
      margin-left: 3px;
    }

    .pronounciations > span:not(:first-of-type):before {
      content: '/';
      margin: 0 4px;
    }
  </style>
  <div class="card border">
    <header><span>translation#${index}</span></header>
    
    ${Object.keys(translation).map(lang => html`
      <div class="translation ${classMap({ korean: lang === 'kr', chinese: lang === 'cn' || lang === 'jp' })}">
        <span class="flag">${flags[lang]}</span>
        <span class="trans ${classMap({korean: lang==='kr'})}">${parts(translation[lang])['trans']}</span>
        ${parts(translation[lang])['pronounc'] ? html`
          <div class="pronounciations">
          ${parts(translation[lang])['pronounc'].map(p => html`<span class="${classMap({korean: isKorean(p)})}">${p}</span>`)}
          </div>
        ` : null}
      </div>
    `)}
  </div>`
};


const flags = {
  'fr': '🇫🇷',
  'en': '🇬🇧',
  'kr': '🇰🇷',
  'cn': '🇨🇳',
  'jp': '🇯🇵'
}

const parts = (raw) => {
  const parts = {
    trans: raw.match(/^([^\s\[]+)/)[1].trim()
  }

  if (raw.match(/\[([^\]]+)/)) {
    parts.pronounc = raw.match(/\[([^\]]+)/)[1].split('/').map(e => e.trim());
  }

  return parts;
}