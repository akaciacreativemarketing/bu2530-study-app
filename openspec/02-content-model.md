# 02 · Modelo de conteúdo

O contrato completo do formato de cada semana está em `../../CLAUDE.md` (seção "Estrutura de dados"). Esta spec registra o que a UI pode assumir e o que ela não pode tocar.

## Registro de matérias · `window.SUBJECTS`

Array de matérias. Campos usados pela UI: `id` (kebab-case, chave de rota e de `WEEKS_DATA`), `code`, `icon`, `color`, `name{pt,en}`, `description{pt,en}`, `book`, `totalWeeks`, `reviews[]` (`id`, `after`, `range`, `labelPt`, `labelEn`) e `weekTitles{N:{pt,en}}`.

Matérias hoje: `operations-management` (10 semanas) e `marketing-strategy` (10 semanas). O curso completo pode chegar a 24 matérias; o registro é declarativo e a UI precisa escalar sem mudança de código.

## Conteúdo da semana · `window.WEEKS_DATA[subjectId][N]`

Campos: `week`, `status`, `title`, `overview`, `concepts[]`, `theories[]`, `authors[]`, `caseStudies[]`, `glossary[]`, `connections[]`, `flashcards[]`, `links[]`, `notes{pt,en}`.

Uma semana "vazia" tem só `week` e `status`. A UI detecta abastecimento pela presença de `title` ou `concepts` (`isWeekPopulated`).

## Invariantes que a UI respeita

1. **Bilíngue por campo.** Todo texto é `{pt, en}`, exceto `glossary[].term` e `caseStudies[].company`. A UI sempre resolve pelo idioma ativo com fallback para o outro.
2. **Somente leitura.** A UI nunca escreve em `WEEKS_DATA` nem em `SUBJECTS`. Estado do usuário fica fora dos dados.
3. **`status` é legado.** O campo `status` nos arquivos de dados reflete o progresso do autor original e não deve ser exibido nem usado como progresso de quem visita. Fica no arquivo por compatibilidade; a UI ignora. (Decisão D2 em 04.)
4. **`connections` pode cruzar matérias.** Item sem `subject` aponta para a mesma matéria; com `subject` aponta para outra. É a base do mapa de conexões do redesign.
5. **`theories[].renderer` é opcional.** Quando presente, precisa existir `window.vis_<renderer>` e a chave em `VIS_DISPATCH` (ver 03). Sem renderer, card de texto.
6. **`notes` é texto longo em blocos `═══ TÍTULO ═══`**, com o bloco final `═══ FONTES ═══` / `═══ SOURCES ═══`. A UI pode transformar esses blocos em seções navegáveis, mas não reescreve o texto.
7. **Ordem das seções** na página da semana segue a ordem dos campos acima. Seções sem dados não aparecem.

## Dados derivados (calculados na UI, nunca gravados)

- Índice de busca: concatenação de conceitos, glossário, flashcards e títulos de teoria de todas as semanas abastecidas, com referência de matéria/semana.
- Grafo de conexões: nós = semanas abastecidas; arestas = `connections` (bidirecionais na exibição).
- Banco de questões do modo Prova: gerado de `flashcards` (pergunta/resposta) e `glossary` (termo/definição), com distratores sorteados de outras entradas da mesma matéria.

## Extensões futuras que não quebram o contrato

- `tasks[]` por semana ("o que a semana cobrou"), extraído do bloco `TAREFAS DO CURSO` das notes. Opcional; se ausente, a UI tenta ler o bloco das notes.
- `mnemonics[]` por semana, para o callout de macete. Enquanto não existir, a UI não inventa: só exibe o que estiver nos textos.
