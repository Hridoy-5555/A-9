import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider"; // Corrected import path

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>Home</NavLink></li>
      <li><NavLink to="/all-appointments" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>All Appointment</NavLink></li>
      {user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"}>Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm container mx-auto px-4 py-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-10" src="https://i.ibb.co/9G9f7C6/logo.png" alt="DocAppoint Logo" />
          <span className="text-2xl font-bold text-blue-600">DocAppoint</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 font-medium text-gray-600">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-blue-100">
              <div className="w-10 rounded-full">
                <img alt="User Profile" src={user?.photoURL || "https://i.ibb.co/mJR9Qxc/user.png"} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><p className="font-semibold text-blue-600">{user?.displayName}</p></li>
              <li><button onClick={logOut} className="text-red-500 font-medium">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-info px-6 rounded-full">Login</Link>
            <Link to="/register" className="btn btn-info text-white px-6 rounded-full">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;