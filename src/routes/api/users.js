
// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

// ************ Controller Require ************
const usersAPIController = require('../../controllers/api/usersAPIController');

//CONFIG MULTER//
const multer = require('multer');

//*const guestMiddleware = require('../../middlewares/guestMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

//requerir validator
const { body } = require('express-validator');
// arreglo de validaciones 
const validations = [
    body('first_name').notEmpty().withMessage('Escribe tu nombre')
        .isLength({min: 2}).withMessage('Nombre debe tener al menos 2 carateres'),
    body('last_name').notEmpty().withMessage('Escribe tu apellido')
        .isLength({min: 2}).withMessage('Apellido debe tener al menos 2 carateres'),
    body('email').notEmpty().withMessage('Escribe tu email').bail()
        .isEmail().withMessage('Debe tener un formato de correo electrónico'),
    body('password').notEmpty().withMessage('Escribe tu password')
        .isLength({min: 8}).withMessage('Password debe tener al menos 8 carateres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("Incluye mayúsuclas, minúsculas y números en tu password"),
    body('gender').notEmpty().withMessage('Selecciona tu género'),
    body('date').notEmpty().withMessage('Captura tu fecha de nacimiento'),
    body('password').custom((value, { req })=>{
        if(value!== req.body.password2){
            throw new Error('Los passwords no coinciden');
        }
        return true;
    }),
      body('image').custom((value, { req })=>{
          let file = req.files;
         if(file=="") {
              throw new Error('Selecciona una imagen');
          }       
          return true;
      })
]

const validationsLogin = [
    body('email').notEmpty().withMessage('Escribe tu email').bail()
        .isEmail().withMessage('Debe tener un formato de correo electrónico'),
    body('password').notEmpty().withMessage('Escribe tu password')
]
/*** GET ALL USERS ***/
router.get('/', usersAPIController.index);
router.get('/detail/:id', usersAPIController.detail);

// router.get('/login', usersAPIController.login);
// router.post('/', upload.any(), validations, usersAPIController.store);
// router.post('/login', upload.any(), validationsLogin, usersAPIController.validate);

module.exports = router;