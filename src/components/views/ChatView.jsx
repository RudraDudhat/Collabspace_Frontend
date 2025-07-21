import React, { useState } from 'react';
import { Search, Plus, Phone, Video, MoreVertical, Smile, Paperclip, Send } from 'lucide-react';

const ChatView = () => {
  const [selectedChat, setSelectedChat] = useState('sarah-chen');
  const [messageInput, setMessageInput] = useState('');

  const chats = [
    {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'online',
      lastMessage: 'Thanks for the feedback on the designs!',
      timestamp: '2 min ago',
      unread: 0
    },
    {
      id: 'design-team',
      name: 'Design Team',
      avatar: null,
      status: 'group',
      lastMessage: 'Emily: The new mockups look great',
      timestamp: '15 min ago',
      unread: 3,
      isGroup: true,
      members: ['Sarah Chen', 'Mike Johnson', 'Emily Rodriguez', 'You']
    },
    {
      id: 'mike-johnson',
      name: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'away',
      lastMessage: 'Can we schedule a quick call?',
      timestamp: '1 hour ago',
      unread: 1
    },
    {
      id: 'emily-rodriguez',
      name: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'busy',
      lastMessage: 'I\'ll review the documents tonight',
      timestamp: '3 hours ago',
      unread: 0
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Hey! I just finished the new user interface mockups. Would love to get your thoughts on them.',
      timestamp: '2:30 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Amazing work! The color scheme is much more cohesive now. I especially like how you handled the navigation.',
      timestamp: '2:32 PM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Thanks! I was worried about the contrast ratios, but they all pass WCAG guidelines now.',
      timestamp: '2:33 PM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      content: 'Perfect! That\'s exactly what we needed. When do you think we can move forward with the implementation?',
      timestamp: '2:35 PM',
      isOwn: true
    },
    {
      id: 5,
      sender: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'I can have the final designs ready by tomorrow morning. Then we can hand them off to the dev team.',
      timestamp: '2:37 PM',
      isOwn: false
    }
  ];

  const currentChat = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'busy':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex h-full">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Search chats..."
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 border-l-4 ${
                selectedChat === chat.id
                  ? 'bg-blue-50 border-blue-500'
                  : 'border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {chat.isGroup ? (
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{chat.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  ) : (
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  {!chat.isGroup && (
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(chat.status)}`}></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.isGroup && (
                    <p className="text-xs text-gray-500 mt-1">{chat.members.length} members</p>
                  )}
                </div>

                {chat.unread > 0 && (
                  <div className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {currentChat?.isGroup ? (
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{currentChat.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                ) : (
                  <img
                    src={currentChat?.avatar}
                    alt={currentChat?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                {!currentChat?.isGroup && (
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(currentChat?.status)}`}></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{currentChat?.name}</h2>
                <p className="text-sm text-gray-500">
                  {currentChat?.isGroup ? `${currentChat.members.length} members` : currentChat?.status}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Video className="h-5 w-5" />
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
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-3 max-w-[70%] ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!message.isOwn && (
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div
                  className={`p-3 rounded-lg ${
                    message.isOwn
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Paperclip className="h-5 w-5" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder={`Message ${currentChat?.name}...`}
              />
            </div>
            
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Smile className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleSendMessage}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;