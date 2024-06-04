const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
router.delete('/del/:id', checkRole('ADMIN'), typeController.delete )
router.put('/update/:id', checkRole('ADMIN'), typeController.update);

module.exports = router