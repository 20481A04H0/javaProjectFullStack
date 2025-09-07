@echo off
echo Testing Trainer Update Response Format...
echo.

echo Testing trainer update with proper response handling:
curl -X PUT "http://localhost:8080/api/trainer/update" ^
-H "Content-Type: application/json" ^
-d "{\"id\":1,\"name\":\"Test Update\",\"email\":\"test@infuspark.com\",\"phone\":\"1234567890\",\"specialization\":\"Test Specialization\",\"experience\":5,\"active\":true}"
echo.
echo.

pause