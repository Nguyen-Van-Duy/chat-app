import express from 'express'
import http from "http";
import bodyParser from "body-parser";
import posts from "./routers/Conversations.js"
import {Server} from "socket.io"
import mongoose from 'mongoose';
import dotenv from "dotenv";
import route from './routers/index.js';
import cors from 'cors'
dotenv.config();

var app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '30mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb'}))

const URI = process.env.URI

// app.use('/', posts)
app.use(cors())
route(app)

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to Mongoose');
  }).catch(err => {
    console.log('err', err);
  })

  //socket
  const socketIo = new Server(server, {
    cors: {
      origin: "*",
    }
  })

  let users = []
  const addUsers = (userId, socketId) => {
    !users.some(item=> item.userId === userId) && users.push({userId, socketId})
    console.log(users);
  }
  const removeUser = (socketId) => {
    users = users.filter(user=> user.socketId !== socketId)
  }

socketIo.on("connection", (socket) => {
  console.log("a user connected.");

  // when connect 
  socket.on("addUser", (userId)=> {
    console.log("user id",userId);
    
    addUsers(userId, socket.id)
    console.log(" array user id",users);
    socketIo.emit("getUsers", users)

  })

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    socketIo.emit("getUsers", users);
    console.log("user remove: ", users);
  });








  // console.log("New client connected" + socket.id);

  // socket.emit("getId", socket.id);

  // socket.on("sendDataClient", function(data) {
  //   console.log(data)
  //   socketIo.emit("sendDataServer", { data });
  // })

  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  // });
});



server.listen(5000, () => {
    console.log('Server đang chay tren cong 5000');
});
