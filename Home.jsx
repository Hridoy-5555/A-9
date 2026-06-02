import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Helmet } from "react-helmet-async"; // Corrected import path

// Placeholder for doctor data - in a real app, this would come from an API
const topDoctors = [
  {
    id: "d1",
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800",
    experience: "10 years",
    hospital: "Labaid Cardiac Hospital",
    rating: 4.9,
  },
  {
    id: "d2",
    name: "Dr. Imran Khan",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800",
    experience: "8 years",
    hospital: "Apollo Hospitals Dhaka",
    rating: 4.8,
  },
  {
    id: "d3",
      name: "Dr. Fatima Begum",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800",
    experience: "12 years",
    hospital: "Square Hospitals Ltd.",
    rating: 4.7,
  },
];

const Home = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
    <>
      <Helmet>
        <title>DocAppoint | Book Doctor Appointments Online</title>
        <meta name="description" content="Find and book appointments with top-rated doctors effortlessly. Manage your health with DocAppoint." />
        <meta name="keywords" content="doctor appointment, online booking, healthcare, medical, doctors, specialists" />
      </Helmet>

      {/* 1. Hero Banner Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32 rounded-xl shadow-lg overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
            Your Health, Our Priority.
          </h1>
          <div className="flex justify-center mb-6">
             <span className="badge badge-outline text-blue-100 px-4 py-3 animate-fade-in">
               Trusted by 10,000+ Patients
             </span>
          </div>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Find and book appointments with top-rated doctors effortlessly. Manage your health journey with DocAppoint.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up">
            <Link to="/all-appointments" className="btn btn-primary bg-white text-blue-700 hover:bg-blue-100 border-none px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-95">
              Find a Doctor
            </Link>
            <Link to="/register" className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-95">
              Join Us
            </Link>
          </div>
        </div>
        {/* Optional: Swiper.js integration would go here */}
        {/* <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/medical-bg.jpg')" }}></div> */}
      </section>

      {/* 2. Top Rated Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Our Top-Rated Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
                <img src={doctor.image} alt={doctor.name} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-3">{doctor.experience} | {doctor.hospital}</p>
                  <div className="flex items-center text-yellow-500 mb-4">
                    <span className="mr-1">⭐</span> {doctor.rating}
                  </div>
                  <Link
                    to={user ? `/doctor/${doctor.id}` : "/login"}
                    className="btn btn-info text-white w-full py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Additional Section 1: Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Why Choose DocAppoint?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-blue-50 rounded-xl shadow-md">
              <div className="text-blue-600 text-5xl mb-4">🩺</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Doctors</h3>
              <p className="text-gray-600">Access a network of highly qualified and experienced medical professionals.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl shadow-md">
              <div className="text-blue-600 text-5xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-600">Schedule appointments quickly and conveniently from anywhere, anytime.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl shadow-md">
              <div className="text-blue-600 text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your health data is protected with robust security measures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Additional Section 2: Patient Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">What Our Patients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <p className="text-gray-700 italic mb-4">"DocAppoint made finding a specialist so easy! The booking process was seamless, and I loved being able to see doctor ratings beforehand. Highly recommend!"</p>
              <p className="font-semibold text-gray-900">- Sarah J.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <p className="text-gray-700 italic mb-4">"The dashboard is incredibly helpful for managing my appointments. I can easily update or cancel if needed. A truly user-friendly platform."</p>
              <p className="font-semibold text-gray-900">- David L.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;