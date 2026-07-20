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

/* ─── WEEK 3: NPD Flow ─────────────────────────────────────────── */
window.vis_npdFlow = function(container, lang) {
  const pt = lang === 'pt';
  const phases = [
    {
      label: pt ? 'Fase 0\nPlanejamento' : 'Phase 0\nPlanning',
      color: '#1E3A5F',
      details: pt
        ? '<b>Objetivos:</b> definir mercado-alvo, tecnologia disponível, metas financeiras e estratégia de supply chain.<br><b>Quem:</b> Marketing (oportunidades), P&D (tecnologias), Financeiro (metas), CEO (recursos).'
        : '<b>Goals:</b> define target market, available technology, financial goals and supply chain strategy.<br><b>Who:</b> Marketing (opportunities), R&D (technologies), Finance (goals), CEO (resources).'
    },
    {
      label: pt ? 'Fase 1\nConceito' : 'Phase 1\nConcept',
      color: '#2E86AB',
      details: pt
        ? '<b>"Fuzzy Front End"</b> — a fase mais incerta. Investigação de viabilidade, geração e teste de conceitos com lead users.<br><b>Quem:</b> Marketing (necessidades), Financeiro (análise econômica), Jurídico (patentes).'
        : '<b>"Fuzzy Front End"</b> — the most uncertain phase. Feasibility investigation, concept generation and testing with lead users.<br><b>Who:</b> Marketing (needs), Finance (economic analysis), Legal (patents).'
    },
    {
      label: pt ? 'Fase 2\nSistema' : 'Phase 2\nSystem',
      color: '#006E6D',
      details: pt
        ? '<b>Design de Nível Sistema:</b> alternativas de design de produto e subsistemas; arquitetura do produto definida.<br><b>Quem:</b> Marketing (planos por variante), Compras (make-or-buy), Manufatura (esquemas de montagem).'
        : '<b>System-level Design:</b> product and subsystem design alternatives; product architecture defined.<br><b>Who:</b> Marketing (plans per variant), Procurement (make-or-buy), Manufacturing (assembly schemes).'
    },
    {
      label: pt ? 'Fase 3\nDetalhes' : 'Phase 3\nDetailed',
      color: '#2D7D46',
      details: pt
        ? '<b>Design Detalhado:</b> especificações de cada peça, materiais, tolerâncias, BOM completo.<br><b>Quem:</b> Manufatura (processos piece-part, ferramentas, DFM), Financeiro (business plan atualizado).'
        : '<b>Detailed Design:</b> specifications for each part, materials, tolerances, complete BOM.<br><b>Who:</b> Manufacturing (piece-part processes, tooling, DFM), Finance (updated business plan).'
    },
    {
      label: pt ? 'Fase 4\nTeste' : 'Phase 4\nTesting',
      color: '#B8621A',
      details: pt
        ? '<b>Teste e Refinamento:</b> testes de confiabilidade, vida e performance. Aprovações regulatórias. Mudanças de design.<br><b>Quem:</b> Marketing (materiais de lançamento, teste de campo), Manufatura (ramp-up de fornecedores, treinamento).'
        : '<b>Testing and Refinement:</b> reliability, life and performance tests. Regulatory approvals. Design changes.<br><b>Who:</b> Marketing (launch materials, field testing), Manufacturing (supplier ramp-up, workforce training).'
    },
    {
      label: pt ? 'Fase 5\nProdução' : 'Phase 5\nRamp-up',
      color: '#8B1A1A',
      details: pt
        ? '<b>Produção em Escala:</b> transição de prototipagem para alto volume. Marketing posiciona com clientes-chave. Sistema de produção entra em plena operação.'
        : '<b>Production Ramp-up:</b> transition from prototyping to high volume. Marketing positions with key customers. Production system enters full operation.'
    }
  ];
  const id = 'npdf-' + Math.random().toString(36).substr(2,5);
  container.innerHTML = `
    <div style="padding:6px;font-size:10px;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt ? 'Processo DNP — 6 Fases (Ulrich & Eppinger, 2008)' : 'NPD Process — 6 Phases (Ulrich & Eppinger, 2008)'}
      </div>
      <div style="display:flex;gap:2px;margin-bottom:6px;overflow-x:auto;padding-bottom:2px;">
        ${phases.map((p, i) => `<div
          onclick="var ds=document.querySelectorAll('.${id}-detail');var el=document.getElementById('${id}-d${i}');var wasOpen=el.style.display==='block';ds.forEach(function(d){d.style.display='none';});if(!wasOpen){el.style.display='block';}"
          style="flex:1;min-width:46px;background:${p.color};color:#fff;padding:7px 3px 7px 6px;
            clip-path:${i < 5 ? 'polygon(0 0,calc(100% - 7px) 0,100% 50%,calc(100% - 7px) 100%,0 100%)' : 'none'};
            cursor:pointer;text-align:center;font-size:8.5px;font-weight:700;line-height:1.3;user-select:none;"
          onmouseover="this.style.filter='brightness(1.2)'" onmouseout="this.style.filter='none'">
          ${p.label.replace('\n', '<br>')}
        </div>`).join('')}
      </div>
      <div style="font-size:8.5px;color:#9CA3AF;text-align:center;margin-bottom:6px;">
        ${pt ? '▲ Clique numa fase para ver detalhes' : '▲ Click a phase to see details'}
      </div>
      ${phases.map((p, i) => `<div id="${id}-d${i}" class="${id}-detail" style="display:none;background:#F8FAFC;border-left:3px solid ${p.color};padding:8px 10px;margin-bottom:3px;border-radius:0 6px 6px 0;font-size:9.5px;line-height:1.6;color:#374151;">
        <div style="font-weight:700;color:${p.color};margin-bottom:3px;font-size:10px;">${p.label.replace('\n', ' — ')}</div>
        ${p.details}
      </div>`).join('')}
    </div>`;
};

/* ─── WEEK 3: R&D Funnel ───────────────────────────────────────── */
window.vis_rdFunnel = function(container, lang) {
  const pt = lang === 'pt';
  const stages = [
    { n: '60', label: pt ? 'Ideias avaliadas (técnica, financeira, adequação)' : 'Ideas evaluated (technical, financial, suitability)', w: 100, c: '#1E3A5F' },
    { n: '12', label: pt ? 'Avaliação técnica e de mercado aprofundada' : 'Technical evaluation & market research analysis', w: 78, c: '#2E86AB' },
    { n: '6',  label: pt ? 'Potencial para desenvolvimento e análise' : 'Potential for further development & analysis', w: 58, c: '#006E6D' },
    { n: '3',  label: pt ? 'Protótipos para teste técnico e de mercado' : 'Prototypes for technical & market testing', w: 42, c: '#2D7D46' },
    { n: '2',  label: pt ? 'Produtos lançados no mercado' : 'Products launched', w: 28, c: '#B8621A' },
    { n: '1 ✓',label: pt ? 'Produto bem-sucedido — taxa: 1,67%' : 'Successful product — rate: 1.67%', w: 18, c: '#C8102E' }
  ];
  container.innerHTML = `
    <div style="padding:6px 6px 8px;font-size:10px;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:10px;">
        ${pt ? 'Funil de Descarte em P&D (Babcock, 1996)' : 'R&D Drop-out Funnel (Babcock, 1996)'}
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;margin-bottom:10px;">
        ${stages.map((s, i) => `<div style="display:flex;align-items:center;gap:8px;">
          <div style="background:${s.c};color:#fff;font-weight:800;font-size:${i===5?'12':'10'}px;
            text-align:center;padding:5px 4px;border-radius:4px 2px 2px 4px;
            width:${s.w}%;min-width:28px;transition:all .3s;flex-shrink:0;">
            ${s.n}
          </div>
          <div style="font-size:9px;color:#4B5563;line-height:1.4;">${s.label}</div>
        </div>${i < stages.length - 1 ? `<div style="margin-left:calc(${Math.round(s.w/2)}% - 6px);color:#9CA3AF;font-size:11px;line-height:1;">▼</div>` : ''}`).join('')}
      </div>
      <div style="background:#FEF3C7;border:1px solid #F59E0B;border-radius:6px;padding:6px 10px;font-size:9px;color:#92400E;text-align:center;line-height:1.5;">
        ⚠️ ${pt ? 'De <b>60 ideias</b>, apenas <b>1</b> vira produto bem-sucedido — <b>taxa de sucesso: 1,67%</b>' : 'Out of <b>60 ideas</b>, only <b>1</b> becomes a successful product — <b>success rate: 1.67%</b>'}
      </div>
    </div>`;
};

/* ─── WEEK 3: Modular vs Integral ─────────────────────────────── */
window.vis_modularVsIntegral = function(container, lang) {
  const pt = lang === 'pt';
  const rows = pt ? [
    ['Especialização de tarefas',             'Aprendizado interativo entre equipes'],
    ['Flexibilidade de plataforma',           'Performance máxima (tecnologias proprietárias)'],
    ['Maior número de variantes de produto',  'Inovações sistêmicas integradas'],
    ['Economias de escala em componentes',    'Acesso rápido a informações críticas'],
    ['Menor custo de estoque e logística',    'Proteção da inovação contra imitação'],
    ['Reuso e troca de componentes',          'Altas barreiras para fornecedores concorrentes'],
    ['Outsourcing simplificado',              'Craftsmanship — produto único artesanal'],
    ['Desenvolvimento independente de produtos', ''],
  ] : [
    ['Task specialization',                  'Interactive cross-team learning'],
    ['Platform flexibility',                 'High performance via proprietary technologies'],
    ['Increased product variants',           'Systemic innovations'],
    ['Economies of scale in components',     'Faster access to critical information'],
    ['Lower inventory and logistics costs',  'Protection of innovation from imitation'],
    ['Component reuse and swapping',         'High entry barriers for component suppliers'],
    ['Simplified outsourcing',               'Craftsmanship — unique artisanal product'],
    ['Independent product development',      ''],
  ];
  container.innerHTML = `
    <div style="padding:4px;font-size:10px;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt ? 'Modular vs. Integral — Trade-offs (Mikkola & Gassmann, 2003)' : 'Modular vs. Integral — Trade-offs (Mikkola & Gassmann, 2003)'}
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:9.5px;">
        <thead>
          <tr>
            <th style="background:#2E86AB;color:#fff;padding:7px 8px;text-align:center;border-radius:6px 0 0 0;width:50%;">
              ✦ ${pt ? 'Modular' : 'Modular'}
            </th>
            <th style="background:#8B1A1A;color:#fff;padding:7px 8px;text-align:center;border-radius:0 6px 0 0;width:50%;">
              ✦ ${pt ? 'Integral' : 'Integral'}
            </th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r, i) => `<tr>
            <td style="background:${i%2===0?'#EBF5FB':'#F8FAFC'};padding:5px 8px;border:1px solid #E5E7EB;color:#1E3A5F;line-height:1.4;">${r[0] ? '• '+r[0] : ''}</td>
            <td style="background:${i%2===0?'#FEF2F2':'#FFF5F5'};padding:5px 8px;border:1px solid #E5E7EB;color:#7B1C1C;line-height:1.4;">${r[1] ? '• '+r[1] : ''}</td>
          </tr>`).join('')}
          <tr>
            <td style="background:#D6EAF8;padding:6px 8px;font-size:9px;font-weight:700;color:#1E3A5F;border:1px solid #E5E7EB;">
              📱 ${pt ? 'Ex: PCs IBM, LEGO, celulares, elevadores' : 'Ex: IBM PCs, LEGO, mobile phones, elevators'}
            </td>
            <td style="background:#FADBD8;padding:6px 8px;font-size:9px;font-weight:700;color:#7B1C1C;border:1px solid #E5E7EB;">
              🏎️ ${pt ? 'Ex: F1, satélites, Apollo, violinos Stradivarius' : 'Ex: F1, satellites, Apollo, Stradivarius violins'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>`;
};

