@echo off
echo Starting InfuSpark Backend (Minimal Mode)...
echo.
echo Database: PostgreSQL Cloud
echo Mode: Minimal entities without relationships
echo.

call mvnw.cmd clean spring-boot:run

pause