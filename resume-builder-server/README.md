# 简历制作平台 - 后端API服务

基于 Node.js + Express + SQLite 构建的后端API服务。

## 技术栈

- **运行时**: Node.js
- **框架**: Express
- **数据库**: SQLite (sql.js)
- **认证**: JWT
- **其他**: bcryptjs, uuid, cors, helmet

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 启动生产服务器

```bash
npm start
```

服务器将在 http://localhost:3001 启动

## API 接口

### 认证接口

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /api/v1/auth/register | 用户注册 | ❌ |
| POST | /api/v1/auth/login | 用户登录 | ❌ |
| POST | /api/v1/auth/refresh | 刷新Token | ❌ |
| GET | /api/v1/auth/profile | 获取用户信息 | ✅ |
| PUT | /api/v1/auth/profile | 更新用户信息 | ✅ |

### 简历接口

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| GET | /api/v1/resumes | 获取简历列表 | ✅ |
| GET | /api/v1/resumes/:id | 获取单个简历 | ✅ |
| POST | /api/v1/resumes | 创建简历 | ✅ |
| PUT | /api/v1/resumes/:id | 更新简历 | ✅ |
| DELETE | /api/v1/resumes/:id | 删除简历 | ✅ |
| POST | /api/v1/resumes/:id/duplicate | 复制简历 | ✅ |
| POST | /api/v1/resumes/:id/favorite | 切换收藏 | ✅ |

### 模板接口

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| GET | /api/v1/templates | 获取模板列表 | ❌ |
| GET | /api/v1/templates/:id | 获取单个模板 | ❌ |
| POST | /api/v1/templates/:id/rate | 评分模板 | ✅ |

### AI接口

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /api/v1/ai/polish | 文本润色 | ✅ |
| POST | /api/v1/ai/score | 简历评分 | ✅ |
| POST | /api/v1/ai/match | 职位匹配 | ✅ |
| POST | /api/v1/ai/generate | 生成内容 | ✅ |
| GET | /api/v1/ai/usage | 获取使用量 | ✅ |

### 分享接口

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /api/v1/share/create | 创建分享链接 | ✅ |
| GET | /api/v1/share/public/:token | 获取分享简历 | ❌ |
| GET | /api/v1/share/records | 获取分享记录 | ✅ |
| PUT | /api/v1/share/:token | 更新分享设置 | ✅ |
| DELETE | /api/v1/share/:token | 删除分享 | ✅ |
| GET | /api/v1/share/:token/stats | 获取分享统计 | ✅ |

## 请求示例

### 注册

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "nickname": "测试用户"
  }'
```

### 登录

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

### 创建简历

```bash
curl -X POST http://localhost:3001/api/v1/resumes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "我的简历",
    "templateId": "minimal"
  }'
```

## 环境变量

在 `.env` 文件中配置：

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
DB_PATH=./data/resume-builder.db
CORS_ORIGIN=http://localhost:3000
```

## 数据库

使用 SQLite 作为数据库，数据存储在 `./data/resume-builder.db` 文件中。

数据库会在服务器启动时自动初始化，包括：
- 创建所有必要的表
- 初始化默认模板数据

## 项目结构

```
resume-builder-server/
├── src/
│   ├── config/           # 配置文件
│   │   ├── database.js   # 数据库配置
│   │   └── jwt.js        # JWT配置
│   ├── controllers/      # 控制器
│   │   ├── auth.controller.js
│   │   ├── resume.controller.js
│   │   ├── template.controller.js
│   │   ├── ai.controller.js
│   │   └── share.controller.js
│   ├── middleware/        # 中间件
│   │   └── auth.js       # 认证中间件
│   ├── routes/           # 路由
│   │   ├── auth.routes.js
│   │   ├── resume.routes.js
│   │   ├── template.routes.js
│   │   ├── ai.routes.js
│   │   └── share.routes.js
│   └── index.js          # 入口文件
├── uploads/              # 上传文件目录
├── data/                 # 数据库文件目录
├── .env                  # 环境变量
└── package.json
```

## 与前端集成

确保前端的 API 基础 URL 配置为：

```typescript
// 前端 .env.development
VITE_API_BASE_URL=http://localhost:3001/api/v1
```
