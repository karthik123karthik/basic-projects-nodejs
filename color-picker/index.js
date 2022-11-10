const express = require('express');
const app = express();
const data = require('./data.json');
const bodyparser = require('body-parser');
const path = require('path')

app.use(bodyparser.urlencoded({extended:false}));

app.get('/:color' , (req, res, next) => {
    const {color} = req.params;
    const obj = data.find((ele)=> ele.color === color);
    res.send(obj);
});

app.use(express.static('files'));

app.get('/',(req, res, next) => {
    res.sendFile(path.join(__dirname , '/files' , '/index.html'));
});

app.use((req, res, next) => {
    res.send(req.url)
})
app.listen(3000);   