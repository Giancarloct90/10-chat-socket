const {
    io
} = require('../server');

// Requerimos el archivo de la clases previmente creada para poder crear una instancia de un objeto
const {
    Usuarios
} = require('../classes/usuarios');


const {
    crearMensaje
} = require('../utilidades/utilidades');


// creamos la instancia de un objeto
const usuarios = new Usuarios();

io.on('connection', (client) => {

    // en modo esucha esperando que alguien se conecte al servidor
    client.on('entrarChat', (data, callback) => {

        // evaluo si viene el nombre de usuario si no viene enviamos un error
        if (!data.nombre || !data.sala) {
            return callback({
                err: false,
                mensaje: 'El nombre y sala es necesario'
            })
        }

        // con este comando lo estamos uniendo a una sala
        client.join(data.sala);

        // mandamos a llamar la funcion de la clase agregarPersona 
        // que basicamente lo que hace es agregar un nuevo objeto a un arreglo, dicho objeto contiene la informacion del usuario que se conecto
        // lleva el id de usuario, el el nombre del usuario nuevo 
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        // le estamos enviando la personas que pertenecen a una sala en especifico
        callback(usuarios.getPersonasPorSala(data.sala));
        // con el broadcast.to(data.sala) estamos
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        console.log(`Usuario ${data.nombre} conectado, sala ${data.sala}`);
    });

    // El usuario que esta conectado a el servidor envia el mensaje y es en este punto donde el servidor esta en modo de escucha y lee el mensaje.
    // una vez que el mensaje llega al servidor, el servidor lo reenvia todos los usuarios conectados.
    client.on('crearMensaje', (data) => {
        // con el client.id obtenemos el id de la personas que esta enviando el mensaje para asi poder obtener su nombre
        // el mensaje que se envia contiene 3 cosas, 1 el nombre de la persona que esta enviando el msj, 2 el mensaje, la fecha se saca del metodo que se llama crearMensaje
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.data).emit('crearMensaje', mensaje);
    });

    // Cuando se desconecta alguien, se dispara este evento
    client.on('disconnect', () => {
        // Borramos la persona que se desconecta con la funcion que se encuentra en la clase de usuario
        let personaBorrada = usuarios.borrarPersona(client.id);

        // Se emite un mensaje cuando un usuario se desconecta, este mensaje es broadcast eso quiere decir que se le envia a todos lo usuario
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} se desconecto`));

        // aqui una vez mas se vuelve a a enviar un mensaje a todos los usuarios con la lista de todos lo usuario que en este momento estan conectados 
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

        console.log(`${personaBorrada.nombre} se Desconecto del chat`);
    });

    // el servidor esta escuchando este evento y cuando lo recibe se lo enviamos a la persona que especificamos en el id
    // el servidor recibe el id y el mensaje de la persona a la cual le queremos enviar el mensaje
    client.on('mensajePrivado', data => {
        // con esta sentencia obtenemos toda la informacion de la persona segun su id
        let persona = usuarios.getPersona(client.id);
        // el servidor recibe el mensaje de la persona y se lo envia a la otra persona con el comando broadcast.to es de esta manera como 
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
});