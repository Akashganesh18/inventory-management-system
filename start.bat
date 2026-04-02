@echo off
title Inventory Pro Startup
echo =======================================
echo     Starting Inventory Pro Dashboard
echo          (MongoDB Mode)
echo =======================================
echo.

echo [+] Booting Backend Server (Port 5000)...
start "Inventory Backend" cmd /k "cd backend && node server.js"

echo [+] Booting Frontend UI Server (Port 5173)...
start "Inventory Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Waiting for Vite server to initialize...
timeout /t 4 /nobreak > NUL

echo [+] Launching Browser...
start http://localhost:5173

echo.
echo =======================================
echo All Systems Online! 🚀
echo Note: Keep the two black command prompt windows open.
echo Closing them will shut down the application.
echo =======================================
pause
