@echo off
echo Cleaning and starting InfuSpark Backend...
echo.

echo Cleaning Maven build...
call mvnw.cmd clean

echo.
echo Starting application...
call mvnw.cmd spring-boot:run

pause