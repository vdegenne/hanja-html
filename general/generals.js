import { html } from '../node_modules/lit-html/lit-html.js';
import { getIndex, getCardName, decorateHTML } from "../util.js";
import { unsafeHTML } from '../node_modules/lit-html/directives/unsafe-html.js';


export const ambiguous1 = {
  langs: ['fr', 'en'],
  fr: html`
    <h1>통제</h1>
    <p>통제 signifie "controle, reglementation".</p>
    <p>De ce fait on peut facilement se tromper et croire que l'etymologie chinoise de 통 est 通 "passer, communiquer" comme dans "controler/reguler un flux" quand en realite il fait reference a 統 "unifier, creer un ensemble, tout".</p>
    <p>Son equivalent chinois est donc 統制 et son sens global "controler un tout/un ensemble".</p>
  `,
  en: html`hehe`
}

export const fact1 = {
  langs: ['en'],
  en: html`
  <p>Asiatic languages use at least two meanings (from the Chinese etymology) to produce nouns.</p>
  `
}

export const createCard = (general) => {

  const index = getIndex(general);
  const name = getCardName(general);
  general = eval(general);

  let langIndex = 0;
  const getLang = () => general.langs[eval(`${langIndex}%${general.langs.length}`)];

  return html`
  <style>
    .inner {
      display: none;
      font-size: 24px;
    }
    .card[lang=fr] .inner.fr,
    .card[lang=en] .inner.en {
      display: initial;
    }

    h1 {
      text-align: center;
    }
    h1 > .korean {
      font-family: NanumMyeongjo !important;
      background: black;
      color: white;
      font-size: 42px;
    }
  </style>
  <div class="card border" lang="${getLang()}" @click="${function () { this.lang = getLang(++langIndex)}}">
    <header>${name} #${index}</header>
    
    ${general.langs.map(l => html`
      <div class="inner ${l}">${general[l]}</div>
    `)}
  </div>
  `;
}