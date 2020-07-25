class Message {
  constructor(player, messageText) {
    this.player = player;
    this.messageText = messageText;
    this.createTime = new Date();
  }
}

class Player {
  constructor(socketId, name) {
    this.socketId = socketId;
    this.name = name;
    this.score = 0;
    this.ready = false; // if all players in the room are ready then the game will start
  }
}

const GAME_STATE = {
  WAIT: "WAIT",
  START: "START",
};

class Room {
  constructor(roomId) {
    this.roomId = roomId;
    this.createTime = new Date();
    this.players = [];
    this.messages = [];
    this.currentGameState = GAME_STATE.WAIT; // always be one of the property of GAME_STATE
    this.currentDrawerSocketId = null; // always be non-null if game state is START
    this.currentDrawerRemainingTime = null; // always be non-null integer if game state if START; represent in seconds
    this.remainingRoundsBeforeEnd = null;
  }

  handleUserJoin() {
    console.log("handleUserJoin");
  }
}

module.exports = Room;
