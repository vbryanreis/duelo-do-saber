export const REGIONS = [
  {
    id: "aurora-gardens",
    order: 1,
    name: "Jardins da Aurora",
    englishName: "Aurora Gardens",
    icon: "✦",
    theme: "aurora",
    track: "assets/music/Aurora Gardens.mp3",
    difficulties: ["easy"],
    styles: ["concept", "association", "memorization", "literalness"],
    reward: "Moldura Broto da Aurora",
    rival: {
      name: "Lucy",
      age: 25,
      title: "Guardiã da Aurora",
      archetype: "Naturalista",
      portrait: "L",
      portraitImage: "assets/images/characters/lucy_profile.png",
      sprite: "assets/images/characters/lucy_neutral.png",
      damageSprite: "assets/images/characters/lucy_damage.png",
      voice: {
        greetings: "assets/voices/lucy/lucy_greetings.mp3",
        damage: [
          "assets/voices/lucy/lucy_damage_01.mp3",
          "assets/voices/lucy/lucy_damage_02.mp3",
          "assets/voices/lucy/lucy_damage_03.mp3"
        ]
      },
      concept: "Uma duelista botânica de roupas leves, capa-folha e pingente solar; leva um caderno de campo transformado em grimório.",
      personality: "Acolhedora, observadora e competitiva sem crueldade. Ensina pelo incentivo e celebra a curiosidade.",
      intro: "Toda resposta é uma semente. Vamos descobrir quais você cultivou?",
      lowHealth: "Suas raízes estão fortes… mas o jardim ainda tem surpresas.",
      defeat: "Que floresça em você a coragem de continuar aprendendo.",
      dialogue: {
        presentation: [
          "Seja bem-vindo aos Jardins da Aurora. Eu sou Lucy, a guardiã deste lugar.",
          "Aqui cada ideia floresce como uma semente bem cuidada.",
          "Não tenha pressa: no jardim, quem observa com calma colhe melhor.",
          "Mostre-me o que você cultivou nos seus estudos. Vamos começar?"
        ],
        onRivalDamage: [
          "Essa resposta brotou forte! Muito bem.",
          "Ótimo… você regou bem essa ideia.",
          "Sinto o solo tremer. Você aprende rápido!",
          "Bela colheita. Mas o jardim ainda tem canteiros a explorar.",
          "Ai! Até as flores sentiram essa.",
          "Essa raiz chegou funda… preciso me recompor."
        ],
        onPlayerDamage: [
          "Cuidado, essa trilha tinha espinhos.",
          "Nem toda flor bonita é a resposta certa. Observe de novo.",
          "Tudo bem tropeçar: até o jardineiro poda antes de florescer.",
          "Essa semente ainda precisa de mais cuidado."
        ],
        defeat: [
          "Meu jardim se curva ao seu conhecimento…",
          "Você cultivou algo raro: sabedoria com paciência.",
          "Leve uma semente daqui. Que floresça em você a coragem de continuar aprendendo."
        ]
      }
    }
  },
  {
    id: "crystal-library",
    order: 2,
    name: "Biblioteca de Cristal",
    englishName: "Crystal Library",
    icon: "◇",
    theme: "crystal",
    track: "assets/music/Crystal Library.mp3",
    difficulties: ["easy", "medium"],
    styles: ["memorization", "literalness", "comparison", "sequence"],
    reward: "Verso Arquivo Prismático",
    rival: {
      name: "Roberto",
      age: 28,
      title: "Arquivista Prismático",
      archetype: "Nerd erudito",
      portrait: "R",
      portraitImage: "assets/images/characters/roberto_profile.png",
      sprite: "assets/images/characters/roberto_neutral.png",
      voice: {
        greetings: "assets/voices/roberto/roberto_greetings.mp3",
        damage: [
          "assets/voices/roberto/roberto_damage_01.mp3",
          "assets/voices/roberto/roberto_damage_02.mp3"
        ]
      },
      concept: "Um pesquisador de casaco azul-violeta, óculos de lentes hexagonais e bracelete que projeta índices de cristal.",
      personality: "Analítico, entusiasmado por detalhes e dono de um humor seco. Parece arrogante, mas respeita raciocínio bem fundamentado.",
      intro: "Cataloguei doze maneiras de você errar. Surpreenda meu índice.",
      lowHealth: "Interessante… você está reescrevendo minhas previsões.",
      defeat: "Registro atualizado: sua competência é estatisticamente inegável.",
      dialogue: {
        presentation: [
          "Bem-vindo à Biblioteca de Cristal. Roberto, arquivista prismático, ao seu dispor.",
          "Cada prisma aqui refrata uma verdade — poucos sabem lê-las.",
          "Já cataloguei doze maneiras de você errar. Prove que superestimei o número.",
          "Vamos indexar seu conhecimento. Comece quando estiver pronto."
        ],
        onRivalDamage: [
          "Hm. Dado registrado… e inesperado.",
          "Correto. Minhas estatísticas pedem um ajuste.",
          "Interessante. Você está reescrevendo minhas previsões.",
          "Um índice a menos a meu favor. Continue.",
          "Preciso e elegante. Anotado."
        ],
        onPlayerDamage: [
          "Como previa a nota de rodapé número sete.",
          "Erro comum. Está catalogado no volume três.",
          "A resposta bonita raramente é a correta. Reavalie.",
          "Consulte suas fontes antes de afirmar."
        ],
        defeat: [
          "Registro atualizado: sua competência é estatisticamente inegável.",
          "Terei de reescrever todo o índice a seu respeito.",
          "Leve este cristal. Você conquistou um lugar nos meus arquivos."
        ]
      }
    }
  },
  {
    id: "celestial-court",
    order: 3,
    name: "Tribunal Celestial",
    englishName: "Celestial Court",
    icon: "⚖",
    theme: "celestial",
    track: "assets/music/Celestial Court.mp3",
    difficulties: ["medium"],
    styles: ["interpretation", "application", "practical_case", "comparison"],
    reward: "Título Voz do Equilíbrio",
    rival: {
      name: "Rebecca",
      age: 27,
      title: "Árbitra Celeste",
      archetype: "Nobre magistrada",
      portrait: "R",
      concept: "Uma jovem nobre de postura impecável, traje marfim e azul-real, coroa fina e cartas seladas como decretos.",
      personality: "Formal, justa e estrategista. Exige argumentos claros, mas nunca humilha quem admite um erro.",
      intro: "Conhecimento sem aplicação é apenas testemunho. Apresente seu veredito.",
      lowHealth: "A balança se inclina. Sustente sua tese até o fim.",
      defeat: "O Tribunal reconhece seu mérito. Prossiga com honra."
    }
  },
  {
    id: "forge-of-reason",
    order: 4,
    name: "Forja da Razão",
    englishName: "Forge of Reason",
    icon: "⚒",
    theme: "forge",
    track: "assets/music/Forge of Reason.mp3",
    difficulties: ["medium", "hard"],
    styles: ["calculation", "exception", "trick", "sequence", "interdisciplinary"],
    reward: "Efeito Golpe da Bigorna",
    rival: {
      name: "Merrick",
      age: 34,
      title: "General da Forja",
      archetype: "Ferreiro imperial",
      portrait: "M",
      concept: "Ferreiro, general e soldado do Império; armadura marcada por batalhas, avental de couro e martelo-tático alimentado por runas.",
      personality: "Disciplinado, direto e protetor com seus comandados. Testa conhecimento sob pressão e admira persistência acima de pose.",
      intro: "Teoria frágil quebra no primeiro golpe. Mostre que a sua foi bem forjada.",
      lowHealth: "Boa têmpera. Agora aguente o calor da última martelada.",
      defeat: "Arma aprovada. Sua mente não cedeu ao fogo."
    }
  },
  {
    id: "citadel-of-the-eclipse",
    order: 5,
    name: "Cidadela do Eclipse",
    englishName: "Citadel of the Eclipse",
    icon: "☾",
    theme: "eclipse",
    track: "assets/music/Citadel of the Eclipse.mp3",
    difficulties: ["hard"],
    styles: ["interdisciplinary", "exception", "application", "interpretation", "trick", "calculation"],
    reward: "Coroa do Saber Livre",
    rival: {
      name: "Apollo",
      age: 47,
      title: "Imperador do Eclipse",
      archetype: "Soberano ditatorial",
      portrait: "A",
      concept: "Imperador austero de manto negro e ouro, coroa solar fraturada e luva que aprisiona um eclipse em miniatura.",
      personality: "Autoritário, eloquente e calculista. Confunde obediência com sabedoria; quando derrotado, reconhece a força que não conseguiu controlar.",
      intro: "Neste império, até a verdade se curva. Veremos se a sua permanece de pé.",
      lowHealth: "Insolente… você ousa eclipsar o próprio imperador?",
      defeat: "O saber que não se curva é o único poder que não posso governar."
    }
  }
];

export const getRegion = (id) => REGIONS.find((region) => region.id === id);
