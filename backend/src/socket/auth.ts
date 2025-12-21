import { Socket } from 'socket.io'
import jwt from 'jsonwebtoken'

export function authenticateSocket(socket: Socket, next: Function) {
  const token = socket.handshake.auth.token

  if (!token) {
    return next(new Error('Authentication error'))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    ;(socket as any).user = { id: decoded.id, email: decoded.email }
    next()
  } catch (error) {
    next(new Error('Authentication error'))
  }
}

