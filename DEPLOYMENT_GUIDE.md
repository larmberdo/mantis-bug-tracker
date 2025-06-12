# 📚 Mantis Bug Tracker 部署指南

## 🎯 目标
将你的 Mantis Bug 跟踪页面部署到 GitHub Pages，让团队成员可以通过网址直接访问。

## 📋 前置条件
- ✅ 已安装 Git
- ✅ 拥有 GitHub 账号
- ✅ 已准备好 HTML 文件

## 🚀 快速部署步骤

### 步骤 1: 在 GitHub 上创建仓库
1. 登录 [GitHub.com](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称填写：`mantis-bug-tracker`
4. 设置为 **Public**（这样才能使用免费的 GitHub Pages）
5. **不要**勾选 "Add a README file"
6. 点击 "Create repository"

### 步骤 2: 使用自动化脚本部署
在当前目录下运行：
```powershell
.\deploy.ps1 你的GitHub用户名
```

例如，如果你的 GitHub 用户名是 `john123`：
```powershell
.\deploy.ps1 john123
```

### 步骤 3: 启用 GitHub Pages
1. 在 GitHub 仓库页面，点击 **Settings** 选项卡
2. 在左侧菜单中找到 **Pages**
3. 在 "Source" 部分：
   - 选择 **Deploy from a branch**
   - Branch 选择 **main**
   - Folder 选择 **/ (root)**
4. 点击 **Save**

### 步骤 4: 访问你的网站
- 网站地址：`https://你的用户名.github.io/mantis-bug-tracker`
- 首次部署需要等待 5-10 分钟

## 🔄 更新网站内容

当你需要更新 Bug 记录时：

1. 修改 `index.html` 文件
2. 运行以下命令：
```powershell
git add .
git commit -m "更新Bug记录"
git push
```

## 🛠️ 手动部署步骤（备选方案）

如果自动化脚本不工作，可以手动执行：

```powershell
# 添加远程仓库
git remote add origin https://github.com/你的用户名/mantis-bug-tracker.git

# 推送代码
git branch -M main
git push -u origin main
```

## 🎨 自定义域名（可选）

如果你有自己的域名，可以：
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容写入你的域名，如：`bugs.yourcompany.com`
3. 在你的域名提供商处设置 CNAME 记录指向 `你的用户名.github.io`

## 🔧 故障排除

### 问题：网站显示 404
- 确保仓库是 Public
- 确保已启用 GitHub Pages
- 确保主文件名为 `index.html`

### 问题：推送失败
- 检查 GitHub 用户名是否正确
- 确保已创建对应的仓库
- 检查网络连接

### 问题：样式不显示
- 确保 CSS 代码在 HTML 文件的 `<style>` 标签内
- 检查浏览器控制台是否有错误

## 📞 技术支持

如遇到问题，请检查：
1. Git 版本：`git --version`
2. 网络连接是否正常
3. GitHub 仓库是否已创建
4. 用户名是否正确

---

🎉 **恭喜！你的 Bug 跟踪系统现在可以在线访问了！** 