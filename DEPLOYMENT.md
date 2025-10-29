# Deployment Guide

## Prerequisites
- Docker and Docker Compose installed
- Git installed
- Basic knowledge of Docker and containerization

## Local Deployment with Docker Compose

### Step 1: Clone the Repository
\`\`\`bash
git clone <repository-url>
cd StudentManagementSystem
\`\`\`

### Step 2: Build and Run
\`\`\`bash
docker-compose up --build
\`\`\`

This will:
- Build the backend Docker image
- Build the frontend Docker image
- Start both services
- Create a shared network for communication

### Step 3: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Swagger API Docs: http://localhost:5000/swagger

## Production Deployment

### Using Docker Hub

1. **Build images**:
\`\`\`bash
docker build -t yourusername/sms-backend:latest ./Backend
docker build -t yourusername/sms-frontend:latest ./Frontend
\`\`\`

2. **Push to Docker Hub**:
\`\`\`bash
docker push yourusername/sms-backend:latest
docker push yourusername/sms-frontend:latest
\`\`\`

3. **Deploy on server**:
\`\`\`bash
docker pull yourusername/sms-backend:latest
docker pull yourusername/sms-frontend:latest
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

### Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
# Backend
ASPNETCORE_ENVIRONMENT=Production
JWT_SECRET_KEY=your-super-secret-key-change-this
JWT_ISSUER=StudentManagementSystem
JWT_AUDIENCE=StudentManagementSystemUsers
JWT_EXPIRATION_HOURS=24

# Frontend
REACT_APP_API_URL=https://api.yourdomain.com
\`\`\`

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify database file permissions
- Check logs: `docker logs <container-id>`

### Frontend can't connect to backend
- Verify backend is running
- Check CORS configuration in appsettings.json
- Verify API URL in frontend environment

### Database issues
- Delete the database file and restart
- Run migrations: `dotnet ef database update`

## Monitoring

Monitor container logs:
\`\`\`bash
docker-compose logs -f backend
docker-compose logs -f frontend
\`\`\`

## Scaling

For production, consider:
- Using a managed database service (PostgreSQL, MySQL)
- Implementing load balancing
- Using a reverse proxy (Nginx)
- Setting up CI/CD pipeline
- Implementing monitoring and logging solutions
