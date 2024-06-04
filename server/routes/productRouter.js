const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), productController.create)
router.post('/update',checkRole('ADMIN'), productController.setDescription)
router.get('/', productController.getAll)
router.get('/admin',checkRole('ADMIN'), productController.getAllAdmin)
router.get('/:id', productController.getOne)
router.put('/up/:id',checkRole('ADMIN'), productController.update)
router.delete('/del/:id', checkRole('ADMIN'), productController.delOne);
router.get('/type/:typeId', productController.getByType);
router.patch('/hide/:id', productController.hideProduct);
router.patch('/unhide/:id', productController.unhideProduct);


module.exports = router