# Domínio — User

## Status

Implementado (Fase 1). Fonte de verdade do schema: `src/api/prisma/schema.prisma`.

## Entidade

```text
User
-------------------------
id            Int      PK
name          String
email         String   unique
passwordHash  String
createdAt     DateTime
updatedAt     DateTime
```

## Regras

- `email` é único no sistema.
- `passwordHash` é gerado com `bcryptjs` (custo 10) — a senha em texto puro nunca é persistida nem
  logada.
- O identificador do usuário autenticado em uma requisição vem sempre do JWT (`req.userId`), nunca
  do corpo da requisição.

## Relacionamentos

```text
User 1 ──── N Device
User 1 ──── N EmergencyAlert
User 1 ──── N SupportRelationship (como requester)
User 1 ──── N SupportRelationship (como supporter)
```

Ver `spec/domains/support-relationship.md`, `spec/domains/emergency-alert.md` e
`spec/domains/device.md`.
