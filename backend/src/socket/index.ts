import { Server } from 'socket.io'
import { authenticateSocket } from './auth'

export function setupSocketIO(io: Server) {
  io.use(authenticateSocket)

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`)

    // Join project rooms
    socket.on('join:project', (projectId: string) => {
      socket.join(`project:${projectId}`)
      console.log(`Socket ${socket.id} joined project ${projectId}`)
    })

    // Leave project rooms
    socket.on('leave:project', (projectId: string) => {
      socket.leave(`project:${projectId}`)
    })

    // Task updates
    socket.on('task:update', (data: { taskId: string; projectId: string; updates: any }) => {
      socket.to(`project:${data.projectId}`).emit('task:updated', {
        taskId: data.taskId,
        updates: data.updates,
      })
    })

    // Task creation
    socket.on('task:create', (data: { projectId: string; task: any }) => {
      socket.to(`project:${data.projectId}`).emit('task:created', data.task)
    })

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`)
    })
  })
}

