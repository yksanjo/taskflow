export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked'
  priority: 'low' | 'medium' | 'high'
  userId: string
  projectId?: string
  assigneeId?: string
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  estimatedHours?: number
  actualHours?: number
  dependencies?: string[]
  tags?: string[]
  aiPriorityScore?: number
}

