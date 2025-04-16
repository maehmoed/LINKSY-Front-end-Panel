import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, Users } from 'lucide-react'; // Import Users icon

const Navbar: React.FC = () => {
  return (
    <nav className="bg-red-700 p-4 text-white flex items-center justify-between">
      <Link to="/" className="flex items-center text-lg font-semibold">
        <img src="https://linksy.tech/storage/2023/09/LogoLinksyBlank.png" alt="Logo" className="h-8 w-auto mr-2" />
        {/* Removed "Control Panel" text */}
      </Link>
      <div className="flex items-center space-x-6"> {/* Increased spacing */}
        <Link to="/dashboard" className="hover:text-gray-200 flex items-center">
          <Home className="inline-block mr-1" size={20} />
          Dashboard
        </Link>
        {/* Add link to Customer Management */}
        <Link to="/customers" className="hover:text-gray-200 flex items-center">
          <Users className="inline-block mr-1" size={20} />
          Customers
        </Link>
        <Link to="/settings" className="hover:text-gray-200 flex items-center">
          <Menu className="inline-block mr-1" size={20} />
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
