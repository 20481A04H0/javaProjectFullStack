-- Initial data for InfuSpark Learning Management System
-- PostgreSQL compatible syntax

-- Insert default admin user (only if not exists)
INSERT INTO admin (name, email, phone, password) 
SELECT 'System Admin', 'admin@infuspark.com', '1234567890', 'admin123'
WHERE NOT EXISTS (SELECT 1 FROM admin WHERE email = 'admin@infuspark.com');

-- Insert sample student for testing (only if not exists)
INSERT INTO student_data (first_name, last_name, address, phone, email, password) 
SELECT 'John', 'Doe', '123 Main St', '9876543210', 'student@infuspark.com', 'student123'
WHERE NOT EXISTS (SELECT 1 FROM student_data WHERE email = 'student@infuspark.com');

-- Insert sample courses (only if not exists)
INSERT INTO course (name) 
SELECT 'Python Full Stack Development' WHERE NOT EXISTS (SELECT 1 FROM course WHERE name = 'Python Full Stack Development')
UNION ALL
SELECT 'Java Full Stack Development' WHERE NOT EXISTS (SELECT 1 FROM course WHERE name = 'Java Full Stack Development')
UNION ALL
SELECT 'Azure Databricks' WHERE NOT EXISTS (SELECT 1 FROM course WHERE name = 'Azure Databricks')
UNION ALL
SELECT 'AWS Cloud Computing' WHERE NOT EXISTS (SELECT 1 FROM course WHERE name = 'AWS Cloud Computing')
UNION ALL
SELECT 'Data Engineering' WHERE NOT EXISTS (SELECT 1 FROM course WHERE name = 'Data Engineering')
UNION ALL
SELECT 'Google Cloud Platform' WHERE NOT EXISTS (SELECT 1 FROM course WHERE name = 'Google Cloud Platform');

-- Insert sample trainers (only if not exists)
INSERT INTO trainer (name, email, phone, expertise, experience, active) 
SELECT 'John Smith', 'john.smith@infuspark.com', '9876543210', 'Python, Django, React', 5, true
WHERE NOT EXISTS (SELECT 1 FROM trainer WHERE email = 'john.smith@infuspark.com')
UNION ALL
SELECT 'Sarah Johnson', 'sarah.johnson@infuspark.com', '9876543211', 'Java, Spring Boot, Angular', 7, true
WHERE NOT EXISTS (SELECT 1 FROM trainer WHERE email = 'sarah.johnson@infuspark.com')
UNION ALL
SELECT 'Mike Davis', 'mike.davis@infuspark.com', '9876543212', 'Azure, Databricks, Spark', 6, true
WHERE NOT EXISTS (SELECT 1 FROM trainer WHERE email = 'mike.davis@infuspark.com')
UNION ALL
SELECT 'Lisa Wilson', 'lisa.wilson@infuspark.com', '9876543213', 'AWS, DevOps, Cloud Architecture', 8, true
WHERE NOT EXISTS (SELECT 1 FROM trainer WHERE email = 'lisa.wilson@infuspark.com')
UNION ALL
SELECT 'David Brown', 'david.brown@infuspark.com', '9876543214', 'Data Engineering, ETL, Big Data', 4, true
WHERE NOT EXISTS (SELECT 1 FROM trainer WHERE email = 'david.brown@infuspark.com')
UNION ALL
SELECT 'Emma Taylor', 'emma.taylor@infuspark.com', '9876543215', 'GCP, Kubernetes, Microservices', 6, true
WHERE NOT EXISTS (SELECT 1 FROM trainer WHERE email = 'emma.taylor@infuspark.com');

-- Additional sample students for testing
INSERT INTO student_data (first_name, last_name, address, phone, email, password) 
SELECT 'Alice', 'Smith', '456 Oak Ave', '9876543220', 'alice.smith@example.com', 'password123'
WHERE NOT EXISTS (SELECT 1 FROM student_data WHERE email = 'alice.smith@example.com')
UNION ALL
SELECT 'Bob', 'Johnson', '789 Pine St', '9876543221', 'bob.johnson@example.com', 'password123'
WHERE NOT EXISTS (SELECT 1 FROM student_data WHERE email = 'bob.johnson@example.com')
UNION ALL
SELECT 'Carol', 'Williams', '321 Elm Dr', '9876543222', 'carol.williams@example.com', 'password123'
WHERE NOT EXISTS (SELECT 1 FROM student_data WHERE email = 'carol.williams@example.com');

-- Assign some students to courses (sample data)
-- Note: This will be handled by the application logic for course enrollment