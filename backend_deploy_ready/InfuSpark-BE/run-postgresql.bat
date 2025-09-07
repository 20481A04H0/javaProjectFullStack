@echo off
echo Starting InfuSpark Backend with PostgreSQL Cloud Database...
echo.

REM Set environment variables for PostgreSQL
set SPRING_PROFILES_ACTIVE=prod
set DATABASE_URL=jdbc:postgresql://dpg-d2rjhmffte5s738bm0p0-a.oregon-postgres.render.com:5432/lohithraj001
set DB_USERNAME=lohithraj001_user
set DB_PASSWORD=s5Tl9PgPRxzsugEKOE8QsJtN5CH1hfWV
set DB_DRIVER=org.postgresql.Driver
set DB_DIALECT=org.hibernate.dialect.PostgreSQLDialect

echo Environment configured for PostgreSQL Cloud Database
echo Database URL: %DATABASE_URL%
echo Username: %DB_USERNAME%
echo.

REM Clean and compile
echo Cleaning and compiling project...
call mvnw clean compile

if %ERRORLEVEL% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo API Documentation: http://localhost:8080/swagger-ui.html
echo.

REM Run the application
call mvnw spring-boot:run

pause