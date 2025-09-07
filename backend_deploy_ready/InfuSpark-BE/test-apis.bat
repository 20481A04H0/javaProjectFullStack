@echo off
echo Testing InfuSpark APIs...
echo.

echo 1. Testing Course API...
curl -X GET http://localhost:8080/api/course/allCourse
echo.
echo.

echo 2. Testing Students Count...
curl -X GET http://localhost:8080/api/student/getStudentsCount
echo.
echo.

echo 3. Testing All Students...
curl -X GET http://localhost:8080/api/student/getAllStudents
echo.
echo.

echo 4. Testing Student Login...
curl -X POST http://localhost:8080/api/student/studentLogin -H "Content-Type: application/json" -d "{\"email\":\"john.doe@student.com\",\"password\":\"password123\"}"
echo.
echo.

pause