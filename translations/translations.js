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

export const translation2 = {
  'en': 'apple',
  'fr': 'pomme [폼므]',
  'kr': '사과 [sagwa]',
  'cn': '蘋果/苹果 [píng guǒ]',
  'jp': 'りんご/アップル [ringo / 링고]'
}


export const createTranslationCard = (translation) => {

  const index = getIndex(translation);
  translation = eval(translation);

  return html`
  <style>
    html {
      --translation-font-size: 35px;
      --translation-margin: 10px 0;
    }
    .card { border-color: #d4d4d4 }

    .translation {
      width: 530px;
      font-size: var(--translation-font-size);

      display: flex;
      align-items: center;

      margin: var(--translation-margin);

      white-space: nowrap;
    }

    .flag {
      font-size: 50px;
      margin: 0 20px 0;
    }

    .translation:not(.korean):not(.chinese) .trans {
      font-family: cursive;
      height: 58px;
    }
    .trans.korean {
      font-family: NanumSquareRound;
    }
    
    .pronounciations {
      font-size: 24px;

      font-family: Roboto;
      color: #ffca7c;
      
      margin-left: 18px;
    }
    .pronounciations:before {
      content: '[';
      margin-right: 1px;
    }
    .pronounciations:after {
      content: ']';
      margin-left: 1px;
    }

    .pronounciations > span:not(:first-of-type):before {
      content: '/';
      margin: 0 4px;
    }
  </style>
  <div class="card border">
    <header><span>translations #${index}</span></header>
    
    ${Object.keys(translation).map(lang => html`
      <div class="translation ${classMap({ korean: lang === 'kr', chinese: lang === 'cn' || lang === 'jp' })}">
        <span class="flag">${flags[lang]}</span>
        <span class="trans ${classMap({korean: lang==='kr'})}">${parts(translation[lang])['trans'].replace('/', ' ⸱ ')}</span>
        ${parts(translation[lang])['pronounc'] ? html`
          <div class="pronounciations">
          ${parts(translation[lang])['pronounc'].map(p => html`<span class="${classMap({korean: isKorean(p)})}">${p}</span>`)}
          </div>
        ` : null}
      </div>
    `)}

    <style>
      img {
        position: absolute;
        top: 90px;
        right: 90px;
        width: 120px;
      }
    </style>
    <img src="http://www.clker.com/cliparts/8/b/4/8/1245695188697189992johnny_automatic_apple_1.svg.med.png">
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