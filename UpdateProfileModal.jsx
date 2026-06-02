import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// No changes needed for this file based on the context.
const UpdateProfileModal = ({ user, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, you'd call a function from AuthContext or an API to update user profile
    // For example:
    // await updateUserProfile(formData.displayName, formData.photoURL);
    console.log("Updating Profile:", formData);

    // Simulate success
    toast.success("Profile updated successfully!");
    onUpdateSuccess(); // This should trigger a re-render of the profile section
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-scale-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Update Profile</h3>
            <button onClick={onClose} className="btn btn-ghost btn-circle">✕</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Name</span></label>
              <input 
                type="text" name="displayName" required className="input input-bordered" 
                value={formData.displayName} onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Email</span></label>
              <input type="email" value={user?.email || ""} readOnly className="input input-bordered bg-gray-50" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
              <input 
                type="text" name="photoURL" className="input input-bordered" 
                value={formData.photoURL} onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-info w-full text-white mt-4 rounded-xl">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfileModal;