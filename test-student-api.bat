@echo off
echo Testing Student API endpoints with course information...
echo.

echo 1. Testing getAllStudents endpoint (should include courses):
curl -X GET "http://localhost:8080/api/student/getAllStudents" -H "Content-Type: application/json"
echo.
echo.

echo 2. Testing getStudentsCount endpoint:
curl -X GET "http://localhost:8080/api/student/getStudentsCount" -H "Content-Type: application/json"
echo.
echo.

echo 3. Testing get student by ID (ID=1) - should include courses:
curl -X GET "http://localhost:8080/api/student/1" -H "Content-Type: application/json"
echo.
echo.

echo 4. Testing course endpoint:
curl -X GET "http://localhost:8080/api/course/allCourse" -H "Content-Type: application/json"
echo.
echo.

pause