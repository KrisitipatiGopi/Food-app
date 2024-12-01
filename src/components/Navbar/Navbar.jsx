import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useOnlineStatus from '../useOnlineStatus';
import UserContext from '../../Utils/UserContext';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [login, setLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // Reference to the modal for detecting clicks outside
  const navigate = useNavigate();
  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setUserName } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  // Close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLogin = () => {
    if (login) {
      setIsModalOpen(true); // Open the modal on login click
    } else {
      // Handle logout logic (without opening the modal)
      setLogin(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-gray-100 p-4 flex justify-between items-center shadow-md">
      <img 
        src="https://logo-marque.com/wp-content/uploads/2020/11/Swiggy-Logo-650x366.png" 
        alt="logo" 
        className="cursor-pointer w-32 h-auto" 
        onClick={() => navigate("/")} 
      />
      <ul className="flex space-x-6 text-lg font-semibold">
        <li>
          Online:&nbsp;
          {onlineStatus ? (
            <span className="dot bg-red-500 w-3 h-3 rounded-full inline-block"></span>
          ) : (
            <span className="dot bg-green-500 w-3 h-3 rounded-full inline-block"></span>
          )}
        </li>
        <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
        <NavLink to="/about" className="hover:text-gray-300">About</NavLink>
        <NavLink to="/contact" className="hover:text-gray-300">Contact</NavLink>
        <NavLink to="/cart" className="hover:text-gray-300">
          Cart ({cartItems.length})
        </NavLink>
      </ul>
      <button 
        onClick={toggleLogin} 
        className="bg-gray-400 hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        {login ? 'Login' : 'Logout'}
      </button>

      {/* Modal for Login */}
      {isModalOpen && login && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div 
            ref={modalRef} 
            className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-gray-100"
          >
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form>
              <input 
                type="text" 
                placeholder="Username" 
                className="mb-4 p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="mb-4 p-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <div className="flex justify-between">
                <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Submit</button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
