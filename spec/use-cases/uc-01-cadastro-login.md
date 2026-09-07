# UC-01 — Cadastro e Login

## Status

Implementado (Fase 1).

## Ator

Usuário não autenticado.

## Fluxo — Cadastro

1. Usuário informa nome, e-mail e senha.
2. Sistema valida os dados (Zod: nome não vazio, e-mail válido, senha ≥ 6 caracteres).
3. Sistema verifica se o e-mail já está em uso.
   - Se sim: erro 409, cadastro não é criado.
4. Sistema gera hash da senha e cria o usuário.
5. Sistema gera um JWT e retorna usuário + token.

## Fluxo — Login

1. Usuário informa e-mail e senha.
2. Sistema busca usuário pelo e-mail.
   - Se não encontrado: erro 401 genérico.
3. Sistema compara a senha informada com o hash armazenado.
   - Se não confere: erro 401 genérico (mesma mensagem do caso anterior).
4. Sistema gera um JWT e retorna usuário + token.

## Pré-condições

- Cadastro: nenhuma.
- Login: usuário já cadastrado.

## Resultado esperado

- Cliente recebe um token JWT válido, que deve ser enviado como
  `Authorization: Bearer <token>` em requisições subsequentes.

## Rotas envolvidas

```http
POST /auth/register
POST /auth/login
GET  /users/me
```

## Referências

- `spec/domains/user.md`
- `spec/business-rules/security.md`
- `decisions/ADR-002.md` (escolha do bcryptjs)
