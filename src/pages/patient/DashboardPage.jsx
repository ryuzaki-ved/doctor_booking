import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiCheckCircle, FiX } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { appointmentsAPI } from '../../services/api.js'
import { useAuth } from '../../contexts/AuthContext.jsx'

const DashboardPage = () => {
  const { currentUser } = useAuth()
  
  // Query appointments
  const { data: appointments, isLoading } = useQuery(
    'patientAppointments',
    () => appointmentsAPI.getPatientAppointments(),
    {
      // For demo, mock some data
      initialData: {
        data: [
          {
            _id: '1',
            doctorId: '1',
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            appointmentDate: new Date('2024-03-20T10:00:00'),
            status: 'upcoming',
            type: 'in-person',
          },
          {
            _id: '2',
            doctorId: '2',
            doctorName: 'Dr. David Chen',
            specialty: 'Dermatology',
            appointmentDate: new Date('2024-03-18T14:30:00'),
            status: 'completed',
            type: 'virtual',
          },
        ]
      }
    }
  )

  const upcomingAppointments = appointments?.data.filter(
    app => app.status === 'upcoming'
  )
  
  const pastAppointments = appointments?.data.filter(
    app => app.status === 'completed'
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-800 mb-6">
        Welcome back, {currentUser?.firstName}!
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            icon: FiCalendar,
            label: 'Upcoming Appointments',
            value: upcomingAppointments?.length || 0,
            color: 'bg-primary-100 text-primary-600',
          },
          {
            icon: FiCheckCircle,
            label: 'Completed Appointments',
            value: pastAppointments?.length || 0,
            color: 'bg-green-100 text-green-600',
          },
          {
            icon: FiClock,
            label: 'Pending Reviews',
            value: pastAppointments?.filter(app => !app.reviewed)?.length || 0,
            color: 'bg-yellow-100 text-yellow-600',
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800">
                  {stat.value}
                </h3>
                <p className="text-neutral-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">
          Upcoming Appointments
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : upcomingAppointments?.length === 0 ? (
          <p className="text-neutral-600 text-center py-8">
            No upcoming appointments scheduled.
          </p>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments?.map((appointment, index) => (
              <motion.div
                key={appointment._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium">
                      {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800">
                      {appointment.doctorName}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {appointment.specialty}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.type === 'virtual'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {appointment.type === 'virtual' ? 'Virtual' : 'In-Person'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">
          Recent Activity
        </h2>
        
        <div className="space-y-4">
          {[
            {
              type: 'appointment_booked',
              message: 'Appointment booked with Dr. Sarah Johnson',
              date: '2 days ago',
            },
            {
              type: 'appointment_completed',
              message: 'Completed appointment with Dr. David Chen',
              date: '5 days ago',
            },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start p-4 border border-neutral-200 rounded-lg"
            >
              <div className="mr-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                  {activity.type === 'appointment_booked' ? (
                    <FiCalendar className="text-neutral-600" />
                  ) : (
                    <FiCheckCircle className="text-neutral-600" />
                  )}
                </div>
              </div>
              <div>
                <p className="text-neutral-800">{activity.message}</p>
                <p className="text-sm text-neutral-500">{activity.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage