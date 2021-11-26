const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.server = http.createServer(this.app);

    this.io = socketIO(this.server);
  }

  middleware() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middleware();
    this.configureSockets();
    this.server.listen(this.port, () => {
      console.log(`server is running in ${this.port}`);
    });
  }
}

module.exports = Server;
