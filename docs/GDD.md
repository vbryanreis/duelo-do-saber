# Duelo do Saber — Game Design Document Oficial

**Versão:** 1.0  
**Data-base:** 14 de julho de 2026  
**Status:** Linha de base aprovada para o MVP  
**Proprietário do projeto:** Bryan Reis  
**Fonte única da verdade:** `docs/GDD.md`

---

## 1. Resumo executivo

**Duelo do Saber** é um jogo de cartas educacional voltado a estudantes de concursos públicos, ENEM, vestibulares e outras provas. O jogador importa pacotes de perguntas criados a partir de seus próprios PDFs, apostilas, resumos ou anotações e transforma o estudo em duelos de cartas contra rivais com estilos distintos.

O diferencial central é que o jogo não possui uma grade fixa de matérias. O conteúdo da campanha é criado pelo próprio jogador por meio de arquivos de texto estruturado. O jogo fornece um prompt oficial para que uma inteligência artificial transforme o material do usuário em um pacote compatível, valide o arquivo e distribua as perguntas entre regiões de dificuldade crescente.

Durante cada rodada, o rival joga uma **Carta-Desafio** contendo uma pergunta. O jogador recebe exatamente **cinco Cartas-Resposta**, uma para cada alternativa. A carta tem como nome a resposta resumida e como descrição o conteúdo completo da alternativa. Ao escolher a carta correta, o rival perde pontos de vida. Ao escolher uma carta errada, o jogador recebe dano.

O objetivo é unir três motivações:

1. vencer o duelista atual;
2. desbloquear o próximo cenário e suas recompensas;
3. dominar o conteúdo estudado por meio de prática, explicação e revisão inteligente.

---

## 2. Visão do produto

### 2.1 Proposta de valor

Transformar bancos de questões personalizados em uma campanha de duelo com progressão visual, recompensas, revisão dos erros e métricas de domínio.

### 2.2 Público-alvo

- candidatos a concursos públicos;
- estudantes do ENEM e de vestibulares;
- alunos de cursos técnicos, graduação e certificações;
- pessoas que estudam idiomas, tecnologia, legislação ou qualquer conteúdo estruturável em perguntas;
- estudantes que se desmotivam com listas tradicionais de exercícios.

### 2.3 Fantasia do jogador

O jogador é um **Duelista do Saber**. Seu conhecimento se materializa em cartas e efeitos de batalha. Cada adversário representa uma forma diferente de cobrança: fundamento, memória, interpretação, aplicação, cálculo, exceção ou pegadinha.

### 2.4 Pilares de design

**Estudar jogando:** toda mecânica deve reforçar o aprendizado, sem transformar o conteúdo em mero obstáculo decorativo.

**Conteúdo universal:** o jogo deve funcionar com qualquer matéria importada pelo usuário.

**Competição sem pressa:** não há limite de tempo para responder. A pressão vem da vida, do risco e da progressão, não de um cronômetro.

**Erro útil:** toda resposta errada deve gerar explicação, registro e oportunidade de revisão posterior.

**Progressão sem reduzir estudo:** recompensas não podem permitir derrotar o rival com menos de oito respostas corretas.

**Transparência:** o jogador deve saber por que acertou ou errou, como seu domínio é calculado e quais assuntos precisam de revisão.

---

## 3. Decisões imutáveis da linha de base

As regras abaixo só podem ser alteradas mediante decisão explícita do proprietário do projeto e atualização de `docs/DECISIONS.md`.

1. Cada pergunta possui exatamente **cinco alternativas**.
2. Apenas uma alternativa pode ser correta.
3. O jogador recebe cinco Cartas-Resposta por pergunta.
4. Jogador e rival iniciam o duelo com **8.000 pontos de vida**.
5. Cada resposta correta causa **1.000 de dano** ao rival.
6. O dano ao rival não aumenta com dificuldade, combo, equipamento ou progressão.
7. No modo Fácil, uma resposta errada causa **1.000 de dano** ao jogador.
8. No modo Médio, uma resposta errada causa **2.000 de dano** ao jogador.
9. No modo Difícil, uma resposta errada causa **4.000 de dano** ao jogador.
10. Não existe limite de tempo para responder.
11. O rival é derrotado somente após oito respostas corretas.
12. A dificuldade da pergunta e a dificuldade do combate são sistemas separados.
13. O conteúdo da campanha depende dos pacotes importados pelo usuário.
14. O MVP possui cinco regiões e cinco duelistas, um rival por região.
15. Nenhuma habilidade pode revelar diretamente a alternativa correta.
16. Campanha e Duelo Rápido permanecem bloqueados até a instalação de ao menos um pacote próprio válido.

