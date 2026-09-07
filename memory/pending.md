# Pendências

## Aguardando o desenvolvedor

- Validar localmente a Fase 1: `npm install`, configurar `DATABASE_URL` no `.env`, rodar
  `prisma migrate dev`, subir o servidor e testar `register` → `login` → `GET /users/me`. TASK-002
  não deve começar antes disso.

## Decisões em aberto (não implementar sem decidir)

- BR-AUTH-02 (`spec/business-rules/authorization.md`): o `supporterId` também deveria poder remover
  a relação (deixar de apoiar alguém), ou só o `requesterId` remove? Precisa de decisão antes da
  TASK-006.
- Solução de push notification (Expo Notifications, FCM, outra) — a decidir antes da Fase 5
  (TASK-016 no backlog).
- Estratégia de armazenamento seguro do JWT no mobile (SecureStore, Keychain/Keystore via alguma
  lib) — a decidir antes da Fase 3 (TASK-010).
