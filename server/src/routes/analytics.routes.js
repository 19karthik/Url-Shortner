const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/summary', authMiddleware, analyticsController.getSummary);
router.get('/clicks-per-day', authMiddleware, analyticsController.getClicksPerDay);
router.get('/top-urls', authMiddleware, analyticsController.getTopUrls);

module.exports = router;
