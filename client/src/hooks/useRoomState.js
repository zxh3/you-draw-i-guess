import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

// socketio setup
const DEVELOPMENT_MODE = "development";
const SOCKET_IO_SERVER_URL =
  process.env.NODE_ENV === DEVELOPMENT_MODE
    ? "http://localhost:5000"
    : "https://youdrawiguess.herokuapp.com";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

function useRoomState() {
  const { id } = useParams();
  const [roomState, setRoomState] = useState({ roomId: id, isLoading: true });

  useEffect(() => {
    // subscribe to roomState update using socketio
    console.log("connect to server using socketIO...");
    console.log(SOCKET_IO_SERVER_URL);
    const socket = io(SOCKET_IO_SERVER_URL);
    return () => {}; // unsubscribe from roomState update
  }, [id]);

  return roomState;
}

export default useRoomState;
