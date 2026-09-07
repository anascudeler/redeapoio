# Rede de Apoio — Alerta de Emergência

Aplicativo mobile de rede de apoio pessoal. Um usuário cadastra pessoas de confiança na sua rede de
apoio; em uma emergência, ele aciona um alerta e todas essas pessoas são notificadas.

> Hipótese que o MVP precisa validar: uma pessoa realmente usaria um app simples para manter uma
> rede de contatos que podem ser avisados rapidamente quando ela precisar de ajuda?

## Status atual

**Fase 1 concluída** (cadastro, login, JWT). **Fase 2 (rede de apoio) é a próxima**, mas está
bloqueada até a Fase 1 ser validada localmente — veja `tasks/current.md` e `memory/pending.md`.

```text
[x] Fase 1 — Backend básico (User, auth)
[ ] Fase 2 — Rede de apoio (SupportRelationship)
[ ] Fase 3 — Aplicativo mobile
[ ] Fase 4 — Alerta via botão no app
[ ] Fase 5 — Push notification real
[ ] Fase 6 — Localização no alerta
[ ] Fase 7 — Acionamento por botão físico (Volume Up)
```

Detalhe de cada fase em `spec/architecture/overview.md`.

## Stack

```text
Backend:   Node.js + Express + TypeScript + Prisma + MySQL + JWT + bcryptjs + Zod
Mobile:    React Native + React Native Paper + React Navigation + TypeScript (não iniciado)
```

## Como este projeto está organizado

Este projeto usa uma estrutura de **engenharia de contexto** pensada para ser trabalhada por agentes
de IA (Claude, Copilot Agent, etc.) além de humanos. Cada pasta responde a uma pergunta diferente:

| Pasta | Responde a |
|---|---|
| [`AI.md`](./AI.md) | Como um agente de IA deve trabalhar neste projeto |
| [`spec/`](./spec) | O que o sistema deve ser (produto, requisitos, domínios, regras de negócio, casos de uso, arquitetura) |
| [`decisions/`](./decisions) | Por que as decisões técnicas foram tomadas (ADRs) |
| [`tasks/`](./tasks) | O que está sendo feito agora, o que falta, o que já foi concluído |
| [`memory/`](./memory) | O que aconteceu durante o desenvolvimento (estado, problemas, pendências, sessões) |
| [`src/`](./src) | O código: `src/api` (backend) e `src/mobile` (app, ainda não iniciado) |
| [`tests/`](./tests) | O que foi comprovado que funciona |

**Se você (humano ou agente) for continuar o desenvolvimento, comece por `AI.md`.** Ele descreve o
processo a seguir antes de tocar em qualquer código.

## Rodando o backend localmente

```bash
cd src/api
npm install
cp .env.example .env   # edite DATABASE_URL com seu MySQL local
npm run prisma:migrate -- --name init
npm run dev
```

Servidor sobe em `http://localhost:3333` (ou na porta definida em `PORT` no `.env`).

### Testando os endpoints da Fase 1

```bash
curl -X POST http://localhost:3333/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria","email":"maria@email.com","password":"123456"}'

curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@email.com","password":"123456"}'

curl http://localhost:3333/users/me \
  -H "Authorization: Bearer <token retornado no login>"
```

## Princípios do projeto

- MVP primeiro: nada fora do escopo descrito em `spec/product/overview.md` deve ser implementado
  sem decisão explícita.
- Backend é a autoridade: toda regra de segurança e autorização é validada no backend, nunca só na
  interface.
- Uma fase por vez: não adiantar tecnologia ou funcionalidade de uma fase futura antes da atual
  estar validada (`decisions/ADR-003.md`).
- Nenhuma decisão importante deve existir só em uma conversa: se for uma decisão técnica, vira ADR;
  se for uma regra, vai para `spec/business-rules/`; se for progresso ou descoberta, vai para
  `memory/`.
