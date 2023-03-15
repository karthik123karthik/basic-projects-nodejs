const express = require("express");
const app = express();
const ejs = require("ejs");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");
const User = require('./Model/index')



// database related ---------
const connectttodatabase = async () => {
  try {
    const db = await mongoose.connect("mongodb://0.0.0.0:27017/chat-app");
    console.log("connected");
    let newuser = new User({name:"karthik gk",email:"kar2214@gmail.com",password:"karthik123"});
    await newuser.save()
    console.log("user saved")
  } catch (err) {
    console.log(err);
  }
};
connectttodatabase();




/////////////////////////////////////////














app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));















app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  io.emit("new user", socket.id);
  socket.on("disconnect", () => {
    io.emit("disconnected", socket.id);
  });

  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
