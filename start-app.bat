@echo off
echo ========================================
echo   NGOConnect - Starting Application
echo ========================================
echo.

echo [1/2] Starting Backend Server...
start "NGOConnect Backend" cmd /k "cd backend && python app.py"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Server...
start "NGOConnect Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Application Starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Two terminal windows will open.
echo Keep them running while using the app.
echo.
pause
