# PostgreSQL Migration Setup - InfuSpark

## ✅ **Database Configuration**

### **Cloud PostgreSQL Details:**
- **Host**: dpg-d2rjhmffte5s738bm0p0-a.oregon-postgres.render.com
- **Port**: 5432
- **Database**: lohithraj001
- **Username**: lohithraj001_user
- **Password**: s5Tl9PgPRxzsugEKOE8QsJtN5CH1hfWV

## 🚀 **Migration Features**

### **1. Automatic Data Migration**
- ✅ Excel files from `uploads/` folder automatically imported
- ✅ Student data migrated with course assignments
- ✅ Attendance data extracted from Excel sheets
- ✅ Sample data populated (admin, trainers, courses)

### **2. Data Structure**
- **Admin**: Hardcoded admin@infuspark.com / admin123
- **Students**: Migrated from Excel + sample data
- **Trainers**: 6 sample trainers with expertise
- **Courses**: 6 courses matching trainer specializations
- **Attendance**: Date-wise attendance from Excel

### **3. API Endpoints**
- `GET /api/attendance/student?email={email}` - Student attendance
- `GET /api/attendance/stats?email={email}` - Attendance statistics
- All existing endpoints for students, trainers, courses

## 🔧 **Running the Application**

### **Option 1: Using Script**
```cmd
run-postgres.bat
```

### **Option 2: Manual Command**
```cmd
mvnw.cmd spring-boot:run
```

### **Option 3: VS Code**
- Application will automatically connect to PostgreSQL
- Data migration runs on startup

## 📊 **Expected Results**

### **Database Tables Created:**
- `admin` - Admin users
- `student_data` - Student information
- `trainer` - Trainer details
- `course` - Course catalog
- `attendance` - Attendance records
- `student_courses` - Student-course relationships
- `course_trainer` - Course-trainer assignments

### **Sample Data Populated:**
- ✅ 1 Admin user (admin@infuspark.com)
- ✅ 5+ Students (from Excel + samples)
- ✅ 6 Trainers with specializations
- ✅ 6 Courses
- ✅ Attendance records from Excel files

## 🎯 **Admin Dashboard Features**
- Student count with real data
- Trainer management
- Course management
- Attendance tracking
- Excel upload functionality

## 🔐 **Login Credentials**

### **Admin Login:**
- Email: `admin@infuspark.com`
- Password: `admin123`

### **Sample Student Login:**
- Email: `john.doe@student.com`
- Password: `password123`

## 📝 **Migration Log**
The application will log migration progress:
- Excel file processing
- Student data import
- Attendance data import
- Any errors or skipped records

## ⚠️ **Important Notes**
1. Database is cleared and recreated on each startup (`ddl-auto=create-drop`)
2. Excel files must be in `src/main/resources/uploads/`
3. Attendance dates must be in DD-MM-YYYY format
4. All data is migrated automatically on application start

The application is now fully configured for PostgreSQL with complete data migration!