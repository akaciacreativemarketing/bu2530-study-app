/* ═══════════════════════════════════════════════════════════
   Study Hub · hub.js · Modo 2 · Hub de conhecimento (spec 08)
   Nós = conceitos + teorias de todas as semanas. Arestas:
   (1) mesma semana, (2) `connections` herdadas entre semanas,
   (3) citação cruzada automática por texto. Nada é inventado:
   toda ligação nasce dos dados e a automática é marcada.
   Depende dos helpers globais de app.js (t, T, esc, rich…),
   chamados só em tempo de render (após a carga completa).
   ═══════════════════════════════════════════════════════════ */
window.HUB = (function () {
  const nodes = [];       // {i, kind, subject, week, idx, pt, en, text, keys, slug, cite:[i…]}
  const bySlug = {};      // subject → { slug → node }
  const byWeek = {};      // 'subject/week' → [node index]
  const weekEdges = [];   // {a:'subject/week', b:'subject/week', reasons:[{from, to, reason}]}
  const citeEdges = [];   // {a, b, key}
  let searchItems = [];   // nós + termos de glossário + flashcards
  let built = false;

  /* ── utilidades ── */
  const norm = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const slugify = s => norm(s).replace(/ /g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 64) || 'item';
  const wk = (s, n) => `${s}/${n}`;
  const STOP = new Set(['marketing', 'operations', 'operacoes', 'gestao', 'management', 'estrategia', 'strategy', 'processo', 'process', 'produto', 'product', 'servico', 'service', 'cliente', 'customer', 'valor', 'value', 'qualidade', 'quality', 'mercado', 'market', 'empresa', 'company', 'sistema', 'system', 'design', 'custo', 'cost', 'preco', 'price', 'demanda', 'demand', 'feedback', 'eficacia', 'effectiveness', 'eficiencia', 'efficiency', 'people', 'pessoas', 'place', 'promotion', 'promocao', 'brand', 'marca', 'branding']);
  const DF_CAP = 8;       // chave que aparece em mais de 8 nós de outras semanas é genérica demais

  function keysOf(pt, en) {
    const ks = new Set();
    for (const raw of [pt, en]) {
      if (!raw) continue;
      for (const v of [raw, String(raw).replace(/\(.*?\)/g, ''), String(raw).split(/[:·—–]/)[0]]) {
        const k = norm(v);
        if (k.length >= 6 && !STOP.has(k)) ks.add(k);
      }
    }
    return [...ks];
  }

  /* ── construção do índice (uma vez) ── */
  function build() {
    if (built) return; built = true;
    const S = window.SUBJECTS, W = window.WEEKS_DATA;
    for (const s of S) {
      bySlug[s.id] = {};
      for (let n = 1; n <= s.totalWeeks; n++) {
        const w = (W[s.id] || {})[n]; if (!w) continue;
        const list = [];
        (w.concepts || []).forEach((c, idx) => {
          const node = { i: nodes.length, kind: 'concept', subject: s.id, week: n, idx, pt: c.pt || c.en || '', en: c.en || c.pt || '', text: norm(`${t2(c.definition, 'pt')} ${t2(c.definition, 'en')}`), cite: [] };
          node.keys = keysOf(node.pt, node.en); nodes.push(node); list.push(node.i);
        });
        (w.theories || []).forEach((th, idx) => {
          const nm = typeof th.name === 'string' ? { pt: th.name, en: th.name } : (th.name || {});
          const node = { i: nodes.length, kind: 'theory', subject: s.id, week: n, idx, pt: nm.pt || nm.en || '', en: nm.en || nm.pt || '', text: norm(`${t2(th.description, 'pt')} ${t2(th.description, 'en')}`), cite: [], renderer: th.renderer || null, authors: th.authors || [], year: th.year || '' };
          node.keys = keysOf(node.pt, node.en); nodes.push(node); list.push(node.i);
        });
        byWeek[wk(s.id, n)] = list;
        (w.glossary || []).forEach(g => searchItems.push({ kind: 'term', subject: s.id, week: n, pt: g.term, en: g.term, text: norm(`${g.term} ${t2(g.definition, 'pt')} ${t2(g.definition, 'en')}`), href: `#${s.id}/week-${n}/glossary` }));
        (w.flashcards || []).forEach(f => searchItems.push({ kind: 'card', subject: s.id, week: n, pt: t2(f.q, 'pt'), en: t2(f.q, 'en'), text: norm(`${t2(f.q, 'pt')} ${t2(f.q, 'en')} ${t2(f.a, 'pt')} ${t2(f.a, 'en')}`), href: `#${s.id}/week-${n}/flashcards` }));
        // arestas herdadas (2)
        (w.connections || []).forEach(c => {
          const to = c.subject || s.id; if (!c.week || (to === s.id && c.week === n)) return;
          const a = wk(s.id, n), b = wk(to, c.week);
          let e = weekEdges.find(x => (x.a === a && x.b === b) || (x.a === b && x.b === a));
          if (!e) { e = { a, b, reasons: [] }; weekEdges.push(e); }
          e.reasons.push({ from: a, to: b, reason: c.reason });
        });
      }
    }
    // slugs únicos por matéria
    for (const node of nodes) {
      let slug = slugify(node.en || node.pt); const map = bySlug[node.subject];
      if (map[slug]) slug = `${slug}-w${node.week}`;
      if (map[slug]) slug = `${slug}-${node.kind[0]}${node.idx}`;
      node.slug = slug; map[slug] = node;
    }
    // citação cruzada (3): a chave do nó B aparece no texto do nó A, em semanas diferentes
    const fullText = nodes.map(n => `${n.text} ${norm(n.pt)} ${norm(n.en)}`);
    const seen = new Set();
    nodes.forEach(b => {
      for (const k of b.keys) {
        const hits = [];
        nodes.forEach(a => { if (a.i !== b.i && !(a.subject === b.subject && a.week === b.week) && fullText[a.i].includes(k)) hits.push(a.i); });
        if (hits.length > DF_CAP) continue;
        for (const ai of hits) {
          const key = ai < b.i ? `${ai}-${b.i}` : `${b.i}-${ai}`;
          if (seen.has(key)) continue; seen.add(key);
          citeEdges.push({ a: ai, b: b.i, key: k });
          nodes[ai].cite.push(b.i); b.cite.push(ai);
        }
      }
    });
    searchItems = nodes.concat(searchItems);
  }
  function t2(obj, l) { if (!obj) return ''; if (typeof obj === 'string') return obj; return obj[l] || obj[l === 'pt' ? 'en' : 'pt'] || ''; }

  /* ── API para o Modo Semanas ── */
  function slugFor(subject, kind, week, idx) {
    const n = nodes.find(x => x.subject === subject && x.kind === kind && x.week === week && x.idx === idx);
    return n ? n.slug : null;
  }
  function nodeName(n) { return lang === 'pt' ? (n.pt || n.en) : (n.en || n.pt); }
  function nodeAlt(n) { const a = lang === 'pt' ? n.en : n.pt; return a && a !== nodeName(n) ? a : ''; }
  function nodeHref(n) { return `#hub/${n.subject}/${n.slug}`; }
  function kindLabel(k) { return k === 'theory' ? T('theory') : k === 'concept' ? T('concept') : k === 'term' ? T('glossary') : 'Flashcard'; }

  /* ── busca ── */
  function search(q, limit) {
    const nq = norm(q); if (nq.length < 2) return [];
    const scored = [];
    for (const it of searchItems) {
      const name = norm(it.pt) + ' | ' + norm(it.en);
      let sc = 0;
      if (name.startsWith(nq) || name.includes('| ' + nq)) sc = 4; else if (name.includes(nq)) sc = 3; else if (it.text && it.text.includes(nq)) sc = 1;
      if (!sc) continue;
      if (it.kind === 'theory') sc += .3; else if (it.kind === 'concept') sc += .2; else if (it.kind === 'term') sc += .1;
      scored.push({ it, sc });
    }
    scored.sort((x, y) => y.sc - x.sc);
    return scored.slice(0, limit || 12).map(x => x.it);
  }
  function resultsHTML(items, q) {
    if (!items.length) return `<div class="none">${lang === 'pt' ? 'Nada com esse texto. Tente o termo em inglês ou em português.' : 'Nothing matches. Try the term in Portuguese or English.'}</div>`;
    return items.map(it => {
      const s = getSubject(it.subject);
      const href = it.href || nodeHref(it);
      return `<a href="${href}"><span class="k">${kindLabel(it.kind)}</span><span class="t">${esc(lang === 'pt' ? it.pt : it.en)}${it.kind !== 'term' && it.kind !== 'card' && nodeAlt(it) ? `<small>${esc(nodeAlt(it))}</small>` : ''}</span><span class="w">${T('part')} ${partNum(s)} · ${wnum(it.week)}</span></a>`;
    }).join('');
  }

  /* ── página do quadro ── */
  function render(r) {
    build();
    if (r.slug && r.subject) { renderFicha(r.subject, r.slug); return; }
    renderBoard(r.subject && getSubject(r.subject) ? r.subject : null);
  }

  function figures(filter) {
    const list = nodes.filter(n => !filter || n.subject === filter);
    const weeksSet = new Set(list.map(n => wk(n.subject, n.week)));
    const cites = citeEdges.filter(e => !filter || (nodes[e.a].subject === filter && nodes[e.b].subject === filter)).length;
    const wes = weekEdges.filter(e => !filter || (e.a.startsWith(filter + '/') && e.b.startsWith(filter + '/'))).length;
    return { concepts: list.filter(n => n.kind === 'concept').length, theories: list.filter(n => n.kind === 'theory').length, weeks: weeksSet.size, cites, wes };
  }

  function renderBoard(filter) {
    const f = figures(filter);
    const pt = lang === 'pt';
    const filters = `<a href="#hub" class="${!filter ? 'on' : ''}">${pt ? 'Todas as partes' : 'All parts'}</a>` +
      window.SUBJECTS.map(s => `<a href="#hub/${s.id}" class="${filter === s.id ? 'on' : ''}">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</a>`).join('');
    const canvasMode = window.innerWidth >= 720;
    // fichas mais ligadas (grau de citação cruzada)
    const top = nodes.filter(n => !filter || n.subject === filter).slice().sort((a, b) => b.cite.length - a.cite.length).slice(0, 10).filter(n => n.cite.length > 0);
    setMain(`
      <header class="hub-head">
        <div class="eyebrow">${T('modes')} · 02</div>
        <h1 class="disp">${T('hub')}</h1>
        <p class="lede">${pt ? 'A matéria inteira como uma rede. Cada ficha é um conceito ou uma teoria; o barbante liga o que a mesma semana ensina, o que o curso conecta entre semanas e o que uma definição cita da outra. Estude pela rede, não pela sequência.' : 'The whole subject as a network. Each card is a concept or a theory; the string ties what the same week teaches, what the course connects across weeks and what one definition cites from another. Study by the network, not by the sequence.'}</p>
        <input class="hub-search" id="hubSearch" type="search" placeholder="${pt ? 'Buscar conceito, teoria, termo ou flashcard… (atalho /)' : 'Search concept, theory, term or flashcard… (shortcut /)'}" autocomplete="off" aria-label="${T('hub')}">
        <div class="hub-res" id="hubRes" hidden></div>
        <div class="hub-figs"><span><b>${f.concepts}</b> ${pt ? 'conceitos' : 'concepts'}</span><span><b>${f.theories}</b> ${pt ? 'teorias' : 'theories'}</span><span><b>${f.weeks}</b> ${T('weeks')}</span><span><b>${f.wes}</b> ${pt ? 'conexões do curso' : 'course connections'}</span><span><b>${f.cites}</b> ${pt ? 'citações cruzadas' : 'cross-citations'}</span></div>
      </header>
      <section class="board-wrap">
        <div class="board-bar">
          <nav class="filters" aria-label="${T('subjects')}">${filters}</nav>
          <div class="legend"><span><i class="th"></i>${T('theory').toLowerCase()}</span><span><i class="dot"></i>${T('concept').toLowerCase()}</span><span><i></i>${pt ? 'conexão do curso' : 'course connection'}</span><span><i class="cite"></i>${pt ? 'citação cruzada' : 'cross-citation'}</span></div>
        </div>
        ${canvasMode ? `<div class="board" id="board"><canvas id="boardCanvas" role="img" aria-label="${pt ? 'Quadro de ligações entre conceitos e teorias' : 'Board of links between concepts and theories'}"></canvas><div class="board-cap" id="boardCap"><span class="hint">${pt ? 'Passe o mouse pelas fichas · clique para abrir · W## abre a semana' : 'Hover the cards · click to open · W## opens the week'}</span></div></div>` : ''}
        ${top.length ? `<div class="hub-figs" style="margin-top:22px">${pt ? 'Fichas mais citadas' : 'Most cited cards'}</div><div class="chips" style="margin-top:8px">${top.map(n => `<a class="chip ${n.kind === 'theory' ? 'th' : ''}" href="${nodeHref(n)}">${esc(nodeName(n))} <span class="auto">${n.cite.length}</span></a>`).join('')}</div>` : ''}
      </section>
      ${listHTML(filter)}`, `${T('hub')} · Study Hub`);

    const inp = document.getElementById('hubSearch'), res = document.getElementById('hubRes');
    let boardApi = null;
    inp.addEventListener('input', () => {
      const q = inp.value.trim();
      if (q.length < 2) { res.hidden = true; res.innerHTML = ''; if (boardApi) boardApi.highlight(null); return; }
      const items = search(q, 12);
      res.innerHTML = resultsHTML(items, q); res.hidden = false;
      if (boardApi) boardApi.highlight(new Set(items.filter(x => x.kind === 'concept' || x.kind === 'theory').map(x => x.i)));
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') { const first = res.querySelector('a'); if (first) { e.preventDefault(); location.hash = first.getAttribute('href'); } }
      if (e.key === 'Escape') { inp.value = ''; res.hidden = true; if (boardApi) boardApi.highlight(null); }
    });
    if (canvasMode) boardApi = setupBoard(filter);
  }

  function listHTML(filter) {
    const pt = lang === 'pt';
    const subjects = window.SUBJECTS.filter(s => !filter || s.id === filter);
    return `<section class="hub-list" aria-label="${T('hub')}">
      ${subjects.map(s => `<div class="dr-h" style="padding-left:0">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</div>` + subjectWeekNums(s).map(n => {
        const list = (byWeek[wk(s.id, n)] || []).map(i => nodes[i]); if (!list.length) return '';
        const th = list.filter(x => x.kind === 'theory'), co = list.filter(x => x.kind === 'concept');
        return `<details><summary><b>${wnum(n)}</b><span>${esc(weekTitle(s.id, n))}</span><small>${list.length} ${pt ? 'fichas' : 'cards'}</small></summary>
          <div class="chips">${th.concat(co).map(x => `<a class="chip ${x.kind === 'theory' ? 'th' : ''}" href="${nodeHref(x)}">${esc(nodeName(x))}${x.cite.length ? `<span class="auto">${x.cite.length}</span>` : ''}</a>`).join('')}</div></details>`;
      }).join('')).join('')}
    </section>`;
  }

  /* ── quadro em canvas 2D ── */
  function setupBoard(filter) {
    const wrap = document.getElementById('board'), cv = document.getElementById('boardCanvas'), cap = document.getElementById('boardCap');
    if (!wrap || !cv) return null;
    const ctx = cv.getContext('2d');
    const subjects = window.SUBJECTS.filter(s => !filter || s.id === filter);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const C = { manila: '#D8C79F', manila2: '#C2AF80', red: '#E24B48', text: '#E9E2D4', mut: '#9C9484', ink: '#151210' };
    let W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
    const pos = {}; let clusters = []; const regions = []; let hovered = -1; let hl = null; let progress = reduce ? 1 : 0; let raf = 0; const hint = cap.innerHTML;
    const active = new Set(subjects.map(s => s.id));
    const myCite = citeEdges.filter(e => active.has(nodes[e.a].subject) && active.has(nodes[e.b].subject));
    const myWeek = weekEdges.filter(e => active.has(e.a.split('/')[0]) && active.has(e.b.split('/')[0]));

    function layout() {
      W = wrap.clientWidth; if (!W) return;
      const stacked = W < 900 && subjects.length > 1;
      const cols = stacked ? 1 : subjects.length, rows = Math.ceil(subjects.length / cols);
      const regionW = W / cols;
      const regionH = stacked ? Math.round(Math.min(560, Math.max(420, W * 0.72))) : Math.round(Math.min(720, Math.max(520, W * 0.58)));
      H = regionH * rows;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.height = H + 'px';
      clusters = []; regions.length = 0;
      subjects.forEach((s, si) => {
        const cx = ((si % cols) + .5) * regionW, cy = (Math.floor(si / cols) + .5) * regionH + 14;
        const R = Math.min(regionW, regionH) * 0.37;
        const weeks = subjectWeekNums(s).filter(n => (byWeek[wk(s.id, n)] || []).length);
        weeks.forEach((n, i) => {
          const a = -Math.PI / 2 + i * (2 * Math.PI / weeks.length);
          const c = { subject: s.id, week: n, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), ang: a, list: byWeek[wk(s.id, n)] };
          const th = c.list.filter(k => nodes[k].kind === 'theory'), co = c.list.filter(k => nodes[k].kind === 'concept');
          th.forEach((k, j) => { const rr = th.length > 1 ? 12 : 0, ang = a + j * (2 * Math.PI / Math.max(1, th.length)); pos[k] = { x: c.x + rr * Math.cos(ang), y: c.y + rr * Math.sin(ang) }; });
          const rc = Math.max(24, co.length * 1.45);
          co.forEach((k, j) => { const ang = a + .4 + j * (2 * Math.PI / Math.max(1, co.length)); pos[k] = { x: c.x + rc * Math.cos(ang), y: c.y + rc * Math.sin(ang) }; });
          c.r = rc + 8;
          c.lx = c.x + (c.r + 14) * Math.cos(a); c.ly = c.y + (c.r + 14) * Math.sin(a);
          clusters.push(c);
        });
        regions.push({ x: cx, y: cy, s, regionX: (si % cols) * regionW, regionY: Math.floor(si / cols) * regionH });
      });
    }

    function curve(ax, ay, bx, by, sag) {
      const mx = (ax + bx) / 2, my = (ay + by) / 2, dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1;
      ctx.moveTo(ax, ay); ctx.quadraticCurveTo(mx - dy / L * sag * L * .12, my + dx / L * sag * L * .12, bx, by);
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      const hn = hovered >= 0 ? nodes[hovered] : null;
      const neigh = hn ? new Set([hovered, ...hn.cite, ...(byWeek[wk(hn.subject, hn.week)] || [])]) : null;
      const focus = !!(hn || hl);
      // rótulos de região
      regions.forEach(rg => {
        ctx.fillStyle = C.mut; ctx.font = `500 11px ${'IBM Plex Mono'}, monospace`; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.fillText(`${T('part').toUpperCase()} ${partNum(rg.s)}`, rg.regionX + 14, rg.regionY + 12);
        ctx.fillStyle = C.text; ctx.font = `800 15px Archivo, 'Arial Narrow', sans-serif`;
        ctx.fillText(t(rg.s.name).toUpperCase(), rg.regionX + 14, rg.regionY + 27);
      });
      // barbante manila: conexões do curso entre semanas
      myWeek.forEach(e => {
        const A = clusters.find(c => wk(c.subject, c.week) === e.a), B = clusters.find(c => wk(c.subject, c.week) === e.b); if (!A || !B) return;
        const touch = hn && (wk(hn.subject, hn.week) === e.a || wk(hn.subject, hn.week) === e.b);
        ctx.beginPath(); curve(A.x, A.y, B.x, B.y, 1);
        ctx.strokeStyle = C.manila; ctx.lineWidth = touch ? 1.8 : 1.2; ctx.globalAlpha = progress * (touch ? .7 : (focus ? .07 : .22)); ctx.stroke();
      });
      // barbante vermelho: citações cruzadas
      myCite.forEach(e => {
        const a = pos[e.a], b = pos[e.b]; if (!a || !b) return;
        const touch = hn && (e.a === hovered || e.b === hovered);
        ctx.beginPath(); curve(a.x, a.y, b.x, b.y, -1);
        ctx.strokeStyle = C.red; ctx.lineWidth = touch ? 1.6 : .8; ctx.globalAlpha = progress * (touch ? .95 : (focus ? .06 : .3)); ctx.stroke();
      });
      ctx.globalAlpha = 1;
      // rótulos de semana (clicáveis)
      clusters.forEach(c => {
        const on = hn && hn.subject === c.subject && hn.week === c.week;
        ctx.fillStyle = on ? C.manila : C.mut; ctx.font = `800 12px Archivo, 'Arial Narrow', sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.globalAlpha = focus && !on ? .45 : 1; ctx.fillText(wnum(c.week), c.lx, c.ly);
      });
      // fichas
      nodes.forEach(n => {
        const p = pos[n.i]; if (!p) return;
        const isH = n.i === hovered, inN = neigh ? neigh.has(n.i) : true, inH = hl ? hl.has(n.i) : true;
        ctx.globalAlpha = (inN && inH) ? 1 : .18;
        if (n.kind === 'theory') { ctx.fillStyle = isH ? C.text : C.manila; ctx.fillRect(p.x - 6, p.y - 4, 12, 8); if (isH) { ctx.strokeStyle = C.red; ctx.lineWidth = 1.5; ctx.strokeRect(p.x - 7.5, p.y - 5.5, 15, 11); } }
        else { ctx.fillStyle = isH ? C.red : C.text; ctx.beginPath(); ctx.arc(p.x, p.y, isH ? 4.2 : 2.6, 0, Math.PI * 2); ctx.fill(); }
        if (hl && hl.has(n.i) && !isH) { ctx.strokeStyle = C.red; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.stroke(); }
      });
      ctx.globalAlpha = 1;
      // etiqueta do nó em foco
      if (hn) {
        const p = pos[hovered]; const label = nodeName(hn);
        ctx.font = `700 13px Archivo, 'Arial Narrow', sans-serif`; const tw = ctx.measureText(label.toUpperCase()).width + 16;
        let x = p.x + 12, y = p.y - 26; if (x + tw > W - 8) x = p.x - tw - 12; if (y < 8) y = p.y + 12;
        ctx.fillStyle = C.manila; ctx.fillRect(x, y, tw, 22);
        ctx.fillStyle = C.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(label.toUpperCase(), x + 8, y + 11);
      }
    }
    function animate() {
      if (progress >= 1) { progress = 1; draw(); return; }
      progress = Math.min(1, progress + .045); draw(); raf = requestAnimationFrame(animate);
    }
    function hit(mx, my) {
      let best = -1, bd = 10;
      nodes.forEach(n => { const p = pos[n.i]; if (!p) return; const d = Math.hypot(p.x - mx, p.y - my); if (d < bd) { bd = d; best = n.i; } });
      return best;
    }
    function hitCluster(mx, my) { return clusters.find(c => Math.hypot(c.lx - mx, c.ly - my) < 14) || null; }
    function pointer(e) { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) }; }
    function caption(n) {
      if (!n) { cap.innerHTML = hint; return; }
      const s = getSubject(n.subject);
      cap.innerHTML = `<span><span class="k">${kindLabel(n.kind)}</span><span class="t">${esc(nodeName(n))}</span></span><span>${T('part')} ${partNum(s)} · ${wnum(n.week)} · ${n.cite.length} ${lang === 'pt' ? 'citações' : 'citations'} · <a href="${nodeHref(n)}">${lang === 'pt' ? 'abrir ficha' : 'open card'} →</a></span>`;
    }
    cv.addEventListener('pointermove', e => {
      const p = pointer(e); const h = hit(p.x, p.y);
      cv.style.cursor = (h >= 0 || hitCluster(p.x, p.y)) ? 'pointer' : 'default';
      if (h !== hovered) { hovered = h; caption(h >= 0 ? nodes[h] : null); draw(); }
    });
    cv.addEventListener('pointerleave', () => { if (hovered !== -1) { hovered = -1; caption(null); draw(); } });
    cv.addEventListener('click', e => {
      const p = pointer(e); const h = hovered >= 0 ? hovered : hit(p.x, p.y);
      if (h >= 0) { location.hash = nodeHref(nodes[h]); return; }
      const c = hitCluster(p.x, p.y); if (c) location.hash = `#${c.subject}/week-${c.week}`;
    });
    let ro = null;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(() => { if (wrap.clientWidth !== W) { layout(); draw(); } }); ro.observe(wrap); }
    layout(); if (reduce) draw(); else animate();
    return { highlight(set) { hl = set && set.size ? set : null; draw(); }, redraw() { layout(); draw(); } };
  }

  /* ── ficha do conceito ── */
  function findMentions(node) {
    const s = getSubject(node.subject); const W = window.WEEKS_DATA[node.subject] || {};
    const keys = node.keys.length ? node.keys : [norm(node.en || node.pt)].filter(k => k.length >= 4);
    const has = txt => { const nt = norm(txt); return keys.some(k => nt.includes(k)); };
    const cards = [], cases = [], terms = [];
    for (let n = 1; n <= s.totalWeeks; n++) {
      const w = W[n]; if (!w) continue;
      (w.flashcards || []).forEach(f => { if (has(`${t2(f.q, 'pt')} ${t2(f.q, 'en')} ${t2(f.a, 'pt')} ${t2(f.a, 'en')}`)) cards.push({ week: n, q: f.q }); });
      (w.caseStudies || []).forEach(c => { if (has(`${t2(c.lesson, 'pt')} ${t2(c.lesson, 'en')}`)) cases.push({ week: n, company: c.company }); });
      (w.glossary || []).forEach(g => { if (has(g.term) || keys.some(k => norm(g.term) === k)) terms.push({ week: n, term: g.term }); });
    }
    return { cards, cases, terms };
  }

  function renderFicha(subjectId, slug) {
    const s = getSubject(subjectId); const node = s && bySlug[subjectId] ? bySlug[subjectId][slug] : null;
    if (!s || !node) { renderBoard(s ? subjectId : null); return; }
    const pt = lang === 'pt';
    const w = window.WEEKS_DATA[subjectId][node.week];
    const src = node.kind === 'concept' ? w.concepts[node.idx] : w.theories[node.idx];
    const def = node.kind === 'concept' ? src.definition : src.description;
    const same = (byWeek[wk(node.subject, node.week)] || []).map(i => nodes[i]).filter(x => x.i !== node.i);
    const cites = node.cite.map(i => nodes[i]);
    const m = findMentions(node);
    const links = weekEdges.filter(e => e.a === wk(node.subject, node.week) || e.b === wk(node.subject, node.week));
    const kindCount = (byWeek[wk(node.subject, node.week)] || []).map(i => nodes[i]).filter(x => x.kind === node.kind).length;
    const list = byWeek[wk(node.subject, node.week)] || []; const at = list.indexOf(node.i);
    const prev = at > 0 ? nodes[list[at - 1]] : null, next = at < list.length - 1 ? nodes[list[at + 1]] : null;
    const chip = x => `<a class="chip ${x.kind === 'theory' ? 'th' : ''}" href="${nodeHref(x)}">${esc(nodeName(x))}${x.subject !== node.subject || x.week !== node.week ? `<span class="auto">${x.subject !== node.subject ? `P${partNum(getSubject(x.subject))} ` : ''}${wnum(x.week)}</span>` : ''}</a>`;
    const row = (k, v) => `<div class="row"><div class="k">${k}</div><div>${v}</div></div>`;

    setMain(`
      <header class="wk-head">
        <div class="crumb"><a href="#hub">${T('hub')}</a> · <a href="#hub/${s.id}">${T('part')} ${partNum(s)} · ${esc(t(s.name))}</a> · <a href="#${s.id}/week-${node.week}">${T('dossier')} ${pad2(node.week)}</a></div>
      </header>
      <article class="paper ficha-page"><div class="inner">
        ${m.cards.length ? `<span class="stamp">${pt ? 'Cai na prova' : 'Exam material'}</span>` : ''}
        <div class="eyebrow">${kindLabel(node.kind)} ${pad2(node.idx + 1)} ${T('of')} ${pad2(kindCount)} · ${wnum(node.week)} · ${esc(weekTitle(s.id, node.week))}</div>
        <h1 class="disp">${esc(nodeName(node))}</h1>
        ${nodeAlt(node) ? `<div class="en">${esc(nodeAlt(node))}</div>` : ''}
        ${node.kind === 'theory' && (node.authors.length || node.year) ? `<div class="th-meta">${node.authors.map(a => `<span>${esc(a)}</span>`).join('')}${node.year ? `<span class="yr">${esc(node.year)}</span>` : ''}</div>` : ''}
        <div class="def">${rich(def)}</div>
        ${node.renderer && VIS_DISPATCH[node.renderer] ? `<a class="btn ghost" href="#${s.id}/week-${node.week}/theories">${T('evidence')} · ${pt ? 'ver a visualização no dossiê' : 'see the visualisation in the dossier'} →</a>` : ''}

        <h2>${pt ? 'Onde aparece' : 'Where it appears'}</h2>
        <div class="rows">
          ${row(T('dossier'), `<a href="#${s.id}/week-${node.week}/${node.kind === 'concept' ? 'concepts' : 'theories'}">${wnum(node.week)} · ${esc(weekTitle(s.id, node.week))}</a> · ${T('part')} ${partNum(s)}`)}
          ${m.cards.length ? row('Flashcards', m.cards.slice(0, 6).map(c => `<a href="#${s.id}/week-${c.week}/flashcards">${esc(t(c.q))}</a>`).join('<br>') + (m.cards.length > 6 ? `<br><span class="m" style="color:var(--ink3)">+${m.cards.length - 6}</span>` : '')) : ''}
          ${m.cases.length ? row(T('cases'), m.cases.map(c => `<a href="#${s.id}/week-${c.week}/cases">${esc(c.company)}</a> <span class="m" style="color:var(--ink3)">${wnum(c.week)}</span>`).join(' · ')) : ''}
          ${m.terms.length ? row(T('glossary'), m.terms.map(g => `<a href="#${s.id}/week-${g.week}/glossary">${esc(g.term)}</a>`).join(' · ')) : ''}
        </div>

        ${same.length ? `<h2>${pt ? 'Ligado a' : 'Linked to'}<small>${pt ? 'mesma semana' : 'same week'} · ${same.length}</small></h2><div class="chips">${same.filter(x => x.kind === 'theory').concat(same.filter(x => x.kind === 'concept')).map(chip).join('')}</div>` : ''}
        ${cites.length ? `<h2>${pt ? 'Citação cruzada' : 'Cross-citation'}<small>${pt ? 'automática: o nome aparece na definição' : 'automatic: the name appears in the definition'} · ${cites.length}</small></h2><div class="chips">${cites.map(chip).join('')}</div>` : ''}
        ${links.length ? `<h2>${pt ? 'Semanas ligadas pelo curso' : 'Weeks linked by the course'}<small>${links.length}</small></h2><div class="rows">${links.map(e => {
          const other = e.a === wk(node.subject, node.week) ? e.b : e.a; const [os, ow] = other.split('/'); const oS = getSubject(os);
          const reason = e.reasons.find(r => r.from === wk(node.subject, node.week)) || e.reasons[0];
          return row(`<a href="#${os}/week-${ow}">${wnum(+ow)}${oS && oS.id !== s.id ? ` · P${partNum(oS)}` : ''}</a>`, `<b>${esc(weekTitle(os, +ow))}</b><br>${rich(reason.reason)}`);
        }).join('')}</div>` : ''}

        <nav class="pn" aria-label="${T('week')}">
          <span>${prev ? `<a href="${nodeHref(prev)}">‹ ${esc(nodeName(prev))}</a>` : ''}</span>
          <span>${next ? `<a href="${nodeHref(next)}">${esc(nodeName(next))} ›</a>` : `<a href="#hub/${s.id}">${T('openBoard')} ›</a>`}</span>
        </nav>
      </div></article>`, `${nodeName(node)} · ${T('hub')}`);
  }

  function nodeBySlug(subject, slug) { build(); return bySlug[subject] ? bySlug[subject][slug] || null : null; }

  return { build, render, slugFor, nodeBySlug, search, get nodes() { return nodes; }, get citeEdges() { return citeEdges; }, get weekEdges() { return weekEdges; } };
})();
