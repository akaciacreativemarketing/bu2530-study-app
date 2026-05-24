/* ─── State ─────────────────────────────────────────────── */
window.WEEKS = window.WEEKS || {};
let lang = localStorage.getItem('bu2530-lang') || 'en';

const WEEK_META = {
  1:  { part: 1, titlePt: 'O que é Gestão de Operações?',       titleEn: 'What is Operations Management?' },
  2:  { part: 1, titlePt: 'Estratégia de Operações',            titleEn: 'Operations Strategy' },
  3:  { part: 1, titlePt: 'Projetando Produtos e Serviços',     titleEn: 'Designing Products and Services' },
  4:  { part: 1, titlePt: 'Design de Processos',                titleEn: 'Process Design' },
  5:  { part: 1, titlePt: 'Design de Rede de Suprimentos',      titleEn: 'Supply Network Design' },
  6:  { part: 1, titlePt: 'Gestão da Cadeia e Relacionamentos', titleEn: 'Supply Chain & Relationship Management' },
  7:  { part: 1, titlePt: 'Gestão de Estoque',                  titleEn: 'Inventory Management' },
  8:  { part: 1, titlePt: 'Operações Enxutas',                  titleEn: 'Lean Operations' },
  9:  { part: 1, titlePt: 'Gestão da Qualidade',                titleEn: 'Quality Management' },
  10: { part: 1, titlePt: 'Futuro da Gestão de Operações',      titleEn: 'Future Directions in Operations Management' },
  11: { part: 2, titlePt: 'Auditoria do Ambiente de Marketing', titleEn: 'The Marketing Environmental Audit' },
  12: { part: 2, titlePt: 'Auditoria Macro e Micro Ambiental',  titleEn: 'Macro & Micro Marketing Environmental Audit' },
  13: { part: 2, titlePt: 'Segmentação, Alvo e Posicionamento', titleEn: 'Segmenting, Targeting and Positioning (STP)' },
  14: { part: 2, titlePt: 'Branding',                           titleEn: 'Branding' },
  15: { part: 2, titlePt: 'Branding Interno e Externo',         titleEn: 'Internal and External Branding' },
  16: { part: 2, titlePt: 'Mix de Marketing Tradicional — 4Ps', titleEn: 'The Traditional Marketing Mix — the 4Ps' },
  17: { part: 2, titlePt: 'Mix de Marketing Estendido — 7Ps',   titleEn: 'The Extended Marketing Mix — the 7Ps' },
  18: { part: 2, titlePt: 'Marketing na Era Digital',           titleEn: 'Marketing in the Digital Age' },
  19: { part: 2, titlePt: 'Cadeia de Valor de Porter',          titleEn: "Porter's Value Chain" },
  20: { part: 2, titlePt: 'Marketing Ético e RSC',              titleEn: 'Ethical Marketing and CSR' },
};

const REVIEWS = [
  { id: 'r1', range: [1,5],   labelPt: '📋 Revisão — Semanas 1–5',  labelEn: '📋 Review — Weeks 1–5',   after: 5  },
  { id: 'r2', range: [6,10],  labelPt: '📋 Revisão — Semanas 6–10', labelEn: '📋 Review — Weeks 6–10',  after: 10 },
  { id: 'r3', range: [11,15], labelPt: '📋 Revisão — Sem. 11–15',   labelEn: '📋 Review — Weeks 11–15', after: 15 },
  { id: 'r4', range: [16,20], labelPt: '📋 Revisão — Sem. 16–20',   labelEn: '📋 Review — Weeks 16–20', after: 20 },
];

const SECTION_DEFS = [
  { key: 'overview',    icon: '📋', pt: 'Visão Geral',           en: 'Overview'               },
  { key: 'theories',   icon: '🧩', pt: 'Teorias & Frameworks',  en: 'Theories & Frameworks'  },
  { key: 'cases',      icon: '🏢', pt: 'Casos de Estudo',       en: 'Case Studies'           },
  { key: 'concepts',   icon: '🔑', pt: 'Conceitos-chave',       en: 'Key Concepts'           },
  { key: 'flashcards', icon: '🃏', pt: 'Flashcards',            en: 'Flashcards'             },
  { key: 'glossary',   icon: '📖', pt: 'Glossário',             en: 'Glossary'               },
  { key: 'authors',    icon: '👤', pt: 'Autores-chave',         en: 'Key Authors'            },
  { key: 'notes',      icon: '📝', pt: 'Notas Completas',       en: 'Full Notes'             },
  { key: 'links',      icon: '🎬', pt: 'Material Complementar', en: 'Supplementary Material' },
  { key: 'connections',icon: '🔗', pt: 'Conexões',              en: 'Connections'            },
];

/* ─── XP System ─────────────────────────────────────────── */
const XP_LEVELS = [
  { min:0,    name:{ pt:'Estagiário(a) de Marketing', en:'Marketing Intern'   } },
  { min:80,   name:{ pt:'Analista Jr.',               en:'Junior Analyst'     } },
  { min:200,  name:{ pt:'Coordenador(a)',              en:'Coordinator'        } },
  { min:400,  name:{ pt:'Gerente de Marketing',        en:'Marketing Manager'  } },
  { min:700,  name:{ pt:'Especialista Sênior',         en:'Senior Specialist'  } },
  { min:1100, name:{ pt:'Diretor(a) de Marketing',     en:'Marketing Director' } },
  { min:1600, name:{ pt:'VP de Marketing',             en:'VP of Marketing'    } },
  { min:2200, name:{ pt:'CMO',                         en:'CMO'                } },
];

function getXP() { return parseInt(localStorage.getItem('bu2530-xp') || '0'); }
function setXP(v) { localStorage.setItem('bu2530-xp', String(Math.max(0, v))); }
function addXP(n) { setXP(getXP() + n); updateXPBar(); }

function getLevelInfo(xp) {
  let lvl = XP_LEVELS[0];
  for (const l of XP_LEVELS) { if (xp >= l.min) lvl = l; else break; }
  const idx = XP_LEVELS.indexOf(lvl);
  const next = XP_LEVELS[idx + 1];
  const pct = next ? Math.round(((xp - lvl.min) / (next.min - lvl.min)) * 100) : 100;
  return { name: t(lvl.name), nextXP: next ? next.min : null, pct, idx };
}

