import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { appointmentsAPI } from '../../services/api.js'
import { FiCalendar, FiClock, FiUser, FiVideo } from 'react-icons/fi'

const AppointmentsPage = () => {
  const [filter, setFilter] = useState('all') // all, upcoming, completed
  
  // Query appointments
  const { data: appointments, isLoading } = useQuery(
    'doctorAppointments',
    () => appointmentsAPI.getDoctorAppointments(),
    {
      // For demo, mock some data
      initialData: {
        data: [
          {
            _id: '1',
            patientName: 'John Smith',
            appointmentDate: new Date('2024-03-20T10:00:00'),
            status: 'upcoming',
            type: 'in-person',
            notes: 'Regular checkup',
          },
          {
            _id: '2',
            patientName: 'Sarah Wilson',
            appointmentDate: new Date('2024-03-20T11:00:00'),
            status: 'upcoming',
            type: 'virtual',
            notes: 'Follow-up consultation',
          },
          {
            _id: '3',
            patientName: 'Michael Brown',
            appointmentDate: new Date('2024-03-18T14:30:00'),
            status: 'completed',
            type: 'in-person',
            notes: 'Annual physical examination',
          },
        ]
      }
    }
  )

  const filteredAppointments = appointments?.data.filter(appointment => {
    if (filter === 'upcoming') return appointment.status === 'upcoming'
    if (filter === 'completed') return appointment.status === 'completed'
    return true
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-4 md:mb-0">
          Appointments
        </h1>
        
        <div className="flex space-x-2">
          {['all', 'upcoming', 'completed'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === option
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : filteredAppointments?.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
            <FiCalendar className="w-8 h-8 text-neutral-400" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">
            No appointments found
          </h2>
          <p className="text-neutral-600">
            {filter === 'upcoming'
              ? "You don't have any upcoming appointments."
              : filter === 'completed'
              ? "You don't have any completed appointments."
              : "You don't have any appointments."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments?.map((appointment, index) => (
            <motion.div
              key={appointment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start mb-4 md:mb-0">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium">
                      {appointment.patientName.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800">
                      {appointment.patientName}
                    </h3>
                    <div className="flex items-center text-sm text-neutral-500 mb-1">
                      <FiUser className="mr-1" />
                      Patient ID: #{appointment._id}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500">
                      {appointment.type === 'virtual' ? (
                        <FiVideo className="mr-1" />
                      ) : (
                        <FiCalendar className="mr-1" />
                      )}
                      {appointment.type === 'virtual' ? 'Virtual Consultation' : 'In-Person Visit'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end">
                  <div className="flex items-center mb-2">
                    <FiClock className="mr-2 text-neutral-400" />
                    <span className="text-sm text-neutral-600">
                      {new Date(appointment.appointmentDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FiCalendar className="mr-2 text-neutral-400" />
                    <span className="text-sm text-neutral-600">
                      {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === 'upcoming'
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </div>

              {appointment.notes && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Notes:</span> {appointment.notes}
                  </p>
                </div>
              )}

              {appointment.status === 'upcoming' && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex flex-wrap gap-2">
                    <button className="btn-primary">
                      Start Session
                    </button>
                    <button className="btn-outline">
                      Reschedule
                    </button>
                    <button className="btn-outline text-red-500 border-red-500 hover:bg-red-50">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AppointmentsPage