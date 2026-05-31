const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume.controller');
const { authenticateToken } = require('../middleware/auth');

// 所有路由都需要认证
router.use(authenticateToken);

// 简历CRUD
router.get('/', resumeController.getResumes);
router.get('/:id', resumeController.getResume);
router.post('/', resumeController.createResume);
router.put('/:id', resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);

// 特殊操作
router.post('/:id/duplicate', resumeController.duplicateResume);
router.post('/:id/favorite', resumeController.toggleFavorite);

module.exports = router;