function updateXPBar() {
  const xp = getXP();
  const info = getLevelInfo(xp);
  const el = document.getElementById('xpBar');
  if (!el) return;

  const r = 18, c = r + 2, sz = (c + 2) * 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (info.pct / 100) * circumference;
  const nextTxt = info.nextXP ? `${info.nextXP - xp} XP` : 'MAX';

  el.innerHTML = `
    <div class="xp-bar-wrap">
      <div style="display:flex;align-items:center;gap:12px;">
        <svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" style="flex-shrink:0;">
          <circle cx="${c+2}" cy="${c+2}" r="${r}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="3.5"/>
          <circle cx="${c+2}" cy="${c+2}" r="${r}" fill="none" stroke="url(#xpGrad)" stroke-width="3.5"
            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
            stroke-linecap="round" transform="rotate(-90 ${c+2} ${c+2})"
            style="transition:stroke-dashoffset .7s cubic-bezier(.4,0,.2,1)"/>
          <defs>
            <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#FDE68A"/>
            </linearGradient>
          </defs>
          <text x="${c+2}" y="${c+2}" text-anchor="middle" dominant-baseline="central"
            fill="#F59E0B" font-size="9" font-weight="800" font-family="-apple-system,sans-serif"
          >${info.pct}%</text>
        </svg>
        <div style="flex:1;min-width:0;">
          <div class="xp-level-name">${info.name}</div>
          <div class="xp-count">${xp} XP · ${nextTxt} ${lang === 'pt' ? 'p/ próx.' : 'to next'}</div>
        </div>
      </div>
    </div>`;
}

/* ─── Achievements ──────────────────────────────────────── */
const ACHIEVEMENTS = [
  { id: 'first_step',  icon: '🚀', pt: 'Primeiro Passo',      en: 'First Step',        check: () => weekStatus(1) === 'done' },
  { id: 'strategist',  icon: '♟️', pt: 'Estrategista',         en: 'Strategist',        check: () => weekStatus(2) === 'done' },
  { id: 'ops_master',  icon: '⚙️', pt: 'Mestre de Operações', en: 'Ops Master',        check: () => [1,2,3,4,5,6,7,8,9,10].every(n => weekStatus(n) === 'done') },
  { id: 'flashcard',   icon: '🃏', pt: 'Flashcard Pro',        en: 'Flashcard Pro',     check: () => parseInt(localStorage.getItem('bu2530-fc-count') || '0') >= 50 },
  { id: 'bilingual',   icon: '🌍', pt: 'Bilíngue',             en: 'Bilingual',         check: () => parseInt(localStorage.getItem('bu2530-lang-toggle') || '0') >= 5 },
  { id: 'cmo',         icon: '👑', pt: 'CMO',                  en: 'CMO',               check: () => getXP() >= 2200 },
];

function trackFcScore() {
  const n = parseInt(localStorage.getItem('bu2530-fc-count') || '0') + 1;
  localStorage.setItem('bu2530-fc-count', String(n));
}

function trackLangToggle() {
  const n = parseInt(localStorage.getItem('bu2530-lang-toggle') || '0') + 1;
  localStorage.setItem('bu2530-lang-toggle', String(n));
}

/* ─── Toast + Confetti ──────────────────────────────────── */
function showToast(msg) {
  document.querySelectorAll('.toast').forEach(el => el.remove());
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.classList.add('hidden'); setTimeout(() => el.remove(), 350); }, 2800);
}

function launchConfetti() {
  const wrap = document.createElement('div');
  wrap.className = 'confetti-wrap';
  const colors = ['#C8102E','#003865','#10B981','#F59E0B','#7C3AED','#0EA5E9','#EC4899'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;background:${colors[i%colors.length]};animation-duration:${1.4+Math.random()*1.8}s;animation-delay:${Math.random()*1}s;transform:rotate(${Math.random()*360}deg);width:${5+Math.random()*7}px;height:${8+Math.random()*10}px;`;
    wrap.appendChild(p);
  }
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), 4000);
}

/* ─── Helpers ───────────────────────────────────────────── */
function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return lang === 'en' ? (obj.en || obj.pt || '') : (obj.pt || obj.en || '');
}

function weekTitle(num) {
  const w = window.WEEKS[num];
  if (w && w.title) return t(w.title);
  const m = WEEK_META[num];
  if (!m) return `Week ${num}`;
  return lang === 'en' ? m.titleEn : m.titlePt;
}

function weekStatus(num) {
  const ls = localStorage.getItem(`bu2530-week-${num}-status`);
  if (ls) return ls;
  return (window.WEEKS[num] && window.WEEKS[num].status) || 'not-started';
}

function statusLabel(s) {
  const map = {
    'not-started': { pt: '⬜ Não iniciado', en: '⬜ Not started' },
    'in-progress': { pt: '🔄 Em andamento', en: '🔄 In progress' },
    'done':        { pt: '✅ Concluído',    en: '✅ Done' },
  };
  return t(map[s] || map['not-started']);
}

function statusBadgeClass(s) {
  return { 'not-started': 'badge-not-started', 'in-progress': 'badge-in-progress', 'done': 'badge-done' }[s] || 'badge-not-started';
}

function initials(name) {
  return name.split(' ').filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

function isWeekPopulated(num) {
  const w = window.WEEKS[num];
  if (!w) return false;
  return !!(w.overview || w.concepts?.length || w.theories?.length || w.caseStudies?.length);
}

function getAvailableSections(num) {
  const w = window.WEEKS[num];
  if (!w) return [];
  const keys = [];
  if (w.overview)            keys.push('overview');
  if (w.theories?.length)    keys.push('theories');
  if (w.caseStudies?.length) keys.push('cases');
  if (w.concepts?.length)    keys.push('concepts');
  if (w.flashcards?.length)  keys.push('flashcards');
  if (w.glossary?.length)    keys.push('glossary');
  if (w.authors?.length)     keys.push('authors');
  if (w.notes)               keys.push('notes');
  if (w.links?.length)       keys.push('links');
  if (w.connections?.length) keys.push('connections');
  return keys;
}

/* ─── Section Progress ───────────────────────────────────── */
function getSectionState(weekNum) {
  try { return JSON.parse(localStorage.getItem(`bu2530-sections-${weekNum}`)) || {}; }
  catch { return {}; }
}

function checkWeekCompletion(weekNum, state) {
  const available = getAvailableSections(weekNum);
  if (!available.length) return;
  const allDone = available.every(k => state[k]);
  const anyDone = available.some(k => state[k]);
  if (allDone) {
    localStorage.setItem(`bu2530-week-${weekNum}-status`, 'done');
  } else if (anyDone) {
    localStorage.setItem(`bu2530-week-${weekNum}-status`, 'in-progress');
  } else {
    localStorage.removeItem(`bu2530-week-${weekNum}-status`);
  }
}

/* ─── Language Toggle ───────────────────────────────────── */
function toggleLang() {
  lang = lang === 'pt' ? 'en' : 'pt';
  localStorage.setItem('bu2530-lang', lang);
  trackLangToggle();
  document.getElementById('langFlag').textContent = lang === 'pt' ? '🇧🇷' : '🇬🇧';
  document.getElementById('langText').textContent = lang === 'pt' ? 'PT+EN' : 'EN';
  renderSidebar();
  route();
}

/* ─── Sidebar ───────────────────────────────────────────── */
function renderSidebar() {
  updateXPBar();
  const hash = window.location.hash || '#dashboard';
  const nav = document.getElementById('sidebarNav');
  const footer = document.getElementById('sidebarFooter');
  const pt1 = lang === 'pt';

  const ops = Object.keys(WEEK_META).map(Number).filter(n => WEEK_META[n].part === 1);
  const mkt = Object.keys(WEEK_META).map(Number).filter(n => WEEK_META[n].part === 2);

  function reviewAfter(n) {
    const r = REVIEWS.find(r => r.after === n);
    if (!r) return '';
    const h = `#${r.id}`;
    return `<a href="${h}" class="nav-review ${hash === h ? 'active' : ''}">${pt1 ? r.labelPt : r.labelEn}</a>`;
  }

  function weekItem(n) {
    const h = `#week-${n}`;
    const status = weekStatus(n);
    return `
      <a href="${h}" class="nav-week-item status-${status} ${hash === h ? 'active' : ''}">
        <span class="nav-status-dot"></span>
        <span class="nav-week-num">W${n}</span>
        <span class="nav-week-title">${weekTitle(n)}</span>
      </a>
      ${reviewAfter(n)}
    `;
  }

  nav.innerHTML = `
    <div class="nav-home">
      <a href="#dashboard" class="${(hash === '#dashboard' || hash === '') ? 'active' : ''}">
        🏠 Dashboard
      </a>
    </div>
    <div class="nav-section-header">${pt1 ? 'Gestão de Operações' : 'Operations Management'}</div>
    ${ops.map(weekItem).join('')}
    <div class="nav-section-header" style="margin-top:10px">${pt1 ? 'Estratégia de Marketing' : 'Marketing Strategy'}</div>
    ${mkt.map(weekItem).join('')}
  `;

  footer.innerHTML = pt1
    ? `Desenvolvido por João Rodrigues<br>Marketing BSc · University of London`
    : `Developed by João Rodrigues<br>Marketing BSc · University of London`;
}

