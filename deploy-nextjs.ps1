# Mantis Bug Tracker Next.js 部署脚本

Write-Host "🚀 开始部署 Mantis Bug Tracker (Next.js版本)..." -ForegroundColor Green

# 检查 Node.js 是否安装
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js 版本: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 错误: 未找到 Node.js，请先安装 Node.js" -ForegroundColor Red
    exit 1
}

# 检查 npm 是否可用
try {
    $npmVersion = npm --version
    Write-Host "✅ npm 版本: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 错误: npm 不可用" -ForegroundColor Red
    exit 1
}

# 安装依赖
Write-Host "📦 安装依赖..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}

# 构建项目
Write-Host "🏗️ 构建项目..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 项目构建失败" -ForegroundColor Red
    exit 1
}

# 导出静态文件
Write-Host "📤 导出静态文件..." -ForegroundColor Yellow
npm run export
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 静态文件导出失败" -ForegroundColor Red
    exit 1
}

Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "📁 静态文件位置: ./out/" -ForegroundColor Cyan
Write-Host "🌐 您可以将 out/ 目录中的文件部署到任何静态文件服务器" -ForegroundColor Cyan

# 询问是否启动本地预览
$preview = Read-Host "是否启动本地预览服务器？(y/N)"
if ($preview -eq "y" -or $preview -eq "Y") {
    Write-Host "🌐 启动本地预览服务器..." -ForegroundColor Yellow
    npx serve out
} 