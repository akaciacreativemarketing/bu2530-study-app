# 05 · Escopo do glow-up

Estado em 08/set/2026: **Fases 0, 1, 2 e 3 entregues** (direção B · Dossiê, Modo Semanas responsivo, gamificação removida, Modo Hub, modo Revisão, modo Prova, callout de macete). Fase 4 segue como proposta.

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
| P1 | "Folha clara" para leitura longa (a direção B já é escura; modo escuro deixou de fazer sentido) | avaliar na Fase 4 |
| P2 | Checklist "o que a semana cobrou" (`tasks[]` ou parse das notes) | Fase 4 |
| P2 | Motion com GSAP (reveals, linhas que se desenham) e Lottie discreto, com `prefers-reduced-motion` | Fase 4 |
| P2 | Meta tags de compartilhamento por rota (hoje: título por rota e og genérico) | Fase 4 |
| P2 | Normalização tipográfica dos renderers para `rem` | Fase 4, por lote |
| P2 | Impressão / "salvar como PDF" da semana | Fase 4 |
| P2 | Modo Trilhas (D11) | gaveta |
| P2 | `related[]` e `tags[]` opcionais por conceito para enriquecer o Hub | Fase 4 |

## Fases

0. **Prancha visual e decisões.** ✅ 07/set/2026 (Artifact com A, B e C; B escolhida).
1. **Fundação + Modo Semanas.** ✅ 07/set/2026. Tokens, fontes, casca responsiva, gamificação fora, home nova, idioma, semana como documento com abas e palco, revisão redesenhada.
2. **Modo Hub.** ✅ 07/set/2026. Índice, arestas 1 a 3, quadro em canvas, ficha, busca, lista mobile.
3. **Estudo.** ✅ 08/set/2026. Modo Revisão por matéria, modo Prova, callout de macete; atalhos na capa da matéria, na gaveta e no cabeçalho de cada semana ("Revisar · W09", "Modo prova · W09").
4. **Polimento.** GSAP/Lottie, folha clara, meta tags por rota, impressão, renderers em `rem`, `related[]`/`tags[]`, Trilhas, atualização final do CLAUDE.md do hub.

## Critérios de pronto (por fase)

- Screenshots desktop e mobile das telas afetadas, revisados contra os "tells" do playbook anti-slop.
- Nenhum erro de console; auditoria de renderers sem regressão.
- Todas as 20 semanas abrem e todas as visualizações respondem ao clique no palco.
- Teclado: navegar, abrir fichas (`details`), virar flashcard e usar a busca sem mouse.
- Contraste mínimo AA em texto; foco visível.
- Commit com a spec atualizada.

Fases 1 e 2 cumpriram os critérios em 07/set/2026 e a Fase 3 em 08/set/2026 (QA em 01).

## Fora de escopo agora

Login, progresso sincronizado, painel de contribuição, multi-universidade (Fase 4 do PLANO.md). Renomear repositório/projeto Vercel (cosmético, decidir depois).
