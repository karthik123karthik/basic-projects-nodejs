const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type:String,require:true, unique:true},
    email:{type:String},
    password:{type:String, require:true, unique:true}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;