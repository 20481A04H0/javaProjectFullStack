# PostgreSQL Cloud Database Setup Guide

## 🎯 Overview
This guide will help you connect your InfuSpark Learning Management System to the PostgreSQL cloud database and migrate all data.

## 📋 Prerequisites
- Java 17 or higher
- Maven 3.6+
- Internet connection for cloud database access

## 🔧 Configuration Applied

### 1. Database Connection
- **Host**: dpg-d2rjhmffte5s738bm0p0-a.oregon-postgres.render.com
- **Port**: 5432
- **Database**: lohithraj001
- **Username**: lohithraj001_user
- **Password**: s5Tl9PgPRxzsugEKOE8QsJtN5CH1hfWV

### 2. Files Updated
- ✅ `application.properties` - Updated to use PostgreSQL by default
- ✅ `application-prod.properties` - Production PostgreSQL configuration
- ✅ `data.sql` - PostgreSQL-compatible sample data
- ✅ `postgresql-setup.sql` - Manual table creation script
- ✅ Entity classes - Fixed table names and relationships

## 🚀 Quick Start

### Step 1: Run with PostgreSQL
```bash
cd backend_deploy_ready/InfuSpark-BE
./run-postgresql.bat
```

### Step 2: Verify Connection
- Backend: http://localhost:8080
- API Docs: http://localhost:8080/swagger-ui.html
- Health Check: http://localhost:8080/actuator/health

### Step 3: Test Login Credentials
**Admin Login:**
- Email: admin@infuspark.com
- Password: admin123

**Student Login:**
- Email: student@infuspark.com
- Password: student123

## 📊 Database Schema

### Tables Created Automatically:
1. **admin** - Admin users
2. **student_data** - Student information
3. **course** - Available courses
4. **trainer** - Trainer information
5. **student_course** - Student-Course relationships
6. **trainer_course** - Trainer-Course assignments
7. **attendance** - Attendance records

### Sample Data Included:
- ✅ 1 Admin user
- ✅ 4 Sample students
- ✅ 6 Courses (Python, Java, Azure, AWS, Data Engineering, GCP)
- ✅ 6 Trainers with expertise

## 🔍 Troubleshooting

### Connection Issues:
1. **Check Internet Connection**: Ensure you can reach the cloud database
2. **Verify Credentials**: Database credentials are embedded in configuration
3. **Check Logs**: Look for connection errors in console output

### Common Errors:
- **Connection timeout**: Check firewall/network settings
- **Authentication failed**: Credentials are pre-configured, should work automatically
- **Table not found**: Run `postgresql-setup.sql` manually if needed

### Manual Database Setup (if needed):
```sql
-- Connect to your PostgreSQL database and run:
\i postgresql-setup.sql
```

## 📁 Project Structure
```
InfuSpark-BE/
├── src/main/resources/
│   ├── application.properties          # Main config (PostgreSQL)
│   ├── application-prod.properties     # Production config
│   └── data.sql                       # Sample data
├── postgresql-setup.sql               # Manual table creation
└── run-postgresql.bat                 # Quick start script
```

## ✅ Features Verified

### Backend APIs:
- ✅ Admin login/authentication
- ✅ Student CRUD operations
- ✅ Course management
- ✅ Trainer management
- ✅ Student-Course enrollment
- ✅ File upload (Excel)

### Frontend Integration:
- ✅ Admin Dashboard
- ✅ Student Dashboard
- ✅ Course assignment
- ✅ All CRUD operations

## 🎉 Success Indicators

Your setup is successful when:
1. ✅ Application starts without database errors
2. ✅ Admin can login at frontend
3. ✅ Student list loads with sample data
4. ✅ Courses are visible and assignable
5. ✅ All CRUD operations work

## 📞 Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify internet connectivity to the cloud database
3. Ensure all configuration files are properly updated
4. Try running the manual setup script if tables aren't created

## 🔄 Data Migration

### Automatic Migration:
- Sample data is automatically loaded on first run
- Tables are created automatically by Hibernate

### Manual Data Import:
If you have Excel files with additional data:
1. Use the Excel upload feature in Admin Dashboard
2. Or convert Excel to SQL INSERT statements
3. Run SQL statements directly on the cloud database

---

**Note**: The application is now fully configured for PostgreSQL cloud database. All existing functionality will work seamlessly with the cloud database.