const express = require('express');
const app = express();
require('dotenv').config();
const route = require('./routes');
const http = require('http');
const { Server } = require("socket.io");
var cors = require('cors')
const port = process.env.PORT;
const mongo = require('./services/mongo');
const {logger}=require('./services/Logger')
mongo.connect();
app.use(express.json());
app.use(cors({
  origin: function(origin, callback){
    if (!origin) {
      return callback(null, true);
    }
    return callback(null, true);
  }
}));


var server = http.createServer(app).listen(port, (req, res) => {
  logger.log('debug',"Server running on", port);
});
var socketIO = require("socket.io");
var io = socketIO(server, {
  cors: {
    origin: '*',
  }
});
global.io = io //Importent line


route(app);

// app.listen(port, "0.0.0.0", () => {
//   console.log(`Listening at http://localhost:${port}`);
// });
