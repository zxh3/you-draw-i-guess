import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import useRoomState from "../hooks/useRoomState";

function Loading() {
  return (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
}

function Room() {
  const { roomId, isLoading } = useRoomState();
  console.log("isLoading", isLoading);

  return (
    <div>
      <h1>ROOM {roomId}</h1>
      <div>{isLoading ? <Loading /> : "Loaded"}</div>
    </div>
  );
}

export default Room;
