import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

export const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'taskflow',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
})

export async function connectDatabase() {
  try {
    await db.query('SELECT NOW()')
    console.log('✅ Database connected')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

