/* ═══════════════════════════════════════════════════════════
   Study Hub · app.js
   Núcleo (estado, i18n, rotas, casca) + Modo 1 · Semanas.
   O Modo 2 · Hub de conhecimento vive em hub.js (window.HUB).
   Spec: openspec/01, 02, 03, 05, 08.
   ═══════════════════════════════════════════════════════════ */
window.WEEKS_DATA = window.WEEKS_DATA || {};
window.SUBJECTS = window.SUBJECTS || [];

/* ─── Estado leve (01: só idioma e última rota) ─────────── */
const STORE = { lang: 'uol-lang', last: 'uol-last' };
const LEGACY_KEYS = ['uol-xp', 'uol-fc-count', 'uol-lang-toggle', 'uol-migrated'];

function storeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function storeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

function detectLang() {
  const saved = storeGet(STORE.lang);
  if (saved === 'pt' || saved === 'en') return saved;
  const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return nav.startsWith('pt') ? 'pt' : 'en';
}
let lang = detectLang();
let currentSubject = null;
let lastRoute = null;

/* Gamificação removida (04·D2, arquivo em 07): limpa as chaves antigas. */
function cleanLegacyStorage() {
  try {
    const del = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (LEGACY_KEYS.includes(k) || /^bu2530-/.test(k) || /^uol-.+-(status|sections-\d+)$/.test(k)) del.push(k);
    }
    del.forEach(k => localStorage.removeItem(k));
  } catch (e) {}
}

/* ─── i18n ──────────────────────────────────────────────── */
const UI = {
  subjects:     { pt: 'Matérias',                 en: 'Subjects' },
  modes:        { pt: 'Modos de estudo',          en: 'Study modes' },
  byWeek:       { pt: 'Por semana',               en: 'By week' },
  hub:          { pt: 'Hub de conhecimento',      en: 'Knowledge hub' },
  hubShort:     { pt: 'Hub',                      en: 'Hub' },
  trails:       { pt: 'Trilhas',                  en: 'Trails' },
  soon:         { pt: 'em breve',                 en: 'soon' },
  part:         { pt: 'Parte',                    en: 'Part' },
  dossier:      { pt: 'Dossiê',                   en: 'Dossier' },
  week:         { pt: 'Semana',                   en: 'Week' },
  weeks:        { pt: 'semanas',                  en: 'weeks' },
  courseWeek:   { pt: 'Semana {n} do curso',      en: 'Course week {n}' },
  openPart:     { pt: 'Abrir a parte',            en: 'Open this part' },
  openBoard:    { pt: 'Quadro de ligações',       en: 'Connections board' },
  review:       { pt: 'Revisão',                  en: 'Review' },
  book:         { pt: 'Livro-base',               en: 'Core textbook' },
  concepts:     { pt: 'Conceitos-chave',          en: 'Key concepts' },
  theories:     { pt: 'Teorias e frameworks',     en: 'Theories and frameworks' },
  cases:        { pt: 'Casos',                    en: 'Case studies' },
  glossary:     { pt: 'Glossário',                en: 'Glossary' },
  flashcards:   { pt: 'Flashcards',               en: 'Flashcards' },
  authors:      { pt: 'Autores',                  en: 'Key authors' },
  notes:        { pt: 'Notas completas',          en: 'Full notes' },
  links:        { pt: 'Material complementar',    en: 'Supplementary material' },
  connections:  { pt: 'Conexões',                 en: 'Connections' },
  overview:     { pt: 'Visão geral',              en: 'Overview' },
  items:        { pt: 'itens',                    en: 'items' },
  concept:      { pt: 'Conceito',                 en: 'Concept' },
  theory:       { pt: 'Teoria',                   en: 'Theory' },
  of:           { pt: 'de',                       en: 'of' },
  evidence:     { pt: 'Evidência',                en: 'Exhibit' },
  interactive:  { pt: 'interativa · clique nos elementos', en: 'interactive · click the elements' },
  autoScale:    { pt: 'escala automática',        en: 'auto scale' },
  case:         { pt: 'Caso',                     en: 'Case' },
  searchTerm:   { pt: 'Buscar termo…',            en: 'Search term…' },
  noTerm:       { pt: 'Nenhum termo com esse texto.', en: 'No term matches that text.' },
  expandAll:    { pt: 'Abrir todas',              en: 'Open all' },
  collapseAll:  { pt: 'Fechar todas',             en: 'Close all' },
  inHub:        { pt: 'Ver no Hub',               en: 'See in the Hub' },
  reveal:       { pt: 'clique ou Enter para virar', en: 'click or Enter to flip' },
  back:         { pt: 'virar de volta',           en: 'flip back' },
  prev:         { pt: 'Anterior',                 en: 'Previous' },
  next:         { pt: 'Próximo',                  en: 'Next' },
  knew:         { pt: 'Sabia',                    en: 'Knew it' },
  needReview:   { pt: 'Revisar',                  en: 'Review' },
  sessionOnly:  { pt: 'contagem só nesta sessão', en: 'count kept for this session only' },
  video:        { pt: 'Vídeo',                    en: 'Video' },
  article:      { pt: 'Artigo',                   en: 'Article' },
  news:         { pt: 'Notícia',                  en: 'News' },
  other:        { pt: 'Link',                     en: 'Link' },
  emptyWeek:    { pt: 'Esta semana ainda não tem conteúdo.', en: 'This week has no content yet.' },
  reviewOf:     { pt: 'Compilado das semanas {a} a {b}', en: 'Compiled from weeks {a} to {b}' },
  allCards:     { pt: 'Todos os flashcards do bloco', en: 'All flashcards in this block' },
  openAll:      { pt: 'Aberto a todos · sem login', en: 'Open to all · no login' },
  heroEyebrow:  { pt: 'University of London · BSc Marketing · Coursera', en: 'University of London · BSc Marketing · Coursera' },
  heroLede:     { pt: 'Material de estudo de um aluno, aberto a qualquer aluno. Cada semana é um dossiê: conceitos, teorias com visualizações, casos, glossário, flashcards e o que a prova cobra.', en: 'One student’s study material, open to every student. Each week is a dossier: concepts, theories with visualisations, cases, glossary, flashcards and what the exam asks.' },
  figWeeks:     { pt: 'Semanas',                  en: 'Weeks' },
  figNodes:     { pt: 'Conceitos e teorias',      en: 'Concepts and theories' },
  figCards:     { pt: 'Flashcards',               en: 'Flashcards' },
  figVis:       { pt: 'Visualizações',            en: 'Visualisations' },
  modeWeekDesc: { pt: 'O caminho do curso. Abra a pasta da semana e leia o dossiê inteiro, seção por seção.', en: 'The course path. Open the week’s folder and read the whole dossier, section by section.' },
  modeHubDesc:  { pt: 'A matéria inteira como uma rede. Conceitos e teorias ligados por semana, pelas conexões do curso e por citação cruzada.', en: 'The whole subject as a network. Concepts and theories linked by week, by course connections and by cross-citation.' },
  choosePart:   { pt: 'Escolher a parte',         en: 'Choose a part' },
  openHub:      { pt: 'Abrir o hub',              en: 'Open the hub' },
  dossiers:     { pt: 'dossiês',                  en: 'dossiers' },
  credit:       { pt: 'Material de estudo de João Rodrigues · BSc Marketing · University of London · aberto a todos', en: 'Study material by João Rodrigues · BSc Marketing · University of London · open to all' },
  partConnH:    { pt: 'Ligações desta parte',     en: 'Links inside this part' },
  partConnP:    { pt: 'No Hub, os conceitos e teorias desta parte aparecem como fichas ligadas por barbante: mesma semana, conexões do curso e citações cruzadas.', en: 'In the Hub, this part’s concepts and theories appear as index cards tied by string: same week, course connections and cross-citations.' },
  navOpen:      { pt: 'Abrir navegação',          en: 'Open navigation' },
  navClose:     { pt: 'Fechar navegação',         en: 'Close navigation' },
  clickCase:    { pt: 'clique nos casos',         en: 'click the cases' },
};
function T(key, vars) {
  const e = UI[key]; let s = e ? (e[lang] || e.pt) : key;
  if (vars) for (const k in vars) s = s.replace(`{${k}}`, vars[k]);
  return s;
}
function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return lang === 'en' ? (obj.en || obj.pt || '') : (obj.pt || obj.en || '');
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/* Negrito nas palavras-chave: os textos do curso já marcam o essencial em CAIXA ALTA. */
const KW_STOP = new Set(['AND', 'THE', 'FOR', 'NOT', 'BUT', 'YOU', 'ALL', 'ONE', 'TWO', 'NEW', 'ARE', 'WAS', 'HAS', 'ITS', 'OUT', 'QUE', 'COM', 'POR', 'DOS', 'DAS', 'UMA', 'NÃO', 'NAO', 'SIM', 'SEM', 'MAS', 'SER', 'SUA', 'SEU', 'UOL', 'THIS', 'THAT', 'WITH', 'FROM', 'WHAT', 'ISSO', 'ESSE', 'ESSA', 'ESTE', 'ESTA', 'ONDE', 'COMO', 'PARA', 'PELO', 'PELA', 'MUITO']);
function boldKeys(html) {
  return html.replace(/(^|[^\wÀ-ÿ])([A-ZÀ-Ý][A-ZÀ-Ý&\-\/]{2,}(?:\s+(?:[A-ZÀ-Ý][A-ZÀ-Ý&\-\/]{1,}|DE|DA|DO|DOS|DAS|E|&|OF|THE|AND|IN|TO|X|×|VS|VS\.))*)(?![\wÀ-ÿ])/g, (m, pre, w) => {
    const words = w.split(/\s+/).filter(x => /^[A-ZÀ-Ý][A-ZÀ-Ý&\-\/]{2,}$/.test(x) && !KW_STOP.has(x));
    return words.length ? `${pre}<b>${w}</b>` : m;
  });
}
function rich(s) { return boldKeys(esc(t(s))); }

