const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const feedbackController = require('../controllers/feedbackController')

router.post('/', feedbackController.submit)
router.get('/',checkRole('ADMIN'), feedbackController.getAll)
router.delete('/delete/:id',checkRole('ADMIN'), feedbackController.delete)

module.exports = router
