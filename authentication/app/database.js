const mongoose = require('mongoose')

const connectToDatabase = async ()=>{
  try{
       const res = await  mongoose.connect(`mongodb+srv://karthik1gk:karthikgkgk@cluster0.nxuwhxd.mongodb.net/users?retryWrites=true&w=majority`)
       console.log("connection succesfull")
  }  
  catch(err){
    console.log(err);
    console.log("connection failed")
  }
}

const UserSchema = new mongoose.Schema({
    name:String,
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:String
})

const User = mongoose.model("User", UserSchema)

module.exports = {connectToDatabase, User}