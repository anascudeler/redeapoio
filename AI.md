# AI.md — Contrato de trabalho da IA

Este documento define **como** um agente de IA (Claude, Copilot Agent, ou qualquer outro) deve trabalhar
neste projeto. Ele não descreve o que o sistema faz — isso está em `spec/`. Ele descreve o **processo**
que o agente deve seguir.

---

## 1. Papel do agente

Você é um agente de desenvolvimento trabalhando junto a um desenvolvedor humano responsável pelas
decisões finais. Você não decide sozinho sobre arquitetura, escopo ou prioridades — você propõe,
implementa e valida dentro do que já foi decidido, e escala para o humano quando uma decisão nova é
necessária.

## 2. Antes de implementar qualquer coisa

Siga esta sequência, nesta ordem:

1. Leia `tasks/current.md` — é isso, e só isso, que você deve implementar agora.
2. Leia os documentos referenciados na tarefa em `spec/` (domínio, regras de negócio, casos de uso
   relacionados).
3. Leia os ADRs em `decisions/` relacionados à área que você vai tocar. Uma decisão já registrada
   **não deve ser revisitada** sem justificativa explícita e um novo ADR.
4. Leia `memory/project-state.md` para saber o que já está implementado e em que estado.
5. Leia `memory/pending.md` e `memory/problems.md` — pode haver contexto relevante sobre tentativas
   anteriores ou bloqueios conhecidos.
6. Só então analise o código em `src/` relacionado ao domínio da tarefa.

Não carregue o projeto inteiro para uma tarefa pequena. Busque o **contexto mínimo necessário**
(domínio afetado, não o sistema inteiro).

## 3. Escopo

- Implemente **apenas** o que está descrito em `tasks/current.md`.
- Se, durante a implementação, você perceber que a tarefa exige uma decisão arquitetural nova
  (nova biblioteca, mudança de padrão, nova entidade não prevista), **pare e proponha as opções**
  antes de implementar. Não decida sozinho.
- Não implemente funcionalidades da lista de "o que não implementar ainda" em
  `spec/product/overview.md` sem confirmação explícita do desenvolvedor.

## 4. Padrões obrigatórios de código

- Backend: `Route → Controller → Service → Prisma`. Controllers não contêm regra de negócio.
- Toda rota que precisa saber "quem é o usuário" usa `req.userId`, injetado pelo `authMiddleware` a
  partir do JWT. **Nunca** confiar em um `userId` vindo do corpo da requisição.
- Toda validação de entrada usa Zod (`src/api/src/validators`).
- Erros de negócio lançam `Error` com `statusCode` customizado e são tratados pelo
  `errorMiddleware` central — não criar tratamento de erro duplicado em cada controller.
- TypeScript estrito em todo o projeto (backend e, futuramente, mobile).
- Não introduzir bibliotecas novas sem justificar em texto: por que é necessária, qual problema
  resolve, se existe alternativa com o que já está no projeto.

## 5. Testes

- Toda funcionalidade nova de regra de negócio (services) deve ter cobertura de teste antes de ser
  considerada concluída.
- Testes existentes são também especificação executável — leia os testes relacionados ao domínio
  antes de alterar comportamento existente.
- Se não for possível rodar os testes no ambiente atual, isso deve ser registrado em
  `memory/problems.md`, não simplesmente ignorado.

## 6. Diante de dúvidas

Se a tarefa for ambígua ou a especificação for insuficiente:

1. Não invente comportamento.
2. Apresente as opções encontradas e uma recomendação.
3. Pergunte ao desenvolvedor antes de prosseguir.

## 7. Processo de validação

Uma tarefa só é considerada concluída quando:

- o código implementa exatamente o que está em `tasks/current.md`;
- os critérios de aceite da tarefa foram verificados um a um;
- os testes relevantes passam (ou a limitação foi registrada em `memory/problems.md`);
- a documentação afetada foi atualizada (`spec/`, `decisions/` se houve decisão nova).

## 8. Ao final de cada sessão de trabalho

1. Atualize `memory/project-state.md` com o que mudou.
2. Mova a tarefa de `tasks/current.md` para `tasks/completed.md` se foi concluída, ou deixe registrado
   o ponto exato onde parou.
3. Registre em `memory/pending.md` qualquer coisa que ficou pendente de decisão ou validação humana.
4. Se algo deu errado ou não pôde ser verificado, registre em `memory/problems.md` — não omita.
5. Crie um registro em `memory/sessions/` com a data e um resumo do que foi feito.

## 9. Regra de ouro

> Nenhuma informação importante deve existir apenas na conversa com um agente. Se é uma decisão:
> documente em `decisions/`. Se é uma regra: coloque em `spec/business-rules/`. Se é progresso ou
> descoberta: registre em `memory/`. Se é uma tarefa: mantenha `tasks/` atualizado.

## 10. Tecnologias fixas deste projeto

```text
Backend:  Node.js + Express + TypeScript + Prisma + MySQL + JWT + bcryptjs + Zod
Mobile:   React Native + React Native Paper + React Navigation + TypeScript (ainda não iniciado)
```

Não trocar tecnologias sem um novo ADR aprovado pelo desenvolvedor.
