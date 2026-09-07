# Requisitos Funcionais

## Autenticação

- RF-01: O sistema deve permitir cadastro com nome, e-mail e senha.
- RF-02: O e-mail deve ser único no sistema.
- RF-03: A senha nunca é armazenada em texto puro — apenas o hash.
- RF-04: O sistema deve permitir login com e-mail e senha, retornando um JWT.
- RF-05: O sistema deve permitir logout (invalidação client-side do token no MVP; sem blacklist
  server-side por enquanto).
- RF-06: Toda rota que exige usuário autenticado deve validar o JWT e extrair o usuário a partir
  dele — nunca de um campo enviado pelo cliente.

## Rede de apoio

- RF-07: Um usuário pode buscar outro usuário por e-mail.
- RF-08: Um usuário pode solicitar que outro usuário faça parte da sua rede de apoio
  (`SupportRelationship` com status `PENDING`).
- RF-09: O usuário que recebeu a solicitação pode aceitar (`ACCEPTED`) ou recusar (`REJECTED`).
- RF-10: Um usuário pode visualizar a lista de pessoas que ele está apoiando (`Apoiando`) e o status
  de cada relação.
- RF-11: Um usuário pode visualizar a lista de pessoas que o apoiam (`Apoiado por`).
- RF-12: Um usuário pode remover uma relação de apoio existente.
- RF-13: Um usuário só pode aceitar/recusar solicitações onde ele é o `supporterId`.
- RF-14: Um usuário só pode remover relações das quais participa (como `requesterId` ou
  `supporterId`, conforme regra definida em `spec/business-rules`).

## Alerta de emergência

- RF-15: Um usuário autenticado pode acionar um alerta de emergência através de um botão na tela
  inicial.
- RF-16: Ao acionar, deve existir uma confirmação antes do envio, para reduzir acionamentos
  acidentais.
- RF-17: O sistema deve criar o alerta no banco independentemente do sucesso do envio das
  notificações — são responsabilidades separadas.
- RF-18: O sistema deve notificar todas as pessoas cuja relação de apoio com o usuário está
  `ACCEPTED`.
- RF-19: (Fase futura) O alerta pode conter latitude/longitude.
- RF-20: (Fase futura) O alerta pode ser acionado segurando o botão físico Volume Up por ~5s,
  acionando exatamente o mesmo serviço usado pelo botão dentro do app.

## Dispositivos / notificações

- RF-21: O sistema deve associar um `pushToken` ao usuário autenticado.
- RF-22: Um usuário pode ter mais de um dispositivo registrado.

---

# Requisitos Não Funcionais

- RNF-01: Backend em TypeScript, com tipagem estrita.
- RNF-02: Separação em camadas Route → Controller → Service → Prisma; controllers sem regra de
  negócio.
- RNF-03: Autorização e regras de segurança validadas sempre no backend, nunca só no frontend.
- RNF-04: Arquitetura simples — evitar abstrações genéricas não solicitadas (ex.: CRUD genérico).
- RNF-05: Evolução incremental por fases (ver `spec/architecture/overview.md`); cada fase deve ser
  validável isoladamente antes de avançar.
- RNF-06: Alertas podem conter dados sensíveis (localização) — acesso restrito a quem de direito,
  nunca exposto publicamente.
