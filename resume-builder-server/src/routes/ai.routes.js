const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

// AI功能
router.post('/polish', aiController.polishText);
router.post('/score', aiController.scoreResume);
router.post('/match', aiController.matchJob);
router.post('/generate', aiController.generateContent);
router.get('/usage', aiController.getUsage);

module.exports = router;
