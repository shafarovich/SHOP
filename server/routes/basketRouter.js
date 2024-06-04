const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController')

// ------- Добавил проверку на авторизацию для того, чтобы вытащить оттуда авторизованного юзера -------- //
const authMiddleware = require('../middleware/authMiddleware')

// ------- CRUD корзины ------- //
router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)
router.delete('/delete' , basketController.deleteBasket)
router.put('/update', basketController.updateQuantity);



module.exports = router