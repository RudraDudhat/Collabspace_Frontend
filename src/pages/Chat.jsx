import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PaperClipIcon,
  MagnifyingGlassIcon,
  HashtagIcon,
  UserIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  VideoCameraIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const Chat = () => {
  const { user } = useSelector((state) => state.auth);
  const { teams } = useSelector((state) => state.team);
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Mock chat data
  const chats = [
    {
      id: 1,
      type: 'channel',
      name: 'general',
      team: 'Design Team',
      lastMessage: 'Hey everyone! How\'s the new design coming along?',
      lastMessageTime: '2m ago',
      unreadCount: 3,
      isOnline: true,
      members: 12
    },
    {
      id: 2,
      type: 'channel',
      name: 'development',
      team: 'Dev Team',
      lastMessage: 'The API integration is complete',
      lastMessageTime: '15m ago',
      unreadCount: 0,
      isOnline: true,
      members: 8
    },
    {
      id: 3,
      type: 'direct',
      name: 'Alice Cooper',
      lastMessage: 'Can you review the latest mockups?',
      lastMessageTime: '1h ago',
      unreadCount: 1,
      isOnline: true,
      avatar: 'AC'
    },
    {
      id: 4,
      type: 'direct',
      name: 'Bob Smith',
      lastMessage: 'Thanks for the code review!',
      lastMessageTime: '3h ago',
      unreadCount: 0,
      isOnline: false,
      avatar: 'BS'
    },
    {
      id: 5,
      type: 'channel',
      name: 'design-review',
      team: 'Design Team',
      lastMessage: 'New components are ready for testing',
      lastMessageTime: '5h ago',
      unreadCount: 0,
      isOnline: true,
      members: 5
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Alice Cooper',
      avatar: 'AC',
      content: 'Hey everyone! How\'s the new design coming along?',
      timestamp: '10:30 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: 2,
      sender: 'You',
      avatar: user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
      content: 'Looking great! I just finished the user dashboard mockups.',
      timestamp: '10:32 AM',
      isOwn: true,
      type: 'text'
    },
    {
      id: 3,
      sender: 'Bob Smith',
      avatar: 'BS',
      content: 'Awesome work! The color scheme really pops. 🎨',
      timestamp: '10:35 AM',
      isOwn: false,
      type: 'text'
    },
    {
      id: 4,
      sender: 'Alice Cooper',
      avatar: 'AC',
      content: 'I\'ve uploaded the latest design files to the shared folder.',
      timestamp: '10:40 AM',
      isOwn: false,
      type: 'file',
      fileName: 'dashboard-mockups-v2.fig',
      fileSize: '2.4 MB'
    },
    {
      id: 5,
      sender: 'You',
      avatar: user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
      content: 'Perfect! I\'ll review them this afternoon and provide feedback.',
      timestamp: '10:42 AM',
      isOwn: true,
      type: 'text'
    }
  ];

  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0]);
    }
  }, [chats, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp) => {
    return timestamp;
  };

  return (
    <Layout>
      <div className="h-full flex bg-[var(--primary-bg)]">
        {/* Chat List Panel */}
        <div className="w-80 bg-[var(--secondary-bg)] border-r border-[var(--border-color)] flex flex-col">
          {/* Chat List Header */}
          <div className="p-4 border-b border-[var(--border-color)]">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Messages</h2>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-search pl-9 text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-[var(--border-color)] cursor-pointer transition-colors duration-200 hover:bg-[var(--tertiary-bg)] ${
                  selectedChat?.id === chat.id ? 'bg-[var(--tertiary-bg)] border-l-2 border-teal-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {chat.type === 'channel' ? (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <HashtagIcon className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="avatar-md bg-gradient-to-r from-purple-500 to-purple-600">
                        {chat.avatar}
                      </div>
                    )}
                    {chat.type === 'direct' && (
                      <div className={`absolute -bottom-1 -right-1 ${chat.isOnline ? 'status-online' : 'status-offline'}`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                        {chat.type === 'channel' ? `#${chat.name}` : chat.name}
                      </h3>
                      <span className="text-xs text-[var(--text-muted)]">{chat.lastMessageTime}</span>
                    </div>
                    
                    {chat.team && (
                      <p className="text-xs text-[var(--text-subtle)] mb-1">{chat.team}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[var(--text-muted)] truncate">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    
                    {chat.type === 'channel' && chat.members && (
                      <p className="text-xs text-[var(--text-subtle)] mt-1">{chat.members} members</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[var(--border-color)] bg-[var(--secondary-bg)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {selectedChat.type === 'channel' ? (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <HashtagIcon className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="avatar-md bg-gradient-to-r from-purple-500 to-purple-600">
                          {selectedChat.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 ${selectedChat.isOnline ? 'status-online' : 'status-offline'}`}></div>
                      </div>
                    )}
                    
                    <div>
                      <h2 className="text-lg font-bold text-[var(--text-primary)]">
                        {selectedChat.type === 'channel' ? `#${selectedChat.name}` : selectedChat.name}
                      </h2>
                      {selectedChat.team && (
                        <p className="text-sm text-[var(--text-muted)]">{selectedChat.team}</p>
                      )}
                      {selectedChat.type === 'channel' && selectedChat.members && (
                        <p className="text-sm text-[var(--text-muted)]">{selectedChat.members} members</p>
                      )}
                      {selectedChat.type === 'direct' && (
                        <p className="text-sm text-[var(--text-muted)]">
                          {selectedChat.isOnline ? 'Online' : 'Offline'}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedChat.type === 'direct' && (
                      <>
                        <button className="btn-icon">
                          <PhoneIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        </button>
                        <button className="btn-icon">
                          <VideoCameraIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        </button>
                      </>
                    )}
                    <button className="btn-icon">
                      <InformationCircleIcon className="w-5 h-5 text-[var(--text-muted)]" />
                    </button>
                    <button className="btn-icon">
                      <EllipsisVerticalIcon className="w-5 h-5 text-[var(--text-muted)]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div className="avatar-sm bg-gradient-to-r from-teal-500 to-teal-600">
                      {msg.avatar}
                    </div>
                    
                    <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">{msg.sender}</span>
                        <span className="text-xs text-[var(--text-muted)]">{msg.timestamp}</span>
                      </div>
                      
                      {msg.type === 'text' ? (
                        <div className={`${msg.isOwn ? 'message-sent' : 'message-received'}`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      ) : msg.type === 'file' ? (
                        <div className={`${msg.isOwn ? 'message-sent' : 'message-received'} flex items-center space-x-3`}>
                          <PaperClipIcon className="w-5 h-5" />
                          <div>
                            <p className="text-sm font-medium">{msg.fileName}</p>
                            <p className="text-xs opacity-75">{msg.fileSize}</p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[var(--border-color)] bg-[var(--secondary-bg)]">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                  <button type="button" className="btn-icon">
                    <PaperClipIcon className="w-5 h-5 text-[var(--text-muted)]" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Message ${selectedChat.type === 'channel' ? `#${selectedChat.name}` : selectedChat.name}`}
                      className="input-primary w-full pr-12"
                    />
                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-icon">
                      <FaceSmileIcon className="w-5 h-5 text-[var(--text-muted)]" />
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ChatBubbleLeftRightIcon className="w-20 h-20 text-[var(--text-subtle)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Select a conversation</h3>
                <p className="text-[var(--text-muted)]">Choose a chat from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chat;