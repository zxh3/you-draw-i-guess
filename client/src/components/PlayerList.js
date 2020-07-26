import React from "react";
import { List } from "semantic-ui-react";
import Player from "./Player";

function PlayerList({ players, playerToggleReady, gameState }) {
  console.log(players);

  return (
    <div>
      PlayerList
      <List>
        {players.map((player) => (
          <Player
            key={player.socketId}
            player={player}
            playerToggleReady={playerToggleReady}
            gameState={gameState}
          />
        ))}
      </List>
    </div>
  );
}

export default PlayerList;
