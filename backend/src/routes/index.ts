import { Express } from 'express'
import { taskRoutes } from './tasks'
import { projectRoutes } from './projects'
import { authRoutes } from './auth'
import { userRoutes } from './users'
import { analyticsRoutes } from './analytics'

export function setupRoutes(app: Express) {
  app.use('/api/auth', authRoutes)
  app.use('/api/tasks', taskRoutes)
  app.use('/api/projects', projectRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/analytics', analyticsRoutes)
}

