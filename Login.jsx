import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Where to go after login
  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Welcome back! You have successfully logged in.");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError("Invalid email or password");
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Successfully logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Helmet>
        <title>Login | DocAppoint - Access Your Dashboard</title>
        <meta name="description" content="Login to DocAppoint to manage your medical history and upcoming doctor appointments." />
      </Helmet>
      
      <div className="card w-full max-w-md bg-white shadow-2xl border border-gray-100 rounded-3xl">
        <div className="card-body p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Email</span></label>
              <input name="email" type="email" placeholder="email@example.com" className="input input-bordered rounded-xl" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Password</span></label>
              <input name="password" type="password" placeholder="••••••••" className="input input-bordered rounded-xl" required />
              <label className="label"><Link className="label-text-alt link link-hover text-blue-600">Forgot Password?</Link></label>
            </div>
            
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            
            <button className="btn btn-info w-full text-white rounded-xl mt-4">Login</button>
          </form>

          <div className="divider text-gray-400 text-xs">OR LOGIN WITH</div>
          
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full rounded-xl border-gray-200 hover:bg-gray-50 hover:text-gray-900 font-bold">
            <FaGoogle className="text-red-500 text-lg" /> Google
          </button>

          <p className="text-center mt-6 text-gray-600">Don’t have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register</Link></p>
        </div>
      </div>
    </div>
  );
};
export default Login;