# Projeto SI

Este repositório contém a implementação de algoritmos de busca em um mapa baseado em grade utilizando a biblioteca **p5.js**. O projeto permite simular e visualizar diferentes algoritmos de busca enquanto eles encontram um caminho do ponto de partida (agente) até o alvo (comida).

## Funcionalidades

- **Algoritmos Implementados:**
  - Busca em Largura (BFS)
  - Busca em Profundidade (DFS)
  - Busca Gulosa
  - Busca de Custo Uniforme
  - Busca A\*
- Visualização em tempo real do processo de busca.
- Transições dinâmicas entre diferentes estados do jogo (menu, busca, movimentação e fim).
- Interface totalmente interativa com controle via teclado.

## Acesse o Projeto

O projeto pode ser acessado diretamente através da seguinte página:

👉 [SI Project - GitHub Pages](http://samuellna.github.io/si-project)

## Estrutura do Projeto

```
├── gridMap.js       # Gerenciamento da grade e dos tiles
├── search.js        # Algoritmos de busca (BFS, DFS, Gulosa, Custo Uniforme, A*)
├── agent.js         # Lógica e movimentação do agente
├── path.js          # Visualização e manipulação do caminho
├── board.js         # Interface do tabuleiro do jogo
├── menu.js          # Interfaces de menu (inicial e final)
├── sketch.js        # Configuração principal e loop do p5.js
├── README.md        # Documentação do projeto
```

## Controles do Teclado

- **Estado do Menu:**

  - Pressione `1` para selecionar BFS
  - Pressione `2` para selecionar DFS
  - Pressione `3` para selecionar Busca Gulosa
  - Pressione `4` para selecionar Busca de Custo Uniforme
  - Pressione `5` para selecionar Busca A\*

- **Estado Final:**
  - Pressione `ESPAÇO` para reiniciar a busca.
  - Pressione `ENTER` para reiniciar a grade e voltar ao menu principal.

## Detalhes dos Algoritmos

### 1. Busca em Largura (BFS)

Explora todos os nós no nível atual antes de passar para o próximo nível. Garante o caminho mais curto se todos os custos forem iguais.

### 2. Busca em Profundidade (DFS)

Explora o máximo possível em cada ramo antes de retroceder. Não garante o caminho mais curto.

### 3. Busca Gulosa

Escolhe o próximo nó com base na menor distância heurística ao objetivo (ignora o custo do caminho).

### 4. Busca de Custo Uniforme

Escolhe o próximo nó com base no menor custo total do caminho até o momento. Garante o caminho mais curto.

### 5. Busca A\*

Combina o custo do caminho desde o início (g) e a estimativa heurística até o objetivo (h) para priorizar nós com o menor custo total (f = g + h). Garante o caminho mais curto.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

- **Equipe**:
  - Samuel Nunes - sna2
  - Johnny Cleiton - jcfl2
  - Jose Daniel Silva - jdsc2
  - Lorenzo Fontenelle - lfc4
  - Luan Romancini - lorl
