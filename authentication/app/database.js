const mongoose = require('mongoose')

const connectToDatabase = async ()=>{
  try{
       const res = await  mongoose.connect(`mongodb://0.0.0.0:27017/passport`)
       console.log("connection succesfull")
  }  
  catch(err){
    console.log(err.message);
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