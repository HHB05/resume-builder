const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../config/database');
const jwtConfig = require('../config/jwt');

// 用户注册
async function register(req, res) {
  try {
    const { email, password, nickname } = req.body;

    // 验证输入
    if (!email || !password || !nickname) {
      return res.status(400).json({
        code: 40001,
        message: '请提供完整的注册信息',
      });
    }

    const db = getDatabase();

    // 检查邮箱是否已存在
    const existingUser = db.exec('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0 && existingUser[0].values.length > 0) {
      return res.status(400).json({
        code: 40001,
        message: '该邮箱已被注册',
      });
    }

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 创建用户
    const userId = uuidv4();
    db.run(
      'INSERT INTO users (id, email, password_hash, nickname) VALUES (?, ?, ?, ?)',
      [userId, email, passwordHash, nickname]
    );

    // 生成Token
    const accessToken = jwt.sign(
      { userId, email, nickname },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    const refreshToken = jwt.sign(
      { userId },
      jwtConfig.secret,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      code: 200,
      message: '注册成功',
      data: {
        user: {
          id: userId,
          email,
          nickname,
          planType: 'free',
          createdAt: new Date().toISOString(),
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      code: 50001,
      message: '注册失败',
    });
  }
}

// 用户登录
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        code: 40001,
        message: '请提供邮箱和密码',
      });
    }

    const db = getDatabase();

    // 查找用户
    const result = db.exec('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({
        code: 40101,
        message: '邮箱或密码错误',
      });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const user = {};
    columns.forEach((col, index) => {
      user[col] = values[index];
    });

    // 验证密码
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({
        code: 40101,
        message: '邮箱或密码错误',
      });
    }

    // 检查用户状态
    if (user.status !== 1) {
      return res.status(403).json({
        code: 40301,
        message: '账号已被禁用',
      });
    }

    // 生成Token
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, nickname: user.nickname },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      jwtConfig.secret,
      { expiresIn: '30d' }
    );

    res.json({
      code: 200,
      message: '登录成功',
      data: {
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          avatarUrl: user.avatar_url,
          planType: user.plan_type,
          createdAt: user.created_at,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      code: 50001,
      message: '登录失败',
    });
  }
}

// 获取用户信息
async function getProfile(req, res) {
  try {
    const db = getDatabase();
    const result = db.exec('SELECT * FROM users WHERE id = ?', [req.user.userId]);

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '用户不存在',
      });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const user = {};
    columns.forEach((col, index) => {
      user[col] = values[index];
    });

    res.json({
      code: 200,
      message: 'success',
      data: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatarUrl: user.avatar_url,
        planType: user.plan_type,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取用户信息失败',
    });
  }
}

// 更新用户信息
async function updateProfile(req, res) {
  try {
    const { nickname, avatarUrl } = req.body;
    const db = getDatabase();

    const updates = [];
    const params = [];

    if (nickname) {
      updates.push('nickname = ?');
      params.push(nickname);
    }
    if (avatarUrl !== undefined) {
      updates.push('avatar_url = ?');
      params.push(avatarUrl);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        code: 40001,
        message: '没有提供更新内容',
      });
    }

    updates.push("updated_at = datetime('now')");
    params.push(req.user.userId);

    db.run(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    // 获取更新后的用户信息
    const result = db.exec('SELECT * FROM users WHERE id = ?', [req.user.userId]);
    const columns = result[0].columns;
    const values = result[0].values[0];
    const user = {};
    columns.forEach((col, index) => {
      user[col] = values[index];
    });

    res.json({
      code: 200,
      message: '更新成功',
      data: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatarUrl: user.avatar_url,
        planType: user.plan_type,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      code: 50001,
      message: '更新用户信息失败',
    });
  }
}

// 刷新Token
async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        code: 40001,
        message: '请提供refreshToken',
      });
    }

    const decoded = jwt.verify(refreshToken, jwtConfig.secret);
    const db = getDatabase();
    const result = db.exec('SELECT * FROM users WHERE id = ?', [decoded.userId]);

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(401).json({
        code: 40101,
        message: '用户不存在',
      });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const user = {};
    columns.forEach((col, index) => {
      user[col] = values[index];
    });

    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email, nickname: user.nickname },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    const newRefreshToken = jwt.sign(
      { userId: user.id },
      jwtConfig.secret,
      { expiresIn: '30d' }
    );

    res.json({
      code: 200,
      message: 'Token刷新成功',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      code: 40101,
      message: 'Token刷新失败',
    });
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  refreshToken,
};
