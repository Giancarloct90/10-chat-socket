// funciones para renderizar usuarios

var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

//referencias de jquery

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

function renderizarMensajes(mensaje) {
    var html = '';
    html += '<li>';
    html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" />';
    html += '</div>';
    html += '<div class="chat-content">';
    html += '<h5>' + mensaje.nombre + '</h5>';
    html += '<div class="box bg-light-info">' + mensaje.mensaje + '</div>';
    html += '</div>';
    html += '<div class="chat-time">10:56 am</div>';
    html += '</li>';

    divChatbox.append(html);
}

function renderizarUsuarios(personas) {
    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsuarios.html(html);
}



// listeners
// esta es una funcion en la que usamos jquery, le estamos diciendo que el div de usuarios, cuando se haga click en cualquier etiqueta a, que ejecute una accion
// obtenemos el id con un funcion de js this, this es el elemento que se toco por que como puede ser variable.
// en el front end en la etiqueta ancor se puso data-id. entonces en esta parte es por eso que se pone data, y lo que esta en ('id') fue lo que se puso en el ancor tag
divUsuarios.on('click', 'a', function () {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function (e) {

    e.preventDefault();
    if (txtMensaje.val().trim().length === 0) {
        console.log(txtMensaje.val());
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        renderizarMensajes(mensaje);
        txtMensaje.val('').focus();
    });

});