# 05 · Escopo do glow-up

Estado em 08/set/2026: **Fases 0 a 4 entregues** (direção B · Dossiê, Modo Semanas responsivo, gamificação removida, Modo Hub, modo Revisão, modo Prova, callout de macete, folha clara, impressão, motion em CSS, "continuar de onde parou", bloco de tarefas). O que sobrou está listado como "adiado" na tabela, com o motivo.

## Tirar · feito

- Sistema de XP e níveis, conquistas, confete, toasts, stat cards, anel "Overall Progress", barras de progresso, badges e chips de status, botões "OK" por seção, chaves `uol-xp`, `uol-fc-count`, `uol-lang-toggle`, `uol-*-status`, `uol-*-sections-*`, `migrateLegacyStorage` (arquivo em 07; `cleanLegacyStorage()` limpa o aparelho do visitante).
- Gradientes decorativos, texto fantasma, pills, card-dentro-de-card.
- O acordeão de seções na página da semana.

## Manter · feito

- Todo o modelo de dados e todos os renderers (02 e 03), sem mudança.
- Rotas existentes (compatibilidade de links) + redirecionamentos legados.
- Toggle PT/EN com persistência (agora com detecção inicial, D7).
- Páginas de revisão por bloco (`rN`), redesenhadas.
- Flashcards com virar/avançar; a pontuação "sabia / revisar" fica só na sessão. Teclado: Enter/Espaço vira.
- Busca do glossário dentro da semana.
- Crédito discreto no rodapé.

## Adicionar

| Pri | Item | Estado |
|---|---|---|
| P0 | Layout responsivo com gaveta de navegação no mobile (D4) | **feito** |
| P0 | Página da semana como documento contínuo com abas fixas e âncoras por seção (D8) | **feito** |
| P0 | Palco de visualização em largura total com escala por container query (D5) | **feito** |
| P0 | Tokens, tipografia e sistema visual da direção B (D6) | **feito** |
| P0 | Home nova: capa do curso, os dois modos, capa de dossiê por matéria, sem progresso (D1) | **feito** |
| P0 | Idioma auto-detectado (D7) | **feito** |
| P0 | **Modo Hub de conhecimento**: índice derivado, arestas, ficha por conceito, entrada com busca (D11, 08) | **feito** |
| P1 | Quadro de ligações em canvas 2D no Hub (hover acende vizinhança, clique abre ficha, W## abre a semana, busca destaca) | **feito** |
| P1 | Busca global (conceitos, teorias, glossário, flashcards) com atalho `/` | **feito, dentro do Hub** |
| P1 | Callout de macete: linhas das notas com "macete"/"mnemonic" viram marca-texto com etiqueta | **feito** (sem campo novo; `mnemonics[]` continua opcional para o futuro) |
| P1 | Modo Revisão por matéria: todos os flashcards, chips por semana, embaralhar, "só revisar", teclado (`#<subject>/review[/faixa]`) | **feito** |
| P1 | Modo Prova: múltipla escolha gerada de flashcards e glossário, correção na hora, refazer as erradas (`#<subject>/quiz[/faixa]`, D14) | **feito** |
| P1 | "Folha clara" para leitura longa: toggle Escuro · Claro no topo, gravado em `uol-theme` (D15) | **feito** |
| P2 | Bloco "o que o curso cobrou": o bloco `TAREFAS DO CURSO / COURSE TASKS` das notas vira destaque manila no topo das notas (existe em 4 semanas; sem checklist persistente, por D1) | **feito** |
| P2 | Motion sóbrio: pastas e seções entram com stagger em CSS; quadro desenha progressivamente; `prefers-reduced-motion` zera tudo (D10) | **feito, sem GSAP/Lottie** |
| P2 | Impressão / "salvar como PDF" da semana (D16) | **feito** |
| P2 | "Continuar de onde parou" na home, a partir de `uol-last` (só rotas de conteúdo) | **feito** |
| P2 | Meta tags de compartilhamento por rota | **não aplicável**: com rotas em hash, WhatsApp e afins não executam JS; exigiria pré-render ou rotas reais. Fica o título por rota e o `og:` genérico |
| P2 | Normalização tipográfica dos renderers para `rem` | adiado: 100 renderers, por lote, com auditoria; o palco resolve a leitura hoje |
| P2 | `related[]` e `tags[]` opcionais por conceito para enriquecer o Hub | adiado: sem dado ainda; entra quando o conteúdo ganhar esses campos |
| P2 | Modo Trilhas (D11) | gaveta, por decisão do dono |

## Fases

0. **Prancha visual e decisões.** ✅ 07/set/2026 (Artifact com A, B e C; B escolhida).
1. **Fundação + Modo Semanas.** ✅ 07/set/2026. Tokens, fontes, casca responsiva, gamificação fora, home nova, idioma, semana como documento com abas e palco, revisão redesenhada.
2. **Modo Hub.** ✅ 07/set/2026. Índice, arestas 1 a 3, quadro em canvas, ficha, busca, lista mobile.
3. **Estudo.** ✅ 08/set/2026. Modo Revisão por matéria, modo Prova, callout de macete; atalhos na capa da matéria, na gaveta e no cabeçalho de cada semana ("Revisar · W09", "Modo prova · W09").
4. **Polimento.** ✅ 08/set/2026. Folha clara (D15), impressão (D16), motion em CSS (D10), continuar de onde parou, bloco de tarefas, foco no `main` a cada rota, CLAUDE.md do hub atualizado. Adiados com motivo na tabela: meta por rota, renderers em `rem`, `related[]`/`tags[]`, Trilhas.

## Critérios de pronto (por fase)

- Screenshots desktop e mobile das telas afetadas, revisados contra os "tells" do playbook anti-slop.
- Nenhum erro de console; auditoria de renderers sem regressão.
- Todas as 20 semanas abrem e todas as visualizações respondem ao clique no palco.
- Teclado: navegar, abrir fichas (`details`), virar flashcard e usar a busca sem mouse.
- Contraste mínimo AA em texto; foco visível.
- Commit com a spec atualizada.

Fases 1 e 2 cumpriram os critérios em 07/set/2026; Fases 3 e 4 em 08/set/2026 (QA em 01).

## Fora de escopo agora

Login, progresso sincronizado, painel de contribuição, multi-universidade (Fase 4 do PLANO.md). Renomear repositório/projeto Vercel (cosmético, decidir depois).
