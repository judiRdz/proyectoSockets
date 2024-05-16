var socket = io.connect('http://localhost:3100',{'forceNew':true});
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(elem, index){
        return(`<div>
                <strong>${elem.autor}</strong>
                <em>${elem.texto}</em>
                </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

//cada ves que alguien presione el boton enviar en el formulario
//el cliente emite un nuevo mensaje y manda el payload
function addMessage(e){
    var payload = {
        autor: document.getElementById('username').value, // Agregar comillas
        texto: document.getElementById('texto').value     // Agregar comillas
    };
    socket.emit('new-message', payload);
    return false;
};
