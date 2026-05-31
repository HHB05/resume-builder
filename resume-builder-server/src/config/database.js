const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || './data/resume-builder.db';

let db = null;

// 初始化数据库
async function initDatabase() {
  try {
    // 确保数据目录存在
    const dbDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // 初始化sql.js
    const SQL = await initSqlJs();

    // 如果数据库文件存在，读取它
    if (fs.existsSync(DB_PATH)) {
      const fileBuffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(fileBuffer);
      console.log('Database loaded from file');
    } else {
      // 创建新数据库
      db = new SQL.Database();
      console.log('New database created');
    }

    // 创建表
    createTables();

    // 保存数据库
    saveDatabase();

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// 创建表结构
function createTables() {
  // 用户表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      nickname TEXT NOT NULL,
      avatar_url TEXT,
      plan_type TEXT DEFAULT 'free',
      plan_expire_at TEXT,
      status INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // 简历表
  db.run(`
    CREATE TABLE IF NOT EXISTS resumes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      template_id TEXT NOT NULL DEFAULT 'minimal',
      content TEXT NOT NULL,
      language TEXT DEFAULT 'zh',
      version INTEGER DEFAULT 1,
      score REAL,
      is_favorite INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 模板表
  db.run(`
    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      style TEXT NOT NULL,
      thumbnail_url TEXT,
      config TEXT NOT NULL,
      is_premium INTEGER DEFAULT 0,
      download_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      rating_count INTEGER DEFAULT 0,
      status INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // AI记录表
  db.run(`
    CREATE TABLE IF NOT EXISTS ai_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      resume_id TEXT,
      action_type TEXT NOT NULL,
      input_text TEXT,
      output_text TEXT,
      tokens_used INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 分享记录表
  db.run(`
    CREATE TABLE IF NOT EXISTS share_records (
      id TEXT PRIMARY KEY,
      resume_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      share_token TEXT UNIQUE NOT NULL,
      password TEXT,
      expire_at TEXT,
      view_count INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (resume_id) REFERENCES resumes(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 创建索引
  db.run('CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_ai_records_user_id ON ai_records(user_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_share_records_token ON share_records(share_token)');
}

// 保存数据库到文件
function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

// 获取数据库实例
function getDatabase() {
  return db;
}

// 定期保存数据库（每30秒）
setInterval(() => {
  if (db) {
    saveDatabase();
  }
}, 30000);

module.exports = {
  initDatabase,
  getDatabase,
  saveDatabase,
};
