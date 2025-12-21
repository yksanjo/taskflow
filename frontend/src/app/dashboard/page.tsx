'use client'

import { useState } from 'react'
import { Plus, Filter, Search } from 'lucide-react'
import TaskList from '@/components/TaskList'
import TaskBoard from '@/components/TaskBoard'
import { useTasks } from '@/hooks/useTasks'

type ViewType = 'list' | 'board' | 'timeline' | 'calendar'

export default function DashboardPage() {
  const [view, setView] = useState<ViewType>('board')
  const { tasks, isLoading } = useTasks()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="bg-transparent border-none outline-none text-sm"
                />
              </div>
              <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Task
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
            {(['list', 'board', 'timeline', 'calendar'] as ViewType[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  view === v
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        ) : view === 'board' ? (
          <TaskBoard tasks={tasks} />
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </div>
  )
}

