export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked'
  priority: 'low' | 'medium' | 'high'
  assignee?: string
  project?: string
  dueDate?: string
  createdAt: string
  updatedAt: string
  dependencies?: string[]
  estimatedHours?: number
  actualHours?: number
  tags?: string[]
}

export interface Project {
  id: string
  name: string
  description?: string
  color?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'member' | 'viewer'
}

