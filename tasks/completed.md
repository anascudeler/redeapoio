# Completed

## TASK-001 — Backend básico (Fase 1)

**Status:** Implementado. Aguardando validação manual do desenvolvedor (`npm install` + migrations +
teste dos endpoints não puderam ser executados no ambiente onde o código foi gerado — ver
`memory/problems.md`).

**Escopo entregue:**

- Projeto Node + Express + TypeScript inicializado em `src/api`.
- `schema.prisma` com model `User` (id, name, email único, passwordHash, timestamps).
- `POST /auth/register`: valida entrada com Zod, verifica e-mail duplicado (409), gera hash com
  `bcryptjs`, cria usuário, retorna JWT.
- `POST /auth/login`: valida credenciais, retorna JWT. Mensagem de erro genérica para credenciais
  inválidas (BR-SEC-05).
- `authMiddleware`: valida JWT do header `Authorization`, injeta `req.userId`.
- `GET /users/me`: rota protegida, retorna dados do usuário autenticado (sem `passwordHash`).
- `errorMiddleware` central, tratando erros do Zod e erros de negócio com `statusCode`.

**Referências:** `spec/use-cases/uc-01-cadastro-login.md`, `decisions/ADR-001.md`,
`decisions/ADR-002.md`.
