import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Markets from "./pages/Markets";
import Watchlist from "./pages/Watchlist";
import CoinDetail from "./pages/CoinDetail";
import { Toaster } from "react-hot-toast";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-white border-b-2 border-green-400 pb-1"
      : "hover:text-white transition";

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex flex-col">
      <Toaster position="top-right" />

      {/* Navbar */}
      <nav className="bg-[#1e293b] h-16 flex items-center justify-between px-6 md:px-10 relative">
        <h1 className="text-xl font-bold tracking-wide">
          Crypto<span className="text-green-400">Pulse</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-gray-300">
          <NavLink to="/" className={linkStyle}>Dashboard</NavLink>
          <NavLink to="/markets" className={linkStyle}>Markets</NavLink>
          <NavLink to="/portfolio" className={linkStyle}>Portfolio</NavLink>
          <NavLink to="/watchlist" className={linkStyle}>Watchlist</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#1e293b] flex flex-col items-center gap-6 py-6 md:hidden z-50 text-gray-300">
            <NavLink to="/" className={linkStyle} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/markets" className={linkStyle} onClick={() => setMenuOpen(false)}>Markets</NavLink>
            <NavLink to="/portfolio" className={linkStyle} onClick={() => setMenuOpen(false)}>Portfolio</NavLink>
            <NavLink to="/watchlist" className={linkStyle} onClick={() => setMenuOpen(false)}>Watchlist</NavLink>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-2xl mt-20">
                Page Not Found
              </h1>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#0b1220] py-10 text-center text-gray-400 text-sm px-4">
        <h2 className="text-xl font-bold text-white tracking-wide">
          Crypto<span className="text-green-400">Pulse</span>
        </h2>

        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          A modern crypto tracking dashboard with portfolio & watchlist features.
        </p>

        <div className="mt-6 flex justify-center gap-8 text-sm flex-wrap">
          <a
            href="https://www.linkedin.com/in/rahul-soni-5a465b287/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/DevRaahull"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            GitHub
          </a>
        </div>

        <p className="mt-6 tracking-wide">
          Made with ❤️ by{" "}
          <span className="text-green-400 font-semibold">
            Rahul Soni
          </span>
        </p>

        <p className="mt-4 text-xs text-gray-600">
          © {new Date().getFullYear()} CryptoPulse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;