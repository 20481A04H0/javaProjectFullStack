@echo off
echo ========================================
echo   InfuSpark Backend - Local Development
echo ========================================
echo.
echo Starting application with PostgreSQL...
echo.
echo Make sure PostgreSQL is running on localhost:5432
echo Database: infuspark_db
echo.
echo Test Credentials:
echo Admin: admin@infuspark.com / admin123
echo Student: student@infuspark.com / student123
echo.
echo ========================================
echo.

call mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev

pause