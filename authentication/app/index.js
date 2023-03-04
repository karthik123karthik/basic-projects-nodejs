const express = require('express')
const ejs = require("ejs");
const app = express()
const {connectToDatabase, User} = require('./database')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")

connectToDatabase()


app.get('/',(req,res)=>{
  res.render('index')
})

app.get('/register',(req, res)=>{
  res.render("register")
})

app.post('/register',async (req, res)=>{
  const user = await User.findOne({username:req.body.username})
  if(user) return res.status(400).send("User already exists")
  const newUser = await User.create(req.body)
  res.status(201).send(newUser);
})

module.exports = app;