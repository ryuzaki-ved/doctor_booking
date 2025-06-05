import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// In a real app, these would be MongoDB models
// For this example, we'll use in-memory "databases"
const patients = []
const doctors = []

// Register a new user (patient or doctor)
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, ...otherData } = req.body
    
    // Check if user already exists
    const collection = role === 'doctor' ? doctors : patients
    const existingUser = collection.find(user => user.email === email)
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create new user
    const newUser = {
      _id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      ...otherData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Save user to the appropriate collection
    collection.push(newUser)
    
    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    )
    
    // Return user data (without password) and token
    const { password: _, ...userData } = newUser
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userData
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Login user (patient or doctor)
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body
    
    // Find user in the appropriate collection
    const collection = role === 'doctor' ? doctors : patients
    const user = collection.find(user => user.email === email)
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    )
    
    // Return user data (without password) and token
    const { password: _, ...userData } = user
    
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: userData
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router