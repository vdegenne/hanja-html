import { html } from "../node_modules/lit-html/lit-html.js";
import { unsafeHTML } from "../node_modules/lit-html/directives/unsafe-html.js";
import { classMap } from "../node_modules/lit-html/directives/class-map.js";
import { getIndex } from "../util.js";

export const 어리둥절하다 = {
  name: '어리둥절하다',
  type: '형용사',
  definition: ['무슨 영문인지 잘 몰라서 얼떨떨하다.']
}

export const 감추다 = {
  name: '감추다',
  type: '동사',
  definitions: [
    '남이 보거나 찾아내지 못하도록 가리거나 숨기다.',
    '어떤 사실이나 감정 따위를 남이 모르게 하다.',
    '어떤 사물이나 현상 따위가 없어지거나 사라지다.'
  ]
}

// 불길하다
export const definition3 = {
  name: '불길하다',
  type: '형용사',
  definitions: ['운수 따위가 좋지 아니하다.<br>또는 일이 예사롭지 아니하다.'],
  translation: '不吉 / unlucky  '
}


export const getWordTemplate = (word) => {

  const index = getIndex(word);
  word = eval(word);

  return html`
  <style>
    html {
      --title-color: #bf360c;
      --title-font-size: 62px;

      --definition-font-size: 32px;
    }

    .inner {
      width: 478px;
    }
    .card::before {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: url(https://i.pinimg.com/736x/6f/2b/80/6f2b80e8ea1b5bfb6e2e44cd4d039682--free-vector-patterns-marble-pattern.jpg);
      content: '';
      z-index: -1;
      opacity: .05;
    }

    .title {
      font-family: NanumMyeongjo;
      text-align: right;
      margin-bottom: 40px;
    }
    .title > span:first-of-type {
      font-size: var(--title-font-size);
      display: inline-block;
      padding: 6px 7px 9px 34px;
      border-radius: 2px;

      /* background: var(--title-color); */

      background: linear-gradient(135deg, rgba(9,56,111,1) 0%, rgba(45,119,207,1) 100%);

      color: #fff;
    }

    .type {
      font-size: var(--definition-font-size);
      color: #a2a2a2;
    }

    .definitions {
      font-size: var(--definition-font-size);
      padding: 0;
      list-style-type: none;
      text-indent: -53px;
      padding-left: 53px;
    }

    .definitions > li {
      color: #040404;
      letter-spacing: 0px;
      line-height: 44px;
      margin: 0 0 12px;
    }
    li .count {
      margin-right: 10px;
      color: #ffc107;
    }
    .onedef li .count {
      visibility: hidden;
    }
  </style>
  <div class="card border">
    <header><span>${word.translation}</span>#${index}</header>
    <div class="inner">
      <div class="title">
        <span>${word.name}</span>
      </div>
      <div class="type korean">[${word.type}]</div>
      <ol class="definitions korean ${classMap({onedef: word.definitions.length === 1})}">
        ${word.definitions.map((d, i) => html`<li><span class="count">${i + 1}.</span>${unsafeHTML(d)}</li>`)}
      </ol>
    </div>
    <div style="height:31px"></div>
  </div>
  `;
};