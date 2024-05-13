var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require ('socket.io')(server);

var messages= [{
    id: 1,
    texto: "HELLO EVERYNYA HOW ARE YOU FINE THANK YOU",
    autor: "Perla Judith Rodriguez Salinas"
}]

app.use(express.static('public'));

app.get('/', function(req, res){
    res.status(200).send("Hola Mundo");
});

io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket')
    socket.emit('messages', messages);
    socket.on('new-message', function(data){
        //para poder guardar mensajes lo ideal es usar una base d datos pero aqui vamos a usar arrays
        messages.push(data);
    });
});

server.listen(3100, function(){
    console.log("El servidor esta corriendo en http://localhost:3100")
});