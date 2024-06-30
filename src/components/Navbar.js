import React, { useState } from "react";
import { FaSearch, FaHome, FaUserFriends, FaBell } from "react-icons/fa";

function Navbar() {
  const [isHomeClicked, setIsHomeClicked] = useState(true); // Initialize as true to show Home as clicked

  const handleHomeClick = () => {
    setIsHomeClicked(true);
    console.log("Home button clicked");
    // Add any additional logic here, such as navigation
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="flex justify-between items-center px-4 py-2">
        {/* Left side */}
        <div className="flex items-center">
          <div className="text-xl font-bold mr-6">LinkedIn</div>
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 p-2 rounded-md text-sm font-medium text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div
            className={`flex flex-col items-center cursor-pointer p-2 rounded-md shadow-lg ${
              isHomeClicked ? "bg-blue-100 text-blue-700" : "text-gray-700"
            }`}
            onClick={handleHomeClick}
          >
            <FaHome className="text-xl" />
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center text-gray-700 p-2 rounded-md shadow-lg">
            <FaUserFriends className="text-xl" />
            <span className="text-xs">My Network</span>
          </div>
          <div className="flex flex-col items-center text-gray-700 p-2 rounded-md shadow-lg">
            <FaBell className="text-xl" />
            <span className="text-xs">Notifications</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
