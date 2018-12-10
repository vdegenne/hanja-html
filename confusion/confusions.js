import { html, render } from "../node_modules/lit-html/lit-html.js";
import { classMap } from '../node_modules/lit-html/directives/class-map.js';
import { unsafeHTML } from "../node_modules/lit-html/directives/unsafe-html.js";
import { decorateHTML, getIndex } from '../util.js';


export const langs = {
  'en': 'english',
  'fr': 'français',
  'kr': '한국어'
};



// 字 and 学
export const confusion1 = {
    char1: {
      name: '字',
      meanings: {
        'fr': 'lettre, symbole, caractère, mot',
        'eng':'letter, symbol, character, word',
        'kor': '글자, 문자'
      },
      additional: {
        'fr': "字 n'a pas de forme simplifiée.",
        'eng': '字 has no simplified form.',
        'kor': '字는 간체자가 없습니다.'
      }
    },
    char2: {
      name: '学',
      meanings: {
        'fr': 'apprendre, science',
        'eng': 'to learn, science',
        'kor': '배우다, 공부하다, 학교, 학자, 학문'
      },
      additional: {
        'fr': '学 est la version simplifiée du caractère 學. Il y a deux traits en plus sur le dessus du chapeau.',
        'eng': '学 is the simplified form of 學. There are two strokes at the top of the character.',
        'kor': '学는 學의 간체자 입니다. 편방부수의 총 획수는 字보다 2획 더 있습니다.'
      }
    }
}

// 夂 and 攵
export const confusion2 = {
  langs: ['en', 'fr', 'en'],
  char1: {
    name: '夂',
    meanings: {
      'en': ['to go', 'to walk slowly'],
      'fr': ['aller', 'marcher lentement'],
      'kr': ['뒤져 오다', '천천히 걷는 모양']
    },
    details: {
      'en': '夂 is a letter, a component used to form chinese characters.<br> It can\'t be used alone. Compared to 攵, this character has 3 strokes. The stroke #2 is similar to the strokes #2 and #3 in 攵.',
      'fr': '夂 est une lettre utilisée dans la formation de caractères chinois.<br>Elle ne peut pas être utilisée seule.<br>Le trait #2 ressemble aux traits #2 et #3 dans 攵.',
      'kr': '夂는 <span style="color:red">등글월문</span>이란 부수입니다. 한자를 지는 데 쓰는 성분입니다.<br>#2획은 攵에 #2획이랑 #3획과 똑같은 모양입니다.'
    }
  },
  char2: {
    name: '攵',
    meanings: {
      'en': ['to knock', 'to hit', 'to tap'],
      'fr': ['donner un petit coup', 'une petite tape'],
      'kr': ['치다', '때리다', '글월']
    },
    details: {
      'en': '攵 is also a component used to form chinese characters.<br>It has 4 strokes.<br> The stroke #2 and #3 looks like the stroke #2 in 夂.',
      'fr': '攵 est aussi une lettre.<br> Les traits #2 et #3 ressemblent au trait unique #2 dans 夂.',
      'kr': '攵도 한자를 지은 데 쓰는 성분입니다.<br>#2획이랑 #3획은 夂에 #2획과 똑같한 모양입니다.'
    }
  }
}


export const createConfusionCard = (confusion, lang) => {

  const index = getIndex(confusion);
  confusion = eval(confusion);

  return html`
  <style>
    html {
      --middle-width: 30px;

      --side-padding: 30px; /* reference value */
      --en-side-padding: 30px;
      --kr-side-padding: 44px;

      --sep-height: 400px; /* reference value */
      --en-sep-height: var(--sep-height);

      --en-font-size: 23px;
      --fr-font-size: 23px;
    }

    .inner {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;

      width: 100%;
    }

    /* SIDE */
    .side {
      width: 100%;
      padding: 10px var(--side-padding);
      /* background: grey; */
    }
    .inner.english .side {
      padding: 10px var(--en-side-padding);
    }
    .inner.korean .side {
      padding: 10px var(--kr-side-padding);
    }

    .side h2 {
      font-size: 120px;
      margin: 0 0 14px;
      color: #272727;
    }

    .side .tags {
      margin: 24px 0;
    }
    .side .tags > .tag {
      font-size: 20px;

      display: inline-block;
      padding: 4px 8px;
      margin: 0 4px 4px 0;
      
      background: #623ed2;
      color: #fff;
      border-radius: 2px;
    }
    .inner.korean .side .tags > .tag {
      /* font-family: NanumSquareRound; */
    }

    /* DETAILS */
    .side .details {
      font-size: 24px;

      line-height: 36px;
      text-align: justify;
    }
    .inner.english .side .details {
      font-size: var(--en-font-size);
    }
    .inner.french .side .details {
      font-size: var(--fr-font-size);
    }
    .inner.french .left-side .details {
      margin-top: 60px;
    }
    .inner.korean .right-side .details {
      margin-top: 60px;
    }


    .separator {
      height: var(--sep-height);
      margin-top: 40px;

      width: 8px;
      border-radius: 50%;
      background: #eaeaea;

      /* margin: 0 40px; */
    }
    .inner.korean .separator {
      height: var(--sep-height);
    }
    .inner.english .separator {
      height: var(--en-sep-height);
    }
  </style>
  <div class="card border">

    <header><span>confusion#${index}</span><span class="${classMap({korean: lang==='kr'})}">${langs[lang]}</span></header>

    <div class="inner ${classMap({korean: lang === 'kr', english: lang === 'en', french: lang === 'fr'})}">
      <div class="side left-side">
        <h2 class="chinese">${confusion.char1.name}</h2>
        <div class="tags">${confusion.char1.meanings[lang].map(m => html`<div class="tag">${m}</div>`)}</div>
        <div class="details">${unsafeHTML(decorateHTML(confusion.char1.details[lang]))}</div>
      </div>

      <div class="separator"></div>

      <div class="side right-side">
        <h2 class="chinese">${confusion.char2.name}</h2>
        <div class="tags">${confusion.char2.meanings[lang].map(m => html`<div class="tag">${m}</div>`)}</div>
        <div class="details">${unsafeHTML(decorateHTML(confusion.char2.details[lang]))}</div>
      </div>
    </div>
  </div>
  `
}