const express = require('express')
const app = express()
const path = require("path");
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')));

app.post('/api/register',(req, res) => {
      res.json({status:'OK'});
});



app.listen(3000, ()=>{
    console.log("server is running....");
})