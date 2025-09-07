@echo off
echo Starting InfuSpark Backend with PostgreSQL...
echo.
echo Database: PostgreSQL (Cloud)
echo Host: dpg-d2rjhmffte5s738bm0p0-a.oregon-postgres.render.com
echo Database: lohithraj001
echo.
echo Migrating Excel data to PostgreSQL...
echo.

call mvnw.cmd spring-boot:run

pause