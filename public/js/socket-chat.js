var socket = io();

// con esta sentencia estamos obteniendo los parametros que vienen en ele url
var params = new URLSearchParams(window.location.search);

// estamos diciendo que se si la variabel params tiene el objeto nombre si no lo tiene  lo redireccionara a la pagina de index.hmtl
// si lo tiene seguira corrriendo el programa normalmente
if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('EL nombre es necesario');
}

var nombre = params.get('nombre')
var usuario = {
    nombre
}



socket.on('connect', function () {
    console.log('Conectado al servidor');

    // emito un mensaje al servidor que contiene la el nombre del usuario
    // y un callback que por parte del servidor devolera los usuarios conectados por que se estarab guardando en un array
    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuario Conectados', resp)
    });


});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function (mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersona', function (personas) {
    console.log(personas);
});