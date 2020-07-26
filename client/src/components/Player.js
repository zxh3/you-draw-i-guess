import React from "react";
import { Checkbox, List } from "semantic-ui-react";
import socket from "../socket";

function Player({ player, playerToggleReady, gameState }) {
  const { socketId, name, score, ready } = player;

  const ReadyCheckBox = () => {
    if (socketId === socket.id) {
      return <Checkbox checked={ready} onClick={playerToggleReady} />;
    } else {
      return <Checkbox checked={ready} disabled />;
    }
  };

  return (
    <List.Item>
      <List.Header>{name}</List.Header>
      <List.Description>
        <span>score: {score}</span>
        <span
          style={{
            marginLeft: "6px",
            visibility: gameState === "START" ? "hidden" : "visible",
          }}
        >
          ready: <ReadyCheckBox />
        </span>
      </List.Description>
    </List.Item>
  );
}

export default Player;
