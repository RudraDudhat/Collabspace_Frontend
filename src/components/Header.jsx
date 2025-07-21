import React, { useState } from 'react';
import { Search, Plus, ChevronDown, LogOut, User } from 'lucide-react';

const Header = ({ user, onLogout, activeView, onViewProfile }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const getViewTitle = () => {
    switch (activeView) {
      case 'teams':
        return 'Teams';
      case 'chat':
        return 'Chat';
      case 'activity':
        return 'Activity';
      case 'calendar':
        return 'Calendar';
      case 'files':
        return 'Files';
      default:
        return 'CollabSpace';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Title and Search */}
        <div className="flex items-center flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mr-8">{getViewTitle()}</h1>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium text-gray-700">{user.username}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{user.username}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <button 
                  onClick={() => {
                    onViewProfile();
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <User className="h-4 w-4 mr-3" />
                  View Profile
                </button>

                <div className="border-t border-gray-100 my-2"></div>

                <button
                  onClick={onLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileDropdown(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;