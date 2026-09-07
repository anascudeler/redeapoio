# Problemas Encontrados

## 2026-09-03 — Ambiente de geração sem acesso à rede

O código da Fase 1 (`src/api`) foi gerado em um ambiente sandbox sem acesso à rede. Não foi possível
rodar `npm install`, `prisma generate`/`migrate` nem `tsc` para verificar a compilação de fato. O
código foi revisado manualmente, mas **precisa ser validado localmente** pelo desenvolvedor antes de
a próxima fase começar. Ver `tasks/current.md` (TASK-002, status bloqueado) e `memory/pending.md`.

## 2026-09-03 — Diretório residual por expansão de chaves no shell

Ao criar a estrutura de pastas inicial com `mkdir -p api/src/{controllers,services,...}`, o shell do
ambiente de geração não expandiu as chaves corretamente, criando um diretório literal com nome
`{controllers,services,...}` dentro de `src/`. Foi identificado e removido antes do empacotamento
final. Não afeta o projeto atual, mas fica registrado como um lembrete: sempre validar a listagem de
arquivos (`find`) depois de comandos de criação em lote, antes de empacotar/entregar.
