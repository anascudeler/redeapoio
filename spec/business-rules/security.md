# Regras de Negócio — Segurança e Autenticação

## Senhas

- BR-SEC-01: A senha em texto puro nunca é armazenada nem logada. Apenas `passwordHash`.
- BR-SEC-02: O hash é gerado com `bcryptjs` (custo 10). Ver `decisions/ADR-002.md` para o porquê
  desta escolha em vez de `bcrypt` nativo ou `argon2`.

## JWT

- BR-SEC-03: O usuário autenticado de uma requisição é sempre obtido a partir do JWT
  (`authMiddleware` → `req.userId`), nunca de um `userId` enviado no corpo ou query da requisição.
- BR-SEC-04: Um token inválido ou expirado deve resultar em `401`, sem detalhar o motivo exato ao
  cliente (não distinguir "expirado" de "assinatura inválida" na resposta).
- BR-SEC-05: Credenciais de login inválidas (e-mail inexistente ou senha errada) retornam sempre a
  mesma mensagem genérica — não revelar se o e-mail existe no sistema.

## Alertas e privacidade

- BR-SEC-06: Um alerta só pode ser acessado por quem o criou ou por seus apoiadores diretos —
  nunca exposto publicamente.
- BR-SEC-07: Nenhum ID sensível (usuário, relação, alerta) deve ser confiado quando vem do cliente
  sem verificação de que o usuário autenticado tem relação com aquele recurso. Ver
  `spec/business-rules/authorization.md`.
