const axios = require('axios').default
const express = require('express')
const app = express()


// api - key  c7d63242c9b59ba2457cabf0809934e3
app.get('/',async (req, res, next) => {
    try{
         let response  = await axios.get('https://indreed.herokuapp.com/api/jobs')
         console.log(response.data)
         let data = response.data;
         res.send(data)
    }
    catch(err){
        res.send(err.message)
    }
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})