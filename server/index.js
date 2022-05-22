import express from 'express'
import http from "http";
import bodyParser from "body-parser";
import posts from "./routers/Conversations.js"
import {Server} from "socket.io"
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

var app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '30mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb'}))

const URI = process.env.URI

app.use('/', posts)

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to Mongoose');
  }).catch(err => {
    console.log('err', err);
  })

const socketIo = new Server(server, {
  cors: {
    origin: "*",
}
})

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function(data) {
    console.log(data)
    socketIo.emit("sendDataServer", { data });
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
    console.log('Server đang chay tren cong 5000');
});
