import { useQuery } from '@tanstack/react-query'
import { Task } from '@/types/task'
import { api } from '@/lib/api'

export function useTasks() {
  const { data: tasks = [], isLoading, error } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks')
      return response.data
    },
  })

  return { tasks, isLoading, error }
}

export function useTask(id: string) {
  const { data: task, isLoading, error } = useQuery<Task>({
    queryKey: ['tasks', id],
    queryFn: async () => {
      const response = await api.get(`/tasks/${id}`)
      return response.data
    },
    enabled: !!id,
  })

  return { task, isLoading, error }
}

