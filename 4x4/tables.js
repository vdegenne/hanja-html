import {html} from '../node_modules/lit-html/lit-html.js';

// 初步者漢語實際學習表記冬天愛感冒
export const table1 = [
  { hj: '初', hg: '초', type: 'an' }
];

// 撤回政府抗議示威破損依毀雕刻像壁
export const table2 = [
  { hj: '撤', hg: '철', type: 'v' },
  { hj: '回', hg: '회', type: 'vn' },
  { hj: '政', hg: '정', type: 'n' },
  { hj: '府', hg: '부', type: 'n' },
  { hj: '抗', hg: '항', type: 'v' },
  { hj: '議', hg: '의', type: 'v' },
  { hj: '示', hg: '시', type: 'v' },
  { hj: '威', hg: '위', type: 'n' },
  { hj: '破', hg: '파', type: 'vnj' },
  { hj: '損', hg: '손', type: 'vj' },
  { hj: '依', hg: '의', type: 'va' },
  { hj: '毀', hg: '훼', type: 'v' },
  { hj: '雕', hg: '조', type: 'vn' },
  { hj: '刻', hg: '각', type: 'van' },
  { hj: '像', hg: '상', type: 'van' },
  { hj: '壁', hg: '벽', type: 'n' },
];


export const hanja4x4table = (table) => {
  if (table.length !== 16) {
    throw new Error('the table size should be equal to 16');
  }

  return html`
  <style>
    .case {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(100% / 4);
      padding: 10px;
      box-sizing: border-box;

      /* background: red; */
    }
    .hanja {
      font-size: 5em;
      font-family: 'UD Digi Kyokasho NK-R';
      color: #252525;
    }
    .hangul {
      font-size: 4em;
      font-family: NanumSquare;
      font-weight: bold;
    }

    .colors {
      display: flex;
      justify-content: flex-start;
      width:70%;
      /* margin: 5px 0 0; */
      font-size: 3em;
    }
    .colors > span {
      height: 1px;
      position: relative;
      top: -4px;
    }
    .a {
      color: orange;
    }
    .v {
      color: #f7dd00;

    }
    .j {
      color: green;
    }
    .n {
      color: black;
    }
  </style>
  ${table.map(t => html`
  <div class="case">
    <span class="hangul">${t.hg}</span>
    <span class="hanja">${t.hj}</span>
    <div class="colors">
      ${t.type.split('').map(t => html`<span class="${t}">•</span>`)}
    </div>
  </div>
  `)}`;
}