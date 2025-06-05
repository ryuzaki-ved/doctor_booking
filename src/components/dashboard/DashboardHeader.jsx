import { useAuth } from '../../contexts/AuthContext.jsx'
import { FiMenu, FiBell } from 'react-icons/fi'

const DashboardHeader = ({ setSidebarOpen, userType }) => {
  const { currentUser } = useAuth()
  
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-neutral-200 text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <FiMenu className="h-6 w-6" aria-hidden="true" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-xl font-semibold text-neutral-800">
            {userType === 'doctor' ? 'Doctor' : 'Patient'} Dashboard
          </h1>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notification button */}
          <button
            type="button"
            className="bg-white p-1 rounded-full text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span className="sr-only">View notifications</span>
            <FiBell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-700">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-xs text-neutral-500">
                  {userType === 'doctor' ? `${currentUser?.specialty || 'Doctor'}` : 'Patient'}
                </p>
              </div>
              <div className="ml-3 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium">
                  {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader