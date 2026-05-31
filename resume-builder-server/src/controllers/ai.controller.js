const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../config/database');

// AI文本润色（模拟）
async function polishText(req, res) {
  try {
    const { resumeId, section, text, targetRole, options } = req.body;

    // 模拟AI处理延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    // 模拟润色结果
    const polishedText = simulatePolish(text, options?.style);

    // 记录AI使用
    const db = getDatabase();
    db.run(
      'INSERT INTO ai_records (id, user_id, resume_id, action_type, input_text, output_text, tokens_used) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [uuidv4(), req.user.userId, resumeId, 'polish', text, polishedText, Math.floor(Math.random() * 100) + 50]
    );

    res.json({
      code: 200,
      message: 'success',
      data: {
        originalText: text,
        polishedText,
        suggestions: generateSuggestions(text),
        tokensUsed: Math.floor(Math.random() * 100) + 50,
      },
    });
  } catch (error) {
    console.error('Polish text error:', error);
    res.status(500).json({
      code: 50001,
      message: '润色失败',
    });
  }
}

// 简历评分（模拟）
async function scoreResume(req, res) {
  try {
    const { resumeId } = req.body;

    // 模拟评分结果
    const scoreResult = {
      overallScore: Math.floor(Math.random() * 30) + 65,
      dimensions: {
        completeness: Math.floor(Math.random() * 20) + 75,
        professionalism: Math.floor(Math.random() * 25) + 70,
        quantification: Math.floor(Math.random() * 30) + 60,
        layout: Math.floor(Math.random() * 15) + 80,
        keywords: Math.floor(Math.random() * 20) + 70,
      },
      issues: [
        {
          id: '1',
          type: 'no-quantify',
          severity: 'warning',
          message: '建议添加量化数据',
          section: 'experience',
          suggestion: '使用具体数字描述工作成果，如"提升了30%的转化率"',
        },
        {
          id: '2',
          type: 'too-short',
          severity: 'info',
          message: '自我评价可以更详细',
          section: 'summary',
          suggestion: '建议添加更多专业技能和职业目标的描述',
        },
      ],
      industryComparison: [
        { dimension: '完整性', userScore: 85, average: 72 },
        { dimension: '专业性', userScore: 78, average: 70 },
        { dimension: '量化程度', userScore: 65, average: 58 },
      ],
    };

    // 记录AI使用
    const db = getDatabase();
    db.run(
      'INSERT INTO ai_records (id, user_id, resume_id, action_type, tokens_used) VALUES (?, ?, ?, ?, ?)',
      [uuidv4(), req.user.userId, resumeId, 'score', 100]
    );

    res.json({
      code: 200,
      message: 'success',
      data: scoreResult,
    });
  } catch (error) {
    console.error('Score resume error:', error);
    res.status(500).json({
      code: 50001,
      message: '评分失败',
    });
  }
}

// 职位匹配（模拟）
async function matchJob(req, res) {
  try {
    const { resumeId, jobDescription } = req.body;

    // 模拟匹配结果
    const matchResult = {
      matchScore: Math.floor(Math.random() * 25) + 70,
      jobRequirements: [
        '3年以上前端开发经验',
        '精通Vue.js或React',
        '熟悉TypeScript',
        '有大型项目经验',
        '良好的团队协作能力',
      ],
      matchedRequirements: [
        '精通Vue.js或React',
        '熟悉TypeScript',
      ],
      missingRequirements: [
        '3年以上前端开发经验',
        '有大型项目经验',
        '良好的团队协作能力',
      ],
      suggestions: [
        {
          id: '1',
          type: 'keyword',
          original: '',
          suggested: '添加"大型项目经验"相关描述',
          reason: '职位要求中有此关键词',
          priority: 'high',
        },
      ],
    };

    // 记录AI使用
    const db = getDatabase();
    db.run(
      'INSERT INTO ai_records (id, user_id, resume_id, action_type, tokens_used) VALUES (?, ?, ?, ?, ?)',
      [uuidv4(), req.user.userId, resumeId, 'match', 150]
    );

    res.json({
      code: 200,
      message: 'success',
      data: matchResult,
    });
  } catch (error) {
    console.error('Match job error:', error);
    res.status(500).json({
      code: 50001,
      message: '匹配分析失败',
    });
  }
}