---

## 4. Plataforma e orientação técnica

### 4.1 Plataformas-alvo

O MVP deve priorizar computadores, com interface adequada para mouse e teclado. O design deve evitar decisões que impeçam uma futura adaptação para dispositivos móveis.

### 4.2 Stack recomendada

A implementação deve permanecer modular e documentada. A recomendação inicial é um motor 2D com suporte a cenas, animações, áudio e exportação multiplataforma. A decisão definitiva de motor deve ser registrada antes do início da produção do código-base.

**Recomendação de referência:** Godot 4.x com GDScript, dados em JSON e persistência local. Esta recomendação não é uma regra imutável; qualquer mudança exige uma nota em `docs/DECISIONS.md`.

### 4.3 Princípios técnicos

- conteúdo separado do código;
- regras de batalha testáveis sem interface gráfica;
- validador de pacotes independente da tela de importação;
- salvamento versionado e migrável;
- cenas e componentes reutilizáveis;
- nenhuma chave de API embutida no cliente;
- funcionamento offline após a importação do pacote;
- documentação atualizada no mesmo commit das alterações relevantes.

---

## 5. Loop principal

### 5.1 Loop macro

1. O jogador abre a Forja do Conhecimento.
2. Gera ou copia o prompt oficial.
3. Envia o prompt e o material de estudo a uma IA externa.
4. Importa o pacote gerado.
5. O jogo valida, classifica e indexa as perguntas.
6. O jogador escolhe um pacote, perfil de campanha e dificuldade de combate.
7. Entra na região atual.
8. Enfrenta o duelista.
9. Recebe explicações, recompensas e métricas.
10. Revisa erros no Baralho das Fraquezas.
11. Avança para a região seguinte.

### 5.2 Loop de uma rodada

1. O rival apresenta uma fala curta ou reação.
2. O rival joga a Carta-Desafio.
3. O enunciado é exibido integralmente.
4. Cinco Cartas-Resposta são distribuídas.
5. O jogador pode consultar as descrições sem limite de tempo.
6. O jogador pode usar uma habilidade disponível.
7. O jogador seleciona uma carta e confirma a jogada.
8. O sistema avalia a resposta.
9. O dano e a animação são aplicados.
10. A explicação é mostrada.
11. O desempenho é registrado.
12. A próxima rodada começa, salvo se um duelista tiver chegado a zero de vida.

---

## 6. Regras de combate

### 6.1 Vida e dano

| Evento | Consequência |
|---|---:|
| Resposta correta | Rival perde 1.000 PV |
| Resposta errada no Fácil | Jogador perde 1.000 PV |
| Resposta errada no Médio | Jogador perde 2.000 PV |
| Resposta errada no Difícil | Jogador perde 4.000 PV |

### 6.2 Condições de encerramento

**Vitória:** o rival chega a zero PV. Isso exige exatamente oito acertos durante o duelo.

**Derrota:** o jogador chega a zero PV.

Respostas erradas não reduzem a vida do rival. Portanto, a quantidade total de perguntas apresentadas pode superar oito. O pacote deve possuir perguntas suficientes para evitar repetição excessiva.

### 6.3 Dificuldade de combate

A dificuldade de combate controla somente a punição dos erros. Ela não altera automaticamente o texto, o nível ou o estilo das perguntas.

| Dificuldade | Dano por erro | Erros máximos antes da derrota, partindo de 8.000 PV |
|---|---:|---:|
| Fácil | 1.000 | 8 |
| Médio | 2.000 | 4 |
| Difícil | 4.000 | 2 |

### 6.4 Dificuldade das perguntas

A dificuldade das perguntas está ligada à região e aos metadados do pacote:

- **Fácil:** definições, fundamentos e reconhecimento direto;
- **Média:** comparação, interpretação e aplicação simples;
- **Difícil:** exceções, múltiplas etapas, casos complexos e alternativas altamente plausíveis.

