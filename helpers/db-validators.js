const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRoleValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la bases de datos`)
    }
}

const emailExiste = async( correo = '' ) => {

    //verificar si el correo existe
    const existeEmail = await usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`Ese correo: ${ correo }, ya esta registrado`)
    }
}
const existeUsuarioPorId = async( id ) => {

    //verificar si el correo existe
    const existeUsuarioId = await usuario.findById(id);
    if(!existeUsuarioId){
        throw new Error(`El id: ${ id }, no existe`)
    }
}


module.exports = {

    esRoleValido,
    emailExiste,
    existeUsuarioPorId
    
}