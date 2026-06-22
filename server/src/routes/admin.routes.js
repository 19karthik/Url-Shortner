const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.delete('/users/:userId', authMiddleware, adminMiddleware, adminController.deleteUser);
router.post('/users/:userId/ban', authMiddleware, adminMiddleware, adminController.banUser);
router.post('/users/:userId/unban', authMiddleware, adminMiddleware, adminController.unbanUser);
router.get('/analytics', authMiddleware, adminMiddleware, adminController.getSystemAnalytics);

module.exports = router;
