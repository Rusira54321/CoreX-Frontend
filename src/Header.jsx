import React, { useState } from 'react';
import { ShoppingCart, LogIn, Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 tracking-wide">
          <span className="text-black">Corex</span>
          <span className="text-blue-600">Watches</span>
        </div>

        {/* Desktop Nav */}
        <nav className="space-x-6 hidden md:flex">
          <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </a>
          <a href="/watches" className="text-gray-700 hover:text-blue-600 font-medium">
            Watches
          </a>
          <a href="/cart" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
            <ShoppingCart className="h-5 w-5 mr-1" /> Cart
          </a>
          <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
            <LogIn className="h-5 w-5 mr-1" /> Login
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="/" className="block text-gray-700 hover:text-blue-600 font-medium">
            Home
          </a>
          <a href="/watches" className="block text-gray-700 hover:text-blue-600 font-medium">
            Watches
          </a>
          <a href="/cart" className="block text-gray-700 hover:text-blue-600 font-medium flex items-center">
            <ShoppingCart className="h-5 w-5 mr-1" /> Cart
          </a>
          <a href="/login" className="block text-gray-700 hover:text-blue-600 font-medium flex items-center">
            <LogIn className="h-5 w-5 mr-1" /> Login
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
