class Player {
  constructor(socketId, name) {
    this.socketId = socketId;
    this.name = name;
    this.score = 0;
    this.ready = false; // if all players in the room are ready then the game will start
    this.guessRight = false;
  }
}

module.exports = Player;
