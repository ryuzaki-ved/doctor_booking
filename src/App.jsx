import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout Components
import MainLayout from './layouts/MainLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

// Public Pages
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DoctorsPage from './pages/DoctorsPage.jsx'
import DoctorDetailsPage from './pages/DoctorDetailsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

// Protected Pages
import PatientDashboardPage from './pages/patient/DashboardPage.jsx'
import PatientAppointmentsPage from './pages/patient/AppointmentsPage.jsx'
import PatientProfilePage from './pages/patient/ProfilePage.jsx'
import PatientPaymentPage from './pages/patient/PaymentPage.jsx'

// Doctor Pages
import DoctorDashboardPage from './pages/doctor/DashboardPage.jsx'
import DoctorAppointmentsPage from './pages/doctor/AppointmentsPage.jsx'
import DoctorProfilePage from './pages/doctor/ProfilePage.jsx'
import DoctorSchedulePage from './pages/doctor/SchedulePage.jsx'

// Utilities
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  const location = useLocation()

  useEffect(() => {
    // You could add any app initialization logic here
  }, [])

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="doctors/:id" element={<DoctorDetailsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          
          {/* Patient Routes */}
          <Route path="/patient" element={
            <ProtectedRoute allowedRole="patient">
              <DashboardLayout userType="patient" />
            </ProtectedRoute>
          }>
            <Route index element={<PatientDashboardPage />} />
            <Route path="appointments" element={<PatientAppointmentsPage />} />
            <Route path="profile" element={<PatientProfilePage />} />
            <Route path="payment/:appointmentId" element={<PatientPaymentPage />} />
          </Route>
          
          {/* Doctor Routes */}
          <Route path="/doctor" element={
            <ProtectedRoute allowedRole="doctor">
              <DashboardLayout userType="doctor" />
            </ProtectedRoute>
          }>
            <Route index element={<DoctorDashboardPage />} />
            <Route path="appointments" element={<DoctorAppointmentsPage />} />
            <Route path="profile" element={<DoctorProfilePage />} />
            <Route path="schedule" element={<DoctorSchedulePage />} />
          </Route>
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App