const express = require('express')
const app = express()
const path = require("path");
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require("bcryptjs")


/*try{
    main();
}
catch(err){
    console.log(err.message);
}

async function main(){
 await mongoose.connect("mongodb+srv://karthikgk:karthik@cluster0.nxuwhxd.mongodb.net/Userlogin?retryWrites=true&w=majority")
}*/
app.use(bodyparser.json());
app.use('/', express.static(path.join(__dirname,'public')));

app.post('/api/register',async (req, res) => {
      const {name, password} = req.body;
      console.log(name);
      /*const hashedPassword = await bcrypt.hash(password,10);
       try{
        const user = new User({
            name:name,
            password:hashedPassword
        });
        
        console.log(user);
       }
       catch(err){
        console.log(err.message);
       }*/
      res.json({status:'OK'});
});

app.listen(3000, ()=>{
    console.log("server is running....");
})