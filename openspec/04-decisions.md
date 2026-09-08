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

## D5 · Escala dos renderers por palco + `zoom` · aceita e implementada (07/set/2026)

Ver 03. Resolve a legibilidade sem reescrever os renderers; normalização por token fica para depois. No celular a figura mantém a largura de projeto e rola dentro do palco.

## D6 · Direção de design · aceita: B · Dossiê (07/set/2026)

**Contexto.** Prancha visual com A (Atlas, recomendada pelo assistente), B (Dossiê) e C (Caderno), com conteúdo real e renderers rodando: https://claude.ai/code/artifact/c4df899b-3978-4c64-89a6-6e8c4611a7a7
**Decisão do dono.** B · Dossiê, "com mais identidade". O risco de proximidade com o universo Akacia foi aceito conscientemente.
**O que atravessa da A.** O mapa de conexões continua, mas como parte do conteúdo e não como hero da home: no Dossiê ele vira o **quadro de ligações** (corkboard de investigação, linhas ligando evidências) dentro do modo Hub (ver D11 e 08).
**Consequências.** 06 vira vigente com a paleta e tipografia da B; a home é capa de dossiê por matéria; página da semana é folha com abas; sem modo noite (a direção já é escura por natureza; avaliar "folha clara" para leitura longa na Fase 4).

## D11 · Dois modos de aprendizado agora, um terceiro na gaveta · aceita (07/set/2026)

**Contexto.** O dono percebeu que a matéria inteira é um hub de conhecimento que pode ser estudado sem a amarra das semanas: conceitos espalhados que se interligam, "uma renovação do conceito de estudar".
**Decisão.** Três modos: (1) **Semanas**, o que existe hoje, redesenhado; (2) **Hub de conhecimento**, novo, os conceitos e teorias como nós interligados, independente de semana; (3) **Trilhas**, sequências curadas entre semanas, fica na gaveta. Com as provas chegando, o foco é entregar 1 e 2. Spec em [08-modes.md](08-modes.md).

## D7 · Idioma padrão por detecção · aceita e implementada (07/set/2026)

`navigator.language` começando com `pt` abre em PT-BR; senão, EN. O toggle continua e a escolha persiste em `uol-lang`. Conteúdo segue bilíngue por campo; `<html lang>` acompanha.

## D8 · Rotas: manter hash e adicionar âncoras de seção · aceita e implementada (07 e 08/set/2026)

Implementado: `#<subjectId>/week-N/<secao>` (abas fixas da folha; mudar só a seção rola sem re-render), as rotas do Hub (`#hub`, `#hub/<subjectId>`, `#hub/<subjectId>/<slug>`) e, na Fase 3, `#<subjectId>/review[/faixa]` e `#<subjectId>/quiz[/faixa]`, onde a faixa é `N` ou `A-B` (ex.: `#marketing-strategy/quiz/7-10` = prova das semanas 17 a 20 do curso). A busca global vive dentro do Hub (`#hub`, atalho `/`), então `#search` não foi criada.

## D14 · Prova gerada dos dados, sem banco de questões à mão · aceita (08/set/2026)

**Contexto.** O dono quer treinar para as MCQ do Coursera. Escrever questões à mão para 20 semanas não escala e envelhece.
**Decisão.** `study.js` gera múltipla escolha na hora: de cada flashcard (pergunta → resposta certa) e de cada termo do glossário (definição → termo, ou termo → definição). As três alternativas erradas vêm de outras fichas da mesma matéria, com preferência pela mesma semana e por tamanho parecido (para o tamanho não entregar a resposta); textos iguais à resposta são descartados. Nada é gravado; ao terminar, o aluno pode refazer só as erradas.
**Consequências.** Toda semana nova entra na prova sozinha. A qualidade das questões depende da qualidade dos flashcards e do glossário (02): perguntas diretas e respostas concisas continuam sendo a regra de escrita.

## D9 · Nada de imagem gerada nem 3D · aceita (07/set/2026)

As visualizações são a imagem do produto. Fotos ou 3D no hero seriam enfeite com custo de performance. O único elemento "vivo" é o canvas 2D do quadro de ligações, que com a D6 saiu da home e mora no modo Hub.

## D12 · Negrito automático nas palavras em caixa alta · aceita (07/set/2026)