/* ─── Section Wrapper ───────────────────────────────────── */
function sectionWrapper(key, weekNum, bodyHtml, state) {
  const def = SECTION_DEFS.find(d => d.key === key);
  const isOk = !!(state && state[key]);
  const label = lang === 'pt' ? def.pt : def.en;
  const pt1 = lang === 'pt';

  return `
    <div class="section ${isOk ? 'is-ok' : ''}" id="sec-${weekNum}-${key}">
      <div class="section-header" onclick="toggleSection(event,'${key}',${weekNum})">
        <div class="section-header-left">
          <span class="section-chevron">›</span>
          <span class="section-icon">${def.icon}</span>
          <span class="section-title">${label}</span>
        </div>
        <div class="section-header-right">
          <button class="ok-btn ${isOk ? 'ok-done' : ''}"
                  onclick="toggleOk(event,'${key}',${weekNum})"
                  title="${pt1 ? 'Marcar como concluído' : 'Mark as done'}">
            ${isOk ? '✓' : '○'}
          </button>
        </div>
      </div>
      <div class="section-body"><div class="section-inner">${bodyHtml}</div></div>
    </div>
  `;
}

/* ─── Toggle Handlers ───────────────────────────────────── */
function toggleSection(e, key, weekNum) {
  if (e.target.closest('.ok-btn')) return;
  const sec = document.getElementById(`sec-${weekNum}-${key}`);
  if (!sec) return;
  const wasOpen = sec.classList.contains('open');
  sec.classList.toggle('open');
  if (!wasOpen) {
    sec.querySelectorAll('.vis-container[data-renderer]').forEach(el => {
      if (!el.hasAttribute('data-vis-init')) initSingleVis(el);
    });
  }
}

function toggleOk(e, key, weekNum) {
  e.stopPropagation();
  const state = getSectionState(weekNum);
  const wasDone = !!state[key];
  const prevStatus = weekStatus(weekNum);

  state[key] = !state[key];
  localStorage.setItem(`bu2530-sections-${weekNum}`, JSON.stringify(state));

  const sec = document.getElementById(`sec-${weekNum}-${key}`);
  const btn = sec && sec.querySelector('.ok-btn');
  if (sec && btn) {
    if (state[key]) {
      sec.classList.add('is-ok');
      btn.classList.add('ok-done');
      btn.textContent = '✓';
    } else {
      sec.classList.remove('is-ok');
      btn.classList.remove('ok-done');
      btn.textContent = '○';
    }
  }

  if (state[key] && !wasDone) {
    addXP(10);
    showToast(lang === 'pt' ? '+10 XP — Seção concluída! 🎯' : '+10 XP — Section done! 🎯');
  } else if (!state[key] && wasDone) {
    addXP(-10);
  }

  checkWeekCompletion(weekNum, state);
  updateProgressRow(weekNum, state);
  renderSidebar();

  const newStatus = weekStatus(weekNum);
  if (newStatus === 'done' && prevStatus !== 'done') {
    addXP(50);
    launchConfetti();
    showToast(lang === 'pt' ? `🏆 +50 XP — Semana ${weekNum} concluída!` : `🏆 +50 XP — Week ${weekNum} done!`);
  }
}

function updateProgressRow(weekNum, state) {
  const available = getAvailableSections(weekNum);
  const done = available.filter(k => state[k]).length;
  const el = document.getElementById(`prog-fill-${weekNum}`);
  const txt = document.getElementById(`prog-text-${weekNum}`);
  if (el) el.style.width = `${available.length ? (done / available.length) * 100 : 0}%`;
  if (txt) txt.textContent = lang === 'pt' ? `${done}/${available.length} seções` : `${done}/${available.length} sections`;
}

/* ─── Dashboard ─────────────────────────────────────────── */
function renderDashboard() {
  const total = 20;
  const done = Object.keys(WEEK_META).filter(n => weekStatus(+n) === 'done').length;
  const inProg = Object.keys(WEEK_META).filter(n => weekStatus(+n) === 'in-progress').length;
  const notStarted = total - done - inProg;
  const ops = Object.keys(WEEK_META).map(Number).filter(n => WEEK_META[n].part === 1);
  const mkt = Object.keys(WEEK_META).map(Number).filter(n => WEEK_META[n].part === 2);
  const pt1 = lang === 'pt';

  const pct = Math.round((done / total) * 100);
  const r = 28, sz = (r + 5) * 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;

  function weekCard(n) {
    const status = weekStatus(n);
    return `
      <div class="week-card status-${status}" onclick="navigate('#week-${n}')">
        <div class="week-card-num">Week ${n}</div>
        <div class="week-card-title">${weekTitle(n)}</div>
        <div class="week-badge ${statusBadgeClass(status)}">${statusLabel(status)}</div>
      </div>`;
  }

  function reviewCard(r) {
    return `
      <div class="week-card review-card" onclick="navigate('#${r.id}')">
        <div class="week-card-num">📋 ${pt1 ? 'Revisão' : 'Review'}</div>
        <div class="week-card-title">${(pt1 ? r.labelPt : r.labelEn).replace('📋 ', '')}</div>
        <div class="week-badge" style="background:rgba(255,255,255,.15);color:#fff;font-size:10px;">
          ${pt1 ? 'Semanas' : 'Weeks'} ${r.range[0]}–${r.range[1]}
        </div>
      </div>`;
  }

  const achievementsHtml = ACHIEVEMENTS.map(a => {
    const unlocked = a.check();
    return `
      <div class="achievement-badge ${unlocked ? 'unlocked' : ''}">
        <div class="achievement-icon ${unlocked ? 'unlocked' : 'locked'}">${a.icon}</div>
        <div class="achievement-name">${pt1 ? a.pt : a.en}</div>
      </div>`;
  }).join('');

  document.getElementById('mainContent').innerHTML = `
    <div class="dash-hero">
      <div class="dash-eyebrow">University of London · Coursera</div>
      <div class="dash-title">BU2530</div>
      <div class="dash-desc">${pt1
        ? 'Gestão de Operações e Estratégia de Marketing. Explore cada semana no seu ritmo — conceitos, teorias, casos e flashcards.'
        : 'Operations Management and Marketing Strategy. Explore each week at your own pace — concepts, theories, cases and flashcards.'
      }</div>
    </div>

    <div class="dash-stats">
      <div class="stat-card">
        <div class="stat-num">${total}</div>
        <div class="stat-label">${pt1 ? 'Semanas totais' : 'Total weeks'}</div>
      </div>
      <div class="stat-card green">
        <div class="stat-num">${done}</div>
        <div class="stat-label">${pt1 ? 'Concluídas' : 'Completed'}</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-num">${inProg}</div>
        <div class="stat-label">${pt1 ? 'Em andamento' : 'In progress'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">${notStarted}</div>
        <div class="stat-label">${pt1 ? 'Não iniciadas' : 'Not started'}</div>
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:24px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:20px 24px;margin-bottom:32px;box-shadow:var(--shadow);">
      <svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}">
        <circle cx="${r+5}" cy="${r+5}" r="${r}" fill="none" stroke="var(--border)" stroke-width="5"/>
        <circle cx="${r+5}" cy="${r+5}" r="${r}" fill="none" stroke="var(--blue)" stroke-width="5"
          stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
          stroke-linecap="round" transform="rotate(-90 ${r+5} ${r+5})"
          style="transition:stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)"/>
        <text x="${r+5}" y="${r+5}" text-anchor="middle" dominant-baseline="central"
          fill="var(--blue)" font-size="12" font-weight="900" font-family="-apple-system,sans-serif">${pct}%</text>
      </svg>
      <div>
        <div style="font-size:13px;font-weight:800;color:var(--blue);margin-bottom:4px;">${pt1 ? 'Progresso do Curso' : 'Course Progress'}</div>
        <div style="font-size:12px;color:var(--text-mid);">${done}/${total} ${pt1 ? 'semanas concluídas' : 'weeks completed'}</div>
      </div>
      <div style="margin-left:auto;">
        <div style="font-size:11px;font-weight:700;color:var(--text-lt);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;">${pt1 ? 'Conquistas' : 'Achievements'}</div>
        <div class="achievement-grid" style="margin-top:0;">${achievementsHtml}</div>
      </div>
    </div>

    <div class="part-header">
      <div class="part-title">${pt1 ? 'Parte 1 — Gestão de Operações' : 'Part 1 — Operations Management'}</div>
      <div class="part-line"></div>
      <div class="part-badge">${pt1 ? 'Semanas 1–10' : 'Weeks 1–10'}</div>
    </div>
    <div class="week-grid">${ops.map(weekCard).join('')}${reviewCard(REVIEWS[0])}${reviewCard(REVIEWS[1])}</div>

    <div class="part-header">
      <div class="part-title">${pt1 ? 'Parte 2 — Estratégia de Marketing' : 'Part 2 — Marketing Strategy'}</div>
      <div class="part-line"></div>
      <div class="part-badge">${pt1 ? 'Semanas 11–20' : 'Weeks 11–20'}</div>
    </div>
    <div class="week-grid">${mkt.map(weekCard).join('')}${reviewCard(REVIEWS[2])}${reviewCard(REVIEWS[3])}</div>
  `;
}

/* ─── Week Page ─────────────────────────────────────────── */
function renderWeek(num) {
  const w = window.WEEKS[num];
  const meta = WEEK_META[num];
  const title = weekTitle(num);
  const status = weekStatus(num);
  const pt1 = lang === 'pt';
  const state = getSectionState(num);
  const available = getAvailableSections(num);
  const doneCount = available.filter(k => state[k]).length;
  const pct = available.length ? Math.round((doneCount / available.length) * 100) : 0;

  const partLabel = pt1
    ? (meta?.part === 1 ? 'Gestão de Operações' : 'Estratégia de Marketing')
    : (meta?.part === 1 ? 'Operations Management' : 'Marketing Strategy');

  let html = `
    <div class="week-hero">
      <div class="week-num-bg">${num}</div>
      <div class="week-hero-tag">Week ${num} · ${partLabel}</div>
      <div class="week-hero-title">${title}</div>
      <div class="week-hero-bottom">
        <span class="week-status-chip">${statusLabel(status)}</span>
        ${available.length ? `
        <div class="week-prog-wrap">
          <span class="week-prog-label" id="prog-text-${num}">${pt1 ? `${doneCount}/${available.length} seções` : `${doneCount}/${available.length} sections`}</span>
          <div class="week-prog-bar">
            <div class="week-prog-fill" id="prog-fill-${num}" style="width:${pct}%"></div>
          </div>
        </div>` : ''}
      </div>
    </div>
  `;

  if (!w || !isWeekPopulated(num)) {
    html += `
      <div class="empty-week">
        <div class="empty-icon">📭</div>
        <div class="empty-title">${pt1 ? 'Conteúdo ainda não adicionado' : 'Content not yet added'}</div>
        <div class="empty-text">${pt1 ? 'Mande o conteúdo desta semana no chat e a plataforma será atualizada.' : "Send this week's content in the chat and the platform will be updated."}</div>
      </div>`;
  } else {
    if (w.overview)            html += sectionWrapper('overview',    num, renderOverviewBody(w.overview),           state);
    if (w.theories?.length)    html += sectionWrapper('theories',    num, renderTheoriesBody(w.theories),           state);
    if (w.caseStudies?.length) html += sectionWrapper('cases',       num, renderCasesBody(w.caseStudies),           state);
    if (w.concepts?.length)    html += sectionWrapper('concepts',    num, renderConceptsBody(w.concepts, num),      state);
    if (w.flashcards?.length)  html += sectionWrapper('flashcards',  num, renderFlashcardsBody(w.flashcards, num),  state);
    if (w.glossary?.length)    html += sectionWrapper('glossary',    num, renderGlossaryBody(w.glossary, num),      state);
    if (w.authors?.length)     html += sectionWrapper('authors',     num, renderAuthorsBody(w.authors),             state);
    if (w.notes)               html += sectionWrapper('notes',       num, renderNotesBody(w.notes),                state);
    if (w.links?.length)       html += sectionWrapper('links',       num, renderLinksBody(w.links),                state);
    if (w.connections?.length) html += sectionWrapper('connections', num, renderConnectionsBody(w.connections),     state);
  }

  document.getElementById('mainContent').innerHTML = html;
  document.getElementById('mainContent').scrollTop = 0;
}

