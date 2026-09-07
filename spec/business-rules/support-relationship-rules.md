# Regras de Negócio — Rede de Apoio

## Criação da solicitação

- BR-SR-01: Uma solicitação de apoio é sempre criada com status `PENDING` — nunca diretamente
  `ACCEPTED`.
- BR-SR-02: Não é permitido criar uma segunda solicitação `PENDING` entre o mesmo par de usuários
  no mesmo sentido (`requesterId` + `supporterId` já existente e pendente).
- BR-SR-03: (a decidir) o que acontece se A solicita apoio de B e B já havia solicitado apoio de A
  antes — são relações independentes (A apoia B ≠ B apoia A) e ambas podem coexistir. Isso é
  intencional: "Apoiando" e "Apoiado por" são direções diferentes do mesmo conceito, não a mesma
  relação.

## Transição de estado

```text
PENDING → ACCEPTED   (ação do supporter)
PENDING → REJECTED   (ação do supporter)
```

- BR-SR-04: Só é possível transicionar a partir de `PENDING`. Uma relação já `ACCEPTED` ou
  `REJECTED` não pode ser reaceita/recusada novamente pelas mesmas rotas (evitar reprocessamento).
- BR-SR-05: `BLOCKED` é um status considerado para o futuro (ver `spec/domains/support-relationship.md`)
  e não deve ser implementado no MVP.

## Efeito no alerta

- BR-SR-06: Somente relações com status `ACCEPTED` recebem notificação quando o `requesterId`
  aciona um alerta de emergência.
