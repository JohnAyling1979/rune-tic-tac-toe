import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import { Player, Players } from "rune-games-sdk/multiplayer";
import Header from "./components/Header.tsx";
import Board from "./components/Board.tsx";
import CurrentTurn from "./components/CurrentTurn.tsx";

const styles = {
  app: {
    padding: 16,
  },
  board: {
    marginTop: 16,
  }
};

function App() {
  const [game, setGame] = useState<GameState>();
  const [player, setPlayer] = useState<Player>()
  const [players, setPlayers] = useState<Players>();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame, players, yourPlayerId }) => {
        setGame(newGame)
        setPlayer(players[yourPlayerId ?? ""])
        setPlayers(players)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <div style={styles.app}>
      <Header player={player} game={game} />
      <Board style={styles.board} game={game} />
      <CurrentTurn game={game} players={players ?? {}} />
    </div>
  )
}

export default App
