import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext.jsx'
import { FiUser, FiLock, FiUserCheck } from 'react-icons/fi'
import { motion } from 'framer-motion'

const LoginPage = () => {
  const [userType, setUserType] = useState('patient')
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values.email, values.password, userType)
        toast.success('Login successful!')
        // Navigate is handled in the auth context
      } catch (error) {
        toast.error(error.message || 'Failed to login. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }
  })
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-neutral-600">
            Sign in to your account to continue
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          {/* User Type Selection */}
          <div className="mb-6">
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                className={`w-1/2 py-2 px-4 text-sm font-medium rounded-l-md focus:outline-none ${
                  userType === 'patient'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                }`}
                onClick={() => setUserType('patient')}
              >
                Patient
              </button>
              <button
                type="button"
                className={`w-1/2 py-2 px-4 text-sm font-medium rounded-r-md focus:outline-none ${
                  userType === 'doctor'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                }`}
                onClick={() => setUserType('doctor')}
              >
                Doctor
              </button>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className={`input pl-10 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
              ) : null}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`input pl-10 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
              ) : null}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full btn-primary py-2 px-4 flex justify-center items-center"
              >
                {formik.isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FiUserCheck className="h-5 w-5 mr-2" />
                    Sign in as {userType}
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-primary-500 rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create an account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage