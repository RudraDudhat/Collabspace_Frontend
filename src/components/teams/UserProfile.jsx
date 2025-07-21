import React from 'react';
import { X, Mail, Calendar, Users, MapPin } from 'lucide-react';

const UserProfile = ({ onClose, user }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Profile</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Profile Content */}
        <div className="p-6">
          {/* Avatar and Basic Info */}
          <div className="text-center mb-6">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-1">{user.username}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Joined</p>
                <p className="text-sm text-gray-600">January 2024</p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Teams</p>
                <p className="text-sm text-gray-600">3 teams</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-sm text-gray-600">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">About</h4>
            <p className="text-sm text-gray-600">
              Passionate about creating intuitive user experiences and collaborating with amazing teams. 
              Always excited to learn new technologies and share knowledge.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;