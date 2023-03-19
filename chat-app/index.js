const express = require("express");
const sessions = require("express-session");
const cookieparser = require("cookie-parser");
const app = express();
const ejs = require("ejs");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");
const { User, Conversation } = require("./Model/index");
const bodyparser = require("body-parser");

///// creating an express session /////////
let oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: oneDay },
  })
);

app.use(cookieparser());
///////////////////////////////////

// database related ---------
const connectttodatabase = async () => {
  try {
    const db = await mongoose.connect("mongodb://0.0.0.0:27017/chat-app");
    console.log("connected");
    await Conversation.deleteMany({});
  } catch (err) {
    console.log(err);
  }
};
connectttodatabase();
/////////////////////////////////////////

// serving static filezs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let session = req.session;
  if (session.userid) {
    res.redirect("/chat");
  } else {
    res.render("login");
  }
});
let user;

app.post("/chat", (req, res) => {
  user = req.body.username;
  password = req.body.password;
  let session = req.session;
  session.userid = user;
  console.log(session)
  res.redirect("/chat");
});

app.get("/chat", async (_, res) => {
  const arr = await Conversation.find({});
  res.render("index", { conversations: arr });
});

/////// socket.io connection
io.on("connection", async (socket) => {
  try {
    let newmessage = new Conversation({
      type: "notification",
      user: `${user}`,
      message: `${user} joined`,
    });
    await newmessage.save();
    io.emit("new user", user);
    socket.on("disconnect", async () => {
      let newmessage = new Conversation({
        type: "notification",
        user: `${user}`,
        message: `${user} left`,
      });
      await newmessage.save();
      io.emit("disconnected", user);
    });

    socket.on("chat message", async (msg) => {
      let newmessage = new Conversation({
        type: "message",
        user: `${socket.id}`,
        message: msg,
      });
      await newmessage.save();
      socket.broadcast.emit("chat message", msg);
    });
  } catch (err) {
    console.log(err);
  }
});

///////////////////////////////////////////////////////

server.listen(3000, () => {
  console.log("listening on port 3000");
});
