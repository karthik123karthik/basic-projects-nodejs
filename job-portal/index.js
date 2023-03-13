const express = require('express')
const app = express()
const ejs = require("ejs")
const http = require('http')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

app.get('/',(req, res)=>{
    res.render("index")
})

io.on('connection',(socket)=>{
    console.log("new User connected")
    socket.on('disconnect',()=>{
        console.log("User disconnected")
    })

    socket.on('chat message', (msg)=>{
        io.emit('chat message',msg)
    })
})


server.listen(3000,()=>{
    console.log("listening on port 3000")
})