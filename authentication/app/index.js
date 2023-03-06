const express = require('express')
const app = express()
const {connectToDatabase, User} = require('./database')
const passport = require("passport");
const {initializePassport} = require("../authenticate/init")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")

//connectToDatabase()

initializePassport(passport);


app.get('/',(req,res)=>{
  res.render('index')
})

app.use(express.static("public"));


app.get('/register',(req, res)=>{
  res.render("register")
})

app.post("/login",async (req, res)=>{
   const user = await User.findOne(req.body);
   if(user){
    res.redirect("/");
    return;
   }
   else{
    res.status(404).send("user not found");
    return;
   }
})


app.get("/login",(req, res)=>{
  res.render("login")
})

app.post('/register',async (req, res)=>{
  const user = await User.findOne({username:req.body.username})
  if(user) return res.status(400).send("User already exists")
  const newUser = await User.create(req.body)
  res.status(201).send(newUser);
})

module.exports = app;