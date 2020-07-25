const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { pingTimeout: 60000 });
const Room = require("./Room");
const WordList = require("./WordList");

const port = process.env.PORT || 5000;

const rooms = new Map(); // roomId => Room
const wordLists = []; // a list of WordList

rooms['test-room'] = new Room('test-room');

app.get("/", (req, res) => {
  res.send("HELLO");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);

  socket.emit("room-ids", getRoomIds());

  socket.on("join-room", () => {});

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(port, () => console.log(`App is listening on port ${port}`));

function getRoomIds() {
  return Array.from(rooms.keys());
}
