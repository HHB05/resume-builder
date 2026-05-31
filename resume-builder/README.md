# 简历制作平台

AI驱动的专业简历制作平台，基于Vue 3 + TypeScript + Tailwind CSS构建。

## 功能特性

- ✅ 三栏式简历编辑器（模块面板 + 编辑区域 + 实时预览）
- ✅ 多种专业模板（简约、商务、创意、经典）
- ✅ AI智能助手（内容润色、简历评分、职位匹配）
- ✅ 多格式导出（PDF、Word、图片）
- ✅ 用户系统（登录、注册、个人中心）
- ✅ 简历管理（创建、编辑、删除、收藏）
- ✅ 在线分享（生成分享链接）
- ✅ 多语言支持（中文、英文）
- ✅ 响应式设计（PC、平板、手机）

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **UI框架**: Tailwind CSS
- **富文本编辑**: TipTap
- **HTTP客户端**: Axios
- **国际化**: vue-i18n
- **图表**: ECharts

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
resume-builder/
├── src/
│   ├── assets/              # 静态资源
│   ├── components/          # 可复用组件
│   │   ├── common/          # 通用组件
│   │   ├── layout/          # 布局组件
│   │   ├── editor/          # 编辑器组件
│   │   ├── preview/         # 预览组件
│   │   ├── ai/              # AI助手组件
│   │   └── template/        # 模板组件
│   ├── composables/         # 组合式API
│   ├── stores/              # Pinia状态管理
│   ├── services/            # API服务层
│   ├── types/               # TypeScript类型
│   ├── utils/               # 工具函数
│   ├── i18n/                # 国际化配置
│   ├── views/               # 页面组件
│   ├── router/              # 路由配置
│   └── main.ts              # 入口文件
├── public/                  # 公共资源
├── index.html               # HTML入口
├── vite.config.ts           # Vite配置
├── tailwind.config.js       # Tailwind配置
└── package.json             # 项目配置
```

## 主要页面

- **首页** (`/`): 产品介绍和功能展示
- **模板中心** (`/templates`): 浏览和选择模板
- **定价** (`/pricing`): 查看订阅方案
- **登录/注册** (`/login`, `/register`): 用户认证
- **仪表盘** (`/dashboard`): 管理我的简历
- **编辑器** (`/editor/:id?`): 简历编辑
- **分析报告** (`/analysis/:resumeId`): 简历评分分析
- **在线简历** (`/share/:token`): 查看分享的简历

## 开发说明

### 环境要求

- Node.js >= 18
- npm >= 9

### 代码规范

项目使用ESLint和Prettier进行代码规范检查：

```bash
npm run lint
```

### 类型检查

```bash
npx vue-tsc -b
```

## License

MIT
