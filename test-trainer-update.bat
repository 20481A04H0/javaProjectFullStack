@echo off
echo Testing Trainer Update Functionality...
echo.

echo 1. Get trainer by ID (should return TrainerResponseDTO format):
curl -X GET "http://localhost:8080/api/trainer/1" -H "Content-Type: application/json"
echo.
echo.

echo 2. Update trainer (using TrainerRequestDTO format):
curl -X PUT "http://localhost:8080/api/trainer/update" ^
-H "Content-Type: application/json" ^
-d "{\"id\":1,\"name\":\"Updated Trainer Name\",\"email\":\"updated@infuspark.com\",\"phone\":\"9876543210\",\"specialization\":\"Updated Java Development\",\"experience\":8,\"active\":true}"
echo.
echo.

echo 3. Verify update - Get trainer by ID again:
curl -X GET "http://localhost:8080/api/trainer/1" -H "Content-Type: application/json"
echo.
echo.

pause