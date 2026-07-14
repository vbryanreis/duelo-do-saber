# Duelo do Saber

Jogo de cartas educacional para concursos, ENEM, vestibulares e outros estudos. O jogador importa perguntas criadas a partir de seus próprios materiais e enfrenta duelistas em regiões de dificuldade crescente.

## Estado

Planejamento oficial e preparação do repositório para o MVP.

## Documentação principal

- [Game Design Document](docs/GDD.md)
- [Decisões](docs/DECISIONS.md)
- [Backlog do MVP](docs/BACKLOG_MVP.md)
- [Especificação dos pacotes](docs/QUESTION_PACK_SPEC.md)
- [Prompt gerador](docs/PROMPT_GERADOR.md)
- [Roadmap](docs/ROADMAP.md)
- [Regras para agentes](AGENTS.md)
- [Publicação no GitHub](docs/GITHUB_SETUP.md)

## Regra central

Cada rodada apresenta uma pergunta e exatamente cinco cartas de resposta. Um acerto causa 1.000 de dano ao rival; um erro causa dano ao jogador conforme a dificuldade de combate. Ambos começam com 8.000 PV e não existe limite de tempo.

## Estrutura inicial

- `docs/`: design, decisões e especificações;
- `schemas/`: contratos de dados;
- `examples/`: pacotes de exemplo;
- `src/`: código do jogo;
- `tests/`: testes;
- `assets/`: orientações para ativos;
- `.github/`: templates e instruções.

## Fluxo para agentes

Leia `AGENTS.md` antes de trabalhar. O arquivo `docs/GDD.md` é a fonte única da verdade para regras e escopo.

## Licença

A licença do código e dos ativos ainda será definida pelo proprietário do projeto. Não adicione uma licença automaticamente.
