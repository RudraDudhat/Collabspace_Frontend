import React from 'react';
import { ArrowLeft, Hash, Lock, Users, MoreVertical, Plus, Smile, Paperclip, Send } from 'lucide-react';

const TeamChat = ({ 
  currentTeam, 
  selectedChannel, 
  setSelectedChannel, 
  messageInput, 
  setMessageInput, 
  showDropdown, 
  setShowDropdown, 
  onBackToTeams, 
  onSendMessage, 
  onKeyPress, 
  onManageTeams, 
  onAddMember, 
  onGetLink, 
  onCreateChannel 
}) => {
  const messages = [
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: '10:30 AM',
      content: 'Good morning team! Just finished the wireframes for the new dashboard. Would love to get your feedback.',
      reactions: [{ emoji: '👍', count: 3 }, { emoji: '🔥', count: 1 }]
    },
    {
      id: 2,
      user: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: '10:45 AM',
      content: 'Looks great @Sarah! The user flow is much cleaner now. One question about the navigation structure...',
      replies: 2
    },
    {
      id: 3,
      user: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: '11:15 AM',
      content: 'I\'ve uploaded the latest brand guidelines to the shared folder. Please make sure to follow the new color scheme for upcoming projects.',
      hasFile: true,
      fileName: 'brand-guidelines-2024.pdf'
    }
  ];

  const currentChannel = currentTeam?.channels.find(channel => channel.id === selectedChannel);

  return (
    <div className="flex h-full">
      {/* Channels Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Team Header */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onBackToTeams}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-3 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Teams
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{currentTeam?.name}</h3>
              <p className="text-sm text-gray-500">{currentTeam?.memberCount} members</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onManageTeams();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                  >
                    <MoreVertical className="h-4 w-4 mr-2" />
                    Manage Teams
                  </button>
                  <button
                    onClick={() => {
                      onAddMember();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Add Member
                  </button>
                  <button
                    onClick={() => {
                      onGetLink();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                  >
                    <Hash className="h-4 w-4 mr-2" />
                    Get Link to Team
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="mb-4">
            <div className="flex items-center justify-between px-3 py-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Channels</h4>
              <button 
                onClick={onCreateChannel}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            
            {currentTeam?.channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-200 ${
                  selectedChannel === channel.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  {channel.type === 'private' ? (
                    <Lock className="h-4 w-4 mr-2" />
                  ) : (
                    <Hash className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-sm font-medium">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Hash className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">{selectedChannel}</h2>
              <span className="ml-2 text-sm text-gray-500">
                {currentChannel?.type === 'private' ? 'Private' : 'Public'} channel
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Users className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex space-x-3 group">
              <img
                src={message.avatar}
                alt={message.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">{message.user}</span>
                  <span className="text-sm text-gray-500">{message.timestamp}</span>
                </div>
                <div className="text-gray-700 mb-2">{message.content}</div>
                
                {message.reactions && (
                  <div className="flex space-x-2 mb-2">
                    {message.reactions.map((reaction, index) => (
                      <button
                        key={index}
                        className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                      >
                        <span>{reaction.emoji}</span>
                        <span className="text-gray-600">{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}

                {message.replies && (
                  <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    {message.replies} replies
                  </button>
                )}

                {message.hasFile && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <div className="flex items-center">
                      <div className="h-5 w-5 text-gray-500 mr-2">📄</div>
                      <span className="text-sm text-gray-700">{message.fileName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-end space-x-3">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Paperclip className="h-5 w-5" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={onKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                placeholder={`Message #${selectedChannel}`}
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Smile className="h-5 w-5" />
            </button>
            
            <button
              onClick={onSendMessage}
              disabled={!messageInput.trim()}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </div>
  );
};

export default TeamChat;