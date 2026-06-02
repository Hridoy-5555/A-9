import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { AuthContext } from "./AuthProvider";
import { Helmet } from "react-helmet-async";
import BookingModal from "./BookingModal";

const DoctorDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [doctor, setDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      // Mocking doctor fetch - In real app, fetch by ID from API
      // You would typically make an API call here, e.g., using axios or fetch
      // const response = await axios.get(`/api/doctors/${id}`);
      // setDoctor(response.data);

      // Placeholder data for demonstration
      const mockDoctors = [
        {
          id: "d1",
          name: "Dr. Ayesha Rahman",
          specialty: "Cardiologist",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800",
          experience: "10 years",
          availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
          description: "Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment.",
          hospital: "Labaid Cardiac Hospital",
          location: "Dhanmondi, Dhaka",
          fee: 800
        },
        {
          id: "d2",
          name: "Dr. Imran Khan",
          specialty: "Pediatrician",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800",
          experience: "8 years",
          availability: ["10:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
          description: "Dedicated pediatrician providing comprehensive care for children from infancy through adolescence.",
          hospital: "Apollo Hospitals Dhaka",
          location: "Bashundhara, Dhaka",
          fee: 700
        },
        {
          id: "d3",
          name: "Dr. Fatima Begum",
          specialty: "Dermatologist",
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800",
          experience: "12 years",
          availability: ["11:00 AM - 02:00 PM", "06:00 PM - 09:00 PM"],
          description: "Expert dermatologist offering advanced treatments for skin, hair, and nail conditions.",
          hospital: "Square Hospitals Ltd.",
          location: "Panthapath, Dhaka",
          fee: 900
        },
      ];
      const foundDoctor = mockDoctors.find(doc => doc.id === id);
      setDoctor(foundDoctor);
      setLoading(false);
    };
    fetchDoctorDetails();
  }, [id]); // Dependency array includes 'id' to re-fetch if ID changes

  // Handle redirection if user is not logged in when trying to book
  const navigate = useNavigate();
  const location = useLocation(); // Get current location for redirection
  const handleBookAppointmentClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } }); // Redirect to login, then back to this page
    } else {
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-gray-400">Doctor not found.</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>{doctor.name} - Details | DocAppoint</title>
        <meta name="description" content={`Detailed profile of ${doctor.name}, ${doctor.specialty} at ${doctor.hospital}. Book an appointment today.`} />
        <meta name="keywords" content={`${doctor.name}, ${doctor.specialty}, ${doctor.hospital}, ${doctor.location}, doctor, appointment, booking`} />
      </Helmet>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-full object-cover min-h-[400px]" 
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x1200?text=No+Image+Found";
            }}
          />
        </div>
        
        <div className="lg:w-2/3 p-8 md:p-12">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
              <p className="text-xl text-blue-600 font-semibold">{doctor.specialty}</p>
            </div>
            <div className="bg-blue-50 px-6 py-3 rounded-2xl text-center">
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Consultation Fee</p>
              <p className="text-2xl font-bold text-gray-900">৳ {doctor.fee}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <span className="p-2 bg-gray-100 rounded-lg">🏥</span>
                <span><strong>Hospital:</strong> {doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="p-2 bg-gray-100 rounded-lg">📍</span>
                <span><strong>Location:</strong> {doctor.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="p-2 bg-gray-100 rounded-lg">⏳</span>
                <span><strong>Experience:</strong> {doctor.experience}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Availability
              </h4>
              <ul className="text-gray-600 space-y-1">
                {doctor.availability.map((time, idx) => (
                  <li key={idx} className="bg-green-50 px-3 py-1 rounded-lg inline-block mr-2 mb-2 text-sm font-medium text-green-700 transition-colors duration-300 hover:bg-green-200">
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="font-bold text-gray-800 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed text-lg">
              {doctor.description}
            </p>
          </div>

          <button 
            onClick={handleBookAppointmentClick}
            className="btn btn-info hover:bg-blue-600 text-white btn-lg w-full md:w-auto px-12 rounded-full shadow-lg shadow-blue-200 border-none transition-transform hover:scale-105 active:scale-95"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && doctor && ( // Ensure doctor data is available for the modal
        <BookingModal 
          doctor={doctor} 
          user={user} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default DoctorDetails;