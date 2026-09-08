# 03 · Renderers (visualizações interativas)

## Contrato

- Cada visualização é uma função global `window.vis_<nome>(container, lang, data?)` em `visualizers.js`. Recebe o elemento onde desenhar e o idioma (`'pt'` | `'en'`).
- Para ser usada, o nome entra em `VIS_DISPATCH` (`app.js`) e a teoria aponta `renderer: '<nome>'`.
- Genéricos disponíveis: `timeline`, `radar`, `forces`, `ladder`, `spectrum`, `wave`. Duas teorias são detectadas pelo nome sem campo renderer: `4Vs` e `Conversion`.
- Contagem em set/2026: ~100 funções `vis_*` (genéricos + específicos), todas as 20 semanas cobertas.

## Padrão de índice (obrigatório em renderer clicável)

Bug real corrigido em `9b7a31f`: texto injetado dentro de `onclick="..."` quebra o atributo quando contém aspa dupla. A regra desde então:

```js
const id = 'prefixo-' + Math.random().toString(36).substr(2,5);
window[id+'_data'] = itens;                 // os dados ficam no window
window[id+'_sel'] = function(i){ ... };     // o handler recebe SÓ o índice
// no HTML: onclick="window['${id}_sel'](${i})"
```

- O `onclick` passa apenas o índice numérico. Nunca texto, nunca objeto.
- Texto de item usa aspas tipográficas (" ") e nunca aspa reta dentro de string de interface.
- Apóstrofo dentro de string JS entre aspas simples precisa de escape (`\'`), inclusive em `E\'s`, `Carroll\'s`.

## Auditoria (rodar antes de qualquer commit que toque `visualizers.js`)

Sandbox em Node com DOM falso: carrega os `week-XX.js` e o `visualizers.js` em `vm`, chama cada renderer em `pt` e `en`, e verifica que todo `onclick` casa com `/^window\['[a-z0-9-]+_sel'\]\(\d+\)$/`. Scripts de referência: `verify_wNN.js` usados nas semanas 13 a 20. Renderers antigos de Operações (semanas 1 a 10) usam outro estilo de handler inline válido; a regex os acusa como "BAD" e isso é falso positivo conhecido, não regressão.

## Restrição conhecida: escala

Os renderers foram desenhados para um painel lateral de ~520px e usam `font-size` em pixels fixos, dominando 6px a 11px (mais de 600 ocorrências entre 6.5 e 10px). Em 1366px de largura já são difíceis de ler; em celular, ilegíveis.

**Solução implementada no glow-up (07/set/2026), sem tocar nos renderers:**
1. Cada visualização vive num **palco** (`figure.palco` > `div.stage.vis-container[data-renderer]`) em largura total, abaixo do texto da teoria, precedido do rótulo "Evidência NN · interativa".
2. `.palco` é `container-type: inline-size`; `.stage` recebe `zoom` por container query: 1 até 519px, 1.25 a partir de 520px, 1.5 a partir de 700px, 1.7 a partir de 900px. `.stage` tem `max-width: 600px` para não esticar além do projeto.
3. Palco estreito (celular, `< 520px`): o conteúdo do stage ganha `min-width: 440px` e o stage rola horizontalmente (`overflow-x: auto`). A figura mantém a largura de projeto e o aluno desliza; a página nunca rola de lado (`.paper` tem `overflow-x: clip`).
4. Inicialização: `initVisualizations()` roda após o render da semana (todas as seções estão abertas; não há mais acordeão). Erros de um renderer são capturados no console sem derrubar a página.
5. CSS dos renderers (`.vis-*`) fica na camada `@layer renderers`, restrito a `.stage`, com a fonte de sistema e a cor de texto que eles assumem. `.vis-tooltip` continua global (o tooltip é anexado ao `body`).
6. **Fase posterior:** normalizar tipografia dos renderers para `rem`/`clamp()` e paleta por token, semana a semana, com auditoria a cada lote.

## Paletas em uso

- Marketing (semanas 3 a 10): azul `#0EA5E9 / #0284C7 / #0891B2 / #0C4A6E / #7DD3FC / #38BDF8 / #0369A1`, texto `#374151`, cinza `#94A3B8`, verde `#16A34A`, alerta `#DC2626`.
- Operações: paletas variadas por renderer.
- No redesign, os renderers são tratados como **figuras** com paleta própria dentro do palco; a harmonização por token fica para a fase de normalização.

## Regra de não regressão

Nenhuma mudança de shell, CSS global ou `app.js` pode alterar o comportamento de clique dos renderers. Se o CSS global precisar afetar o interior de um renderer, isso entra na camada `@layer renderers` com seletor restrito ao palco. Verificação do glow-up (07/set/2026): as 20 semanas abrem em desktop e mobile com todos os 100 palcos inicializados e zero erro de console (`studyhub-qa.mjs full`).
