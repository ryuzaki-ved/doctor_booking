import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { toast } from 'react-toastify'
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiAward, 
  FiBook, FiDollarSign, FiLock 
} from 'react-icons/fi'

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  
  const formik = useFormik({
    initialValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      specialty: currentUser?.specialty || '',
      qualifications: currentUser?.qualifications || '',
      experience: currentUser?.experience || '',
      location: currentUser?.location || '',
      bio: currentUser?.bio || '',
      consultationFee: currentUser?.consultationFee || '',
      languages: currentUser?.languages || [],
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string(),
      specialty: Yup.string(),
      qualifications: Yup.string(),
      experience: Yup.string(),
      location: Yup.string(),
      bio: Yup.string(),
      consultationFee: Yup.number().min(0, 'Must be a positive number'),
      languages: Yup.array().of(Yup.string()),
    }),
    onSubmit: async (values) => {
      try {
        await updateProfile(values)
        toast.success('Profile updated successfully')
        setIsEditing(false)
      } catch (error) {
        toast.error(error.message || 'Failed to update profile')
      }
    },
  })

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-neutral-800">
            Doctor Profile
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-outline"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  disabled={!isEditing}
                  className={`input pl-10 ${!isEditing && 'bg-neutral-50'}`}
                  {...formik.getFieldProps('firstName')}
                />
              </div>
              {formik.touched.firstName && formik.errors.firstName ? (
                <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
              ) : null}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  disabled={!isEditing}
                  className={`input pl-10 ${!isEditing && 'bg-neutral-50'}`}
                  {...formik.getFieldProps('lastName')}
                />
              </div>
              {formik.touched.lastName && formik.errors.lastName ? (
                <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
              ) : null}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled={!isEditing}
                  className={`input pl-10 ${!isEditing && 'bg-neutral-50'}`}
                  {...formik.getFieldProps('email')}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              ) : null}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  disabled={!isEditing}
                  className={`input pl-10 ${!isEditing && 'bg-neutral-50'}`}
                  {...formik.getFieldProps('phone')}
                />
              </div>
            </div>

            {/* Specialty */}
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-neutral-700 mb-1">
                Specialty
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiAward className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  disabled={!isEditing}
                  className={`input pl-10 ${!isEditing && 'bg-neutral-50'}`}
                  {...formik.getFieldProps('specialty')}
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-neutral-700 mb-1">
                Years of Experience
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBook className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  disabled={!isEditing}
                  className={`input pl-10 ${!isEditing && 'bg-neutral-50'}`}
                  {...formik.getFieldProps('experience')}
                />
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                Practice Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  disabled={!isEditing}
                  className={`input pl-10 ${!isEditing && 'bg-neutral-50'}`}
                  {...formik.getFieldProps('location')}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-1">
                Professional Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                disabled={!isEditing}
                className={`input ${!isEditing && 'bg-neutral-50'}`}
                {...formik.getFieldProps('bio')}
              />
            </div>

            {/* Consultation Fee */}
            <div>
              <label htmlFor="consultationFee" className="block text-sm font-medium text-neutral-700 mb-1">
                Consultation Fee ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="number"
                  id="consultationFee"
                  name="consultationFee"
                  disabled={!isEditing}
                  className={`input pl-10 ${!isEditing && 'bg-neutral-50'}`}
                  {...formik.getFieldProps('consultationFee')}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="btn-primary"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          )}
        </form>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-xl font-bold text-neutral-800 mb-6">
          Security Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center mr-4">
                <FiLock className="text-neutral-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-800">Password</h3>
                <p className="text-sm text-neutral-600">
                  Last changed 3 months ago
                </p>
              </div>
            </div>
            <button className="btn-outline">
              Change Password
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center mr-4">
                <FiMail className="text-neutral-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-800">Email Notifications</h3>
                <p className="text-sm text-neutral-600">
                  Manage your email preferences
                </p>
              </div>
            </div>
            <button className="btn-outline">
              Configure
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage