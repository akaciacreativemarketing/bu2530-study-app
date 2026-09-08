/* ═══════════════════════════════════════════════════════════
   Study Hub · study.js · Fase 3 · Modo Revisão e Modo Prova
   Revisão: todos os flashcards da matéria, filtro por semana,
   embaralhar, pilha "revisar" só na sessão.
   Prova: múltipla escolha gerada dos flashcards e do glossário;
   distratores vêm de outras fichas da mesma matéria. Nada é
   gravado; nada é inventado além do que está nos dados.
   Depende dos helpers globais de app.js em tempo de render.
   ═══════════════════════════════════════════════════════════ */
window.STUDY = (function () {
  const REV = {};   // subject → estado da revisão
  const QUIZ = {};  // subject → estado da prova

  /* ── utilidades ── */
  function shuffle(a) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
  const normTxt = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  function populatedWeeks(s) { return subjectWeekNums(s).filter(n => isWeekPopulated(s.id, n)); }
  function rangeWeeks(s, range) { const all = populatedWeeks(s); return range ? all.filter(n => n >= range[0] && n <= range[1]) : all; }
  function weeksLabel(s, weeks) {
    const all = populatedWeeks(s);
    if (weeks.length === all.length) return lang === 'pt' ? `${T('weeks')} 1 a ${s.totalWeeks}` : `${T('weeks')} 1 to ${s.totalWeeks}`;
    if (!weeks.length) return lang === 'pt' ? 'nenhuma semana' : 'no week';
    const sorted = weeks.slice().sort((a, b) => a - b);
    const contiguous = sorted.every((n, i) => i === 0 || n === sorted[i - 1] + 1);
    if (contiguous && sorted.length > 1) return `${T('weeks')} ${sorted[0]} ${lang === 'pt' ? 'a' : 'to'} ${sorted[sorted.length - 1]}`;
    return sorted.map(wnum).join(' · ');
  }
  function chipsHTML(s, selected) {
    const all = populatedWeeks(s);
    const isAll = selected.size === all.length;
    const presets = [`<button type="button" data-preset="all" class="${isAll ? 'on' : ''}">${lang === 'pt' ? 'Todas' : 'All'}</button>`]
      .concat((s.reviews || []).map(r => {
        const on = !isAll && all.filter(n => n >= r.range[0] && n <= r.range[1]).every(n => selected.has(n)) && [...selected].every(n => n >= r.range[0] && n <= r.range[1]);
        return `<button type="button" data-preset="${r.range[0]}-${r.range[1]}" class="${on ? 'on' : ''}">${r.range[0]}–${r.range[1]}</button>`;
      }));
    const chips = all.map(n => `<button type="button" data-w="${n}" class="${selected.has(n) ? 'on' : ''}" aria-pressed="${selected.has(n)}">${wnum(n)}</button>`);
    return `<div class="wchips" role="group" aria-label="${T('weeks')}"><span class="wchips-presets">${presets.join('')}</span><span class="wchips-weeks">${chips.join('')}</span></div>`;
  }
  function applyChip(set, s, btn) {
    const all = populatedWeeks(s);
    if (btn.dataset.preset) {
      if (btn.dataset.preset === 'all') { all.forEach(n => set.add(n)); return; }
      const [a, b] = btn.dataset.preset.split('-').map(Number); set.clear(); all.filter(n => n >= a && n <= b).forEach(n => set.add(n)); return;
    }
    const n = +btn.dataset.w; if (set.has(n)) { if (set.size > 1) set.delete(n); } else set.add(n);
  }

  /* ══════════ Modo Revisão ══════════ */
  function revState(s) { return REV[s.id] || (REV[s.id] = { weeks: new Set(populatedWeeks(s)), order: null, onlyUnknown: false, urlRange: null }); }

  function renderReview(s, range) {
    const st = revState(s);
    const rk = range ? range.join('-') : null;
    if (rk !== st.urlRange) { st.urlRange = rk; if (range) { st.weeks = new Set(rangeWeeks(s, range)); st.order = null; } }
    const weeks = [...st.weeks].sort((a, b) => a - b);
    let cards = [];
    weeks.forEach(n => { const w = getWeek(s.id, n); (w.flashcards || []).forEach((f, i) => cards.push({ q: f.q, a: f.a, week: n, key: `${n}:${i}` })); });
    const total = cards.length;
    if (st.order) { const pos = {}; st.order.forEach((k, i) => { pos[k] = i; }); cards.sort((a, b) => (pos[a.key] ?? 1e9) - (pos[b.key] ?? 1e9)); }
    const deckId = `fc-review-${s.id}`;
    const fst = fcState[deckId];
    const unknownCount = fst ? fst.unknown.filter(k => cards.some(c => c.key === k)).length : 0;
    if (st.onlyUnknown && fst) cards = cards.filter(c => fst.unknown.includes(c.key));
    fcReset(deckId, cards);
    const pt = lang === 'pt';
    setMain(`
      <header class="wk-head">
        <div class="crumb"><a href="#${s.id}">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</a> · ${pt ? 'Modo revisão' : 'Review mode'}</div>
        <div class="wk-grid"><div class="big">${cards.length}</div><div><h1 class="disp">${pt ? 'Revisão de flashcards' : 'Flashcard review'}</h1><div class="wk-meta">${weeksLabel(s, weeks)} · ${total} flashcards${st.onlyUnknown ? ` · ${pt ? 'só os marcados para revisar' : 'only the ones marked for review'}` : ''}</div></div></div>
        <div class="tools">
          ${chipsHTML(s, st.weeks)}
          <div class="tools-acts">
            <button type="button" data-rev="shuffle">${pt ? 'Embaralhar' : 'Shuffle'}</button>
            <button type="button" data-rev="unknown" class="${st.onlyUnknown ? 'on' : ''}" ${!unknownCount && !st.onlyUnknown ? 'disabled' : ''}>${pt ? 'Só “revisar”' : 'Only “review”'} · ${unknownCount}</button>
            <a href="#${s.id}/quiz">${pt ? 'Modo prova' : 'Exam mode'} →</a>
          </div>
        </div>
      </header>
      <article class="paper study-page" data-study="review"><div class="inner">
        ${cards.length ? fcDeck(deckId, cards, { key: c => c.key, meta: c => `<a href="#${s.id}/week-${c.week}/flashcards">${wnum(c.week)} · ${esc(weekTitle(s.id, c.week))}</a>` }) : `<div class="empty">${pt ? 'Nada marcado para revisar nesta seleção.' : 'Nothing marked for review in this selection.'}</div>`}
        <div class="kbd">${pt ? '← → navegar · Enter vira · 1 sabia · 2 revisar' : '← → navigate · Enter flips · 1 knew it · 2 review'}</div>
      </div></article>`, `${pt ? 'Revisão' : 'Review'} · ${t(s.name)}`);
  }

  /* ══════════ Modo Prova ══════════ */
  function quizState(s) { return QUIZ[s.id] || (QUIZ[s.id] = { weeks: new Set(populatedWeeks(s)), n: 15, src: { fc: true, gl: true }, phase: 'setup', items: [], i: 0, answers: [], urlRange: null }); }

  function pools(s, weeks) {
    const fc = [], gl = [], allFc = [], allGl = [];
    populatedWeeks(s).forEach(n => {
      const w = getWeek(s.id, n);
      (w.flashcards || []).forEach((f, i) => { const it = { type: 'fc', week: n, q: f.q, a: f.a, id: `fc:${n}:${i}` }; allFc.push(it); if (weeks.has(n)) fc.push(it); });
      (w.glossary || []).forEach((g, i) => { const it = { type: 'gl', week: n, term: g.term, def: g.definition, id: `gl:${n}:${i}` }; allGl.push(it); if (weeks.has(n)) gl.push(it); });
    });
    return { fc, gl, allFc, allGl };
  }
  /* distratores: outras fichas da matéria, de preferência da mesma semana e com tamanho parecido */
  function distractors(cands, correct, week, k) {
    const cn = normTxt(t(correct)), cl = Math.max(20, cn.length);
    const seen = new Set([cn]);
    const scored = [];
    for (const c of cands) {
      const n = normTxt(t(c.text)); if (!n || seen.has(n)) continue; seen.add(n);
      const ratio = Math.abs(Math.log((Math.max(20, n.length)) / cl));
      scored.push({ text: c.text, score: (c.week === week ? 0 : 0.6) + ratio + Math.random() * 0.5 });
    }
    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, k).map(x => x.text);
  }
  function makeQuestion(it, P) {
    if (it.type === 'fc') {
      const dis = distractors(P.allFc.filter(x => x.id !== it.id).map(x => ({ text: x.a, week: x.week })), it.a, it.week, 3);
      return { ...it, stem: it.q, options: shuffle([{ text: it.a, ok: true }].concat(dis.map(d => ({ text: d, ok: false })))), explain: it.a, section: 'flashcards' };
    }
    if (Math.random() < 0.6) {
      const dis = distractors(P.allGl.filter(x => x.id !== it.id).map(x => ({ text: x.term, week: x.week })), it.term, it.week, 3);
      return { ...it, stem: { pt: 'Qual termo corresponde a esta definição?', en: 'Which term matches this definition?' }, body: it.def, options: shuffle([{ text: it.term, ok: true }].concat(dis.map(d => ({ text: d, ok: false })))), explain: it.def, section: 'glossary' };
    }
    const dis = distractors(P.allGl.filter(x => x.id !== it.id).map(x => ({ text: x.def, week: x.week })), it.def, it.week, 3);
    return { ...it, stem: { pt: `O que é “${it.term}”?`, en: `What is “${it.term}”?` }, options: shuffle([{ text: it.def, ok: true }].concat(dis.map(d => ({ text: d, ok: false })))), explain: it.def, section: 'glossary' };
  }
  function buildItems(s, st) {
    const P = pools(s, st.weeks);
    let pool = []; if (st.src.fc) pool = pool.concat(P.fc); if (st.src.gl) pool = pool.concat(P.gl);
    return shuffle(pool).slice(0, st.n).map(it => makeQuestion(it, P));
  }

  function renderQuiz(s, range) {
    const st = quizState(s);
    const rk = range ? range.join('-') : null;
    if (rk !== st.urlRange) { st.urlRange = rk; if (range) { st.weeks = new Set(rangeWeeks(s, range)); st.phase = 'setup'; } }
    if (st.phase === 'setup') return renderSetup(s, st);
    if (st.phase === 'end') return renderEnd(s, st);
    return renderQuestion(s, st);
  }

  function renderSetup(s, st) {
    const pt = lang === 'pt';
    const P = pools(s, st.weeks);
    const avail = (st.src.fc ? P.fc.length : 0) + (st.src.gl ? P.gl.length : 0);
    const weeks = [...st.weeks].sort((a, b) => a - b);
    setMain(`
      <header class="wk-head">
        <div class="crumb"><a href="#${s.id}">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</a> · ${pt ? 'Modo prova' : 'Exam mode'}</div>
        <div class="wk-grid"><div class="big">${Math.min(st.n, avail)}</div><div><h1 class="disp">${pt ? 'Modo prova' : 'Exam mode'}</h1><div class="wk-meta">${weeksLabel(s, weeks)} · ${P.fc.length} flashcards · ${P.gl.length} ${pt ? 'termos' : 'terms'}</div></div></div>
      </header>
      <article class="paper study-page" data-study="quiz"><div class="inner quiz-setup">
        <p class="prose">${pt ? 'Questões de múltipla escolha geradas dos flashcards e do glossário desta parte. As alternativas erradas vêm de outras fichas da mesma matéria, de preferência da mesma semana. Nada fica salvo: é treino.' : 'Multiple-choice questions generated from this part’s flashcards and glossary. Wrong options come from other cards of the same subject, preferably the same week. Nothing is saved: it is practice.'}</p>
        <h2>${T('weeks')}</h2>
        ${chipsHTML(s, st.weeks)}
        <h2>${pt ? 'Questões' : 'Questions'}</h2>
        <div class="wchips"><span class="wchips-weeks">${[10, 15, 20, 30].map(n => `<button type="button" data-qn="${n}" class="${st.n === n ? 'on' : ''}">${n}</button>`).join('')}</span></div>
        <h2>${pt ? 'Fontes' : 'Sources'}</h2>
        <div class="wchips"><span class="wchips-weeks"><button type="button" data-qsrc="fc" class="${st.src.fc ? 'on' : ''}" aria-pressed="${st.src.fc}">Flashcards · ${P.fc.length}</button><button type="button" data-qsrc="gl" class="${st.src.gl ? 'on' : ''}" aria-pressed="${st.src.gl}">${T('glossary')} · ${P.gl.length}</button></span></div>
        <div class="q-start"><button type="button" class="btn" data-quiz="start" ${avail < 4 ? 'disabled' : ''}>${pt ? 'Começar a prova' : 'Start the exam'} · ${Math.min(st.n, avail)} ${pt ? 'questões' : 'questions'}</button><a class="btn ghost" href="#${s.id}/review">${pt ? 'Prefiro revisar flashcards' : 'I’d rather review flashcards'}</a></div>
        <div class="kbd">${pt ? '1 a 4 escolhem a alternativa · Enter avança' : '1 to 4 pick an option · Enter moves on'}</div>
      </div></article>`, `${pt ? 'Prova' : 'Exam'} · ${t(s.name)}`);
  }

  /* termos curtos ficam lisos; respostas longas ganham o negrito automático das palavras-chave */
  function optText(txt) { const v = t(txt); return v.length > 40 ? boldKeys(esc(v)) : esc(v); }
  function renderQuestion(s, st) {
    const pt = lang === 'pt';
    const q = st.items[st.i], n = st.items.length, ans = st.answers[st.i];
    const dots = st.items.map((_, k) => `<i class="${st.answers[k] ? (st.answers[k].ok ? 'ok' : 'no') : k === st.i ? 'cur' : ''}"></i>`).join('');
    setMain(`
      <header class="wk-head">
        <div class="crumb"><a href="#${s.id}">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</a> · ${pt ? 'Modo prova' : 'Exam mode'}</div>
        <div class="wk-grid"><div class="big">${pad2(st.i + 1)}</div><div><h1 class="disp">${pt ? 'Questão' : 'Question'} ${st.i + 1} ${T('of')} ${n}</h1><div class="wk-meta">${wnum(q.week)} · ${esc(weekTitle(s.id, q.week))} · ${q.type === 'fc' ? 'flashcard' : T('glossary').toLowerCase()}</div></div></div>
        <div class="fc-dots q-dots" aria-hidden="true">${dots}</div>
      </header>
      <article class="paper study-page" data-study="quiz"><div class="inner">
        <div class="q-stem">${esc(t(q.stem))}</div>
        ${q.body ? `<div class="q-body prose">${rich(q.body)}</div>` : ''}
        <div class="q-opts" role="group">${q.options.map((o, k) => `<button type="button" class="q-opt ${ans ? (o.ok ? 'ok' : (k === ans.picked ? 'bad' : 'off')) : ''}" data-opt="${k}" ${ans ? 'disabled' : ''}><span class="q-letter">${'ABCD'[k]}</span><span class="q-text">${optText(o.text)}</span></button>`).join('')}</div>
        ${ans ? `<div class="q-fb ${ans.ok ? 'right' : 'wrong'}">
          <span class="stamp">${ans.ok ? (pt ? 'Certo' : 'Correct') : (pt ? 'Errado' : 'Wrong')}</span>
          <div class="q-fb-body">${ans.ok ? '' : `<p><b>${pt ? 'Resposta:' : 'Answer:'}</b> ${optText(q.options.find(o => o.ok).text)}</p>`}<a href="#${s.id}/week-${q.week}/${q.section}">${pt ? 'Ver no dossiê' : 'See in the dossier'} · ${wnum(q.week)} →</a></div>
          <button type="button" class="btn" data-quiz="next">${st.i + 1 < n ? (pt ? 'Próxima' : 'Next') : (pt ? 'Corrigir a prova' : 'Grade the exam')} ›</button>
        </div>` : ''}
        <div class="kbd">${pt ? '1 a 4 escolhem · Enter avança' : '1 to 4 pick · Enter moves on'}</div>
      </div></article>`, `${pt ? 'Questão' : 'Question'} ${st.i + 1} · ${t(s.name)}`);
    const first = document.querySelector(ans ? '[data-quiz="next"]' : '.q-opt'); if (first) first.focus({ preventScroll: true });
  }

  function renderEnd(s, st) {
    const pt = lang === 'pt';
    const n = st.items.length, right = st.answers.filter(a => a && a.ok).length, pct = n ? Math.round(right / n * 100) : 0;
    const missed = st.items.map((q, k) => ({ q, a: st.answers[k] })).filter(x => !x.a || !x.a.ok);
    setMain(`
      <header class="wk-head">
        <div class="crumb"><a href="#${s.id}">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</a> · ${pt ? 'Modo prova' : 'Exam mode'}</div>
        <div class="wk-grid"><div class="big">${right}</div><div><h1 class="disp">${pt ? `${right} de ${n} · ${pct}%` : `${right} of ${n} · ${pct}%`}</h1><div class="wk-meta">${weeksLabel(s, [...st.weeks])} · ${missed.length} ${pt ? 'para rever' : 'to revisit'}</div></div></div>
      </header>
      <article class="paper study-page" data-study="quiz"><div class="inner">
        <span class="stamp">${pt ? 'Prova corrigida' : 'Exam graded'}</span>
        <div class="q-start">
          ${missed.length ? `<button type="button" class="btn" data-quiz="retry">${pt ? 'Refazer as erradas' : 'Redo the missed ones'} · ${missed.length}</button>` : ''}
          <button type="button" class="btn ghost" data-quiz="new">${pt ? 'Nova prova' : 'New exam'}</button>
          <a class="btn ghost" href="#${s.id}/review">${pt ? 'Revisar flashcards' : 'Review flashcards'}</a>
        </div>
        ${missed.length ? `<h2>${pt ? 'O que errou' : 'What you missed'}</h2><div class="q-miss">${missed.map(({ q }) => `
          <div class="q-miss-item"><div class="q-miss-stem">${esc(t(q.stem))}${q.body ? ` <span class="q-miss-body">${esc(t(q.body)).slice(0, 160)}${t(q.body).length > 160 ? '…' : ''}</span>` : ''}</div><div class="q-miss-ans">${optText(q.options.find(o => o.ok).text)}</div><a href="#${s.id}/week-${q.week}/${q.section}">${wnum(q.week)} · ${esc(weekTitle(s.id, q.week))} →</a></div>`).join('')}</div>` : `<p class="prose">${pt ? 'Tudo certo. Se quiser dificultar, aumente o número de questões ou restrinja a uma semana.' : 'All correct. To make it harder, raise the number of questions or narrow it to one week.'}</p>`}
      </div></article>`, `${pt ? 'Resultado' : 'Result'} · ${t(s.name)}`);
  }

  /* ── eventos ── */
  function currentSubjectFor(view) { return lastRoute && lastRoute.view === view ? lastRoute.subject : null; }
  function onClick(e) {
    const page = e.target.closest('.study-page, .wk-head');
    if (!page) return;
    const sRev = currentSubjectFor('review-all'), sQuiz = currentSubjectFor('quiz');
    const chip = e.target.closest('[data-w], [data-preset]');
    if (chip) {
      if (sRev) { const st = revState(sRev); applyChip(st.weeks, sRev, chip); st.order = null; renderReview(sRev, null); }
      else if (sQuiz) { const st = quizState(sQuiz); applyChip(st.weeks, sQuiz, chip); renderSetup(sQuiz, st); }
      return;
    }
    const rev = e.target.closest('[data-rev]');
    if (rev && sRev) {
      const st = revState(sRev);
      if (rev.dataset.rev === 'shuffle') { const deck = fcState[`fc-review-${sRev.id}`]; st.order = shuffle((deck ? deck.cards : []).map(c => c.key)); st.onlyUnknown = st.onlyUnknown && !!deck; }
      if (rev.dataset.rev === 'unknown') st.onlyUnknown = !st.onlyUnknown;
      renderReview(sRev, null); return;
    }
    if (!sQuiz) return;
    const st = quizState(sQuiz);
    const qn = e.target.closest('[data-qn]'); if (qn) { st.n = +qn.dataset.qn; renderSetup(sQuiz, st); return; }
    const qs = e.target.closest('[data-qsrc]'); if (qs) { const k = qs.dataset.qsrc; if (!(st.src[k] && !st.src[k === 'fc' ? 'gl' : 'fc'])) st.src[k] = !st.src[k]; renderSetup(sQuiz, st); return; }
    const opt = e.target.closest('.q-opt[data-opt]'); if (opt && !st.answers[st.i]) { const k = +opt.dataset.opt; st.answers[st.i] = { picked: k, ok: !!st.items[st.i].options[k].ok }; renderQuestion(sQuiz, st); return; }
    const act = e.target.closest('[data-quiz]'); if (!act) return;
    const a = act.dataset.quiz;
    if (a === 'start') { st.items = buildItems(sQuiz, st); st.i = 0; st.answers = []; st.phase = st.items.length ? 'run' : 'setup'; window.scrollTo(0, 0); }
    else if (a === 'next') { if (st.i + 1 < st.items.length) { st.i++; window.scrollTo(0, 0); } else st.phase = 'end'; }
    else if (a === 'retry') { st.items = st.items.filter((q, k) => !st.answers[k] || !st.answers[k].ok).map(q => ({ ...q, options: shuffle(q.options) })); st.i = 0; st.answers = []; st.phase = 'run'; }
    else if (a === 'new') { st.phase = 'setup'; }
    renderQuiz(sQuiz, null);
  }
  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    const sRev = currentSubjectFor('review-all'), sQuiz = currentSubjectFor('quiz');
    if (sRev) {
      const id = `fc-review-${sRev.id}`; if (!fcState[id]) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); fcAction(id, 'next'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); fcAction(id, 'prev'); }
      else if (e.key === '1') { e.preventDefault(); fcAction(id, 'knew'); }
      else if (e.key === '2') { e.preventDefault(); fcAction(id, 'review'); }
      else if ((e.key === 'Enter' || e.key === ' ') && tag !== 'BUTTON' && tag !== 'A' && !e.target.closest('.fc-card')) { e.preventDefault(); fcAction(id, 'flip'); }
      return;
    }
    if (sQuiz) {
      const st = quizState(sQuiz);
      if (st.phase === 'run') {
        if (/^[1-4]$/.test(e.key) && !st.answers[st.i]) { const k = +e.key - 1; if (st.items[st.i].options[k]) { st.answers[st.i] = { picked: k, ok: !!st.items[st.i].options[k].ok }; renderQuestion(sQuiz, st); e.preventDefault(); } }
        else if (e.key === 'Enter' && st.answers[st.i] && tag !== 'A') { e.preventDefault(); const b = document.querySelector('[data-quiz="next"]'); if (b) b.click(); }
      } else if (st.phase === 'setup' && e.key === 'Enter' && tag !== 'BUTTON' && tag !== 'A') { const b = document.querySelector('[data-quiz="start"]'); if (b && !b.disabled) b.click(); }
    }
  }
  function bind() { document.getElementById('main').addEventListener('click', onClick); document.addEventListener('keydown', onKey); }

  return { renderReview, renderQuiz, bind };
})();