/* ─── Dados ─────────────────────────────────────────────── */
function getSubject(id) { return window.SUBJECTS.find(s => s.id === id) || null; }
function getWeek(subjectId, num) { return (window.WEEKS_DATA[subjectId] || {})[num]; }
function subjectWeekNums(s) { return Array.from({ length: s.totalWeeks }, (_, i) => i + 1); }
function subjectIndex(s) { return window.SUBJECTS.indexOf(s); }
function partNum(s) { return String(subjectIndex(s) + 1).padStart(2, '0'); }
function courseWeekNum(s, n) {
  let off = 0;
  for (const x of window.SUBJECTS) { if (x === s) break; off += x.totalWeeks; }
  return off + n;
}
function weekTitle(subjectId, num, which) {
  const w = getWeek(subjectId, num);
  const s = getSubject(subjectId);
  const src = (w && w.title) || (s && s.weekTitles && s.weekTitles[num]);
  if (!src) return `Week ${num}`;
  if (which === 'pt') return src.pt || src.en; if (which === 'en') return src.en || src.pt;
  return t(src);
}
function isWeekPopulated(subjectId, num) {
  const w = getWeek(subjectId, num);
  return !!(w && (w.overview || (w.concepts && w.concepts.length) || (w.theories && w.theories.length) || (w.caseStudies && w.caseStudies.length)));
}
function nameOf(th) {
  if (!th || !th.name) return { pt: '', en: '' };
  if (typeof th.name === 'string') return { pt: th.name, en: th.name };
  return { pt: th.name.pt || th.name.en || '', en: th.name.en || th.name.pt || '' };
}
function wnum(n) { return 'W' + String(n).padStart(2, '0'); }
function pad2(n) { return String(n).padStart(2, '0'); }
function initials(name) { return String(name || '').split(' ').filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase(); }

const SECTION_DEFS = [
  { key: 'overview',    ui: 'overview',    has: w => !!w.overview },
  { key: 'concepts',    ui: 'concepts',    has: w => !!(w.concepts && w.concepts.length) },
  { key: 'theories',    ui: 'theories',    has: w => !!(w.theories && w.theories.length) },
  { key: 'cases',       ui: 'cases',       has: w => !!(w.caseStudies && w.caseStudies.length) },
  { key: 'glossary',    ui: 'glossary',    has: w => !!(w.glossary && w.glossary.length) },
  { key: 'flashcards',  ui: 'flashcards',  has: w => !!(w.flashcards && w.flashcards.length) },
  { key: 'authors',     ui: 'authors',     has: w => !!(w.authors && w.authors.length) },
  { key: 'notes',       ui: 'notes',       has: w => !!w.notes },
  { key: 'links',       ui: 'links',       has: w => !!(w.links && w.links.length) },
  { key: 'connections', ui: 'connections', has: w => !!(w.connections && w.connections.length) },
];
function availableSections(w) { return w ? SECTION_DEFS.filter(d => d.has(w)) : []; }

/* Totais para a capa */
function courseFigures() {
  let weeks = 0, nodes = 0, cards = 0, vis = 0;
  for (const s of window.SUBJECTS) for (const n of subjectWeekNums(s)) {
    const w = getWeek(s.id, n); if (!w || !isWeekPopulated(s.id, n)) continue;
    weeks++;
    nodes += (w.concepts || []).length + (w.theories || []).length;
    cards += (w.flashcards || []).length;
    vis += (w.theories || []).filter(th => th.renderer && VIS_DISPATCH[th.renderer]).length;
  }
  return { weeks, nodes, cards, vis };
}

