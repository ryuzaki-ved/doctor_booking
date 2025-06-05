import express from 'express'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// In a real app, this would use a MongoDB model
// For this example, we'll use an in-memory "database"
const doctors = [
  {
    _id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    specialty: 'Cardiology',
    location: 'New York Medical Center, NY',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience...',
    education: [
      { degree: 'MD', institution: 'Harvard Medical School', year: '2005' },
      { degree: 'Cardiology Fellowship', institution: 'Johns Hopkins Hospital', year: '2010' },
    ],
    experience: '15+ years',
    languages: ['English', 'Spanish'],
    rating: 4.9,
    reviews: 124,
    consultationFee: 150,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    services: [
      'Cardiac Consultation',
      'Echocardiography',
      'Stress Testing',
      'Holter Monitoring',
      'Preventive Cardiology',
    ],
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    _id: '2',
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@example.com',
    specialty: 'Dermatology',
    location: 'San Francisco Medical Group, CA',
    bio: 'Dr. David Chen is a board-certified dermatologist specializing in medical and cosmetic dermatology...',
    education: [
      { degree: 'MD', institution: 'Stanford University School of Medicine', year: '2008' },
      { degree: 'Dermatology Residency', institution: 'UCSF Medical Center', year: '2012' },
    ],
    experience: '12+ years',
    languages: ['English', 'Mandarin'],
    rating: 4.8,
    reviews: 98,
    consultationFee: 130,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    services: [
      'Skin Cancer Screening',
      'Acne Treatment',
      'Eczema Management',
      'Cosmetic Procedures',
      'Laser Therapy',
    ],
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

// Get all doctors (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { specialty, name } = req.query
    
    let filteredDoctors = [...doctors]
    
    // Apply filters if provided
    if (specialty) {
      filteredDoctors = filteredDoctors.filter(
        doctor => doctor.specialty.toLowerCase() === specialty.toLowerCase()
      )
    }
    
    if (name) {
      filteredDoctors = filteredDoctors.filter(
        doctor => {
          const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase()
          return fullName.includes(name.toLowerCase())
        }
      )
    }
    
    res.status(200).json(filteredDoctors)
  } catch (error) {
    console.error('Get doctors error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get a specific doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const doctor = doctors.find(d => d._id === id)
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    
    res.status(200).json(doctor)
  } catch (error) {
    console.error('Get doctor error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get doctor availability for a specific date
router.get('/:id/availability', async (req, res) => {
  try {
    const { id } = req.params
    const { date } = req.query
    
    const doctor = doctors.find(d => d._id === id)
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    
    // In a real app, this would query the database for available slots
    // For this example, we'll return some mock data
    
    // Parse the requested date
    const requestedDate = new Date(date)
    const dayOfWeek = requestedDate.toLocaleDateString('en-US', { weekday: 'long' })
    
    // Check if the doctor works on this day
    const isAvailable = doctor.availableDays.includes(dayOfWeek)
    
    if (!isAvailable) {
      return res.status(200).json({
        available: false,
        message: `Dr. ${doctor.lastName} is not available on ${dayOfWeek}s`
      })
    }
    
    // Mock available slots
    const availableSlots = [
      '09:00 AM', '10:00 AM', '11:00 AM', 
      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ]
    
    res.status(200).json({
      available: true,
      slots: availableSlots
    })
  } catch (error) {
    console.error('Get availability error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update doctor profile (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const { role, userId } = req.user
    
    // Only allow doctors to update their own profile
    if (role !== 'doctor' || userId !== id) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    const doctorIndex = doctors.findIndex(d => d._id === id)
    
    if (doctorIndex === -1) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    
    // Update doctor data
    const updatedDoctor = {
      ...doctors[doctorIndex],
      ...req.body,
      updatedAt: new Date()
    }
    
    doctors[doctorIndex] = updatedDoctor
    
    res.status(200).json(updatedDoctor)
  } catch (error) {
    console.error('Update doctor error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update doctor schedule (protected route)
router.put('/:id/schedule', auth, async (req, res) => {
  try {
    const { id } = req.params
    const { role, userId } = req.user
    
    // Only allow doctors to update their own schedule
    if (role !== 'doctor' || userId !== id) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    const doctorIndex = doctors.findIndex(d => d._id === id)
    
    if (doctorIndex === -1) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    
    // Update doctor schedule
    const { availableDays, workingHours } = req.body
    
    doctors[doctorIndex] = {
      ...doctors[doctorIndex],
      availableDays: availableDays || doctors[doctorIndex].availableDays,
      workingHours: workingHours || doctors[doctorIndex].workingHours,
      updatedAt: new Date()
    }
    
    res.status(200).json(doctors[doctorIndex])
  } catch (error) {
    console.error('Update schedule error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router