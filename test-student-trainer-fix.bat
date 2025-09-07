@echo off
echo Testing Student and Trainer API fixes...
echo.

echo 1. Testing add student (should return student object):
curl -X POST "http://localhost:8080/api/student/addStudent" ^
-H "Content-Type: application/json" ^
-d "{\"firstName\":\"Test\",\"lastName\":\"Student\",\"email\":\"test@test.com\",\"phone\":\"1234567890\",\"address\":\"Test Address\",\"password\":\"password123\",\"courseIds\":[1,2]}"
echo.
echo.

echo 2. Testing get all students (should include courses):
curl -X GET "http://localhost:8080/api/student/getAllStudents" -H "Content-Type: application/json"
echo.
echo.

echo 3. Testing get all trainers:
curl -X GET "http://localhost:8080/api/trainer/getAllTrainers" -H "Content-Type: application/json"
echo.
echo.

echo 4. Testing trainer update (ID=1):
curl -X PUT "http://localhost:8080/api/trainer/update" ^
-H "Content-Type: application/json" ^
-d "{\"id\":1,\"name\":\"Updated Trainer\",\"email\":\"updated@infuspark.com\",\"phone\":\"9876543210\",\"specialization\":\"Updated Specialization\",\"experience\":10,\"active\":true}"
echo.
echo.

pause