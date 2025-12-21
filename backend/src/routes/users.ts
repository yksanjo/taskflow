import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/me', authenticate, (req, res) => {
  res.json({ user: (req as any).user })
})

export { router as userRoutes }

