import { useState } from "react";
import toast from "react-hot-toast";
// No changes needed for this file based on the context.
const BookingModal = ({ doctor, user, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      userEmail: user?.email,
      doctorName: doctor.name,
      ...formData
    };

    // Logic to save to MongoDB (API Call)
    console.log("Saving Booking:", bookingData);
    
    // Show success toast
    toast.success("Appointment booked successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-scale-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Book Appointment</h3>
            <button onClick={onClose} className="btn btn-ghost btn-circle">✕</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Doctor</span></label>
                <input type="text" value={doctor.name} readOnly className="input input-bordered bg-gray-50" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Your Email</span></label>
                <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-50" />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Patient Full Name</span></label>
              <input 
                type="text" required className="input input-bordered rounded-xl" 
                placeholder="Full Name of Patient"
                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Gender</span></label>
                <select required className="select select-bordered w-full rounded-xl" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Phone Number</span></label>
                <input type="tel" required className="input input-bordered rounded-xl" placeholder="01XXXXXXXXX" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Date</span></label>
                <input type="date" required className="input input-bordered rounded-xl" onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Time</span></label>
                <input type="time" required className="input input-bordered rounded-xl" onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="btn btn-info w-full text-white mt-4 rounded-xl">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default BookingModal;