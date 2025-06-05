import { motion } from 'framer-motion'
import { FiAward, FiUsers, FiHeart, FiCheckCircle } from 'react-icons/fi'

const AboutPage = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-primary-50 py-16">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              About MediBook
            </h1>
            <p className="text-lg text-neutral-600">
              We're on a mission to make healthcare more accessible and convenient for everyone.
              Our platform connects patients with qualified healthcare professionals, making it
              easier to book and manage medical appointments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FiUsers, stat: '50,000+', label: 'Patients Served' },
              { icon: FiAward, stat: '1,000+', label: 'Verified Doctors' },
              { icon: FiHeart, stat: '98%', label: 'Patient Satisfaction' },
              { icon: FiCheckCircle, stat: '100,000+', label: 'Appointments Booked' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <item.icon size={32} className="text-primary-600" />
                </div>
                <h3 className="text-3xl font-bold text-neutral-800 mb-2">{item.stat}</h3>
                <p className="text-neutral-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">Our Mission</h2>
              <p className="text-neutral-600 mb-6">
                At MediBook, we believe that everyone deserves easy access to quality healthcare.
                Our platform is designed to eliminate the barriers between patients and healthcare
                providers, making it simple to find the right doctor and book appointments online.
              </p>
              <p className="text-neutral-600">
                We're committed to improving the healthcare experience through technology,
                ensuring that both patients and doctors can focus on what matters most - health
                and well-being.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg"
                alt="Medical professionals in a meeting"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Values</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              These core values guide everything we do at MediBook, from how we build our
              platform to how we interact with our users.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Accessibility',
                description: 'Making healthcare services easily accessible to everyone, anywhere.'
              },
              {
                title: 'Quality',
                description: 'Ensuring high standards in healthcare service delivery and patient care.'
              },
              {
                title: 'Innovation',
                description: 'Continuously improving our platform to better serve patients and doctors.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-50 rounded-lg p-8"
              >
                <h3 className="text-xl font-bold text-neutral-800 mb-4">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage