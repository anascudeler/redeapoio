# Arquitetura — Visão Geral

## Stack

```text
Backend:  Node.js + Express + TypeScript
ORM:      Prisma
Banco:    MySQL
Auth:     JWT
Hash:     bcryptjs
Validação: Zod
Mobile:   React Native + React Native Paper + React Navigation + TypeScript (não iniciado)
```

Ver `decisions/ADR-001.md` para o porquê da escolha desta stack de backend.

## Camadas do backend

```text
Client
   ↓
Express
   ↓
Middleware de autenticação (authMiddleware)
   ↓
Controller
   ↓
Service
   ↓
Prisma
   ↓
MySQL
```

Controllers não contêm regra de negócio — apenas validam entrada (via Zod), chamam o service
correspondente e formatam a resposta. Toda regra de negócio vive nos services.

## Estrutura de pastas

```text
src/
├── api/                    ← backend (Node + Express + TS)
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   ├── lib/
│   │   └── types/
│   └── prisma/
│       └── schema.prisma
└── mobile/                 ← app React Native (ainda não iniciado)
```

## Autenticação

```text
Login
  ↓
API valida email/senha
  ↓
Gera JWT
  ↓
Mobile armazena token (de forma segura — não em AsyncStorage puro; ver ADR quando o mobile
  começar a ser implementado)
  ↓
Requests posteriores enviam: Authorization: Bearer <token>
```

## Estratégia de evolução por fases

O projeto é construído incrementalmente. Cada fase só começa depois que a anterior está validada.

```text
Fase 1 — Backend básico: projeto Node+Express+TS+Prisma+MySQL, model User, register/login/JWT
Fase 2 — Rede de apoio: SupportRelationship (solicitar, aceitar, recusar, listar, remover)
Fase 3 — Aplicativo: telas de Login, Cadastro, Home, Apoiando, Apoiado por, integradas à API
Fase 4 — Alerta: EmergencyAlert via botão de emergência dentro do app
Fase 5 — Push notification: Device + pushToken + envio real das notificações
Fase 6 — Localização: latitude/longitude no alerta
Fase 7 — Volume Up: acionamento por botão físico, disparando o mesmo EmergencyTrigger do botão
          dentro do app
```

Não pular fases nem adiantar tecnologia de uma fase futura (ex.: push notifications, localização)
sem que a fase anterior esteja funcionando e validada.

## Roteiro de rotas da API (visão consolidada)

```http
POST   /auth/register
POST   /auth/login
GET    /users/me
GET    /users/search?email=...

GET    /support
POST   /support/request
PATCH  /support/:id/accept
PATCH  /support/:id/reject
DELETE /support/:id

POST   /alerts
GET    /alerts
GET    /alerts/:id
PATCH  /alerts/:id/cancel

POST   /devices
DELETE /devices/:id
```

Nem todas essas rotas existem ainda — o que está implementado de fato está registrado em
`memory/project-state.md`.
