import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

// Mock users for local authentication
const mockUsers = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'patient'
  },
  {
    _id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'doctor',
    specialty: 'Cardiology',
    experience: '15+ years',
    location: 'New York Medical Center, NY',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience...',
    consultationFee: 150,
    languages: ['English', 'Spanish']
  }
]

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in when the app loads
    const token = localStorage.getItem('token')
    const localUser = localStorage.getItem('localUser')
    
    if (localUser) {
      // If local user exists, use that
      setCurrentUser(JSON.parse(localUser))
      setLoading(false)
    } else if (token) {
      try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000
        
        if (decoded.exp > currentTime) {
          // Token is valid, set the user
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Fetch user data
          fetchUserData(decoded.id, decoded.role)
        } else {
          // Token expired
          handleLogout()
        }
      } catch (error) {
        console.error('Error decoding token:', error)
        handleLogout()
      }
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserData = async (userId, role) => {
    try {
      const endpoint = role === 'doctor' ? `/doctors/${userId}` : `/patients/${userId}`
      const { data } = await api.get(endpoint)
      
      setCurrentUser({
        ...data,
        role
      })
    } catch (error) {
      console.error('Error fetching user data:', error)
      handleLogout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password, role) => {
    try {
      // First try local authentication
      const localUser = mockUsers.find(user => 
        user.email === email && 
        user.password === password && 
        user.role === role
      )

      if (localUser) {
        // Store user in localStorage
        const { password: _, ...userData } = localUser
        localStorage.setItem('localUser', JSON.stringify(userData))
        setCurrentUser(userData)
        navigate(role === 'doctor' ? '/doctor' : '/patient')
        return { user: userData }
      }

      // If local auth fails, try server auth
      const { data } = await api.post('/auth/login', { email, password, role })
      
      // Store token in localStorage
      localStorage.setItem('token', data.token)
      
      // Set authorization header for all future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      
      // Set user data
      setCurrentUser({
        ...data.user,
        role
      })
      
      // Redirect based on role
      navigate(role === 'doctor' ? '/doctor' : '/patient')
      
      return data
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  }

  const register = async (userData, role) => {
    try {
      // First try local registration
      const existingUser = mockUsers.find(user => user.email === userData.email)
      
      if (!existingUser) {
        // Create new local user
        const newUser = {
          _id: Date.now().toString(),
          ...userData,
          role
        }
        mockUsers.push(newUser)
        return { message: 'Registration successful' }
      }

      // If local registration fails, try server registration
      const { data } = await api.post('/auth/register', { ...userData, role })
      return data
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  }

  const handleLogout = () => {
    // Remove token and local user from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('localUser')
    
    // Remove authorization header
    delete api.defaults.headers.common['Authorization']
    
    // Clear user data
    setCurrentUser(null)
    
    // Redirect to login page
    navigate('/login')
  }

  const updateProfile = async (userData) => {
    try {
      if (currentUser && localStorage.getItem('localUser')) {
        // Update local user
        const updatedUser = {
          ...currentUser,
          ...userData
        }
        localStorage.setItem('localUser', JSON.stringify(updatedUser))
        setCurrentUser(updatedUser)
        return updatedUser
      }

      // If not local user, update via server
      const endpoint = currentUser?.role === 'doctor' 
        ? `/doctors/${currentUser._id}` 
        : `/patients/${currentUser._id}`
      
      const { data } = await api.put(endpoint, userData)
      
      setCurrentUser({
        ...data,
        role: currentUser.role
      })
      
      return data
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' }
    }
  }

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout: handleLogout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}