# InfuSpark Backend Deployment Guide

## 🚀 Quick Start

### Local Development Setup

1. **Install PostgreSQL**
   - Download and install PostgreSQL from https://www.postgresql.org/download/
   - Default port: 5432
   - Remember your postgres user password

2. **Create Database**
   ```sql
   -- Connect to PostgreSQL as postgres user
   CREATE DATABASE infuspark_db;
   ```

3. **Update Configuration**
   - Edit `src/main/resources/application-dev.properties`
   - Update database credentials:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=YOUR_POSTGRES_PASSWORD
   ```

4. **Run Application**
   ```bash
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
   ```

### Test Credentials

**Admin Login:**
- Email: `admin@infuspark.com`
- Password: `admin123`

**Student Login:**
- Email: `student@infuspark.com`
- Password: `student123`

## 🌐 Production Deployment (Render.com)

### Prerequisites
- GitHub account
- Render.com account
- PostgreSQL database on Render

### Step 1: Database Setup
1. Create PostgreSQL database on Render
2. Note the connection details (Internal Database URL)

### Step 2: Backend Deployment
1. Push code to GitHub repository
2. Create Web Service on Render
3. Connect to your repository
4. Configure:
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/IQQuest_Learning-BE-0.0.1-SNAPSHOT.jar`

### Step 3: Environment Variables
Set these environment variables in Render:
```
DATABASE_URL=<your-postgresql-internal-url>
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
SPRING_PROFILES_ACTIVE=prod
PORT=8080
ALLOWED_ORIGINS=*
```

## 📋 API Endpoints

### Admin Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET /api/student/getAllStudents` - Get all students
- `POST /api/student/addStudent` - Add new student
- `PUT /api/student/update` - Update student
- `DELETE /api/student/delete/{id}` - Delete student

### Student Endpoints
- `POST /api/student/studentLogin` - Student authentication
- `GET /api/student/getEnrolledCourses` - Get student courses
- `GET /api/student/getStudentsCount` - Get total students count

### Course Endpoints
- `GET /api/course/allCourse` - Get all courses
- `GET /api/course/getCoursesCount` - Get courses count

### Trainer Endpoints
- `GET /api/trainer/getAllTrainers` - Get all trainers
- `POST /api/trainer/addTrainer` - Add new trainer
- `PUT /api/trainer/update` - Update trainer
- `DELETE /api/trainer/deleteTrainer/{id}` - Delete trainer

## 🔧 Configuration Files

### Profiles
- `dev` - Local development with PostgreSQL
- `prod` - Production deployment

### Database Configuration
- **Development**: Local PostgreSQL (localhost:5432)
- **Production**: Environment variables from Render

## 🐛 Troubleshooting

### Common Issues
1. **Database Connection Failed**
   - Check PostgreSQL is running
   - Verify credentials in application-dev.properties
   - Ensure database `infuspark_db` exists

2. **Port Already in Use**
   - Change port in application.properties: `server.port=8081`

3. **CORS Errors**
   - Verify `ALLOWED_ORIGINS` environment variable
   - Check frontend URL is included

### Logs
- Check application logs for detailed error messages
- Enable debug logging: `logging.level.com.iqquestlearning=debug`

## ✅ Verification

Application is working correctly when:
- ✅ Application starts without errors
- ✅ Database tables are created automatically
- ✅ Sample data is inserted (admin and student users)
- ✅ API endpoints respond correctly
- ✅ Admin can login with test credentials
- ✅ Student can login with test credentials

## 📞 Support

For issues:
1. Check application logs
2. Verify database connection
3. Test API endpoints directly
4. Check environment variables are set correctly