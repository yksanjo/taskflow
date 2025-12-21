'use client'

import { Task } from '@/types/task'
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="divide-y divide-gray-200">
        {tasks.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No tasks yet. Create your first task to get started!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(task.status)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {task.project && (
                      <span className="bg-gray-100 px-2 py-1 rounded">{task.project}</span>
                    )}
                    {task.assignee && (
                      <span>Assigned to: {task.assignee}</span>
                    )}
                    {task.dueDate && (
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

