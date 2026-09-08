# OpenSpec · Study Hub (University of London)

Fonte de verdade técnica e de produto do `study-app`. Toda mudança relevante no app (shell, rotas, modelo de dados, renderers, design) atualiza a spec correspondente no mesmo commit. Regra herdada do Akacia Studio: **spec desatualizada é bug**.

Criado em 07/set/2026, no início do glow-up (redesign completo para compartilhar a plataforma com outros alunos, gratuita e sem login). Fases 0, 1 e 2 entregues no mesmo dia; 3 e 4 em aberto.

## Índice

| Spec | O que cobre | Status |
|---|---|---|
| [01-architecture.md](01-architecture.md) | Stack, arquivos, ordem de carga, rotas, estado local, layout, QA | Vigente (glow-up) |
| [02-content-model.md](02-content-model.md) | Contrato dos dados (`SUBJECTS`, `WEEKS_DATA`), invariantes que a UI respeita | Vigente |
| [03-renderers.md](03-renderers.md) | Contrato das visualizações, padrão de índice, auditoria, palco com escala | Vigente |
| [04-decisions.md](04-decisions.md) | Log de decisões (ADR): público, gamificação, stack, mobile, direção, modos, ligações | Vigente; pendências marcadas |
| [05-glowup-scope.md](05-glowup-scope.md) | Escopo do redesign: o que saiu, ficou e entrou; fases; critérios de pronto | Fases 0 a 2 feitas; 3 e 4 propostas |
| [06-design-direction.md](06-design-direction.md) | Direção B · Dossiê: paleta, tipografia, assinaturas; A e C como referência | Vigente |
| [07-gamification-archive.md](07-gamification-archive.md) | Arquivo do sistema de XP/níveis/conquistas removido, para reimplementação futura | Arquivo (referência) |
| [08-modes.md](08-modes.md) | Modos de aprendizado: Semanas, Hub de conhecimento e Trilhas (gaveta) | Vigente (1 e 2); Trilhas na gaveta |

## Como usar

- Antes de mexer em `app.js`, `hub.js`, `style.css`, `index.html` ou `visualizers.js`: ler 01, 02 e 03.
- Antes de decidir qualquer coisa de produto: ler 04 e 05.
- Ao concluir uma fase do glow-up: marcar em 05 e registrar aprendizados em 04.
- Documentos irmãos: `../../CLAUDE.md` (protocolo de abastecimento de conteúdo) e `../../PLANO.md` (visão e fases do projeto). Quando esta spec e o CLAUDE.md divergirem, esta spec manda para o app; o CLAUDE.md manda para o conteúdo.

## Legenda de status

- **Vigente**: descreve o que está no ar.
- **Proposta**: descreve o alvo; ainda não implementado.
- **Pendente**: precisa de decisão do dono antes de virar proposta.
