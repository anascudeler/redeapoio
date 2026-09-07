# UC-03 — Aceitar ou Recusar Solicitação de Apoio

## Status

Não implementado. Planejado para a Fase 2.

## Ator

Usuário B (autenticado, `supporterId` da relação).

## Fluxo — Aceitar

1. Usuário B visualiza uma solicitação pendente em "Apoiado por".
2. Usuário B aceita (`PATCH /support/:id/accept`).
3. Sistema verifica que `relationship.supporterId === authenticatedUser.id` (BR-AUTH-01).
4. Sistema verifica que o status atual é `PENDING` (BR-SR-04).
5. Sistema altera o status para `ACCEPTED`.
6. A partir desse momento, B passa a receber os alertas de A.

## Fluxo — Recusar

Mesmo fluxo, alterando o status para `REJECTED` em vez de `ACCEPTED`.

## Erros esperados

- 403 se o usuário autenticado não for o `supporterId` da relação.
- 409 (ou equivalente) se a relação não estiver mais em `PENDING`.

## Referências

- `spec/business-rules/authorization.md`
- `spec/business-rules/support-relationship-rules.md`
