const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');


const userGet = async(req = request, res = response) => {

    // const { q, nombre = 'not name', apikey, page = 1, limit } = req.query;
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    /* const usuarios = await usuario.find()
            .skip(Number(desde))
            .limit(Number(limit)); */

    //const total = await usuario.countDocuments();

    const [ total, usuarios ] = await Promise.all([
        usuario.countDocuments(query),
        usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])
    res.json({
        //ok: true,
        /* msg: 'get Api - Controllers',
        q,
        nombre,
        apikey,
        page,
        limit */
        total,
        usuarios
    });
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //Validar si existe en la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const userPost = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en bases de datos
    await usuario.save();

    res.json({
        //ok: true,
        //msg: 'post Api - Controllers',
        usuario
    })
}

const userDelete = async (req, res = response) => {
    const { id } = req.params;

    //Eliminamos fisicamente
    //const usuarios = await usuario.findByIdAndDelete(id); 
    const usuarios = await usuario.findByIdAndUpdate( id, { estado: false });
    res.json(usuarios);
}

const userPatch = (req, res = response) => {
    res.json({
        //ok: true,
        msg: 'patch Api - Controllers'
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}