@echo off
echo Quick API Test...
echo.

echo Testing Health Check...
curl -s http://localhost:8080/api/health/check
echo.
echo.

echo Testing Student Count...
curl -s http://localhost:8080/api/student/getStudentsCount
echo.
echo.

echo Testing Course Count...
curl -s http://localhost:8080/api/course/getCoursesCount
echo.
echo.

pause