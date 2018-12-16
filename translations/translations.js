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

// to eat
export const translation3 = {
  'en': 'to eat',
  'fr': 'manger [망제]',
  'kr': '먹다 [meokda]',
  'cn': '吃 [chī]',
  'jp': '食べる/たべる [taberu / 타베루]'
}

// computer
export const translation4 = {
  'en': 'computer',
  'fr': 'ordinateur [얼르디나터르]',
  'kr': '컴퓨터 [Keompyuteo]',
  'cn': '電腦/电脑 [diàn nǎo]',
  'jp': 'コンピュータ [konpyuuta]'
}

export const translation5 = {
  'en': 'to watch/to look at',
  'fr': 'regarder/observer',
  'kr': '보다/감시하다 [boda/gamsihada]',
  'cn': '看 [kàn]',
  'jp': 'みる [miru]'
}


export const createTranslationCard = (translation = getLastTranslation()) => {

  const index = getIndex(translation);
  translation = eval(translation);

  const img = new Image;
  img.src = 'http://www.hkappo.org.hk/public1/images/PE01546_.gif';
  img.width = 170;
  img.style.position = 'absolute';
  const changeImgPosition = (x, y) => {
    img.style.left = `${x - img.width / 2}px`;
    img.style.top = `${y - img.height / 2}px`;
  }

  return html`
  <style>
    html {
      --translation-font-size: 30px;
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
      /* font-family: cursive; */
      font-size: 28px;
    }
    .trans.korean {
      font-family: NanumMyeongjo;
      font-size: 25px;
      font-weight: 900;
    }
    
    .pronounciations {
      font-size: 22px;

      font-family: Roboto;
      color: #80cbc4;
      
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
      content: '⸱';
      margin: 0 4px;
    }
  </style>
  <div class="card border" @click="${(e) => changeImgPosition(e.layerX, e.layerY)}">
    <header><span>translations #${index}</span></header>
    
    <div style="height:0px"></div>

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

    <div style="height:80px"></div>

    ${img}
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
    trans: raw.match(/^([^\[]+)/)[1].trim()
  }

  if (raw.match(/\[([^\]]+)/)) {
    parts.pronounc = raw.match(/\[([^\]]+)/)[1].split('/').map(e => e.trim());
  }

  return parts;
}

import * as _self from './translations.js';
const getLastTranslation = () => {
  const translations = Object.keys(_self).filter(p => p.match(/translation/));
  return translations.reverse().shift();
}