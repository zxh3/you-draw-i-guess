import React from "react";
import { useHistory } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { playerNameState } from "../states/states";
import useRoomState from "../hooks/useRoomState";
import Canvas from "./Canvas";
import PlayerList from "./PlayerList";
import ChatBox from "./ChatBox";
import socket from "../socket";

function Loading() {
  return (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
}

function Room() {
  const history = useHistory();
  const playerName = useRecoilValue(playerNameState);
  const { roomId, isLoading, serverRoomStatus } = useRoomState();

  if (!playerName) {
    const redirectTimeout = 3;
    setTimeout(() => history.push("/"), redirectTimeout * 1000);
    return (
      <div>
        You have to enter your name before joining a room. Will redirect in 3
        seconds.
      </div>
    );
  }

  console.log("serverRoomStatus", serverRoomStatus);

  if (isLoading || !serverRoomStatus) {
    return <Loading />;
  }

  const playerToggleReady = () => {
    socket.emit("player-toggle-ready", roomId);
  };

  console.log("messages");
  console.log(serverRoomStatus.messages);

  return (
    <div>
      <h1>ROOM {roomId}</h1>
      <PlayerList
        players={serverRoomStatus.players}
        playerToggleReady={playerToggleReady}
        gameState={serverRoomStatus.currentGameState}
      />
      <Canvas />
      <ChatBox roomId={roomId} messages={serverRoomStatus.messages} />
    </div>
  );
}

export default Room;
