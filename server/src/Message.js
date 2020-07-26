const { v4: uuidv4 } = require("uuid");

class Message {
  constructor(player, text) {
    this.id = uuidv4();
    this.player = player;
    this.text = text;
    this.createdTime = Date.now();
  }
}

module.exports = Message;
