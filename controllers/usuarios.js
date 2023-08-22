const { response, request } = require('express');

const userGet = (req = request, res = response) => {

    const { q, nombre = 'not name', apikey, page = 1, limit } = req.query;
    res.json({
        //ok: true,
        msg: 'get Api - Controllers',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const userPut = (req, res = response) => {

    const {id} = req.params;
    res.status(500).json({
        //ok: true,
        msg: 'put Api - Controllers',
        id
    })
}

const userPost = (req, res = response) => {

    const {nombre, edad} = req.body;
    res.status(201).json({
        //ok: true,
        msg: 'post Api - Controllers',
        nombre,
        edad
    })
}

const userDelete = (req, res = response) => {
    res.json({
        //ok: true,
        msg: 'delete Api - Controllers'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        //ok: true,
        msg: 'patch Api - Controllers'
    })
}

module.exports ={
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}