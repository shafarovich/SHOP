const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')
const basketRouter = require('./basketRouter')
const feedbackRouter = require('./feedbackRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/basket', basketRouter)
router.use('/feedback', feedbackRouter)


module.exports = router