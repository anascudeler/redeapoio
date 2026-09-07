# Domínio — EmergencyAlert

## Status

Ainda não implementado. Planejado para a Fase 4 (após a rede de apoio estar funcionando).

## Conceito

Representa um alerta de emergência criado por um usuário. A criação do alerta e o envio das
notificações são **responsabilidades diferentes**: o alerta deve existir no banco independentemente
de a notificação ter sido enviada com sucesso.

## Entidade

```text
EmergencyAlert
-------------------------
id            Int       PK
userId        Int       FK → User
latitude      Float?    (Fase 6 — localização)
longitude     Float?    (Fase 6 — localização)
status        Enum      ACTIVE | CANCELLED
createdAt     DateTime
updatedAt     DateTime
```

Valores futuros de `status` considerados (não implementar sem decisão explícita): `RESOLVED`,
`EXPIRED`.

## Fluxo conceitual

```text
POST /alerts
     ↓
Autenticar usuário (req.userId)
     ↓
Criar EmergencyAlert
     ↓
Buscar SupportRelationship com status ACCEPTED onde requesterId = usuário
     ↓
Obter supporterId de cada relação
     ↓
Buscar Device de cada supporter
     ↓
Enviar push notification
     ↓
Registrar resultado do envio (não bloqueia a criação do alerta, que já ocorreu antes)
```

## Regras de negócio

Ver `spec/business-rules/alert-rules.md`.