### 6.5 Seleção de perguntas

O seletor deve:

- respeitar a dificuldade predominante da região;
- priorizar os estilos favoritos do rival;
- evitar questões vistas recentemente;
- equilibrar assuntos dentro da matéria;
- aumentar a chance de reaparecimento de conteúdos errados em sessões futuras;
- impedir repetição imediata da mesma pergunta, salvo quando não houver alternativa;
- registrar uma semente ou histórico suficiente para depuração.

### 6.6 Falta de perguntas

Antes de iniciar o duelo, o sistema calcula se há conteúdo suficiente. Caso não haja, deve bloquear ou oferecer uma campanha reduzida claramente identificada. O jogo jamais deve inventar perguntas durante a batalha.

Recomendação mínima para uma campanha completa do MVP:

- 40 questões válidas como mínimo absoluto;
- 60 ou mais questões como quantidade recomendada;
- pelo menos 8 questões adequadas à região final;
- variedade de assuntos e estilos.

---

## 7. Sistema de cartas

### 7.1 Carta-Desafio

Exibe:

- matéria;
- assunto;
- dificuldade;
- enunciado;
- indicação opcional de contexto, imagem ou fórmula no futuro;
- identidade visual do rival e da região.

### 7.2 Carta-Resposta

Cada pergunta gera exatamente cinco cartas. Cada carta contém:

- **nome:** versão curta e legível da alternativa;
- **descrição:** texto completo da alternativa;
- **arte ou ícone temático:** cosmético, sem revelar a correção;
- **estado visual:** normal, selecionada, confirmada, correta ou incorreta.

As letras A, B, C, D e E podem aparecer como marcadores, mas a identidade principal da carta é a resposta.

### 7.3 Regras de legibilidade

- nenhuma carta pode ficar ilegível em resoluções suportadas;
- descrições longas devem abrir em painel ampliado;
- o jogador deve conseguir comparar alternativas sem passar o mouse repetidamente;
- cores nunca podem ser o único indicador de acerto ou erro;
- o sistema deve aceitar conteúdo com acentos, fórmulas simples e quebras de linha.

### 7.4 Confirmação da jogada

A primeira seleção destaca a carta. A resposta só é enviada após confirmação. Isso evita erros acidentais e permite o uso de habilidades antes da revelação.

---

## 8. Explicação e aprendizado

Após cada resposta, o painel de resultado mostra:

- alternativa correta;
- resposta escolhida;
- explicação do gabarito;
- explicação do erro escolhido, quando fornecida;
- referência ao material original, quando disponível;
- assunto e palavras-chave;
- botão para marcar como dúvida;
- botão para continuar.

O jogador não deve ser obrigado a aguardar animações longas. As animações podem ser aceleradas ou puladas.

### 8.1 Tratamento do erro

Toda questão errada entra no Baralho das Fraquezas com prioridade inicial alta. Questões marcadas como dúvida também entram, porém com prioridade menor.

### 8.2 Repetição espaçada

A lógica de revisão deve considerar:

- acerto ou erro;
- confiança declarada, caso implementada;
- tempo desde a última aparição;
- sequência de acertos;
- dificuldade da questão;
- desempenho recente no assunto.

O sistema não deve declarar domínio com base em poucos acertos consecutivos realizados na mesma sessão.

---

## 9. Energia do Saber e habilidades

### 9.1 Energia do Saber

- o jogador começa o duelo com 0 de energia;
- cada acerto concede 1 ponto;
- a energia possui limite inicial de 5;
- combos podem conceder bônus de recompensa, mas não dano adicional;
- a energia é usada somente em habilidades de apoio.

### 9.2 Habilidades oficiais

| Habilidade | Efeito | Custo sugerido | Limite sugerido |
|---|---|---:|---:|
| Visão do Sábio | Elimina uma alternativa incorreta aleatória | 2 | 2 usos |
| Consulta Arcana | Mostra uma dica ou palavra-chave fornecida pelo pacote | 2 | 2 usos |
| Escudo da Memória | Reduz em 50% o próximo dano por erro | 2 | 1 uso |
| Segunda Chance | Permite trocar a escolha após uma primeira indicação de erro, antes do dano | 3 | 1 uso |
| Concentração Absoluta | Adia a pergunta sem dano e a envia ao Baralho das Fraquezas | 3 | 1 uso |

