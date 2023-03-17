const express = require("express");
const app = express();
const ejs = require("ejs");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");
const {User,Conversation} = require('./Model/index')



// database related ---------
const connectttodatabase = async () => {
  try {
    const db = await mongoose.connect("mongodb://0.0.0.0:27017/chat-app");
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
};
connectttodatabase();
/////////////////////////////////////////




// serving static filezs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



app.get("/", async (_, res) => {
  const arr = await Conversation.find({});
  res.render("index",{conversations: arr});
});

/////// socket.io connection
io.on("connection", async(socket) => {
  try{
  let newmessage = new Conversation({type:"notification", user:`${socket.id}`, message:`${socket.id} joined`});
   await newmessage.save();
  io.emit("new user", socket.id);
  socket.on("disconnect", async() => {
    let newmessage = new Conversation({type:"notification", user:`${socket.id}`, message:`${socket.id} left`});
    await newmessage.save();
    io.emit("disconnected", socket.id);
  });

  socket.on("chat message", async(msg) => {
    let newmessage = new Conversation({type:"message", user:`${socket.id}`, message:msg});
    await newmessage.save();
    socket.broadcast.emit("chat message", msg);
  });
}
catch(err){
  console.log(err);
}
});
///////////////////////////////////////////////////////

server.listen(3000, () => {
  console.log("listening on port 3000");
});