/* ─── Glifos próprios (SVG à mão) ───────────────────────── */
const GLYPH = {
  folder: `<svg viewBox="0 0 56 56" aria-hidden="true"><path d="M6 16h18l4-5h22v34H6z" fill="#D8C79F"/><path d="M6 24h44" stroke="#151210" stroke-width="2"/><path d="M12 32h24M12 38h16" stroke="#151210" stroke-width="2"/></svg>`,
  string: `<svg viewBox="0 0 56 56" aria-hidden="true" fill="none"><path d="M12 14 Q30 8 44 20 T40 44 Q26 50 14 40 T12 14" stroke="#E24B48" stroke-width="1.6"/><path d="M12 14 L44 20 M44 20 L40 44 M14 40 L44 20" stroke="#D8C79F" stroke-width="1.2" opacity=".8"/><rect x="8" y="10" width="9" height="7" fill="#D8C79F"/><rect x="40" y="16" width="9" height="7" fill="#D8C79F"/><rect x="36" y="40" width="9" height="7" fill="#D8C79F"/><rect x="10" y="36" width="9" height="7" fill="#D8C79F"/><circle cx="28" cy="27" r="2.4" fill="#E9E2D4"/></svg>`,
  hubSmall: `<svg viewBox="0 0 26 26" aria-hidden="true" fill="none"><path d="M5 6 L21 9 L18 21 L6 18 Z" stroke="#E24B48" stroke-width="1.2"/><path d="M5 6 L18 21 M21 9 L6 18" stroke="currentColor" stroke-width="1" opacity=".7"/><rect x="3" y="4" width="5" height="4" fill="currentColor"/><rect x="18" y="7" width="5" height="4" fill="currentColor"/><rect x="15" y="19" width="5" height="4" fill="currentColor"/><rect x="4" y="16" width="5" height="4" fill="currentColor"/></svg>`,
  trail: `<svg viewBox="0 0 26 26" aria-hidden="true" fill="none"><path d="M4 20 C8 8 14 8 18 14 S22 6 23 5" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 2"/><circle cx="4" cy="20" r="2" fill="currentColor"/><circle cx="23" cy="5" r="2" fill="currentColor"/></svg>`,
};

/* ─── Casca: topo, gaveta, rodapé ───────────────────────── */
function renderTopNav(r) {
  const el = document.getElementById('topNav');
  const view = r ? r.view : 'home';
  el.innerHTML = `
    <a href="#home" class="hide-m ${view === 'home' || view === 'subject' || view === 'week' || view === 'review' ? 'on' : ''}">${T('subjects')}</a>
    <a href="#hub" class="${view === 'hub' ? 'on' : ''}">${T('hubShort')}</a>
    <button type="button" class="lang" id="langBtn" aria-label="${lang === 'pt' ? 'Switch to English' : 'Mudar para português'}">${lang === 'pt' ? '<b>PT</b> · EN' : 'PT · <b>EN</b>'}</button>`;
  document.getElementById('langBtn').addEventListener('click', toggleLang);
}

