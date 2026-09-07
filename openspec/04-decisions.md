# 04 · Decisões (ADR)

Formato: contexto → decisão → consequências. Status: **aceita**, **proposta** (recomendação do assistente, aguarda o dono), **pendente** (só o dono decide).

## D1 · Público muda: de ferramenta pessoal para plataforma compartilhada · aceita (07/set/2026)

**Contexto.** O conteúdo das 20 semanas do BU2530 está 100% pronto. O dono quer compartilhar gratuitamente com outros alunos, sem login, para facilitar o estudo deles.
**Decisão.** O produto passa a ser desenhado para um visitante anônimo, em qualquer aparelho, que pode chegar por link direto em qualquer semana.
**Consequências.** Mobile vira obrigatório; nada pode depender de estado pessoal; links profundos precisam funcionar; a home apresenta o curso, não "o meu progresso".

## D2 · Remover a gamificação · aceita (07/set/2026), com arquivo do que saiu

**Condição do dono:** manter registrado exatamente o que foi removido (regras de XP, níveis, conquistas, chaves, funções) para reimplementar algo parecido no futuro, possivelmente na Fase 4 com contas. Arquivo em [07-gamification-archive.md](07-gamification-archive.md).

**Contexto.** XP, níveis (Estagiário → CMO), conquistas, confete, stat cards, anéis de progresso e botões "OK" por seção vivem no `localStorage` do aparelho. Os `status: 'done'` das semanas 1 a 5 de Operações estão gravados nos arquivos de dados. Teste em navegador zerado (07/set/2026): a home mostrou "25% · 5/20 weeks completed" e duas conquistas desbloqueadas ao lado de "0 XP". Um aluno novo herda o progresso do autor e vê números contraditórios.
**Decisão proposta.** Remover XP, níveis, conquistas, confete, toasts de XP, stat cards, progresso por semana e por seção, badges de status e o uso do campo `status` dos dados. Manter apenas: idioma (`uol-lang`), tema, "última semana visitada" (retomar de onde parou, discreto) e a pilha "sei / revisar" dos flashcards **em memória durante a sessão**.
**Consequências.** `app.js` perde ~150 linhas de gamificação; `index.html` perde `#xpBar`; `migrateLegacyStorage()` pode ser removida junto com as chaves. O CLAUDE.md do hub (seção "Gamificação" e chaves de localStorage) precisa ser atualizado quando implementar.

## D3 · Continuar vanilla, sem build · aceita

**Contexto.** PLANO.md (jul/2026) já decidiu evoluir o app puro e só virar plataforma com backend na Fase 4. Nada mudou: não há login nem multiusuário com estado.
**Decisão.** HTML/CSS/JS puros, estático, `file://` e Vercel. Motion via GSAP por CDN se aprovado. Nenhum framework.
**Consequências.** Reescrever CSS e reorganizar `app.js` sem bundler; manter a ordem de carga por `<script>`.

## D4 · Mobile-first é requisito, não polimento · aceita

**Contexto.** Screenshot em 390px (07/set/2026): sidebar fixa de 272px, conteúdo quebrado em uma palavra por linha. Alunos abrem no celular.
**Decisão.** Todo layout nasce em 390px e cresce. Sidebar vira gaveta abaixo de ~900px. Nenhuma tela publica sem screenshot mobile aprovado.

## D5 · Escala dos renderers por palco + `zoom` · proposta

Ver 03. Resolve a legibilidade sem reescrever os renderers; normalização por token fica para depois.

## D6 · Direção de design · pendente

Opções A (Atlas, recomendada), B (Dossiê) e C (Caderno) em 06. Decisão do dono, de preferência depois de ver uma prancha visual das três.

## D7 · Idioma padrão por detecção · proposta

`navigator.language` começando com `pt` abre em PT-BR; senão, EN. O toggle continua e a escolha persiste em `uol-lang`. Conteúdo segue bilíngue por campo.

## D8 · Rotas: manter hash e adicionar âncoras de seção · proposta

Manter `#<subjectId>/week-N` (links existentes continuam válidos) e adicionar `#<subjectId>/week-N/<secao>` para o sumário e para compartilhar um trecho. Novas rotas: `#search`, `#<subjectId>/review` (flashcards da matéria) e `#<subjectId>/quiz`.

## D9 · Nada de imagem gerada nem 3D · aceita (07/set/2026)

As visualizações são a imagem do produto. Fotos ou 3D no hero seriam enfeite com custo de performance. O único elemento "vivo" fica no canvas 2D do mapa de conexões da home.

## D10 · Arsenal aprovado · aceita (07/set/2026)

O dono aprovou os quatro itens oferecidos: mapa vivo em canvas 2D na home, GSAP sóbrio (reveals e linhas que se desenham, só `transform`/`opacity`, `prefers-reduced-motion` obrigatório), modo escuro por preferência do sistema com toggle, e Lottie discreto (loader e check). Roteamento: mecânica com `gsap-*`, gosto com a lente anti-slop, Lottie via `text-to-lottie` verificado por render.

## D6 (complemento) · Prancha visual antes da escolha · aceita (07/set/2026)

O dono pediu para ver antes de decidir. Entregável: prancha em Artifact com mock de home e de página da semana nas direções candidatas, usando conteúdo real (Semana 20 de Marketing e o grafo de conexões) e pelo menos um renderer real no palco escalado. A escolha final fecha D6 e transforma 06 em "vigente".
