const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const orderController = require('../controllers/orderController')

router.post('/', orderController.addOrder)
router.get('/', checkRole('ADMIN'),orderController.getAll)
router.get('/user/:id',  orderController.getUserOrder)
router.post('/user/update/:id', checkRole('ADMIN'), orderController.updateUserOrder)
router.get('/:id', orderController.getUserOrderList)

module.exports = router
