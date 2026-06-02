import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// No changes needed for this file based on the context.
const UpdateBookingModal = ({ booking, user, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: ""
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        patientName: booking.patientName,
        gender: booking.gender,
        phone: booking.phone,
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate API call to update booking
    console.log("Updating Booking:", { ...booking, ...formData });
    
    // In a real app, you'd send a PUT/PATCH request to your backend
    // const res = await axios.put(`/api/bookings/${booking._id}`, formData);
    // if (res.data.success) {
    //   onUpdateSuccess(res.data.updatedBooking);
    //   toast.success("Appointment updated successfully!");
    // }

    // For mock:
    onUpdateSuccess({ ...booking, ...formData }); // Update UI instantly
    toast.success("Appointment updated successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-scale-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Update Appointment</h3>
            <button onClick={onClose} className="btn btn-ghost btn-circle">✕</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Doctor</span></label>
                <input type="text" value={booking.doctorName} readOnly className="input input-bordered bg-gray-50" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Your Email</span></label>
                <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-50" />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Patient Full Name</span></label>
              <input 
                type="text" name="patientName" required className="input input-bordered" 
                value={formData.patientName} onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Gender</span></label>
                <select name="gender" required className="select select-bordered w-full" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Phone Number</span></label>
                <input type="tel" name="phone" required className="input input-bordered" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Date</span></label>
                <input type="date" name="appointmentDate" required className="input input-bordered" value={formData.appointmentDate} onChange={handleChange} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Time</span></label>
                <input type="time" name="appointmentTime" required className="input input-bordered" value={formData.appointmentTime} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-info w-full text-white mt-4 rounded-xl">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateBookingModal;