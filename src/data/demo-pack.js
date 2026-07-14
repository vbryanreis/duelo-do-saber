const facts = [
  ["Qual é a proposta central do Duelo do Saber?", "Transformar bancos de questões personalizados em uma campanha de duelos", ["Substituir professores por uma IA obrigatória", "Oferecer apenas questões de legislação", "Criar partidas multijogador competitivas", "Aplicar provas com tempo obrigatório"], "Visão do produto", "easy", ["concept"], "Pense na união entre estudo personalizado e jogo."],
  ["Quantas alternativas toda pergunta deve possuir?", "Exatamente cinco", ["Duas", "Três", "Quatro", "Seis"], "Regras imutáveis", "easy", ["memorization"], "O número também corresponde à quantidade de Cartas-Resposta."],
  ["Com quantos pontos de vida o jogador inicia um duelo?", "8.000 PV", ["1.000 PV", "4.000 PV", "5.000 PV", "10.000 PV"], "Combate", "easy", ["memorization"], "Jogador e rival começam em igualdade."],
  ["Quanto dano uma resposta correta causa ao rival?", "1.000 PV", ["500 PV", "2.000 PV", "4.000 PV", "Dano variável pelo combo"], "Combate", "easy", ["literalness"], "O dano ofensivo é fixo durante toda a campanha."],
  ["O que acontece com o dano de um acerto quando o combo aumenta?", "Permanece em 1.000 PV", ["Dobra a cada combo", "Sobe para 2.000 PV", "Passa a depender da região", "Ignora a vida restante"], "Combate", "easy", ["concept"], "Combos melhoram recompensa e apresentação, não o dano."],
  ["Quanto dano um erro causa no modo Fácil?", "1.000 PV", ["500 PV", "2.000 PV", "4.000 PV", "8.000 PV"], "Dificuldade de combate", "easy", ["memorization"], "É a menor punição dos três modos."],
  ["Quanto dano um erro causa no modo Médio?", "2.000 PV", ["500 PV", "1.000 PV", "3.000 PV", "4.000 PV"], "Dificuldade de combate", "easy", ["memorization"], "Quatro erros completos levam à derrota."],
  ["Quanto dano um erro causa no modo Difícil?", "4.000 PV", ["1.000 PV", "2.000 PV", "3.000 PV", "8.000 PV"], "Dificuldade de combate", "easy", ["memorization"], "Dois erros completos esgotam 8.000 PV."],
  ["Existe limite de tempo obrigatório para responder?", "Não, o tempo é ilimitado", ["Sim, 15 segundos", "Sim, 30 segundos", "Apenas na primeira região", "Depende do nível do rival"], "Conforto", "easy", ["literalness"], "A pressão vem da vida e do risco, não de um cronômetro."],
  ["Quantos acertos são necessários para derrotar um rival com vida cheia?", "Oito acertos", ["Quatro acertos", "Cinco acertos", "Dez acertos", "Depende do equipamento"], "Combate", "easy", ["association"], "Divida a vida do rival pelo dano fixo de cada acerto."],
  ["Qual é o formato oficial dos pacotes de perguntas?", "JSON em UTF-8", ["PDF binário", "Planilha XLSX", "Banco SQL remoto", "Documento DOCX"], "Importação", "easy", ["concept"], "É um formato de texto estruturado e validável."],
  ["Quantas regiões formam a campanha do MVP?", "Cinco regiões", ["Três regiões", "Quatro regiões", "Seis regiões", "Dez regiões"], "Campanha", "easy", ["memorization"], "Há um rival em cada região."],
  ["Qual região funciona como tutorial integrado?", "Jardins da Aurora", ["Biblioteca de Cristal", "Tribunal Celestial", "Forja da Razão", "Cidadela do Eclipse"], "Regiões", "easy", ["association"], "É a região luminosa, natural e acolhedora."],
  ["Qual região é o chefe final do primeiro ciclo?", "Cidadela do Eclipse", ["Jardins da Aurora", "Biblioteca de Cristal", "Tribunal Celestial", "Forja da Razão"], "Regiões", "easy", ["association"], "É a quinta região, de atmosfera cósmica."],

  ["O que a dificuldade de combate controla?", "Somente a punição dos erros", ["O texto das perguntas", "O dano causado por acertos", "A quantidade de alternativas", "O limite de tempo"], "Dificuldade", "medium", ["comparison"], "Separe dificuldade de combate de dificuldade da pergunta."],
  ["O que deve acontecer após uma resposta errada?", "Exibir explicação e registrar a questão para revisão", ["Apagar o progresso da sessão", "Ocultar definitivamente o gabarito", "Encerrar sempre o duelo", "Gerar outra questão com IA"], "Aprendizado", "medium", ["application"], "No jogo, o erro deve ser útil."],
  ["Quando uma região é desbloqueada?", "Após vencer a região anterior", ["Após comprar moedas", "Ao importar qualquer arquivo", "Depois de errar oito vezes", "Todas começam desbloqueadas"], "Progressão", "medium", ["sequence"], "A campanha avança em uma sequência de cinco regiões."],
  ["O que ocorre com o progresso de estudo após uma derrota?", "Ele é preservado", ["Ele é apagado", "Metade é removida", "Só os acertos permanecem", "O pacote é desinstalado"], "Persistência", "medium", ["interpretation"], "Derrotas não devem apagar o aprendizado obtido."],
  ["Qual habilidade elimina uma alternativa incorreta?", "Visão do Sábio", ["Consulta Arcana", "Escudo da Memória", "Segunda Chance", "Concentração Absoluta"], "Habilidades", "medium", ["association"], "Ela reduz as opções sem revelar diretamente a correta."],
  ["Qual habilidade mostra uma dica fornecida pelo pacote?", "Consulta Arcana", ["Visão do Sábio", "Escudo da Memória", "Segunda Chance", "Concentração Absoluta"], "Habilidades", "medium", ["association"], "A habilidade depende de uma dica válida nos dados."],
  ["Qual habilidade reduz pela metade o próximo dano por erro?", "Escudo da Memória", ["Visão do Sábio", "Consulta Arcana", "Segunda Chance", "Concentração Absoluta"], "Habilidades", "medium", ["association"], "Ela é preparada antes de confirmar a resposta."],
  ["Qual habilidade permite trocar uma primeira escolha errada antes do dano?", "Segunda Chance", ["Visão do Sábio", "Consulta Arcana", "Escudo da Memória", "Concentração Absoluta"], "Habilidades", "medium", ["association"], "O nome descreve diretamente a oportunidade concedida."],
  ["Qual habilidade adia a pergunta sem causar dano?", "Concentração Absoluta", ["Visão do Sábio", "Consulta Arcana", "Escudo da Memória", "Segunda Chance"], "Habilidades", "medium", ["association"], "A questão adiada vai para o Baralho das Fraquezas."],
  ["Como a Energia do Saber é obtida?", "Cada acerto concede um ponto", ["Cada erro concede dois pontos", "Ela começa completa", "É comprada com moedas", "Aumenta com o tempo"], "Energia", "medium", ["application"], "A energia recompensa respostas corretas."],
  ["Qual é o limite inicial da Energia do Saber?", "Cinco pontos", ["Dois pontos", "Três pontos", "Oito pontos", "Dez pontos"], "Energia", "medium", ["memorization"], "O limite coincide com o número de cartas de resposta."],
  ["O que caracteriza o Combo da Mente?", "Uma sequência de dois acertos", ["Um acerto", "Três acertos", "Cinco acertos", "Oito erros"], "Combos", "medium", ["sequence"], "É o primeiro marco de combo."],
  ["Qual sequência ativa Corrente de Conhecimento?", "Três acertos", ["Dois acertos", "Quatro acertos", "Cinco acertos", "Oito acertos"], "Combos", "medium", ["memorization"], "Fica entre Combo da Mente e Domínio da Matéria."],
  ["Qual marco ativa Domínio da Matéria?", "Cinco acertos em sequência", ["Dois acertos", "Três acertos", "Seis acertos", "Oito erros"], "Combos", "medium", ["sequence"], "É o marco de combo anterior ao Duelo Perfeito."],
  ["O que é necessário para um Duelo Perfeito?", "Oito acertos sem erro", ["Cinco acertos com um erro", "Vencer no modo Fácil", "Usar todas as habilidades", "Terminar com energia cheia"], "Combos", "medium", ["application"], "A vitória precisa ser impecável."],
  ["Quais modos são prioritários no MVP?", "Campanha, Duelo Rápido e Revisão das Fraquezas", ["Multijogador, Sobrevivência e Arena", "Simulado, Torneio e Ranqueada", "Campanha online e marketplace", "Apenas Campanha"], "Modos", "medium", ["comparison"], "São três formas de jogar incluídas no escopo inicial."],

  ["Um pacote tem 39 questões válidas. Como a interface deve tratá-lo para campanha completa?", "Avisar que está abaixo do mínimo recomendado de 40", ["Inventar uma questão durante o duelo", "Apagar o pacote automaticamente", "Converter erros em acertos", "Remover uma região sem aviso"], "Validação", "hard", ["practical_case", "application"], "Conteúdo insuficiente deve ser detectado antes do duelo."],
  ["Um jogador acerta enquanto usa um combo de cinco. Qual dano deve ser aplicado?", "Exatamente 1.000 PV", ["2.000 PV", "5.000 PV", "Dano igual à energia", "Dano aleatório"], "Combate", "hard", ["practical_case", "exception"], "Nenhuma progressão aumenta o dano ofensivo."],
  ["No modo Difícil, o Escudo da Memória está ativo e o jogador erra. Qual é o dano?", "2.000 PV", ["1.000 PV", "4.000 PV", "6.000 PV", "Nenhum dano"], "Habilidades", "hard", ["calculation", "application"], "Aplique uma redução de 50% ao dano de 4.000."],
  ["No modo Médio, um jogador com 2.000 PV erra sem escudo. Qual é o resultado?", "A vida chega a zero e o duelo termina em derrota", ["A vida fica em 1.000 PV", "O rival perde 2.000 PV", "A pergunta é anulada", "O dano é reduzido pela vida restante"], "Combate", "hard", ["calculation", "practical_case"], "O dano médio é de 2.000 PV."],
  ["Qual ação violaria uma restrição educacional das habilidades?", "Revelar diretamente a alternativa correta", ["Eliminar uma alternativa errada", "Mostrar uma dica não reveladora", "Reduzir o próximo dano", "Adiar uma pergunta"], "Habilidades", "hard", ["exception", "interpretation"], "Apoiar o raciocínio é permitido; entregar o gabarito não é."],
  ["Como um rival deve se adaptar a uma matéria sem cálculos?", "Usar outros estilos preferidos disponíveis, como exceções e sequências", ["Gerar cálculos não presentes no material", "Recusar todas as perguntas", "Alterar respostas corretas", "Reduzir para duas alternativas"], "Seleção", "hard", ["application", "interdisciplinary"], "A identidade está no tipo de raciocínio, não em uma disciplina fixa."],
  ["Qual prática mantém o BattleEngine realmente testável?", "Separar as regras de combate da interface gráfica", ["Guardar as regras apenas nos botões", "Misturar salvamento com animações", "Depender de áudio para calcular dano", "Executar validação somente depois da batalha"], "Arquitetura", "hard", ["concept", "application"], "O núcleo deve funcionar sem a camada visual."],
  ["Em que momento o progresso deve ser salvo?", "Após cada resposta avaliada", ["Somente ao sair do jogo", "Apenas após vencer cinco regiões", "Antes de importar um pacote", "Nunca, por ser offline"], "Persistência", "hard", ["sequence", "literalness"], "O salvamento frequente reduz o risco de perda."],
  ["Qual recompensa permanente seria proibida?", "Uma melhoria que aumenta o dano de cada acerto", ["Uma moldura de perfil", "Um verso de carta", "Um título cosmético", "Uma variação de cenário"], "Progressão", "hard", ["exception", "comparison"], "Recompensas não podem reduzir os oito acertos exigidos."],
  ["Uma questão errada reaparece em sessão futura com prioridade maior. Que princípio isso aplica?", "Erro útil aliado à revisão espaçada", ["Cronômetro punitivo", "Dano ofensivo variável", "Conteúdo fixo por matéria", "Eliminação do histórico"], "Revisão", "hard", ["interpretation", "application"], "Erros alimentam o Baralho das Fraquezas e futuras revisões."],
  ["Quais dados devem permanecer locais no MVP?", "Perfil, campanhas, pacotes, histórico, fraquezas e configurações", ["Somente o nome do jogador", "Apenas as músicas", "Chaves de API externas", "Ranking global obrigatório"], "Privacidade", "hard", ["interdisciplinary", "literalness"], "O MVP funciona offline após a importação."],
  ["Uma alternativa correta tem texto muito maior que todas as outras. Como o validador deve reagir?", "Emitir um aviso de qualidade", ["Marcar a questão como correta automaticamente", "Trocar o gabarito", "Reduzir para quatro alternativas", "Enviar o conteúdo a um servidor"], "Validação", "hard", ["trick", "application"], "Desbalanceamento textual pode entregar a resposta sem invalidar a sintaxe."],
  ["Qual combinação preserva acessibilidade na indicação de acerto?", "Cor acompanhada de texto, ícone ou forma", ["Somente verde e vermelho", "Apenas uma animação rápida", "Somente um som", "Nenhum retorno visual"], "Acessibilidade", "hard", ["application", "comparison"], "A cor nunca deve ser o único indicador."],
  ["Após vencer a quarta região, qual deve ficar disponível?", "Cidadela do Eclipse", ["Jardins da Aurora", "Biblioteca de Cristal", "Tribunal Celestial", "Nenhuma região"], "Campanha", "hard", ["sequence", "application"], "O desbloqueio segue a ordem das cinco regiões."],
  ["Por que a IA externa não precisa de integração direta no MVP?", "O prompt pode ser copiado e o pacote importado, evitando custo e chaves no cliente", ["Porque o jogo inventa perguntas em batalha", "Porque JSON não aceita texto", "Porque o MVP exige internet contínua", "Porque só há matérias fixas"], "Forja", "hard", ["interpretation", "interdisciplinary"], "A Forja separa geração externa de uso offline."],
  ["Qual condição deve impedir o início normal de uma campanha?", "Conteúdo insuficiente detectado antes do duelo sem aceite de modo reduzido", ["O jogador escolher modo Fácil", "A música estar desativada", "Uma região já ter sido vencida", "O pacote possuir exatamente cinco alternativas"], "Campanha", "hard", ["exception", "practical_case"], "O jogo jamais deve preencher lacunas inventando questões."],
  ["Qual cálculo básico ajuda a estimar domínio por assunto?", "Precisão combinada com volume, recência e variedade", ["Somente o último acerto", "Apenas o tempo de resposta", "Quantidade de moedas", "Volume da música"], "Domínio", "hard", ["interdisciplinary", "concept"], "Poucos acertos na mesma sessão não bastam para declarar domínio."],
  ["Ao marcar uma questão como dúvida, o que deve acontecer?", "Ela entra no Baralho das Fraquezas com prioridade menor que um erro", ["Ela é removida do pacote", "O rival perde vida", "A resposta correta é alterada", "A campanha é reiniciada"], "Revisão", "hard", ["comparison", "application"], "Dúvidas também merecem revisão, mas com peso inicial menor."],
  ["Qual comportamento é correto para animações de resultado?", "Podem ser aceleradas ou puladas", ["Devem bloquear a tela por um minuto", "Precisam esconder a explicação", "Substituem o feedback textual", "São obrigatórias em alto contraste"], "Conforto", "hard", ["interpretation", "literalness"], "O jogador não deve aguardar animações longas."],
  ["O que torna uma questão estruturalmente válida para o duelo?", "Cinco alternativas A–E, uma correta e campos obrigatórios preenchidos", ["Qualquer número de respostas", "Duas alternativas corretas", "Uma imagem sem enunciado", "Texto fora do objeto JSON"], "Validação", "hard", ["interdisciplinary", "comparison"], "O contrato oficial combina schema e regras educacionais."],
  ["Qual é a relação correta entre conteúdo e duelista?", "O pacote fornece a matéria; o rival prioriza estilos de raciocínio", ["Cada rival aceita apenas uma disciplina", "O rival cria conteúdo ausente", "A região altera o gabarito", "A matéria define o dano do jogador"], "Seleção", "hard", ["interpretation", "concept"], "A campanha é universal e orientada pelos metadados importados."],
  ["Depois de oito acertos e três erros no modo Fácil, qual condição prevalece se ambos começaram com 8.000 PV?", "Vitória, com o rival em zero e o jogador com 5.000 PV", ["Derrota, com ambos em zero", "Empate obrigatório", "Vitória com 8.000 PV", "O duelo continua por mais um acerto"], "Combate", "hard", ["calculation", "practical_case"], "Oito acertos retiram 8.000 PV; três erros fáceis retiram 3.000 PV."],
  ["No modo Médio, três erros e oito acertos resultam em quê?", "Vitória com 2.000 PV restantes", ["Derrota com zero PV", "Vitória com 5.000 PV", "Empate", "Rival com 2.000 PV"], "Combate", "hard", ["calculation", "practical_case"], "Três erros médios causam 6.000 de dano, enquanto oito acertos derrotam o rival."],
  ["Qual medida protege a privacidade do material importado?", "Não enviá-lo a servidores no MVP", ["Publicá-lo em ranking global", "Incluir uma chave secreta no cliente", "Convertê-lo em telemetria obrigatória", "Armazená-lo sem validação"], "Privacidade", "hard", ["application", "exception"], "O conteúdo deve permanecer local após a importação."],
  ["Qual sequência representa o loop macro essencial?", "Importar, validar, duelar, explicar, revisar e avançar", ["Comprar, esperar, anunciar e transmitir", "Gerar em batalha, ocultar e apagar", "Cronometrar, punir e reiniciar", "Conectar, ranquear e monetizar"], "Loop principal", "hard", ["sequence", "interdisciplinary"], "O estudo percorre preparação, prática, feedback e progressão."],
  ["Qual requisito evita respostas acidentais?", "Selecionar uma carta e confirmar a jogada", ["Aplicar a primeira carta tocada", "Usar cronômetro de cinco segundos", "Ocultar as descrições", "Ordenar sempre a correta primeiro"], "Cartas", "hard", ["application", "literalness"], "A seleção inicial apenas destaca a carta."],
  ["Qual relatório demonstra transparência após o duelo?", "Acertos, erros, precisão, sequência, vida e assuntos a revisar", ["Somente moedas ganhas", "Apenas a duração", "Somente o nome do rival", "Nenhuma métrica"], "Resultados", "hard", ["comparison", "application"], "O jogador precisa entender desempenho e próximos focos."],
  ["O que deve ocorrer quando não há outra pergunta para evitar repetição imediata?", "A repetição é permitida como último recurso", ["Inventar uma questão", "Encerrar permanentemente o pacote", "Marcar qualquer resposta como correta", "Reduzir a vida do rival"], "Seleção", "hard", ["exception", "practical_case"], "A regra de não repetição admite exceção quando não há alternativa."],
  ["Qual é o papel do PromptBuilder?", "Gerar o prompt oficial copiável para uma IA externa", ["Calcular dano", "Tocar música", "Desbloquear regiões", "Alterar o schema"], "Arquitetura", "hard", ["association", "interdisciplinary"], "Ele pertence ao fluxo da Forja do Conhecimento."],
  ["Qual evento representa a conclusão vitoriosa de um combate?", "duel_won", ["question_presented", "package_imported", "mastery_updated", "answer_selected"], "Arquitetura", "hard", ["association", "literalness"], "O nome do evento descreve a vitória no duelo."],
  ["Qual escolha mantém o MVP universal?", "Filtrar perguntas por metadados em vez de fixar disciplinas", ["Criar só questões de direito", "Vincular Lucy à biologia", "Proibir pacotes do usuário", "Usar um gabarito global"], "Conteúdo universal", "hard", ["interpretation", "application"], "Os rivais representam formas de raciocínio."],
  ["Qual decisão é compatível com o escopo pós-MVP?", "Deixar multijogador e nuvem para uma expansão", ["Remover a campanha", "Trocar cinco alternativas por quatro", "Adicionar cronômetro obrigatório", "Ignorar salvamento local"], "Escopo", "hard", ["comparison", "exception"], "Esses recursos estão explicitamente fora do MVP inicial."]
];

