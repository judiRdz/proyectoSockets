var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//array que guarda los mensajes
var messages = [{
    id: 1,
    texto: "olap",
    autor: "Perla Judith Rodriguez Salinas"
}];

app.use(express.static('public'));

app.get('/', function(req, res){
    res.status(200).send("Hola Mundo");
});

io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket')
    socket.emit('messages', messages);
    //Ahora queremos escuchar los mensajes mandados por el cliente
    socket.on('new-message', function(data){
        messages.push(data); // Agregar el nuevo mensaje al array
        //queremos que todos los mensajes se manden a todos los clientes
        io.sockets.emit('messages', messages);
    });
});

server.listen(3100, function(){
    console.log("El Servidor esta corriendo en http://localhost:3100");
});
