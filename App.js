
const express = require('express');
const decodeRasp = require('./decodeRasp.js');
const bodyParser = require('body-parser');
const request = requiere('request');
const app = express();

app.use(express.static('Public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');  
});

app.post('/',decodeRasp.insert);

app.get('/refresh',decodeRasp.get);

app.post('/search',decodeRasp.search);

app.post('/stateChange',decodeRasp.change);

app.listen(3000, function(){
    console.log('Server started at port 3000'); 
});


  