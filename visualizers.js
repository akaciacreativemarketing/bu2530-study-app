/* ─── visualizers.js — Interactive SVG/Canvas Visualizations ─ */

/* ─── Shared Tooltip ──────────────────────────────────────── */
function _ttEl() {
  let el = document.getElementById('_vis_tt');
  if (!el) {
    el = document.createElement('div');
    el.id = '_vis_tt';
    el.className = 'vis-tooltip';
    document.body.appendChild(el);
  }
  return el;
}
function _ttShow(html, e) {
  const tt = _ttEl();
  tt.innerHTML = html;
  tt.style.display = 'block';
  _ttMove(e);
}
function _ttMove(e) {
  const tt = _ttEl();
  const x = e.clientX, y = e.clientY;
  const r = tt.getBoundingClientRect();
  tt.style.left = (x + 14 + r.width > window.innerWidth ? x - r.width - 10 : x + 14) + 'px';
  tt.style.top  = (y - 8) + 'px';
}
function _ttHide() { _ttEl().style.display = 'none'; }

function _svg(w, h) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('viewBox', `0 0 ${w} ${h}`);
  el.setAttribute('width', '100%');
  el.style.display = 'block';
  el.style.maxWidth = w + 'px';
  el.style.margin = '0 auto';
  return el;
}
function _el(tag, attrs={}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

/* ─── 1. 4Vs Scatter Plot ─────────────────────────────────── */
window.vis_4vs_scatter = function(container, lang, data) {
  const W = 440, H = 360;
  const pad = { t: 30, r: 30, b: 65, l: 65 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const pt = lang === 'pt';

  const companies = [
    { name: 'Toyota',              vol: 90, var: 12, color: '#003865',
      note_pt: 'Alto volume, baixíssima variedade.\nLean + JIT. Líder global.',
      note_en: 'High volume, very low variety.\nLean + JIT. Global leader.' },
    { name: "McDonald's",          vol: 95, var: 8,  color: '#C8102E',
      note_pt: 'Volume máximo, variedade mínima.\nTaylorismo no setor de serviços.',
      note_en: 'Maximum volume, minimum variety.\nTaylorism applied to services.' },
    { name: 'ZARA',                vol: 35, var: 88, color: '#10B981',
      note_pt: 'Alta variedade — lança produtos toda semana.\nVolume médio-baixo com alta eficiência.',
      note_en: 'High variety — launches products weekly.\nMedium-low volume with high efficiency.' },
    { name: 'Pashley Cycles',      vol: 8,  var: 96, color: '#F59E0B',
      note_pt: 'Volume mínimo, variedade máxima.\nBicicletas artesanais totalmente personalizadas.',
      note_en: 'Minimum volume, maximum variety.\nFully custom artisan bicycles.' },
    { name: 'Intercontinental',    vol: 18, var: 92, color: '#7C3AED',
      note_pt: 'Baixo volume, alta variedade e visibilidade.\nServiço personalizado, poucas unidades.',
      note_en: 'Low volume, high variety and visibility.\nPersonalised service, few units.' },
    { name: 'Holiday Inn Express', vol: 82, var: 18, color: '#0EA5E9',
      note_pt: 'Alto volume, baixa variedade.\nCheck-in automático, fluxo constante.',
      note_en: 'High volume, low variety.\nAutomated check-in, constant throughput.' },
  ];

  const px = v => pad.l + (v / 100) * iw;
  const py = v => pad.t + ((100 - v) / 100) * ih;

  const svg = _svg(W, H);
  svg.classList.add('vis-scatter');

  // Quadrant backgrounds
  const quads = [
    { x: pad.l,        y: pad.t,         w: iw/2, h: ih/2, fill: '#FFF7ED', label_pt: 'Baixo Vol.\nAlta Var.', label_en: 'Low Vol.\nHigh Var.' },
    { x: pad.l + iw/2, y: pad.t,         w: iw/2, h: ih/2, fill: '#ECFDF5', label_pt: 'Alto Vol.\nAlta Var.', label_en: 'High Vol.\nHigh Var.' },
    { x: pad.l,        y: pad.t + ih/2,  w: iw/2, h: ih/2, fill: '#FDF4FF', label_pt: 'Baixo Vol.\nBaixa Var.', label_en: 'Low Vol.\nLow Var.' },
    { x: pad.l + iw/2, y: pad.t + ih/2,  w: iw/2, h: ih/2, fill: '#EFF6FF', label_pt: 'Alto Vol.\nBaixa Var.', label_en: 'High Vol.\nLow Var.' },
  ];
  quads.forEach(q => {
    svg.appendChild(_el('rect', { x: q.x, y: q.y, width: q.w, height: q.h, fill: q.fill, opacity: '.6' }));
    const lbl = (pt ? q.label_pt : q.label_en).split('\n');
    lbl.forEach((line, li) => {
      const txt = _el('text', { x: q.x + q.w/2, y: q.y + q.h/2 - 6 + li * 13, 'text-anchor': 'middle', 'font-size': '9', fill: '#94A3B8', 'font-weight': '600' });
      txt.textContent = line;
      svg.appendChild(txt);
    });
  });

  // Grid lines
  [25, 50, 75].forEach(v => {
    svg.appendChild(_el('line', { x1: px(v), y1: pad.t, x2: px(v), y2: pad.t + ih, stroke: '#DDE3EC', 'stroke-width': '.8', 'stroke-dasharray': '3,3' }));
    svg.appendChild(_el('line', { x1: pad.l, y1: py(v), x2: pad.l + iw, y2: py(v), stroke: '#DDE3EC', 'stroke-width': '.8', 'stroke-dasharray': '3,3' }));
  });

  // Axes
  svg.appendChild(_el('line', { x1: pad.l, y1: pad.t, x2: pad.l, y2: pad.t + ih, stroke: '#003865', 'stroke-width': '2' }));
  svg.appendChild(_el('line', { x1: pad.l, y1: pad.t + ih, x2: pad.l + iw, y2: pad.t + ih, stroke: '#003865', 'stroke-width': '2' }));

  // Axis labels
  const xLabel = _el('text', { x: pad.l + iw/2, y: H - 8, 'text-anchor': 'middle', 'font-size': '11', fill: '#003865', 'font-weight': '800' });
  xLabel.textContent = pt ? '← Baixo Volume — Alto Volume →' : '← Low Volume — High Volume →';
  svg.appendChild(xLabel);

  const yLabel = _el('text', { x: 14, y: pad.t + ih/2, 'text-anchor': 'middle', 'font-size': '11', fill: '#003865', 'font-weight': '800', transform: `rotate(-90, 14, ${pad.t + ih/2})` });
  yLabel.textContent = pt ? '← Baixa Var. — Alta Var. →' : '← Low Var. — High Var. →';
  svg.appendChild(yLabel);

  // Diagonal "inverse relationship" line
  const diag = _el('line', { x1: px(5), y1: py(95), x2: px(95), y2: py(5), stroke: '#94A3B8', 'stroke-width': '1', 'stroke-dasharray': '6,4', opacity: '.5' });
  svg.appendChild(diag);

  // Company dots
  companies.forEach(co => {
    const x = px(co.vol), y = py(co.var);
    const g = _el('g', { cursor: 'pointer' });

    const circle = _el('circle', { cx: x, cy: y, r: '10', fill: co.color, opacity: '.85', stroke: '#fff', 'stroke-width': '2' });
    g.appendChild(circle);

    const initLabel = _el('text', { x, y, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': '8', fill: '#fff', 'font-weight': '800', 'pointer-events': 'none' });
    initLabel.textContent = co.name.slice(0,2).toUpperCase();
    g.appendChild(initLabel);

    const nameLabel = _el('text', { x, y: y + 16, 'text-anchor': 'middle', 'font-size': '9.5', fill: co.color, 'font-weight': '700', 'pointer-events': 'none' });
    nameLabel.textContent = co.name.length > 14 ? co.name.slice(0,13) + '…' : co.name;
    svg.appendChild(nameLabel);

    g.addEventListener('mouseenter', e => {
      circle.setAttribute('r', '13');
      _ttShow(`<strong>${co.name}</strong><br>${pt ? co.note_pt : co.note_en}`, e);
    });
    g.addEventListener('mousemove', _ttMove);
    g.addEventListener('mouseleave', () => { circle.setAttribute('r', '10'); _ttHide(); });
    svg.appendChild(g);
  });

  container.innerHTML = '';
  const titleEl = document.createElement('div');
  titleEl.className = 'vis-title';
  titleEl.textContent = pt ? 'Posicionamento das Empresas no Modelo 4Vs' : 'Company Positioning in the 4Vs Model';
  container.appendChild(titleEl);
  container.appendChild(svg);
};

/* ─── 2. Radar Chart — Five Performance Objectives ───────── */
window.vis_radar = function(container, lang, data) {
  const W = 340, H = 300;
  const cx = W / 2, cy = H / 2 + 10;
  const R = 110;
  const pt = lang === 'pt';

  const axes = [
    { key: 'quality',       pt: 'Qualidade',      en: 'Quality',       angle: -90 },
    { key: 'speed',         pt: 'Velocidade',     en: 'Speed',         angle: -18 },
    { key: 'dependability', pt: 'Confiabilidade', en: 'Dependability', angle: 54  },
    { key: 'flexibility',   pt: 'Flexibilidade',  en: 'Flexibility',   angle: 126 },
    { key: 'cost',          pt: 'Custo',          en: 'Cost',          angle: 198 },
  ];

  const profiles = [
    {
      id: 'toyota', label: 'Toyota', color: '#003865',
      vals: { quality: 95, speed: 78, dependability: 92, flexibility: 68, cost: 88 },
      note_pt: 'Toyota: lidera em qualidade, confiabilidade e custo. A excelência nas 4 primeiras leva ao menor custo como consequência.',
      note_en: 'Toyota: leads in quality, dependability and cost. Excellence in the first 4 naturally results in lowest cost.'
    },
    {
      id: 'zara', label: 'ZARA', color: '#10B981',
      vals: { quality: 72, speed: 96, dependability: 82, flexibility: 95, cost: 68 },
      note_pt: 'ZARA: velocidade e flexibilidade são suas prioridades máximas — coloca produtos nas lojas em 2 semanas.',
      note_en: 'ZARA: speed and flexibility are top priorities — gets products to stores in 2 weeks.'
    },
    {
      id: 'airline', label: pt ? 'Companhia Low-Cost' : 'Budget Airline', color: '#C8102E',
      vals: { quality: 55, speed: 80, dependability: 70, flexibility: 40, cost: 95 },
      note_pt: 'Companhia aérea low-cost: custo é o único objetivo vencedor. Qualidade e flexibilidade são sacrificadas.',
      note_en: 'Budget airline: cost is the single order-winner. Quality and flexibility are sacrificed.'
    },
  ];

  let activeProfile = 0;

  function draw() {
    svg.innerHTML = '';

    // Grid circles
    [0.25, 0.5, 0.75, 1].forEach(r => {
      const pts = axes.map(a => {
        const rad = (a.angle * Math.PI) / 180;
        return `${cx + Math.cos(rad) * R * r},${cy + Math.sin(rad) * R * r}`;
      }).join(' ');
      svg.appendChild(_el('polygon', { points: pts, fill: 'none', stroke: '#DDE3EC', 'stroke-width': '1' }));
    });

    // Axis lines + labels
    axes.forEach(a => {
      const rad = (a.angle * Math.PI) / 180;
      const x2 = cx + Math.cos(rad) * R;
      const y2 = cy + Math.sin(rad) * R;
      svg.appendChild(_el('line', { x1: cx, y1: cy, x2, y2, stroke: '#DDE3EC', 'stroke-width': '1.5' }));

      const lx = cx + Math.cos(rad) * (R + 18);
      const ly = cy + Math.sin(rad) * (R + 18);
      const lbl = _el('text', {
        x: lx, y: ly, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        'font-size': '10', fill: '#003865', 'font-weight': '800'
      });
      lbl.textContent = pt ? a.pt : a.en;
      svg.appendChild(lbl);
    });

    // All profiles (background gray for inactive)
    profiles.forEach((p, i) => {
      if (i === activeProfile) return;
      const pts = axes.map(a => {
        const v = p.vals[a.key] / 100;
        const rad = (a.angle * Math.PI) / 180;
        return `${cx + Math.cos(rad) * R * v},${cy + Math.sin(rad) * R * v}`;
      }).join(' ');
      svg.appendChild(_el('polygon', { points: pts, fill: '#94A3B8', 'fill-opacity': '.08', stroke: '#94A3B8', 'stroke-width': '1', 'stroke-dasharray': '4,3' }));
    });

    // Active profile
    const p = profiles[activeProfile];
    const pts = axes.map(a => {
      const v = p.vals[a.key] / 100;
      const rad = (a.angle * Math.PI) / 180;
      return `${cx + Math.cos(rad) * R * v},${cy + Math.sin(rad) * R * v}`;
    }).join(' ');
    svg.appendChild(_el('polygon', { points: pts, fill: p.color, 'fill-opacity': '.2', stroke: p.color, 'stroke-width': '2.5' }));

    // Dots on active profile
    axes.forEach(a => {
      const v = p.vals[a.key] / 100;
      const rad = (a.angle * Math.PI) / 180;
      const dx = cx + Math.cos(rad) * R * v;
      const dy = cy + Math.sin(rad) * R * v;
      svg.appendChild(_el('circle', { cx: dx, cy: dy, r: '4', fill: p.color, stroke: '#fff', 'stroke-width': '1.5' }));
    });

    // Note text
    const noteLines = (pt ? p.note_pt : p.note_en).split('.');
    // (shown via tooltip on profile click instead)
  }

  const svg = _svg(W, H);
  svg.classList.add('vis-radar');

  // Profile note area
  const note = document.createElement('div');
  note.style.cssText = 'font-size:11px;color:#475569;line-height:1.55;text-align:center;margin-top:6px;min-height:36px;padding:0 4px;';

  function setActive(i) {
    activeProfile = i;
    draw();
    note.textContent = pt ? profiles[i].note_pt : profiles[i].note_en;
    btns.querySelectorAll('.vis-btn').forEach((b, bi) => b.classList.toggle('active', bi === i));
  }

  draw();
  note.textContent = pt ? profiles[0].note_pt : profiles[0].note_en;

  const btns = document.createElement('div');
  btns.className = 'vis-controls';
  profiles.forEach((p, i) => {
    const b = document.createElement('button');
    b.className = 'vis-btn' + (i === 0 ? ' active' : '');
    b.textContent = p.label;
    b.style.borderColor = p.color;
    b.addEventListener('click', () => setActive(i));
    btns.appendChild(b);
  });

  container.innerHTML = '';
  const titleEl = document.createElement('div');
  titleEl.className = 'vis-title';
  titleEl.textContent = pt ? 'Cinco Objetivos de Desempenho' : 'Five Performance Objectives';
  container.appendChild(titleEl);
  container.appendChild(svg);
  container.appendChild(btns);
  container.appendChild(note);
};

/* ─── 3. Porter's Five Forces ─────────────────────────────── */
window.vis_forces = function(container, lang, data) {
  const W = 380, H = 340;
  const cx = W / 2, cy = H / 2;
  const rCenter = 58, rOuter = 48;
  const dist = 118;
  const pt = lang === 'pt';

  const forces = [
    { id: 'rivalry',    angle: 0,   center: true,  color: '#003865', label_pt: 'Rivalidade\nIndustrial',    label_en: 'Industry\nRivalry',
      desc_pt: 'Competição entre empresas existentes no setor. Quanto mais intensa, menor o potencial de lucro.',
      desc_en: 'Competition among existing firms. The more intense, the lower the profit potential.' },
    { id: 'entrants',   angle: -90, center: false,  color: '#C8102E', label_pt: 'Novos\nEntrantes',         label_en: 'New\nEntrants',
      desc_pt: 'Ameaça de novas empresas entrando no mercado. Barreiras de entrada limitam esta força.',
      desc_en: 'Threat of new firms entering the market. Entry barriers limit this force.' },
    { id: 'substitutes',angle: 90,  center: false,  color: '#7C3AED', label_pt: 'Produtos\nSubstitutos',    label_en: 'Substitute\nProducts',
      desc_pt: 'Ameaça de produtos alternativos que satisfazem a mesma necessidade do cliente.',
      desc_en: 'Threat of alternative products satisfying the same customer need.' },
    { id: 'suppliers',  angle: 180, center: false,  color: '#F59E0B', label_pt: 'Poder dos\nFornecedores', label_en: 'Supplier\nPower',
      desc_pt: 'Capacidade dos fornecedores de aumentar preços ou reduzir qualidade. Poucos fornecedores = maior poder.',
      desc_en: 'Ability of suppliers to raise prices or reduce quality. Fewer suppliers = more power.' },
    { id: 'buyers',     angle: 0,   center: false,  color: '#10B981', label_pt: 'Poder dos\nCompradores',  label_en: 'Buyer\nPower',
      desc_pt: 'Capacidade dos clientes de forçar preços para baixo. Muitos substitutos = maior poder do comprador.',
      desc_en: 'Ability of customers to force prices down. Many substitutes = more buyer power.' },
  ];
  const outerForces = forces.filter(f => !f.center);
  const outerAngles = [-90, 90, 180, 0];
  outerForces.forEach((f, i) => f.angle = outerAngles[i]);

  const svg = _svg(W, H);
  svg.classList.add('vis-forces');

  // Draw connecting lines
  outerForces.forEach(f => {
    const rad = (f.angle * Math.PI) / 180;
    svg.appendChild(_el('line', {
      x1: cx + Math.cos(rad) * rCenter,
      y1: cy + Math.sin(rad) * rCenter,
      x2: cx + Math.cos(rad) * (dist - rOuter),
      y2: cy + Math.sin(rad) * (dist - rOuter),
      stroke: f.color, 'stroke-width': '2', 'stroke-dasharray': '5,3', opacity: '.5'
    }));
    // Arrow head
    const ax = cx + Math.cos(rad) * (dist - rOuter - 8);
    const ay = cy + Math.sin(rad) * (dist - rOuter - 8);
    svg.appendChild(_el('circle', { cx: ax, cy: ay, r: '3', fill: f.color }));
  });

  function makeNode(force, x, y, r, isCenter) {
    const g = _el('g', { cursor: 'pointer' });
    const circle = _el('circle', { cx: x, cy: y, r, fill: force.color, 'fill-opacity': isCenter ? '1' : '.9' });
    g.appendChild(circle);

    const lines = (pt ? force.label_pt : force.label_en).split('\n');
    lines.forEach((line, li) => {
      const txt = _el('text', {
        x, y: y - (lines.length - 1) * 7 + li * 14,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        'font-size': isCenter ? '10' : '9.5',
        'font-weight': '800', fill: '#fff', 'pointer-events': 'none'
      });
      txt.textContent = line;
      g.appendChild(txt);
    });

    g.addEventListener('mouseenter', e => {
      circle.setAttribute('fill-opacity', '1');
      _ttShow(`<strong>${(pt ? force.label_pt : force.label_en).replace('\n', ' ')}</strong><br>${pt ? force.desc_pt : force.desc_en}`, e);
    });
    g.addEventListener('mousemove', _ttMove);
    g.addEventListener('mouseleave', () => { circle.setAttribute('fill-opacity', isCenter ? '1' : '.9'); _ttHide(); });
    return g;
  }

  outerForces.forEach(f => {
    const rad = (f.angle * Math.PI) / 180;
    const x = cx + Math.cos(rad) * dist;
    const y = cy + Math.sin(rad) * dist;
    svg.appendChild(makeNode(f, x, y, rOuter, false));
  });

  svg.appendChild(makeNode(forces[0], cx, cy, rCenter, true));

  container.innerHTML = '';
  const titleEl = document.createElement('div');
  titleEl.className = 'vis-title';
  titleEl.textContent = pt ? 'As Cinco Forças de Porter (hover para detalhes)' : "Porter's Five Forces (hover for details)";
  container.appendChild(titleEl);
  container.appendChild(svg);
  const hint = document.createElement('div');
  hint.style.cssText = 'font-size:10px;color:#94A3B8;text-align:center;margin-top:4px;';
  hint.textContent = pt ? 'Passe o mouse sobre cada força para ver a descrição' : 'Hover each force to see description';
  container.appendChild(hint);
};

/* ─── 4. Four-Stage Ladder ────────────────────────────────── */
window.vis_ladder = function(container, lang, data) {
  const W = 400, H = 310;
  const pt = lang === 'pt';

  const stages = [
    {
      n: 1, color: '#94A3B8', bg: '#F1F5F9',
      label_pt: 'Neutralidade Interna', label_en: 'Internal Neutrality',
      sub_pt: 'Não causa problemas',   sub_en: "Doesn't cause problems",
      cos: ['British Leyland', pt ? 'Empresas em crise' : 'Failing firms'],
    },
    {
      n: 2, color: '#F59E0B', bg: '#FEF3C7',
      label_pt: 'Neutralidade Externa', label_en: 'External Neutrality',
      sub_pt: 'Tão boa quanto a concorrência', sub_en: 'As good as competitors',
      cos: ['Ford (1980s)', 'GM', 'Nissan (early)'],
    },
    {
      n: 3, color: '#0EA5E9', bg: '#E0F2FE',
      label_pt: 'Suporte Interno', label_en: 'Internally Supportive',
      sub_pt: 'OM apoia a estratégia', sub_en: 'OM supports strategy',
      cos: ['Nissan (Alliance)', 'Ford (modern)', 'Renault'],
    },
    {
      n: 4, color: '#10B981', bg: '#D1FAE5',
      label_pt: 'Suporte Externo', label_en: 'Externally Supportive',
      sub_pt: 'OM DEFINE a estratégia', sub_en: 'OM DEFINES strategy',
      cos: ['Toyota', 'Tesla', 'ZARA'],
    },
  ];

  const svg = _svg(W, H);
  svg.classList.add('vis-ladder');

  const stepW = 320, stepH = 55;
  const baseX = 40, baseY = H - 20;

  stages.forEach((s, i) => {
    const x = baseX + i * 18;
    const y = baseY - (i + 1) * stepH;
    const w = stepW - i * 36;

    // Step background
    const rect = _el('rect', { x, y, width: w, height: stepH - 4, rx: '8', fill: s.bg, stroke: s.color, 'stroke-width': '2' });
    svg.appendChild(rect);

    // Stage number badge
    const badge = _el('rect', { x: x + 8, y: y + 8, width: 28, height: 28, rx: '6', fill: s.color });
    svg.appendChild(badge);
    const num = _el('text', { x: x + 22, y: y + 24, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': '13', fill: '#fff', 'font-weight': '900' });
    num.textContent = s.n;
    svg.appendChild(num);

    // Label
    const label = _el('text', { x: x + 44, y: y + 18, 'font-size': '11', fill: s.color, 'font-weight': '800' });
    label.textContent = pt ? s.label_pt : s.label_en;
    svg.appendChild(label);

    const sub = _el('text', { x: x + 44, y: y + 32, 'font-size': '9.5', fill: '#475569' });
    sub.textContent = pt ? s.sub_pt : s.sub_en;
    svg.appendChild(sub);

    // Company chips
    s.cos.forEach((co, ci) => {
      const chipX = x + 44 + ci * 72;
      const chipY = y + stepH - 18;
      if (chipX + 68 > x + w) return;
      const chip = _el('rect', { x: chipX, y: chipY, width: 68, height: 14, rx: '7', fill: s.color, opacity: '.15' });
      svg.appendChild(chip);
      const chipTxt = _el('text', { x: chipX + 34, y: chipY + 8, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': '8', fill: s.color, 'font-weight': '700' });
      chipTxt.textContent = co.length > 10 ? co.slice(0,9) + '…' : co;
      svg.appendChild(chipTxt);
    });
  });

  // Arrow up
  svg.appendChild(_el('line', { x1: baseX - 12, y1: baseY - 20, x2: baseX - 12, y2: baseY - stages.length * stepH - 10, stroke: '#475569', 'stroke-width': '2' }));
  svg.appendChild(_el('polygon', { points: `${baseX-18},${baseY - stages.length * stepH - 5} ${baseX-12},${baseY - stages.length * stepH - 20} ${baseX-6},${baseY - stages.length * stepH - 5}`, fill: '#475569' }));
  const upLbl = _el('text', { x: baseX - 24, y: (baseY + baseY - stages.length * stepH) / 2, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': '9', fill: '#475569', 'font-weight': '700', transform: `rotate(-90, ${baseX - 24}, ${(baseY + baseY - stages.length * stepH) / 2})` });
  upLbl.textContent = pt ? 'Contribuição da OM' : 'OM Contribution';
  svg.appendChild(upLbl);

  container.innerHTML = '';
  const titleEl = document.createElement('div');
  titleEl.className = 'vis-title';
  titleEl.textContent = pt ? 'Modelo dos Quatro Estágios — Slack & Chetty' : 'Four-Stage Model — Slack & Chetty';
  container.appendChild(titleEl);
  container.appendChild(svg);
};

/* ─── 5. Bullwhip Effect Wave ─────────────────────────────── */
window.vis_wave = function(container, lang, data) {
  const pt = lang === 'pt';
  const layers = [
    { label_pt: 'Consumidor',    label_en: 'Consumer',     amplitude: 1,  color: '#003865' },
    { label_pt: 'Varejista',     label_en: 'Retailer',     amplitude: 2,  color: '#0EA5E9' },
    { label_pt: 'Distribuidor',  label_en: 'Distributor',  amplitude: 4,  color: '#F59E0B' },
    { label_pt: 'Fabricante',    label_en: 'Manufacturer', amplitude: 8,  color: '#C8102E' },
  ];

  const canvas = document.createElement('canvas');
  canvas.height = 200;
  canvas.style.cssText = 'display:block;width:100%;border-radius:8px;background:#FAFBFC;border:1px solid #DDE3EC;';
  canvas.className = 'vis-wave-canvas';

  let playing = true;
  let frame = 0;
  let rafId = null;

  function draw() {
    const W = canvas.offsetWidth || 400;
    canvas.width = W;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, 200);

    const layerH = 40;
    const maxAmp = 14;

    layers.forEach((layer, i) => {
      const y = 20 + i * layerH;
      const amp = Math.min(layer.amplitude * maxAmp / 8 * 16, 18);

      ctx.fillStyle = layer.color + '18';
      ctx.fillRect(0, y - 20, W, layerH);

      ctx.fillStyle = layer.color;
      ctx.font = 'bold 9px -apple-system,sans-serif';
      ctx.fillText(pt ? layer.label_pt : layer.label_en, 8, y + 2);

      ctx.strokeStyle = layer.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const startX = 80;
      for (let x = startX; x <= W - 10; x++) {
        const phase = (x - startX) / (W - startX - 10) * Math.PI * 4 - frame * 0.06;
        const waveY = y + Math.sin(phase) * amp;
        if (x === startX) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();

      // Amplitude label
      ctx.fillStyle = layer.color;
      ctx.font = 'bold 8px -apple-system,sans-serif';
      ctx.fillText(`${pt ? 'Amp' : 'Amp'} ×${layer.amplitude}`, W - 45, y + 3);
    });

    // Bottom label
    ctx.fillStyle = '#94A3B8';
    ctx.font = '9px -apple-system,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(pt ? '← Fluxo de demanda (amplificada)' : '← Demand flow (amplified)', W/2, 196);
  }

  function loop() {
    frame++;
    draw();
    if (playing) rafId = requestAnimationFrame(loop);
  }

  const playBtn = document.createElement('button');
  playBtn.className = 'vis-btn active';
  playBtn.style.cssText = 'margin-top:8px;display:flex;align-items:center;gap:5px;margin:8px auto 0;';
  playBtn.innerHTML = `⏸ ${pt ? 'Pausar' : 'Pause'}`;
  playBtn.addEventListener('click', () => {
    playing = !playing;
    playBtn.innerHTML = playing ? `⏸ ${pt ? 'Pausar' : 'Pause'}` : `▶ ${pt ? 'Reproduzir' : 'Play'}`;
    playBtn.classList.toggle('active', playing);
    if (playing) loop();
    else if (rafId) cancelAnimationFrame(rafId);
  });

  container.innerHTML = '';
  const titleEl = document.createElement('div');
  titleEl.className = 'vis-title';
  titleEl.textContent = pt ? 'Efeito Chicote — Amplificação da Demanda na Cadeia' : 'Bullwhip Effect — Demand Amplification in Supply Chain';
  container.appendChild(titleEl);
  container.appendChild(canvas);

  const wrap = document.createElement('div');
  wrap.style.textAlign = 'center';
  wrap.appendChild(playBtn);
  container.appendChild(wrap);

  const note = document.createElement('div');
  note.style.cssText = 'font-size:10px;color:#94A3B8;text-align:center;margin-top:6px;';
  note.textContent = pt ? 'Mesma demanda real, mas amplificada a cada camada da cadeia de suprimento' : 'Same real demand, but amplified at each supply chain layer';
  container.appendChild(note);

  requestAnimationFrame(() => { draw(); loop(); });

  // Cleanup when container leaves DOM
  const obs = new MutationObserver(() => {
    if (!document.body.contains(container)) {
      playing = false;
      if (rafId) cancelAnimationFrame(rafId);
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
};

/* ─── 6. Servitization Spectrum ───────────────────────────── */
window.vis_spectrum = function(container, lang, data) {
  const W = 440, H = 200;
  const pt = lang === 'pt';
  const padX = 50, barY = 90, barH = 14;
  const barW = W - padX * 2;

  const companies = [
    { pos: 5,  name: pt ? 'Motor (produto)' : 'Engine (product)', color: '#94A3B8',
      note_pt: 'Motor tradicional: cliente compra o produto. Rolls-Royce até anos 1970.', note_en: 'Traditional engine: customer buys the product. Rolls-Royce until 1970s.' },
    { pos: 38, name: 'Office (licença)', color: '#F59E0B',
      note_pt: 'Microsoft Office: move de licença perpétua para assinatura (Microsoft 365).', note_en: 'Microsoft Office: moving from perpetual licence to subscription (Microsoft 365).' },
    { pos: 72, name: pt ? 'Tapete (assinatura)' : 'Carpet (subscription)', color: '#0EA5E9',
      note_pt: 'Empresa de tapetes britânica: modelo de assinatura — instala, mantém e coleta para reciclagem.', note_en: 'UK carpet company: subscription model — installs, maintains and collects for recycling.' },
    { pos: 95, name: 'Power-by-the-Hour', color: '#C8102E',
      note_pt: 'Rolls-Royce: o cliente paga por hora de voo, não compra o motor. Manutenção inclusa.', note_en: 'Rolls-Royce: customer pays per flight hour, not the engine. Maintenance included.' },
  ];

  const svg = _svg(W, H);

  // Gradient bar
  const gradId = 'specGrad_' + Math.random().toString(36).substr(2,4);
  const defs = _el('defs');
  const grad = _el('linearGradient', { id: gradId, x1: '0%', y1: '0%', x2: '100%', y2: '0%' });
  grad.appendChild(_el('stop', { offset: '0%', 'stop-color': '#94A3B8' }));
  grad.appendChild(_el('stop', { offset: '50%', 'stop-color': '#0EA5E9' }));
  grad.appendChild(_el('stop', { offset: '100%', 'stop-color': '#C8102E' }));
  defs.appendChild(grad);
  svg.appendChild(defs);

  svg.appendChild(_el('rect', { x: padX, y: barY, width: barW, height: barH, rx: barH/2, fill: `url(#${gradId})`, opacity: '.8' }));

  // End labels
  const lblL = _el('text', { x: padX, y: barY - 8, 'text-anchor': 'middle', 'font-size': '9', fill: '#475569', 'font-weight': '700' });
  lblL.textContent = pt ? 'Produto Puro' : 'Pure Product';
  svg.appendChild(lblL);

  const lblR = _el('text', { x: padX + barW, y: barY - 8, 'text-anchor': 'middle', 'font-size': '9', fill: '#475569', 'font-weight': '700' });
  lblR.textContent = pt ? 'Sistema Produto-Serviço' : 'Product-Service System';
  svg.appendChild(lblR);

  // Companies
  companies.forEach((co, i) => {
    const x = padX + (co.pos / 100) * barW;
    const isTop = i % 2 === 0;
    const lineY1 = isTop ? barY - 14 : barY + barH + 14;
    const lineY2 = isTop ? barY : barY + barH;

    svg.appendChild(_el('line', { x1: x, y1: lineY1, x2: x, y2: lineY2, stroke: co.color, 'stroke-width': '1.5' }));

    const dot = _el('circle', { cx: x, cy: isTop ? lineY1 - 4 : lineY1 + 4, r: '5', fill: co.color, cursor: 'pointer', stroke: '#fff', 'stroke-width': '1.5' });
    svg.appendChild(dot);

    const txtY = isTop ? lineY1 - 16 : lineY1 + 18;
    const txt = _el('text', { x, y: txtY, 'text-anchor': 'middle', 'font-size': '9', fill: co.color, 'font-weight': '700', 'pointer-events': 'none' });
    txt.textContent = co.name.length > 18 ? co.name.slice(0,17) + '…' : co.name;
    svg.appendChild(txt);

    dot.addEventListener('mouseenter', e => {
      dot.setAttribute('r', '7');
      _ttShow(`<strong>${co.name}</strong><br>${pt ? co.note_pt : co.note_en}`, e);
    });
    dot.addEventListener('mousemove', _ttMove);
    dot.addEventListener('mouseleave', () => { dot.setAttribute('r', '5'); _ttHide(); });
  });

  container.innerHTML = '';
  const titleEl = document.createElement('div');
  titleEl.className = 'vis-title';
  titleEl.textContent = pt ? 'Espectro da Servitização (hover para detalhes)' : 'Servitization Spectrum (hover for details)';
  container.appendChild(titleEl);
  container.appendChild(svg);
};

/* ─── 7. Timeline — Scientific Management Evolution ──────── */
window.vis_timeline = function(container, lang, data) {
  const pt = lang === 'pt';

  const events = [
    { year: '1776', person: 'Adam Smith', color: '#94A3B8',
      title_pt: 'Divisão do Trabalho', title_en: 'Division of Labour',
      desc_pt: '"A Riqueza das Nações": divisão do trabalho aumenta produtividade dramaticamente.', desc_en: '"Wealth of Nations": division of labour dramatically increases productivity.' },
    { year: '1911', person: 'F.W. Taylor', color: '#003865',
      title_pt: 'Gestão Científica', title_en: 'Scientific Management',
      desc_pt: 'Principles of Scientific Management: 5 princípios para processos repetíveis, consistentes e confiáveis.', desc_en: 'Principles of Scientific Management: 5 principles for repeatable, consistent, reliable processes.' },
    { year: '1913', person: 'Henry Ford', color: '#C8102E',
      title_pt: 'Linha de Montagem', title_en: 'Assembly Line',
      desc_pt: 'Linha de montagem em movimento na Ford Highland Park. Produção em massa em escala sem precedentes.', desc_en: 'Moving assembly line at Ford Highland Park. Mass production at unprecedented scale.' },
    { year: '1950s', person: 'Taiichi Ohno', color: '#F59E0B',
      title_pt: 'TPS / Lean / JIT', title_en: 'TPS / Lean / JIT',
      desc_pt: 'Toyota Production System: elimina desperdício, JIT, Kanban. Revoluciona a manufatura global.', desc_en: 'Toyota Production System: eliminates waste, JIT, Kanban. Revolutionises global manufacturing.' },
  ];

  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:8px 0;overflow-x:auto;';

  const inner = document.createElement('div');
  inner.style.cssText = `display:flex;gap:0;min-width:340px;position:relative;padding-top:8px;`;

  // Horizontal line
  const line = document.createElement('div');
  line.style.cssText = `position:absolute;top:24px;left:24px;right:24px;height:3px;background:linear-gradient(90deg,#DDE3EC,#003865);border-radius:2px;`;
  inner.appendChild(line);

  let activeIdx = -1;

  const descs = events.map((ev, i) => {
    const desc = document.createElement('div');
    desc.style.cssText = `display:none;position:absolute;top:56px;background:${ev.color};color:#fff;border-radius:10px;padding:10px 14px;font-size:11px;line-height:1.5;max-width:200px;z-index:10;box-shadow:0 4px 16px rgba(0,0,0,.15);`;
    desc.innerHTML = `<strong>${pt ? ev.title_pt : ev.title_en}</strong><br>${pt ? ev.desc_pt : ev.desc_en}`;
    return desc;
  });

  events.forEach((ev, i) => {
    const col = document.createElement('div');
    col.style.cssText = `flex:1;display:flex;flex-direction:column;align-items:center;position:relative;cursor:pointer;`;

    const dot = document.createElement('div');
    dot.style.cssText = `width:18px;height:18px;border-radius:50%;background:${ev.color};border:3px solid #fff;box-shadow:0 0 0 2px ${ev.color};margin-top:16px;flex-shrink:0;transition:transform .2s;z-index:2;`;

    const year = document.createElement('div');
    year.style.cssText = `font-size:10px;font-weight:800;color:${ev.color};margin-top:6px;`;
    year.textContent = ev.year;

    const person = document.createElement('div');
    person.style.cssText = `font-size:9px;color:#475569;font-weight:600;margin-top:2px;text-align:center;`;
    person.textContent = ev.person;

    const title = document.createElement('div');
    title.style.cssText = `font-size:9.5px;font-weight:700;color:${ev.color};text-align:center;margin-top:4px;padding:0 4px;`;
    title.textContent = pt ? ev.title_pt : ev.title_en;

    col.appendChild(dot);
    col.appendChild(year);
    col.appendChild(person);
    col.appendChild(title);
    col.appendChild(descs[i]);

    col.addEventListener('click', () => {
      if (activeIdx === i) {
        descs[i].style.display = 'none';
        dot.style.transform = '';
        activeIdx = -1;
      } else {
        descs.forEach((d, di) => { d.style.display = 'none'; });
        events.forEach((_, di) => {
          const dots = inner.querySelectorAll('div[style*="border-radius:50%"]');
          if (dots[di]) dots[di].style.transform = '';
        });
        descs[i].style.display = 'block';
        descs[i].style.left = i < 2 ? '0' : 'auto';
        descs[i].style.right = i >= 2 ? '0' : 'auto';
        dot.style.transform = 'scale(1.3)';
        activeIdx = i;
      }
    });

    inner.appendChild(col);
  });

  wrap.appendChild(inner);

  container.innerHTML = '';
  const titleEl = document.createElement('div');
  titleEl.className = 'vis-title';
  titleEl.textContent = pt ? 'Evolução Histórica — Taylor → Ford → Toyota (clique nos nós)' : 'Historical Evolution — Taylor → Ford → Toyota (click nodes)';
  container.appendChild(titleEl);
  container.appendChild(wrap);
};

/* ─── 8. 4Vs Operational Implications (HTML comparison tables) ── */
window.vis_fourvsCards = function(container, lang) {
  const pt = lang === 'pt';
  const dims = [
    {
      key: pt ? 'Volume' : 'Volume',
      low: pt ? '⬇ Baixo Volume' : '⬇ Low Volume',
      high: pt ? '⬆ Alto Volume' : '⬆ High Volume',
      rows: pt
        ? [['Baixa sistematização','Alta sistematização'],
           ['Menos intensivo em capital','Mais intensivo em capital'],
           ['Custo unitário alto','Custo unitário baixo (economias de escala)'],
           ['Staff com habilidades amplas','Staff com tarefas repetitivas'],
           ['Menos possível estocar','Mais possível estocar']]
        : [['Low systemisation','High systemisation'],
           ['Less capital intensive','More capital intensive'],
           ['High unit costs','Low unit costs (economies of scale)'],
           ['Staff need broad skills','Staff tasks more repetitive'],
           ['Less easily inventoried','More easily inventoried']]
    },
    {
      key: pt ? 'Variety (Variedade)' : 'Variety',
      low: pt ? '⬇ Baixa Variedade' : '⬇ Low Variety',
      high: pt ? '⬆ Alta Variedade' : '⬆ High Variety',
      rows: pt
        ? [['Equipamento especializado','Equipamento de uso geral'],
           ['Tarefas repetitivas','Tarefas não-repetitivas'],
           ['Procedimentos padronizados','Procedimentos flexíveis'],
           ['Foco em eficiência','Foco em flexibilidade']]
        : [['Specialist equipment','General-purpose equipment'],
           ['Repetitive tasks','Non-repetitive tasks'],
           ['Standard procedures','Flexible procedures'],
           ['Focus on efficiency','Focus on flexibility']]
    },
    {
      key: pt ? 'Variation (Variação da Demanda)' : 'Variation in Demand',
      low: pt ? '⬇ Baixa Variação' : '⬇ Low Variation',
      high: pt ? '⬆ Alta Variação' : '⬆ High Variation',
      rows: pt
        ? [['Estável e previsível','Instável e imprevisível'],
           ['Programação de rotina','Programação flexível'],
           ['Capacidade fácil de gerir','Capacidade difícil de gerir'],
           ['Custo baixo','Custo alto']]
        : [['Stable and predictable','Unstable and unpredictable'],
           ['Routine scheduling','Flexible scheduling'],
           ['Capacity easy to manage','Capacity hard to manage'],
           ['Low cost','High cost']]
    },
    {
      key: pt ? 'Visibility (Visibilidade)' : 'Visibility',
      low: pt ? '⬇ Baixa Visibilidade' : '⬇ Low Visibility',
      high: pt ? '⬆ Alta Visibilidade' : '⬆ High Visibility',
      rows: pt
        ? [['Governado pela eficiência','Governado pela percepção do cliente'],
           ['Baixo contato com cliente','Alto contato com cliente'],
           ['Baixo risco de intervenção','Alto risco de intervenção'],
           ['Mais fácil de gerir','Mais complexo de gerir']]
        : [['Governed by efficiency','Governed by customer perception'],
           ['Low customer contact','High customer contact'],
           ['Low intervention risk','High intervention risk'],
           ['Easier to manage','More complex to manage']]
    }
  ];

  container.innerHTML = `<div style="font-size:11.5px;width:100%;overflow-y:auto;max-height:520px;padding-right:2px;">
    ${dims.map(d => `
      <div style="margin-bottom:13px;">
        <div style="font-weight:800;color:#003865;font-size:9.5px;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;">${d.key}</div>
        <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
          <thead>
            <tr>
              <th style="background:#94A3B8;color:#fff;padding:5px 7px;text-align:left;font-size:9.5px;width:50%;">${d.low}</th>
              <th style="background:#003865;color:#fff;padding:5px 7px;text-align:left;font-size:9.5px;width:50%;">${d.high}</th>
            </tr>
          </thead>
          <tbody>
            ${d.rows.map((r, i) => `<tr style="background:${i % 2 === 0 ? '#F8FAFC' : '#fff'};">
              <td style="padding:4px 7px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:11px;">${r[0]}</td>
              <td style="padding:4px 7px;border-bottom:1px solid #E2E8F0;color:#1E293B;font-size:11px;font-weight:500;">${r[1]}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `).join('')}
  </div>`;
};

/* ─── 9. Performance Prioritizing Matrix (HTML zone grid) ────── */
window.vis_performMatrix = function(container, lang) {
  const pt = lang === 'pt';
  const perfLabels = pt
    ? ['Alto (7–9)', 'Médio (4–6)', 'Baixo (1–3)']
    : ['High (7–9)', 'Mid (4–6)', 'Low (1–3)'];
  const impLabels = pt
    ? ['Baixa imp. (1–3)', 'Média imp. (4–6)', 'Alta imp. (7–9)']
    : ['Low imp. (1–3)', 'Mid imp. (4–6)', 'High imp. (7–9)'];

  const cells = [
    [
      { label: pt ? 'Excesso?' : 'Excess?',       sub: pt ? 'Investimento a rever' : 'Investment to review',   bg: '#DBEAFE', color: '#1D4ED8' },
      { label: pt ? 'Apropriado' : 'Appropriate',  sub: pt ? 'Manter padrão'       : 'Maintain standard',       bg: '#DCFCE7', color: '#15803D' },
      { label: pt ? 'Apropriado' : 'Appropriate',  sub: pt ? 'Manter vantagem'     : 'Maintain advantage',      bg: '#BBF7D0', color: '#14532D', bold: true },
    ],
    [
      { label: pt ? 'Aceitável' : 'Acceptable',    sub: pt ? 'Baixa prioridade'    : 'Low priority',            bg: '#F1F5F9', color: '#64748B' },
      { label: pt ? 'Melhorar' : 'Improve',         sub: pt ? 'Investir com foco'   : 'Invest with focus',       bg: '#FEF9C3', color: '#A16207' },
      { label: pt ? 'Melhorar ↑' : 'Improve ↑',    sub: pt ? 'Prioridade alta'     : 'High priority',           bg: '#FDE68A', color: '#92400E', bold: true },
    ],
    [
      { label: pt ? 'Aceitável' : 'Acceptable',    sub: pt ? 'Não é crítico'       : 'Not critical',            bg: '#F1F5F9', color: '#94A3B8' },
      { label: pt ? 'Ação Urgente' : 'Urgent Action', sub: pt ? 'Corrigir logo'    : 'Fix soon',                bg: '#FEE2E2', color: '#B91C1C' },
      { label: pt ? 'AÇÃO URGENTE!' : 'URGENT ACTION!', sub: pt ? 'Prioridade máx.' : 'Top priority',          bg: '#FCA5A5', color: '#7F1D1D', bold: true },
    ],
  ];

  container.innerHTML = `<div style="font-size:11px;width:100%;padding:4px;">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:6px;">
      ${pt ? 'Matriz de Priorização (Slack et al. 2007)' : 'Performance Prioritizing Matrix (Slack et al. 2007)'}
    </div>
    <div style="display:flex;gap:4px;align-items:stretch;">
      <div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:8.5px;font-weight:700;color:#003865;text-transform:uppercase;letter-spacing:.5px;padding:4px 0;white-space:nowrap;flex-shrink:0;">
        ${pt ? 'Desempenho vs. Concorrentes' : 'Performance vs. Competitors'}
      </div>
      <div style="flex:1;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
          <thead>
            <tr>
              <th style="width:18%;background:#1E3A5F;color:transparent;font-size:1px;padding:4px;"></th>
              ${impLabels.map(l => `<th style="background:#1E3A5F;color:#fff;padding:5px 3px;text-align:center;font-size:8.5px;font-weight:700;">${l}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${cells.map((row, ri) => `<tr>
              <td style="background:#1E3A5F;color:#fff;padding:4px 3px;text-align:center;font-size:8.5px;font-weight:700;vertical-align:middle;">${perfLabels[ri]}</td>
              ${row.map(c => `<td style="background:${c.bg};padding:6px 4px;text-align:center;vertical-align:middle;border:1px solid rgba(0,0,0,.06);">
                <div style="font-weight:${c.bold ? '900' : '700'};color:${c.color};font-size:${c.bold ? 10.5 : 9.5}px;line-height:1.2;">${c.label}</div>
                <div style="color:${c.color};font-size:8px;opacity:.8;margin-top:2px;">${c.sub}</div>
              </td>`).join('')}
            </tr>`).join('')}
          </tbody>
        </table>
        <div style="text-align:center;font-size:8.5px;color:#64748B;margin-top:4px;font-weight:600;">
          ${pt ? '← Importância para Clientes (1–9) →' : '← Importance to Customers (1–9) →'}
        </div>
      </div>
    </div>
  </div>`;
};

/* ─── 10. Product Life Cycle (SVG curve + HTML table) ────────── */
window.vis_lifecycle = function(container, lang) {
  const pt = lang === 'pt';
  const stages = pt
    ? ['Introdução', 'Crescimento', 'Maturidade', 'Declínio', 'Retirada']
    : ['Introduction', 'Growth', 'Maturity', 'Decline', 'Withdrawal'];
  const winners = pt
    ? ['Design/\nEspecific.', 'Disponib.', 'Preço/\nConfiab.', 'Preço', 'Preço']
    : ['Design/\nSpec.', 'Availability', 'Price/\nReliab.', 'Price', 'Price'];
  const customers = pt
    ? ['Inovadores', 'Maioria\nPrecoce', 'Maioria\nTardia', 'Retardatários', 'Retard.']
    : ['Innovators', 'Early\nMajority', 'Late\nMajority', 'Laggards', 'Laggards'];

  const W = 460, H = 160;
  const padL = 40, padR = 10, padT = 14, padB = 30;
  const iw = W - padL - padR, ih = H - padT - padB;

  // Bell curve points: x-pct, vol-pct (0=low,100=high)
  const curvePts = [[0,4],[0.12,10],[0.25,38],[0.38,80],[0.48,98],[0.55,98],[0.62,88],[0.73,55],[0.84,22],[0.93,8],[1,4]];
  const toX = p => padL + p * iw;
  const toY = v => padT + (1 - v / 100) * ih;

  // Stage dividers at x-pct
  const divs = [0.24, 0.47, 0.67, 0.85];
  // Stage label centers (between dividers)
  const stageCenters = [0.12, 0.355, 0.57, 0.76, 0.925];

  const pathD = curvePts.map((p, i) => (i === 0 ? 'M' : 'L') + ` ${toX(p[0]).toFixed(1)},${toY(p[1]).toFixed(1)}`).join(' ');

  // Gradient fill under curve
  const fillPts = [...curvePts, [1, 0], [0, 0]];
  const fillD = fillPts.map((p, i) => (i === 0 ? 'M' : 'L') + ` ${toX(p[0]).toFixed(1)},${toY(p[1]).toFixed(1)}`).join(' ') + ' Z';

  const stageColors = ['#DBEAFE','#D1FAE5','#FEF9C3','#FEE2E2','#F1F5F9'];
  const stageTextColors = ['#1D4ED8','#15803D','#A16207','#B91C1C','#94A3B8'];

  const svgContent = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;">
    <defs>
      <linearGradient id="lcGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#003865" stop-opacity=".18"/>
        <stop offset="100%" stop-color="#003865" stop-opacity=".03"/>
      </linearGradient>
    </defs>
    <!-- Stage background bands -->
    ${divs.map((d, i) => {
      const x0 = i === 0 ? toX(0) : toX(divs[i-1]);
      const x1 = toX(d);
      return `<rect x="${x0.toFixed(1)}" y="${padT}" width="${(x1-x0).toFixed(1)}" height="${ih}" fill="${stageColors[i]}" opacity=".45"/>`;
    }).join('')}
    <rect x="${toX(divs[3]).toFixed(1)}" y="${padT}" width="${(toX(1)-toX(divs[3])).toFixed(1)}" height="${ih}" fill="${stageColors[4]}" opacity=".45"/>
    <!-- Divider lines -->
    ${divs.map(d => `<line x1="${toX(d).toFixed(1)}" y1="${padT}" x2="${toX(d).toFixed(1)}" y2="${padT+ih}" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="3,2"/>`).join('')}
    <!-- Fill under curve -->
    <path d="${fillD}" fill="url(#lcGrad)"/>
    <!-- Curve -->
    <path d="${pathD}" fill="none" stroke="#003865" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- Y-axis -->
    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+ih}" stroke="#94A3B8" stroke-width="1"/>
    <line x1="${padL}" y1="${padT+ih}" x2="${padL+iw}" y2="${padT+ih}" stroke="#94A3B8" stroke-width="1"/>
    <!-- Y label -->
    <text x="10" y="${padT + ih/2}" text-anchor="middle" font-size="8" fill="#64748B" font-weight="600" transform="rotate(-90 10 ${padT+ih/2})">${pt ? 'Volume' : 'Volume'}</text>
    <!-- Stage labels -->
    ${stageCenters.map((cx, i) => `<text x="${toX(cx).toFixed(1)}" y="${padT + ih + 16}" text-anchor="middle" font-size="8.5" fill="${stageTextColors[i]}" font-weight="700">${stages[i]}</text>`).join('')}
  </svg>`;

  // Winner + customers table
  const tableHtml = `<table style="width:100%;border-collapse:collapse;font-size:10px;margin-top:6px;">
    <thead>
      <tr>
        <th style="background:#1E3A5F;color:#fff;padding:4px 6px;font-size:9px;font-weight:700;">${pt ? 'Estágio' : 'Stage'}</th>
        ${stages.map((s, i) => `<th style="background:${stageColors[i]};color:${stageTextColors[i]};padding:4px 4px;font-size:9px;font-weight:700;text-align:center;">${s}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="background:#F8FAFC;padding:4px 6px;font-weight:700;color:#475569;font-size:9px;white-space:nowrap;">${pt ? 'Order Winner' : 'Order Winner'}</td>
        ${winners.map((w, i) => `<td style="background:${stageColors[i]};padding:4px 4px;text-align:center;font-size:9px;color:${stageTextColors[i]};font-weight:600;white-space:pre-line;">${w}</td>`).join('')}
      </tr>
      <tr>
        <td style="background:#F1F5F9;padding:4px 6px;font-weight:700;color:#475569;font-size:9px;white-space:nowrap;">${pt ? 'Clientes' : 'Customers'}</td>
        ${customers.map((c, i) => `<td style="background:#F8FAFC;padding:4px 4px;text-align:center;font-size:8.5px;color:#64748B;white-space:pre-line;">${c}</td>`).join('')}
      </tr>
    </tbody>
  </table>`;

  container.innerHTML = `<div style="width:100%;overflow-x:auto;">${svgContent}${tableHtml}</div>`;
};

/* ─── 11. Porter's Generic Strategies (2×2 HTML grid) ────────── */
window.vis_genericStrategies = function(container, lang) {
  const pt = lang === 'pt';
  const quads = [
    { row: 0, col: 0,
      title: pt ? 'Liderança em Custo' : 'Cost Leadership',
      sub:   pt ? 'Amplo + Menor Custo' : 'Broad + Lowest Cost',
      body:  pt ? 'Todo o mercado\nEficiência máxima\nEconomias de escala'
                : 'Whole market\nMaximum efficiency\nEconomies of scale',
      eg: 'Toyota, Aldi, Ryanair',
      bg: '#DBEAFE', color: '#1D4ED8' },
    { row: 0, col: 1,
      title: pt ? 'Diferenciação' : 'Differentiation',
      sub:   pt ? 'Amplo + Único' : 'Broad + Unique',
      body:  pt ? 'Todo o mercado\nProduto percebido como superior\nInovação, qualidade'
                : 'Whole market\nProduct perceived as superior\nInnovation, quality',
      eg: 'Apple, Rolex, Rolls-Royce',
      bg: '#D1FAE5', color: '#15803D' },
    { row: 1, col: 0,
      title: pt ? 'Foco em Custo' : 'Cost Focus',
      sub:   pt ? 'Nicho + Menor Custo' : 'Narrow + Lowest Cost',
      body:  pt ? 'Segmento específico\nMenor custo dentro do nicho'
                : 'Specific segment\nLowest cost within the niche',
      eg: pt ? 'Companhias aéreas regionais de baixo custo' : 'Regional low-cost airlines',
      bg: '#FEF9C3', color: '#A16207' },
    { row: 1, col: 1,
      title: pt ? 'Foco em Diferenciação' : 'Differentiation Focus',
      sub:   pt ? 'Nicho + Único' : 'Narrow + Unique',
      body:  pt ? 'Segmento específico\nDiferencial exclusivo no nicho'
                : 'Specific segment\nExclusive differentiator in niche',
      eg: 'Linn Products, Pashley Cycles',
      bg: '#FEE2E2', color: '#B91C1C' },
  ];

  container.innerHTML = `<div style="font-size:11px;width:100%;padding:4px;">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:6px;">
      ${pt ? 'Estratégias Genéricas de Porter (1985)' : "Porter's Generic Strategies (1985)"}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
      ${quads.map(q => `
        <div style="background:${q.bg};border-radius:6px;padding:10px 10px 8px;border:1.5px solid ${q.color}22;">
          <div style="font-weight:800;color:${q.color};font-size:10.5px;margin-bottom:2px;">${q.title}</div>
          <div style="font-size:8.5px;color:${q.color};font-weight:600;opacity:.7;margin-bottom:5px;">${q.sub}</div>
          <div style="font-size:10px;color:#475569;white-space:pre-line;line-height:1.5;margin-bottom:5px;">${q.body}</div>
          <div style="font-size:8.5px;color:${q.color};font-style:italic;">eg: ${q.eg}</div>
        </div>
      `).join('')}
    </div>
    <div style="background:#1E293B;color:#F8FAFC;border-radius:5px;padding:7px 10px;font-size:9.5px;line-height:1.5;text-align:center;">
      ⚠️ <strong>${pt ? '"Stuck in the Middle"' : '"Stuck in the Middle"'}</strong>
      ${pt ? '— tentar perseguir duas estratégias sem comprometimento resulta em desempenho medíocre.'
           : '— attempting two strategies simultaneously without commitment results in mediocre performance.'}
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:8.5px;font-weight:600;color:#64748B;">
      <span>${pt ? '← Escopo: Nicho → Mercado Amplo →' : '← Scope: Narrow → Broad →'}</span>
    </div>
  </div>`;
};

/* ─── 12. Value Disciplines — Treacy & Wiersema (HTML pillars) ─ */
window.vis_valueDisciplines = function(container, lang) {
  const pt = lang === 'pt';
  const disciplines = [
    {
      title:    pt ? 'Excelência Operacional' : 'Operational Excellence',
      sub:      pt ? 'Melhor Custo Total' : 'Best Total Cost',
      icon:     '⚙️',
      body:     pt
        ? 'Processos eficientes\nSupply chain enxuta\nPadronização'
        : 'Efficient processes\nLean supply chain\nStandardisation',
      examples: 'McDonald\'s, Toyota, Aldi, Amazon',
      bg: '#DBEAFE', color: '#1D4ED8', border: '#93C5FD'
    },
    {
      title:    pt ? 'Liderança de Produto' : 'Product Leadership',
      sub:      pt ? 'Melhor Produto' : 'Best Product',
      icon:     '💡',
      body:     pt
        ? 'Inovação contínua\nR&D intensivo\nTime-to-market rápido'
        : 'Continuous innovation\nIntensive R&D\nFast time-to-market',
      examples: 'Apple, Intel, Nike, 3M',
      bg: '#D1FAE5', color: '#15803D', border: '#6EE7B7'
    },
    {
      title:    pt ? 'Intimidade com o Cliente' : 'Customer Intimacy',
      sub:      pt ? 'Melhor Solução Total' : 'Best Total Solution',
      icon:     '🤝',
      body:     pt
        ? 'Conhecimento profundo do cliente\nCustomização\nRelacionamento longo prazo'
        : 'Deep customer knowledge\nCustomisation\nLong-term relationships',
      examples: 'IBM, Salesforce, Four Seasons',
      bg: '#FEF9C3', color: '#A16207', border: '#FCD34D'
    }
  ];

  container.innerHTML = `<div style="font-size:11px;width:100%;padding:4px;">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:6px;">
      ${pt ? 'Disciplinas de Valor — Treacy & Wiersema (1993)' : 'Value Disciplines — Treacy & Wiersema (1993)'}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-bottom:8px;">
      ${disciplines.map(d => `
        <div style="background:${d.bg};border-radius:7px;padding:10px 8px 8px;border:1.5px solid ${d.border};text-align:center;">
          <div style="font-size:20px;margin-bottom:4px;">${d.icon}</div>
          <div style="font-weight:800;color:${d.color};font-size:9.5px;margin-bottom:1px;line-height:1.3;">${d.title}</div>
          <div style="font-size:8px;color:${d.color};font-weight:700;opacity:.75;margin-bottom:6px;">${d.sub}</div>
          <div style="font-size:9.5px;color:#475569;white-space:pre-line;line-height:1.55;margin-bottom:5px;text-align:left;">${d.body}</div>
          <div style="font-size:8px;color:${d.color};font-style:italic;text-align:left;">${d.examples}</div>
        </div>
      `).join('')}
    </div>
    <div style="background:#F1F5F9;border-radius:5px;padding:6px 10px;font-size:9.5px;color:#475569;text-align:center;line-height:1.5;border-left:3px solid #003865;">
      📌 <strong>${pt ? 'Regra fundamental:' : 'Fundamental rule:'}</strong>
      ${pt ? '"Excel in one. Be adequate in the other two." — escolha uma disciplina e domine-a. Não é possível liderar nas três.'
           : '"Excel in one. Be adequate in the other two." — choose one discipline and master it. Leading in all three simultaneously is impossible.'}
    </div>
  </div>`;
};

/* ─── 13. Value Matrix — Martinez & Bititci (HTML 3×2 table) ── */
window.vis_valueMatrix = function(container, lang) {
  const pt = lang === 'pt';
  const colHeaders = pt
    ? ['Excelência Operacional', 'Liderança de Produto', 'Intimidade c/ Cliente']
    : ['Operational Excellence', 'Product Leadership', 'Customer Intimacy'];
  const colColors = ['#1D4ED8','#15803D','#A16207'];
  const colBg     = ['#DBEAFE','#D1FAE5','#FEF9C3'];

  const rows = [
    {
      label: pt ? '🔧 Hard\n(Tangível)' : '🔧 Hard\n(Tangible)',
      cells: pt
        ? ['Lean, Six Sigma,\nTecnologia de supply chain,\nSistemas de qualidade',
           'P&D, Patentes,\nEngenharia de precisão,\nEquipamentos de alto desempenho',
           'CRM, Databases,\nAnalítica avançada,\nPlataformas de dados de cliente']
        : ['Lean, Six Sigma,\nSupply chain technology,\nQuality systems',
           'R&D, Patents,\nPrecision engineering,\nHigh-performance equipment',
           'CRM, Databases,\nAdvanced analytics,\nCustomer data platforms']
    },
    {
      label: pt ? '💡 Soft\n(Intangível)' : '💡 Soft\n(Intangible)',
      cells: pt
        ? ['Cultura de melhoria contínua,\nTQM, Padronização de processos,\nMindset de eficiência',
           'Cultura de inovação,\nGestão de talentos criativos,\nTolerância ao risco',
           'Gestão de relacionamentos,\nConhecimento do cliente,\nConfiança e serviço personalizado']
        : ['Continuous improvement culture,\nTQM, Process standardisation,\nEfficiency mindset',
           'Innovation culture,\nCreative talent management,\nRisk tolerance',
           'Relationship management,\nCustomer knowledge,\nTrust and personal service']
    }
  ];

  container.innerHTML = `<div style="font-size:10.5px;width:100%;padding:4px;overflow-x:auto;">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:6px;">
      ${pt ? 'Matriz de Valor — Martinez & Bititci (2000)' : 'Value Matrix — Martinez & Bititci (2000)'}
    </div>
    <table style="width:100%;border-collapse:collapse;table-layout:fixed;min-width:320px;">
      <thead>
        <tr>
          <th style="width:20%;background:#1E3A5F;color:transparent;font-size:1px;padding:5px 6px;"></th>
          ${colHeaders.map((h, i) => `<th style="background:${colBg[i]};color:${colColors[i]};padding:6px 5px;text-align:center;font-size:9px;font-weight:800;border:1px solid rgba(0,0,0,.07);">${h}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.map((row, ri) => `<tr>
          <td style="background:#1E3A5F;color:#fff;padding:6px 5px;text-align:center;font-size:9px;font-weight:700;white-space:pre-line;vertical-align:middle;">${row.label}</td>
          ${row.cells.map((c, ci) => `<td style="background:${ri === 0 ? '#F8FAFC' : '#fff'};padding:6px 5px;font-size:9.5px;color:#374151;white-space:pre-line;line-height:1.55;border:1px solid rgba(0,0,0,.06);vertical-align:top;">${c}</td>`).join('')}
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
};
