const Message = require("./Message");
const Player = require("./Player");
const {
  ROUND_TIME,
  NUM_ROUNDS,
  GAME_STATE,
  GAME_STATUS_UPDATE_INTERVAL,
} = require("./constants");

class Room {
  constructor(roomId) {
    this.roomId = roomId;
    this.createdTime = Date.now();
    this.players = [];
    this.messages = [];
    this.currentGameState = GAME_STATE.WAIT; // always be one of the property of GAME_STATE
    this.currentDrawerIndex = null; // always be non-null if game state is START
    this.currentDrawerRemainingTime = null; // always be non-null integer if game state if START; represent in seconds
    this.currentRound = null;
    this.totalRounds = null;
    this.roundTimer = null;
  }

  addPlayer(socketId, name) {
    const player = new Player(socketId, name);
    this.players.push(player);
  }

  removePlayer(socketId) {
    const index = this.players.findIndex(
      (player) => player.socketId === socketId
    );
    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  playerToggleReady(socketId, boardcastRoomStatus) {
    const player = this.players.find((player) => player.socketId === socketId);
    if (player) {
      player.ready = !player.ready;
    }
    if (this.isEveryOneReady() && this.currentGameState === GAME_STATE.WAIT) {
      this.startGame(boardcastRoomStatus);
    }
    boardcastRoomStatus();
  }

  playerSendMessage(socketId, text, boardcastRoomStatus) {
    const player = this.players.find((player) => player.socketId === socketId);
    if (player) {
      const message = new Message(player, text);
      this.messages.push(message);
      boardcastRoomStatus();
    }
  }

  startGame(boardcastRoomStatus) {
    this.currentGameState = GAME_STATE.START;
    this.currentDrawerIndex = 0;
    this.currentDrawerRemainingTime = ROUND_TIME;
    this.currentRound = 1;
    this.totalRounds = NUM_ROUNDS;
    this.players.forEach((player) => (player.ready = false));
    this.roundTimer = setInterval(
      () => this.updateGameStatus(boardcastRoomStatus),
      GAME_STATUS_UPDATE_INTERVAL * 1000
    );
  }

  stopGame(boardcastRoomStatus) {
    clearInterval(this.roundTimer);
    this.currentGameState = GAME_STATE.WAIT; // always be one of the property of GAME_STATE
    this.currentDrawerIndex = null; // always be non-null if game state is START
    this.currentDrawerRemainingTime = null; // always be non-null integer if game state if START; represent in seconds
    this.currentRound = null;
    this.totalRounds = null;
    this.roundTimer = null;
    boardcastRoomStatus();
  }

  updateGameStatus(boardcastRoomStatus) {
    if (
      this.currentDrawerRemainingTime <= 1 ||
      this.players.every((player) => player.guessRight)
    ) {
      this.currentDrawerRemainingTime = ROUND_TIME + 1;
      this.currentDrawerIndex += 1;
      if (this.currentDrawerIndex >= this.players.length) {
        this.currentDrawerIndex = 0;
        this.currentRound += 1;
        if (this.currentRound > this.totalRounds) {
          this.stopGame(boardcastRoomStatus);
        }
      }
    }

    if (this.currentGameState === GAME_STATE.START) {
      this.currentDrawerRemainingTime -= GAME_STATUS_UPDATE_INTERVAL;
    }

    boardcastRoomStatus();
  }

  isEveryOneReady() {
    return this.players.every((player) => player.ready);
  }

  getPlayerCount() {
    return this.players.length;
  }

  getRoomStatus() {
    return {
      roomId: this.roomId,
      createdTime: this.createdTime,
      players: this.players,
      messages: this.messages,
      currentGameState: this.currentGameState,
      currentDrawerIndex: this.currentDrawerIndex,
      currentDrawerRemainingTime: this.currentDrawerRemainingTime,
      currentRound: this.currentRound,
      totalRounds: this.totalRounds,
    };
  }
}

module.exports = Room;
