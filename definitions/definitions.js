import {html} from "../node_modules/lit-html/lit-html.js";

export const 어리둥절하다 = {
  name: '어리둥절하다',
  type: '형용사',
  definition: '무슨 영문인지 잘 몰라서 얼떨떨하다.'
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

      /* border: 1px solid black; */

      font-family: NanumSquare;
      font-size: 1.8em;
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
      /* font-weight: bold; */
      margin: 0 0 40px 0;
      padding: 6px 4px 9px 24px;
      font-size: 1.6em;

      background: #4c4c4c;
      color: #fff;
      border-radius: 2px;
    }
    .type, .definition {
      width: 70%;
    }
    .type {
      font-size: .8em;
      color: #a2a2a2;
      margin: 0 0 20px;
    }
    .definition {
      color: #424242;
    }
  </style>
  <div class="card">
    <div class="title">${word.name}</div>
    <div class="type">[${word.type}]</div>
    <div class="definition">${word.definition}</div>

    <div style="margin-top:30px;"></div>
  </div>
`;