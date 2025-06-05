import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { 
  FiX, FiHome, FiCalendar, FiUser, FiClock, 
  FiCreditCard, FiSettings, FiLogOut
} from 'react-icons/fi'

const Sidebar = ({ userType, sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth()

  // Menu items based on user type
  const menuItems = userType === 'doctor' 
    ? [
        { name: 'Dashboard', icon: FiHome, href: '/doctor' },
        { name: 'Appointments', icon: FiCalendar, href: '/doctor/appointments' },
        { name: 'Schedule', icon: FiClock, href: '/doctor/schedule' },
        { name: 'Profile', icon: FiUser, href: '/doctor/profile' },
      ]
    : [
        { name: 'Dashboard', icon: FiHome, href: '/patient' },
        { name: 'Appointments', icon: FiCalendar, href: '/patient/appointments' },
        { name: 'Profile', icon: FiUser, href: '/patient/profile' },
      ]

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-600 bg-opacity-75" />
          </Transition.Child>
          
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <FiX className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <span className="text-primary-600 font-display font-bold text-2xl">MediBook</span>
                </div>
                <nav className="mt-8 space-y-1 px-2">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-neutral-700 hover:bg-neutral-50'
                        }`
                      }
                      end={item.href === '/doctor' || item.href === '/patient'}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          location.pathname === item.href
                            ? 'text-primary-500'
                            : 'text-neutral-500 group-hover:text-neutral-700'
                        }`}
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
              
              <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
                <button
                  className="flex items-center justify-center w-full px-4 py-2 text-sm text-neutral-700 rounded-md hover:bg-neutral-100"
                  onClick={logout}
                >
                  <FiLogOut className="mr-3 h-5 w-5 text-neutral-500" />
                  Sign out
                </button>
              </div>
            </div>
          </Transition.Child>
          
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-neutral-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-primary-600 font-display font-bold text-2xl">MediBook</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                  end={item.href === '/doctor' || item.href === '/patient'}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      location.pathname === item.href
                        ? 'text-primary-500'
                        : 'text-neutral-500 group-hover:text-neutral-700'
                    }`}
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
            <button
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-neutral-700 rounded-md hover:bg-neutral-100"
              onClick={logout}
            >
              <FiLogOut className="mr-3 h-5 w-5 text-neutral-500" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar