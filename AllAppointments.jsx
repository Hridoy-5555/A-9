import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Helmet } from "react-helmet-async"; // Corrected import path

const AllAppointments = () => {
  const { user } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      const data = [
        { id: "d1", name: "Dr. Ayesha Rahman", specialty: "Cardiologist", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800", experience: "10 years", hospital: "Labaid Cardiac Hospital", fee: 800 },
        { id: "d2", name: "Dr. Imran Khan", specialty: "Pediatrician", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800", experience: "8 years", hospital: "Apollo Hospitals Dhaka", fee: 700 },
        { id: "d3", name: "Dr. Fatima Begum", specialty: "Dermatologist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800", experience: "12 years", hospital: "Square Hospitals Ltd.", fee: 900 },
      ];
      setDoctors(data);
      setLoading(false);
    };
    fetchDoctors();
  }, []);

  const processedDoctors = doctors
    .filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.fee - b.fee;
      if (sortBy === "highToLow") return b.fee - a.fee;
      return 0;
    });

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>All Doctors | DocAppoint</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
        <h2 className="text-3xl font-bold text-gray-800">Available Doctors</h2>
        
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          <select 
            className="select select-bordered rounded-xl w-full md:w-48"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="">Sort by Fee</option>
            <option value="lowToHigh">Fee: Low to High</option>
            <option value="highToLow">Fee: High to Low</option>
          </select>

          <div className="join w-full max-w-md">
            <input 
              className="input input-bordered join-item w-full" 
              placeholder="Search by Doctor Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-info join-item text-white px-8">Search</button>
          </div>
        </div>
      </div>

      {processedDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedDoctors.map((doctor) => (
            <div key={doctor.id} className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full animate-fade-in hover:-translate-y-1">
              <figure className="px-4 pt-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="rounded-xl h-48 w-full object-cover" 
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x600?text=Doctor+Image+Not+Available";
                  }}
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-xl text-gray-900">{doctor.name}</h3>
                  <div className="badge badge-info text-white">{doctor.specialty}</div>
                </div>
                <p className="text-gray-600 font-medium">{doctor.hospital}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">Exp: {doctor.experience}</span>
                </div>
                <div className="card-actions mt-4">
                  <Link 
                    to={user ? `/doctor/${doctor.id}` : "/login"} 
                    className="btn btn-info text-white w-full rounded-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-400">No doctors found matching your search.</h3>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;