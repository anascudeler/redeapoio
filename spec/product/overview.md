# Produto — Rede de Apoio / Alerta de Emergência

## Objetivo

Aplicativo mobile de rede de apoio pessoal. Um usuário cadastra outras pessoas como parte da sua
rede de apoio. Em uma situação de emergência, ele aciona um alerta e todas as pessoas da sua rede
de apoio são notificadas.

## Hipótese que o MVP precisa validar

> Uma pessoa realmente usaria um aplicativo simples para manter uma rede de pessoas que podem ser
> avisadas rapidamente quando ela precisar de ajuda?

Tudo que for construído no MVP deve servir para responder essa pergunta o mais rápido possível, com
o menor sistema possível que ainda seja verdadeiro.

## Fluxo principal (o que precisa provar que funciona)

```text
Usuário A cria uma conta
        ↓
Usuário A encontra Usuário B
        ↓
Usuário A solicita que B faça parte da sua rede de apoio
        ↓
Usuário B aceita
        ↓
B passa a fazer parte da rede de apoio de A
        ↓
A aciona um alerta de emergência
        ↓
B recebe uma notificação
```

## Escopo do MVP

Incluído:

- Cadastro, login e sessão via JWT.
- Rede de apoio como relacionamento entre usuários (não como duas listas independentes), com estados
  `PENDING`, `ACCEPTED`, `REJECTED`.
- Acionamento de alerta via botão dentro do app (o acionamento por botão físico Volume Up é uma fase
  futura, ver `spec/architecture/overview.md`).
- Notificação push para os apoiadores quando um alerta é criado.
- Localização (latitude/longitude) no alerta — como funcionalidade independente, que não pode
  bloquear a validação do fluxo principal (alerta → notificação primeiro, alerta → notificação +
  localização depois).

## Explicitamente fora do MVP

Não implementar sem decisão explícita do desenvolvedor (isso não é uma lista de sugestões futuras,
é uma lista do que **não** deve aparecer espontaneamente em nenhuma tarefa):

- chat, grupos, chamadas de voz/vídeo;
- histórico complexo, mapa em tempo real, rastreamento contínuo;
- compartilhamento social, feed, gamificação;
- pagamentos, assinatura;
- contatos públicos;
- inteligência artificial dentro do produto;
- geofencing;
- integração com polícia ou serviços de emergência;
- múltiplos níveis de emergência.

## Papéis do usuário dentro da rede

- **Apoiando**: pessoas que o usuário escolheu para receber os alertas dele.
- **Apoiado por**: pessoas que escolheram o usuário para fazer parte da rede de apoio delas.

Ver `spec/domains/support-relationship.md` para o modelo completo.
