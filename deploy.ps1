# Mantis Bug Tracker 部署脚本
# 使用方法: .\deploy.ps1 你的GitHub用户名

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername
)

Write-Host "🚀 开始部署 Mantis Bug Tracker..." -ForegroundColor Green

# 检查是否已经添加了远程仓库
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "📡 添加GitHub远程仓库..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$GitHubUsername/mantis-bug-tracker.git"
}

# 推送到GitHub
Write-Host "📤 推送代码到GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "🌐 你的网站将在几分钟后可以通过以下地址访问：" -ForegroundColor Cyan
Write-Host "   https://$GitHubUsername.github.io/mantis-bug-tracker" -ForegroundColor Blue

Write-Host ""
Write-Host "📋 接下来的步骤：" -ForegroundColor Yellow
Write-Host "1. 登录 GitHub.com" -ForegroundColor White
Write-Host "2. 进入你的 mantis-bug-tracker 仓库" -ForegroundColor White
Write-Host "3. 点击 Settings 选项卡" -ForegroundColor White
Write-Host "4. 在左侧菜单找到 Pages" -ForegroundColor White
Write-Host "5. 在 Source 下选择 'Deploy from a branch'" -ForegroundColor White
Write-Host "6. 选择 'main' 分支和 '/ (root)' 文件夹" -ForegroundColor White
Write-Host "7. 点击 Save" -ForegroundColor White
Write-Host ""
Write-Host "⏰ GitHub Pages 通常需要 5-10 分钟来构建和部署网站" -ForegroundColor Magenta 