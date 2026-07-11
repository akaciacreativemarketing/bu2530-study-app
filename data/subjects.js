/* ─── Registro de Matérias ─────────────────────────────────
   Cada matéria do curso é uma entrada aqui.
   Para adicionar uma matéria nova:
   1. Copiar um bloco abaixo e ajustar id, code, name, weekTitles
   2. Criar data/<id>/week-01.js … week-NN.js (templates vazios)
   3. Adicionar os <script src="data/<id>/week-XX.js"> no index.html
──────────────────────────────────────────────────────────── */
window.SUBJECTS = [
  {
    id: 'operations-management',
    code: 'BU2530 · Part 1',
    icon: '⚙️',
    color: '#003865',
    name: { pt: 'Gestão de Operações', en: 'Operations Management' },
    description: {
      pt: 'Como organizações projetam, gerenciam e melhoram os processos que produzem seus produtos e serviços.',
      en: 'How organisations design, manage and improve the processes that produce their products and services.',
    },
    book: 'EBOOK_ Operations Management 2_e.pdf',
    totalWeeks: 10,
    reviews: [
      { id: 'r1', after: 5,  range: [1, 5],  labelPt: '📋 Revisão — Semanas 1–5',  labelEn: '📋 Review — Weeks 1–5'  },
      { id: 'r2', after: 10, range: [6, 10], labelPt: '📋 Revisão — Semanas 6–10', labelEn: '📋 Review — Weeks 6–10' },
    ],
    weekTitles: {
      1:  { pt: 'O que é Gestão de Operações?',       en: 'What is Operations Management?' },
      2:  { pt: 'Estratégia de Operações',            en: 'Operations Strategy' },
      3:  { pt: 'Projetando Produtos e Serviços',     en: 'Designing Products and Services' },
      4:  { pt: 'Design de Processos',                en: 'Process Design' },
      5:  { pt: 'Design de Rede de Suprimentos',      en: 'Supply Network Design' },
      6:  { pt: 'Gestão da Cadeia e Relacionamentos', en: 'Supply Chain & Relationship Management' },
      7:  { pt: 'Gestão de Estoque',                  en: 'Inventory Management' },
      8:  { pt: 'Operações Enxutas',                  en: 'Lean Operations' },
      9:  { pt: 'Gestão da Qualidade',                en: 'Quality Management' },
      10: { pt: 'Futuro da Gestão de Operações',      en: 'Future Directions in Operations Management' },
    },
  },
  {
    id: 'marketing-strategy',
    code: 'BU2530 · Part 2',
    icon: '📣',
    color: '#C8102E',
    name: { pt: 'Estratégia de Marketing', en: 'Marketing Strategy' },
    description: {
      pt: 'Auditoria de ambiente, segmentação, branding e o mix de marketing — da teoria clássica à era digital.',
      en: 'Environmental audit, segmentation, branding and the marketing mix — from classic theory to the digital age.',
    },
    book: 'Essentials of Marketing Management.pdf',
    totalWeeks: 10,
    reviews: [
      { id: 'r1', after: 5,  range: [1, 5],  labelPt: '📋 Revisão — Semanas 1–5',  labelEn: '📋 Review — Weeks 1–5'  },
      { id: 'r2', after: 10, range: [6, 10], labelPt: '📋 Revisão — Semanas 6–10', labelEn: '📋 Review — Weeks 6–10' },
    ],
    weekTitles: {
      1:  { pt: 'Auditoria do Ambiente de Marketing', en: 'The Marketing Environmental Audit' },
      2:  { pt: 'Auditoria Macro e Micro Ambiental',  en: 'Macro & Micro Marketing Environmental Audit' },
      3:  { pt: 'Segmentação, Alvo e Posicionamento', en: 'Segmenting, Targeting and Positioning (STP)' },
      4:  { pt: 'Branding',                           en: 'Branding' },
      5:  { pt: 'Branding Interno e Externo',         en: 'Internal and External Branding' },
      6:  { pt: 'Mix de Marketing Tradicional — 4Ps', en: 'The Traditional Marketing Mix — the 4Ps' },
      7:  { pt: 'Mix de Marketing Estendido — 7Ps',   en: 'The Extended Marketing Mix — the 7Ps' },
      8:  { pt: 'Marketing na Era Digital',           en: 'Marketing in the Digital Age' },
      9:  { pt: 'Cadeia de Valor de Porter',          en: "Porter's Value Chain" },
      10: { pt: 'Marketing Ético e RSC',              en: 'Ethical Marketing and CSR' },
    },
  },
];
