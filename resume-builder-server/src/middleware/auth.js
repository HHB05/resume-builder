const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// 验证Token中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      code: 40101,
      message: '未提供认证令牌',
    });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: 40101,
        message: '令牌已过期',
      });
    }
    return res.status(403).json({
      code: 40301,
      message: '无效的认证令牌',
    });
  }
}

// 可选认证中间件（不强制要求登录）
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, jwtConfig.secret);
      req.user = decoded;
    } catch (error) {
      // 忽略错误，继续处理请求
    }
  }

  next();
}

module.exports = {
  authenticateToken,
  optionalAuth,
};
