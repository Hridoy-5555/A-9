import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar"; // Corrected import path
import Footer from "../components/shared/Footer"; // Corrected import path

const MainLayout = () => {
  return (
    <div className="font-outfit"> {/* Assuming Outfit or similar professional font is used */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-400px)] container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;