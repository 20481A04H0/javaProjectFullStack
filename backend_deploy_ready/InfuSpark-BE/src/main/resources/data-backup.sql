-- Backup of original data.sql (renamed to avoid conflicts)
-- This file is not loaded automatically

-- Insert default admin user
INSERT INTO admin (name, email, phone, password) 
VALUES ('System Admin', 'admin@infuspark.com', '1234567890', 'admin123');

-- Insert sample students for testing
INSERT INTO student_data (first_name, last_name, address, phone, email, password) VALUES 
('John', 'Doe', '123 Main St', '9876543210', 'john.doe@student.com', 'password123'),
('Jane', 'Smith', '456 Oak Ave', '9876543211', 'jane.smith@student.com', 'password123'),
('Mike', 'Johnson', '789 Pine Rd', '9876543212', 'mike.johnson@student.com', 'password123'),
('Sarah', 'Wilson', '321 Elm St', '9876543213', 'sarah.wilson@student.com', 'password123'),
('David', 'Brown', '654 Maple Dr', '9876543214', 'david.brown@student.com', 'password123');

-- Insert sample courses
INSERT INTO course (name) VALUES 
('Java Full Stack Development'),
('Python Development'),
('Azure Data Engineering'),
('AWS Cloud Architecture'),
('Data Engineering with Spark'),
('GCP Microservices');

-- Insert sample trainers
INSERT INTO trainer (name, email, phone, expertise, experience, active) VALUES 
('John Smith', 'john.smith@infuspark.com', '9876543210', 'Python, Django, React', 5, true),
('Sarah Johnson', 'sarah.johnson@infuspark.com', '9876543211', 'Java, Spring Boot, Angular', 7, true),
('Mike Davis', 'mike.davis@infuspark.com', '9876543212', 'Azure, Databricks, Spark', 6, true),
('Lisa Wilson', 'lisa.wilson@infuspark.com', '9876543213', 'AWS, DevOps, Cloud Architecture', 8, true),
('David Brown', 'david.brown@infuspark.com', '9876543214', 'Data Engineering, ETL, Big Data', 4, true),
('Emma Taylor', 'emma.taylor@infuspark.com', '9876543215', 'GCP, Kubernetes, Microservices', 6, true);