/* ─── WEEK 3: Product Platform (VW) ────────────────────────────── */
window.vis_productPlatform = function(container, lang) {
  const pt = lang === 'pt';
  const brands = [
    { name: 'Skoda Oktavia', pos: 5,  color: '#2D7D46', label: pt ? 'Liderança em Custo' : 'Cost Leadership' },
    { name: 'Seat Leon',     pos: 24, color: '#2E86AB', label: pt ? 'Custo-Qualidade'    : 'Cost-Quality' },
    { name: 'VW Golf',       pos: 45, color: '#003865', label: pt ? 'Volume / Equilíbrio': 'Volume / Balance' },
    { name: 'Audi A3',       pos: 66, color: '#B8621A', label: pt ? 'Diferenciação'      : 'Differentiation' },
    { name: 'Audi TT',       pos: 85, color: '#8B1A1A', label: pt ? 'Premium'            : 'Premium Diff.' },
  ];
  container.innerHTML = `
    <div style="padding:6px;font-size:10px;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:10px;">
        ${pt ? 'Estratégia de Plataforma VW Group — Plataforma A4' : 'VW Group Platform Strategy — A4 Platform'}
      </div>
      <div style="background:#F1F5F9;border-radius:6px;padding:8px 10px;margin-bottom:10px;">
        <div style="font-size:8.5px;color:#6B7280;text-align:center;margin-bottom:8px;">
          ${pt ? '🔩 Todos compartilham: chassis, direção e suspensão' : '🔩 All share: chassis, steering and suspension'}
        </div>
        <div style="position:relative;height:28px;background:linear-gradient(to right,#2D7D46,#8B1A1A);border-radius:4px;margin:0 4px 20px;">
          ${brands.map(b => `<div style="position:absolute;left:${b.pos}%;top:50%;transform:translate(-50%,-50%);">
            <div style="background:${b.color};color:#fff;font-size:7.5px;font-weight:700;padding:2px 5px;
              border-radius:8px;white-space:nowrap;box-shadow:0 2px 5px rgba(0,0,0,.35);">${b.name}</div>
          </div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#6B7280;padding:0 4px;margin-top:2px;">
          <span>◄ ${pt ? 'Baixo Custo' : 'Low Cost'}</span>
          <span>${pt ? 'Diferenciação' : 'Differentiation'} ►</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px;">
        ${brands.map(b => `<div style="border:1px solid ${b.color};border-left:3px solid ${b.color};border-radius:5px;padding:4px 7px;">
          <div style="font-weight:700;font-size:9.5px;color:${b.color};">${b.name}</div>
          <div style="font-size:8.5px;color:#6B7280;">${b.label}</div>
        </div>`).join('')}
      </div>
      <div style="background:#EBF5FB;border-radius:5px;padding:5px 8px;font-size:8.5px;color:#1E3A5F;line-height:1.5;">
        💡 ${pt ? 'Sony: 160+ variações do Walkman (1980–1990) a partir de uma única plataforma' : 'Sony: 160+ Walkman variations (1980–1990) from a single platform'}
      </div>
    </div>`;
// END vis_productPlatform
};

// ─── WEEK 4: PROCESS TYPES ─────────────────────────────────────────────────
window.vis_processTypes = function(container, lang) {
  const pt = lang === 'pt';
  const types = [
    { id: 'project',  color: '#7C3AED', label: pt?'Projeto':'Project',       vol: pt?'Único':'Unique',      var: pt?'Máxima':'Maximum',   order:'MTO',     layout: pt?'Posição Fixa':'Fixed Position',             ex: pt?'Airbus, Olimpíadas, Cirurgia':'Airbus, Olympics, Surgery',    cx:48,  cy:168, key: pt?'Grande escala, fixo no local, gestão de projeto':'Large-scale, fixed at location, project management' },
    { id: 'jobshop',  color: '#DC2626', label: pt?'Oficina (Job Shop)':'Job Shop', vol: pt?'Muito baixo':'Very low', var: pt?'Muito alta':'Very high', order:'MTO',     layout: pt?'Processo Dominante':'Process-Dominant',      ex: pt?'Läderach, alfaiate, joalheria':'Läderach, bespoke tailor, jeweller', cx:88,  cy:142, key: pt?'Alta habilidade, cada trabalho é único, alto custo unitário':'High skill, each job unique, high unit cost' },
    { id: 'batch',    color: '#D97706', label: pt?'Lote (Batch)':'Batch',     vol: pt?'Médio':'Medium',      var: pt?'Média':'Medium',     order:'MTO/ATO', layout: pt?'Célula ou Processo':'Cell or Process',          ex: pt?'Padaria, cervejaria, marcenaria':'Bakery, brewery, furniture maker',     cx:140, cy:110, key: pt?'Produção em lotes, semi-flexível, reconfiguração entre lotes':'Lot-based, semi-flexible, reconfigured between lots' },
    { id: 'assembly', color: '#059669', label: pt?'Linha de Montagem':'Assembly Line', vol: pt?'Alto':'High', var: pt?'Baixa':'Low',    order:'ATO/MTS', layout: pt?'Produto-Serviço Dominante':'Product-Service Dominant', ex: "Toyota, Tesla, McDonald's",                                cx:196, cy:76,  key: pt?'Fluxo contínuo de produtos discretos, balanceamento de linha':'Continuous flow of discrete products, line balancing' },
    { id: 'continuous',color:'#0284C7', label: pt?'Contínuo':'Continuous',    vol: '24/7',              var: pt?'Zero':'Zero',        order:'MTS',     layout: pt?'Produto-Serviço Extremo':'Extreme Product-Service',    ex: pt?'Refinaria, usina elétrica, papel':'Oil refinery, power plant, paper',   cx:244, cy:46,  key: pt?'Automatizado 24/7, variedade zero, parar é muito caro':'Automated 24/7, zero variety, stopping is very expensive' },
  ];
  let active = 'batch';
  const render = () => {
    const a = types.find(t => t.id === active);
    container.innerHTML = `
    <div style="font-family:sans-serif;padding:4px;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="flex-shrink:0;">
          <svg width="300" height="220" viewBox="0 0 300 220" style="display:block;border-radius:8px;background:#F8FAFC;border:1px solid #E2E8F0;">
            <text x="150" y="214" text-anchor="middle" font-size="10" fill="#64748B" font-family="sans-serif">${pt?'← Volume baixo · · · Volume alto →':'← Low volume · · · High volume →'}</text>
            <text x="10" y="110" text-anchor="middle" font-size="10" fill="#64748B" font-family="sans-serif" transform="rotate(-90,10,110)">${pt?'← Var. baixa · Var. alta →':'← Low var. · High var. →'}</text>
            <rect x="170" y="20" width="118" height="130" rx="6" fill="#FEE2E2" opacity="0.55"/>
            <text x="229" y="55" text-anchor="middle" font-size="9" fill="#991B1B" font-family="sans-serif" font-weight="700">${pt?'⚠ ZONA MORTA':'⚠ DEAD ZONE'}</text>
            <text x="229" y="68" text-anchor="middle" font-size="8" fill="#991B1B" font-family="sans-serif">${pt?'Custo inviável':'Prohibitive cost'}</text>
            <rect x="18" y="140" width="120" height="60" rx="6" fill="#FEE2E2" opacity="0.55"/>
            <text x="78" y="165" text-anchor="middle" font-size="9" fill="#991B1B" font-family="sans-serif" font-weight="700">${pt?'⚠ ZONA MORTA':'⚠ DEAD ZONE'}</text>
            <text x="78" y="178" text-anchor="middle" font-size="8" fill="#991B1B" font-family="sans-serif">${pt?'Escala insuficiente':'Insufficient scale'}</text>
            <polygon points="20,190 20,160 290,20 290,50" fill="#DBEAFE" opacity="0.65"/>
            ${types.map(t => `
              <g style="cursor:pointer" onclick="(function(){window._pt4active='${t.id}';window._pt4render&&window._pt4render();})()">
                <circle cx="${t.cx}" cy="${t.cy}" r="${active===t.id?13:9}" fill="${t.color}" opacity="${active===t.id?1:0.75}" stroke="white" stroke-width="2"/>
                <text x="${t.cx}" y="${t.cy+4}" text-anchor="middle" font-size="8" fill="white" font-family="sans-serif" font-weight="700">${t.label.split(' (')[0].split(' ')[0].substring(0,3).toUpperCase()}</text>
              </g>`).join('')}
            <line x1="18" y1="200" x2="290" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
            <line x1="18" y1="20" x2="18" y2="200" stroke="#CBD5E1" stroke-width="1.5"/>
          </svg>
          <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:3px;">
            ${types.map(t => `<button onclick="(function(){window._pt4active='${t.id}';window._pt4render&&window._pt4render();})()" style="padding:3px 7px;border-radius:4px;border:1.5px solid ${t.color};background:${active===t.id?t.color:'white'};color:${active===t.id?'white':t.color};font-size:8px;font-weight:700;cursor:pointer;font-family:sans-serif;">${t.label.replace(' (Job Shop)','').replace(' (Batch)','')}</button>`).join('')}
          </div>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="background:${a.color}15;border-left:3px solid ${a.color};border-radius:6px;padding:10px 12px;">
            <div style="font-size:14px;font-weight:800;color:${a.color};margin-bottom:6px;">${a.label}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;font-size:9px;margin-bottom:8px;">
              <div><span style="color:#64748B;">${pt?'Volume':'Volume'}:</span> <strong>${a.vol}</strong></div>
              <div><span style="color:#64748B;">${pt?'Variedade':'Variety'}:</span> <strong>${a.var}</strong></div>
              <div><span style="color:#64748B;">${pt?'Tipo de pedido':'Order type'}:</span> <strong>${a.order}</strong></div>
              <div><span style="color:#64748B;">Layout:</span> <strong>${a.layout}</strong></div>
            </div>
            <div style="font-size:8.5px;color:#1E293B;line-height:1.5;margin-bottom:6px;">${a.key}</div>
            <div style="background:white;border-radius:4px;padding:4px 7px;font-size:8px;color:#6B7280;">📍 ${a.ex}</div>
          </div>
          <div style="margin-top:8px;background:#F1F5F9;border-radius:6px;padding:7px 10px;font-size:8px;color:#475569;line-height:1.6;">
            <strong>${pt?'Diagonal eficiente:':'Efficient diagonal:'}</strong><br>
            ${pt?'Operações eficientes ficam NA diagonal. Fora dela:':'Efficient operations sit ON the diagonal. Off it:'}<br>
            🔴 ${pt?'Canto sup. direito = alto vol + alta var → custo inviável':'Top right = high vol + high var → prohibitive cost'}<br>
            🔴 ${pt?'Canto inf. esquerdo = baixo vol + baixa var → escala insuficiente':'Bottom left = low vol + low var → insufficient scale'}
          </div>
        </div>
      </div>
    </div>`;
    window._pt4active = active;
    window._pt4render = () => { active = window._pt4active; render(); };
  };
  window._pt4active = active;
  render();
  window._pt4render = () => { active = window._pt4active; render(); };
};

// ─── WEEK 4: ORDER TYPES ───────────────────────────────────────────────────
window.vis_orderTypes = function(container, lang) {
  const pt = lang === 'pt';
  container.innerHTML = `
  <div style="font-family:sans-serif;padding:4px;">
    <div style="position:relative;height:36px;margin-bottom:14px;">
      <div style="position:absolute;left:0;right:0;top:14px;height:8px;border-radius:4px;background:linear-gradient(to right,#0284C7,#059669,#DC2626);"></div>
      <div style="position:absolute;left:0;top:0;font-size:9px;font-weight:700;color:#0284C7;text-align:center;width:33%;">MTS</div>
      <div style="position:absolute;left:33%;top:0;font-size:9px;font-weight:700;color:#059669;text-align:center;width:34%;">ATO</div>
      <div style="position:absolute;right:0;top:0;font-size:9px;font-weight:700;color:#DC2626;text-align:center;width:33%;">MTO</div>
      <div style="position:absolute;left:0;bottom:0;font-size:8px;color:#64748B;width:33%;text-align:center;">${pt?'← Padronizado':'← Standardized'}</div>
      <div style="position:absolute;right:0;bottom:0;font-size:8px;color:#64748B;width:33%;text-align:right;">${pt?'Customizado →':'Customized →'}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
      ${[
        { key:'MTS', title: pt?'Fabricar para Estoque':'Make to Stock', color:'#0284C7', icon:'📦',
          rows: [[pt?'Gatilho':'Trigger',pt?'Previsão de demanda':'Demand forecast'],[pt?'Lead time':'Lead time',pt?'Curto — imediato':'Short — immediate'],[pt?'Customização':'Customization',pt?'Zero':'Zero'],[pt?'Estoque':'Inventory',pt?'Produto acabado':'Finished goods'],[pt?'Ponto custom.':'Custom. point',pt?'Início da cadeia':'Start of chain'],[pt?'Risco':'Risk',pt?'Estoque encalhado':'Unsold stock'],[pt?'Exemplos':'Examples',pt?'Supermercado, lata':'Supermarket, canned']]},
        { key:'ATO', title: pt?'Montar sob Pedido':'Assemble to Order', color:'#059669', icon:'🔧',
          rows: [[pt?'Gatilho':'Trigger',pt?'Pedido do cliente':'Customer order'],[pt?'Lead time':'Lead time',pt?'Moderado':'Moderate'],[pt?'Customização':'Customization',pt?'Limitada (módulos)':'Limited (modules)'],[pt?'Estoque':'Inventory',pt?'Componentes padrão':'Standard components'],[pt?'Ponto custom.':'Custom. point',pt?'Na montagem':'At assembly'],[pt?'Risco':'Risk',pt?'Previsão de comp.':'Component forecast'],[pt?'Exemplos':'Examples',pt?'Dell, Tesla, fast food':'Dell, Tesla, fast food']]},
        { key:'MTO', title: pt?'Fabricar sob Pedido':'Make to Order', color:'#DC2626', icon:'🎨',
          rows: [[pt?'Gatilho':'Trigger',pt?'Pedido do cliente':'Customer order'],[pt?'Lead time':'Lead time',pt?'Longo':'Long'],[pt?'Customização':'Customization',pt?'Máxima':'Maximum'],[pt?'Estoque':'Inventory',pt?'Matéria-prima':'Raw material'],[pt?'Ponto custom.':'Custom. point',pt?'Na concepção':'At conception'],[pt?'Risco':'Risk',pt?'Lead time longo':'Long lead time'],[pt?'Exemplos':'Examples',pt?'Läderach, obra civil':'Läderach, construction']]},
      ].map(col => `
        <div style="border:1.5px solid ${col.color};border-radius:8px;overflow:hidden;">
          <div style="background:${col.color};padding:6px 8px;color:white;font-size:10px;font-weight:800;">${col.icon} ${col.title}</div>
          ${col.rows.map(([k,v]) => `<div style="padding:4px 8px;border-bottom:1px solid ${col.color}22;"><div style="font-size:7px;color:#94A3B8;text-transform:uppercase;letter-spacing:.4px;">${k}</div><div style="font-size:8.5px;color:#1E293B;font-weight:600;line-height:1.3;">${v}</div></div>`).join('')}
        </div>`).join('')}
    </div>
  </div>`;
};

// ─── WEEK 4: PROCESS MAPPING TOOLS ────────────────────────────────────────
window.vis_processMappingTools = function(container, lang) {
  const pt = lang === 'pt';
  const tools = [
    { icon:'→', color:'#0284C7', name: pt?'Diagrama de Fluxo':'Flow Diagram',
      when: pt?'Processo simples e linear':'Simple, linear process',
      key: pt?'Sequência lógica com inputs/outputs. Símbolos: losango=decisão, oval=início/fim, retângulo=processo.':'Logical sequence with inputs/outputs. Symbols: diamond=decision, oval=start/end, rectangle=process.',
      ex: pt?'Fig. 5.6: Pedido de sofá':'Fig. 5.6: Sofa ordering' },
    { icon:'≡', color:'#7C3AED', name: pt?'Swim Lane Map':'Swim Lane Map',
      when: pt?'Hand-offs entre departamentos e tempos de espera':'Hand-offs between departments and waiting times',
      key: pt?'Eixo Y = funções/responsáveis. Eixo X = tempo. Revela quem faz o quê e quando.':'Y axis = functions/roles. X axis = time. Reveals who does what and when.',
      ex: pt?'Fig. 5.7: Pedido de sofá com raias (Customer/Sales/Warehouse/Factory)':'Fig. 5.7: Sofa order with lanes (Customer/Sales/Warehouse/Factory)' },
    { icon:'○', color:'#D97706', name: pt?'Gráfico de Processo':'Process Chart',
      when: pt?'Identificar atividades sem valor agregado (non-value-adding)':'Identify non-value-adding activities',
      key: pt?'Tabela padronizada com 5 símbolos: Operação ○, Transporte →, Inspeção □, Espera D, Armazenagem ∇':'Standardized table with 5 symbols: Operation ○, Transport →, Inspection □, Delay D, Storage ∇',
      ex: pt?'Fig. 5.8: Entrega de documentos — 24 atividades mapeadas':'Fig. 5.8: Document delivery — 24 activities mapped' },
    { icon:'⚙', color:'#059669', name: pt?'Blueprint de Serviço':'Service Blueprint',
      when: pt?'Processos com alto componente de serviço ao cliente':'Processes with high customer service component',
      key: pt?'Separa: Evidência Física | Ações do Usuário | Front-of-stage (visível) | Back-of-stage (invisível) | Suporte':'Separates: Physical Evidence | User Actions | Front-of-stage (visible) | Back-of-stage (invisible) | Support',
      ex: pt?'Fig. 5.9: Boas-vindas a estudantes de curso universitário':'Fig. 5.9: Welcoming students to a university course' },
    { icon:'⟿', color:'#DC2626', name: pt?'Mapa de Fluxo de Valor (VSM)':'Value Stream Map (VSM)',
      when: pt?'Eliminar desperdício lean em processos de manufatura':'Eliminate lean waste in manufacturing processes',
      key: pt?'Estado Atual + Estado Futuro. Métricas: C/T, C/O, WIP, Takt time. Mostra fluxos de material E informação.':'Current State + Future State. Metrics: C/T, C/O, WIP, Takt time. Shows material AND information flows.',
      ex: pt?'Fig. 5.11/5.13: ACME — 23,6 dias → 4,5 dias (−81% espera)':'Fig. 5.11/5.13: ACME — 23.6 days → 4.5 days (−81% waiting)' },
  ];
  container.innerHTML = `
  <div style="font-family:sans-serif;padding:4px;display:flex;flex-direction:column;gap:5px;">
    ${tools.map(t => `
    <div style="display:flex;gap:8px;align-items:flex-start;border:1px solid ${t.color}44;border-left:3px solid ${t.color};border-radius:6px;padding:7px 9px;background:${t.color}08;">
      <div style="width:26px;height:26px;border-radius:50%;background:${t.color};color:white;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;font-family:monospace;">${t.icon}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10.5px;font-weight:800;color:${t.color};margin-bottom:2px;">${t.name}</div>
        <div style="font-size:8px;color:#475569;margin-bottom:3px;line-height:1.4;"><strong>${pt?'Quando:':'When:'}</strong> ${t.when}</div>
        <div style="font-size:8px;color:#374151;line-height:1.4;margin-bottom:3px;">${t.key}</div>
        <div style="font-size:7.5px;color:#94A3B8;">📌 ${t.ex}</div>
      </div>
    </div>`).join('')}
  </div>`;
};

// ─── WEEK 4: VSM CONCEPT ──────────────────────────────────────────────────
window.vis_vsmConcept = function(container, lang) {
  const pt = lang === 'pt';
  container.innerHTML = `
  <div style="font-family:sans-serif;padding:4px;">
    <div style="text-align:center;font-size:9px;font-weight:700;color:#64748B;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;">
      ${pt?'Caso ACME — Suportes para Tratores (Rother & Shook, 1999)':'ACME Case — Tractor Brackets (Rother & Shook, 1999)'}
    </div>
    <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;margin-bottom:10px;">
      <div style="background:#FEF2F2;border:1.5px solid #DC2626;border-radius:8px;padding:8px 10px;">
        <div style="font-size:9px;font-weight:800;color:#DC2626;margin-bottom:6px;text-align:center;">${pt?'⚠ ESTADO ATUAL':'⚠ CURRENT STATE'}</div>
        <div style="display:flex;flex-direction:column;gap:3px;font-size:8px;">
          ${['Stamping','S.Weld 1','S.Weld 2','Assembly 1','Assembly 2','Shipping'].map((s,i) => `
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="color:#374151;">${s}</span>
              <span style="background:#DC262620;color:#DC2626;padding:1px 5px;border-radius:3px;font-weight:700;">${['1s','46s','46s','62s','40s','0s'][i]}</span>
            </div>`).join('')}
          <div style="margin-top:5px;padding-top:5px;border-top:1px solid #DC262640;">
            <div style="background:#DC2626;color:white;border-radius:5px;padding:4px 7px;margin-bottom:3px;">
              <div style="font-size:9px;font-weight:800;">${pt?'⏱ Espera total':'⏱ Total waiting'}</div>
              <div style="font-size:18px;font-weight:900;">23.6 ${pt?'dias':'days'}</div>
            </div>
            <div style="background:#F87171;color:white;border-radius:5px;padding:4px 7px;">
              <div style="font-size:9px;font-weight:800;">${pt?'⚙ Processamento':'⚙ Processing'}</div>
              <div style="font-size:14px;font-weight:900;">195 s</div>
            </div>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="font-size:20px;color:#6B7280;">→</div>
        <div style="font-size:7px;text-align:center;color:#64748B;max-width:60px;line-height:1.3;">
          ${pt?'Kanban + células + fluxo contínuo':'Kanban + cells + continuous flow'}
        </div>
      </div>
      <div style="background:#F0FDF4;border:1.5px solid #059669;border-radius:8px;padding:8px 10px;">
        <div style="font-size:9px;font-weight:800;color:#059669;margin-bottom:6px;text-align:center;">${pt?'✅ ESTADO FUTURO':'✅ FUTURE STATE'}</div>
        <div style="display:flex;flex-direction:column;gap:3px;font-size:8px;">
          ${['Stamping','Weld & Assembly','Shipping'].map((s,i) => `
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="color:#374151;">${s}</span>
              <span style="background:#05996920;color:#059669;padding:1px 5px;border-radius:3px;font-weight:700;">${['1s','168s','0s'][i]}</span>
            </div>`).join('')}
          <div style="margin-top:5px;padding-top:5px;border-top:1px solid #05996940;">
            <div style="background:#059669;color:white;border-radius:5px;padding:4px 7px;margin-bottom:3px;">
              <div style="font-size:9px;font-weight:800;">${pt?'⏱ Espera total':'⏱ Total waiting'}</div>
              <div style="font-size:18px;font-weight:900;">4.5 ${pt?'dias':'days'}</div>
            </div>
            <div style="background:#34D399;color:white;border-radius:5px;padding:4px 7px;">
              <div style="font-size:9px;font-weight:800;">${pt?'⚙ Processamento':'⚙ Processing'}</div>
              <div style="font-size:14px;font-weight:900;">169 s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
      <div style="background:#EFF6FF;border-radius:6px;padding:6px 9px;">
        <div style="font-size:8px;color:#1D4ED8;font-weight:700;">Takt time</div>
        <div style="font-size:9px;color:#1E3A5F;line-height:1.4;">${pt?'OEE ÷ Demanda média':'OEE ÷ Average demand'}<br>${pt?'"Metrônomo" do cliente':'"Metronome" set by customer'}</div>
      </div>
      <div style="background:#F5F3FF;border-radius:6px;padding:6px 9px;">
        <div style="font-size:8px;color:#7C3AED;font-weight:700;">${pt?'Tarefa Marcapasso':'Pacemaker Task'}</div>
        <div style="font-size:9px;color:#4C1D95;line-height:1.4;">${pt?'Define velocidade do processo. Sinal direto do cliente, sem WIP downstream.':'Sets process speed. Direct signal from customer, no downstream WIP.'}</div>
      </div>
    </div>
    <div style="background:#FFF7ED;border:1px solid #F97316;border-radius:6px;padding:6px 9px;font-size:8.5px;color:#7C2D12;">
      💡 <strong>${pt?'Lição-chave ACME:':'Key ACME lesson:'}</strong> ${pt?'81% do desperdício estava no TEMPO DE ESPERA entre tarefas (19,1 dias), não no processamento (26 segundos). O desperdício mora no WIP, não no trabalho em si.':'81% of waste was in WAITING TIME between tasks (19.1 days), not in processing (26 seconds saved). Waste lives in WIP, not in the work itself.'}
    </div>
  </div>`;
};

// ─── WEEK 4: FACILITY LAYOUTS ─────────────────────────────────────────────
window.vis_facilityLayouts = function(container, lang) {
  const pt = lang === 'pt';
  let active = 0;
  const layouts = [
    {
      name: pt?'Posição Fixa':'Fixed Position',
      color: '#7C3AED', icon: '🏗',
      types: pt?'Projeto':'Project', order: 'MTO',
      adv:    pt?['Único para projetos grandes','Não precisa mover o produto','Equipe multidisciplinar no site']:['Only option for large-scale projects','No need to move the product','Multidisciplinary team on-site'],
      disadv: pt?['Coordenação de timing é crítica','Falta de espaço de armazenagem','Gestão de projeto sofisticada']:['Delivery timing coordination critical','Lack of on-site storage space','Sophisticated project management required'],
      ex: pt?'Airbus Toulouse, cirurgia cardíaca, construção civil, Olimpíadas 2012':'Airbus Toulouse, cardiac surgery, civil construction, 2012 Olympics',
      svg: '<svg width="120" height="90" viewBox="0 0 120 90"><rect x="40" y="30" width="40" height="30" rx="4" fill="#7C3AED22" stroke="#7C3AED" stroke-width="2"/><text x="60" y="50" text-anchor="middle" font-size="8" fill="#7C3AED" font-weight="700">PRODUTO</text><line x1="20" y1="20" x2="38" y2="38" stroke="#7C3AED" stroke-width="1.5"/><polygon points="30,38 38,38 38,30" fill="#7C3AED"/><line x1="100" y1="20" x2="82" y2="38" stroke="#7C3AED" stroke-width="1.5"/><polygon points="82,30 90,38 82,38" fill="#7C3AED"/><line x1="20" y1="70" x2="38" y2="52" stroke="#7C3AED" stroke-width="1.5"/><polygon points="30,52 38,60 38,52" fill="#7C3AED"/><line x1="100" y1="70" x2="82" y2="52" stroke="#7C3AED" stroke-width="1.5"/><polygon points="90,52 82,52 82,60" fill="#7C3AED"/><circle cx="15" cy="15" r="8" fill="#7C3AED" opacity="0.7"/><text x="15" y="19" text-anchor="middle" font-size="8" fill="white">👷</text><circle cx="105" cy="15" r="8" fill="#7C3AED" opacity="0.7"/><text x="105" y="19" text-anchor="middle" font-size="8" fill="white">🔧</text><circle cx="15" cy="75" r="8" fill="#7C3AED" opacity="0.7"/><text x="15" y="79" text-anchor="middle" font-size="8" fill="white">📦</text><circle cx="105" cy="75" r="8" fill="#7C3AED" opacity="0.7"/><text x="105" y="79" text-anchor="middle" font-size="8" fill="white">🚚</text></svg>'
    },
    {
      name: pt?'Produto-Serviço Dominante':'Product-Service Dominant',
      color: '#059669', icon: '🏭',
      types: pt?'Linha de Montagem, Contínuo':'Assembly Line, Continuous', order: 'ATO / MTS',
      adv:    pt?['Baixo custo unitário','Alta eficiência e velocidade','Fluxo previsível e padronizado']:['Low unit cost','High efficiency and speed','Predictable, standardized flow'],
      disadv: pt?['Inflexível — difícil mudar produto','Ambiente de trabalho repetitivo','Vulnerável a quebras (interdependência)']:['Inflexible — hard to change product','Repetitive working environment','Vulnerable to breakdowns (interdependency)'],
      ex: pt?'Linha de montagem Toyota/Tesla, alfândega de aeroporto, lavanderia industrial':'Toyota/Tesla assembly line, airport customs, industrial laundry',
      svg: '<svg width="120" height="90" viewBox="0 0 120 90"><rect x="5" y="35" width="18" height="20" rx="3" fill="#05996922" stroke="#059669" stroke-width="1.5"/><text x="14" y="48" text-anchor="middle" font-size="8" fill="#059669">①</text><rect x="27" y="35" width="18" height="20" rx="3" fill="#05996922" stroke="#059669" stroke-width="1.5"/><text x="36" y="48" text-anchor="middle" font-size="8" fill="#059669">②</text><rect x="49" y="35" width="18" height="20" rx="3" fill="#05996922" stroke="#059669" stroke-width="1.5"/><text x="58" y="48" text-anchor="middle" font-size="8" fill="#059669">③</text><rect x="71" y="35" width="18" height="20" rx="3" fill="#05996922" stroke="#059669" stroke-width="1.5"/><text x="80" y="48" text-anchor="middle" font-size="8" fill="#059669">④</text><rect x="93" y="35" width="18" height="20" rx="3" fill="#05996922" stroke="#059669" stroke-width="1.5"/><text x="102" y="48" text-anchor="middle" font-size="8" fill="#059669">⑤</text><line x1="5" y1="45" x2="112" y2="45" stroke="#059669" stroke-width="2" stroke-dasharray="3,2" opacity="0.4"/><polygon points="108,41 116,45 108,49" fill="#059669"/><text x="60" y="24" text-anchor="middle" font-size="8" fill="#059669" font-weight="700">→ FLUXO LINEAR →</text><text x="5" y="72" font-size="7" fill="#6B7280">INPUT</text><text x="92" y="72" font-size="7" fill="#6B7280">OUTPUT</text></svg>'
    },
    {
      name: pt?'Dominado por Processo':'Process-Dominant',
      color: '#D97706', icon: '🏥',
      types: pt?'Oficina (Job Shop), Lote':'Job Shop, Batch', order: 'MTO / ATO',
      adv:    pt?['Flexível — lida com alta variedade','Equipamentos genéricos (menos caros)','Pouca interdependência entre operações']:['Flexible — handles high variety','General-purpose equipment (less costly)','Little interdependence between operations'],
      disadv: pt?['Alto WIP entre departamentos','Roteamento e agendamento complexos','Baixa utilização de equipamentos']:['High WIP between departments','Complex routing and scheduling','Low equipment utilization'],
      ex: pt?'Hospitais, IKEA (rota forçada), machine shops, universidades, bancos':'Hospitals, IKEA (forced route), machine shops, universities, banks',
      svg: '<svg width="120" height="90" viewBox="0 0 120 90"><rect x="10" y="8" width="28" height="18" rx="3" fill="#D9770622" stroke="#D97706" stroke-width="1.5"/><text x="24" y="20" text-anchor="middle" font-size="8" fill="#D97706" font-weight="700">Milling</text><rect x="70" y="8" width="28" height="18" rx="3" fill="#D9770622" stroke="#D97706" stroke-width="1.5"/><text x="84" y="20" text-anchor="middle" font-size="8" fill="#D97706" font-weight="700">Weld</text><rect x="10" y="55" width="28" height="18" rx="3" fill="#D9770622" stroke="#D97706" stroke-width="1.5"/><text x="24" y="67" text-anchor="middle" font-size="8" fill="#D97706" font-weight="700">Paint</text><rect x="70" y="55" width="28" height="18" rx="3" fill="#D9770622" stroke="#D97706" stroke-width="1.5"/><text x="84" y="67" text-anchor="middle" font-size="8" fill="#D97706" font-weight="700">Asm</text><polyline points="38,17 60,17 60,17 70,17" fill="none" stroke="#D97706" stroke-width="1.5" stroke-dasharray="3,2"/><polyline points="24,26 24,40 84,40 84,55" fill="none" stroke="#D97706" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.7"/><polygon points="66,14 70,17 66,20" fill="#D97706"/><polygon points="81,51 84,55 87,51" fill="#D97706" opacity="0.7"/><text x="60" y="83" text-anchor="middle" font-size="7" fill="#92400E">↕ rotas variáveis</text></svg>'
    },
    {
      name: pt?'Célula de Trabalho':'Work Cell',
      color: '#0284C7', icon: '🔄',
      types: pt?'Lote, Oficina':'Batch, Job Shop', order: 'MTO / ATO',
      adv:    pt?['Menor WIP e menos espaço','Melhor moral dos funcionários','Fluxo mais rápido (one-piece flow)']:['Less WIP and less space','Better employee morale','Quicker flow (one-piece flow)'],
      disadv: pt?['Requer funcionários multi-skill','Pode ser difícil definir "famílias" de produtos','Menos flexível que layout de processo']:['Requires multi-skilled workers','Hard to define product "families"','Less flexible than process layout'],
      ex: pt?'Cozinha de restaurante pequeno (célula em U), célula de produção de placas eletrônicas, reparação sob garantia':'Small restaurant kitchen (U-shaped cell), PCB production cell, warranty repair shop',
      svg: '<svg width="120" height="90" viewBox="0 0 120 90"><rect x="8" y="35" width="16" height="12" rx="2" fill="#0284C722" stroke="#0284C7" stroke-width="1.5"/><text x="16" y="44" text-anchor="middle" font-size="6" fill="#0284C7">W1</text><rect x="28" y="10" width="16" height="12" rx="2" fill="#0284C722" stroke="#0284C7" stroke-width="1.5"/><text x="36" y="19" text-anchor="middle" font-size="6" fill="#0284C7">W2</text><rect x="52" y="8" width="16" height="12" rx="2" fill="#0284C722" stroke="#0284C7" stroke-width="1.5"/><text x="60" y="17" text-anchor="middle" font-size="6" fill="#0284C7">W3</text><rect x="76" y="10" width="16" height="12" rx="2" fill="#0284C722" stroke="#0284C7" stroke-width="1.5"/><text x="84" y="19" text-anchor="middle" font-size="6" fill="#0284C7">W4</text><rect x="96" y="35" width="16" height="12" rx="2" fill="#0284C722" stroke="#0284C7" stroke-width="1.5"/><text x="104" y="44" text-anchor="middle" font-size="6" fill="#0284C7">W5</text><rect x="76" y="60" width="16" height="12" rx="2" fill="#0284C722" stroke="#0284C7" stroke-width="1.5"/><text x="84" y="69" text-anchor="middle" font-size="6" fill="#0284C7">W6</text><rect x="28" y="60" width="16" height="12" rx="2" fill="#0284C722" stroke="#0284C7" stroke-width="1.5"/><text x="36" y="69" text-anchor="middle" font-size="6" fill="#0284C7">W7</text><path d="M16,47 Q16,80 36,72 Q60,85 84,72 Q104,60 104,47 Q104,32 84,22 Q60,5 36,22 Q16,20 16,35" fill="none" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.5"/><text x="60" y="48" text-anchor="middle" font-size="7" fill="#0284C7">U-shape</text></svg>'
    }
  ];
  const render = () => {
    const l = layouts[active];
    container.innerHTML = `
    <div style="font-family:sans-serif;padding:4px;">
      <div style="display:flex;gap:4px;margin-bottom:8px;flex-wrap:wrap;">
        ${layouts.map((x,i) => `<button onclick="(function(){window._fl4active=${i};window._fl4render&&window._fl4render();})()" style="padding:4px 9px;border-radius:5px;border:1.5px solid ${x.color};background:${i===active?x.color:'white'};color:${i===active?'white':x.color};font-size:8px;font-weight:700;cursor:pointer;font-family:sans-serif;">${x.icon} ${x.name.split('(')[0].trim()}</button>`).join('')}
      </div>
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="flex-shrink:0;background:${l.color}10;border:1px solid ${l.color}44;border-radius:8px;padding:10px;display:flex;flex-direction:column;align-items:center;gap:6px;">
          ${l.svg}
          <div style="font-size:8px;color:${l.color};font-weight:700;text-align:center;">${l.name}</div>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:12px;font-weight:800;color:${l.color};margin-bottom:4px;">${l.icon} ${l.name}</div>
          <div style="display:flex;gap:6px;margin-bottom:6px;font-size:8px;">
            <span style="background:${l.color}22;color:${l.color};padding:2px 7px;border-radius:10px;font-weight:700;">${l.types}</span>
            <span style="background:#F1F5F9;color:#475569;padding:2px 7px;border-radius:10px;font-weight:700;">${l.order}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:6px;">
            <div style="background:#F0FDF4;border-radius:5px;padding:5px 7px;">
              <div style="font-size:8px;font-weight:700;color:#059669;margin-bottom:2px;">✓ ${pt?'Vantagens':'Advantages'}</div>
              ${l.adv.map(a => `<div style="font-size:8px;color:#374151;line-height:1.4;">• ${a}</div>`).join('')}
            </div>
            <div style="background:#FEF2F2;border-radius:5px;padding:5px 7px;">
              <div style="font-size:8px;font-weight:700;color:#DC2626;margin-bottom:2px;">✗ ${pt?'Desvantagens':'Disadvantages'}</div>
              ${l.disadv.map(d => `<div style="font-size:8px;color:#374151;line-height:1.4;">• ${d}</div>`).join('')}
            </div>
          </div>
          <div style="background:${l.color}10;border-radius:5px;padding:5px 8px;font-size:8px;color:#374151;line-height:1.4;">
            📍 <strong>${pt?'Exemplos:':'Examples:'}</strong> ${l.ex}
          </div>
        </div>
      </div>
    </div>`;
    window._fl4active = active;
    window._fl4render = () => { active = window._fl4active; render(); };
  };
  window._fl4active = active;
  render();
  window._fl4render = () => { active = window._fl4active; render(); };
};

// ═══════════════════════════════════════════════════════════════════════════
//  WEEK 5 — SUPPLY NETWORK DESIGN (Chapter 6)
// ═══════════════════════════════════════════════════════════════════════════

// ─── WEEK 5: SUPPLIER NETWORK + THREE FLOWS (Fig 6.1 + 6.3) ─────────────────
window.vis_scmNetwork = function(container, lang) {
  const pt = lang === 'pt';
  let view = 'network'; // 'network' | 'flows'
  const render = () => {
    const tabBtn = (id, label) => `<button onclick="(function(){window._scmnv='${id}';window._scmnr&&window._scmnr();})()" style="padding:4px 10px;border-radius:5px;border:1.5px solid #0284C7;background:${view===id?'#0284C7':'white'};color:${view===id?'white':'#0284C7'};font-size:8.5px;font-weight:700;cursor:pointer;font-family:sans-serif;">${label}</button>`;
    let body = '';
    if (view === 'network') {
      body = `
        <svg width="320" height="210" viewBox="0 0 320 210" style="display:block;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;">
          <!-- tiers labels -->
          <text x="42" y="14" text-anchor="middle" font-size="7.5" fill="#92400E" font-weight="700">2nd tier</text>
          <text x="108" y="14" text-anchor="middle" font-size="7.5" fill="#B45309" font-weight="700">1st tier</text>
          <text x="160" y="14" text-anchor="middle" font-size="8" fill="#0C4A6E" font-weight="800">OPERAÇÃO</text>
          <text x="212" y="14" text-anchor="middle" font-size="7.5" fill="#047857" font-weight="700">1st tier</text>
          <text x="278" y="14" text-anchor="middle" font-size="7.5" fill="#065F46" font-weight="700">2nd tier</text>
          <text x="75" y="204" text-anchor="middle" font-size="8" fill="#B45309" font-weight="700">◀ ${pt?'LADO DA OFERTA (supply side)':'SUPPLY SIDE'}</text>
          <text x="245" y="204" text-anchor="middle" font-size="8" fill="#047857" font-weight="700">${pt?'LADO DA DEMANDA (demand side)':'DEMAND SIDE'} ▶</text>
          <!-- links -->
          <g stroke="#CBD5E1" stroke-width="1.3">
            <line x1="55" y1="50" x2="95" y2="70"/><line x1="55" y1="110" x2="95" y2="70"/>
            <line x1="55" y1="110" x2="95" y2="130"/><line x1="55" y1="165" x2="95" y2="130"/>
            <line x1="121" y1="70" x2="148" y2="105"/><line x1="121" y1="130" x2="148" y2="105"/>
            <line x1="172" y1="105" x2="199" y2="70"/><line x1="172" y1="105" x2="199" y2="130"/>
            <line x1="225" y1="70" x2="265" y2="50"/><line x1="225" y1="70" x2="265" y2="110"/>
            <line x1="225" y1="130" x2="265" y2="110"/><line x1="225" y1="130" x2="265" y2="165"/>
          </g>
          <!-- bypass tier (2nd->operation) -->
          <line x1="55" y1="110" x2="148" y2="105" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3,2" opacity="0.7"/>
          <!-- supply nodes -->
          ${[[55,50],[55,110],[55,165]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#FCD34D" stroke="#B45309" stroke-width="1.5"/>`).join('')}
          ${[[95,70],[95,130]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="#F59E0B" stroke="#92400E" stroke-width="1.5"/>`).join('')}
          <!-- focal -->
          <rect x="146" y="88" width="28" height="34" rx="5" fill="#0284C7" stroke="#0C4A6E" stroke-width="2"/>
          <text x="160" y="109" text-anchor="middle" font-size="14" fill="white">★</text>
          <!-- demand nodes -->
          ${[[225,70],[225,130]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="#10B981" stroke="#065F46" stroke-width="1.5"/>`).join('')}
          ${[[265,50],[265,110],[265,165]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#6EE7B7" stroke="#047857" stroke-width="1.5"/>`).join('')}
        </svg>
        <div style="margin-top:6px;background:#FFFBEB;border-left:3px solid #F59E0B;border-radius:5px;padding:6px 9px;font-size:8px;color:#475569;line-height:1.55;">
          <strong>${pt?'1st-tier':'1st-tier'}</strong> ${pt?'= fornecem/recebem diretamente da operação.':'= supply/receive directly from the operation.'} <strong>${pt?'2nd-tier':'2nd-tier'}</strong> ${pt?'= um nível além.':'= one level beyond.'} ${pt?'A linha tracejada mostra um 2nd-tier que entrega direto à operação (pula um nível).':'The dashed line shows a 2nd-tier supplying the operation directly (skipping a tier).'}<br>
          <strong>${pt?'Rede imediata':'Immediate network'}</strong> = ${pt?'só os 1st-tier.':'1st-tier only.'} <strong>${pt?'Rede total':'Total network'}</strong> = ${pt?'todos os tiers.':'all tiers.'}
        </div>`;
    } else {
      body = `
        <svg width="320" height="170" viewBox="0 0 320 170" style="display:block;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;">
          ${[[40,'#92400E',pt?'Fornecedor':'Supplier'],[160,'#0284C7',pt?'Fabricante':'Manufacturer'],[280,'#047857',pt?'Cliente':'Customer']].map(([x,c,l])=>`
            <rect x="${x-34}" y="62" width="68" height="44" rx="6" fill="${c}15" stroke="${c}" stroke-width="1.8"/>
            <text x="${x}" y="88" text-anchor="middle" font-size="9" fill="${c}" font-weight="700">${l}</text>`).join('')}
          <!-- materials downstream -->
          <line x1="74" y1="50" x2="246" y2="50" stroke="#DC2626" stroke-width="2.5"/>
          <polygon points="246,44 258,50 246,56" fill="#DC2626"/>
          <text x="160" y="44" text-anchor="middle" font-size="8.5" fill="#DC2626" font-weight="800">📦 ${pt?'MATERIAIS — jusante (downstream)':'MATERIALS — downstream'} ▶</text>
          <!-- info + money upstream -->
          <line x1="246" y1="124" x2="74" y2="124" stroke="#7C3AED" stroke-width="2.5"/>
          <polygon points="74,118 62,124 74,130" fill="#7C3AED"/>
          <text x="160" y="138" text-anchor="middle" font-size="8.5" fill="#7C3AED" font-weight="800">◀ ${pt?'INFORMAÇÃO + DINHEIRO — montante (upstream)':'INFORMATION + MONEY — upstream'} 💰</text>
        </svg>
        <div style="margin-top:6px;background:#EFF6FF;border-left:3px solid #0284C7;border-radius:5px;padding:6px 9px;font-size:8px;color:#475569;line-height:1.55;">
          ${pt?'Toda supply chain gerencia <strong>3 fluxos</strong>: materiais/bens descem para o cliente (downstream), enquanto informação (pedidos) e dinheiro sobem para o fornecedor (upstream). Mover bens gera <strong>custos de transação</strong> (transaction costs).':'Every supply chain manages <strong>3 flows</strong>: materials/goods move down to the customer (downstream), while information (orders) and money move up to the supplier (upstream). Moving goods creates <strong>transaction costs</strong>.'}
        </div>`;
    }
    container.innerHTML = `
      <div style="font-family:sans-serif;padding:4px;">
        <div style="display:flex;gap:5px;margin-bottom:8px;">
          ${tabBtn('network', pt?'🕸 Rede de fornecedores':'🕸 Supplier network')}
          ${tabBtn('flows', pt?'🔁 Os 3 fluxos':'🔁 The 3 flows')}
        </div>
        ${body}
      </div>`;
    window._scmnv = view; window._scmnr = () => { view = window._scmnv; render(); };
  };
  window._scmnv = view; render(); window._scmnr = () => { view = window._scmnv; render(); };
};

// ─── WEEK 5: SINGLE vs MULTIPLE vs DUAL SOURCING ────────────────────────────
window.vis_sourcingCompare = function(container, lang) {
  const pt = lang === 'pt';
  const cols = [
    { key:'single', color:'#0284C7', icon:'🤝', title: pt?'Single Sourcing':'Single Sourcing', sub: pt?'1 fornecedor':'1 supplier',
      rows:[[pt?'Relação':'Relationship', pt?'Parceria forte, durável, confiança':'Strong, durable, trusting partnership'],[pt?'Preço':'Price', pt?'Não é o critério principal':'Not the main criterion'],[pt?'Vantagem':'Strength', pt?'Compromisso, qualidade, JIT, economias de escala':'Commitment, quality, JIT, economies of scale'],[pt?'Risco':'Risk', pt?'Vulnerável a falha/falência; refém de preços (monopólio)':'Vulnerable to failure/bankruptcy; price hostage (monopoly)']]},
    { key:'multiple', color:'#DC2626', icon:'⚔', title: pt?'Multiple Sourcing':'Multiple Sourcing', sub: pt?'Vários fornecedores':'Many suppliers',
      rows:[[pt?'Relação':'Relationship', pt?'Competitiva — fornecedores competem (preço)':'Competitive — suppliers compete (price)'],[pt?'Preço':'Price', pt?'Baixado por concorrência (tendering)':'Driven down by competitive tendering'],[pt?'Vantagem':'Strength', pt?'Backup contra falhas, acesso a + conhecimento':'Backup against failure, wider knowledge'],[pt?'Risco':'Risk', pt?'Pouco compromisso; menos investimento dos fornecedores':'Low commitment; less supplier investment']]},
    { key:'dual', color:'#059669', icon:'⚖', title: pt?'Dual Sourcing':'Dual Sourcing', sub: pt?'2 fornecedores':'2 suppliers',
      rows:[[pt?'Relação':'Relationship', pt?'Híbrido — o melhor dos dois mundos':'Hybrid — best of both worlds'],[pt?'Preço':'Price', pt?'Equilíbrio competição × relação':'Balance competition × relationship'],[pt?'Vantagem':'Strength', pt?'Relação forte SEM monopólio':'Strong relationship WITHOUT monopoly'],[pt?'Risco':'Risk', pt?'Coordenação de 2 parceiros':'Coordinating 2 partners']]},
  ];
  container.innerHTML = `
    <div style="font-family:sans-serif;padding:4px;">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
        ${cols.map(c=>`
          <div style="border:1.5px solid ${c.color};border-radius:8px;overflow:hidden;">
            <div style="background:${c.color};padding:6px 8px;color:white;"><div style="font-size:10px;font-weight:800;">${c.icon} ${c.title}</div><div style="font-size:7.5px;opacity:.9;">${c.sub}</div></div>
            ${c.rows.map(([k,v])=>`<div style="padding:4px 8px;border-bottom:1px solid ${c.color}22;"><div style="font-size:7px;color:#94A3B8;text-transform:uppercase;letter-spacing:.4px;">${k}</div><div style="font-size:8px;color:#1E293B;font-weight:600;line-height:1.35;">${v}</div></div>`).join('')}
          </div>`).join('')}
      </div>
      <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <div style="background:#EFF6FF;border-radius:6px;padding:7px 9px;">
          <div style="font-size:8.5px;font-weight:800;color:#0284C7;margin-bottom:3px;">✓ ${pt?'Single quando…':'Single when…'}</div>
          <div style="font-size:7.5px;color:#475569;line-height:1.5;">${pt?'Economias de escala · qualidade dita · JIT · menor lead time · time-to-market crítico · ferramental especial':'Economies of scale · quality dictates · JIT · shorter lead times · time-to-market critical · special tooling'}</div>
        </div>
        <div style="background:#FEF2F2;border-radius:6px;padding:7px 9px;">
          <div style="font-size:8.5px;font-weight:800;color:#DC2626;margin-bottom:3px;">✓ ${pt?'Multiple quando…':'Multiple when…'}</div>
          <div style="font-size:7.5px;color:#475569;line-height:1.5;">${pt?'Proteção contra escassez/greves · manter competição · exigências de volume · tecnologia incerta · mudança política (ex: Brexit)':'Protect against shortage/strikes · keep competition · volume needs · uncertain technology · political change (e.g. Brexit)'}</div>
        </div>
      </div>
    </div>`;
};

// ─── WEEK 5: MULTI-ORGANIZATION ENTERPRISE TYPES (VE / EE / VIE) — Table 6.6 ─
window.vis_enterpriseTypes = function(container, lang) {
  const pt = lang === 'pt';
  const cols = [
    { key:'ve', color:'#7C3AED', icon:'⚡', title:'Virtual (VE)', philo: pt?'Ágil':'Agile (quick-adapt)',
      rows:[[pt?'Filosofia':'Philosophy', pt?'Estratégia rápida e adaptável (ágil)':'Quickly adaptable strategy (agile)'],[pt?'Base da relação':'Relationship base', pt?'Competência técnica · alta inovação':'Technical competence · high innovation'],[pt?'Competências':'Competencies', pt?'Novas, especulativas, não testadas, alto risco':'New, speculative, untested, high risk'],[pt?'Longevidade':'Longevity', pt?'Curto prazo, temporário':'Short-term, temporary'],[pt?'Custos transação':'Transaction costs', pt?'Altos · alta especificidade de ativos':'High · high asset specificity'],[pt?'Exemplo':'Example', pt?'P&D, protótipo Bluetooth, criptomoedas':'R&D, Bluetooth prototype, cryptocurrencies']]},
    { key:'ee', color:'#0284C7', icon:'🔗', title:'Extended (EE)', philo: pt?'Lean + Ágil':'Lean + Agile',
      rows:[[pt?'Filosofia':'Philosophy', pt?'Adaptável e reduz desperdício (lean+ágil)':'Adaptable + reduce waste (lean & agile)'],[pt?'Base da relação':'Relationship base', pt?'Competência social · experiência de relação':'Social competence · relationship experience'],[pt?'Competências':'Competencies', pt?'Testadas em parte, risco médio':'Tested to some extent, medium risk'],[pt?'Longevidade':'Longevity', pt?'Médio a longo prazo':'Medium to long term'],[pt?'Custos transação':'Transaction costs', pt?'Médios · especificidade média':'Medium · medium asset specificity'],[pt?'Exemplo':'Example', pt?'eBay, chip Bluetooth pronto, transferência de conhecimento':'eBay, market-ready Bluetooth chip, knowledge transfer']]},
    { key:'vie', color:'#059669', icon:'🏛', title:'Vert. Integ. (VIE)', philo: pt?'Lean':'Lean (waste cut)',
      rows:[[pt?'Filosofia':'Philosophy', pt?'Redução de desperdício domina (lean)':'Waste reduction dominates (lean)'],[pt?'Base da relação':'Relationship base', pt?'Eficiência · custos de transação (preços)':'Efficiency · transaction costs (prices)'],[pt?'Competências':'Competencies', pt?'Maduras, testadas, amplamente usáveis':'Mature, tested, widely usable'],[pt?'Longevidade':'Longevity', pt?'Quase permanente (se competitivo)':'Foreseeable as permanent (if competitive)'],[pt?'Custos transação':'Transaction costs', pt?'Baixos · baixa especificidade':'Low · low asset specificity'],[pt?'Exemplo':'Example', pt?'Mercados estáveis, NAC compra MG Rover':'Stable markets, NAC buys MG Rover']]},
  ];
  container.innerHTML = `
    <div style="font-family:sans-serif;padding:4px;">
      <div style="position:relative;height:22px;margin-bottom:10px;">
        <div style="position:absolute;left:0;right:0;top:8px;height:7px;border-radius:4px;background:linear-gradient(to right,#7C3AED,#0284C7,#059669);"></div>
        <div style="position:absolute;left:0;top:-4px;font-size:7.5px;color:#7C3AED;font-weight:700;">${pt?'Temporário · Ágil':'Temporary · Agile'}</div>
        <div style="position:absolute;right:0;top:-4px;font-size:7.5px;color:#059669;font-weight:700;text-align:right;">${pt?'Permanente · Integrado ▶':'Permanent · Integrated ▶'}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
        ${cols.map(c=>`
          <div style="border:1.5px solid ${c.color};border-radius:8px;overflow:hidden;">
            <div style="background:${c.color};padding:6px 8px;color:white;"><div style="font-size:10px;font-weight:800;">${c.icon} ${c.title}</div><div style="font-size:7.5px;opacity:.9;">${c.philo}</div></div>
            ${c.rows.map(([k,v])=>`<div style="padding:4px 7px;border-bottom:1px solid ${c.color}22;"><div style="font-size:6.5px;color:#94A3B8;text-transform:uppercase;letter-spacing:.3px;">${k}</div><div style="font-size:8px;color:#1E293B;font-weight:600;line-height:1.3;">${v}</div></div>`).join('')}
          </div>`).join('')}
      </div>
      <div style="margin-top:8px;background:#F1F5F9;border-radius:6px;padding:6px 9px;font-size:7.5px;color:#475569;line-height:1.55;">
        <strong>${pt?'Não são estratégias diferentes':'Not different strategies'}</strong> — ${pt?'são fases da MESMA estratégia de colaboração ao longo do ciclo de vida. Há sempre um <strong>integrador (enterprise integrator/orchestrator)</strong> dominante que desenha a estrutura.':'they are phases of the SAME collaboration strategy across the life cycle. There is always a dominant <strong>enterprise integrator/orchestrator</strong> designing the structure.'}
      </div>
    </div>`;
};

// ─── WEEK 5: DYNAMIC ENTERPRISE REFERENCE GRID (DERG) — Fig 6.8 ──────────────
window.vis_derg = function(container, lang) {
  const pt = lang === 'pt';
  let active = 'q2';
  const quads = {
    q1: { color:'#7C3AED', name:pt?'Q1 · Virtual (VE)':'Q1 · Virtual (VE)', pos:pt?'Engajabilidade atual BAIXA, futura ALTA':'Current engageability LOW, future HIGH',
      desc:pt?'Competências emergentes ainda não testadas no mercado. Colaboração temporária para explorar oportunidades e dividir risco. Governança "virtual".':'Newly emerging competencies, untested in market. Temporary collaboration to exploit opportunities and spread risk. Governed "virtually".',
      ex:pt?'Protótipo Bluetooth · criptomoedas em pagamentos online':'Bluetooth prototype · crypto in online payments' },
    q2: { color:'#0284C7', name:pt?'Q2 · Extended (EE)':'Q2 · Extended (EE)', pos:pt?'Engajabilidade atual ALTA, futura ALTA':'Current engageability HIGH, future HIGH',
      desc:pt?'Competências maduras e atrativas, baixo risco. Integrador busca estratégia de co-desenvolvimento de médio-longo prazo para minimizar oportunismo.':'Mature, attractive, low-risk competencies. Integrator seeks medium-long term co-developmental strategy to minimize opportunism.',
      ex:pt?'eBay · chip Bluetooth pronto para o mercado':'eBay · market-ready Bluetooth chip' },
    q3: { color:'#059669', name:pt?'Q3 · Vert. Integrada (VIE)':'Q3 · Vert. Integrated (VIE)', pos:pt?'Engajabilidade atual ALTA, futura BAIXA':'Current engageability HIGH, future LOW',
      desc:pt?'Competências maduras mas margens encolhendo / tecnologia a obsolescer. Integrador busca posse total para minimizar custo de transação → fusão/aquisição.':'Mature competencies but eroding margins / obsoleting tech. Integrator seeks whole-ownership to minimize transaction cost → merger/acquisition.',
      ex:pt?'NAC compra a fábrica MG Rover (Longbridge)':'NAC buys MG Rover\'s Longbridge plant' },
    q4: { color:'#DC2626', name:pt?'Q4 · Desengajar':'Q4 · Disengage', pos:pt?'Engajabilidade atual BAIXA, futura BAIXA':'Current engageability LOW, future LOW',
      desc:pt?'Módulos indesejáveis para o presente e o futuro. O integrador busca desengatar/vender antes de chegar a situação irrecuperável.':'Modules undesirable for now and future. Integrator seeks to disengage/sell before an unrecoverable situation.',
      ex:pt?'IBM vende divisão de PCs à Lenovo (2004)':'IBM sells PC division to Lenovo (2004)' },
  };
  const render = () => {
    const a = quads[active];
    const cell = (id, cx, cy) => { const q=quads[id]; const on=active===id; return `
      <g style="cursor:pointer" onclick="(function(){window._derga='${id}';window._dergr&&window._dergr();})()">
        <rect x="${cx}" y="${cy}" width="118" height="72" rx="6" fill="${q.color}${on?'33':'12'}" stroke="${q.color}" stroke-width="${on?2.5:1.3}"/>
        <text x="${cx+59}" y="${cy+30}" text-anchor="middle" font-size="9.5" fill="${q.color}" font-weight="800">${q.name.split('·')[0].trim()}</text>
        <text x="${cx+59}" y="${cy+45}" text-anchor="middle" font-size="8.5" fill="${q.color}" font-weight="700">${q.name.split('·')[1].trim()}</text>
      </g>`; };
    container.innerHTML = `
      <div style="font-family:sans-serif;padding:4px;">
        <div style="display:flex;gap:10px;align-items:flex-start;">
          <div style="flex-shrink:0;">
            <svg width="290" height="200" viewBox="0 0 290 200">
              <text x="150" y="11" text-anchor="middle" font-size="8" fill="#64748B" font-weight="700">${pt?'Engajabilidade FUTURA':'FUTURE engageability'}</text>
              <text x="78" y="22" text-anchor="middle" font-size="7.5" fill="#94A3B8">${pt?'Alta':'High'}</text>
              <text x="212" y="22" text-anchor="middle" font-size="7.5" fill="#94A3B8">${pt?'Alta':'High'}</text>
              <text x="9" y="100" text-anchor="middle" font-size="8" fill="#64748B" font-weight="700" transform="rotate(-90,9,100)">${pt?'Engajabilidade ATUAL':'CURRENT engageability'}</text>
              ${cell('q1',26,28)}${cell('q2',146,28)}${cell('q4',26,110)}${cell('q3',146,110)}
              <!-- Smart Car path Q1->Q2->Q3 -->
              <path d="M85,64 L205,64" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4,2" fill="none" marker-end=""/>
              <path d="M205,100 L205,110" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4,2" fill="none"/>
              <text x="145" y="58" text-anchor="middle" font-size="6.5" fill="#B45309" font-weight="700">${pt?'▶ jornada Smart Car':'▶ Smart Car journey'}</text>
              <text x="40" y="192" font-size="7.5" fill="#94A3B8">${pt?'Atual baixa':'Current low'}</text>
              <text x="200" y="192" font-size="7.5" fill="#94A3B8">${pt?'Atual alta':'Current high'}</text>
            </svg>
            <div style="margin-top:4px;display:flex;gap:3px;flex-wrap:wrap;">
              ${['q1','q2','q3','q4'].map(id=>`<button onclick="(function(){window._derga='${id}';window._dergr&&window._dergr();})()" style="padding:3px 7px;border-radius:4px;border:1.5px solid ${quads[id].color};background:${active===id?quads[id].color:'white'};color:${active===id?'white':quads[id].color};font-size:8px;font-weight:700;cursor:pointer;font-family:sans-serif;">${quads[id].name.split('·')[0].trim()}</button>`).join('')}
            </div>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="background:${a.color}15;border-left:3px solid ${a.color};border-radius:6px;padding:9px 11px;">
              <div style="font-size:12px;font-weight:800;color:${a.color};margin-bottom:3px;">${a.name}</div>
              <div style="font-size:8px;color:#64748B;font-weight:700;margin-bottom:6px;">${a.pos}</div>
              <div style="font-size:8.5px;color:#1E293B;line-height:1.5;margin-bottom:7px;">${a.desc}</div>
              <div style="background:white;border-radius:4px;padding:5px 8px;font-size:8px;color:#6B7280;">📍 ${a.ex}</div>
            </div>
          </div>
        </div>
        <div style="margin-top:8px;background:#FFFBEB;border-radius:6px;padding:6px 9px;font-size:7.5px;color:#475569;line-height:1.55;">
          <strong>Smart Car:</strong> ${pt?'começou como colaboração temporária Daimler-Benz × Swatch (Q1 VE) → relação amadureceu para EE (Q2) → tensão levou Daimler a comprar a parte da Swatch, tornando-se VIE (Q3). Mostra a dinâmica do grid ao longo do ciclo de vida.':'started as a temporary Daimler-Benz × Swatch collaboration (Q1 VE) → relationship matured into EE (Q2) → tension led Daimler to buy out Swatch, becoming VIE (Q3). Shows the grid\'s dynamics across the life cycle.'}
        </div>
      </div>`;
    window._derga = active; window._dergr = () => { active = window._derga; render(); };
  };
  window._derga = active; render(); window._dergr = () => { active = window._derga; render(); };
};

// ─── WEEK 5: TRANSACTION COST ECONOMICS — 4 ASSUMPTIONS (Coase/Williamson) ───
window.vis_tceAssumptions = function(container, lang) {
  const pt = lang === 'pt';
  const items = [
    { color:'#0284C7', icon:'🧠', name:pt?'Racionalidade Limitada':'Bounded Rationality', author:'Simon 1957',
      desc:pt?'O comportamento humano tenta ser racional, mas é limitado por conhecimento, comportamento e linguagem. Não dá para checar todas as opções.':'Human behaviour intends to be rational but is limited by knowledge, behaviour and language. You can\'t check every option.' },
    { color:'#DC2626', icon:'🎯', name:pt?'Oportunismo':'Opportunism', author:'Williamson 1975',
      desc:pt?'Atores buscam melhorar a própria posição — "interesse próprio com astúcia" (self-interest seeking with guile). Mais pressão competitiva e desconfiança → mais oportunismo.':'Actors seek to improve their own standing — "self-interest seeking with guile". More competitive pressure and mistrust → more opportunism.' },
    { color:'#7C3AED', icon:'🔧', name:pt?'Especificidade de Ativos':'Asset Specificity', author:'',
      desc:pt?'Quão dedicado é um ativo a um produto/serviço. Alta especificidade = arriscado (não reaproveitável). 4 tipos: localização, propriedades físicas, humano, dedicação.':'How dedicated an asset is to a product/service. High specificity = risky (not reusable). 4 types: location, physical, human, dedication.' },
    { color:'#D97706', icon:'🌫', name:pt?'Incerteza':'Uncertainty', author:'',
      desc:pt?'Incerteza do ambiente de negócios. Alta incerteza → empresas internalizam recursos e buscam projetos de baixo risco (ex: hospital com gerador próprio).':'Business environment uncertainty. High uncertainty → firms internalize resources and seek low-risk projects (e.g. hospital with its own generator).' },
  ];
  container.innerHTML = `
    <div style="font-family:sans-serif;padding:4px;">
      <div style="text-align:center;margin-bottom:8px;background:#1E293B;border-radius:6px;padding:7px;">
        <div style="font-size:10.5px;font-weight:800;color:white;">💰 ${pt?'Custos de Transação (TCE)':'Transaction Costs (TCE)'}</div>
        <div style="font-size:7.5px;color:#94A3B8;margin-top:2px;">${pt?'Coase (1937): empresas existem porque o mercado tem custos de transação':'Coase (1937): firms exist because the open market has transaction costs'}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        ${items.map(it=>`
          <div style="border:1px solid ${it.color}44;border-left:3px solid ${it.color};border-radius:6px;padding:7px 9px;background:${it.color}08;">
            <div style="font-size:9.5px;font-weight:800;color:${it.color};margin-bottom:3px;">${it.icon} ${it.name}${it.author?` <span style="font-size:7px;color:#94A3B8;font-weight:600;">${it.author}</span>`:''}</div>
            <div style="font-size:7.5px;color:#374151;line-height:1.5;">${it.desc}</div>
          </div>`).join('')}
      </div>
      <div style="margin-top:8px;background:#ECFDF5;border-radius:6px;padding:6px 9px;font-size:7.5px;color:#065F46;line-height:1.55;">
        <strong>${pt?'Regra de ouro:':'Key point:'}</strong> ${pt?'se os custos de transação EXTERNOS > internos → a empresa cresce/internaliza (faz in-house). Se INTERNOS > externos → vale terceirizar/encolher (outsourcing).':'if EXTERNAL transaction costs > internal → the firm grows/internalizes (in-house). If INTERNAL > external → outsource/downsize.'}
      </div>
    </div>`;
};

/* ─── WEEK 6: Kraljic's Tactical Procurement Matrix (2×2) ────────── */
window.vis_kraljicMatrix = function(container, lang) {
  const pt = lang === 'pt';
  const id = 'krlj-' + Math.random().toString(36).substr(2,5);
  // ordem visual: top-left, top-right, bottom-left, bottom-right
  const quads = [
    { key:'leverage', color:'#1D4ED8', bg:'#EFF6FF',
      title: pt?'Alavancagem':'Leverage', tag: pt?'Melhor Negócio':'Best Deal',
      pos: pt?'Alto impacto · Baixo risco':'High impact · Low risk',
      tactic: pt?'Usar o poder de compra e a concorrência entre vários fornecedores capazes para conseguir o melhor preço. Pode-se juntar (pool) pedidos para ganhar barganha.':'Use buyer power and competition among several capable suppliers to get the best price. Orders can be pooled to increase bargaining power.',
      chars: pt?['Custo unitário importa (volume)','Substituição é possível','Mercado competitivo, vários fornecedores']:['Unit cost matters (volume)','Substitution possible','Competitive market, several suppliers'],
      ex: pt?'Ex: bancos de carro, logística de e-commerce':'E.g. car seats, e-commerce logistics' },
    { key:'critical', color:'#B91C1C', bg:'#FEF2F2',
      title: pt?'Crítico':'Critical', tag: pt?'Cooperação':'Cooperation',
      pos: pt?'Alto impacto · Alto risco':'High impact · High risk',
      tactic: pt?'Parceria de longo prazo, fonte única (single-source) e dependência mútua. Foco em colaboração, não em espremer preço de curto prazo.':'Long-term partnership, single-sourcing and mutual dependence. Focus on collaboration, not short-term price squeezing.',
      chars: pt?['Design sob medida / especificação única','Tecnologia do fornecedor é vital','Trocar de fonte é difícil/caro','Substituição difícil']:['Custom design / unique spec','Supplier technology is vital','Changing source is hard/costly','Substitution difficult'],
      ex: pt?'Ex: motores de avião, TI de bancos':'E.g. aircraft engines, bank IT' },
    { key:'routine', color:'#4B5563', bg:'#F9FAFB',
      title: pt?'Rotina':'Routine', tag: pt?'Eficiência':'Efficiency',
      pos: pt?'Baixo impacto · Baixo risco':'Low impact · Low risk',
      tactic: pt?'Emphasar a competição entre MUITOS fornecedores para reduzir custos de transação e unitários. Alto poder de compra, disputa por custo.':'Emphasize competition among MANY suppliers to cut transaction and unit costs. High buyer power, cost-based contest.',
      chars: pt?['Especificação padrão / commodity','Substitutos prontamente disponíveis','Mercado competitivo, muitos fornecedores']:['Standard spec / commodity','Substitutes readily available','Competitive market, many suppliers'],
      ex: pt?'Ex: parafusos, porcas, papelaria':'E.g. bolts, nuts, stationery' },
    { key:'bottleneck', color:'#B45309', bg:'#FFFBEB',
      title: pt?'Gargalo':'Bottleneck', tag: pt?'Continuidade':'Supply Continuity',
      pos: pt?'Baixo impacto · Alto risco':'Low impact · High risk',
      tactic: pt?'Garantir DISPONIBILIDADE constante com contrato de longo prazo e fornecedor único que entrega com frequência e confiabilidade. Falta = para a produção.':'Ensure constant AVAILABILITY with a long-term contract and a single supplier that delivers frequently and reliably. Shortage = production stops.',
      chars: pt?['Especificação única','Tecnologia do fornecedor importa','Escassez (baixa demanda / poucas fontes)','Uso imprevisível · risco de armazenagem']:['Unique specification','Supplier technology matters','Scarcity (low demand / few sources)','Unpredictable usage · storage risk'],
      ex: pt?'Ex: chips de PC, combustível (← Nissan)':'E.g. PC chips, fuel (← Nissan)' }
  ];

  const cell = (q) => `
    <div onclick="var b=document.getElementById('${id}-body');var was=b.getAttribute('data-q')==='${q.key}';document.querySelectorAll('.${id}-cell').forEach(function(c){c.style.outline='none';c.style.transform='none';});if(was){b.style.display='none';b.setAttribute('data-q','');}else{this.style.outline='2.5px solid ${q.color}';this.style.transform='translateY(-1px)';b.style.display='block';b.setAttribute('data-q','${q.key}');document.getElementById('${id}-t').textContent='${q.title.replace(/'/g,"\\'")} — ${q.tag.replace(/'/g,"\\'")}';document.getElementById('${id}-t').style.color='${q.color}';document.getElementById('${id}-pos').textContent='${q.pos.replace(/'/g,"\\'")}';document.getElementById('${id}-tac').textContent='${q.tactic.replace(/'/g,"\\'")}';document.getElementById('${id}-ex').textContent='${q.ex.replace(/'/g,"\\'")}';document.getElementById('${id}-chars').innerHTML='${q.chars.map(c=>'• '+c.replace(/'/g,"\\'")).join('<br>')}';}"
      class="${id}-cell" style="background:${q.bg};border:1px solid ${q.color}33;border-radius:7px;padding:9px 8px;cursor:pointer;transition:all .15s;min-height:78px;">
      <div style="font-size:10px;font-weight:800;color:${q.color};">${q.title}</div>
      <div style="font-size:7.5px;font-weight:700;color:${q.color};opacity:.75;text-transform:uppercase;letter-spacing:.4px;margin-top:1px;">${q.tag}</div>
      <div style="font-size:7px;color:#6B7280;margin-top:5px;line-height:1.4;">${q.pos}</div>
      <div style="font-size:7px;color:#9CA3AF;margin-top:4px;">${pt?'clique ↗':'click ↗'}</div>
    </div>`;

  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt?'Matriz de Kraljic (1983) — clique nos quadrantes':'Kraljic\'s Matrix (1983) — click the quadrants'}
      </div>
      <div style="display:flex;gap:6px;">
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
          <div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:8px;font-weight:700;color:#374151;letter-spacing:.5px;white-space:nowrap;">
            ${pt?'◀ Impacto no lucro (interno) ▶':'◀ Profit impact (internal) ▶'}
          </div>
        </div>
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;font-size:7px;font-weight:700;color:#9CA3AF;padding:0 2px 3px;"><span>${pt?'ALTO':'HIGH'}</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            ${cell(quads[0])}${cell(quads[1])}${cell(quads[2])}${cell(quads[3])}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:7px;font-weight:700;color:#9CA3AF;padding:3px 2px 0;"><span>${pt?'BAIXO':'LOW'}</span></div>
          <div style="text-align:center;font-size:8px;font-weight:700;color:#374151;letter-spacing:.5px;margin-top:4px;">
            ${pt?'◀ baixo · Risco de suprimento (externo) · alto ▶':'◀ low · Supply risk (external) · high ▶'}
          </div>
        </div>
      </div>
      <div id="${id}-body" data-q="" style="display:none;margin-top:9px;background:#fff;border:1px solid #E5E7EB;border-radius:7px;padding:10px 11px;">
        <div id="${id}-t" style="font-size:11px;font-weight:800;margin-bottom:2px;"></div>
        <div id="${id}-pos" style="font-size:7.5px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.4px;margin-bottom:7px;"></div>
        <div id="${id}-tac" style="font-size:8.5px;color:#374151;line-height:1.6;margin-bottom:7px;"></div>
        <div id="${id}-chars" style="font-size:8px;color:#4B5563;line-height:1.7;margin-bottom:6px;"></div>
        <div id="${id}-ex" style="font-size:8px;font-style:italic;color:#6B7280;"></div>
      </div>
    </div>`;
};

/* ─── WEEK 6: Arm's Length vs Strategic Partnership (Table 8.1) ──── */
window.vis_armsVsPartnership = function(container, lang) {
  const pt = lang === 'pt';
  const rows = [
    { d: pt?'Tipo de produto':'Product type',
      a: pt?'Commodity / padronizado':'Commodity / standardized',
      b: pt?'Customizado / não-padrão':'Customized / non-standard' },
    { d: pt?'Arquitetura':'Architecture',
      a: pt?'Aberta (open)':'Open architecture',
      b: pt?'Fechada (closed)':'Closed architecture' },
    { d: pt?'Interações c/ outros insumos':'Interactions with other inputs',
      a: pt?'Poucas ou nenhuma':'Few or none',
      b: pt?'Múltiplas':'Multiple' },
    { d: pt?'Interdependência':'Interdependence',
      a: pt?'Baixa':'Low',
      b: pt?'Alta':'High' },
    { d: pt?'Valor do insumo':'Input value',
      a: pt?'Baixo':'Low value',
      b: pt?'Alto':'High value' },
    { d: pt?'Interface funcional':'Functional interface',
      a: pt?'Única':'Single',
      b: pt?'Múltiplas':'Multiple' },
    { d: pt?'Benchmarking':'Benchmarking',
      a: pt?'De preço':'Of price',
      b: pt?'De capacidades':'Of capabilities' },
    { d: pt?'Assistência ao fornecedor':'Supplier assistance',
      a: pt?'Mínima':'Minimal',
      b: pt?'Substancial (troca de conhecimento)':'Substantial (knowledge-sharing)' }
  ];
  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;overflow-x:auto;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt?'Relação Comprador–Fornecedor (Tabela 8.1)':'Buyer–Supplier Relationship (Table 8.1)'}
      </div>
      <table style="width:100%;border-collapse:collapse;table-layout:fixed;min-width:330px;font-size:8.5px;">
        <thead>
          <tr>
            <th style="width:26%;background:#1E293B;color:#94A3B8;padding:6px 5px;text-align:left;font-size:8px;font-weight:700;"></th>
            <th style="width:37%;background:#E0E7FF;color:#3730A3;padding:6px 6px;text-align:left;font-size:8.5px;font-weight:800;border:1px solid rgba(0,0,0,.06);">${pt?'🤝 Braço Estendido':'🤝 Arm\'s Length'}</th>
            <th style="width:37%;background:#DCFCE7;color:#166534;padding:6px 6px;text-align:left;font-size:8.5px;font-weight:800;border:1px solid rgba(0,0,0,.06);">${pt?'🔗 Parceria Estratégica':'🔗 Strategic Partnership'}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r,i)=>`<tr>
            <td style="background:#1E293B;color:#E2E8F0;padding:6px 5px;font-size:7.5px;font-weight:700;vertical-align:top;">${r.d}</td>
            <td style="background:${i%2?'#F8FAFF':'#fff'};padding:6px 6px;color:#374151;line-height:1.45;border:1px solid rgba(0,0,0,.05);vertical-align:top;">${r.a}</td>
            <td style="background:${i%2?'#F6FEF9':'#fff'};padding:6px 6px;color:#374151;line-height:1.45;border:1px solid rgba(0,0,0,.05);vertical-align:top;">${r.b}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="margin-top:8px;background:#FFF7ED;border-radius:6px;padding:6px 9px;font-size:7.5px;color:#9A3412;line-height:1.55;">
        <strong>Walmart:</strong> ${pt?'exige cortes de preço ano após ano (adversarial) MAS ajuda o fornecedor a ganhar eficiência (cooperativo) — os dois lados coexistem.':'demands year-on-year price cuts (adversarial) BUT helps the supplier gain efficiency (cooperative) — both coexist.'}
      </div>
    </div>`;
};

/* ─── WEEK 6: Decoupling Point (push vs pull) ────────────────────── */
window.vis_decouplingPoint = function(container, lang) {
  const pt = lang === 'pt';
  const id = 'dcp-' + Math.random().toString(36).substr(2,5);
  // 4 estratégias, ponto de desacoplamento migrando da direita (tarde) p/ esquerda (cedo)
  const strategies = [
    { key:'mts', name:pt?'Make-to-Stock':'Make-to-Stock', dp:4,
      note:pt?'Ponto TARDE (perto do cliente). Quase tudo é empurrado por previsão; estoque de produto acabado pronto na prateleira. Ex: bens de consumo.':'LATE point (near the customer). Almost everything is pushed to forecast; finished-goods stock ready on the shelf. E.g. consumer goods.' },
    { key:'ato', name:pt?'Assemble-to-Order':'Assemble-to-Order', dp:3,
      note:pt?'Componentes feitos por previsão; montagem final só após o pedido. A diferenciação acontece na montadora.':'Components made to forecast; final assembly only after the order. Differentiation happens at the assembler.' },
    { key:'mto', name:pt?'Make-to-Order':'Make-to-Order', dp:2,
      note:pt?'Produção começa só com o pedido real. Ponto CEDO. Pouco estoque de acabado, muita customização. Ex: Dell.':'Production starts only with the real order. EARLY point. Little finished stock, lots of customization. E.g. Dell.' },
    { key:'bto', name:pt?'Buy-to-Order':'Buy-to-Order', dp:1,
      note:pt?'Até a compra da matéria-prima espera o pedido. Ponto o mais cedo possível — máximo pull, mínimo estoque.':'Even raw-material purchasing waits for the order. Earliest possible point — maximum pull, minimum stock.' }
  ];
  const stages = pt
    ? ['Matéria-prima','Componentes','Montagem','Distribuição','Cliente']
    : ['Raw material','Components','Assembly','Distribution','Customer'];

  const bar = (dp) => {
    // dp = índice (1..4) da fronteira; à esquerda = push (previsão), à direita = pull (pedido)
    return `<div style="display:flex;gap:2px;margin:6px 0;">
      ${stages.map((s,i)=>{
        const isPush = i < dp;
        const isDP = i === dp; // marcador do buffer entre push e pull
        return `<div style="flex:1;text-align:center;">
          <div style="height:7px;background:${isPush?'#3B82F6':'#10B981'};border-radius:2px;position:relative;">
            ${isDP?`<div style="position:absolute;left:-3px;top:-4px;width:0;height:15px;border-left:2px dashed #B45309;"></div><div style="position:absolute;left:-14px;top:-16px;font-size:11px;">📦</div>`:''}
          </div>
          <div style="font-size:6.5px;color:#6B7280;margin-top:2px;line-height:1.2;">${s}</div>
        </div>`;
      }).join('')}
    </div>`;
  };

  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:6px;">
        ${pt?'Ponto de Desacoplamento — Empurrar vs Puxar':'Decoupling Point — Push vs Pull'}
      </div>
      <div style="display:flex;gap:10px;font-size:7.5px;font-weight:700;margin-bottom:2px;">
        <span style="color:#3B82F6;">🔵 ${pt?'PUSH (previsão)':'PUSH (forecast)'}</span>
        <span style="color:#10B981;">🟢 ${pt?'PULL (pedido real)':'PULL (real order)'}</span>
        <span style="color:#B45309;">📦 ${pt?'buffer / desacopl.':'buffer / decoupling'}</span>
      </div>
      <div style="display:flex;gap:3px;margin:8px 0 4px;">
        ${strategies.map((s,i)=>`<button onclick="document.querySelectorAll('.${id}-b').forEach(function(x){x.style.background='#F1F5F9';x.style.color='#475569';});this.style.background='#1E3A5F';this.style.color='#fff';document.getElementById('${id}-bar').innerHTML=window['${id}_bars'][${i}];document.getElementById('${id}-note').textContent=window['${id}_notes'][${i}];document.getElementById('${id}-name').textContent=window['${id}_names'][${i}];"
          class="${id}-b" style="flex:1;background:${i===2?'#1E3A5F':'#F1F5F9'};color:${i===2?'#fff':'#475569'};border:none;border-radius:5px;padding:6px 2px;font-size:7.5px;font-weight:700;cursor:pointer;line-height:1.2;">${s.name}</button>`).join('')}
      </div>
      <div id="${id}-name" style="font-size:9.5px;font-weight:800;color:#1E3A5F;margin-top:6px;">${strategies[2].name}</div>
      <div id="${id}-bar">${bar(strategies[2].dp)}</div>
      <div id="${id}-note" style="font-size:8px;color:#374151;line-height:1.6;background:#F8FAFC;border-radius:6px;padding:7px 9px;margin-top:4px;">${strategies[2].note}</div>
      <div style="font-size:7px;color:#9CA3AF;margin-top:6px;line-height:1.5;">${pt?'Quanto mais cedo (à esquerda) o ponto, mais o cliente "puxa" e menos estoque — mas maior lead time. Postponement = adiar a diferenciação até esse ponto.':'The earlier (left) the point, the more the customer "pulls" and the less stock — but the longer the lead time. Postponement = delaying differentiation until this point.'}</div>
    </div>`;
  window[id+'_bars'] = strategies.map(s=>bar(s.dp));
  window[id+'_notes'] = strategies.map(s=>s.note);
  window[id+'_names'] = strategies.map(s=>s.name);
};

/* ─── WEEK 7: EOQ interactive calculator + cost curve (Figure 9.2) ── */
window.vis_eoqModel = function(container, lang) {
  const pt = lang === 'pt';
  const id = 'eoq-' + Math.random().toString(36).substr(2,5);
  // defaults = exemplo do livro (CCS): D em caixas/ano, Cs=$25, Ch=$0.12/caixa/ano → EOQ≈3864
  const inp = (key, val, label) => `
    <label style="display:flex;flex-direction:column;gap:2px;font-size:7.5px;font-weight:700;color:#475569;">
      ${label}
      <input id="${id}-${key}" type="number" value="${val}" step="any" min="0"
        oninput="window['${id}_calc']()"
        style="width:100%;box-sizing:border-box;padding:5px 6px;border:1px solid #CBD5E1;border-radius:5px;font-size:11px;font-weight:700;color:#0F172A;">
    </label>`;
  const out = (key, label, unit) => `
    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;padding:6px 8px;">
      <div style="font-size:7px;color:#64748B;font-weight:700;text-transform:uppercase;letter-spacing:.3px;">${label}</div>
      <div style="font-size:13px;font-weight:800;color:#0369A1;"><span id="${id}-${key}">–</span> <span style="font-size:8px;font-weight:600;color:#94A3B8;">${unit}</span></div>
    </div>`;

  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:2px;">
        ${pt?'Calculadora EOQ — mexa nos números':'EOQ Calculator — play with the numbers'}
      </div>
      <div style="font-size:7.5px;color:#64748B;margin-bottom:8px;">Q = √(2·D·Cs / Ch)</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:9px;">
        ${inp('D', 35833, pt?'D — demanda/ano':'D — demand/year')}
        ${inp('Cs', 25, pt?'Cs — custo/pedido':'Cs — cost/order')}
        ${inp('Ch', 0.12, pt?'Ch — manut./unid./ano':'Ch — hold/unit/year')}
      </div>
      <svg id="${id}-svg" viewBox="0 0 300 150" style="width:100%;height:auto;background:#FAFBFC;border:1px solid #E2E8F0;border-radius:7px;"></svg>
      <div style="display:flex;gap:10px;font-size:7px;font-weight:700;margin:5px 0 8px;">
        <span style="color:#DC2626;">— ${pt?'Custo total':'Total cost'}</span>
        <span style="color:#0891B2;">— ${pt?'Manutenção':'Holding'}</span>
        <span style="color:#1E40AF;">— ${pt?'Pedido':'Ordering'}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        ${out('Q', pt?'EOQ (quanto pedir)':'EOQ (how much)', pt?'unid.':'units')}
        ${out('N', pt?'Pedidos por ano':'Orders per year', '×')}
        ${out('avg', pt?'Estoque médio (Q/2)':'Average stock (Q/2)', pt?'unid.':'units')}
        ${out('TC', pt?'Custo total/ano':'Total cost/year', '$')}
      </div>
    </div>`;

  window[id+'_calc'] = function() {
    const g = k => parseFloat((document.getElementById(id+'-'+k)||{}).value) || 0;
    const D = g('D'), Cs = g('Cs'), Ch = g('Ch');
    const set = (k,v) => { const e = document.getElementById(id+'-'+k); if (e) e.textContent = v; };
    if (D<=0 || Cs<=0 || Ch<=0) { ['Q','N','avg','TC'].forEach(k=>set(k,'–')); return; }
    const Q = Math.sqrt(2*D*Cs/Ch);
    const N = D/Q, avg = Q/2, TC = (Q/2)*Ch + (D/Q)*Cs;
    const fmt = n => n>=1000 ? Math.round(n).toLocaleString('en-US') : (Math.round(n*100)/100);
    set('Q', fmt(Q)); set('N', Math.round(N*10)/10); set('avg', fmt(avg)); set('TC', '$'+fmt(TC));
    // desenha as 3 curvas de custo em função do tamanho do pedido q
    const svg = document.getElementById(id+'-svg'); if (!svg) return;
    const W=300,H=150,pad=8, x0=18, y0=H-18, plotW=W-x0-8, plotH=y0-8;
    const qMax = Q*3, N2=60;
    let hold=[],ord=[],tot=[];
    for(let i=1;i<=N2;i++){ const q=qMax*i/N2; hold.push([q,(q/2)*Ch]); ord.push([q,(D/q)*Cs]); tot.push([q,(q/2)*Ch+(D/q)*Cs]); }
    const tcMax = Math.max(...tot.map(p=>p[1]), (qMax/2)*Ch);
    const sx = q => x0 + (q/qMax)*plotW;
    const sy = c => y0 - Math.min(c/tcMax,1)*plotH;
    const path = arr => 'M'+arr.map(p=>sx(p[0]).toFixed(1)+','+sy(p[1]).toFixed(1)).join(' L');
    const eoqX = sx(Q);
    svg.innerHTML = `
      <line x1="${x0}" y1="8" x2="${x0}" y2="${y0}" stroke="#CBD5E1" stroke-width="1"/>
      <line x1="${x0}" y1="${y0}" x2="${W-8}" y2="${y0}" stroke="#CBD5E1" stroke-width="1"/>
      <line x1="${eoqX.toFixed(1)}" y1="8" x2="${eoqX.toFixed(1)}" y2="${y0}" stroke="#B45309" stroke-width="1" stroke-dasharray="3 2"/>
      <text x="${eoqX.toFixed(1)}" y="${y0+11}" font-size="7" font-weight="800" fill="#B45309" text-anchor="middle">EOQ</text>
      <path d="${path(hold)}" fill="none" stroke="#0891B2" stroke-width="1.5"/>
      <path d="${path(ord)}" fill="none" stroke="#1E40AF" stroke-width="1.5"/>
      <path d="${path(tot)}" fill="none" stroke="#DC2626" stroke-width="2"/>
      <text x="2" y="14" font-size="6.5" fill="#94A3B8">$</text>
      <text x="${W-8}" y="${y0+11}" font-size="6.5" fill="#94A3B8" text-anchor="end">${pt?'qtd. pedido':'order qty'}</text>`;
  };
  window[id+'_calc']();
};

/* ─── WEEK 7: Q-System vs P-System ──────────────────────────────── */
window.vis_qpSystems = function(container, lang) {
  const pt = lang === 'pt';
  const cols = [
    { key:'Q', color:'#1D4ED8', bg:'#EFF6FF', title:pt?'Sistema Q':'Q-System',
      sub:pt?'Quantidade fixa · ROL':'Fixed quantity · ROL',
      rows: pt
        ? [['O que é fixo?','A QUANTIDADE (sempre o EOQ)'],['O que decide?','QUANDO pedir'],['Gatilho','Estoque cai ao ponto de ressuprimento (ROL)'],['Intervalos','Irregulares'],['Monitoramento','Contínuo (caro) — código de barras, two-bin'],['Bom para','Itens classe A, alto valor']]
        : [['What is fixed?','The QUANTITY (always the EOQ)'],['What is decided?','WHEN to order'],['Trigger','Stock drops to the reorder level (ROL)'],['Intervals','Irregular'],['Monitoring','Continuous (costly) — barcodes, two-bin'],['Good for','Class A items, high value']] },
    { key:'P', color:'#B45309', bg:'#FFFBEB', title:pt?'Sistema P':'P-System',
      sub:pt?'Período fixo · revisão cíclica':'Fixed period · cyclical review',
      rows: pt
        ? [['O que é fixo?','O PERÍODO (ex: toda segunda)'],['O que decide?','QUANTO pedir'],['Gatilho','Chegou a data de revisão'],['Intervalos','Regulares'],['Monitoramento','Só na data (barato)'],['Bom para','Muitos itens, valor menor']]
        : [['What is fixed?','The PERIOD (e.g. every Monday)'],['What is decided?','HOW MUCH to order'],['Trigger','Review date arrives'],['Intervals','Regular'],['Monitoring','Only on the date (cheap)'],['Good for','Many items, lower value']] }
  ];
  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt?'Quando pedir? Sistema Q vs Sistema P':'When to order? Q-System vs P-System'}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${cols.map(c=>`
          <div style="background:${c.bg};border:1px solid ${c.color}33;border-radius:8px;overflow:hidden;">
            <div style="background:${c.color};color:#fff;padding:7px 9px;">
              <div style="font-size:11px;font-weight:800;">${c.title}</div>
              <div style="font-size:7.5px;opacity:.9;font-weight:600;">${c.sub}</div>
            </div>
            <div style="padding:6px 8px;">
              ${c.rows.map(r=>`<div style="margin-bottom:5px;"><div style="font-size:7px;color:${c.color};font-weight:700;text-transform:uppercase;letter-spacing:.3px;">${r[0]}</div><div style="font-size:8.5px;color:#374151;line-height:1.4;">${r[1]}</div></div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
      <div style="margin-top:8px;background:#F1F5F9;border-radius:6px;padding:6px 9px;font-size:8px;color:#334155;line-height:1.55;">
        💡 ${pt?'<b>Memória:</b> Q = Quantidade fixa · P = Período fixo. O estoque de segurança (safety stock) protege os DOIS contra atrasos e variação da demanda.':'<b>Memory:</b> Q = fixed Quantity · P = fixed Period. Safety stock protects BOTH against delays and demand variation.'}
      </div>
    </div>`;
};

/* ─── WEEK 7: MRP — 3 inputs → plan (+ mini BOM) ─────────────────── */
window.vis_mrpTree = function(container, lang) {
  const pt = lang === 'pt';
  const inputs = [
    { icon:'📅', color:'#1D4ED8', name:'MPS', full:pt?'Plano Mestre de Produção':'Master Production Schedule', desc:pt?'O que produzir e quando':'What to make and when' },
    { icon:'🌳', color:'#15803D', name:'BOM', full:pt?'Lista de Materiais':'Bill of Materials', desc:pt?'A "receita"/árvore do produto':'The product "recipe"/tree' },
    { icon:'📦', color:'#B45309', name:pt?'Estoque':'Inventory', full:pt?'Registros de Estoque':'Inventory Records', desc:pt?'O que já temos':'What we already have' }
  ];
  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt?'MRP — 3 entradas geram o plano':'MRP — 3 inputs generate the plan'}
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;">
        ${inputs.map(i=>`
          <div style="display:flex;align-items:center;gap:8px;background:${i.color}0D;border:1px solid ${i.color}33;border-left:3px solid ${i.color};border-radius:6px;padding:6px 9px;">
            <span style="font-size:15px;">${i.icon}</span>
            <div style="flex:1;"><div style="font-size:9.5px;font-weight:800;color:${i.color};">${i.name} — <span style="font-weight:600;color:#475569;font-size:8px;">${i.full}</span></div><div style="font-size:7.5px;color:#64748B;">${i.desc}</div></div>
          </div>`).join('')}
      </div>
      <div style="text-align:center;font-size:16px;color:#94A3B8;line-height:1;margin:3px 0;">↓</div>
      <div style="background:#1E293B;border-radius:7px;padding:9px 11px;text-align:center;">
        <div style="font-size:10px;font-weight:800;color:#fff;">⚙️ MRP</div>
        <div style="font-size:7.5px;color:#94A3B8;margin-top:2px;">${pt?'"explode" o produto de trás pra frente e desconta o estoque atual':'"explodes" the product backwards and subtracts current stock'}</div>
      </div>
      <div style="text-align:center;font-size:16px;color:#94A3B8;line-height:1;margin:3px 0;">↓</div>
      <div style="background:#DCFCE7;border:1px solid #86EFAC;border-radius:7px;padding:8px 11px;text-align:center;">
        <div style="font-size:9.5px;font-weight:800;color:#166534;">📋 ${pt?'Plano de Materiais':'Material Plan'}</div>
        <div style="font-size:8px;color:#15803D;margin-top:1px;">${pt?'o que pedir · quanto · quando':'what to order · how much · when'}</div>
      </div>
      <div style="margin-top:8px;background:#F8FAFC;border-radius:6px;padding:6px 9px;font-size:7.5px;color:#475569;line-height:1.55;">
        <b>${pt?'Mini-BOM (chaleira):':'Mini-BOM (kettle):'}</b> ${pt?'chaleira = 1 corpo + 1 resistência + 1 tampa + 1 cabo + 2 parafusos. Se o MPS pede 100 chaleiras e há 30 tampas em estoque, o MRP pede 70 tampas.':'kettle = 1 body + 1 element + 1 lid + 1 handle + 2 screws. If the MPS asks for 100 kettles and 30 lids are in stock, MRP orders 70 lids.'}
      </div>
    </div>`;
};

/* ─── WEEK 7: ABC Analysis (Pareto) ─────────────────────────────── */
window.vis_abcAnalysis = function(container, lang) {
  const pt = lang === 'pt';
  const classes = [
    { k:'A', color:'#DC2626', items:10, value:80, ctrl:pt?'Controle rígido e preciso (ROL tempo real, código de barras)':'Tight, precise control (real-time ROL, barcodes)', ex:pt?'Itens caros / muito usados':'Expensive / heavily used items' },
    { k:'B', color:'#F59E0B', items:30, value:15, ctrl:pt?'Controle intermediário':'Intermediate control', ex:pt?'Valor moderado':'Moderate value' },
    { k:'C', color:'#0891B2', items:60, value:5, ctrl:pt?'Controle superficial (basta conferir de vez em quando)':'Cursory control (occasional checks)', ex:pt?'Parafusos, porcas, itens baratos':'Bolts, nuts, cheap items' }
  ];
  const barRow = (label, field) => `
    <div style="margin-bottom:7px;">
      <div style="font-size:7.5px;font-weight:700;color:#475569;margin-bottom:2px;">${label}</div>
      <div style="display:flex;height:20px;border-radius:4px;overflow:hidden;">
        ${classes.map(c=>`<div style="width:${c[field]}%;background:${c.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:800;">${c.k} ${c[field]}%</div>`).join('')}
      </div>
    </div>`;
  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt?'Análise ABC — o 80/20 do estoque':'ABC Analysis — the 80/20 of inventory'}
      </div>
      ${barRow(pt?'% dos ITENS':'% of ITEMS','items')}
      ${barRow(pt?'% do VALOR (gasto anual)':'% of VALUE (annual spend)','value')}
      <div style="display:flex;flex-direction:column;gap:5px;margin-top:8px;">
        ${classes.map(c=>`
          <div style="display:flex;gap:8px;align-items:flex-start;background:${c.color}0D;border-left:3px solid ${c.color};border-radius:5px;padding:5px 8px;">
            <div style="font-size:12px;font-weight:900;color:${c.color};line-height:1.2;">${c.k}</div>
            <div style="flex:1;"><div style="font-size:8px;color:#374151;line-height:1.4;"><b>${c.ctrl}</b></div><div style="font-size:7px;color:#94A3B8;">${c.ex}</div></div>
          </div>`).join('')}
      </div>
      <div style="margin-top:7px;font-size:7.5px;color:#64748B;line-height:1.5;">${pt?'Poucos itens vitais (A) valem quase tudo. Foque o esforço de controle onde o dinheiro está.':'A vital few items (A) are worth almost everything. Focus control effort where the money is.'}</div>
    </div>`;
};

/* ─── WEEK 8: Elements of the Lean System (Figure 10.4) ─────────── */
window.vis_leanElements = function(container, lang) {
  const pt = lang === 'pt';
  const id = 'lean-' + Math.random().toString(36).substr(2,5);
  const els = [
    { icon:'🌊', color:'#0891B2', name:pt?'Fluxo':'Flow', detail:pt?'JIT, kanban, produção balanceada. O material flui sem paradas nem acúmulo.':'JIT, kanban, balanced production. Material flows without stops or build-up.' },
    { icon:'✅', color:'#15803D', name:pt?'Controle de Qualidade':'Quality Control', detail:pt?'Altos níveis de qualidade + kaizen (melhoria contínua). É a base do cone de areia.':'High quality levels + kaizen (continuous improvement). The base of the sand cone.' },
    { icon:'📦', color:'#B45309', name:pt?'Cuidado com o Produto':'Product Stewardship', detail:pt?'Design adequado e marketing conforme os planos de produção.':'Suitable design and marketing to production plans.' },
    { icon:'👥', color:'#7C3AED', name:pt?'Envolvimento dos Funcionários':'Employee Involvement', detail:pt?'Senioridade, trabalho em equipe e organização de trabalho adequada.':'Seniority, teamwork and suitable work organization.' },
    { icon:'🤝', color:'#DC2626', name:pt?'Trabalho com Fornecedores':'Working With Suppliers', detail:pt?'Lead times curtos e relações de longo prazo com os fornecedores.':'Short supplier lead times and long-term relationships.' },
    { icon:'⚡', color:'#0369A1', name:pt?'Foco em Set-ups':'Focus On Set-ups', detail:pt?'Baixo custo e tempo de preparação (SMED, Shingo) → viabiliza lotes pequenos.':'Low set-up cost and time (SMED, Shingo) → makes small batches viable.' }
  ];
  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:3px;">
        ${pt?'Elementos do Sistema Lean (Fig. 10.4)':'Elements of the Lean System (Fig. 10.4)'}
      </div>
      <div style="font-size:7.5px;color:#64748B;margin-bottom:8px;">${pt?'Todos são necessários e só funcionam JUNTOS. Clique para ver.':'All are needed and only work TOGETHER. Click to see.'}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
        ${els.map((e,i)=>`
          <div onclick="var b=document.getElementById('${id}-body');var was=b.getAttribute('data-i')=='${i}';document.querySelectorAll('.${id}-c').forEach(function(c){c.style.outline='none';});if(was){b.style.display='none';b.setAttribute('data-i','');}else{this.style.outline='2px solid ${e.color}';b.style.display='block';b.setAttribute('data-i','${i}');document.getElementById('${id}-t').textContent='${e.icon} '+'${e.name.replace(/'/g,"\\'")}';document.getElementById('${id}-t').style.color='${e.color}';document.getElementById('${id}-d').textContent='${e.detail.replace(/'/g,"\\'")}';}"
            class="${id}-c" style="background:${e.color}0D;border:1px solid ${e.color}33;border-radius:6px;padding:7px 8px;cursor:pointer;transition:outline .12s;">
            <div style="font-size:13px;">${e.icon}</div>
            <div style="font-size:8px;font-weight:800;color:${e.color};line-height:1.25;margin-top:2px;">${e.name}</div>
          </div>`).join('')}
      </div>
      <div style="text-align:center;margin:7px 0;">
        <span style="display:inline-block;background:#FEE2E2;border:1px solid #FCA5A5;border-radius:20px;padding:5px 14px;font-size:9px;font-weight:800;color:#B91C1C;">🎯 ${pt?'SISTEMA LEAN':'LEAN SYSTEM'}</span>
        <div style="font-size:7px;color:#94A3B8;margin-top:3px;">${pt?'no centro, sustentando tudo: a QUALIDADE (cone de areia)':'at the centre, holding it all up: QUALITY (sand cone)'}</div>
      </div>
      <div id="${id}-body" data-i="" style="display:none;background:#fff;border:1px solid #E5E7EB;border-radius:7px;padding:9px 11px;">
        <div id="${id}-t" style="font-size:10px;font-weight:800;margin-bottom:3px;"></div>
        <div id="${id}-d" style="font-size:8.5px;color:#374151;line-height:1.6;"></div>
      </div>
    </div>`;
};

/* ─── WEEK 8: The 7 Wastes / Muda (Ohno) ────────────────────────── */
window.vis_sevenWastes = function(container, lang) {
  const pt = lang === 'pt';
  const id = 'muda-' + Math.random().toString(36).substr(2,5);
  const wastes = [
    { L:'T', color:'#DC2626', name:pt?'Transporte':'Transport', ex:pt?'Mover produtos pela fábrica não agrega valor (exceto a entrega final).':'Moving products around adds no value (except final delivery).' },
    { L:'I', color:'#EA580C', name:pt?'Estoque (Inventory)':'Inventory', ex:pt?'Produto parado esconde problemas e gera obsolescência.':'Idle product hides problems and causes obsolescence.' },
    { L:'M', color:'#D97706', name:pt?'Movimento (Motion)':'Motion', ex:pt?'Pessoas ou equipamentos se movendo à toa.':'People or equipment moving needlessly.' },
    { L:'W', color:'#65A30D', name:pt?'Espera (Waiting)':'Waiting', ex:pt?'Tempo ocioso esperando material, máquina ou informação.':'Idle time waiting for material, machine or information.' },
    { L:'O', color:'#0891B2', name:pt?'Superprodução':'Overproduction', ex:pt?'⚠️ O PIOR: produzir antes do necessário gera os outros desperdícios.':'⚠️ THE WORST: making before it is needed generates the other wastes.' },
    { L:'O', color:'#2563EB', name:pt?'Superprocessamento':'Overprocessing', ex:pt?'Equipamento complexo/caro demais para a tarefa. Toyota usa a máquina mais simples que serve.':'Equipment too complex/expensive for the task. Toyota uses the simplest machine that works.' },
    { L:'D', color:'#7C3AED', name:pt?'Defeitos':'Defects', ex:pt?'Inspecionar e corrigir defeitos não agrega valor.':'Inspecting and fixing defects adds no value.' }
  ];
  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:2px;">
        ${pt?'Os 7 Desperdícios (Muda) — Ohno':'The 7 Wastes (Muda) — Ohno'}
      </div>
      <div style="font-size:7.5px;color:#64748B;margin-bottom:8px;">${pt?'Mnemônico: <b>TIMWOOD</b>. Clique em cada letra.':'Mnemonic: <b>TIMWOOD</b>. Click each letter.'}</div>
      <div style="display:flex;gap:3px;margin-bottom:8px;">
        ${wastes.map((w,i)=>`
          <div onclick="var b=document.getElementById('${id}-b');document.querySelectorAll('.${id}-l').forEach(function(x){x.style.transform='none';x.style.boxShadow='none';});this.style.transform='translateY(-2px)';this.style.boxShadow='0 3px 8px '+'${w.color}55';document.getElementById('${id}-n').textContent='${w.name.replace(/'/g,"\\'")}';document.getElementById('${id}-n').style.color='${w.color}';document.getElementById('${id}-e').textContent='${w.ex.replace(/'/g,"\\'")}';b.style.display='block';"
            class="${id}-l" style="flex:1;background:${w.color};color:#fff;border-radius:6px;padding:9px 2px;text-align:center;font-size:14px;font-weight:900;cursor:pointer;transition:all .12s;">${w.L}</div>`).join('')}
      </div>
      <div id="${id}-b" style="display:none;background:#F8FAFC;border:1px solid #E5E7EB;border-radius:7px;padding:9px 11px;">
        <div id="${id}-n" style="font-size:10px;font-weight:800;margin-bottom:3px;"></div>
        <div id="${id}-e" style="font-size:8.5px;color:#374151;line-height:1.6;"></div>
      </div>
      <div style="margin-top:8px;background:#EEF2FF;border-radius:6px;padding:6px 9px;font-size:7.5px;color:#3730A3;line-height:1.55;">
        💡 ${pt?'3 tipos de desperdício (Ohno): <b>muda</b> (não agrega valor), <b>muri</b> (sobrecarga), <b>mura</b> (desnivelamento). + 8º de Womack: subutilizar o talento das pessoas.':'3 types of waste (Ohno): <b>muda</b> (non-value-adding), <b>muri</b> (overburden), <b>mura</b> (unevenness). + Womack\'s 8th: underusing people\'s talent.'}
      </div>
    </div>`;
};

/* ─── WEEK 8: 5S Framework ──────────────────────────────────────── */
window.vis_fiveS = function(container, lang) {
  const pt = lang === 'pt';
  const steps = [
    { jp:'Seiri', en:'Sort', pt:'Utilização', color:'#DC2626', desc:pt?'Remover do local tudo que é desnecessário.':'Remove everything unnecessary from the workplace.' },
    { jp:'Seiton', en:'Set in order', pt:'Organização', color:'#EA580C', desc:pt?'Lugar demarcado para cada coisa (chão pintado, áreas marcadas).':'A marked place for everything (painted floors, marked areas).' },
    { jp:'Seiso', en:'Shine', pt:'Limpeza', color:'#CA8A04', desc:pt?'Manter o local limpo; gera ordem e orgulho no trabalho.':'Keep the place clean; it creates order and pride in the work.' },
    { jp:'Seiketsu', en:'Standardize', pt:'Padronização', color:'#16A34A', desc:pt?'Compartilhar e desenvolver as melhores práticas padronizadas.':'Share and develop standardized best practices.' },
    { jp:'Shitsuke', en:'Sustain', pt:'Disciplina', color:'#2563EB', desc:pt?'⭐ Manter os outros 4 — o passo mais difícil e o mais importante.':'⭐ Keep the other 4 going — the hardest and most important step.' }
  ];
  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt?'Framework 5S — organização enxuta':'5S Framework — lean organization'}
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;">
        ${steps.map((s,i)=>`
          <div style="display:flex;align-items:center;gap:9px;background:${s.color}0D;border-left:3px solid ${s.color};border-radius:6px;padding:7px 10px;">
            <div style="width:20px;height:20px;flex-shrink:0;border-radius:50%;background:${s.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;">${i+1}</div>
            <div style="flex:1;">
              <div style="font-size:9.5px;font-weight:800;color:${s.color};">${s.jp} <span style="font-weight:600;color:#475569;font-size:8px;">— ${s.en}${pt?' / '+s.pt:''}</span></div>
              <div style="font-size:8px;color:#374151;line-height:1.45;margin-top:1px;">${s.desc}</div>
            </div>
          </div>`).join('')}
      </div>
      <div style="margin-top:7px;font-size:7.5px;color:#64748B;line-height:1.5;">${pt?'Aplica-se a produção E serviços (fábrica, escritório, hospital). Sem o 5º S (Disciplina), tudo volta ao caos.':'Applies to production AND services (factory, office, hospital). Without the 5th S (Sustain), everything returns to chaos.'}</div>
    </div>`;
};

/* ─── WEEK 8: Push vs Pull & Kanban (Figures 10.2/10.3) ─────────── */
window.vis_kanbanPull = function(container, lang) {
  const pt = lang === 'pt';
  const id = 'kb-' + Math.random().toString(36).substr(2,5);
  const stations = pt ? ['Fornecedor','Estação A','Estação B','Montagem','Cliente'] : ['Supplier','Station A','Station B','Assembly','Customer'];
  container.innerHTML = `
    <div style="padding:4px;font-family:sans-serif;">
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:.7px;font-weight:700;color:#003865;margin-bottom:8px;">
        ${pt?'Empurrar (push) vs Puxar (pull)':'Push vs Pull'}
      </div>
      <div style="margin-bottom:9px;">
        <div style="font-size:8px;font-weight:800;color:#DC2626;margin-bottom:3px;">⬛ PUSH ${pt?'— plano central (MRP) empurra por previsão':'— central plan (MRP) pushes from forecast'}</div>
        <div style="display:flex;align-items:center;gap:1px;">
          ${stations.map((s,i)=>`<div style="flex:1;text-align:center;"><div style="background:#FCA5A5;color:#7F1D1D;font-size:6.5px;font-weight:700;border-radius:3px;padding:5px 1px;line-height:1.15;">${s}</div>${i<stations.length-1?'<div style="color:#DC2626;font-size:11px;font-weight:900;">▶</div>':''}</div>`).join('<div style="align-self:center;"></div>')}
        </div>
        <div style="font-size:6.5px;color:#94A3B8;text-align:center;margin-top:2px;">${pt?'material empurrado adiante → pode acumular estoque':'material pushed forward → can pile up stock'}</div>
      </div>
      <div>
        <div style="font-size:8px;font-weight:800;color:#15803D;margin-bottom:3px;">🟩 PULL ${pt?'— demanda real puxa; a última estação responde primeiro':'— real demand pulls; last station responds first'}</div>
        <div style="display:flex;align-items:center;gap:1px;">
          ${stations.map((s,i)=>`<div style="flex:1;text-align:center;"><div style="background:#86EFAC;color:#14532D;font-size:6.5px;font-weight:700;border-radius:3px;padding:5px 1px;line-height:1.15;">${s}</div>${i<stations.length-1?'<div style="color:#15803D;font-size:11px;font-weight:900;">◀</div>':''}</div>`).join('<div style="align-self:center;"></div>')}
        </div>
        <div style="font-size:6.5px;color:#94A3B8;text-align:center;margin-top:2px;">${pt?'o pedido puxa para trás, via kanban → estoque quase zero':'the order pulls backwards, via kanban → near-zero stock'}</div>
      </div>
      <div style="margin-top:9px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:7px;padding:8px 10px;">
        <div style="font-size:8.5px;font-weight:800;color:#B45309;margin-bottom:2px;">🚩 ${pt?'Kanban — o sinal que puxa':'Kanban — the pulling signal'}</div>
        <div style="font-size:8px;color:#78350F;line-height:1.55;">${pt?'Caixa vazia / cartão = "produza mais". Caixa cheia = pare. No McDonald\'s: a bandeirinha metálica na fila de lanches — ao chegar à frente, volta à cozinha pedindo mais.':'Empty box / card = "make more". Full box = stop. At McDonald\'s: the metal flag in the row of burgers — on reaching the front, it goes back to the kitchen for more.'}</div>
      </div>
    </div>`;
};
