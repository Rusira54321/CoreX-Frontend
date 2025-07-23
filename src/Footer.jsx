import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold text-white">Corex Watches</h3>
          <p className="mt-2 text-sm">
            Luxury timepieces that define your style. Crafted with precision and elegance for modern lifestyles.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/watches" className="hover:text-white">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-white">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <Link to="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-500" /></Link>
            <Link to="#" aria-label="Instagram"><Instagram className="w-5 h-5 hover:text-pink-500" /></Link>
            <Link to="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-sky-400" /></Link>
            <Link to="mailto:corex@gmail.com" aria-label="Email"><Mail className="w-5 h-5 hover:text-green-400" /></Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Corex Watches. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
