# 01 · Arquitetura

## Estado atual (vigente)

**Stack:** HTML + CSS + JavaScript puros. Sem framework, sem build, sem dependências. Abre em `file://` e roda como site estático.

**Arquivos**

| Arquivo | Papel | Tamanho (set/2026) |
|---|---|---|
| `index.html` | Casca (sidebar + main), carrega dados e scripts em ordem | 55 linhas |
| `style.css` | Todo o estilo, sem tokens formais, sem media queries | 588 linhas |
| `app.js` | Roteamento, render de home / matéria / semana / revisão, gamificação, flashcards, glossário | 1.366 linhas |
| `visualizers.js` | ~100 funções `window.vis_*` (renderers genéricos + específicos por semana) | 4.553 linhas |
| `data/subjects.js` | Registro das matérias (`window.SUBJECTS`) | |
| `data/<materia>/week-XX.js` | Conteúdo de cada semana (`window.WEEKS_DATA[materia][N]`) | 20 arquivos, todos abastecidos |

**Ordem de carga** (importa): `subjects.js` → todos os `week-XX.js` → `visualizers.js` → `app.js`. Os arquivos de dados só populam objetos globais; nada renderiza antes de `app.js`.

**Rotas (hash):** `#home` · `#<subjectId>` · `#<subjectId>/week-N` · `#<subjectId>/rN` (revisão). Hashes antigos `#week-N` e `#rN` redirecionam. A função `route()` em `app.js` despacha.

**Estado local (localStorage):** `uol-lang`, `uol-xp`, `uol-fc-count`, `uol-lang-toggle`, `uol-<subjectId>-week-<N>-status`, `uol-<subjectId>-sections-<N>`. `migrateLegacyStorage()` converte chaves antigas `bu2530-*`.

**Layout:** `body` em flex com `overflow:hidden`; sidebar fixa de 272px; `.main-content` com `height:100vh` e rolagem interna. Consequência: não existe rolagem de página, e em telas estreitas nada se adapta.

**Deploy:** repositório git em `study-app/.git`, GitHub `akaciacreativemarketing/bu2530-study-app`, Vercel ligado à branch `main`. Push = deploy.

## Restrições que continuam valendo

1. Continuar 100% estático e sem build: o app precisa abrir em `file://` e publicar no Vercel sem etapa de compilação.
2. Os arquivos de dados não mudam de formato por causa do redesign. A UI se adapta aos dados, nunca o contrário.
3. Nenhuma dependência instalada sem aviso. Bibliotecas só via CDN e só se justificarem (candidata única: GSAP para motion).
4. Sem backend, sem conta, sem cookie de rastreio. Compartilhável por link.

## Arquitetura alvo do glow-up (proposta)

- `index.html`: casca semântica (`header`, `nav`, `main`, `aside` de sumário), meta tags de compartilhamento, `<html lang>` dinâmico, fontes via Google Fonts com `display=swap`.
- `style.css` reescrito em camadas: `@layer tokens, base, layout, components, renderers, utilities`. Tokens em três níveis (primitivo → semântico → componente). Container queries para o palco das visualizações. Tema claro e escuro por `data-theme` com fallback em `prefers-color-scheme`.
- `app.js` dividido por responsabilidade (ainda como scripts globais, sem bundler): `core/` (rotas, i18n, estado leve), `views/` (home, subject, week, review, search, study-modes), `components/` (callout de macete, palco de visualização, sumário). Carregados em ordem no `index.html`.
- Estado local reduzido a: idioma, tema, "última semana visitada". Tudo opcional; o app funciona igual sem localStorage.
- Motion: GSAP via CDN, usado só em `transform` e `opacity`, com `prefers-reduced-motion` desligando tudo.
- Orçamento: primeira pintura sem JS pesado; canvas do hero em 2D (sem WebGL); nenhuma animação contínua fora da home.

## QA obrigatório antes de publicar

- Screenshots por Playwright em 1366×900 e 390×844 de: home, matéria, semana (com seções abertas), busca, revisão. Script base: `~/.claude/tools/pw/studyhub-shot.mjs`.
- Zero erro no console em todas as rotas.
- Auditoria de renderers no sandbox (ver 03) sem regressão.
- Navegação por teclado completa e foco visível.
