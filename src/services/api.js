import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'
    
    // Don't show toast for 401 errors on login/register endpoints
    const isAuthEndpoint = /\/(login|register)$/.test(error.config.url)
    
    if (error.response?.status === 401 && !isAuthEndpoint) {
      // If token is invalid/expired and not on auth endpoints
      toast.error('Your session has expired. Please login again.')
      localStorage.removeItem('token')
      window.location.href = '/login'
    } else if (!isAuthEndpoint) {
      // Show error toast for non-auth endpoints
      toast.error(message)
    }
    
    return Promise.reject(error)
  }
)

export default api

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
}

// Doctors API
export const doctorsAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getAvailability: (id, date) => api.get(`/doctors/${id}/availability`, { params: { date } }),
  updateProfile: (id, data) => api.put(`/doctors/${id}`, data),
  updateSchedule: (id, data) => api.put(`/doctors/${id}/schedule`, data),
}

// Appointments API
export const appointmentsAPI = {
  create: (data) => api.post('/appointments', data),
  getPatientAppointments: () => api.get('/appointments/patient'),
  getDoctorAppointments: () => api.get('/appointments/doctor'),
  updateStatus: (id, status) => api.put(`/appointments/${id}/status`, { status }),
  cancel: (id) => api.delete(`/appointments/${id}`),
}

// Payments API
export const paymentsAPI = {
  createIntent: (appointmentId) => api.post(`/payments/create-payment-intent`, { appointmentId }),
  confirm: (appointmentId, paymentIntentId) => 
    api.post(`/payments/confirm`, { appointmentId, paymentIntentId }),
}