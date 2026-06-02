import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async"; // Corrected import path
import UpdateProfileModal from "../../components/modals/UpdateProfileModal";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // This function would be passed to the modal to update the UI after profile update
  // In a real app, AuthContext would likely have a method to refresh user data
  const handleProfileUpdateSuccess = () => {
    // For now, we just close the modal.
    // If AuthContext has a refreshUser function, call it here.
    // e.g., refreshUser();
    setIsUpdateModalOpen(false);
  };

  return (
    <div>
      <Helmet><title>My Profile | DocAppoint</title></Helmet>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h2>

      <div className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-100 max-w-lg mx-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/mJR9Qxc/user.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-800">{user?.displayName || "N/A"}</h3>
          <p className="text-blue-600 text-lg">{user?.email || "N/A"}</p>
        </div>

        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="btn btn-info text-white w-full rounded-full mt-6"
        >
          Update Profile
        </button>
      </div>

      {isUpdateModalOpen && user && (
        <UpdateProfileModal
          user={user}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateSuccess={handleProfileUpdateSuccess}
        />
      )}
    </div>
  );
};

export default MyProfile;