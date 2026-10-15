@echo off
title Project Nirmaan - Backend Server
color 0b
cls
echo ======================================================================
echo                 PROJECT NIRMAAN - BACKEND LAUNCHER
echo ======================================================================
echo.

:: Navigate to backend folder
cd /d "%~dp0backend"

:: Verify Node.js exists
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0c
    echo [ERROR] Node.js was not detected on your system.
    echo Please install Node.js from https://nodejs.org/ to run the backend.
    echo.
    pause
    exit /b
)

echo [*] Starting Node.js Express server on port 5000...
echo [*] Working directory: %cd%
echo.
echo ======================================================================
echo   Backend URL:    http://localhost:5000
echo   Health Check:   http://localhost:5000/api/health
echo   Round 1 API:    http://localhost:5000/api/round1/questions
echo ======================================================================
echo.
echo Press Ctrl+C in this window at any time to stop the server.
echo.

node server.js

if %errorlevel% neq 0 (
    echo.
    echo [!] Server exited with an error. Check the messages above.
    pause
)