function renderDrawer(r) {
  const nav = document.getElementById('drawerNav');
  const active = r && r.subject && r.subject.id ? r.subject : (r && r.view === 'hub' && r.subject ? getSubject(r.subject) : null);
  const hash = location.hash || '#home';
  const subjects = window.SUBJECTS.map(s => {
    const on = active && active.id === s.id && r.view !== 'hub';
    let weeks = '';
    if (on) {
      weeks = '<div class="dr-weeks">' + subjectWeekNums(s).map(n => {
        const h = `#${s.id}/week-${n}`;
        const isOn = hash.split('/').slice(0, 2).join('/') === h;
        const rv = (s.reviews || []).find(x => x.after === n);
        return `<a class="dr-week ${isOn ? 'on' : ''}" href="${h}" ${isOn ? 'aria-current="page"' : ''}><b>${wnum(n)}</b><span>${esc(weekTitle(s.id, n))}</span></a>` +
          (rv ? `<a class="dr-rev ${hash === `#${s.id}/${rv.id}` ? 'on' : ''}" href="#${s.id}/${rv.id}">${T('review')} ${rv.range[0]}–${rv.range[1]}</a>` : '');
      }).join('') + '</div>';
    }
    return `<a class="dr-subj ${on ? 'on' : ''}" href="#${s.id}"><span class="n">${partNum(s)}</span><span class="t">${esc(t(s.name))}</span></a>${weeks}`;
  }).join('');
  nav.innerHTML = `
    <div class="dr-h">${T('subjects')}</div>
    ${subjects}
    <div class="dr-h">${T('modes')}</div>
    <a class="dr-mode ${r && r.view === 'hub' ? 'on' : ''}" href="#hub">${GLYPH.hubSmall}<span>${T('hub')}</span></a>
    <span class="dr-mode soon" aria-disabled="true">${GLYPH.trail}<span>${T('trails')}</span><small>${T('soon')}</small></span>`;
}

function renderFoot() { document.getElementById('foot').textContent = T('credit'); }

function openDrawer(open) {
  const b = document.body, btn = document.getElementById('menuBtn'), scrim = document.getElementById('scrim');
  b.classList.toggle('drawer-open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? T('navClose') : T('navOpen'));
  scrim.hidden = !open;
}
function toggleDrawer() { openDrawer(!document.body.classList.contains('drawer-open')); }

function toggleLang() {
  lang = lang === 'pt' ? 'en' : 'pt';
  storeSet(STORE.lang, lang);
  document.documentElement.lang = lang;
  const y = window.scrollY;
  route(true);
  window.scrollTo(0, y);
}

/* ─── Home: capas de dossiê ─────────────────────────────── */
function coverHTML(s, opts) {
  const wide = !!(opts && opts.wide);
  const nums = subjectWeekNums(s);
  const folders = nums.map(n => {
    const rv = (s.reviews || []).find(x => x.after === n);
    const title = wide ? esc(weekTitle(s.id, n)) : esc(shortTitle(weekTitle(s.id, n)));
    return `<a class="folder" href="#${s.id}/week-${n}"><b>${wnum(n)}</b>${title}</a>` +
      (rv && wide ? `<a class="folder rev" href="#${s.id}/${rv.id}"><b>R${rv.range[0]}–${rv.range[1]}</b>${T('review')} · ${T('weeks')} ${rv.range[0]}–${rv.range[1]}</a>` : '');
  }).join('');
  const H = wide ? 'h1' : 'h2';
  return `
    <section class="cover" id="cover-${s.id}">
      <div>
        <div class="eyebrow">${esc(s.code)}</div>
        <div class="big">${partNum(s)}</div>
        <${H} class="disp">${esc(t(s.name))}</${H}>
        <p class="lede">${esc(t(s.description))}</p>
        ${s.book ? `<p class="book">${T('book')}: ${esc(s.book.replace(/\.pdf$/i, '').replace(/^EBOOK_ /, ''))}</p>` : ''}
        <div class="acts">
          ${wide ? '' : `<a class="btn" href="#${s.id}">${T('openPart')} · ${s.totalWeeks} ${T('dossiers')}</a>`}
          <a class="btn ghost" href="#hub/${s.id}">${T('openBoard')}</a>
        </div>
      </div>
      <div class="folders ${wide ? 'wide' : ''}" aria-label="${T('weeks')}">${folders}</div>
    </section>`;
}
function shortTitle(s) {
  s = String(s).replace(/\s*[—–:(].*$/, '');
  return s.length > 26 ? s.slice(0, 24).trim() + '…' : s;
}

function renderHome() {
  const f = courseFigures();
  const covers = window.SUBJECTS.map(s => coverHTML(s)).join('');
  setMain(`
    <section class="home-hero">
      <div>
        <div class="eyebrow">${T('heroEyebrow')}</div>
        <h1 class="disp">Study Hub</h1>
        <p class="lede">${T('heroLede')}</p>
        <span class="stamp">${T('openAll')}</span>
      </div>
      <div class="home-figs" aria-label="${T('figNodes')}">
        <div><b>${f.weeks}</b><span>${T('figWeeks')}</span></div>
        <div><b>${f.nodes}</b><span>${T('figNodes')}</span></div>
        <div><b>${f.cards}</b><span>${T('figCards')}</span></div>
        <div><b>${f.vis}</b><span>${T('figVis')}</span></div>
      </div>
    </section>
    <section class="modes" aria-label="${T('modes')}">
      <a class="mode" href="#${window.SUBJECTS[0] ? window.SUBJECTS[0].id : 'home'}">${GLYPH.folder}<div><div class="eyebrow">${T('byWeek')}</div><h3 class="disp">${T('byWeek')}</h3><p>${T('modeWeekDesc')}</p><span class="m">${T('choosePart')} ↓</span></div></a>
      <a class="mode" href="#hub">${GLYPH.string}<div><div class="eyebrow">${T('hubShort')}</div><h3 class="disp">${T('hub')}</h3><p>${T('modeHubDesc')}</p><span class="m">${T('openHub')} →</span></div></a>
    </section>
    ${covers}`, 'Study Hub · University of London');
}

/* ─── Página da matéria ─────────────────────────────────── */
function renderSubject(s) {
  setMain(`<div class="subject-page">${coverHTML(s, { wide: true })}
    <section class="part-conn"><h3 class="disp">${T('partConnH')}</h3><p>${T('partConnP')}</p><a class="btn ghost" href="#hub/${s.id}">${T('openBoard')} →</a></section></div>`,
    `${t(s.name)} · Study Hub`);
}

/* ─── Página da semana: documento contínuo ──────────────── */
function renderWeek(s, num, section) {
  const w = getWeek(s.id, num);
  const populated = isWeekPopulated(s.id, num);
  const secs = populated ? availableSections(w) : [];
  const titlePt = weekTitle(s.id, num, 'pt'), titleEn = weekTitle(s.id, num, 'en');
  const title = weekTitle(s.id, num);
  const prevN = num > 1 ? num - 1 : null, nextN = num < s.totalWeeks ? num + 1 : null;
  const meta = populated ? [
    w.concepts && w.concepts.length ? `${w.concepts.length} ${T('concepts').toLowerCase()}` : '',
    w.theories && w.theories.length ? `${w.theories.length} ${T('theories').toLowerCase()}` : '',
    w.caseStudies && w.caseStudies.length ? `${w.caseStudies.length} ${T('cases').toLowerCase()}` : '',
    w.flashcards && w.flashcards.length ? `${w.flashcards.length} flashcards` : '',
  ].filter(Boolean).join(' · ') : '';

  const tabs = secs.map(d => `<a class="tab" href="#${s.id}/week-${num}/${d.key}" data-key="${d.key}">${T(d.ui)}</a>`).join('');
  let body = '';
  if (!populated) body = `<div class="empty">${T('emptyWeek')}</div>`;
  else body = secs.map((d, i) => sectionHTML(d, i, s, num, w)).join('');

  setMain(`
    <header class="wk-head">
      <div class="crumb"><a href="#${s.id}">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</a> · ${T('dossier')} ${pad2(num)} · ${T('courseWeek', { n: courseWeekNum(s, num) })}</div>
      <div class="wk-grid">
        <div class="big">${pad2(num)}</div>
        <div>
          <h1 class="disp">${esc(title)}</h1>
          ${lang === 'pt' && titleEn !== titlePt ? `<div class="wk-en">${esc(titleEn)}</div>` : ''}
          ${meta ? `<div class="wk-meta">${meta}</div>` : ''}
        </div>
      </div>
      <nav class="wk-pn" aria-label="${T('weeks')}">
        <span>${prevN ? `<a href="#${s.id}/week-${prevN}">‹ <span>${wnum(prevN)}</span> ${esc(weekTitle(s.id, prevN))}</a>` : ''}</span>
        <span>${nextN ? `<a href="#${s.id}/week-${nextN}"><span>${wnum(nextN)}</span> ${esc(weekTitle(s.id, nextN))} ›</a>` : `<a href="#${s.id}">${T('part')} ${partNum(s)} ›</a>`}</span>
      </nav>
    </header>
    ${tabs ? `<nav class="tabs" aria-label="${T('overview')}">${tabs}</nav>` : ''}
    <article class="paper"><div class="inner">${body}</div></article>`,
    `${wnum(num)} · ${title} · ${t(s.name)}`);

  requestAnimationFrame(() => { initVisualizations(); setupScrollSpy(); scrollToSection(section); });
}

function sectionHTML(d, i, s, num, w) {
  let inner = '', count = '';
  switch (d.key) {
    case 'overview':    inner = `<div class="prose">${rich(w.overview)}</div>`; break;
    case 'concepts':    inner = conceptsHTML(w.concepts, s, num); count = w.concepts.length; break;
    case 'theories':    inner = theoriesHTML(w.theories, s, num); count = w.theories.length; break;
    case 'cases':       inner = casesHTML(w.caseStudies); count = w.caseStudies.length; break;
    case 'glossary':    inner = glossaryHTML(w.glossary, `gl-${s.id}-${num}`); count = w.glossary.length; break;
    case 'flashcards':  inner = fcDeck(`fc-${s.id}-${num}`, w.flashcards); count = w.flashcards.length; break;
    case 'authors':     inner = authorsHTML(w.authors); count = w.authors.length; break;
    case 'notes':       inner = notesHTML(w.notes); break;
    case 'links':       inner = linksHTML(w.links); count = w.links.length; break;
    case 'connections': inner = connectionsHTML(w.connections, s); count = w.connections.length; break;
  }
  return `<section class="sec" id="sec-${d.key}" data-key="${d.key}">
    <div class="sec-head"><div><div class="n">§ ${pad2(i + 1)}</div><h2 class="disp">${T(d.ui)}</h2></div>${count ? `<div class="cnt">${count} ${T('items')}</div>` : ''}</div>
    ${inner}
  </section>`;
}

/* conceitos como fichas */
function conceptsHTML(concepts, s, num) {
  const cards = concepts.map((c, i) => {
    const primary = lang === 'pt' ? (c.pt || c.en) : (c.en || c.pt);
    const secondary = lang === 'pt' ? (c.en && c.en !== c.pt ? c.en : '') : (c.pt && c.pt !== c.en ? c.pt : '');
    const slug = window.HUB ? HUB.slugFor(s.id, 'concept', num, i) : null;
    return `<details class="ficha" id="c-${num}-${i}">
      <summary><span class="n">${pad2(i + 1)}</span><span class="t">${esc(primary)}</span>${secondary ? `<span class="en">${esc(secondary)}</span>` : ''}</summary>
      <div class="ficha-body"><div class="prose">${rich(c.definition)}</div>${slug ? `<a class="ficha-hub" href="#hub/${s.id}/${slug}">${T('inHub')} →</a>` : ''}</div>
    </details>`;
  }).join('');
  return `<div class="sec-act"><button type="button" data-open="1">${T('expandAll')}</button><button type="button" data-open="0">${T('collapseAll')}</button></div><div class="fichas">${cards}</div>`;
}

/* teorias com palco */
function theoriesHTML(theories, s, num) {
  let ev = 0;
  return theories.map((th, i) => {
    const nm = nameOf(th);
    const primary = lang === 'pt' ? nm.pt : nm.en;
    const secondary = lang === 'pt' && nm.en !== nm.pt ? nm.en : (lang === 'en' && nm.pt !== nm.en ? nm.pt : '');
    const meta = [
      ...(th.authors || []).map(a => `<span>${esc(a)}</span>`),
      th.year ? `<span class="yr">${esc(th.year)}</span>` : '',
      th.company ? `<span>${esc(th.company)}</span>` : '',
    ].filter(Boolean).join('');
    let extra = '';
    if (th.renderer && VIS_DISPATCH[th.renderer]) {
      ev++;
      extra = `<div class="ev"><span>${T('evidence')} ${pad2(ev)} · ${T('interactive')}</span><span>${T('autoScale')}</span></div>
        <figure class="palco"><div class="stage vis-container" data-renderer="${esc(th.renderer)}" aria-label="${esc(primary)}"></div></figure>`;
    } else if (nm.en.includes('4Vs') || nm.pt.includes('4Vs')) {
      extra = fourVsHTML();
    } else if (nm.en.includes('Conversion') || nm.pt.includes('Conversão')) {
      extra = conversionHTML();
    }
    const slug = window.HUB ? HUB.slugFor(s.id, 'theory', num, i) : null;
    return `<section class="theory" id="th-${num}-${i}">
      <div class="th-n">${T('theory')} ${pad2(i + 1)} ${T('of')} ${pad2(theories.length)}</div>
      <h3 class="disp">${esc(primary)}</h3>
      ${secondary ? `<div class="th-en">${esc(secondary)}</div>` : ''}
      ${meta ? `<div class="th-meta">${meta}</div>` : ''}
      <div class="prose">${rich(th.description)}</div>
      ${extra}
      ${slug ? `<a class="ficha-hub" href="#hub/${s.id}/${slug}">${T('inHub')} →</a>` : ''}
    </section>`;
  }).join('');
}

function casesHTML(cases) {
  return `<div class="cases">${cases.map((c, i) => `
    <article class="case">
      <div class="n">${T('case')} ${pad2(i + 1)}</div>
      <h3 class="disp">${esc(c.company)}</h3>
      <div class="sector">${esc(t(c.sector))}</div>
      <p>${rich(c.lesson)}</p>
    </article>`).join('')}</div>`;
}

function glossaryHTML(glossary, id) {
  return `<input class="gl-search" id="${id}" type="search" placeholder="${T('searchTerm')}" aria-label="${T('glossary')}" autocomplete="off">
    <dl class="gl" id="${id}-list">${glossary.map(g => `<div class="gl-item"><dt>${esc(g.term)}</dt><dd>${rich(g.definition)}</dd></div>`).join('')}</dl>
    <div class="gl-empty" id="${id}-empty" hidden>${T('noTerm')}</div>`;
}

function authorsHTML(authors) {
  return `<div class="authors">${authors.map(a => `
    <div class="author"><div class="ini" aria-hidden="true">${esc(initials(a.name))}</div>
      <div><h3 class="disp">${esc(a.name)}</h3><div class="role">${esc(t(a.role))}</div><p>${rich(a.contribution)}</p></div></div>`).join('')}</div>`;
}

function parseNotes(text) {
  const out = []; const re = /═══\s*([^═]+?)\s*═══/g;
  let m, prevTitle = null, prevEnd = 0, first = true;
  while ((m = re.exec(text))) {
    const body = text.slice(prevEnd, m.index).trim();
    if (!first || body) out.push({ title: prevTitle, body });
    first = false; prevTitle = m[1].trim(); prevEnd = re.lastIndex;
  }
  out.push({ title: prevTitle, body: text.slice(prevEnd).trim() });
  return out.filter(b => b.body || b.title);
}
function notesHTML(notes) {
  const blocks = parseNotes(t(notes));
  return blocks.map(b => {
    const isSrc = /^(FONTES|SOURCES)/i.test(b.title || '');
    return `<div class="note-block ${isSrc ? 'src' : ''}">${b.title ? `<h3>${esc(b.title)}</h3>` : ''}<div class="prose">${isSrc ? esc(b.body) : boldKeys(esc(b.body))}</div></div>`;
  }).join('');
}

function linksHTML(links) {
  return `<div class="links">${links.map(l => {
    const type = ['video', 'article', 'news'].includes(l.type) ? l.type : 'other';
    return `<div class="link"><div class="type">${T(type)}</div><div><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title)}</a>${l.description ? `<p>${esc(t(l.description))}</p>` : ''}</div></div>`;
  }).join('')}</div>`;
}

function connectionsHTML(connections, s) {
  return `<div class="conns">${connections.map(c => {
    const to = c.subject ? getSubject(c.subject) : s;
    if (!to) return '';
    return `<a class="conn" href="#${to.id}/week-${c.week}">
      <div class="to">${T('part')} ${partNum(to)} · ${wnum(c.week)}${to !== s ? ` · ${esc(t(to.name))}` : ''}<b>${esc(weekTitle(to.id, c.week))}</b></div>
      <p>${rich(c.reason)}</p></a>`;
  }).join('')}</div>`;
}

/* ─── Flashcards (estado só na sessão) ──────────────────── */
const fcState = {};
function fcDeck(id, cards) {
  if (!fcState[id]) fcState[id] = { idx: 0, known: [], unknown: [] };
  const st = fcState[id]; st.cards = cards;
  const total = cards.length, fc = cards[st.idx] || cards[0];
  const dots = cards.map((_, i) => `<i class="${st.known.includes(i) ? 'ok' : st.unknown.includes(i) ? 'no' : i === st.idx ? 'cur' : ''}"></i>`).join('');
  return `<div class="fc" id="${id}" data-deck="${id}">
    <div class="fc-top"><div class="fc-dots" aria-hidden="true">${dots}</div><div>${st.known.length} ${T('knew').toLowerCase()} · ${st.unknown.length} ${T('needReview').toLowerCase()}</div></div>
    <div class="fc-card" role="button" tabindex="0" aria-label="Flashcard ${st.idx + 1} ${T('of')} ${total}" data-act="flip">
      <div class="fc-inner">
        <div class="fc-face"><div class="q">${esc(t(fc.q))}</div><span class="hint">${T('reveal')}</span></div>
        <div class="fc-face back"><div class="a">${boldKeys(esc(t(fc.a)))}</div><span class="hint">${T('back')}</span></div>
      </div>
    </div>
    <div class="fc-nav">
      <button type="button" data-act="prev" ${st.idx === 0 ? 'disabled' : ''}>‹ ${T('prev')}</button>
      <span class="fc-pos">${st.idx + 1} / ${total}</span>
      <button type="button" data-act="next" ${st.idx === total - 1 ? 'disabled' : ''}>${T('next')} ›</button>
    </div>
    <div class="fc-score"><button type="button" data-act="knew">✓ ${T('knew')}</button><button type="button" class="no" data-act="review">✗ ${T('needReview')}</button><span class="m" style="margin-left:auto;color:var(--ink3);font-size:11.5px;align-self:center">${T('sessionOnly')}</span></div>
  </div>`;
}
function fcUpdate(id) {
  const el = document.getElementById(id); if (!el) return;
  const st = fcState[id];
  const tmp = document.createElement('div'); tmp.innerHTML = fcDeck(id, st.cards);
  el.replaceWith(tmp.firstElementChild);
}
function fcAction(id, act) {
  const st = fcState[id]; if (!st || !st.cards) return;
  const card = document.querySelector(`#${CSS.escape(id)} .fc-card`);
  if (act === 'flip') { card && card.classList.toggle('flipped'); return; }
  if (act === 'prev') st.idx = Math.max(0, st.idx - 1);
  if (act === 'next') st.idx = Math.min(st.cards.length - 1, st.idx + 1);
  if (act === 'knew' || act === 'review') {
    const arr = act === 'knew' ? st.known : st.unknown, other = act === 'knew' ? st.unknown : st.known;
    if (!arr.includes(st.idx)) arr.push(st.idx);
    const j = other.indexOf(st.idx); if (j > -1) other.splice(j, 1);
    if (st.idx < st.cards.length - 1) st.idx++;
  }
  fcUpdate(id);
  const btn = document.querySelector(`#${CSS.escape(id)} [data-act="${act}"]`);
  if (btn && !btn.disabled) btn.focus();
}

/* ─── Cards especiais (4Vs e Processo de Conversão) ─────── */
function fourVsHTML() {
  const pt = lang === 'pt';
  const dims = [
    { num: 'V1', pt: 'Volume', en: 'Volume',
      highPt: 'Alto volume: economias de escala, especialização, custo baixo por unidade (Toyota, McDonald’s).', highEn: 'High volume: economies of scale, specialisation, low cost per unit (Toyota, McDonald’s).',
      lowPt: 'Baixo volume: flexibilidade, custo unitário maior, menos automação (Pashley Cycles).', lowEn: 'Low volume: flexibility, higher unit cost, less automation (Pashley Cycles).' },
    { num: 'V2', pt: 'Variedade', en: 'Variety',
      highPt: 'Alta variedade: equipamento geral, equipe multifuncional, mais flexibilidade (Intercontinental Hotels).', highEn: 'High variety: general equipment, multi-skilled staff, more flexibility (Intercontinental Hotels).',
      lowPt: 'Baixa variedade: especialização, maior eficiência, processos padronizados (Holiday Inn Express).', lowEn: 'Low variety: specialisation, greater efficiency, standardised processes (Holiday Inn Express).' },
    { num: 'V3', pt: 'Variação na demanda', en: 'Variation in demand',
      highPt: 'Alta variação: o sistema precisa absorver picos e vales; capacidade extra necessária (hotéis de luxo).', highEn: 'High variation: the system must absorb peaks and troughs; extra capacity needed (luxury hotels).',
      lowPt: 'Baixa variação: demanda previsível e estável, utilização máxima dos recursos.', lowEn: 'Low variation: predictable, stable demand, maximum resource utilisation.' },
    { num: 'V4', pt: 'Visibilidade', en: 'Visibility',
      highPt: 'Alta visibilidade: o cliente está presente e interage com o processo (Intercontinental, atendimento personalizado).', highEn: 'High visibility: the customer is present and interacts with the process (Intercontinental, personalised service).',
      lowPt: 'Baixa visibilidade: operações “fechadas”, o cliente não interage (Holiday Inn Express, check-in automático).', lowEn: 'Low visibility: “closed” operations, the customer does not interact (Holiday Inn Express, automated check-in).' },
  ];
  return `<div class="fourv-grid">${dims.map(d => `
    <div class="fourv-card">
      <div class="fourv-card-header"><div class="fourv-num">${d.num}</div><div><div class="fourv-title">${pt ? d.pt : d.en}</div>${pt ? `<div class="fourv-title-en">${d.en}</div>` : ''}</div></div>
      <div class="fourv-spectrum-bar"></div>
      <div class="fourv-spectrum-labels"><span>${pt ? 'Alto ▲' : 'High ▲'}</span><span>${pt ? 'Baixo ▼' : 'Low ▼'}</span></div>
      <div class="fourv-impl"><div class="fourv-impl-label">${pt ? 'Alto' : 'High'}</div>${pt ? d.highPt : d.highEn}</div>
      <div class="fourv-impl"><div class="fourv-impl-label">${pt ? 'Baixo' : 'Low'}</div>${pt ? d.lowPt : d.lowEn}</div>
    </div>`).join('')}</div>
    <div class="fourv-correlation">${pt ? 'Volume e variedade têm relação inversa: alto volume tende à baixa variedade; baixo volume, à alta variedade.' : 'Volume and variety are inversely related: high volume tends towards low variety; low volume towards high variety.'}</div>`;
}
function conversionHTML() {
  const pt = lang === 'pt';
  const inputs = pt ? ['Materiais', 'Informação', 'Pessoas', 'Capital', 'Instalações'] : ['Materials', 'Information', 'Staff', 'Capital', 'Facilities'];
  const outputs = pt ? ['Produtos', 'Serviços'] : ['Products', 'Services'];
  return `<div class="conv-flow">
      <div class="conv-box"><div class="conv-box-label-top">${pt ? 'Entradas' : 'Inputs'}</div><div class="conv-box-title">${pt ? 'Recursos' : 'Resources'}</div><div class="conv-box-items">${inputs.map(i => `<span>${i}</span>`).join('')}</div></div>
      <div class="conv-arrow-col">→</div>
      <div class="conv-box conv-box-proc"><div class="conv-box-label-top">${pt ? 'Transformação' : 'Transformation'}</div><div class="conv-box-title">${pt ? 'Processo' : 'Process'}</div><div class="conv-box-items"><span>Design</span><span>${pt ? 'Produção' : 'Production'}</span><span>${pt ? 'Entrega' : 'Delivery'}</span></div></div>
      <div class="conv-arrow-col">→</div>
      <div class="conv-box"><div class="conv-box-label-top">${pt ? 'Saídas' : 'Outputs'}</div><div class="conv-box-title">${pt ? 'Resultados' : 'Results'}</div><div class="conv-box-items">${outputs.map(o => `<span>${o}</span>`).join('')}</div></div>
    </div>
    <div class="conv-feedback">↺ ${pt ? 'Sistema de feedback: monitora o processo para garantir repetibilidade, consistência e confiabilidade.' : 'Feedback system: monitors the process to ensure repeatability, consistency and reliability.'}</div>`;
}

/* ─── Revisão por bloco ─────────────────────────────────── */
function renderReview(s, reviewId) {
  const r = (s.reviews || []).find(x => x.id === reviewId);
  if (!r) { renderSubject(s); return; }
  const [from, to] = r.range;
  const weeks = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const all = [];
  const blocks = weeks.map(n => {
    const w = getWeek(s.id, n);
    const title = weekTitle(s.id, n);
    if (w && w.flashcards) all.push(...w.flashcards);
    if (!isWeekPopulated(s.id, n)) return `<div class="rev-block"><h3 class="disp"><a href="#${s.id}/week-${n}">${wnum(n)} · ${esc(title)}</a></h3><div class="empty">${T('emptyWeek')}</div></div>`;
    const ov = t(w.overview || '');
    const terms = [
      ...(w.theories || []).map(th => `<span><b>${esc(t(nameOf(th)))}</b></span>`),
      ...(w.concepts || []).map(c => `<span>${esc(lang === 'pt' ? c.pt : c.en)}</span>`),
    ].join('');
    return `<div class="rev-block">
      <h3 class="disp"><a href="#${s.id}/week-${n}">${wnum(n)} · ${esc(title)}</a></h3>
      ${ov ? `<div class="prose">${boldKeys(esc(ov.length > 420 ? ov.slice(0, 420).replace(/\s+\S*$/, '') + '…' : ov))}</div>` : ''}
      ${terms ? `<div class="rev-terms">${terms}</div>` : ''}
    </div>`;
  }).join('');
  const label = (lang === 'pt' ? r.labelPt : r.labelEn).replace(/^[^\wÀ-ÿ]+/, '');
  setMain(`
    <header class="wk-head">
      <div class="crumb"><a href="#${s.id}">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</a> · ${T('review')}</div>
      <div class="wk-grid"><div class="big">R${from}–${to}</div><div><h1 class="disp">${esc(label)}</h1><div class="wk-meta">${T('reviewOf', { a: from, b: to })} · ${all.length} flashcards</div></div></div>
    </header>
    <article class="paper"><div class="inner">
      ${blocks}
      ${all.length ? `<section class="sec" id="sec-flashcards"><div class="sec-head"><div><div class="n">§</div><h2 class="disp">${T('allCards')}</h2></div><div class="cnt">${all.length} ${T('items')}</div></div>${fcDeck(`fc-${s.id}-${reviewId}`, all)}</section>` : ''}
    </div></article>`, `${label} · ${t(s.name)}`);
}

/* ─── Visualizações (03) ────────────────────────────────── */
const VIS_DISPATCH = {
  '4vs-scatter': true, 'radar': true, 'forces': true, 'ladder': true, 'wave': true, 'spectrum': true, 'timeline': true,
  'fourvsCards': true, 'performMatrix': true, 'lifecycle': true, 'genericStrategies': true, 'valueDisciplines': true, 'valueMatrix': true,
  // Operations · Week 3
  'npdFlow': true, 'rdFunnel': true, 'modularVsIntegral': true, 'productPlatform': true,
  // Week 4
  'processTypes': true, 'orderTypes': true, 'processMappingTools': true, 'vsmConcept': true, 'facilityLayouts': true,
  // Week 5
  'scmNetwork': true, 'sourcingCompare': true, 'enterpriseTypes': true, 'derg': true, 'tceAssumptions': true,
  // Week 6
  'kraljicMatrix': true, 'armsVsPartnership': true, 'decouplingPoint': true,
  // Week 7
  'eoqModel': true, 'qpSystems': true, 'mrpTree': true, 'abcAnalysis': true,
  // Week 8
  'leanElements': true, 'sevenWastes': true, 'fiveS': true, 'kanbanPull': true,
  // Week 9
  'qualityDimensions': true, 'qualityEvolution': true, 'sevenTools': true, 'spcChart': true,
  // Week 10
  'industry40': true, 'digitizationVsDigital': true, 'printing3dSupply': true, 'amazonVsWalmart': true,
  // Marketing · Week 1
  'marketingEnvironment': true, 'microMacroCompare': true, 'macroForces': true,
  // Week 2
  'swotMatrix': true, 'portersForces': true, 'pestle': true,
  // Week 3 (STP)
  'stpFunnel': true, 'segmentationBases': true, 'targetingStrategies': true, 'damasTest': true, 'positioningMap': true, 'stpInPractice': true,
  // Week 4 (Branding)
  'brandCloud': true, 'brandBenefits': true, 'equityVsValue': true, 'brandEquityDrivers': true, 'brandFinance500': true, 'kellerPyramid': true,
  // Week 5 (Internal & External Branding)
  'insideOut': true, 'internalVsExternal': true, 'internalBrandingLadder': true, 'internalStrategies': true, 'jabesEvidence': true, 'externalRefresh': true,
  // Week 6 (4 Ps)
  'fourPs': true, 'productFeatures': true, 'pricingStrategies': true, 'placeDistribution': true, 'promotionalMix': true, 'imcLadder': true,
  // Week 7 (7 Ps)
  'sevenPs': true, 'serviceIHIP': true, 'peopleLayers': true, 'serviceProcess': true, 'physicalEvidence': true, 'richardMille': true,
  // Week 8 (Digital)
  'digitalValue': true, 'poemModel': true, 'multiVsOmni': true, 'omniTransition': true, 'socialMedia': true, 'dataPrivacySecurity': true,
  // Week 9 (Value Chain)
  'valueChainMap': true, 'competitiveAdvantage': true, 'valueLinkages': true, 'valueChainSteps': true, 'valueChainBenefits': true, 'cocaColaVC': true,
  // Week 10 (Ethics, CSR & Sustainability)
  'ethicsLevels': true, 'universalismRelativism': true, 'tripleBottomLine': true, 'carrollPyramid': true, 'sustainableMarketing': true, 'greenwashing': true,
};
function initSingleVis(el) {
  el.setAttribute('data-vis-init', '1');
  const renderer = el.getAttribute('data-renderer');
  const fn = `vis_${renderer.replace(/-/g, '_')}`;
  if (typeof window[fn] === 'function') {
    try { window[fn](el, lang, {}); } catch (e) { console.error('renderer', renderer, e); }
  }
}
function initVisualizations() {
  document.querySelectorAll('.stage[data-renderer]').forEach(el => { if (!el.hasAttribute('data-vis-init')) initSingleVis(el); });
}

/* ─── Sumário fixo: scroll spy + âncoras ────────────────── */
let spy = null;
function setupScrollSpy() {
  if (spy) { spy.disconnect(); spy = null; }
  const secs = [...document.querySelectorAll('.sec[data-key]')];
  const tabs = [...document.querySelectorAll('.tab[data-key]')];
  if (!secs.length || !tabs.length || !('IntersectionObserver' in window)) return;
  const visible = new Map();
  const update = () => {
    let best = null;
    for (const sec of secs) { if (visible.get(sec.dataset.key)) { best = sec.dataset.key; break; } }
    if (!best) return;
    tabs.forEach(tb => tb.classList.toggle('on', tb.dataset.key === best));
    const on = tabs.find(tb => tb.dataset.key === best);
    if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };
  spy = new IntersectionObserver(entries => {
    entries.forEach(e => visible.set(e.target.dataset.key, e.isIntersecting));
    update();
  }, { rootMargin: `-${56 + 44 + 10}px 0px -55% 0px`, threshold: 0 });
  secs.forEach(sec => spy.observe(sec));
}
function scrollToSection(key) {
  if (!key) { window.scrollTo(0, 0); return; }
  const el = document.getElementById(`sec-${key}`);
  if (el) el.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0);
}

