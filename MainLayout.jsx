import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="font-outfit"> {/* Assuming Outfit or similar professional font is used */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-400px)] container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </div>
  );
};

export default MainLayout;