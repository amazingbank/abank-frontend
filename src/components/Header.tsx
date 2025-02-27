import React from 'react';
import { Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Landmark className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">The Amazing Bank</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</Link>
            {/* <Link to="/interest-calculator" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Calculator</Link> */}
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Personal</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Business</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">About</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Online Banking
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
