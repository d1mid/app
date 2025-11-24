const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/', authMiddleware, basketController.getBasket);
router.post('/add', authMiddleware, basketController.addDevice);
router.post('/decrement', authMiddleware, basketController.decrementDevice);
router.post('/remove', authMiddleware, basketController.removeDevice);
router.post('/clear', authMiddleware, basketController.clearBasket);

module.exports = router;
