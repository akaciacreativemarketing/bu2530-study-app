# 01 · Arquitetura · vigente desde o glow-up (07/set/2026)

## Stack

HTML + CSS + JavaScript puros. Sem framework, sem build, sem dependências de runtime. Abre em `file://` e roda como site estático no Vercel. Fontes via Google Fonts (`display=swap`, com pilha de fallback real).

## Arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | Casca semântica: `header.topbar` (menu, wordmark, nav principal, idioma), `aside.drawer` (gaveta de navegação), `main`, `footer.foot`; meta tags de compartilhamento; carrega dados e scripts em ordem |
| `style.css` | Todo o estilo em camadas: `@layer tokens, base, layout, components, renderers, utilities`. Direção B · Dossiê (06) |
| `app.js` | Núcleo (estado leve, i18n, rotas, casca) + **Modo 1 · Semanas** (home, matéria, semana como documento contínuo, revisão, flashcards) + `VIS_DISPATCH` e o palco das visualizações |
| `hub.js` | **Modo 2 · Hub de conhecimento** (`window.HUB`): índice derivado, arestas, busca, quadro de ligações em canvas 2D, ficha do conceito |
| `visualizers.js` | ~100 funções `window.vis_*` (intocadas pelo glow-up) |
| `data/subjects.js` | Registro das matérias (`window.SUBJECTS`) |
| `data/<materia>/week-XX.js` | Conteúdo de cada semana (`window.WEEKS_DATA[materia][N]`), 20 arquivos |

**Ordem de carga** (importa): `subjects.js` → todos os `week-XX.js` → `visualizers.js` → `hub.js` → `app.js`. `hub.js` só define `window.HUB`; quem constrói o índice é `init()` em `app.js` (`HUB.build()` antes da primeira rota). Os helpers globais de `app.js` (`t`, `T`, `esc`, `rich`, `getSubject`, `weekTitle`, `partNum`, `wnum`, `pad2`, `setMain`, `VIS_DISPATCH`) são usados por `hub.js` só em tempo de render, depois da carga completa.

## Rotas (hash)

| Rota | Tela |
|---|---|
| `#home` | Capa do curso: hero, os dois modos, uma capa de dossiê por matéria |
| `#<subjectId>` | Capa da matéria com as pastas das semanas e das revisões |
| `#<subjectId>/week-N` | Dossiê da semana: cabeçalho escuro + abas fixas + folha contínua com todas as seções |
| `#<subjectId>/week-N/<secao>` | Mesma página, rolando até a seção (`overview`, `concepts`, `theories`, `cases`, `glossary`, `flashcards`, `authors`, `notes`, `links`, `connections`). Mudar só a seção não re-renderiza |
| `#<subjectId>/rN` | Revisão do bloco (resumo por semana + todos os flashcards) |
| `#hub` | Hub de conhecimento: busca em primeiro plano, quadro de ligações, fichas mais citadas, lista por semana |
| `#hub/<subjectId>` | Quadro filtrado por matéria |
| `#hub/<subjectId>/<slug>` | Ficha do conceito ou teoria |

Legado: `#week-N`, `#rN` e `#dashboard` redirecionam. `route()` em `app.js` despacha; `lastRoute` evita re-render quando só a seção muda.

## Estado local (localStorage)

Só duas chaves: `uol-lang` (`pt` | `en`, gravada quando o visitante troca) e `uol-last` (última rota, para retomar). O idioma inicial vem de `navigator.language` (D7). `cleanLegacyStorage()` apaga as chaves da gamificação removida (`uol-xp`, `uol-fc-count`, `uol-lang-toggle`, `uol-migrated`, `uol-*-status`, `uol-*-sections-*`, `bu2530-*`) na primeira visita. O app funciona igual sem localStorage. A pilha "sabia / revisar" dos flashcards vive em memória (`fcState`) e some ao recarregar.

## Layout

- Página rola normalmente (não há mais `overflow:hidden` no body).
- `≥ 900px`: grade de duas colunas, gaveta fixa (sticky) de 280px + conteúdo.
- `< 900px`: gaveta vira painel lateral (`transform`), aberta pelo botão do topo, com scrim, `Escape` fecha, `body.drawer-open` trava a rolagem.
- Topo fixo (56px). Na página da semana, a barra de abas também é fixa logo abaixo; `.sec` tem `scroll-margin-top` para as âncoras; um `IntersectionObserver` marca a aba ativa.
- A folha (`.paper`) é o único lugar claro; tudo o mais é o chão escuro com a linha de pauta sutil.

## Motion

Só transições CSS em `transform`/`opacity` (gaveta, pastas, flashcard) e o desenho progressivo do quadro em canvas. `prefers-reduced-motion` zera tudo (inclusive `scroll-behavior`). GSAP e Lottie (D10) continuam aprovados para a Fase 4, por CDN.

## Restrições que continuam valendo

1. 100% estático e sem build.
2. Os arquivos de dados não mudam de formato por causa da UI.
3. Nenhuma dependência instalada sem aviso.
4. Sem backend, sem conta, sem cookie de rastreio.

## QA obrigatório antes de publicar

- `node --check` em `app.js`, `hub.js`, `visualizers.js`.
- `~/.claude/tools/pw/studyhub-qa.mjs <base> <out> full`: abre home, matéria, semana, revisão, hub, ficha e as 20 semanas em 1366×900 e 390×844, coleta erros de console, confere que todo `.stage[data-renderer]` inicializou e acusa overflow horizontal.
- `~/.claude/tools/pw/studyhub-sections.mjs <base> <out> pt-BR`: screenshots por seção da semana (desktop e mobile), busca e hover do quadro.
- Servidor local: `python3 -m http.server 3141` na pasta do app. Usar `reducedMotion: 'reduce'` no Playwright para capturas com rolagem.
