# Mantis ECMS Bug 跟踪记录系统

基于 Next.js 和 Tailwind CSS 构建的现代化 Bug 跟踪系统。

## 🚀 特性

- ✨ 现代化的响应式设计
- 📱 移动端友好
- 🎨 使用 Tailwind CSS 样式框架
- 📊 数据统一管理（JSON 文件）
- 🔧 TypeScript 支持
- 📝 简单的命令行工具添加新 Bug
- 🏗️ 静态站点生成，易于部署

## 📦 安装

```bash
# 安装依赖
npm install

# 或使用 yarn
yarn install
```

## 🛠️ 开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 📝 添加新的 Bug 记录

### 方法一：使用命令行工具（推荐）

```bash
npm run add-bug
```

然后按照提示输入 Bug 信息即可。

### 方法二：直接编辑数据文件

编辑 `data/bugs.json` 文件，在 `bugs` 数组中添加新的记录：

```json
{
  "id": "0000211",
  "title": "新的Bug标题",
  "status": "pending",
  "assignee": "处理人员",
  "date": "2024-06-12",
  "description": "问题描述",
  "steps": "复现步骤",
  "screenshotPath": "截图路径",
  "note": "备注（可选）"
}
```

## 🏗️ 构建和部署

```bash
# 构建静态站点
npm run build
npm run export

# 构建后的文件在 out/ 目录中
```

## 📁 项目结构

```
├── components/          # React 组件
│   ├── BugCard.tsx     # Bug 卡片组件
│   └── StatusLegend.tsx # 状态图例组件
├── data/               # 数据文件
│   └── bugs.json       # Bug 数据
├── pages/              # Next.js 页面
│   ├── _app.tsx        # App 组件
│   └── index.tsx       # 主页
├── scripts/            # 工具脚本
│   └── add-bug.js      # 添加 Bug 的脚本
├── styles/             # 样式文件
│   └── globals.css     # 全局样式
├── types/              # TypeScript 类型定义
│   └── bug.ts          # Bug 相关类型
└── ...配置文件
```

## 🎨 状态类型

- `completed` - 🟢 已完成：问题已修复并验证
- `pending` - 🔴 未完成：问题待处理
- `transfer` - 🟡 需要转移：需要其他团队/人员处理
- `not-bug` - 🟠 非Bug：不是实际问题，待退回

## 🔧 自定义

### 修改样式

编辑 `styles/globals.css` 或 `tailwind.config.js` 来自定义样式。

### 添加新的状态类型

1. 在 `data/bugs.json` 的 `statusConfig` 中添加新状态
2. 在 `types/bug.ts` 中更新状态类型
3. 在 `styles/globals.css` 中添加对应的样式类

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！ 