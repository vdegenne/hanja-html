import { html, render } from "../node_modules/lit-html/lit-html.js";
import { classMap } from '../node_modules/lit-html/directives/class-map.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';
import { unsafeHTML } from "../node_modules/lit-html/directives/unsafe-html.js";
import { decorateHTML, getIndex, isKorean, isChinese, isJapanese } from '../util.js';


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

// 覺 and 學
export const confusion3 = {
  langs: ['all'],
  char1: {
    name: '覺',
    meanings: {
      'all': ['to become aware/to feel', 'être conscient(e)/ressentir', '깨닫다']
    }
  },
  char2: {
    name: '學',
    meanings: {
      'all': ['to study/science', 'apprendre', '배우다/학문']
    }
  }
}

// 說 and 話
export const confusion4 = {
  langs: ['all'],
  char1: {
    name: '說',
    meanings: {
      'all': ['to speak/to explain/to persuade', 'raconter/persuader', '말하다/이야기하다/서술하다', 'じょす/はなす']
    }
  },
  char2: {
    name: '話',
    meanings: {
      'all': ['(spoken) words/speech', 'mots (parlés)', '말씀/이야기', 'はなし']
    }
  }
}

// 起 and 話
export const confusion5 = {
  langs: ['all'],
  char1: {
    name: '起',
    meanings: {
      'all': ['to speak/to explain/to persuade', 'raconter/persuader', '말하다/이야기하다/서술하다', 'じょす/はなす']
    }
  },
  char2: {
    name: '話',
    meanings: {
      'all': ['(spoken) words/speech', 'mots (parlés)', '말씀/이야기', 'はなし']
    }
  }
}

// xī and qī
export const confusion6 = {
  langs: ['all'],
  char1: {
    name: 'xī',
    meanings: {
      all: ['稀/希/析/息/吸/犧/西/扱']
    },
    details: {
      all: 'The pronunciation is similar to <b>/ʃi/</b> like "shee" in "sheep".'
    }
  },
  char2: {
    name: 'qī',
    meanings: {
      all: ['期/七/漆/凄/戚/欺/妻']
    },
    details: {
      all: 'The pronunication is similar to <b>/tʃi/</b> like "chea" in "cheap".'
    }
  }
}



export const renderConfusionCard = (content, confusion = lastConfusionName(), lang) => {

  const index = getIndex(confusion);
  confusion = eval(confusion);

  if (!lang) {
    lang = confusion.langs[0]; // take the first language
  }

  const renderNextLanguage = () => renderConfusionCard(
    content,
    `confusion${index}`,
    confusion.langs[confusion.langs.indexOf(lang) + 1] || confusion.langs[0]
  );
  const getLanguageIndex = () => confusion.langs.indexOf(lang);
  
  const meaningStyle = (groupIndex) => styleMap({
    background: colors[confusion.langs.length > 1 ? getLanguageIndex() : groupIndex]
  });
  const languageClasses = (meaning) => classMap({
    korean: isKorean(meaning),
    chinese: isChinese(meaning) || isJapanese(meaning)
  });

  render(html`
  <style>
    html {
      --side-padding-left: 44px;
      --side-padding-right: 30px;

      --h1-font-family: Consolas;
    }
    .card.dark header {
      background: #424242;
      color: #bdbdbd;
    }

    .inner {
      display: flex;
      width: 100%;
    }
    .side {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .left.side {
      padding-left: var(--side-padding-left);
      padding-right: var(--side-padding-right);
    }
    .right.side {
      padding-left: var(--side-padding-right);
      padding-right: var(--side-padding-left);
    }

    .side h1 {
      margin: 0;
      font-size: 120px;
      font-weight: 100;
      font-family: var(--h1-font-family);
      /* color: grey; */
    }
    .card.dark .side h1 {
      color: #fff;
    }
    .side .meanings {
      display: flex;
      flex-wrap: wrap;
      margin: 30px 0;
    }
    .side .meanings > span {
      font-size: 27px;
      white-space: nowrap;
      margin: 0 6px 6px 0;
      padding: 5px 8px;
      border-radius: 1px;
      height: 44px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;

      color: #fff;
    }
    .side .meanings > span.korean {
      font-size: 19px;
      padding-top: 8px;
    }

    .side .details {
      font-size: 24px;
      padding: 0 10px;
    }
    .details .definition {
      color: #ff9800;
    }
    .details .definition:before {
      content: '“';
    }
    .details .definition:after {
      content: '”';
    }

    .separator {
      width: 2px;
      background: #616161;
      border-radius: 50%;
      margin: 100px 0;
      opacity: .5;
    }

    .alert {
      color: #fff;
      font-size: 28px;
      /* margin-bottom: 29px;
      position: relative;
      top: -22px; */
      /* background: yellow;
      color: #000;
      padding: 0 10px; */
      color: #f5f5f5;
    }
  </style>
  <div class="card" lang="${lang}" @click="${renderNextLanguage}">
    <header>
      <span>confusion #${index}</span>
      <span>${lang !== 'all' ? lang : null}</span>
    </header>

    <!-- <div class="alert">⚠️ don't confuse</div> -->

    <div class="inner">
      <div class="left side">
        <h1 class="chinese">${confusion.char1.name}</h1>
        <div class="meanings">
          ${confusion.char1.meanings[lang].map((m, i) => m.split('/').map(m =>
            html`<span style="${meaningStyle(i)}" class="${languageClasses(m)}">${m}</span>`
          ))}
        </div>
        ${confusion.char1.details[lang] ? html`
          <div class="details">${renderDetails(confusion.char1.details[lang])}</div>
        ` : null}
      </div>
      <div class="separator"></div>
      <div class="right side">
        <h1 class="chinese">${confusion.char2.name}</h1>
        <div class="meanings">
          ${confusion.char2.meanings[lang].map((m, i) => m.split('/').map(m =>
            html`<span style="${meaningStyle(i)}" class="${languageClasses(m)}">${m}</span>`
          ))}
        </div>
        ${confusion.char2.details[lang] ? html`
          <div class="details">${renderDetails(confusion.char2.details[lang])}</div>
        ` : null}
      </div>
    </div>

    <div style="height:80px"></div>
  </div>
  `, content);

  return;
}

const renderDetails = (content) => unsafeHTML(decorateHTML(content));

import * as _self from './confusions.js';

const lastConfusionName = () => {
  const confusions = Object.keys(_self).filter(p => p.match(/confusion/));
  return confusions.reverse().shift();
}

const colors = ['#00796b', '#03a9f4', '#ff9800', '#5e35b1'].shuffle();