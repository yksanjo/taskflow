import { db } from '../database/connection'
import { Task } from '../types/Task'

export class TaskService {
  async getTasks(filters: {
    userId?: string
    projectId?: string
    status?: string
    priority?: string
  }): Promise<Task[]> {
    let query = 'SELECT * FROM tasks WHERE 1=1'
    const params: any[] = []
    let paramIndex = 1

    if (filters.userId) {
      query += ` AND user_id = $${paramIndex++}`
      params.push(filters.userId)
    }

    if (filters.projectId) {
      query += ` AND project_id = $${paramIndex++}`
      params.push(filters.projectId)
    }

    if (filters.status) {
      query += ` AND status = $${paramIndex++}`
      params.push(filters.status)
    }

    if (filters.priority) {
      query += ` AND priority = $${paramIndex++}`
      params.push(filters.priority)
    }

    query += ' ORDER BY created_at DESC'

    const result = await db.query(query, params)
    return result.rows
  }

  async getTaskById(id: string): Promise<Task | null> {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id])
    return result.rows[0] || null
  }

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const {
      title,
      description,
      status = 'todo',
      priority = 'medium',
      userId,
      projectId,
      dueDate,
      estimatedHours,
    } = taskData

    const result = await db.query(
      `INSERT INTO tasks (title, description, status, priority, user_id, project_id, due_date, estimated_hours, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       RETURNING *`,
      [title, description, status, priority, userId, projectId, dueDate, estimatedHours]
    )

    return result.rows[0]
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    const fields: string[] = []
    const values: any[] = []
    let paramIndex = 1

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = $${paramIndex++}`)
        values.push(value)
      }
    })

    if (fields.length === 0) {
      return this.getTaskById(id)
    }

    fields.push(`updated_at = NOW()`)
    values.push(id)

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`
    const result = await db.query(query, values)

    return result.rows[0] || null
  }

  async deleteTask(id: string): Promise<void> {
    await db.query('DELETE FROM tasks WHERE id = $1', [id])
  }

  async getDependencies(taskId: string): Promise<Task[]> {
    const result = await db.query(
      `SELECT t.* FROM tasks t
       INNER JOIN task_dependencies td ON t.id = td.depends_on_task_id
       WHERE td.task_id = $1`,
      [taskId]
    )
    return result.rows
  }

  async addDependency(taskId: string, dependsOnId: string): Promise<void> {
    await db.query(
      `INSERT INTO task_dependencies (task_id, depends_on_task_id, created_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT DO NOTHING`,
      [taskId, dependsOnId]
    )
  }
}

