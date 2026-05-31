# 简历制作平台

AI驱动的专业简历制作平台，包含完整的前端和后端实现。

## 项目结构

```
project/
├── resume-builder/          # 前端项目 (Vue 3 + TypeScript)
├── resume-builder-server/   # 后端项目 (Node.js + Express)
└── start-dev.bat            # 开发环境启动脚本
```

## 功能特性

### 前端功能
- ✅ 三栏式简历编辑器
- ✅ 多种专业模板
- ✅ AI智能助手
- ✅ 多格式导出
- ✅ 用户系统
- ✅ 响应式设计

### 后端功能
- ✅ RESTful API
- ✅ JWT认证
- ✅ SQLite数据库
- ✅ 用户管理
- ✅ 简历CRUD
- ✅ AI功能模拟

## 快速开始

### 前置要求

- Node.js >= 18
- npm >= 9

### 启动开发环境

**Windows用户：**

```bash
# 双击运行
start-dev.bat
```

**手动启动：**

```bash
# 终端1：启动后端
cd resume-builder-server
npm install
npm run dev

# 终端2：启动前端
cd resume-builder
npm install
npm run dev
```

### 访问应用

- 前端: http://localhost:3000
- 后端API: http://localhost:3001/api/v1

## API文档

详见 [后端API文档](resume-builder-server/README.md)

### 主要接口

| 模块 | 接口 | 描述 |
|------|------|------|
| 认证 | POST /api/v1/auth/register | 注册 |
| 认证 | POST /api/v1/auth/login | 登录 |
| 简历 | GET /api/v1/resumes | 获取简历列表 |
| 简历 | POST /api/v1/resumes | 创建简历 |
| 模板 | GET /api/v1/templates | 获取模板列表 |
| AI | POST /api/v1/ai/polish | 文本润色 |
| 分享 | POST /api/v1/share/create | 创建分享 |

## 技术栈

### 前端
- Vue 3 + TypeScript
- Vite
- Pinia
- Tailwind CSS
- TipTap (富文本编辑)
- Axios

### 后端
- Node.js + Express
- SQLite (sql.js)
- JWT
- bcryptjs

## 项目配置

### 前端环境变量

创建 `.env.development` 文件：

```env
VITE_API_BASE_URL=http://localhost:3001/api/v1
```

### 后端环境变量

创建 `.env` 文件：

```env
PORT=3001
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

## 开发说明

### 前端开发

```bash
cd resume-builder
npm install
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
```

### 后端开发

```bash
cd resume-builder-server
npm install
npm run dev      # 启动开发服务器（支持热重载）
npm start        # 启动生产服务器
```

## 数据库

后端使用 SQLite 数据库，数据文件位于：

```
resume-builder-server/data/resume-builder.db
```

数据库会在首次启动时自动创建并初始化表结构和默认数据。

## 部署

### 前端部署

```bash
cd resume-builder
npm run build
# 将 dist 目录部署到静态服务器
```

### 后端部署

```bash
cd resume-builder-server
npm install --production
npm start
# 建议使用 PM2 或 Docker 部署
```

## License

MIT
