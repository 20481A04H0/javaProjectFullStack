-- Initial data for InfuSpark Learning Management System

-- Insert default admin user
INSERT INTO admin (name, email, phone, password) 
VALUES ('System Admin', 'admin@infuspark.com', '1234567890', 'admin123');

-- Insert sample student for testing
INSERT INTO student_data (first_name, last_name, address, phone, email, password) 
VALUES ('John', 'Doe', '123 Main St', '9876543210', 'student@infuspark.com', 'student123');

-- Insert sample courses
INSERT INTO course (name) VALUES 
('Python Full Stack Development'),
('Java Full Stack Development'),
('Azure Databricks'),
('AWS Cloud Computing'),
('Data Engineering'),
('Google Cloud Platform');

-- Insert sample trainers
INSERT INTO trainer (name, email, phone, expertise, experience, active) VALUES 
('John Smith', 'john.smith@infuspark.com', '9876543210', 'Python, Django, React', 5, true),
('Sarah Johnson', 'sarah.johnson@infuspark.com', '9876543211', 'Java, Spring Boot, Angular', 7, true),
('Mike Davis', 'mike.davis@infuspark.com', '9876543212', 'Azure, Databricks, Spark', 6, true),
('Lisa Wilson', 'lisa.wilson@infuspark.com', '9876543213', 'AWS, DevOps, Cloud Architecture', 8, true),
('David Brown', 'david.brown@infuspark.com', '9876543214', 'Data Engineering, ETL, Big Data', 4, true),
('Emma Taylor', 'emma.taylor@infuspark.com', '9876543215', 'GCP, Kubernetes, Microservices', 6, true);