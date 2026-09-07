# Backlog

Tarefas ainda não iniciadas, em ordem de fase (ver `decisions/ADR-003.md`). Não iniciar uma tarefa
daqui sem antes movê-la para `tasks/current.md` e confirmar o escopo.

## Fase 2 — Rede de apoio

- TASK-002: Modelar `SupportRelationship` no Prisma (com nomes de relação explícitos para as duas
  FKs de `User`) e migrar.
- TASK-003: Implementar `POST /support/request` (criar solicitação `PENDING`).
- TASK-004: Implementar `PATCH /support/:id/accept` e `PATCH /support/:id/reject`.
- TASK-005: Implementar `GET /support` (listar "Apoiando" e "Apoiado por" com status).
- TASK-006: Implementar `DELETE /support/:id`.
- TASK-007: Implementar `GET /users/search?email=...`.

## Fase 3 — Aplicativo mobile

- TASK-008: Inicializar projeto React Native + React Native Paper + React Navigation em
  `src/mobile`.
- TASK-009: Telas de Login e Cadastro, integradas a `POST /auth/login` e `POST /auth/register`.
- TASK-010: Contexto de autenticação (`AuthContext`) + armazenamento seguro do token.
- TASK-011: Tela Home com contadores de "Apoiando" / "Apoiado por".
- TASK-012: Telas "Apoiando" e "Apoiado por", integradas às rotas de `/support`.

## Fase 4 — Alerta

- TASK-013: Modelar `EmergencyAlert` no Prisma e migrar.
- TASK-014: Implementar `POST /alerts` (criação do alerta + busca de apoiadores `ACCEPTED`, sem
  envio de push real ainda).
- TASK-015: Botão de emergência na Home + tela/diálogo de confirmação.

## Fase 5 — Push notification

- TASK-016: ADR de escolha da solução de push (a decidir).
- TASK-017: Modelar `Device` no Prisma e migrar.
- TASK-018: Implementar `POST /devices` e `DELETE /devices/:id`.
- TASK-019: Implementar envio real de notificação a partir de `POST /alerts`.

## Fase 6 — Localização

- TASK-020: Adicionar `latitude`/`longitude` (opcionais) ao `EmergencyAlert`.
- TASK-021: Capturar localização no mobile no momento do acionamento do alerta.

## Fase 7 — Volume Up

- TASK-022: Investigar limitações de interceptação de Volume Up por plataforma/versão.
- TASK-023: Implementar acionamento via Volume Up disparando o mesmo `EmergencyTrigger` do botão na
  tela.
