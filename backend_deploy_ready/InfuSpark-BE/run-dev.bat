@echo off
echo Starting InfuSpark Backend in Development Mode...
echo Using H2 Database (in-memory)
echo.
echo H2 Console will be available at: http://localhost:8080/h2-console
echo JDBC URL: jdbc:h2:mem:testdb
echo Username: sa
echo Password: (leave empty)
echo.

call mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev

pause