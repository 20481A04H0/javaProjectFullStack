@echo off
echo Testing PostgreSQL Cloud Database Connection...
echo.

REM Set environment variables
set SPRING_PROFILES_ACTIVE=prod
set DATABASE_URL=jdbc:postgresql://dpg-d2rjhmffte5s738bm0p0-a.oregon-postgres.render.com:5432/lohithraj001
set DB_USERNAME=lohithraj001_user
set DB_PASSWORD=s5Tl9PgPRxzsugEKOE8QsJtN5CH1hfWV

echo Database Configuration:
echo URL: %DATABASE_URL%
echo Username: %DB_USERNAME%
echo.

echo Compiling project...
call mvnw clean compile -q

if %ERRORLEVEL% neq 0 (
    echo Compilation failed!
    pause
    exit /b 1
)

echo.
echo Testing database connection...
echo Starting application in test mode...
echo.
echo If you see "Started IQQuestLearningBeApplication" without errors, the database connection is successful!
echo Press Ctrl+C to stop the test.
echo.

REM Run with minimal logging to test connection
call mvnw spring-boot:run -Dspring-boot.run.arguments="--logging.level.org.springframework.web=WARN --logging.level.org.hibernate=WARN"

pause