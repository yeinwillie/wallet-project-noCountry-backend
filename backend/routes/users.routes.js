const Router = require('express')
const {getUsers, getUserById, editUser,  createUser, deleteUser, resetPassword, loginUser, emailConfirm} =require('../controllers/usersControllers')
const router = Router()
const { body } = require('express-validator');
const {validateErrors }= require('../middlewares/validateErrors');
const {jwtValidation}= require('../middlewares/jwtvalidation');

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/',  
body('firstName').notEmpty().withMessage('El nombre es obligatorio'),
body('firstName').isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),
body('firstName').matches(/^[A-Za-z]+$/).withMessage('El nombre debe contener solo letras'),
body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
body('lastName').isLength({min: 3}).withMessage('El apellido debe tener al menos 3 caracteres'),
body('firstName').matches(/^[A-Za-z]+$/).withMessage('El apellido debe contener solo letras'),
body('email').isEmail().withMessage('El email debe ser un email válido'),
body('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/).withMessage('La contraseña debe tener al menos una mayúscula, una minúscula y un número'),
validateErrors,
createUser)

router.put('/editUser', 
body('firstName').notEmpty().withMessage('El nombre es obligatorio'),
body('firstName').isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),
body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
body('lastName').isLength({min: 3}).withMessage('El apellido debe tener al menos 3 caracteres'),
body('email').isEmail().withMessage('El email debe ser un email válido'),
body ('dni').notEmpty().withMessage('El dni es obligatorio'),
body ('dni').isLength({min: 3}).withMessage('El dni debe tener al menos 8 caracteres'),
body ('dateOfBirth').notEmpty().withMessage('La fecha de nacimiento es obligatoria'),
body ('nacionality').notEmpty().withMessage('La nacionalidad es obligatoria'),
body('address.street').notEmpty().withMessage('La calle es requerida'),
body('address.number').notEmpty().withMessage('El número es requerido'),
body('address.zipcode').notEmpty().withMessage('El código postal es requerido'),
validateErrors,
jwtValidation,
editUser)


router.delete("/:id", jwtValidation, deleteUser)



router.post("/login",
[
    body('email').isEmail().withMessage('El email debe ser un email válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    validateErrors
],
loginUser) 


router.patch("/reset/password"
,[
    body('email').isEmail().withMessage('El email debe ser un email válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    body('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/).withMessage('La contraseña debe tener al menos una mayúscula, una minúscula y un número'),
    validateErrors ,
    jwtValidation
]
, resetPassword)

router.get("/confirm/:registertoken",
    
    emailConfirm
); 

module.exports = router