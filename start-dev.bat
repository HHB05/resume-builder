@echo off
echo Starting Resume Builder Development Environment...
echo.

echo Starting Backend Server...
start cmd /k "cd /d D:\code\project\resume-builder-server && npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd /d D:\code\project\resume-builder && npm run dev"

echo.
echo ===================================
echo Development environment started!
echo ===================================
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
