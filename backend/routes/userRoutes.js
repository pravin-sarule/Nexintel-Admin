const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.get('/all', protect, adminOnly, userController.getAllUsers);
router.put('/block/:userId', protect, adminOnly, userController.toggleBlockUser);
router.put('/edit/:userId', protect, adminOnly, userController.updateUser);
router.put('/unblock/:userId', protect, adminOnly, userController.unblockUser);

module.exports = router;