### 9.3 Restrições educacionais

- nenhuma habilidade revela a resposta correta;
- Visão do Sábio nunca elimina a resposta correta;
- Consulta Arcana depende de dica válida no pacote;
- Segunda Chance não pode ser encadeada com outra Segunda Chance;
- habilidades não podem reduzir o número de acertos exigidos para vencer;
- custos e limites devem ser ajustáveis por configuração para balanceamento.

---

## 10. Combos e desempenho

Combos existem para intensificar a sensação de domínio, não para encurtar o estudo.

| Sequência | Nome | Efeito |
|---|---|---|
| 2 acertos | Combo da Mente | aumento visual e pequeno bônus de XP |
| 3 acertos | Corrente de Conhecimento | efeito de ataque aprimorado |
| 5 acertos | Domínio da Matéria | bônus de recompensa |
| 8 acertos sem erro | Duelo Perfeito | título, bônus e animação especial |

Nenhum combo aumenta o dano acima de 1.000 por resposta correta.

---

## 11. Domínio da matéria

Cada matéria, assunto e subassunto pode possuir um indicador de domínio:

- Iniciante;
- Aprendiz;
- Competente;
- Especialista;
- Mestre.

O cálculo deve considerar precisão, recência, variedade, repetições espaçadas e estabilidade do desempenho. A interface deve mostrar tanto o nível quanto os fatores que ainda impedem a progressão.

### 11.1 Métricas mínimas

- questões respondidas;
- acertos e erros;
- precisão;
- maior sequência;
- tempo médio opcional, sem punição;
- desempenho por assunto;
- desempenho por estilo;
- histórico recente;
- questões em revisão;
- nível de domínio.

---

## 12. Regiões e duelistas do MVP

O MVP contém cinco regiões, cada uma com um rival. A estética começa clara e acolhedora e evolui para ambientes grandiosos, dramáticos e ameaçadores.

### 12.1 Região 1 — Jardins da Aurora

**Visual:** jardins luminosos, fontes, flores, árvores bem cuidadas e arquitetura elegante.  
**Duelista:** Lucy, a Guardiã da Aurora, 25 anos.
**Perfil:** naturalista acolhedora, observadora e competitiva sem crueldade; ensina pelo incentivo e celebra a curiosidade.
**Estilos prioritários:** conceito, definição, fundamento, associação.  
**Dificuldade predominante:** fácil.  
**Função:** tutorial integrado e primeira vitória do jogador.

### 12.2 Região 2 — Biblioteca de Cristal

**Visual:** biblioteca monumental, grandes janelas, cristais flutuantes e partículas mágicas.  
**Duelista:** Roberto, o Arquivista Prismático, 28 anos.
**Perfil:** nerd analítico, entusiasmado por detalhes e dono de humor seco; parece arrogante, mas respeita raciocínio fundamentado.
**Estilos prioritários:** memorização, literalidade, comparação, sequência.  
**Dificuldade predominante:** fácil e média.

### 12.3 Região 3 — Tribunal Celestial

**Visual:** tribunal elevado sobre nuvens, colunas gigantes, símbolos de equilíbrio e céu dramático.  
**Duelista:** Rebecca, a Árbitra Celeste, 27 anos.
**Perfil:** nobre formal, justa e estratégica; exige argumentos claros, mas não humilha quem admite um erro.
**Estilos prioritários:** interpretação, aplicação, caso prático, comparação.  
**Dificuldade predominante:** média.

O conceito de julgamento é abstrato e funciona para qualquer matéria: Rebecca exige que o jogador decida qual resposta aplica corretamente o conhecimento.

### 12.4 Região 4 — Forja da Razão

**Visual:** fortaleza industrial e mágica, engrenagens, energia, mecanismos e lava controlada.  
**Duelista:** Merrick, o General da Forja, 34 anos.
**Perfil:** ferreiro, general e soldado imperial; disciplinado, direto e protetor com seus comandados, admira persistência acima de pose.
**Estilos prioritários:** cálculo, exceção, pegadinha, sequência, múltiplas etapas.  
**Dificuldade predominante:** média e difícil.

Quando o pacote não possuir cálculos, Merrick utiliza exceções, relações complexas, ordenação e alternativas muito semelhantes.

### 12.5 Região 5 — Cidadela do Eclipse

