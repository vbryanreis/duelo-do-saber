# Especificação do Pacote de Questões

**Formato:** JSON UTF-8  
**Versão inicial:** 1.0

## Regras obrigatórias

- Cada questão deve possuir exatamente cinco alternativas: A, B, C, D e E.
- Apenas uma alternativa pode ser correta.
- Cada alternativa possui `card_name` e `description`.
- `card_name` deve ser curto o bastante para o título de uma carta.
- `description` contém o texto completo da alternativa.
- A explicação do gabarito é obrigatória.
- O conteúdo deve se basear somente no material fornecido pelo usuário.

## Estrutura mínima

```json
{
  "format_version": "1.0",
  "package_id": "direito-tributario-aula-00",
  "title": "Direito Tributário — Aula 00",
  "description": "Questões criadas a partir da Aula 00.",
  "language": "pt-BR",
  "generated_at": "2026-07-14",
  "subjects": ["Direito Tributário"],
  "questions": []
}
```

## Dificuldades aceitas

- `easy`
- `medium`
- `hard`

## Estilos aceitos

- `concept`
- `memorization`
- `literalness`
- `interpretation`
- `comparison`
- `application`
- `practical_case`
- `calculation`
- `exception`
- `trick`
- `association`
- `sequence`
- `interdisciplinary`

Uma questão pode possuir mais de um estilo.

## Exemplo de questão

```json
{
  "id": "dt-competencia-001",
  "subject": "Direito Tributário",
  "topic": "Competência Tributária",
  "subtopic": "Conceito",
  "difficulty": "easy",
  "styles": ["concept", "comparison"],
  "prompt": "O que caracteriza a competência tributária?",
  "alternatives": [
    {
      "id": "A",
      "card_name": "Poder de Fiscalização",
      "description": "Atividade administrativa destinada a verificar o cumprimento das obrigações tributárias.",
      "explanation": "Fiscalização não se confunde com a competência constitucional para instituir o tributo."
    },
    {
      "id": "B",
      "card_name": "Poder de Instituir Tributos",
      "description": "Aptidão atribuída pela Constituição para criar tributos por meio de lei.",
      "explanation": "Esta é a definição adequada de competência tributária."
    },
    {
      "id": "C",
      "card_name": "Capacidade Tributária Ativa",
      "description": "Aptidão para arrecadar e fiscalizar tributos em nome do ente competente.",
      "explanation": "Capacidade ativa está relacionada à posição de sujeito ativo da obrigação, não ao poder constitucional de instituir."
    },
    {
      "id": "D",
      "card_name": "Obrigação Tributária",
      "description": "Relação jurídica que surge com a ocorrência do fato gerador.",
      "explanation": "A obrigação surge após o fato gerador e não define competência tributária."
    },
    {
      "id": "E",
      "card_name": "Imunidade Tributária",
      "description": "Limitação constitucional que impede a incidência de determinados tributos.",
      "explanation": "Imunidade é uma limitação constitucional ao poder de tributar."
    }
  ],
  "correct_alternative": "B",
  "correct_explanation": "Competência tributária é a aptidão constitucional para instituir tributos por meio de lei.",
  "hint": "Diferencie o poder constitucional de criar do poder administrativo de cobrar.",
  "source_reference": "Trecho do material sobre competência tributária.",
  "keywords": ["competência", "Constituição", "instituição de tributos"]
}
```

## Validações obrigatórias

1. JSON válido.
2. `format_version` suportada.
3. IDs de pacote e questões não duplicados.
4. Exatamente cinco alternativas.
5. IDs A–E sem repetição.
6. Uma alternativa correta existente.
7. Campos textuais não vazios.
8. Dificuldade reconhecida.
9. Pelo menos um estilo reconhecido.
10. Explicação correta presente.

## Validações de qualidade com aviso

- alternativas idênticas ou muito semelhantes;
- uma alternativa muito maior que as demais;
- nome de carta excessivamente longo;
- explicação que apenas repete a alternativa;
- ausência de referência;
- perguntas possivelmente duplicadas;
- distribuição insuficiente por dificuldade;
- dica que revela diretamente a resposta.
