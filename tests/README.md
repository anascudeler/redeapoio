# Testes

## Status atual

Ainda não há testes automatizados no projeto. A Fase 1 foi validada apenas manualmente (curl,
descrito em `tasks/completed.md`).

## Estratégia planejada

- Backend: testes de service com Jest, e testes de rota (Controller + Service + banco de teste) com
  Supertest, focados nas regras de negócio e autorização descritas em `spec/business-rules/` — não
  apenas "o endpoint responde 200".
- Todo novo `*.service.ts` deve ganhar um `*.service.test.ts` cobrindo pelo menos os critérios de
  aceite da tarefa que o originou (ver `tasks/`).
- Testes existentes servem como especificação executável — antes de alterar um comportamento já
  testado, leia o teste correspondente (ver `AI.md`, seção 5).

## Convenção de nomes (a partir do primeiro teste)

```text
src/api/src/services/auth.service.ts
src/api/src/services/__tests__/auth.service.test.ts
```

A ferramenta de execução (Jest) e a configuração serão adicionadas junto com o primeiro teste real,
não antes — para não introduzir dependência sem uso imediato.
