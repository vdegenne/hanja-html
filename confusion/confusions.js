import { html, render } from "../node_modules/lit-html/lit-html.js";
export { render };
  
export const confusion1 = {
  char1: {
    name: '字',
    meanings: ['lettre', 'symbole', 'caractère', 'mot'],
    additional: "字 n'a pas de forme simplifiée."
  },
  char2: {
    name: '学',
    meanings: ['apprendre', 'science'],
    additional: '学 est la version simplifiée du caractère 學. Il y a deux traits en plus sur le dessus du chapeau.'
  }
}


export const createConfusionCard = (confusion) => {
  if (typeof confusion !== 'string') {
    throw new Error('confusion needs to be of type string');
  }

  const index = parseInt(confusion.match(/[0-9]+/g)[0]);
  confusion = eval(confusion);
  

  return html`
  <style>
    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 640px;
      height: 640px;
      border: 1px solid black;

      position: relative;
    }
    header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 5px 5px 5px 10px;
      background: #565656;
      color: #fff;
      font-size: .8em;
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 4em;

      margin-bottom: 30px;
    }
    .title .chinese {
      font-size: 1.5em;
      margin: 0 40px;
    }

    section {
      display: flex;

    }
    .separator {
      width: 2px;
      background: #ececec;
      margin: 0 50px;
      border-radius: 50%;
    }
    section .side {
      width: 200px;
      /* background: red; */
    }
    .meanings {
      margin: 0 0 20px;
    }
    .side .meaning {
      padding: 4px;
      margin: 0 0 3px;
      color: #3f51b5;
      font-size: 1em;
      font-weight: 900;
      /* text-align: center !important; */
    }
    .side .meaning::first-letter {
      text-transform: uppercase;
    }
    .side:nth-of-type(1) .meaning {
      text-align: left;
    }
    .side:nth-of-type(3) .meaning {
      text-align: left;
    }

    .add {
      line-height: 28px;
    }
  </style>
  <div class="card">
    <header>confusion#${index}</header>
    <span class="title chinese">${confusion.char1.name} <span style="font-weight:bold">/</span> ${confusion.char2.name}</span>
    <section>
      <div class="side" style="position:relative;top:-20px;left:10px;">
        <div class="meanings chinese">
          ${confusion.char1.meanings.map(m => html`<div class="meaning">${m}</div>`)}
        </div>
        ${confusion.char1.additional ? html`<div class="add">${confusion.char1.additional}</div>` : null}
      </div>
      <div class="separator"></div>
      <div class="side">
        <div class="meanings chinese">
          ${confusion.char2.meanings.map(m => html`<div class="meaning">${m}</div>`)}
        </div>
        ${confusion.char2.additional ? html`<div class="add">${confusion.char2.additional}</div>` : null}
      </div>
    </section>

    <div style="height:20px;"></div>
  </div>
`
};