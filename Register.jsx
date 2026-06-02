import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast"; // Corrected import path
import { Helmet } from "react-helmet-async"; // Corrected import path
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Validation Rules
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            toast.success("Account created successfully! Please login to continue.");
            navigate("/login");
          });
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Helmet>
        <title>Register | DocAppoint - Join Our Healthcare Community</title>
        <meta name="description" content="Create an account on DocAppoint to book and manage your medical appointments with top doctors." />
      </Helmet>
      
      <div className="card w-full max-w-md bg-white shadow-2xl border border-gray-100 rounded-3xl">
        <div className="card-body p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>
          
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Full Name</span></label>
              <input name="name" type="text" placeholder="Your Name" className="input input-bordered rounded-xl" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Email</span></label>
              <input name="email" type="email" placeholder="email@example.com" className="input input-bordered rounded-xl" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
              <input name="photo" type="url" placeholder="https://example.com/photo.jpg" className="input input-bordered rounded-xl" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Password</span></label>
              <input name="password" type="password" placeholder="••••••••" className="input input-bordered rounded-xl" required />
            </div>
            
            {error && <p className="text-red-500 text-sm font-medium pt-1">{error}</p>}
            
            <button className="btn btn-info w-full text-white rounded-xl mt-6">Register</button>
          </form>

          <div className="divider text-gray-400 text-xs">OR SIGNUP WITH</div>
          
          <button onClick={() => signInWithGoogle().then(() => navigate("/"))} className="btn btn-outline w-full rounded-xl border-gray-200 hover:bg-gray-50 hover:text-gray-900 font-bold">
            <FaGoogle className="text-red-500 text-lg" /> Google
          </button>

          <p className="text-center mt-6 text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
};
export default Register;