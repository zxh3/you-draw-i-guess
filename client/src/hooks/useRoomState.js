import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { playerNameState } from "../states/states";
import socket from "../socket";

function useRoomState() {
  const { id } = useParams();
  const [roomState, setRoomState] = useState({
    roomId: id,
    isLoading: true,
    serverRoomStatus: null,
  });
  const playerName = useRecoilValue(playerNameState);

  useEffect(() => {
    // subscribe to roomState update using socketio
    socket.emit("join-room", { playerName, roomId: id });
    socket.on("boardcast-room-status", (serverRoomStatus) => {
      setRoomState({ ...roomState, isLoading: false, serverRoomStatus });
      console.log(serverRoomStatus);
    });

    return () => socket.off("join-room"); // unsubscribe from roomState update
  }, [id]);

  return roomState;
}

export default useRoomState;
