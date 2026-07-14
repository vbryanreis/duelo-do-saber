# Código-fonte

O MVP usa JavaScript modular sem dependências externas:

- `core/battle-engine.js`: vida, dano, energia, combos e habilidades;
- `core/question-validator.js`: validação estrutural e educacional;
- `core/question-repository.js`: seleção por região sem repetição imediata;
- `config/regions.js`: cinco regiões e conceitos iniciais dos rivais;
- `data/demo-pack.js`: 62 questões baseadas exclusivamente no GDD;
- `services/save-service.js`: save versionado em `localStorage`;
- `services/audio-manager.js`: música adaptada à tela e região;
- `app.js`: telas, navegação e integração entre os módulos.

As regras de batalha não dependem do DOM e são cobertas por testes Node.