**Contexto.** Os textos do curso já marcam o essencial em CAIXA ALTA ("SISTEMA DE ATIVIDADES", "MARGEM", "NÃO é"). O playbook pede palavras-chave em negrito para escaneabilidade.
**Decisão.** `boldKeys()` em `app.js` envolve em `<b>` toda sequência de palavras em caixa alta com 3 letras ou mais (conectivos "DE", "E", "OF" no meio são aceitos; uma lista de exclusão evita "NOT", "THE", "NÃO" sozinhos). O texto é escapado antes; os dados não mudam.
**Consequências.** Nenhum campo novo nos dados. Se um texto tiver caixa alta por outro motivo (siglas longas), ela aparece em negrito, o que é aceitável.

## D13 · Ligações do Hub: nunca inventadas, automáticas marcadas · aceita (07/set/2026)

Ver 08. As arestas nascem só dos dados (mesma semana, `connections`, citação cruzada por texto). A citação cruzada usa chaves com 6 caracteres ou mais, ignora uma lista de termos genéricos e descarta qualquer chave que apareça em mais de 8 nós de outras semanas (frequência alta = termo genérico, não ligação). Na ficha, essas ligações aparecem sob o título "Citação cruzada · automática".

## D10 · Arsenal aprovado · aceita (07/set/2026) · executado sem dependência (08/set/2026)

O dono aprovou os quatro itens oferecidos: mapa vivo em canvas 2D na home, GSAP sóbrio (reveals e linhas que se desenham, só `transform`/`opacity`, `prefers-reduced-motion` obrigatório), modo escuro por preferência do sistema com toggle, e Lottie discreto (loader e check). Roteamento: mecânica com `gsap-*`, gosto com a lente anti-slop, Lottie via `text-to-lottie` verificado por render.

**Como ficou na Fase 4.** O canvas virou o quadro de ligações do Hub (D6/D9). Os momentos de motion aprovados (pastas que sobem na capa, seções que entram na folha, desenho progressivo do quadro) couberam em CSS (`@keyframes rise` com `--i` para o stagger, 30ms por item, teto de 9) e no próprio canvas; GSAP por CDN não foi adicionado porque não sobrou nada que precisasse de timeline, e quebraria o uso em `file://` sem rede. Lottie tampouco: não há estado de carregamento nem confirmação que uma animação vetorial melhore (o carimbo "Certo" da prova já é o feedback). Ambos continuam aprovados para o dia em que houver um momento que os justifique (candidato: o traçado das Trilhas). O "modo escuro" virou o inverso, a **folha clara** (D15), porque a direção B já nasce escura.

## D15 · Folha clara como escolha, não como padrão · aceita (08/set/2026)

**Contexto.** A direção B é escura por identidade (06). Leitura longa de dia, no celular, pede a opção de fundo claro; 05 previa avaliar isso na Fase 4.
**Decisão.** Toggle "Escuro · Claro" no topo, gravado em `uol-theme`. Sem detecção automática por `prefers-color-scheme`: o escuro é a cara do produto e o claro é uma escolha do visitante. Na folha clara o chão vira papel (`#F3EEE2`), a folha fica um tom mais clara (`#FBF8F1`) para manter a hierarquia, a manila escurece um pouco como fundo e vira dourado-tinta (`#7E6A3E`) quando é texto, o carimbo continua vermelho. O quadro de ligações continua escuro em qualquer tema: é um objeto (cortiça), não uma superfície.
**Consequências.** Nenhuma cor de componente é definida só dentro do bloco do tema; tudo passa pelos tokens da camada `tokens`, e o bloco claro só os redefine (mais um bloco pequeno de exceções de contraste em `components`).

## D16 · Impressão da semana sem página extra · aceita (08/set/2026)

"Imprimir · salvar PDF" no cabeçalho da semana chama `window.print()`. O CSS de impressão esconde a casca (topo, gaveta, abas, ferramentas, rodapé), abre todas as fichas (`beforeprint`/`afterprint`), imprime os palcos com borda e escala 1.15, e troca o fichário de flashcards por uma lista pergunta/resposta (`.print-only`) para caber no papel. Não há rota `/print`: a página é a mesma.

## D6 (complemento) · Prancha visual antes da escolha · aceita (07/set/2026)

O dono pediu para ver antes de decidir. Entregável: prancha em Artifact com mock de home e de página da semana nas direções candidatas, usando conteúdo real (Semana 20 de Marketing e o grafo de conexões) e pelo menos um renderer real no palco escalado. A escolha final fecha D6 e transforma 06 em "vigente".
