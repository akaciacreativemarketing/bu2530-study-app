# 08 · Modos de aprendizado · proposta (D11)

Três jeitos de entrar no mesmo conteúdo. Os dados não mudam de formato; o que muda é a porta de entrada.

## Modo 1 · Semanas (vigente, a redesenhar)

O que existe: matéria → semana → seções (visão geral, conceitos, teorias, casos, glossário, conexões, flashcards, notas). Na direção B: capa por matéria, pastas das semanas, folha com abas. Continua sendo o caminho de quem acompanha o curso e o que a prova cobra por bloco.

## Modo 2 · Hub de conhecimento (novo, foco junto com o glow-up)

**Ideia do dono:** a matéria inteira é um hub; os conceitos se espalham e se interligam, sem a amarra da semana. Estudar pela rede, não pela sequência.

**Nós.** Conceitos (284) e teorias (111) de todas as semanas das duas matérias. Cada nó sabe de onde veio (matéria, semana, seção).

**Arestas, em ordem de custo zero para custo baixo:**
1. **Mesma semana:** conceitos e teorias da mesma semana se conectam (co-ocorrência).
2. **`connections` entre semanas:** herdadas; ligam os nós das duas semanas.
3. **Citação cruzada automática:** o nome de um conceito ou termo de glossário aparece na definição de outro (busca por texto, normalizada, com lista de exclusão para palavras genéricas). É o que faz "Porter" da Semana 2 encontrar "Porter" da Semana 9 sem ninguém digitar nada.
4. **`related[]` explícito** (futuro, opcional por conceito) para amarrar o que a automação não pega.
5. **Temas** (futuro, opcional): `tags[]` por conceito para agrupar em clusters (ex.: Porter, Branding, Processos, Ética). Enquanto não existir, o cluster é a matéria.

**Telas.**
- **Quadro de ligações:** canvas 2D na estética Dossiê (fichas sobre fundo escuro, barbante entre elas). Hover acende a vizinhança; clique abre a ficha. Filtros por matéria e por tema; busca no próprio quadro. Mobile: lista de fichas com "ligado a" em vez do canvas denso.
- **Ficha do conceito:** nome PT/EN, definição, onde aparece (semanas, teorias, casos, flashcards que o citam), conceitos ligados, e o carimbo "Cai na prova" quando houver flashcard associado. Rota `#hub/<subject>/<slug>`.
- **Entrada:** `#hub` com busca em primeiro plano e o quadro logo abaixo.

**Regras.** Nunca inventar ligação sem fonte nos dados. Ligações automáticas são marcadas como tal na ficha. O Hub lê os mesmos `WEEKS_DATA`; nenhum conteúdo é duplicado.

**Índice derivado (02).** Construído uma vez no carregamento: `{id, kind, subject, week, pt, en, text, links[]}` por nó. Custo aceitável para 400 nós em JS puro.

## Modo 3 · Trilhas (gaveta)

Sequências curadas que atravessam semanas com um objetivo ("Trilha Porter: 5 Forças → Cadeia de Valor → estratégias genéricas", "Trilha de prova MCQ 4: semanas 17 a 20"). Formato provável: `data/trails/*.js` com lista ordenada de nós do Hub e um texto de ligação por passo. Não começa antes de 1 e 2 estarem publicados.

## Sequência de entrega (ajusta as fases de 05)

- Fase 1: fundação na direção B + Modo 1 responsivo + remoção da gamificação.
- Fase 2: Modo 2 com arestas 1 a 3 (sem novo dado) + fichas + quadro.
- Fase 3: busca global, revisão e prova (aproveitam o índice do Hub).
- Fase 4: polimento; avaliar `related[]`/`tags[]` e o Modo 3.
