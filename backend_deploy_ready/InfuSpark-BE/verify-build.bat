@echo off
echo ========================================
echo InfuSpark Backend Build Verification
echo ========================================

echo.
echo Step 1: Cleaning previous build...
if exist target rmdir /s /q target

echo.
echo Step 2: Checking Java version...
java -version

echo.
echo Step 3: Checking Maven wrapper...
if exist mvnw.cmd (
    echo Maven wrapper found
) else (
    echo ERROR: Maven wrapper not found!
    exit /b 1
)

echo.
echo Step 4: Compiling project...
call mvnw.cmd clean compile -DskipTests -q

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ BUILD SUCCESS!
    echo ========================================
    echo.
    echo Project compiled successfully!
    echo You can now run the application with:
    echo   mvnw.cmd spring-boot:run
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ BUILD FAILED!
    echo ========================================
    echo.
    echo Please check the error messages above.
    exit /b 1
)

pause