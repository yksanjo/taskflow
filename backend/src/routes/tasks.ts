import { Router } from 'express'
import { TaskController } from '../controllers/TaskController'
import { authenticate } from '../middleware/auth'

const router = Router()
const taskController = new TaskController()

// Get all tasks
router.get('/', authenticate, taskController.getAllTasks.bind(taskController))

// Get task by ID
router.get('/:id', authenticate, taskController.getTaskById.bind(taskController))

// Create task
router.post('/', authenticate, taskController.createTask.bind(taskController))

// Update task
router.put('/:id', authenticate, taskController.updateTask.bind(taskController))

// Delete task
router.delete('/:id', authenticate, taskController.deleteTask.bind(taskController))

// Get AI-prioritized tasks
router.get('/prioritized/ai', authenticate, taskController.getAIPrioritizedTasks.bind(taskController))

// Get task dependencies
router.get('/:id/dependencies', authenticate, taskController.getDependencies.bind(taskController))

// Add dependency
router.post('/:id/dependencies', authenticate, taskController.addDependency.bind(taskController))

export { router as taskRoutes }

