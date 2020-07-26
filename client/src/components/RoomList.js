import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { roomIdsState, playerState } from "../states/states";
import socket from "../socket";

function RoomList() {
  const [roomIds, setRoomIds] = useRecoilState(roomIdsState);

  useEffect(() => {
    socket.emit("room-ids");
    socket.on("room-ids", (roomIds) => setRoomIds(roomIds));
    return () => socket.off("room-ids");
  });

  return (
    <div>
      All Rooms
      <ul>
        {roomIds.map((roomId) => (
          <li key={roomId}>{roomId}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
