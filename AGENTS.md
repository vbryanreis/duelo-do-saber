# AGENTS.md — Regras para agentes de IA

Este repositório é desenvolvido com apoio de Codex, Claude Code e outros agentes. Antes de modificar qualquer arquivo, leia:

1. `README.md`
2. `docs/GDD.md`
3. `docs/DECISIONS.md`
4. `docs/BACKLOG_MVP.md`
5. a especificação relacionada à tarefa

## Regras obrigatórias

- Não altere as decisões imutáveis do GDD sem autorização explícita do proprietário.
- Cada pergunta sempre possui cinco alternativas.
- Jogador e rival começam com 8.000 PV.
- Acertos causam exatamente 1.000 de dano ao rival.
- Não adicione cronômetro obrigatório.
- Separe regras de batalha da interface.
- Inclua testes para mudanças nas regras.
- Atualize documentação quando o comportamento mudar.
- Não invente credenciais, APIs, materiais de estudo ou requisitos.
- Não copie personagens, interfaces ou ativos de franquias existentes.
- Use commits pequenos e descritivos.
- Não faça refatorações amplas fora do escopo da tarefa.
- Registre dúvidas não bloqueantes em `docs/OPEN_QUESTIONS.md`.

## Definição de pronto

Uma tarefa só está pronta quando:

- cumpre seus critérios de aceitação;
- possui testes relevantes;
- não quebra regras aprovadas;
- atualiza documentação quando necessário;
- passa nos verificadores do projeto;
- pode ser compreendida por outro agente sem contexto privado.
