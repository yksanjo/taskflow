import { Task } from '../types/Task'
import { differenceInDays, isPast, isToday, isTomorrow } from 'date-fns'

export function calculatePriorityScore(task: Task): number {
  let score = 0

  // Base priority weight
  const priorityWeights = {
    high: 30,
    medium: 15,
    low: 5,
  }
  score += priorityWeights[task.priority as keyof typeof priorityWeights] || 15

  // Due date urgency
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate)
    const daysUntilDue = differenceInDays(dueDate, new Date())

    if (isPast(dueDate)) {
      score += 50 // Overdue tasks get highest priority
    } else if (isToday(dueDate)) {
      score += 40 // Due today
    } else if (isTomorrow(dueDate)) {
      score += 30 // Due tomorrow
    } else if (daysUntilDue <= 3) {
      score += 20 // Due within 3 days
    } else if (daysUntilDue <= 7) {
      score += 10 // Due within a week
    }
  }

  // Status weight (in-progress tasks should be prioritized)
  if (task.status === 'in_progress') {
    score += 10
  } else if (task.status === 'blocked') {
    score -= 20 // Blocked tasks have lower priority
  }

  // Dependency weight (tasks with dependencies might be blockers)
  // This would be enhanced with actual dependency data
  if (task.dependencies && task.dependencies.length > 0) {
    score += 15 // Tasks that block others are important
  }

  return score
}

