@echo off
echo Testing Course API...
echo.

REM Test the course API endpoint
echo Testing GET /api/course/allCourse
curl -X GET "http://localhost:8080/api/course/allCourse" -H "Content-Type: application/json"

echo.
echo.
echo If you see JSON data with course id and name, the API is working!
echo If you see an error, check the backend logs.
pause