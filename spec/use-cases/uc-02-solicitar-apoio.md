# UC-02 — Solicitar Apoio

## Status

Não implementado. Planejado para a Fase 2.

## Ator

Usuário A (autenticado).

## Fluxo

1. Usuário A busca Usuário B pelo e-mail (`GET /users/search?email=...`).
2. Sistema retorna nome e e-mail de B (dados mínimos, sem expor mais do que isso).
3. Usuário A solicita apoio (`POST /support/request` com o id ou e-mail de B).
4. Sistema cria uma `SupportRelationship` com `requesterId = A`, `supporterId = B`,
   `status = PENDING`.
5. Usuário B, ao consultar `GET /support`, vê a solicitação pendente em "Apoiado por".

## Pré-condições

- A e B autenticados/existentes no sistema.
- Não deve já existir uma relação `PENDING` de A para B (ver BR-SR-02).

## Resultado esperado

- Uma `SupportRelationship` com status `PENDING` é criada.
- Nenhuma notificação é enviada automaticamente neste caso de uso no MVP (a notificação de "nova
  solicitação de apoio" via push é considerada opcional/futura — não confundir com a notificação de
  alerta de emergência, que é o caso de uso central do produto).

## Referências

- `spec/domains/support-relationship.md`
- `spec/business-rules/support-relationship-rules.md`
