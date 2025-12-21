import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/forecast', authenticate, (req, res) => {
  res.json({ message: 'Analytics endpoint' })
})

export { router as analyticsRoutes }

