import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">MediBook</h3>
            <p className="text-neutral-300 mb-4">
              Simplifying healthcare access with easy online doctor appointments and consultations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Link to="#">Primary Care</Link>
              </li>
              <li className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Link to="#">Specialist Consultations</Link>
              </li>
              <li className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Link to="#">Telemedicine</Link>
              </li>
              <li className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Link to="#">Health Checkups</Link>
              </li>
              <li className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Link to="#">Mental Health Services</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="mt-1 text-primary-400" />
                <span className="text-neutral-300">
                  123 Healthcare Ave, Medical District, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-primary-400" />
                <span className="text-neutral-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-primary-400" />
                <span className="text-neutral-300">contact@medibook.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} MediBook. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-neutral-400">
            <Link to="#" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-primary-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer