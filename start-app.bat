@echo off
echo ========================================
echo   NGOConnect - Starting Application
echo ========================================
echo.

echo [1/2] Starting Backend Server...
where python >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python was not found on PATH.
    echo Install Python 3.10+ from https://www.python.org/downloads/
    echo Make sure "Add Python to PATH" is selected during installation.
    pause
    exit /b 1
)
start "NGOConnect Backend" cmd /k "cd /d ""%~dp0backend"" && python app.py"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Server...
start "NGOConnect Frontend" cmd /k "cd /d ""%~dp0"" && npm run dev"

echo.
echo ========================================
echo   Application Starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5174
echo.
echo Two terminal windows will open.
echo Keep them running while using the app.
echo.
pause
