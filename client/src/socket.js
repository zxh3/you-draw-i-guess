import io from "socket.io-client";

const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === "development";
const LOCAL_SERVER_URL = "http://localhost:5000";
const PRODUCTION_SERVER_URL = "https://youdrawiguess.herokuapp.com";

const SOCKET_IO_SERVER_URL = IS_DEVELOPMENT_MODE
  ? LOCAL_SERVER_URL
  : PRODUCTION_SERVER_URL;

const socket = io(SOCKET_IO_SERVER_URL);

export default socket;