**Visual:** arena monumental no topo de uma cidadela, tempestades, energia cósmica e estruturas antigas.  
**Duelista:** Apollo, o Imperador do Eclipse, 47 anos.
**Perfil:** imperador e ditador autoritário, eloquente e calculista; confunde obediência com sabedoria e reconhece, após a derrota, a força que não conseguiu controlar.
**Estilos prioritários:** combinação de todos os estilos, com ênfase em perguntas avançadas.  
**Dificuldade predominante:** difícil.  
**Função:** chefe final do primeiro ciclo da campanha.

### 12.6 Adaptação dos rivais ao pacote

Cada rival possui uma lista ordenada de estilos preferidos. O seletor procura questões compatíveis e passa para o próximo estilo quando não houver conteúdo suficiente. A identidade do rival está ligada ao tipo de raciocínio, não a uma disciplina específica.

---

## 13. Progressão de campanha

### 13.1 Desbloqueio

- a Região 1 começa disponível;
- uma região é desbloqueada após a vitória na anterior;
- o jogador pode repetir regiões já vencidas;
- a campanha é associada ao pacote ou conjunto de pacotes selecionado;
- a derrota não apaga progresso de estudo;
- o jogador pode iniciar um novo ciclo com o mesmo conteúdo.

### 13.2 Recompensas

- experiência de duelista;
- moedas internas sem valor monetário;
- versos de carta;
- molduras de perfil;
- efeitos de ataque;
- avatares e roupas;
- títulos;
- mascotes;
- trilhas e variações de cenário;
- habilidades e variações cosméticas.

### 13.3 Restrições

Recompensas permanentes não podem:

- aumentar o dano das respostas corretas;
- reduzir a vida do rival antes do duelo;
- marcar automaticamente a alternativa correta;
- eliminar a necessidade de oito acertos.

---

## 14. Modos de jogo da visão completa

### 14.1 Campanha

Cinco regiões no MVP, com progressão e desbloqueios.

### 14.2 Duelo Rápido

O jogador escolhe pacote, matéria, assunto e dificuldade para iniciar imediatamente.

### 14.3 Revisão das Fraquezas

Apresenta questões erradas, marcadas como dúvida ou identificadas como instáveis.

### 14.4 Simulado Final

Número fixo de questões, nota final e relatório. O sistema de vida pode ser ocultado ou adaptado sem alterar a correção das respostas.

### 14.5 Sobrevivência

Perguntas continuam até a vida chegar a zero. O foco é recorde de acertos.

### 14.6 Duelo Perfeito

Uma resposta errada encerra a partida. Modo opcional para jogadores avançados.

### 14.7 Desafio Diário

Pequena sequência de questões com recompensa diária e seleção equilibrada.

### 14.8 Batalha de Chefe de Revisão

Mistura assuntos estudados anteriormente e prioriza fraquezas persistentes.

**Escopo:** Campanha, Duelo Rápido e Revisão das Fraquezas são prioritários no MVP. Os demais modos pertencem à visão completa e devem ser implementados em etapas posteriores.

---

## 15. Forja do Conhecimento

A Forja do Conhecimento é a central de criação e importação de conteúdo.

### 15.1 Fluxo

1. escolher o tipo de estudo;
2. informar nome do pacote e objetivo;
3. escolher quantidade desejada de questões;
4. escolher distribuição de dificuldade;
5. gerar o prompt oficial;
6. copiar o prompt;
7. enviar prompt e material a uma IA externa;
8. salvar o resultado como arquivo JSON de texto;
9. importar o arquivo;
10. revisar o relatório de validação;
11. confirmar a instalação do pacote.

### 15.2 IA externa no MVP

O MVP não exige integração direta com API de IA. O jogo gera o prompt, e o usuário escolhe a ferramenta externa. Isso evita custo obrigatório, protege chaves e permite funcionamento offline após a importação.

### 15.3 Pacote de conteúdo

O formato oficial é JSON em UTF-8. JSON é um arquivo de texto estruturado e oferece validação segura e previsível. A extensão padrão é `.json`.

### 15.4 Resultado da validação

O relatório deve informar:

- total de questões;
- questões válidas;
- questões inválidas;
- possíveis duplicatas;
- distribuição por dificuldade;
- distribuição por assunto;
- distribuição por estilo;
- campos ausentes;
- alternativas repetidas;
- explicações ausentes;
- insuficiência de conteúdo para alguma região.