/* ─── Overview ───────────────────────────────────────────── */
function renderOverviewBody(overview) {
  return `<div class="overview-text">${t(overview)}</div>`;
}

/* ─── Concept Cards ──────────────────────────────────────── */
const PILL_COLORS = [
  { bg:'#EFF6FF', text:'#1E40AF', border:'#BFDBFE' },
  { bg:'#F0FDF4', text:'#065F46', border:'#A7F3D0' },
  { bg:'#FEF3C7', text:'#92600A', border:'#FDE68A' },
  { bg:'#FDF4FF', text:'#6B21A8', border:'#E9D5FF' },
  { bg:'#FFF1F2', text:'#9F1239', border:'#FECDD3' },
  { bg:'#F0FDFA', text:'#0F766E', border:'#99F6E4' },
  { bg:'#FFF7ED', text:'#9A3412', border:'#FED7AA' },
  { bg:'#F5F3FF', text:'#5B21B6', border:'#DDD6FE' },
];

const currentConcept = {};

function renderConceptsBody(concepts, weekNum) {
  const cards = concepts.map((c, i) => {
    const col = PILL_COLORS[i % PILL_COLORS.length];
    const num = String(i + 1).padStart(2, '0');
    const label = lang === 'pt' ? c.pt : c.en;
    const enLabel = lang === 'pt' && c.en && c.en !== c.pt ? c.en : '';
    return `
      <div class="concept-card" data-idx="${i}"
        style="background:${col.bg};border-color:${col.border};"
        onclick="selectConcept(${weekNum},${i})">
        <div class="concept-num" style="color:${col.text}">${num}</div>
        <div class="concept-term" style="color:${col.text}">${label}</div>
        ${enLabel ? `<div class="concept-en" style="color:${col.text}">${enLabel}</div>` : ''}
      </div>`;
  }).join('');
  return `
    <div class="concept-grid">${cards}</div>
    <div class="concept-detail-v2" id="cdetail-${weekNum}" style="display:none"></div>`;
}

function selectConcept(weekNum, idx) {
  const w = window.WEEKS[weekNum];
  if (!w?.concepts) return;
  const isSame = currentConcept[weekNum] === idx;
  currentConcept[weekNum] = isSame ? -1 : idx;

  const detail = document.getElementById(`cdetail-${weekNum}`);
  const cards = document.querySelectorAll(`#sec-${weekNum}-concepts .concept-card`);

  cards.forEach((card, i) => {
    const col = PILL_COLORS[i % PILL_COLORS.length];
    card.classList.toggle('active', i === currentConcept[weekNum]);
    if (i === currentConcept[weekNum]) {
      card.style.boxShadow = `0 0 0 2.5px ${col.text}, 0 8px 24px ${col.border}`;
      card.style.transform = 'translateY(-2px)';
    } else {
      card.style.boxShadow = '';
      card.style.transform = '';
    }
  });

  if (isSame || currentConcept[weekNum] === -1) {
    if (detail) detail.style.display = 'none';
    return;
  }
  const c = w.concepts[idx];
  if (detail) {
    detail.style.display = 'block';
    detail.innerHTML = `
      <div class="concept-detail-term">${lang === 'pt' ? c.pt : c.en}</div>
      ${lang === 'pt' && c.en ? `<div class="concept-detail-en">${c.en}</div>` : ''}
      <div class="concept-detail-def">${t(c.definition)}</div>`;
  }
}

/* ─── Theories ───────────────────────────────────────────── */
function renderTheoriesBody(theories) {
  return `<div class="theory-list">${theories.map(th => renderTheoryCard(th)).join('')}</div>`;
}

const VIS_DISPATCH = {
  '4vs-scatter':       true,
  'radar':             true,
  'forces':            true,
  'ladder':            true,
  'wave':              true,
  'spectrum':          true,
  'timeline':          true,
  'fourvsCards':       true,
  'performMatrix':     true,
  'lifecycle':         true,
  'genericStrategies': true,
  'valueDisciplines':  true,
  'valueMatrix':       true,
};

function renderTheoryCard(th) {
  const nameEn = th.name?.en || (typeof th.name === 'string' ? th.name : '');
  const namePt = th.name?.pt || nameEn;

  // Explicit renderer field takes priority over hardcoded name detection
  if (th.renderer && VIS_DISPATCH[th.renderer]) {
    return renderTwoPanelCard(th);
  }

  if (nameEn.includes('4Vs') || namePt.includes('4Vs')) return render4VsCard();
  if (nameEn.includes('Conversion') || namePt.includes('Conversão')) return renderConversionCard(th);

  return renderGenericTheoryCard(th);
}

function renderGenericTheoryCard(th) {
  const nameEn = th.name?.en || (typeof th.name === 'string' ? th.name : '');
  const namePt = th.name?.pt || nameEn;
  return `
    <div class="theory-card">
      ${theoryHead(th, namePt, nameEn)}
      <div class="theory-body">${t(th.description)}</div>
    </div>`;
}

function renderTwoPanelCard(th) {
  const nameEn = th.name?.en || '';
  const namePt = th.name?.pt || nameEn;
  const uid = `vis-${th.renderer}-${Math.random().toString(36).substr(2,5)}`;
  return `
    <div class="theory-card">
      ${theoryHead(th, namePt, nameEn)}
      <div class="theory-two-panel">
        <div class="theory-text-panel">${t(th.description)}</div>
        <div class="theory-vis-panel">
          <div class="vis-container" id="${uid}" data-renderer="${th.renderer}"></div>
        </div>
      </div>
    </div>`;
}

