import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

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
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/watches" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-500" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-sky-400" /></a>
            <a href="mailto:corex@gmail.com" aria-label="Email"><Mail className="w-5 h-5 hover:text-green-400" /></a>
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
