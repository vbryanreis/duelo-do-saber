# Duelo do Saber

Jogo de cartas educacional para concursos, ENEM, vestibulares e outros estudos. O jogador importa perguntas criadas a partir de seus próprios materiais e enfrenta duelistas em regiões de dificuldade crescente.

## Estado

MVP web jogável com cinco regiões, cinco duelistas, importação obrigatória de matérias próprias, campanha, duelo rápido, revisão, habilidades, progressão, estatísticas, acessibilidade, persistência local, arte dedicada no menu e trilha musical por região.

## Executar o MVP

Requisito: Node.js 20 ou superior.

No Windows, dê dois cliques em `Jogar Duelo do Saber.cmd`. A janela aberta mantém o servidor do jogo ativo; feche-a para encerrar.

Como alternativa, use o terminal:

```powershell
npm.cmd start
```

Abra `http://127.0.0.1:4173`. O jogo não instala dependências e não envia pacotes ou progresso para servidores externos.

Para executar os verificadores:

```powershell
npm.cmd test
npm.cmd run check
```

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

## Estrutura

- `docs/`: design, decisões e especificações;
- `schemas/`: contratos de dados;
- `examples/`: pacotes de exemplo;
- `src/core/`: motor de batalha, seletor e validador independentes da interface;
- `src/config/`: regiões, duelistas e faixas de áudio;
- `src/data/`: pacote demonstrativo baseado no GDD;
- `src/services/`: salvamento local e áudio;
- `src/app.js`: interface e fluxo da aplicação;
- `tests/`: testes;
- `assets/`: músicas fornecidas pelo proprietário e registro de origem;
- `.github/`: templates e instruções.

## Fluxo para agentes

Leia `AGENTS.md` antes de trabalhar. O arquivo `docs/GDD.md` é a fonte única da verdade para regras e escopo.

## Licença

A licença do código e dos ativos ainda será definida pelo proprietário do projeto. Não adicione uma licença automaticamente.
