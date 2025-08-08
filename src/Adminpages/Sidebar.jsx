import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';

const navLinks = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Orders', path: '/admin/order' },
  { name: 'Products', path: '/admin/product' },
  { name: 'Users', path: '/admin/user' },
  { name: 'Settings', path: '/admin/settings' },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout handler (mobile only)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
    navigate("/login");
  };

  return (
    <>
      {/* 🔵 Top Bar with Menu Icon (mobile only) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow flex items-center p-4 justify-between">
        <div className='flex items-center'>
          <button
            onClick={() => setOpen(true)}
            className="text-blue-700 focus:outline-none"
            aria-label="Open sidebar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-bold text-blue-700">Admin Panel</h1>
        </div>
        {/* Logout button (mobile top bar) */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 via-red-600 to-pink-500 text-white py-1 px-4 rounded-lg font-bold shadow hover:scale-105 transition-all duration-200 text-sm md:hidden"
        >
          Logout
        </button>
      </div>

      {/* 🟢 Sidebar */}
      <aside
        className={`fixed top-0 left-0 min-h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:block`}
      >
        {/* Sidebar Content Wrapper */}
        <div className="flex flex-col min-h-screen overflow-y-auto">
          {/* Sidebar Header (mobile only) */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
            <h1 className="text-xl font-bold text-blue-700">Admin Panel</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 via-red-600 to-pink-500 text-white py-1 px-3 rounded-lg font-bold shadow hover:scale-105 transition-all duration-200 text-sm md:hidden"
              >
                Logout
              </button>
              <button onClick={() => setOpen(false)} className="text-2xl text-gray-600">&times;</button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 p-4 mt-2 flex-grow">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${
                  location.pathname === link.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* 🔴 Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
