import {html} from "../node_modules/lit-html/lit-html.js";

export const 어리둥절하다 = {
  name: '어리둥절하다',
  type: '형용사',
  definition: ['무슨 영문인지 잘 몰라서 얼떨떨하다.']
}

export const 감추다 = {
  name: '감추다',
  type: '동사',
  definition: [
    '남이 보거나 찾아내지 못하도록 가리거나 숨기다.',
    '어떤 사실이나 감정 따위를 남이 모르게 하다.',
    '어떤 사물이나 현상 따위가 없어지거나 사라지다.'
  ]
}


export const getWordTemplate = (word) => html`
  <style>
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      width: 640px;
      height: 640px;
      margin: 0 auto;

      border: 1px solid black;

      font-family: NanumSquare;
      -webkit-font-smoothing: subpixel-antialiased;
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
      opacity: .1;
    }

    .title {
      text-align: right;
      margin-bottom: 40px;
    }
    .title > span {
      display: inline-block;
      padding: 6px 7px 9px 34px;
      border-radius: 1px;

      color: #fff;
    }

    .type {
      color: #a2a2a2;
    }

    .definitions {
      padding: 0;
      list-style-type: none;
    }
    .definitions > li {
      color: #545454;
      letter-spacing: 0px;
      margin: 0 0 12px;
    }
    li .count {
      margin-right: 10px;
      color: #cddc39;
    }
  </style>
  <div class="card">
    <div class="card-wrapper">
      <div class="title" style="font-size:52px;">
        <span style="background:#004073">${word.name}</span>
      </div>
      <div class="type" style="font-size:25px;">[${word.type}]</div>
      <ol class="definitions" style="font-size:25px;">
        ${word.definition.map((d, i) => html`<li><span class="count">${i + 1}.</span>${d}</li>`)}
      </ol>
    </div>
    <div style="height:60px"></div>
  </div>
`;