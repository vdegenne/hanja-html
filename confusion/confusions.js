import { html, render } from "../node_modules/lit-html/lit-html.js";
export { render };
  
export const confusion1 = {
  char1: {
    name: '字',
    meanings: ['lettre', 'symbole', 'caractère', 'mot']
  },
  char2: {
    name: '学',
    meanings: ['apprendre', 'science'],
    additional: '学 est la version simplifiée du caractère 學. Il y a deux traits en plus sur le dessus du chapeau'
  }
}


export const createConfusionCard = (confusion) => html`
  <style>
    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 640px;
      height: 640px;
      border: 1px solid black;
    }
  </style>
  <div class="card">
    <span class="title">${confusion.char1.name} et ${confusion.char2.name}</span>
  </div>
`;