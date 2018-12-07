import { html, render } from "../node_modules/lit-html/lit-html.js";
import { unsafeHTML } from "../node_modules/lit-html/directives/unsafe-html.js";
import { decorateHTML } from '../util.js';

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



export const createConfusionCard = (confusion, lang) => {
  if (typeof confusion !== 'string') {
    throw new Error('confusion needs to be of type string');
  }

  const index = parseInt(confusion.match(/[0-9]+/g)[0]);
  confusion = eval(confusion);
  
  const langs = { 'fr': 'fr', 'eng': 'eng', 'kor': '한국어' };
  
  const content = html`
  <style>
    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 640px;
      height: 640px;

      margin: 40px auto 0;
      
      border: 1px solid rgba(100, 100, 100, .2);

      position: relative;

      font-size: 1.3em;
    }

    .card[korean] {
      font-family: NanumSquare;
    }

    header {
      position: absolute;

      display: flex;
      justify-content: space-between;
      align-items: center;
      top: 0;
      left: 0;
      right: 0;
      height: 36px;
      padding: 0 20px 0 10px;
      background: #565656;
      color: #fff;
      font-size: 1em;
      /* font-style: italic; */
    }

    section {
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .side {
      display: flex;
      flex-direction: column;
      width: 240px;
    }

    .side > .title {
      font-size: 3em;
      /* margin-bottom: 40px; */
      color: #2b2b2b;
      /* text-align:center; */
    }

    .card:not([korean]) .meanings {
      font-family: 'UD Digi Kyokasho NK-R';
    }

    .side .meanings {
      font-size: 1.1em;
      text-align: justify;
      text-indent: 10px;
      margin: 40px 0;
    }

    .meanings > span {
      display: inline-block;
      background: #5c6bc0;
      color: #fff;
      margin: 2px 2px;
      padding: 4px 5px;
      text-indent: initial;
      border-radius: 3px;
    }

    .side .add {
      line-height: 45px;
      font-size: 1.3em;
      /* text-align: justify; */
    }

    .card[korean] .add {
      text-align: justify;
    }


    .separator {
      width: 2px;
      background: #ececec;
      margin: 0 39px;
      border-radius: 50%;
      height: 340px;
    }
  </style>
  <div class="card" ?korean="${lang === 'kor'}">

    <header>
      <span>${lang !== 'kor' ? 'confusion' : '혼동함'}#${index}</span>
      <span>${langs[lang]}</span>
    </header>

    <section>
      <div class="side">
        <span class="title chinese">${confusion.char1.name}</span>
        <div class="meanings">${confusion.char1.meanings[lang].split(',').map(m => html`<span>${m}</span>`)}</div>
        ${confusion.char1.additional[lang] ? html`<div class="add">${confusion.char1.additional[lang]}</div>` : null}
      </div>
      <div class="separator"></div>
      <div class="side">
      <span class="title chinese">${confusion.char2.name}</span>
        <div class="meanings">${confusion.char2.meanings[lang].split(',').map(m => html`<span>${m}</span>`)}</div>
        ${confusion.char2.additional[lang] ? html`<div class="add">${confusion.char2.additional[lang]}</div>` : null}
      </div>
    </section>

    <div style="height:30px;"></div>
  </div>`;


  const fakeElement = document.createElement('div');
  render(content, fakeElement);
  return html`${unsafeHTML(decorateHTML(fakeElement.innerHTML.replace(/<!---->/g, ''), false, true, false))}`;
};