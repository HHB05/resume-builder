const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../config/database');

// 默认简历内容
const defaultContent = {
  personal: {
    name: '',
    phone: '',
    email: '',
    location: '',
    title: '',
    website: '',
    github: '',
    linkedin: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  summary: '',
};

// 获取简历列表
async function getResumes(req, res) {
  try {
    const db = getDatabase();
    const { page = 1, pageSize = 20, status, search, sortBy = 'updated_at', sortOrder = 'desc' } = req.query;

    let query = 'SELECT * FROM resumes WHERE user_id = ?';
    const params = [req.user.userId];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND title LIKE ?';
      params.push(`%${search}%`);
    }

    // 获取总数
    const countResult = db.exec(
      query.replace('SELECT *', 'SELECT COUNT(*) as count'),
      params
    );
    const total = countResult[0]?.values[0][0] || 0;

    // 排序和分页
    query += ` ORDER BY ${sortBy} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(pageSize), (parseInt(page) - 1) * parseInt(pageSize));

    const result = db.exec(query, params);

    let resumes = [];
    if (result.length > 0) {
      const columns = result[0].columns;
      resumes = result[0].values.map((values) => {
        const resume = {};
        columns.forEach((col, index) => {
          resume[col] = values[index];
        });
        // 解析JSON内容
        resume.content = JSON.parse(resume.content || '{}');
        resume.is_favorite = Boolean(resume.is_favorite);
        return resume;
      });
    }

    res.json({
      code: 200,
      message: 'success',
      data: resumes,
      meta: {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        total,
      },
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取简历列表失败',
    });
  }
}

// 获取单个简历
async function getResume(req, res) {
  try {
    const db = getDatabase();
    const result = db.exec(
      'SELECT * FROM resumes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '简历不存在',
      });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const resume = {};
    columns.forEach((col, index) => {
      resume[col] = values[index];
    });
    resume.content = JSON.parse(resume.content || '{}');
    resume.is_favorite = Boolean(resume.is_favorite);

    res.json({
      code: 200,
      message: 'success',
      data: resume,
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取简历失败',
    });
  }
}

// 创建简历
async function createResume(req, res) {
  try {
    const { title, templateId, content } = req.body;

    if (!title) {
      return res.status(400).json({
        code: 40001,
        message: '请提供简历标题',
      });
    }

    const db = getDatabase();
    const resumeId = uuidv4();
    const resumeContent = content || defaultContent;

    db.run(
      'INSERT INTO resumes (id, user_id, title, template_id, content) VALUES (?, ?, ?, ?, ?)',
      [resumeId, req.user.userId, title, templateId || 'minimal', JSON.stringify(resumeContent)]
    );

    const result = db.exec('SELECT * FROM resumes WHERE id = ?', [resumeId]);
    const columns = result[0].columns;
    const values = result[0].values[0];
    const resume = {};
    columns.forEach((col, index) => {
      resume[col] = values[index];
    });
    resume.content = JSON.parse(resume.content || '{}');
    resume.is_favorite = Boolean(resume.is_favorite);

    res.status(201).json({
      code: 200,
      message: '创建成功',
      data: resume,
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({
      code: 50001,
      message: '创建简历失败',
    });
  }
}

// 更新简历
async function updateResume(req, res) {
  try {
    const { title, templateId, content, status } = req.body;
    const db = getDatabase();

    // 检查简历是否存在
    const existing = db.exec(
      'SELECT id FROM resumes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (existing.length === 0 || existing[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '简历不存在',
      });
    }

    const updates = [];
    const params = [];

    if (title !== undefined) {
      updates.push('title = ?');
      params.push(title);
    }
    if (templateId !== undefined) {
      updates.push('template_id = ?');
      params.push(templateId);
    }
    if (content !== undefined) {
      updates.push('content = ?');
      params.push(JSON.stringify(content));
    }
    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        code: 40001,
        message: '没有提供更新内容',
      });
    }

    updates.push("updated_at = datetime('now')");
    params.push(req.params.id);

    db.run(
      `UPDATE resumes SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    // 获取更新后的简历
    const result = db.exec('SELECT * FROM resumes WHERE id = ?', [req.params.id]);
    const columns = result[0].columns;
    const values = result[0].values[0];
    const resume = {};
    columns.forEach((col, index) => {
      resume[col] = values[index];
    });
    resume.content = JSON.parse(resume.content || '{}');
    resume.is_favorite = Boolean(resume.is_favorite);

    res.json({
      code: 200,
      message: '更新成功',
      data: resume,
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({
      code: 50001,
      message: '更新简历失败',
    });
  }
}

// 删除简历
async function deleteResume(req, res) {
  try {
    const db = getDatabase();

    const existing = db.exec(
      'SELECT id FROM resumes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (existing.length === 0 || existing[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '简历不存在',
      });
    }

    db.run('DELETE FROM resumes WHERE id = ?', [req.params.id]);

    res.json({
      code: 200,
      message: '删除成功',
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      code: 50001,
      message: '删除简历失败',
    });
  }
}

// 复制简历
async function duplicateResume(req, res) {
  try {
    const db = getDatabase();

    const result = db.exec(
      'SELECT * FROM resumes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '简历不存在',
      });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const original = {};
    columns.forEach((col, index) => {
      original[col] = values[index];
    });

    const newResumeId = uuidv4();
    db.run(
      'INSERT INTO resumes (id, user_id, title, template_id, content, language) VALUES (?, ?, ?, ?, ?, ?)',
      [newResumeId, req.user.userId, `${original.title} (副本)`, original.template_id, original.content, original.language]
    );

    const newResult = db.exec('SELECT * FROM resumes WHERE id = ?', [newResumeId]);
    const newColumns = newResult[0].columns;
    const newValues = newResult[0].values[0];
    const newResume = {};
    newColumns.forEach((col, index) => {
      newResume[col] = newValues[index];
    });
    newResume.content = JSON.parse(newResume.content || '{}');
    newResume.is_favorite = Boolean(newResume.is_favorite);

    res.status(201).json({
      code: 200,
      message: '复制成功',
      data: newResume,
    });
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({
      code: 50001,
      message: '复制简历失败',
    });
  }
}

// 切换收藏状态
async function toggleFavorite(req, res) {
  try {
    const db = getDatabase();

    const result = db.exec(
      'SELECT is_favorite FROM resumes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '简历不存在',
      });
    }

    const currentFavorite = result[0].values[0][0];
    const newFavorite = currentFavorite ? 0 : 1;

    db.run(
      'UPDATE resumes SET is_favorite = ?, updated_at = datetime(\'now\') WHERE id = ?',
      [newFavorite, req.params.id]
    );

    res.json({
      code: 200,
      message: '操作成功',
      data: { isFavorite: Boolean(newFavorite) },
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      code: 50001,
      message: '切换收藏状态失败',
    });
  }
}

module.exports = {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  toggleFavorite,
};