// 生成内容（模拟）
async function generateContent(req, res) {
  try {
    const { type, context, prompt } = req.body;

    // 模拟生成结果
    const content = simulateGenerate(type, context);

    // 记录AI使用
    const db = getDatabase();
    db.run(
      'INSERT INTO ai_records (id, user_id, action_type, input_text, output_text, tokens_used) VALUES (?, ?, ?, ?, ?, ?)',
      [uuidv4(), req.user.userId, 'generate', prompt || context, content, 80]
    );

    res.json({
      code: 200,
      message: 'success',
      data: {
        content,
        tokensUsed: 80,
      },
    });
  } catch (error) {
    console.error('Generate content error:', error);
    res.status(500).json({
      code: 50001,
      message: '生成失败',
    });
  }
}

// 获取AI使用量
async function getUsage(req, res) {
  try {
    const db = getDatabase();

    // 获取今日使用量
    const today = new Date().toISOString().split('T')[0];
    const result = db.exec(
      'SELECT COUNT(*) as count FROM ai_records WHERE user_id = ? AND created_at >= ?',
      [req.user.userId, today]
    );

    const used = result[0]?.values[0][0] || 0;
    const limit = 20; // 每日限制

    res.json({
      code: 200,
      message: 'success',
      data: {
        used,
        limit,
        resetAt: new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
      },
    });
  } catch (error) {
    console.error('Get usage error:', error);
    res.status(500).json({
      code: 50001,
      message: '获取使用量失败',
    });
  }
}

// 模拟润色功能
function simulatePolish(text, style) {
  if (!text) return '';

  const prefixes = {
    professional: ['专业地', '有效地', '成功地'],
    concise: ['简洁地', '精炼地'],
    detailed: ['详细地', '全面地'],
  };

  const prefix = prefixes[style]?.[Math.floor(Math.random() * 3)] || '有效地';

  // 简单的文本增强
  let polished = text;
  if (text.length < 20) {
    polished = `${prefix}${text}`;
  }

  return polished;
}

// 生成建议
function generateSuggestions(text) {
  const suggestions = [];

  if (text.length < 30) {
    suggestions.push({
      id: uuidv4(),
      type: 'quantify',
      original: text,
      suggested: '建议添加更多细节和量化数据',
      reason: '内容较短，可以补充更多具体信息',
      priority: 'medium',
    });
  }

  if (!text.includes('%') && !text.includes('万') && !text.includes('千')) {
    suggestions.push({
      id: uuidv4(),
      type: 'quantify',
      original: text,
      suggested: '考虑添加具体数字来增强说服力',
      reason: '量化数据可以让成果更有说服力',
      priority: 'low',
    });
  }

  return suggestions;
}

// 模拟生成功能
function simulateGenerate(type, context) {
  const templates = {
    summary: '具有丰富经验的专业人士，擅长[领域]相关工作。拥有扎实的专业知识和良好的团队协作能力，能够独立完成复杂任务。追求卓越，持续学习，致力于为团队创造价值。',
    experience: '负责[项目/产品]的开发与维护工作，参与需求分析、技术方案设计和代码实现。优化系统性能，提升用户体验，确保项目按时交付。',
    project: '该项目是一个[类型的项目]，旨在[项目目标]。采用了[技术栈]等技术，实现了[核心功能]。项目上线后获得了用户的积极反馈。',
    skills: '熟练掌握[技术1]、[技术2]、[技术3]等技术栈，具备良好的编程习惯和代码规范意识。',
    highlight: '主导完成了[具体工作]，取得了[具体成果]，获得了[认可/奖励]。',
  };

  return templates[type] || '根据您的背景和经验，为您生成了相应的内容。';
}

module.exports = {
  polishText,
  scoreResume,
  matchJob,
  generateContent,
  getUsage,
};
