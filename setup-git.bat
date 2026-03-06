@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: NGOConnect full-stack application"

echo Renaming branch to main...
git branch -M main

echo.
echo Now run this command with your GitHub username:
echo git remote add origin https://github.com/YOUR_USERNAME/NGOConnect.git
echo git push -u origin main
echo.
pause
