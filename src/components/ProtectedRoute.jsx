import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, loading } = useAuth()
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />
  }
  
  // If logged in but wrong role, redirect to appropriate dashboard
  if (currentUser.role !== allowedRole) {
    return <Navigate to={currentUser.role === 'doctor' ? '/doctor' : '/patient'} />
  }
  
  // If all conditions met, render the protected route
  return children
}

export default ProtectedRoute