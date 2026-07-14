# Registro de Decisões

Este arquivo guarda decisões de produto e tecnologia. Não altere decisões aprovadas sem registrar uma nova entrada.

## D-001 — Cinco alternativas obrigatórias

**Status:** Aprovada  
**Data:** 2026-07-14

Toda questão do Duelo do Saber possui exatamente cinco alternativas, independentemente do formato da prova de origem.

## D-002 — Vida e dano

**Status:** Aprovada  
**Data:** 2026-07-14

Jogador e rival começam com 8.000 PV. Acertos causam 1.000 de dano ao rival. Erros causam 1.000, 2.000 ou 4.000 ao jogador nos modos Fácil, Médio e Difícil.

## D-003 — Sem cronômetro

**Status:** Aprovada  
**Data:** 2026-07-14

O jogador possui tempo ilimitado para estudar a pergunta e as cartas.

## D-004 — Conteúdo universal importado

**Status:** Aprovada  
**Data:** 2026-07-14

A campanha não depende de matérias fixas. Os duelistas se adaptam aos metadados dos pacotes importados.

## D-005 — Cinco regiões no MVP

**Status:** Aprovada  
**Data:** 2026-07-14

O MVP terá cinco regiões e cinco duelistas, um rival por região.

## D-006 — JSON como formato oficial

**Status:** Proposta na linha de base  
**Data:** 2026-07-14

O pacote de perguntas será um arquivo JSON UTF-8, por ser texto estruturado, validável e adequado ao uso por IAs e pelo jogo.

## D-007 — Motor do jogo

**Status:** Aprovada para o MVP
**Data:** 2026-07-14

O MVP será implementado como aplicação web offline em HTML, CSS e JavaScript modular, servido por um processo Node.js sem dependências externas. A escolha permite validar imediatamente o produto em computadores, manter o `BattleEngine` independente da interface, executar testes automatizados e preservar uma futura migração para Godot ou empacotamento desktop após a validação do vertical slice.

## D-008 — Duelistas definitivos do MVP

**Status:** Aprovada
**Data:** 2026-07-14

Os cinco duelistas são:

1. Lucy, 25 anos, naturalista dos Jardins da Aurora;
2. Roberto, 28 anos, arquivista nerd da Biblioteca de Cristal;
3. Rebecca, 27 anos, nobre árbitra do Tribunal Celestial;
4. Merrick, 34 anos, ferreiro, general e soldado imperial da Forja da Razão;
5. Apollo, 47 anos, imperador ditatorial da Cidadela do Eclipse.

Os conceitos visuais e traços de personalidade presentes no MVP são provisórios e poderão ser refinados sem alterar nomes, idades ou papéis aprovados.

## D-009 — Pacote demonstrativo do GDD

**Status:** Aprovada para validação interna
**Data:** 2026-07-14

O código mantém um pacote demonstrativo com perguntas criadas exclusivamente a partir do próprio GDD apenas para testes automatizados. Ele não é instalado no save e não libera modos de jogo. Campanha e Duelo Rápido exigem ao menos um pacote próprio importado e validado pelo jogador.

## D-010 — Importação obrigatória antes do primeiro duelo

**Status:** Aprovada
**Data:** 2026-07-14

Nenhum duelo de Campanha ou Duelo Rápido pode começar antes que o jogador importe e instale ao menos um pacote próprio válido. Sem conteúdo, o menu direciona à Forja do Conhecimento. Essa regra também é aplicada a saves anteriores que ainda contenham o pacote demonstrativo interno.