function theoryHead(th, namePt, nameEn) {
  const pt1 = lang === 'pt';
  return `
    <div class="theory-card-head">
      <div class="theory-card-head-left">
        <div class="theory-name">${pt1 ? (namePt || nameEn) : (nameEn || namePt)}</div>
        ${pt1 && nameEn ? `<div class="theory-en">${nameEn}</div>` : ''}
        <div class="theory-meta">
          ${(th.authors||[]).map(a=>`<span class="theory-tag author">${a}</span>`).join('')}
          ${th.year ? `<span class="theory-tag year">${th.year}</span>` : ''}
          ${th.company ? `<span class="theory-tag company">${th.company}</span>` : ''}
        </div>
      </div>
    </div>`;
}

/* ─── Visualization Init ─────────────────────────────────── */
function initSingleVis(el) {
  el.setAttribute('data-vis-init', '1');
  const renderer = el.getAttribute('data-renderer');
  const fnName = `vis_${renderer.replace(/-/g, '_')}`;
  if (typeof window[fnName] === 'function') {
    window[fnName](el, lang, {});
  }
}

function initVisualizations() {
  document.querySelectorAll('.vis-container[data-renderer]').forEach(el => {
    if (!el.hasAttribute('data-vis-init')) initSingleVis(el);
  });
}

/* ─── 4Vs Card ───────────────────────────────────────────── */
function render4VsCard() {
  const pt1 = lang === 'pt';
  const dims = [
    {
      num:'V1', color:'#1E40AF', bg:'#EFF6FF',
      pt:'Volume', en:'Volume',
      highPt:'Alto volume → economias de escala, especialização, custo baixo por unidade (ex: Toyota, McDonald\'s)',
      highEn:'High volume → economies of scale, specialisation, low cost per unit (e.g. Toyota, McDonald\'s)',
      lowPt:'Baixo volume → flexibilidade, custo unitário maior, menos automação (ex: Pashley Cycles)',
      lowEn:'Low volume → flexibility, higher unit cost, less automation (e.g. Pashley Cycles)',
    },
    {
      num:'V2', color:'#065F46', bg:'#F0FDF4',
      pt:'Variedade', en:'Variety',
      highPt:'Alta variedade → equipamento geral, staff multifuncional, mais flexibilidade (ex: Intercontinental Hotels)',
      highEn:'High variety → general equipment, multi-skilled staff, more flexibility (e.g. Intercontinental Hotels)',
      lowPt:'Baixa variedade → especialização, maior eficiência, processos padronizados (ex: Holiday Inn Express)',
      lowEn:'Low variety → specialisation, greater efficiency, standardised processes (e.g. Holiday Inn Express)',
    },
    {
      num:'V3', color:'#92600A', bg:'#FEF3C7',
      pt:'Variação na Demanda', en:'Variation in Demand',
      highPt:'Alta variação → sistema precisa absorver picos e vales; capacidade extra necessária (ex: hotéis de luxo)',
      highEn:'High variation → system must absorb peaks and troughs; extra capacity needed (e.g. luxury hotels)',
      lowPt:'Baixa variação → demanda previsível, estável, utilização máxima de recursos',
      lowEn:'Low variation → predictable, stable demand, maximum resource utilisation',
    },
    {
      num:'V4', color:'#6B21A8', bg:'#FDF4FF',
      pt:'Visibilidade', en:'Visibility',
      highPt:'Alta visibilidade → cliente presente e interage com o processo (ex: Intercontinental — atendimento personalizado)',
      highEn:'High visibility → customer present and interacts with the process (e.g. Intercontinental — personalised service)',
      lowPt:'Baixa visibilidade → operações "fechadas", cliente não interage (ex: Holiday Inn Express — check-in automático)',
      lowEn:'Low visibility → "closed" operations, customer does not interact (e.g. Holiday Inn Express — automated check-in)',
    },
  ];

  const cards = dims.map(d => `
    <div class="fourv-card" style="background:${d.bg};border-color:${d.color}30;">
      <div class="fourv-card-header">
        <div class="fourv-num" style="background:${d.color}">${d.num}</div>
        <div class="fourv-title-group">
          <div class="fourv-title" style="color:${d.color}">${pt1 ? d.pt : d.en}</div>
          ${pt1 ? `<div class="fourv-title-en">${d.en}</div>` : ''}
        </div>
      </div>
      <div class="fourv-spectrum">
        <div class="fourv-spectrum-bar" style="background:linear-gradient(90deg,${d.color},${d.color}35);"></div>
        <div class="fourv-spectrum-labels">
          <span style="color:${d.color};font-weight:800">${pt1?'Alto ▲':'High ▲'}</span>
          <span>${pt1?'Baixo ▼':'Low ▼'}</span>
        </div>
      </div>
      <div class="fourv-implications">
        <div class="fourv-impl high"><div class="fourv-impl-label">${pt1?'Alto →':'High →'}</div>${pt1?d.highPt:d.highEn}</div>
        <div class="fourv-impl low"><div class="fourv-impl-label">${pt1?'Baixo →':'Low →'}</div>${pt1?d.lowPt:d.lowEn}</div>
      </div>
    </div>`).join('');

  const introText = pt1
    ? 'As quatro características fundamentais que determinam como sistemas de operações diferem entre si e como devem ser projetados. O modelo ajuda a comparar desde manufatura em massa até serviços altamente personalizados.'
    : 'The four fundamental characteristics determining how operations systems differ and how they should be designed. The model helps compare everything from mass manufacturing to highly personalised services.';

  const corrText = pt1
    ? '↔ Volume e Variedade têm relação inversamente proporcional — alto volume tende à baixa variedade; baixo volume tende à alta variedade.'
    : '↔ Volume and Variety have an inversely proportional relationship — high volume tends towards low variety; low volume towards high variety.';

  return `
    <div class="theory-card">
      <div class="theory-card-head">
        <div class="theory-card-head-left">
          <div class="theory-name">${pt1 ? 'Modelo 4Vs' : '4Vs Model'}</div>
          ${pt1 ? '<div class="theory-en">4Vs Model</div>' : ''}
          <div class="theory-meta">
            <span class="theory-tag author">Operations Management textbook</span>
            <span class="theory-tag year">${pt1 ? 'Clássico' : 'Classic'}</span>
          </div>
        </div>
      </div>
      <div class="theory-body">
        <div class="fourv-intro">${introText}</div>
        <div class="fourv-grid">${cards}</div>
        <div class="fourv-correlation">${corrText}</div>
      </div>
    </div>`;
}

