const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// 加载环境变量
dotenv.config();

// 导入数据库配置
const { initDatabase } = require('./config/database');

// 导入路由
const authRoutes = require('./routes/auth.routes');
const resumeRoutes = require('./routes/resume.routes');
const templateRoutes = require('./routes/template.routes');
const aiRoutes = require('./routes/ai.routes');
const shareRoutes = require('./routes/share.routes');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    // 允许的源列表
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:5173',
    ];
    // 允许没有origin的请求（如Postman、curl等）
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // 开发环境允许所有源
    }
  },
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API路由
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/resumes', resumeRoutes);
app.use('/api/v1/templates', templateRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/share', shareRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    code: 40401,
    message: '接口不存在',
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    code: 50001,
    message: '服务器内部错误',
  });
});

// 初始化数据库并启动服务器
async function startServer() {
  try {
    await initDatabase();
    console.log('Database initialized');

    // 初始化模板数据
    initDefaultTemplates();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// 初始化默认模板
function initDefaultTemplates() {
  const { getDatabase } = require('./config/database');
  const db = getDatabase();

  // 检查是否已有模板
  const result = db.exec('SELECT COUNT(*) as count FROM templates');
  if (result[0]?.values[0][0] > 0) {
    return; // 已有模板，跳过初始化
  }

  const defaultTemplates = [
    {
      id: 'minimal',
      name: '简约经典',
      category: 'general',
      style: 'minimal',
      config: JSON.stringify({
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        fontFamily: { heading: 'Inter', body: 'Inter' },
        fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
        spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
        layout: 'single-column',
        headerStyle: 'left',
        sectionTitleStyle: 'underline',
      }),
      is_premium: 0,
    },
    {
      id: 'modern',
      name: '现代双栏',
      category: 'tech',
      style: 'creative',
      config: JSON.stringify({
        primaryColor: '#0f172a',
        secondaryColor: '#334155',
        fontFamily: { heading: 'Inter', body: 'Inter' },
        fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
        spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
        layout: 'two-column',
        headerStyle: 'left',
        sectionTitleStyle: 'border-left',
      }),
      is_premium: 0,
    },
    {
      id: 'professional',
      name: '商务专业',
      category: 'finance',
      style: 'business',
      config: JSON.stringify({
        primaryColor: '#1e40af',
        secondaryColor: '#3b82f6',
        fontFamily: { heading: 'Noto Sans SC', body: 'Noto Sans SC' },
        fontSize: { title: 22, heading: 16, subheading: 14, body: 12, small: 10 },
        spacing: { sectionGap: 14, itemGap: 6, lineHeight: 1.5, padding: 20 },
        layout: 'single-column',
        headerStyle: 'center',
        sectionTitleStyle: 'background',
      }),
      is_premium: 1,
    },
    {
      id: 'creative',
      name: '创意设计',
      category: 'design',
      style: 'creative',
      config: JSON.stringify({
        primaryColor: '#7c3aed',
        secondaryColor: '#a78bfa',
        fontFamily: { heading: 'Inter', body: 'Inter' },
        fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
        spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
        layout: 'single-column',
        headerStyle: 'left',
        sectionTitleStyle: 'border-left',
      }),
      is_premium: 1,
    },
    {
      id: 'business',
      name: '经典商务',
      category: 'finance',
      style: 'business',
      config: JSON.stringify({
        primaryColor: '#0f172a',
        secondaryColor: '#475569',
        fontFamily: { heading: 'Noto Sans SC', body: 'Noto Sans SC' },
        fontSize: { title: 22, heading: 16, subheading: 14, body: 12, small: 10 },
        spacing: { sectionGap: 14, itemGap: 6, lineHeight: 1.6, padding: 20 },
        layout: 'single-column',
        headerStyle: 'center',
        sectionTitleStyle: 'border-bottom',
      }),
      is_premium: 0,
    },
    {
      id: 'simple',
      name: '极简风格',
      category: 'general',
      style: 'minimal',
      config: JSON.stringify({
        primaryColor: '#374151',
        secondaryColor: '#6b7280',
        fontFamily: { heading: 'Inter', body: 'Inter' },
        fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
        spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
        layout: 'single-column',
        headerStyle: 'left',
        sectionTitleStyle: 'underline',
      }),
      is_premium: 0,
    },
    {
      id: 'twoColumn',
      name: '清新双栏',
      category: 'general',
      style: 'creative',
      config: JSON.stringify({
        primaryColor: '#0d9488',
        secondaryColor: '#14b8a6',
        fontFamily: { heading: 'Inter', body: 'Inter' },
        fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
        spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
        layout: 'two-column',
        headerStyle: 'left',
        sectionTitleStyle: 'border-left',
      }),
      is_premium: 0,
    },
    {
      id: 'classic',
      name: '经典模板',
      category: 'general',
      style: 'classic',
      config: JSON.stringify({
        primaryColor: '#0f172a',
        secondaryColor: '#334155',
        fontFamily: { heading: 'Noto Serif SC', body: 'Noto Sans SC' },
        fontSize: { title: 22, heading: 16, subheading: 14, body: 12, small: 10 },
        spacing: { sectionGap: 14, itemGap: 6, lineHeight: 1.6, padding: 20 },
        layout: 'single-column',
        headerStyle: 'center',
        sectionTitleStyle: 'border-bottom',
      }),
      is_premium: 0,
    },
  ];

  defaultTemplates.forEach((template) => {
    db.run(
      'INSERT INTO templates (id, name, category, style, config, is_premium) VALUES (?, ?, ?, ?, ?, ?)',
      [template.id, template.name, template.category, template.style, template.config, template.is_premium]
    );
  });

  console.log('Default templates initialized');
}

// 启动服务器
startServer();

module.exports = app;
