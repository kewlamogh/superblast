// Setup basic express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
let players = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/views/index.html");
});

io.on('connection', (socket) => {
  socket.on("person", data => {
    players[data.name] = data.basicConfig;
  });

  socket.on("move", data => {
    players[data.whoMoved].x = data.currPos.x;
    players[data.whoMoved].y = data.currPos.y;
  });
});

server.listen(3000, () => {
  console.log("heehe")
});
