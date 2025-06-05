import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' })
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    
    // Add user from payload to request
    req.user = {
      userId: decoded.id,
      role: decoded.role
    }
    
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Token is not valid' })
  }
}