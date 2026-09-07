# 05 · Escopo do glow-up

## Tirar

- Sistema de XP e níveis (`XP_LEVELS`, `getXP/setXP/addXP`, `updateXPBar`, `#xpBar`).
- Conquistas (`ACHIEVEMENTS`, `trackFcScore`, `trackLangToggle`).
- Confete, toasts de XP, stat cards da home e da matéria, anel "Overall Progress", barras de progresso por matéria e por semana, badges e chips de status, botões "OK" por seção, chaves `uol-xp`, `uol-fc-count`, `uol-lang-toggle`, `uol-*-status`, `uol-*-sections-*`, `migrateLegacyStorage`.
- Gradientes decorativos (sidebar, heros), texto fantasma "BU2530", pills, card-dentro-de-card.
- O acordeão de seções na página da semana.

## Manter

- Todo o modelo de dados e todos os renderers (ver 02 e 03).
- Rotas existentes (compatibilidade de links).
- Toggle PT/EN com persistência.
- Páginas de revisão por bloco de semanas (`rN`), redesenhadas.
- Flashcards com virar/avançar; a pontuação "sei / revisar" fica só na sessão.
- Busca do glossário dentro da semana (vira parte da busca global).
- Crédito discreto no rodapé.

## Adicionar

| Pri | Item | Nota |
|---|---|---|
| P0 | Layout responsivo com gaveta de navegação no mobile | D4 |
| P0 | Página da semana como documento contínuo com sumário fixo e âncoras por seção | D8 |
| P0 | Palco de visualização em largura total com escala por container query | D5 |
| P0 | Tokens, tipografia e sistema visual da direção escolhida | D6 |
| P0 | Home nova: apresentação do curso e das matérias, sem progresso | D1 |
| P0 | Idioma auto-detectado | D7 |
| P1 | Busca global (conceitos, glossário, flashcards, teorias) com atalho `/` | índice derivado, ver 02 |
| P1 | Mapa de conexões em canvas 2D na home (nós = semanas, arestas = `connections`) | o "wow" da direção A |
| P1 | Modo Revisão por matéria: todos os flashcards, embaralhar, pilha de revisão na sessão | rota `#<subject>/review` |
| P1 | Modo Prova: questões de múltipla escolha geradas de flashcards e glossário | rota `#<subject>/quiz` |
| P1 | Callout de macete (mnemônicos em destaque) | componente |
| P1 | Modo escuro | `data-theme` + `prefers-color-scheme` |
| P2 | Checklist "o que a semana cobrou" | depende de `tasks[]` ou parse das notes |
| P2 | Motion sóbrio com GSAP (reveals, linhas que se desenham) e `prefers-reduced-motion` | só `transform`/`opacity` |
| P2 | Meta tags de compartilhamento (título e descrição por rota) | link bonito no WhatsApp |
| P2 | Normalização tipográfica dos renderers para `rem` | por lote, com auditoria |
| P2 | Impressão / "salvar como PDF" da semana | CSS de impressão |

## Fases

0. **Prancha visual e decisões.** Mock de home e página da semana nas direções candidatas; o dono escolhe; 06 vira "vigente".
1. **Fundação.** Tokens, fontes, casca responsiva, remoção da gamificação, home nova, idioma. Publicar já com o mobile funcionando.
2. **Página da semana.** Documento com sumário, palco das visualizações, callouts, âncoras, revisão redesenhada.
3. **Estudo.** Busca global, modo Revisão, modo Prova, mapa de conexões.
4. **Polimento.** Motion, modo escuro, meta tags, impressão, QA final, atualização do CLAUDE.md do hub.

## Critérios de pronto (por fase)

- Screenshots desktop e mobile das telas afetadas, revisados contra os "tells" do playbook anti-slop.
- Nenhum erro de console; auditoria de renderers sem regressão.
- Todas as 20 semanas abrem e todas as visualizações respondem ao clique no palco novo.
- Teclado: navegar, abrir seções, virar flashcard e usar a busca sem mouse.
- Contraste mínimo AA em texto; foco visível.
- Commit com a spec atualizada.

## Fora de escopo agora

Login, progresso sincronizado, painel de contribuição, multi-universidade (Fase 4 do PLANO.md). Renomear repositório/projeto Vercel (cosmético, decidir depois).
