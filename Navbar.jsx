import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };

  const links = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "font-medium hover:text-blue-500"}>Home</NavLink></li>
      <li><NavLink to="/appointments" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "font-medium hover:text-blue-500"}>All Appointment</NavLink></li>
      {user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "font-medium hover:text-blue-500"}>Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="navbar bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
            {links}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-10" src="https://i.ibb.co/9G9f7C6/logo.png" alt="DocAppoint Logo" />
          <span className="text-2xl font-bold text-blue-600 hidden sm:block">DocAppoint</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8 text-gray-600">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="tooltip tooltip-bottom" data-tip={user?.displayName || "User"}>
              <img 
                src={user?.photoURL || "https://i.ibb.co/mJR9Qxc/user.png"} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-blue-100 object-cover"
              />
            </div>
            <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm rounded-full px-5">Logout</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm text-blue-600 font-bold">Login</Link>
            <Link to="/register" className="btn btn-info btn-sm text-white rounded-full px-5">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;