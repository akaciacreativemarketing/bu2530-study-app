# 08 · Modos de aprendizado · vigente (D11, implementado em 07/set/2026)

Três jeitos de entrar no mesmo conteúdo. Os dados não mudam de formato; o que muda é a porta de entrada.

## Modo 1 · Semanas · vigente

Matéria → semana → seções. Na direção B: capa por matéria (numeral da parte, pastas manila das semanas e das revisões), cabeçalho escuro da semana (numeral, título, contagem, anterior/próxima), barra de abas fixa e a folha creme contínua com as seções na ordem de 02: visão geral, conceitos (fichas `details`, com "abrir todas"), teorias (com "Evidência NN" no palco), casos, glossário (busca), flashcards (fichário), autores, notas (blocos `═══` viram subtítulos; "FONTES" em mono), material, conexões. Cada ficha e teoria tem "Ver no Hub".

## Modo 2 · Hub de conhecimento · vigente

**Ideia do dono:** a matéria inteira é um hub; os conceitos se espalham e se interligam, sem a amarra da semana. Estudar pela rede, não pela sequência.

**Nós.** 284 conceitos + 111 teorias (395) de todas as semanas das duas matérias. Cada nó sabe de onde veio (matéria, semana, índice) e tem um `slug` estável por matéria: `slugify(en || pt)`; em colisão, sufixo `-wN`; se ainda colidir, `-c<idx>`/`-t<idx>`.

**Arestas (as três primeiras implementadas, sem dado novo):**
1. **Mesma semana:** todos os nós da semana se conectam (co-ocorrência). Na ficha: "Ligado a · mesma semana".
2. **`connections` entre semanas:** herdadas dos dados e agregadas por par de semanas (52 pares). No quadro são o barbante manila entre os anéis; na ficha, "Semanas ligadas pelo curso" com a razão original.
3. **Citação cruzada automática:** o nome de um nó (PT ou EN, com 6+ caracteres, sem parênteses, fora da lista de termos genéricos) aparece na definição ou no nome de outro nó de outra semana. Chaves que batem em mais de 8 nós são descartadas como genéricas. Resultado nos dados de set/2026: 121 arestas, 132 nós com pelo menos uma. No quadro é o barbante vermelho; na ficha, "Citação cruzada · automática".
4. **`related[]` explícito** (futuro, opcional por conceito).
5. **`tags[]`** (futuro, opcional) para clusters temáticos. Enquanto não existir, o cluster é a semana.

**Telas.**
- **Entrada `#hub`:** título, lede, busca em primeiro plano (atalho `/` de qualquer tela; `Enter` abre o primeiro resultado; `Esc` limpa), figuras (conceitos, teorias, semanas, conexões, citações), filtros por matéria (abas manila), legenda, quadro, "fichas mais citadas" (maior grau de citação cruzada) e a lista por semana (`details` por semana com chips; teorias em manila).
- **Quadro de ligações (canvas 2D, telas ≥ 720px):** uma região por matéria (lado a lado; empilhadas abaixo de 900px), dez anéis (semanas) por região, teorias como fichas manila no centro do anel e conceitos como pontos ao redor. Hover acende o nó, a semana e as citações; etiqueta manila com o nome; legenda embaixo com "abrir ficha". Clique no nó abre a ficha; clique em "W##" abre a semana. A busca destaca os nós encontrados. Desenho progressivo respeita `prefers-reduced-motion`. Abaixo de 720px o quadro não é desenhado: fica a lista por semana.
- **Ficha `#hub/<subject>/<slug>`:** tipo e posição ("Conceito 04 de 16 · W09 · título"), nome PT/EN, autores/ano quando teoria, definição, atalho para a evidência interativa no dossiê, "Onde aparece" (dossiê, flashcards que citam o nome, casos, termos do glossário), "Ligado a · mesma semana", "Citação cruzada · automática", "Semanas ligadas pelo curso" (com a razão), anterior/próximo dentro da semana. Carimbo **"Cai na prova"** quando algum flashcard da matéria cita o nome.

**Busca.** Índice = nós + termos de glossário + flashcards. Pontuação: prefixo do nome > nome contém > texto contém, com leve prioridade teoria > conceito > termo > flashcard. Termos e flashcards levam à seção da semana; nós levam à ficha.

**Regras.** Nunca inventar ligação sem fonte nos dados. Ligações automáticas são marcadas como tal. O Hub lê os mesmos `WEEKS_DATA`; nenhum conteúdo é duplicado. Índice construído uma vez no carregamento (`HUB.build()` em `init()`), custo de dezenas de milissegundos.

## Modo 3 · Trilhas · gaveta

Sequências curadas que atravessam semanas com um objetivo ("Trilha Porter: 5 Forças → Cadeia de Valor → estratégias genéricas", "Trilha de prova MCQ 4: semanas 17 a 20"). Formato provável: `data/trails/*.js` com lista ordenada de slugs do Hub e um texto de ligação por passo. Aparece na gaveta como "em breve".

## Sequência de entrega

- Fase 1: fundação na direção B + Modo 1 responsivo + remoção da gamificação. ✅
- Fase 2: Modo 2 com arestas 1 a 3 + fichas + quadro + busca. ✅
- Fase 3: modo Revisão e modo Prova (`study.js`, spec em 05 e D14). ✅
- Fase 4: polimento; avaliar `related[]`/`tags[]` e o Modo 3.

## Ferramentas de estudo por matéria (Fase 3, complementam os modos)

- **Revisão** (`#<subject>/review[/faixa]`): todos os flashcards da matéria num fichário só, com a semana de origem em cada carta (link para a seção), chips por semana e presets dos blocos de revisão, embaralhar, "só os marcados para revisar" e teclado (← → navegar, Enter vira, 1 sabia, 2 revisar). A pilha vive na sessão.
- **Prova** (`#<subject>/quiz[/faixa]`): configuração (semanas, 10/15/20/30 questões, fontes flashcards e/ou glossário) → uma questão por vez com quatro alternativas (1 a 4 no teclado) → correção imediata com carimbo "Certo"/"Errado", resposta e link para o dossiê → resultado com "refazer as erradas". Regras de geração em D14.
- Atalhos: capa da matéria, gaveta (abaixo das semanas) e cabeçalho de cada semana (revisar/prova só daquela semana).