O usuário pode instalar apenas as questões válidas, desde que confirme o aviso.

---

## 16. Especificação resumida do pacote

A especificação completa está em `docs/QUESTION_PACK_SPEC.md` e no schema `schemas/question-pack.schema.json`.

### 16.1 Campos do pacote

- versão do formato;
- identificador do pacote;
- título;
- descrição;
- origem declarada pelo usuário;
- idioma;
- data de geração;
- lista de matérias;
- lista de questões.

### 16.2 Campos de uma questão

- identificador único;
- matéria;
- assunto;
- subassunto opcional;
- dificuldade;
- um ou mais estilos;
- enunciado;
- cinco alternativas;
- índice da alternativa correta;
- explicação do gabarito;
- explicações das alternativas erradas, quando disponíveis;
- dica não reveladora;
- referência ao material;
- palavras-chave;
- status de revisão.

### 16.3 Campos de uma alternativa

- identificador A, B, C, D ou E;
- nome curto da carta;
- descrição completa;
- explicação específica opcional.

---

## 17. Prompt oficial de geração

O prompt completo e copiável está em `docs/PROMPT_GERADOR.md`. Ele deve obrigar a IA externa a:

- usar somente o material fornecido;
- gerar exatamente cinco alternativas por questão;
- criar apenas uma resposta correta;
- produzir alternativas erradas plausíveis;
- classificar dificuldade e estilo;
- fornecer explicação;
- evitar respostas desproporcionalmente longas;
- não inserir comentários fora do JSON;
- respeitar o schema oficial;
- informar referências ao trecho do material quando possível.

---

## 18. Telas do MVP

### 18.1 Inicialização

- logo;
- aviso de salvamento local;
- carregamento de perfil.

### 18.2 Menu principal

- Continuar campanha;
- Nova campanha;
- Duelo rápido;
- Baralho das Fraquezas;
- Forja do Conhecimento;
- Coleção;
- Estatísticas;
- Configurações;
- Sair.

### 18.3 Forja do Conhecimento

- gerador de prompt;
- importador de arquivo;
- relatório de validação;
- biblioteca de pacotes;
- detalhes e exclusão segura.

### 18.4 Seleção de campanha

- pacote ou combinação de pacotes;
- matérias incluídas;
- distribuição de perguntas;
- dificuldade de combate;
- prévia das regiões;
- alertas de conteúdo insuficiente.

### 18.5 Mapa da campanha

- cinco regiões;
- estado bloqueado, disponível ou concluído;
- domínio recomendado;
- recompensas;
- estatísticas do melhor resultado.

### 18.6 Tela de duelo

- rival e animações;
- vida do jogador e do inimigo;
- Carta-Desafio;
- cinco Cartas-Resposta;
- Energia do Saber;
- habilidades;
- combo atual;
- histórico curto da batalha;
- menu de pausa.

### 18.7 Painel de explicação

- resultado;
- explicação;
- referência;
- marcar dúvida;
- continuar.

### 18.8 Resultado do duelo

- vitória ou derrota;
- perguntas apresentadas;
- acertos e erros;
- precisão;
- maior sequência;
- vida restante;
- assuntos fortes;
- assuntos para revisar;
- experiência e recompensas;
- ações seguintes.

---

## 19. Direção de arte

### 19.1 Estilo

Ilustração 2D cartoon ocidental, com acabamento de jogo de cartas e fantasia moderna. Deve lembrar a energia dramática de duelos de cartas sem copiar personagens, símbolos, cartas, interface ou identidade visual de franquias existentes.

### 19.2 Composição dos cenários

- centro relativamente livre para pergunta e cartas;
- maior densidade visual nas laterais e no fundo;
- leitura clara da silhueta dos duelistas;
- evolução de luminosidade e impacto entre regiões;
- efeitos visuais intensos, mas sem comprometer a leitura.

### 19.3 Progressão visual

1. luminoso, natural e acolhedor;
2. mágico, intelectual e monumental;
3. solene e dramático;
4. industrial, energético e perigoso;
5. cósmico, épico e ameaçador.

### 19.4 Duelistas

Cada rival deve possuir:

