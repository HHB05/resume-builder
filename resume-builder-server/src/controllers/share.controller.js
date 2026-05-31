const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../config/database');

// 创建分享链接
async function createShare(req, res) {
  try {
    const { resumeId, password, expireAt } = req.body;

    // 检查简历是否存在
    const db = getDatabase();
    const resumeResult = db.exec(
      'SELECT id FROM resumes WHERE id = ? AND user_id = ?',
      [resumeId, req.user.userId]
    );

    if (resumeResult.length === 0 || resumeResult[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '简历不存在',
      });
    }

    // 生成分享token
    const shareToken = uuidv4().replace(/-/g, '').substring(0, 16);
    const shareId = uuidv4();

    // 加密密码（如果提供）
    let hashedPassword = null;
    if (password) {
      const bcrypt = require('bcryptjs');
      hashedPassword = await bcrypt.hash(password, 10);
    }

    db.run(
      'INSERT INTO share_records (id, resume_id, user_id, share_token, password, expire_at) VALUES (?, ?, ?, ?, ?, ?)',
      [shareId, resumeId, req.user.userId, shareToken, hashedPassword, expireAt]
    );

    const shareUrl = `${process.env.CORS_ORIGIN || 'http://localhost:3000'}/share/${shareToken}`;

    res.status(201).json({
      code: 200,
      message: '分享链接创建成功',
      data: {
        shareToken,
        shareUrl,
      },
    });
  } catch (error) {
    console.error('Create share error:', error);
    res.status(500).json({
      code: 50001,
      message: '创建分享链接失败',
    });
  }
}

// 获取分享的简历（公开接口）
async function getSharedResume(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.query;

    const db = getDatabase();

    // 查找分享记录
    const shareResult = db.exec(
      'SELECT * FROM share_records WHERE share_token = ? AND is_active = 1',
      [token]
    );

    if (shareResult.length === 0 || shareResult[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '分享链接不存在或已失效',
      });
    }

    const columns = shareResult[0].columns;
    const values = shareResult[0].values[0];
    const share = {};
    columns.forEach((col, index) => {
      share[col] = values[index];
    });

    // 检查是否过期
    if (share.expire_at && new Date(share.expire_at) < new Date()) {
      return res.status(410).json({
        code: 41001,
        message: '分享链接已过期',
      });
    }

    // 检查密码
    if (share.password) {
      if (!password) {
        return res.status(401).json({
          code: 40101,
          message: '需要密码访问',
          data: { needPassword: true },
        });
      }

      const bcrypt = require('bcryptjs');
      const validPassword = await bcrypt.compare(password, share.password);
      if (!validPassword) {
        return res.status(401).json({
          code: 40101,
          message: '密码错误',
        });
      }
    }

    // 更新访问次数
    db.run(
      'UPDATE share_records SET view_count = view_count + 1 WHERE share_token = ?',
      [token]
    );

    // 获取简历内容
    const resumeResult = db.exec(
      'SELECT * FROM resumes WHERE id = ?',
      [share.resume_id]
    );

    if (resumeResult.length === 0 || resumeResult[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '简历不存在',
      });
    }

    const resumeColumns = resumeResult[0].columns;
    const resumeValues = resumeResult[0].values[0];
    const resume = {};
    resumeColumns.forEach((col, index) => {
      resume[col] = resumeValues[index];
    });
    resume.content = JSON.parse(resume.content || '{}');

    res.json({
      code: 200,
      message: 'success',
      data: { resume },
    });
  } catch (error) {
    console.error('Get shared resume error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取分享简历失败',
    });
  }
}

// 获取分享记录列表
async function getShareRecords(req, res) {
  try {
    const db = getDatabase();
    const result = db.exec(
      'SELECT * FROM share_records WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );

    let records = [];
    if (result.length > 0) {
      const columns = result[0].columns;
      records = result[0].values.map((values) => {
        const record = {};
        columns.forEach((col, index) => {
          record[col] = values[index];
        });
        record.is_active = Boolean(record.is_active);
        return record;
      });
    }

    res.json({
      code: 200,
      message: 'success',
      data: records,
    });
  } catch (error) {
    console.error('Get share records error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取分享记录失败',
    });
  }
}

// 更新分享设置
async function updateShare(req, res) {
  try {
    const { token } = req.params;
    const { password, expireAt, isActive } = req.body;

    const db = getDatabase();

    const existing = db.exec(
      'SELECT * FROM share_records WHERE share_token = ? AND user_id = ?',
      [token, req.user.userId]
    );

    if (existing.length === 0 || existing[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '分享记录不存在',
      });
    }

    const updates = [];
    const params = [];

    if (password !== undefined) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
      updates.push('password = ?');
      params.push(hashedPassword);
    }

    if (expireAt !== undefined) {
      updates.push('expire_at = ?');
      params.push(expireAt);
    }

    if (isActive !== undefined) {
      updates.push('is_active = ?');
      params.push(isActive ? 1 : 0);
    }

    if (updates.length > 0) {
      params.push(token);
      db.run(
        `UPDATE share_records SET ${updates.join(', ')} WHERE share_token = ?`,
        params
      );
    }

    res.json({
      code: 200,
      message: '更新成功',
    });
  } catch (error) {
    console.error('Update share error:', error);
    res.status(500).json({
      code: 50001,
      message: '更新分享设置失败',
    });
  }
}

// 删除分享
async function deleteShare(req, res) {
  try {
    const { token } = req.params;
    const db = getDatabase();

    const existing = db.exec(
      'SELECT id FROM share_records WHERE share_token = ? AND user_id = ?',
      [token, req.user.userId]
    );

    if (existing.length === 0 || existing[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '分享记录不存在',
      });
    }

    db.run('DELETE FROM share_records WHERE share_token = ?', [token]);

    res.json({
      code: 200,
      message: '删除成功',
    });
  } catch (error) {
    console.error('Delete share error:', error);
    res.status(500).json({
      code: 50001,
      message: '删除分享失败',
    });
  }
}

// 获取分享统计
async function getShareStats(req, res) {
  try {
    const { token } = req.params;
    const db = getDatabase();

    const result = db.exec(
      'SELECT view_count FROM share_records WHERE share_token = ? AND user_id = ?',
      [token, req.user.userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '分享记录不存在',
      });
    }

    res.json({
      code: 200,
      message: 'success',
      data: {
        viewCount: result[0].values[0][0] || 0,
      },
    });
  } catch (error) {
    console.error('Get share stats error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取分享统计失败',
    });
  }
}

module.exports = {
  createShare,
  getSharedResume,
  getShareRecords,
  updateShare,
  deleteShare,
  getShareStats,
};
