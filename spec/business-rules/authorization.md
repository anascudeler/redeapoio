# Regras de Negócio — Autorização

Princípio geral: **a regra de autorização vive no backend**, nunca apenas na interface. O app mobile
não deve assumir que uma ação é permitida só porque a tela deixa o usuário tocar no botão.

## Rede de apoio

- BR-AUTH-01: Somente o usuário que é `supporterId` de uma `SupportRelationship` pode aceitá-la ou
  recusá-la.

  ```text
  relationship.supporterId === authenticatedUser.id
  ```

- BR-AUTH-02: Somente o `requesterId` pode remover uma relação de apoio que ele solicitou (a
  extensão dessa regra para o `supporterId` remover a relação também — ex.: "não quero mais apoiar
  essa pessoa" — ainda não foi decidida; tratar como pendente, ver `memory/pending.md`, e não
  implementar sem confirmação).

## Alertas

- BR-AUTH-03: Um alerta só pode ser criado em nome do usuário autenticado (`req.userId`), nunca de
  outro usuário.
- BR-AUTH-04: Um alerta só pode ser cancelado pelo próprio usuário que o criou.

## Dispositivos

- BR-AUTH-05: Um dispositivo só pode ser removido pelo usuário ao qual está associado.