- silhueta reconhecível;
- paleta própria;
- postura de batalha;
- expressões de confiança, surpresa, preocupação e derrota;
- falas curtas adaptáveis;
- animação especial ao atingir 4.000 e 2.000 PV.

---

## 20. Áudio

- tema próprio para cada região;
- variação mais intensa quando o rival fica com pouca vida;
- efeitos distintos para acerto, erro, combo e habilidade;
- leitura sonora clara sem ser punitiva;
- controles separados para música, efeitos e interface;
- opção de reduzir sons repetitivos.

---

## 21. Acessibilidade e conforto

- tamanho de texto ajustável;
- modo de alto contraste;
- indicadores por forma e texto, não apenas cor;
- redução de movimento e flashes;
- controle de volume por categoria;
- suporte completo a teclado;
- possibilidade de pausar em qualquer momento fora de animações críticas;
- ausência de cronômetro obrigatório;
- opção de acelerar ou pular animações;
- confirmação antes de excluir pacotes ou progresso;
- linguagem clara nos relatórios.

---

## 22. Persistência e privacidade

### 22.1 Dados locais

- perfil do jogador;
- campanhas;
- progresso por região;
- pacotes importados;
- histórico de respostas;
- Baralho das Fraquezas;
- domínio por assunto;
- configurações;
- coleção cosmética.

### 22.2 Requisitos

- salvamento automático após cada resposta avaliada;
- cópia de segurança local;
- exportação e importação de save em versão futura;
- migração de versões do save;
- o material do usuário não deve ser enviado para servidores pelo MVP;
- arquivos importados devem ser tratados como dados não confiáveis e validados.

---

## 23. Arquitetura funcional sugerida

### 23.1 Módulos

- `GameState`: fluxo global e navegação;
- `BattleEngine`: vida, dano, rodada, vitória e derrota;
- `QuestionRepository`: leitura, filtro e seleção;
- `QuestionValidator`: schema e regras educacionais;
- `CampaignManager`: regiões, desbloqueios e recompensas;
- `ReviewScheduler`: Baralho das Fraquezas e repetição espaçada;
- `MasteryService`: cálculo de domínio;
- `SaveService`: persistência e migração;
- `PromptBuilder`: geração do prompt oficial;
- `AnalyticsService`: métricas locais;
- `AudioManager`: música e efeitos;
- `AccessibilitySettings`: opções de conforto.

### 23.2 Separação obrigatória

O `BattleEngine` não deve depender da interface gráfica. As regras principais devem possuir testes automatizados.

### 23.3 Eventos principais

- `duel_started`;
- `question_presented`;
- `answer_selected`;
- `answer_resolved`;
- `damage_applied`;
- `ability_used`;
- `duel_won`;
- `duel_lost`;
- `question_flagged`;
- `mastery_updated`;
- `package_imported`.

---

## 24. Critérios de aceitação do MVP

O MVP é considerado funcional quando:

1. um pacote JSON válido pode ser importado;
2. arquivos inválidos geram relatório compreensível;
3. todas as perguntas exibem cinco cartas;
4. o jogador consegue concluir ou perder um duelo;
5. os três modos de dano funcionam corretamente;
6. o rival perde exatamente 1.000 PV por acerto;
7. não há cronômetro obrigatório;
8. explicações aparecem após cada resposta;
9. erros são registrados no Baralho das Fraquezas;
10. o progresso é salvo após cada resposta;
11. as cinco regiões podem ser desbloqueadas;
12. cada rival prioriza seus estilos de questão;
13. perguntas insuficientes são detectadas antes do duelo;
14. Campanha, Duelo Rápido e Revisão das Fraquezas estão disponíveis;
15. o resultado final mostra métricas úteis;
16. as principais regras possuem testes automatizados;
17. a documentação do repositório permite a continuidade por agentes de IA.

---

## 25. Escopo do MVP

### 25.1 Incluído

- perfil local único;
- importação e validação de JSON;
- gerador de prompt;
- biblioteca de pacotes;
- cinco regiões;
- cinco duelistas;
- três dificuldades de combate;
- cinco habilidades;
- Energia do Saber;
- combos sem dano extra;
- explicação após respostas;
- Baralho das Fraquezas;
- domínio básico por assunto;
- Campanha;
- Duelo Rápido;
- Revisão das Fraquezas;
- recompensas cosméticas básicas;
- estatísticas;
- salvamento local;
- opções essenciais de acessibilidade.

