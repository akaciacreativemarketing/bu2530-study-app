# 06 · Direção de design · PENDENTE

Regime: produto próprio de estudo, compartilhado com alunos. **Não é peça da Akacia** (não herda mono #0A0A0A, Space Grotesk nem raio zero por obrigação) e não é site de cliente. Tem identidade própria. O que vale de qualquer jeito: o craft universal do playbook anti-slop.

## Metáfora central

**O curso como um Atlas de ideias conectadas.** Sustentada pelos próprios dados: `connections` liga semanas entre si e entre matérias, e as teorias são diagramas (frameworks). O produto mostra o curso como território navegável: mapa na home, rota na página da semana, marcadores no lugar de badges, grid topográfico como motivo de fundo.

## Direções candidatas

### A · Atlas (recomendada)
- **Clima:** editorial, claro, preciso. Papel quente, tinta azul-marinho, um único acento vermelho (herança UoL).
- **Assinatura:** mapa vivo em canvas 2D na home (nós = semanas, arestas = conexões reais; hover acende, clique navega). Página da semana com mini-mapa/sumário fixo e "você está aqui".
- **Tipografia (candidata):** Bricolage Grotesque (títulos) · Source Serif 4 (leitura longa) · IBM Plex Mono (rótulos, numerais, atalhos). Propositalmente distinta da tríade Akacia.
- **Motivos:** hairlines, grid topográfico a ~5%, numerais editoriais fantasma (W07), réguas de acento.
- **Modo escuro:** "mapa à noite" (tinta como fundo, papel como texto).
- **Empresta do C:** o callout de macete como nota fixada no mapa.

### B · Dossiê
- **Clima:** dramático, escuro, investigativo. Pastas, abas, carimbos, numerais gigantes.
- **Assinatura:** a semana abre como capa de dossiê; seções como abas de um arquivo; casos e "munição de redação" como evidência carimbada.
- **Tipografia (candidata):** Archivo (display condensado) · Source Serif 4 · IBM Plex Mono.
- **Risco:** proximidade com o universo visual da Akacia (escuro + mono + vermelho); pode parecer produto da agência.

### C · Caderno
- **Clima:** quente, acolhedor, "anotações de aula". Papel pautado, marca-texto, traço manual.
- **Assinatura:** palavras-chave com marca-texto; glifos SVG com traço de caneta; post-its de macete; visualizações como "figuras" com legenda.
- **Tipografia (candidata):** Public Sans · Newsreader · IBM Plex Mono.
- **Risco:** pode ficar infantil se o traço manual pesar; exige contenção.

## Comum às três (defaults premium, sem perguntar)

- Cantos afiados (0 a 4px); botões e inputs retos.
- Nenhum gradiente decorativo; fundo de seção sempre com motivo sutil da mesma família.
- Ícones e glifos próprios em SVG (não biblioteca) para os conceitos-chave; os renderers seguem como estão.
- Negrito nas palavras-chave do corpo (escaneabilidade).
- Status temático (marcador, carimbo, aba), nunca pill.
- Tamanhos mínimos: 13px em rótulos, 16px no corpo de leitura. Os renderers seguem a regra de escala de 03.
- Motion: poucos momentos fortes; só `transform`/`opacity`; `prefers-reduced-motion` desliga tudo. Sem 3D, sem shader, sem imagem gerada (D9).
- Acessibilidade: contraste AA, foco visível, navegação por teclado, `lang` correto por idioma.

## Processo de decisão

1. Prancha visual (mock estático de home + página da semana) de A e, se o dono quiser, de B e C.
2. Escolha do dono; possível combo (ex.: A + post-it de C).
3. Esta spec vira "vigente" com paleta, tokens e fontes finais; 01 recebe a arquitetura de CSS.
