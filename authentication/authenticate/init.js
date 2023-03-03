const passport = require('passport')
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User  = {
    username:"test name",
    passwordHash:"bcrypted hash password",
    id:1
}

passport.use(new LocalStrategy(
(username, password, done)=>{
    findUser(username, (err, user)=>{
        if(err){
            return done(err)
        }

        if(!user){
            return done(null, false)
        }

        bcrypt.compare(password, User.passwordHash, (err, isValid)=>{
            if (err) {
                return done(err)
              }
              if (!isValid) {
                return done(null, false)
              }
              return done(null, user)
        })
    })
}
))

