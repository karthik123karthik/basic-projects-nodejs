const express = require('express');
const app = express();
const data = require('./data.json');

app.get('/:color' , (req, res, next) => {
    const {color} = req.params;
    const obj = data.find((ele)=> ele.color === color);
        
})

app.listen(3000);