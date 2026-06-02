import { NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Corrected import path
// No changes needed for this file based on the context.
const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Dashboard | DocAppoint</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Your Dashboard</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Manage Account</h3>
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-3 rounded-xl bg-blue-100 text-blue-700 font-bold transition-colors"
                    : "flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                }
              >
                <span className="text-xl">🗓️</span> My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-3 rounded-xl bg-blue-100 text-blue-700 font-bold transition-colors"
                    : "flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                }
              >
                <span className="text-xl">👤</span> My Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content Area for Dashboard Sub-routes */}
        <div className="lg:w-3/4 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;