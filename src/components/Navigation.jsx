import React from 'react';
import { Users, MessageSquare, Bell, Calendar, FileText, ChevronLeft, ChevronRight, User, Settings } from 'lucide-react';

const Navigation = ({ activeView, onViewChange, isCollapsed, onToggleCollapse, user, onViewProfile }) => {
  const navigationItems = [
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'activity', label: 'Activity', icon: Bell },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'files', label: 'Files', icon: FileText }
  ];

  return (
    <div className={`bg-indigo-900 text-white flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header with Collapse Button */}
      <div className="p-4 border-b border-indigo-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <Users className="h-8 w-8 text-indigo-200" />
              <span className="ml-2 text-xl font-bold">CollabSpace</span>
            </div>
          )}
          <button
            onClick={() => onToggleCollapse(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-indigo-800 transition-colors duration-200 ml-auto"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-6 w-6" />
            ) : (
              <ChevronLeft className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-indigo-800">
        <button
          onClick={onViewProfile}
          className="w-full flex items-center hover:bg-indigo-800 rounded-lg p-2 transition-colors duration-200"
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-900"></div>
          </div>
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="font-semibold text-white truncate">{user.username}</p>
              <p className="text-sm text-indigo-200 truncate">{user.email}</p>
            </div>
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-indigo-700 text-white shadow-lg'
                      : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : ''}`} />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </>
                  )}
                </button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-indigo-800">
        <button 
          className={`w-full flex items-center p-3 rounded-lg text-indigo-200 hover:bg-indigo-800 hover:text-white transition-all duration-200 group ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Settings' : ''}
        >
          <Settings className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3 font-medium">Settings</span>}
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
              Settings
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navigation;