const express = require('express')
const passport = require('passport')
const session = require('express-session')
const ejs = require("ejs");
const app = express()
const {connectToDatabase, User} = require('./database')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const mongoose = require('mongoose');

app.set("view engine","ejs")

connectToDatabase()
const db = mongoose.connection;

console.log(db.collections)

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