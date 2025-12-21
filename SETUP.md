# TaskFlow Setup Guide

## Prerequisites

- Node.js 20+ and npm 10+
- Docker and Docker Compose (for database and Redis)
- PostgreSQL 15+ (if not using Docker)
- Redis 7+ (if not using Docker)

## Quick Start

### 1. Clone and Install

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Start Database Services

```bash
# Start PostgreSQL and Redis using Docker
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 3. Configure Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env if needed
```

### 4. Initialize Database

```bash
cd backend
npm run migrate
npm run seed
```

### 5. Start Development Servers

```bash
# From root directory
npm run dev

# Or start separately:
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Backend
cd backend && npm run dev
```

## Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## Default Credentials

- Email: demo@taskflow.com
- Password: (check seed.sql for hashed password)

## Development

### Frontend Structure
- `src/app/` - Next.js App Router pages
- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions
- `src/types/` - TypeScript type definitions

### Backend Structure
- `src/routes/` - API route handlers
- `src/controllers/` - Request controllers
- `src/services/` - Business logic
- `src/middleware/` - Express middleware
- `src/database/` - Database connection and utilities

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `docker-compose ps`
- Check connection string in `backend/.env`
- Verify database exists: `psql -U taskflow -d taskflow`

### Port Conflicts
- Change ports in `.env` files if 3000, 4000, 5432, or 6379 are in use

### Module Not Found
- Run `npm run install:all` to install all dependencies
- Clear node_modules and reinstall if issues persist