/* ─── Render helpers ────────────────────────────────────── */
function setMain(html, title) {
  const main = document.getElementById('main');
  main.innerHTML = html;
  if (title) document.title = title;
}

/* ─── Rotas ─────────────────────────────────────────────── */
function parseHash() {
  let h = (location.hash || '#home').replace(/^#/, '').replace(/\?.*$/, '');
  const legacyWeek = h.match(/^week-(\d+)$/), legacyReview = h.match(/^r(\d)$/);
  if (legacyWeek) { const n = +legacyWeek[1]; return { redirect: n <= 10 ? `#operations-management/week-${n}` : `#marketing-strategy/week-${n - 10}` }; }
  if (legacyReview) { const n = +legacyReview[1]; return { redirect: n <= 2 ? `#operations-management/r${n}` : `#marketing-strategy/r${n - 2}` }; }
  if (h === 'dashboard') return { redirect: '#home' };
  const seg = h.split('/');
  if (seg[0] === 'hub') return { view: 'hub', subject: seg[1] ? decodeURIComponent(seg[1]) : null, slug: seg[2] ? decodeURIComponent(seg[2]) : null };
  const s = getSubject(seg[0]);
  if (!s) return { view: 'home' };
  if (!seg[1]) return { view: 'subject', subject: s };
  const wm = seg[1].match(/^week-(\d+)$/);
  if (wm) return { view: 'week', subject: s, week: +wm[1], section: seg[2] || null };
  if (/^r\d+$/.test(seg[1])) return { view: 'review', subject: s, review: seg[1] };
  return { view: 'subject', subject: s };
}

function route(force) {
  const r = parseHash();
  if (r.redirect) { location.replace(r.redirect); return; }
  // mesma semana, só a seção mudou: rola sem re-renderizar
  if (!force && lastRoute && r.view === 'week' && lastRoute.view === 'week' && lastRoute.subject === r.subject && lastRoute.week === r.week) {
    lastRoute = r; scrollToSection(r.section); renderDrawer(r); return;
  }
  lastRoute = r;
  currentSubject = r.view === 'hub' ? (r.subject ? getSubject(r.subject) : null) : (r.subject || null);
  openDrawer(false);
  renderTopNav(r); renderDrawer(r); renderFoot();
  if (spy) { spy.disconnect(); spy = null; }
  switch (r.view) {
    case 'home':    renderHome(); break;
    case 'subject': renderSubject(r.subject); break;
    case 'week':    renderWeek(r.subject, r.week, r.section); break;
    case 'review':  renderReview(r.subject, r.review); break;
    case 'hub':     if (window.HUB) HUB.render(r); else renderHome(); break;
  }
  if (r.view !== 'week') window.scrollTo(0, 0);
  storeSet(STORE.last, location.hash || '#home');
}

/* ─── Eventos delegados ─────────────────────────────────── */
function bindEvents() {
  document.getElementById('menuBtn').addEventListener('click', toggleDrawer);
  document.getElementById('scrim').addEventListener('click', () => openDrawer(false));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) { openDrawer(false); document.getElementById('menuBtn').focus(); }
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      if (lastRoute && lastRoute.view === 'hub') { const inp = document.getElementById('hubSearch'); if (inp) inp.focus(); }
      else location.hash = '#hub';
    }
  });
  const main = document.getElementById('main');
  main.addEventListener('click', e => {
    const fcBtn = e.target.closest('.fc [data-act]');
    if (fcBtn) { const deck = fcBtn.closest('.fc'); fcAction(deck.dataset.deck, fcBtn.dataset.act); return; }
    const secBtn = e.target.closest('.sec-act button[data-open]');
    if (secBtn) { secBtn.closest('.sec').querySelectorAll('details.ficha').forEach(d => { d.open = secBtn.dataset.open === '1'; }); return; }
  });
  main.addEventListener('keydown', e => {
    const card = e.target.closest('.fc-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fcAction(card.closest('.fc').dataset.deck, 'flip'); }
  });
  main.addEventListener('input', e => {
    const inp = e.target.closest('.gl-search');
    if (inp) {
      const q = inp.value.trim().toLowerCase();
      const items = document.querySelectorAll(`#${CSS.escape(inp.id)}-list .gl-item`);
      let shown = 0;
      items.forEach(it => { const hit = !q || it.textContent.toLowerCase().includes(q); it.classList.toggle('hidden', !hit); if (hit) shown++; });
      const empty = document.getElementById(`${inp.id}-empty`); if (empty) empty.hidden = shown > 0;
    }
  });
  // após a fonte carregar, os renderers já nasceram com fallback; nada a fazer
}

/* ─── Init ──────────────────────────────────────────────── */
function init() {
  cleanLegacyStorage();
  document.documentElement.lang = lang;
  bindEvents();
  window.addEventListener('hashchange', () => route());
  if (window.HUB) HUB.build();
  route();
}
document.addEventListener('DOMContentLoaded', init);
