import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import DatePicker from 'react-datepicker'
import { doctorsAPI, appointmentsAPI } from '../services/api.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { toast } from 'react-toastify'
import { 
  FiMapPin, FiStar, FiCalendar, FiClock, FiDollarSign, 
  FiCheckCircle, FiMessageCircle, FiPhone
} from 'react-icons/fi'
import { motion } from 'framer-motion'

const DoctorDetailsPage = () => {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)
  const [appointmentType, setAppointmentType] = useState('in-person')
  const [bookingLoading, setBookingLoading] = useState(false)
  
  // Mock available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ]
  
  // Query to fetch doctor details - disabled API call and using only mock data
  const { data: doctor, isLoading, isError } = useQuery(
    ['doctor', id],
    () => doctorsAPI.getById(id).then(res => res.data),
    {
      enabled: false, // Disable the API call
      // Mock data
      initialData: {
        _id: id,
        firstName: 'Sarah',
        lastName: 'Johnson',
        specialty: 'Cardiology',
        location: 'New York Medical Center, NY',
        bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience. She specializes in preventive cardiology, heart failure management, and cardiac imaging. Dr. Johnson completed her medical training at Harvard Medical School and her cardiology fellowship at Johns Hopkins Hospital.',
        education: [
          { degree: 'MD', institution: 'Harvard Medical School', year: '2005' },
          { degree: 'Cardiology Fellowship', institution: 'Johns Hopkins Hospital', year: '2010' },
          { degree: 'BS in Biology', institution: 'Stanford University', year: '2001' },
        ],
        experience: '15+ years',
        languages: ['English', 'Spanish'],
        rating: 4.9,
        reviews: 124,
        consultationFee: 150,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
        image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600',
        services: [
          'Cardiac Consultation',
          'Echocardiography',
          'Stress Testing',
          'Holter Monitoring',
          'Preventive Cardiology',
        ]
      }
    }
  )
  
  // Handle booking appointment
  const handleBookAppointment = async () => {
    // Check if user is logged in
    if (!currentUser) {
      toast.info('Please login to book an appointment')
      return
    }
    
    // Check if time slot is selected
    if (!selectedTime) {
      toast.warning('Please select a time slot')
      return
    }
    
    setBookingLoading(true)
    
    try {
      // Format date and time
      const appointmentDateTime = new Date(selectedDate)
      const [hours, minutes] = selectedTime.split(':')
      appointmentDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      
      // Create appointment
      const appointmentData = {
        doctorId: doctor._id,
        appointmentDate: appointmentDateTime,
        appointmentType,
        consultationFee: doctor.consultationFee
      }
      
      // In a real app, we would submit to the API
      // const response = await appointmentsAPI.create(appointmentData)
      
      // For demo, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Appointment booked successfully! Redirecting to payment...', {
        onClose: () => {
          // Show payment error after the success message
          setTimeout(() => {
            toast.error('Payment service is currently unavailable. Please try again later.', {
              autoClose: false
            })
          }, 1000)
        }
      })
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment')
    } finally {
      setBookingLoading(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  if (isError || !doctor) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container-custom mx-auto text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Doctor not found</h2>
          <p className="text-neutral-600 mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
          <Link to="/doctors" className="btn-primary">
            Back to Doctors
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Profile */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Doctor Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3">
                  <img 
                    className="h-full w-full object-cover md:h-full" 
                    src={doctor.image} 
                    alt={`Dr. ${doctor.firstName} ${doctor.lastName}`} 
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-neutral-800 mb-2 md:mb-0">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h1>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-neutral-500 ml-1">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <p className="text-primary-600 font-medium mb-4">{doctor.specialty}</p>
                  
                  <div className="flex items-start text-neutral-600 mb-4">
                    <FiMapPin className="mt-1 mr-2 flex-shrink-0" />
                    <span>{doctor.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {doctor.experience} Experience
                    </div>
                    {doctor.languages.map((language, index) => (
                      <div key={index} className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">
                        {language}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex mt-6 space-x-4">
                    <button className="btn-outline flex items-center">
                      <FiPhone className="mr-2" />
                      Call
                    </button>
                    <button className="btn-outline flex items-center">
                      <FiMessageCircle className="mr-2" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* About Doctor */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">About Dr. {doctor.lastName}</h2>
              <p className="text-neutral-700 mb-6">{doctor.bio}</p>
              
              {/* Education */}
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Education</h3>
              <div className="space-y-3 mb-6">
                {doctor.education.map((edu, index) => (
                  <div key={index} className="flex">
                    <div className="mr-3 mt-1">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">{edu.degree}</p>
                      <p className="text-neutral-600">{edu.institution} • {edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Services */}
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {doctor.services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <FiCheckCircle className="text-primary-500 mr-2" />
                    <span className="text-neutral-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Patient Reviews (placeholder) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Patient Reviews</h2>
                <span className="text-neutral-500">See all {doctor.reviews} reviews</span>
              </div>
              
              <div className="space-y-6">
                {/* Sample reviews - in a real app, these would come from the API */}
                {[
                  {
                    name: 'John Smith',
                    date: '2 weeks ago',
                    rating: 5,
                    review: 'Dr. Johnson is an excellent cardiologist. She took the time to explain my condition thoroughly and answered all my questions. Highly recommend!'
                  },
                  {
                    name: 'Maria Garcia',
                    date: '1 month ago',
                    rating: 5,
                    review: 'Very professional and knowledgeable. The office staff was also very helpful with scheduling and insurance questions.'
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-neutral-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold text-neutral-800">{review.name}</h3>
                      <span className="text-sm text-neutral-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`${i < review.rating ? 'text-yellow-400' : 'text-neutral-300'} mr-1`} 
                        />
                      ))}
                    </div>
                    <p className="text-neutral-700">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Booking Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">Book Appointment</h2>
              
              {/* Consultation Fee */}
              <div className="flex items-center justify-between mb-6 p-3 bg-primary-50 rounded-md">
                <div className="flex items-center">
                  <FiDollarSign className="text-primary-600 mr-2" />
                  <span className="font-medium">Consultation Fee</span>
                </div>
                <span className="font-bold text-primary-600">${doctor.consultationFee}</span>
              </div>
              
              {/* Appointment Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Appointment Type
                </label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className={`w-1/2 py-2 px-4 text-sm font-medium rounded-l-md focus:outline-none ${
                      appointmentType === 'in-person'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                    }`}
                    onClick={() => setAppointmentType('in-person')}
                  >
                    In-Person
                  </button>
                  <button
                    type="button"
                    className={`w-1/2 py-2 px-4 text-sm font-medium rounded-r-md focus:outline-none ${
                      appointmentType === 'virtual'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                    }`}
                    onClick={() => setAppointmentType('virtual')}
                  >
                    Virtual
                  </button>
                </div>
              </div>
              
              {/* Date Picker */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Select Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  minDate={new Date()}
                  className="input w-full"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              
              {/* Time Slots */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <FiClock className="inline mr-2" />
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      className={`py-2 px-1 text-sm font-medium rounded-md focus:outline-none ${
                        selectedTime === time
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Book Button */}
              <button
                className="btn-primary w-full py-3 text-base font-medium"
                onClick={handleBookAppointment}
                disabled={bookingLoading || !selectedTime}
              >
                {bookingLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>Book Appointment</>
                )}
              </button>
              
              {!currentUser && (
                <p className="text-sm text-neutral-500 mt-4 text-center">
                  Please <Link to="/login" className="text-primary-600 font-medium">login</Link> to book an appointment
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailsPage