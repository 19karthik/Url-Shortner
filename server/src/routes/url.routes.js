const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, urlController.createShortUrl);
router.get('/', authMiddleware, urlController.getUserUrls);
router.get('/:id', authMiddleware, urlController.getUrlById);
router.put('/:id', authMiddleware, urlController.updateUrl);
router.delete('/:id', authMiddleware, urlController.deleteUrl);
router.patch('/:id/toggle', authMiddleware, urlController.toggleUrlStatus);

module.exports = router;
