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

// 喜歡數字已經去世杯買覺得值圖書館
export const table3 = [
  { hj: '喜', hg: '희', type: 'vn' },
  { hj: '歡', hg: '환', type: 'j' },
  { hj: '數', hg: '수', type: 'an' }, // 수숫삭촉
  { hj: '字', hg: '자', type: 'n' },
  { hj: '已', hg: '이', type: 'a' },
  { hj: '經', hg: '경', type: 'vn' },
  { hj: '去', hg: '거', type: 'vj' },
  { hj: '世', hg: '세', type: 'n' },
  { hj: '杯', hg: '배', type: 'vnj' },
  { hj: '買', hg: '매', type: 'v' },
  { hj: '覺', hg: '각', type: 'v' }, // 각교
  { hj: '得', hg: '득', type: 'v' },
  { hj: '值', hg: '치', type: 'nj' },
  { hj: '圖', hg: '도', type: 'nv' },
  { hj: '書', hg: '서', type: 'nv' },
  { hj: '館', hg: '관', type: 'n' },
];

// 
export const table4 = [
  { hj: '喜', hg: '희환', type: 'vn' },
  { hj: '歡', hg: '환', type: 'j' },
  { hj: '數', hg: '수', type: 'an' }, // 수숫삭촉
  { hj: '字', hg: '자', type: 'n' },
  { hj: '已', hg: '이', type: 'a' },
  { hj: '經', hg: '경', type: 'vn' },
  { hj: '去', hg: '거', type: 'vj' },
  { hj: '世', hg: '세', type: 'n' },
  { hj: '杯', hg: '배', type: 'vnj' },
  { hj: '買', hg: '매', type: 'v' },
  { hj: '覺', hg: '각', type: 'v' }, // 각교
  { hj: '得', hg: '득', type: 'v' },
  { hj: '值', hg: '치', type: 'nj' },
  { hj: '圖', hg: '도', type: 'nv' },
  { hj: '書', hg: '서', type: 'nv' },
  { hj: '館', hg: '관', type: 'n' },
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

      /* border: 1px solid grey; */

      position: relative;
      top:-10px;
      left: -5px;
    }
    .hanja {
      font-size: 5.3em;
      font-family: 'UD Digi Kyokasho NK-R';
      color: #252525;

      height: 85px;
      line-height: 85px;
    }
    .hangul {
      font-size: 4em;
      font-family: NanumSquare;
      font-weight: bold;
    }

    .hangul > span {
      /* padding: 2px; */
    }
    .hangul > span:not(:first-of-type):before {
      content: '•';
      font-family: Arial;
      font-weight: 100;
      font-size: .6em;
      margin: 0 4px;
    }
    .hangul2 {
      font-size: 3em;
    }

    .colors {
      display: flex;
      justify-content: flex-start;
      width:70%;
      /* margin: 5px 0 0; */
      font-size: 3em;
    }
    .colors > span {
      height: 0px;
      position: relative;
      top: -6px;
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
    <div class="hangul hangul${t.hg.length}">
      ${t.hg.split('').map(hg => html`<span>${hg}</span>`)}
    </div>

    <span class="hanja">${t.hj}</span>

    <div class="colors">
      ${t.type.split('').map(t => html`<span class="${t}">•</span>`)}
    </div>
  </div>
  `)}`;
}