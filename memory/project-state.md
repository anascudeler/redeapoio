# Estado do Projeto

_Última atualização: 2026-09-03_

## O que está implementado de fato

- Backend Node + Express + TypeScript em `src/api`, estruturado em
  `Route → Controller → Service → Prisma` (ver `decisions/ADR-001.md`).
- Model `User` no Prisma (`src/api/prisma/schema.prisma`).
- Autenticação: `POST /auth/register`, `POST /auth/login`, `GET /users/me`.
- Hash de senha com `bcryptjs` (`decisions/ADR-002.md`).
- Validação de entrada com Zod.
- Middleware de erro central e middleware de autenticação JWT.

## O que ainda não existe

- `SupportRelationship`, `EmergencyAlert`, `Device` — nenhum dos três está no schema ainda.
- Nenhuma rota além de `auth` e `users/me`.
- Projeto mobile (`src/mobile`) — pasta criada, vazia.
- Testes automatizados — ainda não há nenhum teste no projeto.

## Em andamento

Ver `tasks/current.md` — TASK-002 (SupportRelationship), bloqueada até a validação manual da
Fase 1 pelo desenvolvedor.

## Ambiente de desenvolvimento

O desenvolvedor decidiu trabalhar localmente via VS Code, usando o Copilot Pro com o agente Claude
Sonnet 5 para codificação. Este pacote de contexto (`AI.md`, `spec/`, `decisions/`, `tasks/`,
`memory/`) foi criado para que esse agente (e qualquer outro que venha a trabalhar no projeto) tenha
o contexto necessário sem depender de uma conversa anterior.
