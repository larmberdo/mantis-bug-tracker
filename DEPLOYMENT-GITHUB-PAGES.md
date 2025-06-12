# GitHub Pages 部署指南

## 🚀 自动部署

项目已配置GitHub Actions自动部署，每次推送到`main`分支时会自动构建和部署。

### 部署步骤

1. **推送代码到GitHub**
   ```bash
   git add .
   git commit -m "更新Bug记录"
   git push origin main
   ```

2. **GitHub Actions自动执行**
   - 安装依赖
   - 构建Next.js项目
   - 导出静态文件
   - 部署到GitHub Pages

3. **访问网站**
   - 网站地址：https://larmberdo.github.io/mantis-bug-tracker/
   - 通常需要等待1-2分钟部署完成

## ⚙️ GitHub Pages 设置

确保在GitHub仓库设置中：

1. 进入 `Settings` > `Pages`
2. Source 选择 `Deploy from a branch`
3. Branch 选择 `gh-pages`
4. Folder 选择 `/ (root)`

## 📝 添加新Bug后的部署流程

### 方法一：使用命令行工具
```bash
# 添加新Bug
npm run add-bug

# 提交并推送
git add data/bugs.json
git commit -m "添加新Bug记录: [Bug ID]"
git push origin main
```

### 方法二：直接编辑JSON文件
```bash
# 编辑 data/bugs.json 文件
# 提交并推送
git add data/bugs.json
git commit -m "更新Bug记录"
git push origin main
```

## 🔧 本地测试

在推送前可以本地测试：

```bash
# 构建并导出
npm run export

# 本地预览（需要安装serve）
npx serve out
```

## 📊 部署状态

- ✅ 自动部署已配置
- ✅ 静态文件生成
- ✅ GitHub Pages兼容
- ✅ 响应式设计
- ✅ 数据统一管理

## 🌐 访问地址

**生产环境**: https://larmberdo.github.io/mantis-bug-tracker/

**开发环境**: http://localhost:3000 (运行 `npm run dev`)

## 🔄 更新流程

1. 本地开发和测试
2. 添加/修改Bug记录
3. 提交代码到GitHub
4. GitHub Actions自动部署
5. 访问线上地址查看更新

---

💡 **提示**: 每次修改数据后，GitHub Actions会自动重新构建和部署，无需手动操作！ 