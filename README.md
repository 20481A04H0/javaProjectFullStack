# InfuSpark Learning Management System

## 🎯 Project Overview
InfuSpark is a comprehensive Learning Management System built with Spring Boot (backend) and Spring Boot + Static Resources (frontend). The system supports admin management, student enrollment, course management, and trainer assignment.

## 🏗️ Architecture
- **Backend**: Spring Boot REST API with PostgreSQL database
- **Frontend**: Spring Boot serving static HTML/CSS/JavaScript
- **Database**: PostgreSQL with JPA/Hibernate
- **Deployment**: Render.com ready with Docker support

## ✅ Issues Resolved

### Backend Fixes:
1. **Database Configuration**: Environment variable support for production
2. **CORS Setup**: Proper cross-origin resource sharing configuration
3. **Port Binding**: Dynamic port configuration for cloud deployment
4. **API Endpoints**: Fixed all REST controller mappings
5. **Database Initialization**: Added data.sql for initial setup

### Frontend Fixes:
1. **Routing**: Added Spring Boot controllers for proper page navigation
2. **API Configuration**: Centralized BASE_URL management
3. **JavaScript Fixes**: Resolved all BASE_URL placeholder issues
4. **Navigation**: Fixed all internal links and redirections
5. **Static Resources**: Proper resource serving configuration

### Deployment Readiness:
1. **Docker Support**: Added Dockerfiles for both services
2. **Render Configuration**: Added render.yaml files
3. **Environment Variables**: Production-ready configuration
4. **Database Migration**: Automatic schema creation and data seeding

## 🚀 Deployment Instructions

### Prerequisites
- GitHub account
- Render.com account
- Basic knowledge of environment variables

### Step 1: Repository Setup
1. Create two GitHub repositories:
   - `infuspark-backend` (upload contents of `backend_deploy_ready/InfuSpark-BE/`)
   - `infuspark-frontend` (upload contents of `frontend_deploy_ready/frontend/InfuSpark-UI/`)

### Step 2: Database Setup
1. In Render dashboard, create a new PostgreSQL database
2. Name it `infuspark-database`
3. Note the connection details

### Step 3: Backend Deployment
1. Create new Web Service in Render
2. Connect to your backend repository
3. Configure:
   - **Name**: `infuspark-backend`
   - **Environment**: Java
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/IQQuest_Learning-BE-0.0.1-SNAPSHOT.jar`

4. Set environment variables:
```
PORT=8080
DATABASE_URL=<your-postgresql-internal-url>
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
ALLOWED_ORIGINS=*
SPRING_PROFILES_ACTIVE=production
```

### Step 4: Frontend Deployment
1. Update `src/main/resources/static/js/api-config.js`:
   - Replace `https://your-backend-app-name.onrender.com` with your actual backend URL

2. Create new Web Service in Render
3. Connect to your frontend repository
4. Configure:
   - **Name**: `infuspark-frontend`
   - **Environment**: Java
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/IQQuest_Learning-UI-0.0.1-SNAPSHOT.jar`

5. Set environment variables:
```
PORT=8082
SPRING_PROFILES_ACTIVE=production
```

### Step 5: Final Configuration
1. Update backend's `ALLOWED_ORIGINS` with your frontend URL
2. Redeploy backend service

## 🔐 Default Credentials
**Admin Login:**
- Email: `admin@infuspark.com`
- Password: `admin123`

**Important**: Change these credentials after first login!

## 🧪 Features

### Admin Features:
- Dashboard with statistics
- Student management (CRUD operations)
- Trainer management
- Course management
- Excel file upload for bulk student data
- Attendance tracking

### Student Features:
- Student registration and login
- Course enrollment
- Dashboard with personal statistics
- Attendance tracking
- Performance analytics

### System Features:
- Responsive design
- RESTful API architecture
- Database relationships (Many-to-Many)
- File upload functionality
- CORS enabled for cross-origin requests

## 📁 Project Structure
```
InfuSpark/
├── backend_deploy_ready/
│   └── InfuSpark-BE/
│       ├── src/main/java/com/iqquestlearning/be/
│       │   ├── controller/     # REST Controllers
│       │   ├── entity/         # JPA Entities
│       │   ├── repository/     # Data Repositories
│       │   ├── service/        # Business Logic
│       │   └── models/         # DTOs
│       ├── src/main/resources/
│       │   ├── application.properties
│       │   └── data.sql
│       ├── Dockerfile
│       └── render.yaml
├── frontend_deploy_ready/
│   └── frontend/InfuSpark-UI/
│       ├── src/main/java/com/iqquestlearning/ui/
│       │   └── Home.java       # Route Controllers
│       ├── src/main/resources/static/
│       │   ├── *.html          # Web Pages
│       │   ├── *.css           # Stylesheets
│       │   ├── *.js            # JavaScript Files
│       │   └── js/api-config.js # API Configuration
│       ├── Dockerfile
│       └── render.yaml
└── Documentation/
    ├── DEPLOYMENT_GUIDE.md
    ├── DEPLOYMENT_CHECKLIST.md
    └── README.md
```

## 🔧 API Endpoints

### Admin Endpoints:
- `POST /api/admin/login` - Admin authentication
- `GET /api/student/getAllStudents` - Get all students
- `POST /api/student/addStudent` - Add new student
- `PUT /api/student/update` - Update student
- `DELETE /api/student/delete/{id}` - Delete student

### Student Endpoints:
- `POST /api/student/studentLogin` - Student authentication
- `GET /api/student/getEnrolledCourses` - Get student courses
- `GET /api/student/getStudentsCount` - Get total students count

### Course Endpoints:
- `GET /api/course/allCourse` - Get all courses
- `GET /api/course/getCoursesCount` - Get courses count

### File Upload:
- `POST /api/studentExcel/upload` - Upload Excel file

## 🐛 Troubleshooting

### Common Issues:
1. **CORS Errors**: Verify `ALLOWED_ORIGINS` environment variable
2. **Database Connection**: Check `DATABASE_URL` format
3. **Static Resources**: Ensure proper file paths in HTML
4. **API Calls**: Verify backend URL in `api-config.js`

### Logs:
- Check Render service logs for detailed error messages
- Monitor database connection status
- Verify environment variables are set correctly

## 🎉 Success Criteria
Your deployment is successful when:
- ✅ Both services are running on Render
- ✅ Homepage loads without errors
- ✅ Admin can login and manage data
- ✅ Students can register and login
- ✅ All navigation links work
- ✅ API calls return proper responses
- ✅ File uploads work correctly

## 📞 Support
For deployment issues:
1. Check service logs in Render dashboard
2. Verify all environment variables
3. Test API endpoints directly
4. Check browser console for JavaScript errors

## 🔄 Updates
To update the application:
1. Push changes to GitHub repository
2. Render will automatically redeploy
3. Monitor deployment logs for any issues

---

**Note**: This project is now fully deployment-ready for Render.com with all identified issues resolved and proper configuration in place.# javaProjectFullStack
# javaProjectFullStack