function renderConversionCard(th) {
  const pt1 = lang === 'pt';
  const inputs = pt1
    ? ['Materiais','Informação','Staff','Capital','Instalações']
    : ['Materials','Information','Staff','Capital','Facilities'];
  const outputs = pt1 ? ['Produtos','Serviços'] : ['Products','Services'];
  const feedbackText = pt1
    ? 'Sistema de Feedback (Feedback System) — monitora o processo para garantir repetibilidade, consistência e confiabilidade'
    : 'Feedback System — monitors the process to ensure repeatability, consistency and reliability';

  return `
    <div class="theory-card">
      <div class="theory-card-head">
        <div class="theory-card-head-left">
          <div class="theory-name">${pt1 ? 'Processo de Conversão' : 'Conversion Process'}</div>
          ${pt1 ? '<div class="theory-en">Conversion Process</div>' : ''}
          <div class="theory-meta">
            <span class="theory-tag author">Operations Management textbook</span>
            <span class="theory-tag year">${pt1 ? 'Clássico' : 'Classic'}</span>
          </div>
        </div>
      </div>
      <div class="theory-body">
        <div class="conv-flow">
          <div class="conv-box conv-box-in">
            <div class="conv-box-label-top">${pt1?'Entradas':'Inputs'}</div>
            <div class="conv-box-title">${pt1?'Recursos':'Resources'}</div>
            <div class="conv-box-items">${inputs.map(i=>`<span class="conv-item">${i}</span>`).join('')}</div>
          </div>
          <div class="conv-arrow-col">→</div>
          <div class="conv-box conv-box-proc">
            <div class="conv-box-label-top">${pt1?'Transformação':'Transformation'}</div>
            <div class="conv-box-title">${pt1?'Processo':'Process'}</div>
            <div class="conv-box-items">
              <span class="conv-item">Design</span>
              <span class="conv-item">${pt1?'Produção':'Production'}</span>
              <span class="conv-item">${pt1?'Entrega':'Delivery'}</span>
            </div>
          </div>
          <div class="conv-arrow-col">→</div>
          <div class="conv-box conv-box-out">
            <div class="conv-box-label-top">${pt1?'Saídas':'Outputs'}</div>
            <div class="conv-box-title">${pt1?'Resultados':'Results'}</div>
            <div class="conv-box-items">${outputs.map(o=>`<span class="conv-item">${o}</span>`).join('')}</div>
          </div>
        </div>
        <div class="conv-feedback">
          <span class="conv-feedback-arrow">↺</span>
          ${feedbackText}
        </div>
        <div style="font-size:13px;color:var(--text-mid);line-height:1.75;margin-top:10px;">${t(th.description)}</div>
      </div>
    </div>`;
}

/* ─── Authors ────────────────────────────────────────────── */
const AUTHOR_COLORS = ['#C8102E','#003865','#10B981','#F59E0B','#7C3AED','#0EA5E9'];

