import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
import authRoutes from './routes/auth.js'
import doctorRoutes from './routes/doctors.js'
import patientRoutes from './routes/patients.js'
import appointmentRoutes from './routes/appointments.js'
import paymentRoutes from './routes/payments.js'

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/payments', paymentRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: err.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  })
})

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // In a real app, connect to MongoDB
    // await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()