import { Task } from '../types/Task'
import { calculatePriorityScore } from '../utils/priorityCalculator'

export class AIPriorityService {
  async prioritizeTasks(tasks: Task[]): Promise<Task[]> {
    // Calculate priority scores for each task
    const tasksWithScores = tasks.map((task) => ({
      ...task,
      aiPriorityScore: calculatePriorityScore(task),
    }))

    // Sort by AI priority score (highest first)
    return tasksWithScores.sort((a, b) => {
      return (b.aiPriorityScore || 0) - (a.aiPriorityScore || 0)
    })
  }

  async suggestNextTask(tasks: Task[]): Promise<Task | null> {
    const prioritized = await this.prioritizeTasks(tasks)
    const availableTasks = prioritized.filter(
      (task) => task.status === 'todo' || task.status === 'in_progress'
    )
    return availableTasks[0] || null
  }
}

