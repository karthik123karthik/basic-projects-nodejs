const express = require('express');
const app = express();
const data = require('./data.json');
const bodyparser = require('body-parser');
const path = require('path')

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'files')));


/*home page*/
app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
})


/* get all color codes */
app.get('/all-colors' , (req, res, next) => {
     res.json(data)
});


/* get particular code */
app.get('/:color' , (req, res, next) => {
    const {color} = req.params;
    const obj = data.find((ele)=> ele.color === color);
    res.json(obj);
});

/* adding a color and value */
app.post('/:color', (req, res) => {
    const text = req.body;
    data.push(text);
    res.redirect('/all-colors')
});

/* deleting a color */
app.delete('/:color', (req, res) => {
    const {color} = req.params;
    const filterdata = data.filter(ele => ele.color.toString() !== color.toString());
    data = filterdata.slice();
    res.send(filterdata) 
})


/* updating a color*/
app.put('/:color', (req, res) => {
    const {color} = req.params;
    const id = req.body;
    const newdata = data.map((ele)=> ele.color === color ? ele.value = id:ele);
    res.send(newdata)
})




app.use((req, res, next) => {
    res.send(req.url)
})
app.listen(3000);   