# UC-04 — Acionar Alerta de Emergência

## Status

Não implementado. Planejado para a Fase 4 (Fase 5 adiciona o envio de push de fato).

## Ator

Usuário A (autenticado).

## Fluxo

1. Usuário A toca no botão de emergência na tela inicial.
2. Sistema exibe confirmação ("Você deseja enviar um alerta de emergência?").
3. Usuário A confirma.
4. App envia `POST /alerts`.
5. Backend identifica o usuário autenticado (`req.userId`).
6. Backend cria um `EmergencyAlert` com status `ACTIVE` — isso acontece **antes** de qualquer
   tentativa de notificação, e não é revertido se a notificação falhar (BR-AL-01).
7. Backend busca todas as `SupportRelationship` com `requesterId = A` e `status = ACCEPTED`.
8. Backend busca os `Device` de cada `supporterId` encontrado.
9. Backend envia push notification para cada dispositivo.
10. Backend registra o resultado do envio.

## Critério de aceite (do MVP como um todo — ver `spec/product/overview.md`)

Teste com dois dispositivos:

1. Maria e João fazem login em dispositivos diferentes.
2. Maria solicita João como apoiador; João aceita.
3. Maria aciona o alerta de emergência.
4. João recebe a notificação "Maria acionou um alerta de emergência."

## Fora do escopo desta fase

- Localização (Fase 6, ver `spec/domains/emergency-alert.md`).
- Acionamento por botão físico Volume Up (Fase 7, ver `spec/architecture/overview.md`).

## Referências

- `spec/domains/emergency-alert.md`
- `spec/domains/device.md`
- `spec/business-rules/alert-rules.md`
