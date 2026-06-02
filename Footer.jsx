import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Corrected import path, Using the new X logo

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-slate-900 text-white rounded">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <img className="w-12 h-12" src="https://i.ibb.co/9G9f7C6/logo.png" alt="DocAppoint" />
          <h2 className="text-3xl font-bold">DocAppoint</h2>
        </div>
        <p className="max-w-md text-slate-400">
          Your trusted partner in healthcare management. Book appointments with top-rated doctors effortlessly and securely.
        </p>
      </div>
      <nav>
        <div className="grid grid-flow-col gap-6">
          <Link to="#" className="text-2xl hover:text-blue-400 transition-colors"><FaFacebook /></Link>
          <Link to="#" className="text-2xl hover:text-blue-400 transition-colors">
            {/* New X Logo as per requirements */}
            <FaXTwitter />
          </Link>
          <Link to="#" className="text-2xl hover:text-blue-400 transition-colors"><FaInstagram /></Link>
          <Link to="#" className="text-2xl hover:text-blue-400 transition-colors"><FaLinkedin /></Link>
        </div>
      </nav>
      <aside className="mt-4 pt-8 border-t border-slate-800 w-full text-slate-500">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by DocAppoint Ltd</p>
      </aside>
    </footer>
  );
};

export default Footer;