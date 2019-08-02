class Usuarios {
    // estamos creando una constructor que lo unico que hace es inicializar un arreglo de personas
    constructor() {
        this.personas = [];
    }

    // agremas una nueva persona al arreglo de persona
    agregarPersona(id, nombre) {
        let persona = {
            id,
            nombre
        }
        this.personas.push(persona);
        return this.personas;
    }

    // Nos devuelve el objeto de una persona segun el id que le enviammos
    getPersona(id) {
        // la funcion filter es una funcion para arreglos lo que hace es que se hace una accion escrita a cada uno de los elementos del arrelgo
        // y lo devuelve en forma de un objeto, se le pone [0] por que lo que estamos haciendo es comparamos el id, con el arreglo de id
        // y como sabemos que el id es unico por eso le ponemos el [0], para que solo devuelva uno solo
        let persona = this.persona.filer(persona => {
            return persona.id === id;
        })[0];

        return persona;
    }

    // Solo devolvemos el arreglo de personas
    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        //
    }

    // Para poder borrar una persona lo que hacemos es que lo comparamos el id que recibimos con los id del arreglo, 
    // y todos los que son distintos a este id seran devueltos y puestos en un arreglo, en este caso en un arreglo del mismo nombre
    borrarPersona(id) {
        // aqui guardamos la info de la persona que sera borrada para poder indicar cual fue la persona que se borro
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filer(persona => {
            return persona.id != id;
        });
        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}