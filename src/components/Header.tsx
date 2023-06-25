import { Player } from "rune-games-sdk/multiplayer";
import { GameState } from "../logic";

type Props = {
  player: Player | undefined;
  game: GameState;
};

function Header({player, game}: Props) {
  if (!player) {
    return null;
  }

  return (
    <div style={{display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'end'}}>
      <div>{game.players[0] === player?.playerId ? 'X' : 'O'}</div>
      <div>{player?.displayName}</div>
      <img src={player?.avatarUrl} height={40} width={40}/>
    </div>
  );
}

export default Header;
