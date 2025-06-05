import express from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
import { auth } from '../middleware/auth.js'

dotenv.config()

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key')

// In a real app, this would use a MongoDB model
// For this example, we'll use in-memory "databases"
const appointments = []
const payments = []

// Create a payment intent (protected route)
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { appointmentId } = req.body
    const { userId, role } = req.user
    
    // Only patients can make payments
    if (role !== 'patient') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Find the appointment
    const appointment = appointments.find(a => a._id === appointmentId)
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    
    // Check if the patient is the one who booked
    if (appointment.patientId !== userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Check if payment is already made
    if (appointment.paymentStatus === 'completed') {
      return res.status(400).json({ message: 'Payment already completed' })
    }
    
    // Create a payment intent with Stripe
    // In a real app, this would use the actual Stripe API
    // For this example, we'll simulate the response
    
    const amount = appointment.consultationFee * 100 // convert to cents
    
    // Simulate Stripe response
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2, 10)}`,
      amount,
      currency: 'usd',
      status: 'requires_payment_method'
    }
    
    // Save payment intent details
    payments.push({
      _id: Date.now().toString(),
      appointmentId,
      paymentIntentId: paymentIntent.id,
      amount: amount / 100, // store in dollars
      status: 'pending',
      createdAt: new Date()
    })
    
    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Create payment intent error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Confirm payment (protected route)
router.post('/confirm', auth, async (req, res) => {
  try {
    const { appointmentId, paymentIntentId } = req.body
    const { userId, role } = req.user
    
    // Only patients can confirm payments
    if (role !== 'patient') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Find the appointment
    const appointmentIndex = appointments.findIndex(a => a._id === appointmentId)
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    
    const appointment = appointments[appointmentIndex]
    
    // Check if the patient is the one who booked
    if (appointment.patientId !== userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Find the payment
    const paymentIndex = payments.findIndex(p => 
      p.appointmentId === appointmentId && p.paymentIntentId === paymentIntentId
    )
    
    if (paymentIndex === -1) {
      return res.status(404).json({ message: 'Payment not found' })
    }
    
    // Update payment status
    payments[paymentIndex] = {
      ...payments[paymentIndex],
      status: 'completed',
      updatedAt: new Date()
    }
    
    // Update appointment payment status
    appointments[appointmentIndex] = {
      ...appointment,
      paymentStatus: 'completed',
      status: 'confirmed',
      updatedAt: new Date()
    }
    
    res.status(200).json({
      message: 'Payment confirmed successfully',
      appointment: appointments[appointmentIndex]
    })
  } catch (error) {
    console.error('Confirm payment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router