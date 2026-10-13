# Advinhe

Jogo de adivinhar a palavra (estilo forca/jogo da velha de letras), construído em React. Uma palavra secreta é sorteada com uma dica associada; o jogador tenta descobri-la letra por letra, com um número limitado de tentativas.

## Como jogar

1. Uma palavra é sorteada aleatoriamente de uma lista pré-definida, junto com uma dica.
2. O jogador digita uma letra e confirma o palpite.
3. Se a letra existir na palavra, ela é revelada em todas as posições em que aparece (em verde); senão, fica marcada como errada (em vermelho) na lista de letras utilizadas.
4. O jogador tem um número de tentativas igual ao tamanho da palavra + 5 tentativas extras de margem.
5. O jogo termina quando a palavra é completamente descoberta (vitória) ou quando as tentativas se esgotam (derrota) — em ambos os casos um alerta é exibido e uma nova partida começa automaticamente.
6. É possível reiniciar a partida manualmente a qualquer momento pelo botão no cabeçalho (com confirmação).
7. Letras repetidas não podem ser usadas de novo — o jogo avisa se a letra já foi tentada.

## Arquitetura

- **React 19** + **TypeScript**, bootstrap com **Vite**.
- Todo o estado do jogo (palavra atual, pontuação/acertos, letras usadas) fica em `src/App.tsx`, usando apenas `useState`/`useEffect` — sem gerenciador de estado externo.
- CSS Modules (`*.module.css`) para estilos isolados por componente.
- Lista de palavras e dicas estática em `src/utils/words.ts` (`WORDS: Challenge[]`), sem backend — tudo roda no cliente.

### Componentes (`src/components`)

| Componente | Responsabilidade |
| --- | --- |
| `Header` | Logo, contador de tentativas (`current`/`max`) e botão de reiniciar |
| `Tip` | Exibe a dica da palavra atual |
| `Letter` | Uma "casinha" de letra da palavra (revelada, correta ou errada) |
| `LettersUsed` | Lista das letras já tentadas, com indicação de acerto/erro |
| `Input` | Campo de 1 caractere para o palpite |
| `Button` | Botão genérico reutilizável |

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Aplicação disponível em `http://localhost:5173` (porta padrão do Vite).

### Build de produção

```bash
npm run build
npm run preview
```

## Stack

React, TypeScript, Vite, CSS Modules.
