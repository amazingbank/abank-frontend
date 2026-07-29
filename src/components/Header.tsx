import React from 'react';
import { Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Landmark className="h-8 w-8 text-blue-600" />
            <Link to="/" className="ml-2 text-xl font-bold text-gray-900 hover:text-blue-600">The Amazing Bank</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <Link to="/transfer" className="text-gray-700 hover:text-blue-600">Transfer</Link>
                <Link to="/investment" className="text-gray-700 hover:text-blue-600">Invest</Link>
                <Link to="/insights" className="text-gray-700 hover:text-blue-600">Insights</Link>
                <Link to="/blockchain" className="text-gray-700 hover:text-blue-600">Blockchain</Link>
              </>
            )}
            {user ? (
              <button onClick={logout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Logout</button>
            ) : (
              <Link to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Online Banking</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
