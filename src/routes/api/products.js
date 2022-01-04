// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

// ************ Controller Require ************
//const productsController = require('../controllers/productsController');
const productsAPIController = require('../../controllers/api/productsAPIController');

//CONFIG MULTER//
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });

//NUEVO REQUERIR validator
const { body } = require('express-validator');

// arreglo de validaciones 
const prodsValidations = [
    body('product_name').notEmpty().withMessage('Escribe nombre del producto'),
    body('price').notEmpty().withMessage('Escribe el precio'),
    body('discount').notEmpty().withMessage('Escribe el descuento'),
    body('category').notEmpty().withMessage('Selecciona la categoría'),
    body('description').notEmpty().withMessage('Escribe la descripción del producto'),
    body('color').notEmpty().withMessage('Escribe el color del producto'),
    body('size').notEmpty().withMessage('Escibre la talla del producto')
]

/*** GET ALL PRODUCTS ***/
router.get('/', productsAPIController.index);

/*** CREATE ONE PRODUCT ***/
// router.get('/create', productsAPIController.create);
// router.post('/', upload.any(), prodsValidations, productsAPIController.store);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsAPIController.detail);

/*** EDIT ONE PRODUCT ***/
// router.get('/edit/:id', productsAPIController.edit);
// router.patch('/edit/:id', upload.any(), prodsValidations, productsAPIController.update);

/*** DELETE ONE PRODUCT ***/
// router.delete('/delete/:id', productsAPIController.destroy);

module.exports = router;