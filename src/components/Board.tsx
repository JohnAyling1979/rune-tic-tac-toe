import { GameState } from "../logic";
import Cell from "./Cell";

const styles = {
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gap: 5,
    width: '100%',
    height: 300,
  },
  background: {
    backgroundColor: "black",
  },
};

type Props = {
  style?: React.CSSProperties;
  game: GameState;
};

function Board({style, game}: Props) {
  return (
    <div style={{...styles.background, ...style }}>
      <div style={styles.board}>
        <Cell cellId={0} player={game.cells[0]} players={game.players} />
        <Cell cellId={1} player={game.cells[1]} players={game.players} />
        <Cell cellId={2} player={game.cells[2]} players={game.players} />
        <Cell cellId={3} player={game.cells[3]} players={game.players} />
        <Cell cellId={4} player={game.cells[4]} players={game.players} />
        <Cell cellId={5} player={game.cells[5]} players={game.players} />
        <Cell cellId={6} player={game.cells[6]} players={game.players} />
        <Cell cellId={7} player={game.cells[7]} players={game.players} />
        <Cell cellId={8} player={game.cells[8]} players={game.players} />
      </div>
    </div>
  );
}

export default Board;
