import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface GameState {
  players: string[];
  cells: string[];
  winCombo: number[] | null;
  lastPlayer: string | null;
  gameOver: boolean;
}

type GameActions = {
  markCell: (cellId: number) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

const findWinningCombo = (game: GameState): number[] | null => {
  const lines = [
    [0, 1, 2], // Horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;

    if (game.cells[a] && game.cells[a] === game.cells[b] && game.cells[a] === game.cells[c]) {
      return line;
    }
  }

  return null;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (players): GameState => ({
    players,
    cells: Array(9).fill(null),
    lastPlayer: players[1],
    winCombo: null,
    gameOver: false,
  }),
  actions: {
    markCell: (cellId, { game, playerId }) => {
      if (game.lastPlayer === playerId || game.cells[cellId]) {
        throw Rune.invalidAction();
      }

      game.cells[cellId] = playerId;
      game.lastPlayer = playerId;

      game.winCombo = findWinningCombo(game);

      game.gameOver = !!game.winCombo || !game.cells.some((cell) => cell === null);

      if (game.gameOver) {
        if (game.winCombo) {
          const winner = playerId;
          const loser = game.players.find((p) => p !== playerId) as string;

          Rune.gameOver({
            players: {
              [winner]: "WON",
              [loser]: "LOST",
            },
          });
        } else {
          Rune.gameOver({
            players: {
              [game.players[0]]: "LOST",
              [game.players[1]]: "LOST",
            },
          });
        }
      }
    },
  },
  events: {
    playerJoined: () => {
      // Handle player joined
    },
    playerLeft() {
      // Handle player left
    },
  },
})
