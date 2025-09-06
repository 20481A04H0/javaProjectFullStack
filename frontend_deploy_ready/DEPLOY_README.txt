Deployment-ready notes for frontend (auto-generated):
- Ensure you set environment variables or application.properties for DB credentials (backend):
  SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD
- Backend: build with 'mvn -DskipTests package' and run with:
  java -Dserver.port=$PORT -jar target/*.jar
- Frontend: build with maven similarly, and ensure frontend's BASE_URL resolves to backend URL.
- Default admin seeded: admin@example.com / admin123 (password hashed with BCrypt).
- We added spring-security-crypto and actuator dependencies (backend).
- We replaced hard-coded upload directory with system temp uploads directory.
- Confirm repository interface names (AdminLoginRepository) match actual repo names. If not, adjust SeedConfig.java accordingly.
