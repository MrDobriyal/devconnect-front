// components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();

  if (!user) return null; // Don't show navbar if not logged in

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Messages', path: '/list' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-medium ${
                location.pathname === link.path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button
          onClick={logoutUser}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-inner flex justify-around items-center py-2 border-t">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex flex-col items-center text-xs ${
              location.pathname === link.path ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            {/* Simple icons with emojis for now */}
            {link.name === 'Home' && <span>🏠</span>}
            {link.name === 'Profile' && <span>👤</span>}
            {link.name === 'Messages' && <span>💬</span>}
            {link.name === 'Settings' && <span>⚙️</span>}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
