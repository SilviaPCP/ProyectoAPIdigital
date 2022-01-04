const fs = require('fs');
const path = require('path');
//const bcryptjs = require('bcryptjs'); 

//const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const usersImageFolder = path.join(__dirname, '/../public/images/users');

//DB
const db = require('../../../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Users = db.User;

// traer las validacinoes de formulario
const { validationResult } = require('express-validator');
// const { url } = require('inspector');
// const { URLSearchParams } = require('url');
const { response } = require('express');

const controller = {
//Trae todos los usuarios 
    'index': (req, res) => {    
    db.User.findAll()
    .then(users => {
        //Empezando con la API
        let respuesta = {
            meta:{
                total: users.length,
                url: 'api/users',
                status: 200,
            },
            data: users,
        }
        
            res.json(respuesta);
            
        })
    },
    'detail': (req, res) => {
        db.User.findByPk(req.params.id)
        .then(user => {
            let respuesta = {
                meta: {
                    status: 200,
                    url: '/api/user/:id'
                },
                data: user
            }
            res.json(respuesta);
        });
    }

}

module.exports = controller;