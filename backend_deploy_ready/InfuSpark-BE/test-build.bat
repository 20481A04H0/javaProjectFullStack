@echo off
echo Testing Maven build...
echo.

REM Check if Maven wrapper exists
if not exist mvnw.cmd (
    echo ERROR: Maven wrapper not found!
    echo Please ensure mvnw.cmd exists in the project root.
    pause
    exit /b 1
)

echo Cleaning project...
call mvnw.cmd clean -q

echo.
echo Compiling project...
call mvnw.cmd compile -DskipTests -q

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ BUILD SUCCESS!
    echo ========================================
    echo.
    echo The project compiled successfully.
    echo You can now run it with Spring Boot extension.
) else (
    echo.
    echo ========================================
    echo ❌ BUILD FAILED!
    echo ========================================
    echo.
    echo Running detailed compilation to show errors...
    echo.
    call mvnw.cmd compile -DskipTests -X
)

pause