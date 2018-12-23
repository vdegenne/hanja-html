import {
  html
} from "./node_modules/lit-html/lit-html.js";

export const isRoman = (input) => input && ((input[0] >= 'a' && input[0] <= 'z') || (input[0] >= 'A' && input[0] <= 'Z'));
export const isKoreanWord = (input) => input.match(koreanRegExp) ? true : false;
export const isKorean = isKoreanWord; // alias
export const isChinese = (input) => input.match(chineseRegExp);
export const isJapanese = (input) => input.match(japaneseRegExp);
export const chineseRegExp = /([\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d])+/;

export const koreanRegExp = /([\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff])+/;

export const japaneseRegExp = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;

export const decorateContent = (content) => content.innerHTML = decorateHTML(content.innerHTML);

const _hangeulClasses = [];

export const decorateHTML = (html, korean = true, chinese = true, definitions = true) => {
  /* korean characters */
  if (korean) {
    html = html.replace(new RegExp(koreanRegExp, 'g'), (match) => {
      let index;
      if ((index = _hangeulClasses.indexOf(match)) < 0) {
        index = _hangeulClasses.length;
        _hangeulClasses.push(match);
      }
      return `<span class="korean korean${index}">${match}</span>`
    });
  }

  /* chinese characters */
  if (chinese) {
    html = html.replace(new RegExp(chineseRegExp, 'g'), match => `<span class="chinese">${match}</span>`);
  }

  /* definitions */
  if (definitions) {
    html = html.replace(/=\"([^"]+)\"|(\"[^"]+\")/g, (match, group, a) => {
      if (group) return match;
      // if (group)
      return `<span class="definition">${match.slice(1, -1)}</span>`
    });
  }

  return html;
}


export const getCardName = (name) => name.replace(/[0-9]+$/, '');
export const getIndex = (name) => parseInt(name.match(/[0-9]+/g));

export const cloneSlice = (arr, start, end) => {
  const _arr = arr.slice();
  _arr.splice(start, end);
  return _arr;
};
Array.prototype.cloneSlice = function (start, end) { return cloneSlice(this, start, end); }

export const randomRange = (...args) => {
  let min, max;
  if (args.length === 1) {
    min = 0;
    max = args[0];
  }
  else {
    min = args[0];
    max = args[1];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const getPinyinNumericSyntax = (pinyin) => {
  const numerics = [
    { value: 1, candidates: 'āēīōū' },
    { value: 2, candidates: 'áéíóú' },
    { value: 3, candidates: 'ǎěǐǒǔǚ' },
    { value: 4, candidates: 'àèìòùǜ' },
    { value: 5, candidates: 'aeiou' }
  ];
  const letters = [
    { value: 'a', accents: 'āǎáà' },
    { value: 'e', accents: 'ēéěè' },
    { value: 'i', accents: 'īíǐì' },
    { value: 'o', accents: 'ōóǒò' },
    { value: 'u', accents: 'ūúǔù' },
    { value: 'v', accents: 'ǜǚ' }
  ];

  let n;
  for (n of numerics) {
    if (pinyin.match(new RegExp(`[${n.candidates}]`))) {
      pinyin += n.value;
      break;
    }
  }

  if (n.value !== 5) {
    let unaccentPinyin;
    for (const l of letters) {
      if ((unaccentPinyin = pinyin.replace(new RegExp(`[${l.accents}]`), l.value)) !== pinyin) {
        pinyin = unaccentPinyin;
        break;
      }
    }
  }

  return pinyin;
}


export const playPinyin = async (pinyin) => {
  const url = `https://dictionary.writtenchinese.com/sounds/${getPinyinNumericSyntax(pinyin)}.mp3`;
  const audio = new Audio();
  await new Promise(resolve => {
    audio.addEventListener('loadeddata', resolve);
    audio.src = url;
  });
  audio.play();
}


export const shuffleArray = (arr) => {
  let aIndex, bIndex, temp;
  for (let i = 0; i < 999; ++i) {
    aIndex = Math.floor(Math.random() * arr.length);
    bIndex = Math.floor(Math.random() * arr.length);
    temp = arr[aIndex];
    arr[aIndex] = arr[bIndex];
    arr[bIndex] = temp;
  }
  return arr;
}
Array.prototype.shuffle = function () { return shuffleArray(this) }