# Publicação inicial no GitHub

O repositório foi preparado com documentação, schema e um commit inicial local.

## Opção A — Usando o arquivo bundle

1. Crie no GitHub um repositório vazio chamado `duelo-do-saber`.
2. Clone o bundle localmente:

```bash
git clone -b main duelo-do-saber.bundle duelo-do-saber
cd duelo-do-saber
```

3. Adicione o repositório remoto e envie a branch principal:

```bash
git remote add origin https://github.com/SEU-USUARIO/duelo-do-saber.git
git push -u origin main
```

## Opção B — Usando o ZIP

1. Crie no GitHub um repositório vazio chamado `duelo-do-saber`.
2. Extraia o ZIP.
3. Na pasta extraída, execute:

```bash
git init -b main
git add .
git commit -m "docs: establish Duelo do Saber project baseline"
git remote add origin https://github.com/SEU-USUARIO/duelo-do-saber.git
git push -u origin main
```

## Depois da publicação

- conecte Codex, Claude Code ou outro agente ao repositório;
- peça ao agente para ler `AGENTS.md` antes de alterar arquivos;
- mantenha `docs/GDD.md` como fonte única da verdade;
- use branches e pull requests para mudanças relevantes;
- atualize `docs/DECISIONS.md` quando uma decisão de design ou tecnologia mudar.
