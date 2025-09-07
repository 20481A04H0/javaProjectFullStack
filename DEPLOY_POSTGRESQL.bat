@echo off
echo ========================================
echo InfuSpark PostgreSQL Cloud Deployment
echo ========================================
echo.

echo Step 1: Testing PostgreSQL Connection...
cd backend_deploy_ready\InfuSpark-BE
call test-database.bat

if %ERRORLEVEL% neq 0 (
    echo Database connection test failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Starting Backend with PostgreSQL...
start "InfuSpark Backend" cmd /k "call run-postgresql.bat"

echo Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo.
echo Step 3: Starting Frontend...
cd ..\..\frontend_deploy_ready\frontend\InfuSpark-UI
start "InfuSpark Frontend" cmd /k "mvnw spring-boot:run -Dserver.port=8082"

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:8082
echo API Docs: http://localhost:8080/swagger-ui.html
echo.
echo Default Login Credentials:
echo Admin: admin@infuspark.com / admin123
echo Student: student@infuspark.com / student123
echo.
echo Press any key to open the application...
pause > nul

start http://localhost:8082/HomePage.html

echo.
echo Both services are running!
echo Close this window when done testing.
pause