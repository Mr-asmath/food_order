@echo off
REM Food Order App - Start Both Backend and Frontend

echo ==========================================
echo   Food Order App - Startup Script
echo ==========================================
echo.

REM Start Backend Server
echo Starting Backend Server on port 5000...
start cmd /k "cd /d \"d:\program\node js\food_order\backend\" && npm start"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Frontend Server on port 3000...
start cmd /k "cd /d \"d:\program\node js\food_order\frontend\" && npm start"

REM Wait for servers to start
timeout /t 5 /nobreak

echo.
echo ==========================================
echo   Servers Starting...
echo ==========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Check the two new terminal windows for server status.
echo Once both show "running" or "compiled successfully", 
echo the app is ready to use!
echo.
pause