### 25.2 Fora do MVP, mas mantido na visão

- multijogador;
- integração direta com APIs de IA;
- sincronização em nuvem;
- aplicativo móvel;
- marketplace de pacotes;
- narração completa;
- criação de perguntas dentro do jogo;
- Simulado Final avançado;
- Sobrevivência;
- Desafio Diário online;
- temporadas e eventos;
- editor visual completo de cartas.

---

## 26. Roadmap de alto nível

### Fase 0 — Fundação

- decisão do motor;
- criação do repositório;
- arquitetura de pastas;
- modelos de dados;
- testes das regras centrais;
- protótipo do importador.

### Fase 1 — Vertical slice

- uma região;
- um rival;
- duelo completo;
- importação de pacote;
- explicação;
- resultado e salvamento.

### Fase 2 — MVP completo

- cinco regiões;
- cinco rivais;
- habilidades;
- Baralho das Fraquezas;
- domínio;
- progressão;
- acessibilidade;
- polimento.

### Fase 3 — Expansão

- novos modos;
- mais rivais;
- chefes de revisão;
- personalização avançada;
- suporte móvel estudado.

---

## 27. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Pacotes gerados com erros | Schema, validador, relatório e exemplo oficial |
| Alternativas fáceis de adivinhar pelo tamanho | Regras no prompt e alerta de desbalanceamento textual |
| Poucas perguntas para uma campanha | Verificação prévia e recomendação de 60+ questões |
| Repetição cansativa | seletor com histórico, estilos e assuntos variados |
| Mecânicas atrapalhando o estudo | ausência de cronômetro e animações puláveis |
| Agentes de IA divergirem sobre o projeto | GDD, DECISIONS.md, AGENTS.md e PRs pequenos |
| Perda de progresso | salvamento por resposta e backup local |
| Conteúdo incorreto da IA externa | referência ao material e revisão pelo usuário |
| Semelhança excessiva com franquias | identidade visual e regras autorais, sem copiar elementos protegidos |

---

## 28. Processo de desenvolvimento com agentes de IA

O GitHub será a fonte compartilhada de contexto entre Codex, Claude Code e outros agentes.

### 28.1 Ordem de leitura obrigatória

1. `README.md`;
2. `AGENTS.md`;
3. `docs/GDD.md`;
4. `docs/DECISIONS.md`;
5. `docs/BACKLOG_MVP.md`;
6. especificações relacionadas à tarefa.

### 28.2 Regras de contribuição

- uma mudança de design exige atualização documental;
- regras imutáveis não podem ser alteradas silenciosamente;
- cada tarefa deve ter critérios de aceitação;
- alterações pequenas e revisáveis são preferíveis;
- código deve incluir testes relevantes;
- commits devem explicar a intenção;
- nenhum agente deve inventar credenciais, conteúdo de estudo ou requisitos ausentes;
- dúvidas não bloqueantes devem ser registradas em `docs/OPEN_QUESTIONS.md`.

---

## 29. Indicadores de sucesso

### 29.1 Produto

- taxa de conclusão do primeiro duelo;
- retorno para uma segunda sessão;
- campanhas iniciadas e concluídas;
- uso do Baralho das Fraquezas;
- quantidade de pacotes importados;
- redução de erros em questões revisadas.

### 29.2 Aprendizado

- melhoria de precisão por assunto;
- retenção após intervalos maiores;
- estabilidade do domínio;
- redução do número de fraquezas persistentes.

### 29.3 Experiência

- tempo até o primeiro duelo;
- taxa de erro na importação;
- frequência de animações puladas;
- abandono durante explicações;
- uso das opções de acessibilidade.

---

## 30. Questões abertas

As questões abaixo não alteram a linha de base e devem ser decididas antes ou durante a Fase 0:

- motor definitivo;
- resolução-base e proporções suportadas;
- formato final do sistema de salvamento;
- algoritmo inicial de domínio;
- fórmula exata de XP e moedas;
- identidade visual final do jogador;
- classificação indicativa e idiomas de lançamento;
- licença do código e dos ativos;
- política para pacotes compartilhados.

Essas decisões devem ser registradas em `docs/DECISIONS.md`.
