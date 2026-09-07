# TASK-002 — Modelar e implementar SupportRelationship (Fase 2)

## Status

Not Started — bloqueada até a validação manual da Fase 1 (ver `memory/pending.md`).

## Objetivo

Implementar o relacionamento de rede de apoio entre usuários: solicitar, aceitar, recusar, listar e
remover.

## Referências obrigatórias antes de implementar

- `spec/domains/support-relationship.md`
- `spec/business-rules/support-relationship-rules.md`
- `spec/business-rules/authorization.md`
- `spec/use-cases/uc-02-solicitar-apoio.md`
- `spec/use-cases/uc-03-aceitar-recusar.md`
- `decisions/ADR-001.md` (padrão de camadas a seguir)

## Escopo desta tarefa

1. Model `SupportRelationship` no `schema.prisma`, com `requesterId` e `supporterId` referenciando
   `User` através de relações nomeadas (evitar ambiguidade de FK dupla).
2. Migration correspondente.
3. `support.validator.ts` (Zod) para o corpo de `POST /support/request`.
4. `support.service.ts`: `requestSupport`, `acceptSupport`, `rejectSupport`, `listSupport`,
   `removeSupport` — regra de negócio e autorização (BR-AUTH-01, BR-AUTH-02, BR-SR-02, BR-SR-04)
   ficam aqui, não no controller.
5. `support.controller.ts` + `support.routes.ts`, todas as rotas protegidas por `authMiddleware`.
6. `GET /users/search?email=...` (necessário para o fluxo de solicitar apoio).

## Critérios de aceite

- Não é possível criar uma segunda `PENDING` entre o mesmo par requester/supporter.
- Só o `supporterId` consegue aceitar/recusar a própria solicitação (tentar como outro usuário
  retorna 403).
- Só é possível aceitar/recusar uma relação que esteja em `PENDING`.
- `GET /support` retorna corretamente as duas direções (Apoiando / Apoiado por) com o status de
  cada relação.
- Teste manual replicando o fluxo Maria → João do critério de sucesso do MVP (ver
  `spec/use-cases/uc-04-acionar-alerta.md`, passos 1–2, já que o alerta em si ainda não existe).

## Fora do escopo

- Notificação de "nova solicitação" via push (não faz parte desta tarefa).
- Qualquer coisa relacionada a `EmergencyAlert` ou `Device`.
