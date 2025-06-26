
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-red-500 mb-4"
            >
              YoungBlood
            </motion.div>
            <p className="text-gray-400 max-w-md">
              Premium streetwear and fashion for the young and bold. Express your style with our curated collection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="text-gray-400 hover:text-white block transition-colors">
                All Products
              </Link>
              <Link to="/products?category=men" className="text-gray-400 hover:text-white block transition-colors">
                Men
              </Link>
              <Link to="/products?category=women" className="text-gray-400 hover:text-white block transition-colors">
                Women
              </Link>
              <Link to="/products?category=accessories" className="text-gray-400 hover:text-white block transition-colors">
                Accessories
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Contact Us
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Shipping Info
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Returns
              </a>
              <a href="#" className="text-gray-400 hover:text-white block transition-colors">
                Size Guide
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 YoungBlood. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
