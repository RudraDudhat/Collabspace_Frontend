import React, { useState } from 'react';
import { Hash, Lock, Plus, X } from 'lucide-react';
import CreateChannel from './CreateChannel';

const ManageTeams = ({ onClose, team, onCreateChannel }) => {
  const [activeTab, setActiveTab] = useState('channels');
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  const channels = [
    { id: 'general', name: 'General', type: 'public', lastActive: '4 days ago' },
    { id: 'announcements', name: 'Announcements', type: 'public', lastActive: '1 week ago' },
    { id: 'design-reviews', name: 'Design Reviews', type: 'private', lastActive: '2 days ago' },
    { id: 'resources', name: 'Resources', type: 'public', lastActive: '5 days ago' }
  ];

  const members = [
    { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Owner', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 2, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily@example.com', role: 'Member', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 4, name: 'Lisa Park', email: 'lisa@example.com', role: 'Member', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100' }
  ];

  const handleCreateChannel = (channelData) => {
    onCreateChannel(channelData);
    setShowCreateChannel(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Manage Team - {team?.name}</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('channels')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'channels'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Channels
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Members
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'channels' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Channels</h3>
                  <button
                    onClick={() => setShowCreateChannel(true)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Channel
                  </button>
                </div>
                
                <div className="space-y-3">
                  {channels.map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {channel.type === 'private' ? (
                          <Lock className="h-5 w-5 text-gray-500 mr-3" />
                        ) : (
                          <Hash className="h-5 w-5 text-gray-500 mr-3" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{channel.name}</h4>
                          <p className="text-sm text-gray-500">Last active: {channel.lastActive}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        channel.type === 'private' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {channel.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Members</h3>
                  <input
                    type="text"
                    placeholder="Search members"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.role === 'Owner' 
                          ? 'bg-purple-100 text-purple-800'
                          : member.role === 'Admin'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Channel Modal */}
      {showCreateChannel && (
        <CreateChannel
          onClose={() => setShowCreateChannel(false)}
          onCreateChannel={handleCreateChannel}
        />
      )}
    </>
  );
};

export default ManageTeams;