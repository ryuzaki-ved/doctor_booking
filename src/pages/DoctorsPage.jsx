import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiMapPin, FiStar, FiArrowRight, FiFilter, FiCalendar } from 'react-icons/fi'
import { motion } from 'framer-motion'

const specialties = [
  'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 
  'Pediatrics', 'Ophthalmology', 'Psychiatry', 'Gynecology',
  'ENT', 'Dentistry', 'Urology', 'Internal Medicine'
]

// Local mock data
const mockDoctors = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Smith',
    specialty: 'Cardiology',
    location: 'New York, NY',
    rating: 4.8,
    price: 150,
    availableSlots: 5,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg'
  },
  {
    _id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialty: 'Dermatology',
    location: 'Los Angeles, CA',
    rating: 4.9,
    price: 175,
    availableSlots: 3,
    image: 'https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg'
  },
  {
    _id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    specialty: 'Pediatrics',
    location: 'Chicago, IL',
    rating: 4.7,
    price: 130,
    availableSlots: 7,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg'
  },
  {
    _id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    specialty: 'Neurology',
    location: 'Houston, TX',
    rating: 4.9,
    price: 200,
    availableSlots: 2,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg'
  },
  {
    _id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    specialty: 'Orthopedics',
    location: 'Miami, FL',
    rating: 4.6,
    price: 160,
    availableSlots: 4,
    image: 'https://images.pexels.com/photos/5407237/pexels-photo-5407237.jpeg'
  },
  {
    _id: '6',
    firstName: 'Lisa',
    lastName: 'Anderson',
    specialty: 'Psychiatry',
    location: 'Seattle, WA',
    rating: 4.8,
    price: 185,
    availableSlots: 6,
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg'
  }
]

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter doctors based on search term and specialty
  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty
    
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-6">Find the Right Doctor</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              className="input pl-10 py-3"
              placeholder="Search by doctor name or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter Toggle Button (mobile only) */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-full py-2 px-4 border border-neutral-300 rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
            >
              <FiFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-neutral-800 mb-3">Specialties</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  className={`py-2 px-4 rounded-md text-sm ${
                    selectedSpecialty === '' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                  onClick={() => setSelectedSpecialty('')}
                >
                  All Specialties
                </button>
                
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    className={`py-2 px-4 rounded-md text-sm ${
                      selectedSpecialty === specialty 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-6">
            {filteredDoctors?.length} Doctors Available
          </h2>
          
          {filteredDoctors?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-neutral-600 mb-4">No doctors found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSpecialty('')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="relative h-56">
                    <img
                      src={doctor.image}
                      alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white py-1 px-2 rounded-full text-sm font-medium text-primary-600 flex items-center">
                      <FiStar className="text-yellow-400 mr-1" />
                      {doctor.rating}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-neutral-800 mb-1">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">{doctor.specialty}</p>
                    
                    <div className="flex items-center text-neutral-500 mb-3">
                      <FiMapPin className="mr-2" />
                      {doctor.location}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-neutral-600">
                        <span className="font-semibold text-neutral-800">${doctor.price}</span> / consultation
                      </div>
                      <div className="flex items-center text-neutral-600">
                        <FiCalendar className="mr-1" />
                        <span>{doctor.availableSlots} slots available</span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/doctors/${doctor._id}`}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      View Profile
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorsPage