const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { pingTimeout: 60000 });
const Room = require("./Room");
const WordList = require("./WordList");

const port = process.env.PORT || 5000;

const rooms = new Map(); // roomId => Room
const wordLists = []; // a list of WordList
wordList = new WordList("animal", ["cat", "dog", "elephant"]);

rooms.set("test-room-1", new Room("test-room-1"));
rooms.set("test-room-2", new Room("test-room-2"));
rooms.set("test-room-3", new Room("test-room-3"));

app.get("/", (req, res) => {
  res.send("HELLO");
});

io.on("connection", (socket) => {
  socket.on("room-ids", () => {
    socket.emit("room-ids", getRoomIds());
  });

  socket.on("join-room", ({ playerName, roomId }) => {
    if (!playerName || !roomId) {
      return;
    }

    // find room if exists
    let room = rooms.get(roomId);
    if (!room) {
      // create a new Room
      room = new Room(roomId);
      rooms.set(roomId, room);
    }
    room.addPlayer(socket.id, playerName);
    socket.join(roomId);
    boardcastRoomStatus(room);
  });

  socket.on("player-toggle-ready", (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
      room.playerToggleReady(socket.id, () => boardcastRoomStatus(room));
    }
  });

  socket.on("player-guess-input", ({ message, roomId }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.playerSendMessage(socket.id, message, () =>
        boardcastRoomStatus(room)
      );
    }
  });

  socket.on("disconnecting", () => {
    Object.keys(socket.rooms).forEach((socketRoomId) => {
      if (socketRoomId === socket.id) {
        return;
      }
      const room = rooms.get(socketRoomId);
      if (room) {
        room.removePlayer(socket.id);
        boardcastRoomStatus(room);
        // if there's no players in the room, delete the room
        if (room.getPlayerCount() === 0) {
          rooms.delete(socketRoomId);
        }
      }
    });
  });
});

server.listen(port, () => console.log(`App is listening on port ${port}`));

// util functions

function getRoomIds() {
  return Array.from(rooms.keys());
}

function boardcastRoomStatus(room) {
  // boardcast the updated room status to all the members of this room
  io.to(room.roomId).emit("boardcast-room-status", room.getRoomStatus());
}
