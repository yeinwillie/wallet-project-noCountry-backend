const Router = require('express')
const { getTransactions, getTransactionById, createTransaction } = require('../controllers/transactionsController')
const router = Router()
const { body } = require('express-validator');
const {validateErrors }= require('../middlewares/validateErrors');
const {jwtValidation}= require('../middlewares/jwtvalidation');


router.get('/', getTransactions)

router.get('/:id', getTransactionById);

router.post('/', 
body('recipient').notEmpty().withMessage('El DNI, CBU obligatorio'),
body('amount').notEmpty().withMessage('El valor es requerido').isNumeric().withMessage('El valor debe ser un número'),
body('detail').notEmpty().withMessage('El detalle es requerido.'),
validateErrors,
jwtValidation,
createTransaction,)

// router.post('/', receiveTransaction )

module.exports = router