# Regras de Negócio — Alertas de Emergência

- BR-AL-01: A criação do `EmergencyAlert` no banco não depende do sucesso do envio das notificações.
  São etapas sequenciais, mas com falhas independentes: se o push falhar, o alerta já existe e pode
  ser consultado/reenviado depois.
- BR-AL-02: Apenas apoiadores com relação `ACCEPTED` recebem a notificação — apoiadores `PENDING` ou
  `REJECTED` não recebem nada.
- BR-AL-03: O acionamento por botão físico (Volume Up) e o acionamento por botão na tela devem
  disparar exatamente o mesmo serviço (`EmergencyTrigger`), sem lógica duplicada entre os dois
  mecanismos.
- BR-AL-04: Localização é opcional e independente: o fluxo "alerta → notificação" deve funcionar
  mesmo sem latitude/longitude disponíveis.
- BR-AL-05: A confirmação antes de enviar o alerta (dialog "Você deseja enviar um alerta de
  emergência?") é obrigatória no MVP, para reduzir acionamento acidental.
