# InfuSpark Deployment Guide for Render

## Overview
This guide will help you deploy the InfuSpark Learning Management System to Render.com with separate backend and frontend services.

## Prerequisites
- GitHub account
- Render account (free tier available)
- PostgreSQL database (can use Render's free PostgreSQL)

## Deployment Steps

### 1. Prepare Your Repository
1. Create a new GitHub repository
2. Upload the `backend_deploy_ready/InfuSpark-BE` folder as your backend
3. Upload the `frontend_deploy_ready/frontend/InfuSpark-UI` folder as your frontend

### 2. Deploy Backend Service

#### Step 2.1: Create PostgreSQL Database on Render
1. Go to Render Dashboard
2. Click "New" → "PostgreSQL"
3. Name: `infuspark-database`
4. Note down the connection details (Internal Database URL)

#### Step 2.2: Deploy Backend
1. Go to Render Dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository (backend folder)
4. Configure:
   - **Name**: `infuspark-backend`
   - **Environment**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/IQQuest_Learning-BE-0.0.1-SNAPSHOT.jar`
   - **Instance Type**: Free

#### Step 2.3: Set Environment Variables for Backend
Add these environment variables in Render:
```
PORT=8080
DATABASE_URL=<your-postgresql-internal-url>
DB_USERNAME=<your-db-username>
DB_PASSWORD=<your-db-password>
ALLOWED_ORIGINS=https://your-frontend-app-name.onrender.com
SPRING_PROFILES_ACTIVE=production
```

### 3. Deploy Frontend Service

#### Step 3.1: Update Frontend Configuration
1. Edit `src/main/resources/static/js/api-config.js`
2. Replace `https://your-backend-app-name.onrender.com` with your actual backend URL

#### Step 3.2: Deploy Frontend
1. Go to Render Dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository (frontend folder)
4. Configure:
   - **Name**: `infuspark-frontend`
   - **Environment**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/IQQuest_Learning-UI-0.0.1-SNAPSHOT.jar`
   - **Instance Type**: Free

#### Step 3.3: Set Environment Variables for Frontend
```
PORT=8082
SPRING_PROFILES_ACTIVE=production
```

### 4. Update CORS Configuration
After both services are deployed:
1. Update the backend's `ALLOWED_ORIGINS` environment variable with your frontend URL
2. Redeploy the backend service

### 5. Test Your Application
1. Visit your frontend URL
2. Test admin login functionality
3. Test student registration and login
4. Verify all API endpoints are working

## Default Admin Credentials
You'll need to manually insert an admin user into your database:
```sql
INSERT INTO admin (name, email, phone, password) 
VALUES ('Admin', 'admin@infuspark.com', '1234567890', 'admin123');
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure ALLOWED_ORIGINS is set correctly
2. **Database Connection**: Verify DATABASE_URL format
3. **Build Failures**: Check Java version compatibility (using Java 17)
4. **Static Resources**: Ensure all CSS/JS files are properly referenced

### Logs:
- Check Render service logs for detailed error messages
- Backend logs will show database connection status
- Frontend logs will show static resource loading issues

## File Structure
```
backend_deploy_ready/InfuSpark-BE/
├── src/
├── pom.xml
├── Dockerfile
└── render.yaml

frontend_deploy_ready/frontend/InfuSpark-UI/
├── src/
├── pom.xml
├── Dockerfile
└── render.yaml
```

## Support
For issues with deployment, check:
1. Render service logs
2. Database connection status
3. Environment variable configuration
4. CORS settings

## Security Notes
- Change default admin credentials after first login
- Use strong passwords for database
- Enable HTTPS (Render provides this automatically)
- Regularly update dependencies