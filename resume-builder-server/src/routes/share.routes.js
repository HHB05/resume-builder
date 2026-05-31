const express = require('express');
const router = express.Router();
const shareController = require('../controllers/share.controller');
const { authenticateToken } = require('../middleware/auth');

// 公开路由 - 获取分享的简历
router.get('/public/:token', shareController.getSharedResume);

// 需要认证的路由
router.post('/create', authenticateToken, shareController.createShare);
router.get('/records', authenticateToken, shareController.getShareRecords);
router.put('/:token', authenticateToken, shareController.updateShare);
router.delete('/:token', authenticateToken, shareController.deleteShare);
router.get('/:token/stats', authenticateToken, shareController.getShareStats);

module.exports = router;
