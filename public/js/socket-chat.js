var socket = io();

// con esta sentencia estamos obteniendo los parametros que vienen en ele url
var params = new URLSearchParams(window.location.search);

// estamos diciendo que se si la variabel params tiene el objeto nombre si no lo tiene  lo redireccionara a la pagina de index.hmtl
// si lo tiene seguira corrriendo el programa normalmente
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('EL nombre es necesario');
}

var nombre = params.get('nombre')
// aqui estamos recibiendo el nombre y sala, lo recibimos del frontend
var usuario = {
    nombre,
    sala: params.get('sala')
}



socket.on('connect', function () {
    console.log('Conectado al servidor');

    // emito un mensaje al servidor que contiene la el nombre del usuario
    // y un callback que por parte del servidor devolera los usuarios conectados por que se estarab guardando en un array
    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuario Conectados', resp)
        renderizarUsuarios(resp);
    });


});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Desde esta parte se esta enviando el msj
// Enviar información
// socket.emit('enviarMensaje', {
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function (mensaje) {

    renderizarMensajes(mensaje);

});

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersona', function (personas) {
    renderizarUsuarios(personas);
});


// Mensaje privados
// el cliente escuchando cuando el envien un msj privado para luego escribirlo en consola
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje privado: ', mensaje);
});