import x from '../assets/x.svg';
import o from '../assets/o.svg';

const styles = {
  cell: {
    backgroundColor: "white",
    color: "black",
    padding: 16,
  },
};

type Props = {
  style?: React.CSSProperties;
  cellId: number;
  player?: string;
  players: string[];
};

function Cell({cellId, player, players}: Props) {
  let mark = "";

  if (players[0] === player) {
    mark = x;
  } else if (players[1] === player) {
    mark = o;
  }

  if (mark) {
    const   piece = {
      backgroundImage: `url(${mark})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
      backgroundPosition: "center",
      width: "100%",
      height: "100%",
    }

    return <div style={styles.cell}><div style={piece}/></div>;
  }



  return <div style={styles.cell} onClick={() => Rune.actions.markCell(cellId)}/>;
}

export default Cell;