const ids = ["A", "B", "C", "D", "E"];

function buildQuestion(entry, index) {
  const [prompt, correct, wrong, topic, difficulty, styles, hint] = entry;
  const correctPosition = index % 5;
  const options = [...wrong];
  options.splice(correctPosition, 0, correct);
  return {
    id: `gdd-mvp-${String(index + 1).padStart(3, "0")}`,
    subject: "Duelo do Saber",
    topic,
    subtopic: "GDD do MVP",
    difficulty,
    styles,
    prompt,
    alternatives: options.map((description, optionIndex) => ({
      id: ids[optionIndex],
      card_name: description.length > 42 ? `${description.slice(0, 39)}…` : description,
      description,
      explanation: optionIndex === correctPosition ? "Esta alternativa corresponde à linha de base oficial do GDD." : "Esta alternativa não corresponde à regra ou ao escopo descrito no GDD."
    })),
    correct_alternative: ids[correctPosition],
    correct_explanation: `Segundo o GDD oficial, a resposta correta é: ${correct}.`,
    hint,
    source_reference: `docs/GDD.md — ${topic}`,
    keywords: [topic.toLocaleLowerCase("pt-BR"), difficulty]
  };
}

export const DEMO_PACK = {
  format_version: "1.0",
  package_id: "gdd-duelo-do-saber-demo",
  title: "Conheça o Duelo do Saber",
  description: "Pacote demonstrativo criado exclusivamente a partir do GDD oficial para validar todas as regiões do MVP.",
  language: "pt-BR",
  generated_at: "2026-07-14",
  subjects: ["Duelo do Saber"],
  questions: facts.map(buildQuestion)
};
