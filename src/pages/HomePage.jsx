import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiCalendar, FiCreditCard, FiCheckCircle } from 'react-icons/fi'

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight mb-4">
                Book Your Doctor Appointment <span className="text-primary-500">Online</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                Find the best doctors in your area, book appointments, and manage your healthcare journey seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/doctors" className="btn-primary px-8 py-3 text-base">
                  Find a Doctor
                </Link>
                <Link to="/register" className="btn-outline px-8 py-3 text-base">
                  Register as Patient
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Doctor with patient" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">How It Works</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Book your appointment in just a few easy steps and get the care you need without the hassle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiSearch,
                title: "Find Your Doctor",
                description: "Search for doctors by specialty, location, or availability and find the perfect match for your needs.",
              },
              {
                icon: FiCalendar,
                title: "Book Appointment",
                description: "Select your preferred date and time slot from the doctor's available schedule with just a few clicks.",
              },
              {
                icon: FiCreditCard,
                title: "Make Payment",
                description: "Complete your booking with a secure online payment and receive instant confirmation.",
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="card text-center px-6 py-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                  <step.icon size={28} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Specialties */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Medical Specialties</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Browse doctors by specialty and find the right expert for your specific healthcare needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Cardiology", image: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Dermatology", image: "https://images.pexels.com/photos/7108344/pexels-photo-7108344.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Orthopedics", image: "https://images.pexels.com/photos/7108350/pexels-photo-7108350.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Neurology", image: "https://images.pexels.com/photos/8376164/pexels-photo-8376164.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Pediatrics", image: "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Gynecology", image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Ophthalmology", image: "https://images.pexels.com/photos/5752277/pexels-photo-5752277.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Psychiatry", image: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600" },
            ].map((specialty, index) => (
              <motion.div 
                key={index}
                className="card overflow-hidden group cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={specialty.image} 
                    alt={specialty.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-70"></div>
                  <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">{specialty.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/doctors" className="btn-primary px-8 py-3">
              View All Specialties
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">What Our Patients Say</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Hear from patients who have used our platform to find doctors and book appointments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "MediBook made it so easy to find a specialist and book an appointment. The whole process took just a few minutes!",
                name: "Sarah Johnson",
                title: "Patient",
              },
              {
                quote: "I love how I can see all my past and upcoming appointments in one place. Makes managing healthcare so much simpler.",
                name: "David Chen",
                title: "Patient",
              },
              {
                quote: "The reminder feature is fantastic! I never miss an appointment now, and rescheduling is just a click away.",
                name: "Emily Rodriguez",
                title: "Patient",
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-primary-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-neutral-800">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-500">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Your Appointment?</h2>
              <p className="text-primary-100 text-lg">
                Join thousands of patients who have simplified their healthcare experience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/doctors" className="btn bg-white text-primary-600 hover:bg-primary-50 focus:ring-white px-8 py-3">
                Find a Doctor
              </Link>
              <Link to="/register" className="btn bg-transparent border-2 border-white text-white hover:bg-primary-700 focus:ring-white px-8 py-3">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Why Choose MediBook</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our platform offers a range of features designed to make healthcare access easier.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FiCheckCircle,
                title: "Verified Doctors",
                description: "All doctors on our platform are verified professionals with valid credentials.",
              },
              {
                icon: FiCalendar,
                title: "Easy Scheduling",
                description: "Book, reschedule, or cancel appointments with just a few clicks.",
              },
              {
                icon: FiCreditCard,
                title: "Secure Payments",
                description: "Make payments securely online with encrypted transaction protection.",
              },
              {
                icon: FiSearch,
                title: "Advanced Search",
                description: "Find doctors based on specialty, location, availability, and ratings.",
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <feature.icon size={24} className="text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage