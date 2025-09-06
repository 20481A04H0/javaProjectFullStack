@echo off
echo Testing InfuSpark API Endpoints...
echo.

echo Testing Admin Login:
curl -X POST http://localhost:8080/api/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@infuspark.com\",\"password\":\"admin123\"}"
echo.
echo.

echo Testing Student Login:
curl -X POST http://localhost:8080/api/student/studentLogin -H "Content-Type: application/json" -d "{\"email\":\"student@infuspark.com\",\"password\":\"student123\"}"
echo.
echo.

echo Testing Get All Students:
curl -X GET http://localhost:8080/api/student/getAllStudents
echo.
echo.

echo Testing Get All Courses:
curl -X GET http://localhost:8080/api/course/allCourse
echo.
echo.

echo Testing Get All Trainers:
curl -X GET http://localhost:8080/api/trainer/getAllTrainers
echo.

pause