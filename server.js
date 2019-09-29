// jshint esversion: 6
// Backbone of server
const dgram = require('dgram');
const express = require('express');
const mysql = require('mysql');
const decodSyrus = require('./decodSyrus.js');
const IP_ADRESS = '192.168.1.67';
const UDP_PORT = '50000';
const TCP_PORT = 3000;

const server = dgram.createSocket('udp4');
const app = express();

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  decodSyrus.insert(decodSyrus.decode(msg));
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});


server.bind(UDP_PORT, IP_ADRESS);

app.use(express.static('Public'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/ubicacion', function(request, response){
  response.sendFile(__dirname + '/index_ubicacion.html');
});

app.get('/historico', function(request, response){
  response.sendFile(__dirname + '/index_historico.html');
});

app.get('/Appdata',decodSyrus.get);


app.get('/search',decodSyrus.search);

app.listen(TCP_PORT, function(){
  console.log('Server started at port ' + TCP_PORT.toString());
});