function renderAuthorsBody(authors) {
  return `
    <div class="author-list">
      ${authors.map((a, i) => `
        <div class="author-card">
          <div class="author-avatar" style="background:${AUTHOR_COLORS[i % AUTHOR_COLORS.length]}">${initials(a.name)}</div>
          <div class="author-info">
            <div class="author-name">${a.name}</div>
            <div class="author-role">${t(a.role)}</div>
            <div class="author-contribution">${t(a.contribution)}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

/* ─── Case Studies ───────────────────────────────────────── */
const CASE_COLORS = ['#C8102E','#003865','#10B981','#F59E0B','#7C3AED','#0EA5E9','#EC4899','#0F766E'];

function renderCasesBody(cases) {
  return `
    <div class="case-grid">
      ${cases.map((c, i) => `
        <div class="case-card">
          <div class="case-card-header">
            <div class="case-avatar" style="background:${CASE_COLORS[i % CASE_COLORS.length]}">${c.company.slice(0,2).toUpperCase()}</div>
            <div>
              <div class="case-company">${c.company}</div>
              <div class="case-sector">${t(c.sector)}</div>
            </div>
          </div>
          <div class="case-card-body">${t(c.lesson)}</div>
        </div>`).join('')}
    </div>`;
}

/* ─── Glossary ───────────────────────────────────────────── */
function renderGlossaryBody(glossary, weekNum) {
  const pt1 = lang === 'pt';
  const id = `glos-${weekNum}`;
  return `
    <input class="glossary-search" id="${id}" placeholder="${pt1 ? 'Buscar termo...' : 'Search term...'}" oninput="filterGlossary('${id}', this.value)" />
    <div class="glossary-list" id="${id}-list">
      ${glossary.map((g, i) => `
        <div class="glossary-item" id="${id}-${i}">
          <span class="glossary-term">${g.term}</span>
          <span class="glossary-def">${t(g.definition)}</span>
        </div>`).join('')}
    </div>`;
}

/* ─── Connections ────────────────────────────────────────── */
function renderConnectionsBody(connections) {
  return `
    <div class="connection-list">
      ${connections.map(c => `
        <div class="connection-item" onclick="navigate('#week-${c.week}')">
          <span class="connection-week-badge">Week ${c.week}</span>
          <span class="connection-reason">${t(c.reason)}</span>
          <span class="connection-arrow">→</span>
        </div>`).join('')}
    </div>`;
}

/* ─── Flashcards ─────────────────────────────────────────── */
const fcState = {};

function renderFlashcardsBody(flashcards, weekNum) {
  if (!fcState[weekNum]) fcState[weekNum] = { idx: 0, known: [], unknown: [] };
  fcState[weekNum].cards = flashcards;
  const st = fcState[weekNum];
  const total = flashcards.length;
  const fc = flashcards[st.idx] || flashcards[0];
  const pt1 = lang === 'pt';

  const dots = flashcards.map((_, i) => {
    const cls = st.known.includes(i) ? 'known' : st.unknown.includes(i) ? 'unknown' : i === st.idx ? 'current' : '';
    return `<div class="fc-dot ${cls}"></div>`;
  }).join('');

  return `
    <div class="fc-study">
      <div class="fc-counter-row">
        <div class="fc-progress-dots">${dots}</div>
        <div class="fc-count-txt">${st.idx + 1}/${total} · ✅${st.known.length} ✗${st.unknown.length}</div>
      </div>
      <div class="fc-card-wrap" id="fcwrap-${weekNum}" onclick="fcFlip(${weekNum})">
        <div class="fc-card-inner">
          <div class="fc-face fc-front">
            <div class="fc-face-q">${t(fc.q)}</div>
            <span class="fc-hint-txt">${pt1 ? 'clique para revelar' : 'click to reveal'}</span>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-face-a">${t(fc.a)}</div>
            <span class="fc-hint-txt">${pt1 ? 'clique para voltar' : 'click back'}</span>
          </div>
        </div>
      </div>
      <div class="fc-nav-row">
        <button class="fc-nav-btn" onclick="fcNav(${weekNum},-1)" ${st.idx === 0 ? 'disabled' : ''}>‹ ${pt1 ? 'Anterior' : 'Prev'}</button>
        <span class="fc-pos">${st.idx + 1} / ${total}</span>
        <button class="fc-nav-btn" onclick="fcNav(${weekNum},1)" ${st.idx === total - 1 ? 'disabled' : ''}>${pt1 ? 'Próximo' : 'Next'} ›</button>
      </div>
      <div class="fc-score-row">
        <button class="fc-score-btn fc-knew" onclick="fcScore(${weekNum},true)">✓ ${pt1 ? 'Sabia!' : 'Knew it!'}</button>
        <button class="fc-score-btn fc-review" onclick="fcScore(${weekNum},false)">✗ ${pt1 ? 'Preciso revisar' : 'Need review'}</button>
      </div>
    </div>`;
}

function fcFlip(weekNum) {
  document.getElementById(`fcwrap-${weekNum}`)?.classList.toggle('flipped');
}

function fcNav(weekNum, dir) {
  const st = fcState[weekNum];
  if (!st?.cards) return;
  st.idx = Math.max(0, Math.min(st.cards.length - 1, st.idx + dir));
  document.getElementById(`fcwrap-${weekNum}`)?.classList.remove('flipped');
  const inner = document.getElementById(`sec-${weekNum}-flashcards`)?.querySelector('.section-inner');
  if (inner) inner.innerHTML = renderFlashcardsBody(st.cards, weekNum);
}

function fcScore(weekNum, knew) {
  trackFcScore();
  const st = fcState[weekNum];
  if (!st?.cards) return;
  const arr = knew ? st.known : st.unknown;
  const other = knew ? st.unknown : st.known;
  if (!arr.includes(st.idx)) arr.push(st.idx);
  const otherIdx = other.indexOf(st.idx);
  if (otherIdx > -1) other.splice(otherIdx, 1);
  if (st.idx < st.cards.length - 1) {
    st.idx++;
    document.getElementById(`fcwrap-${weekNum}`)?.classList.remove('flipped');
  }
  const inner = document.getElementById(`sec-${weekNum}-flashcards`)?.querySelector('.section-inner');
  if (inner) inner.innerHTML = renderFlashcardsBody(st.cards, weekNum);
}

/* ─── Links ──────────────────────────────────────────────── */
function renderLinksBody(links) {
  const icons = { video: '🎬', article: '📄', news: '📰', other: '🔗' };
  const typePt = { video: 'Vídeo', article: 'Artigo', news: 'Notícia', other: 'Link' };
  const typeEn = { video: 'Video', article: 'Article', news: 'News', other: 'Link' };
  return `<div class="links-grid">${links.map(l => {
    const type = l.type || 'other';
    return `
      <div class="link-card link-type-${type}">
        <div class="link-card-icon">${icons[type] || '🔗'}</div>
        <div class="link-card-content">
          <div class="link-card-type">${lang === 'pt' ? typePt[type] : typeEn[type]}</div>
          <div class="link-card-title"><a href="${l.url}" target="_blank" rel="noopener">${l.title}</a></div>
          ${l.description ? `<div class="link-card-desc">${t(l.description)}</div>` : ''}
        </div>
      </div>`;
  }).join('')}</div>`;
}

/* ─── Notes ──────────────────────────────────────────────── */
function renderNotesBody(notes) {
  return `<div class="notes-body">${t(notes)}</div>`;
}

/* ─── Review Pages ──────────────────────────────────────── */
const REVIEW_FC_NUMS = { r1: 101, r2: 102, r3: 103, r4: 104 };

function renderReview(reviewId) {
  const r = REVIEWS.find(x => x.id === reviewId);
  if (!r) return;
  const pt1 = lang === 'pt';
  const [from, to] = r.range;
  const weeks = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const fakeWeekNum = REVIEW_FC_NUMS[reviewId] || 100;
  let allFlashcards = [];

  const weekBlocks = weeks.map(n => {
    const w = window.WEEKS[n];
    const title = weekTitle(n);
    if (w?.flashcards) allFlashcards.push(...w.flashcards);
    if (!isWeekPopulated(n)) {
      return `<div class="review-week-block">
        <div class="review-week-label">Week ${n} — ${title}</div>
        <div class="review-empty">${pt1 ? 'Conteúdo não adicionado ainda' : 'Content not yet added'}</div>
      </div>`;
    }
    const overview = w.overview
      ? `<div class="review-week-overview">${t(w.overview).slice(0, 300)}${t(w.overview).length > 300 ? '…' : ''}</div>`
      : '';
    const tags = [
      ...(w.concepts||[]).map(c => `<span class="review-tag">${lang === 'pt' ? c.pt : c.en}</span>`),
      ...(w.theories||[]).map(th => `<span class="review-tag">${t(th.name)}</span>`),
    ].join('');
    return `<div class="review-week-block">
      <div class="review-week-label">Week ${n} — ${title}</div>
      ${overview}
      ${tags ? `<div class="review-week-tags">${tags}</div>` : ''}
    </div>`;
  }).join('');

  const fcSection = allFlashcards.length
    ? `<div style="margin-top:20px">${sectionWrapper('flashcards', fakeWeekNum, renderFlashcardsBody(allFlashcards, fakeWeekNum), {})}</div>`
    : '';

  document.getElementById('mainContent').innerHTML = `
    <div class="review-hero">
      <div class="review-eyebrow">${pt1 ? 'Revisão Geral' : 'Full Review'}</div>
      <div class="review-title">${(pt1 ? r.labelPt : r.labelEn).replace('📋 ', '')}</div>
      <div class="review-subtitle">${pt1 ? `Compilado das semanas ${from}–${to}` : `Compiled from weeks ${from}–${to}`}</div>
    </div>
    ${weekBlocks}
    ${fcSection}
  `;
  document.getElementById('mainContent').scrollTop = 0;
}

/* ─── Interactions ──────────────────────────────────────── */
function filterGlossary(id, query) {
  const items = document.querySelectorAll(`#${id}-list .glossary-item`);
  const q = query.toLowerCase();
  items.forEach(item => { item.classList.toggle('hidden', q && !item.textContent.toLowerCase().includes(q)); });
}

function navigate(hash) { window.location.hash = hash; }

/* ─── Router ────────────────────────────────────────────── */
function route() {
  const hash = window.location.hash || '#dashboard';
  renderSidebar();
  if (hash === '#dashboard' || hash === '') {
    renderDashboard();
  } else if (hash.startsWith('#week-')) {
    const num = parseInt(hash.replace('#week-', ''));
    if (!isNaN(num)) renderWeek(num);
  } else if (hash.startsWith('#r')) {
    renderReview(hash.replace('#', ''));
  } else {
    renderDashboard();
  }
}

/* ─── Init ──────────────────────────────────────────────── */
function init() {
  document.getElementById('langFlag').textContent = lang === 'pt' ? '🇧🇷' : '🇬🇧';
  document.getElementById('langText').textContent = lang === 'pt' ? 'PT+EN' : 'EN';
  updateXPBar();
  window.addEventListener('hashchange', route);
  route();
}

document.addEventListener('DOMContentLoaded', init);
