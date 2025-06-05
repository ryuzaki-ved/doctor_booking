import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { appointmentsAPI, paymentsAPI } from '../../services/api.js'
import { toast } from 'react-toastify'
import { FiCreditCard, FiCalendar, FiClock, FiMapPin, FiUser, FiAlertCircle } from 'react-icons/fi'

const PaymentPage = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState(null)
  
  // Query appointment details
  const { data: appointment, isLoading } = useQuery(
    ['appointment', appointmentId],
    () => appointmentsAPI.getById(appointmentId),
    {
      // For demo, mock some data
      initialData: {
        data: {
          _id: appointmentId,
          doctorId: '1',
          doctorName: 'Dr. Sarah Johnson',
          specialty: 'Cardiology',
          appointmentDate: new Date('2024-03-20T10:00:00'),
          type: 'in-person',
          location: 'New York Medical Center',
          consultationFee: 150,
        }
      }
    }
  )

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentError(null)
    
    try {
      // Simulate payment API being expired or over quota
      throw new Error('Payment service is currently unavailable. Please try again later.')
      
      // This code will never be reached due to the error above
      const { data: { clientSecret } } = await paymentsAPI.createIntent(appointmentId)
      await paymentsAPI.confirm(appointmentId, 'demo_payment_intent')
      
      toast.success('Payment successful!')
      navigate('/patient/appointments')
    } catch (error) {
      setPaymentError(error.message)
      toast.error(error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">
          Complete Payment
        </h1>

        {/* Payment Error Alert */}
        {paymentError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-500 mr-2" />
              <p className="text-red-700">{paymentError}</p>
            </div>
          </div>
        )}

        {/* Appointment Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Appointment Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <FiUser className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Doctor</p>
                <p className="font-medium text-neutral-800">
                  {appointment.data.doctorName}
                </p>
                <p className="text-sm text-neutral-600">
                  {appointment.data.specialty}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <FiCalendar className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Date</p>
                <p className="font-medium text-neutral-800">
                  {new Date(appointment.data.appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <FiClock className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Time</p>
                <p className="font-medium text-neutral-800">
                  {new Date(appointment.data.appointmentDate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <FiMapPin className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Location</p>
                <p className="font-medium text-neutral-800">
                  {appointment.data.location}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-neutral-600">Consultation Fee</p>
                <p className="text-2xl font-bold text-neutral-800">
                  ${appointment.data.consultationFee}
                </p>
              </div>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-primary px-8 py-3 flex items-center"
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                ) : (
                  <FiCreditCard className="mr-2" />
                )}
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Payment Methods
          </h2>
          
          <div className="space-y-4">
            <div className="border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                  checked
                  readOnly
                />
                <label htmlFor="card" className="ml-3 block">
                  <span className="text-neutral-800 font-medium">Credit Card</span>
                  <span className="text-neutral-500 block text-sm">
                    Pay securely with your credit card
                  </span>
                </label>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                  disabled
                />
                <label htmlFor="paypal" className="ml-3 block">
                  <span className="text-neutral-400 font-medium">PayPal</span>
                  <span className="text-neutral-400 block text-sm">
                    Coming soon
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentPage