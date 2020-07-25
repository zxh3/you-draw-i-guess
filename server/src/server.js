const express = require('express');
const socketio = require('socket.io');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("HELLO");
});

app.listen(port, () => console.log(`App is listening on port ${port}`));