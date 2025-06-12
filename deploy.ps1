# Mantis Bug Tracker Deploy Script
# Usage: .\deploy.ps1 YourGitHubUsername

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername
)

Write-Host "Starting deployment..." -ForegroundColor Green

# Check if remote repository already exists
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "Adding GitHub remote repository..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$GitHubUsername/mantis-bug-tracker.git"
}

# Push to GitHub
Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Your website will be available at:" -ForegroundColor Cyan
Write-Host "   https://$GitHubUsername.github.io/mantis-bug-tracker" -ForegroundColor Blue

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Login to GitHub.com" -ForegroundColor White
Write-Host "2. Go to your mantis-bug-tracker repository" -ForegroundColor White
Write-Host "3. Click Settings tab" -ForegroundColor White
Write-Host "4. Find Pages in left menu" -ForegroundColor White
Write-Host "5. Select Deploy from a branch" -ForegroundColor White
Write-Host "6. Choose main branch and root folder" -ForegroundColor White
Write-Host "7. Click Save" -ForegroundColor White
Write-Host ""
Write-Host "GitHub Pages usually takes 5-10 minutes to build and deploy" -ForegroundColor Magenta