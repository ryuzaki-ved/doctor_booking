import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-neutral-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="btn-primary inline-flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage