# Domínio — Device

## Status

Ainda não implementado. Planejado para a Fase 5 (push notifications).

## Conceito

Armazena as informações necessárias para enviar notificações push a um usuário. Um usuário pode
possuir mais de um dispositivo (ex.: trocou de aparelho, ou usa o app em mais de um).

## Entidade

```text
Device
-------------------------
id            Int      PK
userId        Int      FK → User
pushToken     String
platform      Enum     ANDROID | IOS
createdAt     DateTime
updatedAt     DateTime
```

## Relacionamento

```text
User 1 ──── N Device
```

## Regras

- Um `pushToken` é associado ao usuário autenticado no momento do registro do dispositivo
  (`POST /devices`) — nunca a um `userId` informado pelo cliente.
- A solução específica de push (ex.: Expo Notifications, FCM) será decidida em um ADR quando a
  Fase 5 começar — ainda não decidido.
