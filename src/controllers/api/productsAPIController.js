const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsImageFolder = path.join(__dirname, '/../public/images/products');

//NUEVO BD
const db = require('../../../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Products = db.Product;

//TRAER VALIDACIONES DE ALTA PRODS
const { validationResult } = require('express-validator');
const { response } = require('express');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
//TRAE TODOS LOS PRODUCTOS
    'index': (req, res) => {
        db.Product.findAll()
            .then(products => {

                //Empezando con la API
                let respuesta = {
                    meta:{
                        total: products.length,
                        url: 'api/products',
                        status: 200
                    },
                    data: products
                }
                    res.json(respuesta);
                })
    },

// Detail - Detail from one product
    'detail': (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {
            let respuesta = {
                meta: {
                    status: 200,
                    url: '/api/product/:id'
                },
                data: product
            }
            res.json(respuesta);
        });
    },

    //BD NUEVO EDIT
    'edit': function(req, res) {
        let prodId = req.params.id;
        db.Product.findByPk(prodId)
        .then(product => {
            return res.render('products/productEdit', {product});
        })
    },

    //BD NUEVO UPDATE
    update: function (req,res) {
        let prodId = req.params.id;
        
       let image        
       if (req.files[0] != undefined) {
           image = req.files[0].filename
       } else {
           image = 'default-image.png'
       }
        db.Product.update(
            {
                product_name: req.body.product_name,
                price: req.body.price,
                discount: req.body.discount,
                category: req.body.category,
                description: req.body.description,
                color: req.body.color,
                size: req.body.size,
                image: image
            },
            {
                where: {product_id: prodId}
            }
        )
        .then(()=> {
            return res.redirect('/products')})        
        .catch(error => res.send(error));
    },
 
    // DBDelete - Delete one product
    destroy: (req, res) => {
        let prodId = req.params.id;
        console.log(prodId)
        db.Product.destroy({where: {product_id: prodId}, force: true})
        .then(response=>{
            return res.json(response)
        })

        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error)) 
    },
    // Create - Form to create
    create: (req, res) => {
        res.render('products/productsForm');
    },

    //DB NUEVO STORE
    store: function (req, res) {
    //     const resultsValidation = validationResult(req);
    //     if(resultsValidation.errors.length > 0){
    //         return res.render('products/productsForm', {
    //             errors: resultsValidation.mapped(),
    //             oldData: req.body
    //         })
    //    } 

    //    let image        
    //     if (req.files[0] != undefined) {
    //         image = req.files[0].filename
    //     } else {
    //         image = 'default-image.png'
    //     }

        db.Product
            //API
            .create(req.body)
            .then(product =>{
                 return res.status(200).json({
                    data: product,
                    status: 200,
                    created: 'ok'
                })
            })
    },
};

module.exports = controller;