import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx'
import { motion } from 'framer-motion'

const DashboardLayout = ({ userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-neutral-50">
      {/* Sidebar for mobile */}
      <Sidebar 
        userType={userType}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} userType={userType} />
        <motion.main 
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  )
}

export default DashboardLayout