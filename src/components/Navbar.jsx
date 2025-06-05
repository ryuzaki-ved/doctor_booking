import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleLogout = () => {
    logout()
    navigate('/')
    setDropdownOpen(false)
  }
  
  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
  }`
  
  return (
    <nav className={navbarClasses}>
      <div className="container-custom mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-primary-600 font-display font-bold text-2xl">MediBook</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary-600 ${
                isActive ? 'text-primary-600' : isScrolled ? 'text-neutral-800' : 'text-neutral-700'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink to="/doctors" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary-600 ${
                isActive ? 'text-primary-600' : isScrolled ? 'text-neutral-800' : 'text-neutral-700'
              }`
            }
          >
            Find Doctors
          </NavLink>
          <NavLink to="/about" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary-600 ${
                isActive ? 'text-primary-600' : isScrolled ? 'text-neutral-800' : 'text-neutral-700'
              }`
            }
          >
            About
          </NavLink>
          <NavLink to="/contact" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary-600 ${
                isActive ? 'text-primary-600' : isScrolled ? 'text-neutral-800' : 'text-neutral-700'
              }`
            }
          >
            Contact
          </NavLink>
        </div>
        
        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-neutral-800 hover:text-primary-600 transition-colors"
              >
                <span className="text-sm font-medium">
                  {currentUser.firstName}
                </span>
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <FiUser />
                </div>
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <Link
                      to={currentUser.role === 'doctor' ? '/doctor' : '/patient'}
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to={`${currentUser.role === 'doctor' ? '/doctor' : '/patient'}/profile`}
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-800 hover:text-primary-600 transition-colors"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container-custom py-4 space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `block py-2 text-base font-medium ${isActive ? 'text-primary-600' : 'text-neutral-800'}`
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/doctors"
                className={({ isActive }) => 
                  `block py-2 text-base font-medium ${isActive ? 'text-primary-600' : 'text-neutral-800'}`
                }
                onClick={closeMenu}
              >
                Find Doctors
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => 
                  `block py-2 text-base font-medium ${isActive ? 'text-primary-600' : 'text-neutral-800'}`
                }
                onClick={closeMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => 
                  `block py-2 text-base font-medium ${isActive ? 'text-primary-600' : 'text-neutral-800'}`
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
              
              <div className="pt-4 border-t border-neutral-200">
                {currentUser ? (
                  <div className="space-y-3">
                    <Link
                      to={currentUser.role === 'doctor' ? '/doctor' : '/patient'}
                      className="flex items-center space-x-2 text-neutral-800 hover:text-primary-600 transition-colors"
                      onClick={closeMenu}
                    >
                      <FiUser size={18} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        closeMenu()
                      }}
                      className="flex items-center space-x-2 text-neutral-800 hover:text-primary-600 transition-colors"
                    >
                      <FiLogOut size={18} />
                      <span>Sign out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/login"
                      className="btn-outline w-full"
                      onClick={closeMenu}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary w-full"
                      onClick={closeMenu}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar