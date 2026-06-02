import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Helmet } from "react-helmet-async"; // Corrected import path
import toast from "react-hot-toast";
import UpdateBookingModal from "./UpdateBookingModal";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data for bookings - replace with API call to fetch user's bookings
  const fetchUserBookings = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockBookings = [
        {
          _id: "b1",
          userEmail: user?.email,
          doctorName: "Dr. Ayesha Rahman",
          patientName: "Rahim Uddin",
          gender: "Male",
          phone: "01712345678",
          appointmentDate: "2026-05-20",
          appointmentTime: "10:30 AM",
          doctor: { // Mock doctor object for display purposes
            id: "d1",
            specialty: "Cardiologist",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800",
            hospital: "Labaid Cardiac Hospital"
          }
        },
        {
          _id: "b2",
          userEmail: user?.email,
          doctorName: "Dr. Imran Khan",
          patientName: "Karim Ahmed",
          gender: "Male",
          phone: "01823456789",
          appointmentDate: "2026-05-25",
          appointmentTime: "03:00 PM",
          doctor: { // Mock doctor object for display purposes
            id: "d2",
            specialty: "Pediatrician",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800",
            hospital: "Apollo Hospitals Dhaka"
          }
        },
      ];
      setBookings(mockBookings.filter(booking => booking.userEmail === user?.email));
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDeleteBooking = (id) => {
    // Simulate API call to delete booking
    console.log("Deleting booking with ID:", id);
    setBookings(bookings.filter(booking => booking._id !== id)); // Instantly update UI
    toast.success("Appointment deleted successfully!");
  };

  const handleUpdateSuccess = (updatedBooking) => {
    setBookings(bookings.map(booking => 
      booking._id === updatedBooking._id ? { ...booking, ...updatedBooking } : booking
    ));
    setIsUpdateModalOpen(false);
    setSelectedBooking(null);
  };

  if (loading) return <div className="flex justify-center items-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div>
      <Helmet><title>My Bookings | DocAppoint</title></Helmet>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">You have no appointments booked yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-blue-50 rounded-xl shadow-md p-6 border border-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <img src={booking.doctor.image} alt={booking.doctorName} className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{booking.doctorName}</h3>
                  <p className="text-blue-600 font-medium">{booking.doctor.specialty} at {booking.doctor.hospital}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-1"><strong>Patient:</strong> {booking.patientName}</p>
              <p className="text-gray-700 mb-1"><strong>Date:</strong> {booking.appointmentDate}</p>
              <p className="text-gray-700 mb-4"><strong>Time:</strong> {booking.appointmentTime}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedBooking(booking); setIsUpdateModalOpen(true); }}
                  className="btn btn-sm btn-outline btn-info rounded-full"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="btn btn-sm btn-outline btn-error rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isUpdateModalOpen && selectedBooking && (
        <UpdateBookingModal booking={selectedBooking} user={user} onClose={() => setIsUpdateModalOpen(false)} onUpdateSuccess={handleUpdateSuccess} />
      )}
    </div>
  );
};

export default MyBookings;