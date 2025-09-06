-- Database setup script for InfuSpark Learning Management System
-- Run this script in PostgreSQL to create the database

-- Create database
CREATE DATABASE infuspark_db;

-- Connect to the database
\c infuspark_db;

-- Create a user (optional, for production use)
-- CREATE USER infuspark_user WITH PASSWORD 'your_password';
-- GRANT ALL PRIVILEGES ON DATABASE infuspark_db TO infuspark_user;