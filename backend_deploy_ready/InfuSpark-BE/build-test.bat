@echo off
echo Starting Maven build test...
call mvnw.cmd clean compile -DskipTests
if %ERRORLEVEL% EQU 0 (
    echo BUILD SUCCESS!
) else (
    echo BUILD FAILED!
    exit /b 1
)