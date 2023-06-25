import { Players } from "rune-games-sdk/multiplayer";
import { GameState } from "../logic";

const styles = {
  currentTurn: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
};

function CurrentTurn({ game, players }: { game: GameState, players: Players }) {
  const currentPlayerId = game.players.find((p) => p !== game.lastPlayer);

  if (!currentPlayerId) {
    return null;
  }

  return (
    <div style={styles.currentTurn}>
      <img src={players[currentPlayerId].avatarUrl} height={30} width={30}/><span>turn.</span>
    </div>
  )
}

export default CurrentTurn;
