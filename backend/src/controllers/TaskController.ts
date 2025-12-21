import { Request, Response } from 'express'
import { TaskService } from '../services/TaskService'
import { AIPriorityService } from '../services/AIPriorityService'

export class TaskController {
  private taskService: TaskService
  private aiPriorityService: AIPriorityService

  constructor() {
    this.taskService = new TaskService()
    this.aiPriorityService = new AIPriorityService()
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id
      const { projectId, status, priority } = req.query
      
      const tasks = await this.taskService.getTasks({
        userId,
        projectId: projectId as string,
        status: status as string,
        priority: priority as string,
      })
      
      res.json(tasks)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' })
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const task = await this.taskService.getTaskById(id)
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' })
      }
      
      res.json(task)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch task' })
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id
      const taskData = { ...req.body, userId }
      
      const task = await this.taskService.createTask(taskData)
      res.status(201).json(task)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' })
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params
      const task = await this.taskService.updateTask(id, req.body)
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' })
      }
      
      res.json(task)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' })
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.taskService.deleteTask(id)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' })
    }
  }

  async getAIPrioritizedTasks(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id
      const tasks = await this.taskService.getTasks({ userId })
      const prioritized = await this.aiPriorityService.prioritizeTasks(tasks)
      res.json(prioritized)
    } catch (error) {
      res.status(500).json({ error: 'Failed to prioritize tasks' })
    }
  }

  async getDependencies(req: Request, res: Response) {
    try {
      const { id } = req.params
      const dependencies = await this.taskService.getDependencies(id)
      res.json(dependencies)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dependencies' })
    }
  }

  async addDependency(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { dependsOnId } = req.body
      await this.taskService.addDependency(id, dependsOnId)
      res.status(201).json({ message: 'Dependency added' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to add dependency' })
    }
  }
}

