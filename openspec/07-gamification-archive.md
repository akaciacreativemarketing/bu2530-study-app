# 07 · Arquivo da gamificação (removida no glow-up)

Registro fiel do sistema de XP, níveis e conquistas que existia até set/2026, para reimplementação futura (provável Fase 4, com contas). Fonte: `app.js` no commit anterior à remoção. Para recuperar o código: `git show <hash-anterior>:app.js` (preencher o hash no commit de remoção).

## Regras de pontuação

| Evento | XP | Onde |
|---|---|---|
| Marcar uma seção da semana como concluída (botão "OK" no cabeçalho da seção) | +10 | `toggleOk()` → `addXP(10)` + toast "+10 XP" |
| Desmarcar a seção | −10 | `toggleOk()` → `addXP(-10)` |
| Concluir todas as seções disponíveis de uma semana | +50 | `checkWeekCompletion()` → status `done`, confete, toast "+50 XP" |

XP nunca fica negativo (`setXP` aplica `Math.max(0, v)`). XP é global (soma entre matérias).

## Níveis (8 patamares, carreira de marketing)

| XP mínimo | PT | EN |
|---|---|---|
| 0 | Estagiário(a) de Marketing | Marketing Intern |
| 80 | Analista Jr. | Junior Analyst |
| 200 | Coordenador(a) | Coordinator |
| 400 | Gerente de Marketing | Marketing Manager |
| 700 | Especialista Sênior | Senior Specialist |
| 1100 | Diretor(a) de Marketing | Marketing Director |
| 1600 | VP de Marketing | VP of Marketing |
| 2200 | CMO | CMO |

UI: anel SVG na sidebar (`updateXPBar`) com percentual até o próximo nível, nome do nível em âmbar e contador "N XP · M XP p/ próx." (`getLevelInfo` calcula `pct`, `nextXP`, `idx`).

## Conquistas (6)

| id | Ícone | PT / EN | Condição |
|---|---|---|---|
| `first_step` | 🚀 | Primeiro Passo / First Step | ≥ 1 semana `done` |
| `strategist` | ♟️ | Estrategista / Strategist | ≥ 5 semanas `done` |
| `subject_master` | 🎓 | Matéria Completa / Subject Master | todas as semanas de uma matéria `done` |
| `flashcard` | 🃏 | Flashcard Pro | ≥ 50 avaliações de flashcard (`uol-fc-count`, via `trackFcScore`) |
| `bilingual` | 🌍 | Bilíngue / Bilingual | ≥ 5 trocas de idioma (`uol-lang-toggle`, via `trackLangToggle`) |
| `cmo` | 👑 | CMO | XP ≥ 2200 |

Exibidas na home em grade (`.achievement-grid`), desbloqueadas coloridas, bloqueadas em cinza.

## Progresso e status

- Status da semana: `weekStatus(subjectId, n)` lia `localStorage['uol-<subject>-week-<n>-status']` e, na ausência, o campo `status` do arquivo de dados (foi isso que vazou o progresso do autor para todo visitante).
- Estado das seções: `localStorage['uol-<subject>-sections-<n>']` (JSON `{secao: true}`), lido por `getSectionState`.
- Home: 4 stat cards (matérias, concluídas, em andamento, não iniciadas), anel "Progresso Geral" (semanas `done` / total) e grade de conquistas. Matéria: barra de progresso e stat cards próprios. Semana: chip de status e barra "N/M seções" no hero.
- Migração: `migrateLegacyStorage()` convertia chaves `bu2530-*` para `uol-*`.

## Peças de código removidas

`XP_LEVELS`, `getXP`, `setXP`, `addXP`, `getLevelInfo`, `updateXPBar`, `countDoneWeeks`, `ACHIEVEMENTS`, `trackFcScore`, `trackLangToggle`, `showToast` (uso de XP), `launchConfetti`, `statusLabel`, `statusBadgeClass`, `getSectionState`, `checkWeekCompletion`, `toggleOk`, `updateProgressRow`, `migrateLegacyStorage`, o `#xpBar` do `index.html` e as classes CSS `.xp-*`, `.achievement-*`, `.stat-card`, `.week-badge`, `.badge-*`, `.ok-btn`, `.section.is-ok`, `.confetti-*`, `.week-prog-*`, `.week-status-chip`.

## Notas para uma versão futura

1. Só faz sentido com **conta e sincronização**; por aparelho, confunde mais do que motiva.
2. Pontuar "marcar como lido" é fácil de burlar; pontuar **desempenho** (flashcards acertados, questões do modo Prova, sequência de dias) mede estudo de verdade.
3. Conquistas devem ser poucas e significativas; "Bilíngue por trocar idioma 5 vezes" é ruído.
4. **Nunca gravar progresso nos arquivos de conteúdo.** O campo `status` fica como legado ignorado pela UI.
5. A carreira de níveis (Estagiário → CMO) é boa como identidade e vale manter quando voltar.
