import {
  html
} from "./node_modules/lit-html/lit-html.js";

export const isRoman = (input) => input && ((input[0] >= 'a' && input[0] <= 'z') || (input[0] >= 'A' && input[0] <= 'Z'));
export const isKoreanWord = (input) => input.match(koreanRegExp) ? true : false;
export const isKorean = isKoreanWord; // alias
export const isChinese = (input) => input.match(chineseRegExp);

export const chineseRegExp = /([\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d])+/;

export const koreanRegExp = /([\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff])+/;

export const decorateContent = (content) => {
  let html = content.innerHTML;
  /* wrap korean */
  html = html.replace(new RegExp(koreanRegExp, 'g'), (match) => {
    let index;
    if ((index = _hangeulClasses.indexOf(match)) < 0) {
      index = _hangeulClasses.length;
      _hangeulClasses.push(match);
    }
    return `<span class="korean korean${index}">${match}</span>`
  });
  /* wrap chinese */
  html = html.replace(new RegExp(chineseRegExp, 'g'), match => `<span class="chinese">${match}</span>`);
  /* wrap definition */
  html = html.replace(/=\"([^"]+)\"|(\"[^"]+\")/g, (match, group, a) => {
    if (group) return match;
    // if (group)
    return `<span class="definition"> ${match.slice(1, -1)} </span>`
  });
  content.innerHTML = html;
}

const _hangeulClasses = [];





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