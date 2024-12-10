import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleSignOut = () => {
    logout(); // Remove user from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">DRDO</div>
        <div className="flex items-center gap-4">
          <Link
            to="/application-history"
            className="text-gray-600 hover:text-blue-600"
          >
            Application History
          </Link>

          {/* Profile Dropdown Menu */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
              <FaUserCircle className="w-10 h-10 rounded-full" />
              <span>{user.name}</span>
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="/profile-settings"
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Your Profile
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Sign out
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
