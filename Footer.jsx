import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 mt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <img className="w-12 h-12" src="https://i.ibb.co/9G9f7C6/logo.png" alt="Logo" />
            <span className="text-3xl font-bold text-white">DocAppoint</span>
          </div>
          <p className="text-slate-400 max-w-md mx-auto">
            Your trusted partner in healthcare. Secure your health journey with the best experts in the field.
          </p>
        </div>
        
        <div className="flex justify-center gap-6 mb-12">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"><FaFacebookF className="text-xl" /></a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"><FaXTwitter className="text-xl" /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-pink-600 transition-colors"><FaInstagram className="text-xl" /></a>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-slate-500 text-sm">
          © {new Date().getFullYear()} DocAppoint Management System. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;