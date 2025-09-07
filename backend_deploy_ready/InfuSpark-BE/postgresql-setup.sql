-- PostgreSQL Database Setup for InfuSpark Learning Management System
-- Run this script to manually create tables if needed

-- Create Admin table
CREATE TABLE IF NOT EXISTS admin (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Student table
CREATE TABLE IF NOT EXISTS student_data (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Course table
CREATE TABLE IF NOT EXISTS course (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    duration INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Trainer table
CREATE TABLE IF NOT EXISTS trainer (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    expertise TEXT,
    experience INTEGER,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Student-Course junction table (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS student_course (
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student_data(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

-- Create Trainer-Course junction table (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS trainer_course (
    trainer_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (trainer_id, course_id),
    FOREIGN KEY (trainer_id) REFERENCES trainer(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

-- Create Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'PRESENT',
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student_data(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    UNIQUE(student_id, course_id, attendance_date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_student_email ON student_data(email);
CREATE INDEX IF NOT EXISTS idx_admin_email ON admin(email);
CREATE INDEX IF NOT EXISTS idx_trainer_email ON trainer(email);
CREATE INDEX IF NOT EXISTS idx_course_name ON course(name);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(attendance_date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_course ON attendance(course_id);