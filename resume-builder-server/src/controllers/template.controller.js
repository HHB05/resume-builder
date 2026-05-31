const { getDatabase } = require('../config/database');

// 获取模板列表
async function getTemplates(req, res) {
  try {
    const db = getDatabase();
    const { category, style, search } = req.query;

    let query = 'SELECT * FROM templates WHERE status = 1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (style) {
      query += ' AND style = ?';
      params.push(style);
    }

    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY download_count DESC';

    const result = db.exec(query, params);

    let templates = [];
    if (result.length > 0) {
      const columns = result[0].columns;
      templates = result[0].values.map((values) => {
        const template = {};
        columns.forEach((col, index) => {
          template[col] = values[index];
        });
        template.config = JSON.parse(template.config || '{}');
        template.is_premium = Boolean(template.is_premium);
        return template;
      });
    }

    res.json({
      code: 200,
      message: 'success',
      data: templates,
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取模板列表失败',
    });
  }
}

// 获取单个模板
async function getTemplate(req, res) {
  try {
    const db = getDatabase();
    const result = db.exec('SELECT * FROM templates WHERE id = ?', [req.params.id]);

    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '模板不存在',
      });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const template = {};
    columns.forEach((col, index) => {
      template[col] = values[index];
    });
    template.config = JSON.parse(template.config || '{}');
    template.is_premium = Boolean(template.is_premium);

    res.json({
      code: 200,
      message: 'success',
      data: template,
    });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取模板失败',
    });
  }
}

// 评分模板
async function rateTemplate(req, res) {
  try {
    const { score } = req.body;
    const db = getDatabase();

    const result = db.exec('SELECT * FROM templates WHERE id = ?', [req.params.id]);
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({
        code: 40401,
        message: '模板不存在',
      });
    }

    const columns = result[0].columns;
    const values = result[0].values[0];
    const template = {};
    columns.forEach((col, index) => {
      template[col] = values[index];
    });

    // 更新评分
    const newRatingCount = template.rating_count + 1;
    const newRating = (template.rating * template.rating_count + score) / newRatingCount;

    db.run(
      'UPDATE templates SET rating = ?, rating_count = ? WHERE id = ?',
      [newRating, newRatingCount, req.params.id]
    );

    res.json({
      code: 200,
      message: '评分成功',
    });
  } catch (error) {
    console.error('Rate template error:', error);
    res.status(500).json({
      code: 50001,
      message: '评分失败',
    });
  }
}

module.exports = {
  getTemplates,
  getTemplate,
  rateTemplate,
};
