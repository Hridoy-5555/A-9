import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Helmet>
        <title>404 - Page Not Found | DocAppoint</title>
      </Helmet>
      <div className="text-center animate-scale-in">
        <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="btn btn-info text-white px-10 rounded-full shadow-lg shadow-blue-200 border-none transition-all hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;