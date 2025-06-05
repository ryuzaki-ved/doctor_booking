import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { FiClock, FiCalendar, FiCheck } from 'react-icons/fi'

const SchedulePage = () => {
  const [selectedDays, setSelectedDays] = useState([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ])
  
  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
  
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  const formik = useFormik({
    initialValues: {
      startTime: '09:00',
      endTime: '17:00',
      breakStart: '12:00',
      breakEnd: '14:00',
      slotDuration: 30,
    },
    validationSchema: Yup.object({
      startTime: Yup.string().required('Start time is required'),
      endTime: Yup.string().required('End time is required'),
      breakStart: Yup.string().required('Break start time is required'),
      breakEnd: Yup.string().required('Break end time is required'),
      slotDuration: Yup.number().required('Slot duration is required'),
    }),
    onSubmit: async (values) => {
      try {
        // In a real app, this would update the schedule in the backend
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('Schedule updated successfully')
      } catch (error) {
        toast.error('Failed to update schedule')
      }
    },
  })

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-800 mb-6">
        Manage Schedule
      </h1>

      {/* Working Days */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-8"
      >
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          Working Days
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weekDays.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`p-4 rounded-lg border ${
                selectedDays.includes(day)
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{day}</span>
                {selectedDays.includes(day) && (
                  <FiCheck className="text-primary-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Working Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-8"
      >
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          Working Hours
        </h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Time */}
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-neutral-700 mb-1">
                Start Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="startTime"
                  name="startTime"
                  className="input pl-10"
                  {...formik.getFieldProps('startTime')}
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* End Time */}
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-neutral-700 mb-1">
                End Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="endTime"
                  name="endTime"
                  className="input pl-10"
                  {...formik.getFieldProps('endTime')}
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Break Start */}
            <div>
              <label htmlFor="breakStart" className="block text-sm font-medium text-neutral-700 mb-1">
                Break Start
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="breakStart"
                  name="breakStart"
                  className="input pl-10"
                  {...formik.getFieldProps('breakStart')}
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Break End */}
            <div>
              <label htmlFor="breakEnd" className="block text-sm font-medium text-neutral-700 mb-1">
                Break End
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="breakEnd"
                  name="breakEnd"
                  className="input pl-10"
                  {...formik.getFieldProps('breakEnd')}
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="slotDuration" className="block text-sm font-medium text-neutral-700 mb-1">
              Appointment Slot Duration (minutes)
            </label>
            <select
              id="slotDuration"
              name="slotDuration"
              className="input"
              {...formik.getFieldProps('slotDuration')}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                'Save Schedule'
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Calendar Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          Schedule Preview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className={`p-4 rounded-lg border ${
                selectedDays.includes(day)
                  ? 'border-primary-200'
                  : 'border-neutral-200 bg-neutral-50'
              }`}
            >
              <h3 className="font-medium text-neutral-800 mb-2">{day}</h3>
              {selectedDays.includes(day) ? (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-neutral-600">
                    <FiClock className="mr-2" />
                    {formik.values.startTime} - {formik.values.breakStart}
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <FiClock className="mr-2" />
                    {formik.values.breakEnd} - {formik.values.endTime}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-500">Not Available</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SchedulePage