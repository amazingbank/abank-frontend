import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Products</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Checking</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Savings</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Credit Cards</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Loans</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Press</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Security</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Terms</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Privacy</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Cookies</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Licenses</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <p className="text-base text-gray-400">
              © 2025 The Amazing Bank. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
