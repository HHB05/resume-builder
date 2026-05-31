const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// 公开路由
router.get('/', templateController.getTemplates);
router.get('/:id', templateController.getTemplate);

// 需要认证的路由
router.post('/:id/rate', authenticateToken, templateController.rateTemplate);

module.exports = router;
