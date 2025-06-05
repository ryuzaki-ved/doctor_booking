import express from 'express'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// In a real app, this would use a MongoDB model
// For this example, we'll use an in-memory "database"
const appointments = []

// Create a new appointment (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentType, consultationFee } = req.body
    const { userId, role } = req.user
    
    // Only patients can book appointments
    if (role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can book appointments' })
    }
    
    // Create appointment
    const newAppointment = {
      _id: Date.now().toString(),
      patientId: userId,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentType,
      consultationFee,
      status: 'pending', // pending, confirmed, completed, cancelled
      paymentStatus: 'pending', // pending, completed
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    appointments.push(newAppointment)
    
    res.status(201).json(newAppointment)
  } catch (error) {
    console.error('Create appointment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get patient's appointments (protected route)
router.get('/patient', auth, async (req, res) => {
  try {
    const { userId, role } = req.user
    
    // Only patients can access their appointments
    if (role !== 'patient') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Find all appointments for this patient
    const patientAppointments = appointments.filter(
      appointment => appointment.patientId === userId
    )
    
    res.status(200).json(patientAppointments)
  } catch (error) {
    console.error('Get patient appointments error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get doctor's appointments (protected route)
router.get('/doctor', auth, async (req, res) => {
  try {
    const { userId, role } = req.user
    
    // Only doctors can access their appointments
    if (role !== 'doctor') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Find all appointments for this doctor
    const doctorAppointments = appointments.filter(
      appointment => appointment.doctorId === userId
    )
    
    res.status(200).json(doctorAppointments)
  } catch (error) {
    console.error('Get doctor appointments error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update appointment status (protected route)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const { role } = req.user
    
    // Only doctors can update appointment status
    if (role !== 'doctor') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Find appointment
    const appointmentIndex = appointments.findIndex(a => a._id === id)
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    
    // Update status
    appointments[appointmentIndex] = {
      ...appointments[appointmentIndex],
      status,
      updatedAt: new Date()
    }
    
    res.status(200).json(appointments[appointmentIndex])
  } catch (error) {
    console.error('Update appointment status error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Cancel appointment (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const { userId, role } = req.user
    
    // Find appointment
    const appointmentIndex = appointments.findIndex(a => a._id === id)
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    
    const appointment = appointments[appointmentIndex]
    
    // Check authorization (only the patient who booked or the doctor can cancel)
    if (role === 'patient' && appointment.patientId !== userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    if (role === 'doctor' && appointment.doctorId !== userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Update status to cancelled
    appointments[appointmentIndex] = {
      ...appointment,
      status: 'cancelled',
      updatedAt: new Date()
    }
    
    res.status(200).json({ message: 'Appointment cancelled successfully' })
  } catch (error) {
    console.error('Cancel appointment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router