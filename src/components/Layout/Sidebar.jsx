import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  DocumentIcon,
  BellIcon,
  Cog6ToothIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HashtagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teams } = useSelector((state) => state.team);
  const [expandedTeams, setExpandedTeams] = useState({});

  const navigationItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard', badge: null },
    { name: 'Channels', icon: ChatBubbleLeftRightIcon, path: '/channels', badge: 3 },
    { name: 'Tasks', icon: CheckCircleIcon, path: '/tasks', badge: 5 },
    { name: 'Files', icon: DocumentIcon, path: '/files', badge: null },
    { name: 'Notifications', icon: BellIcon, path: '/notifications', badge: 2 },
    { name: 'Settings', icon: Cog6ToothIcon, path: '/settings', badge: null },
  ];

  const toggleTeamExpansion = (teamId) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 
        ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        ${collapsed ? 'lg:w-16' : 'w-64 lg:w-64'}
        bg-[#1a1a1a] border-r border-[#333333] transition-all duration-300 ease-in-out
        flex flex-col h-screen
      `}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#333333]">
          {!collapsed && (
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Workspace</h2>
              <button
                onClick={onToggle}
                className="p-1 hover:bg-[#242424] rounded-md transition-colors duration-200 lg:hidden"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                ${isActive(item.path) 
                  ? 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-white border-r-2 border-teal-500' 
                  : 'text-gray-300 hover:text-white hover:bg-[#242424]'
                }
              `}
              title={collapsed ? item.name : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Teams Section */}
        <div className="border-t border-[#333333] p-4">
          {!collapsed && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Teams</h3>
              <button className="p-1 hover:bg-[#242424] rounded-md transition-colors duration-200">
                <PlusIcon className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
          )}

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {teams?.map((team) => (
              <div key={team._id} className="space-y-1">
                <button
                  onClick={() => {
                    if (collapsed) {
                      navigate(`/teams/${team._id}`);
                    } else {
                      toggleTeamExpansion(team._id);
                    }
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                    ${location.pathname.includes(`/teams/${team._id}`)
                      ? 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#242424]'
                    }
                  `}
                  title={collapsed ? team.name : ''}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-md flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {team.name[0]?.toUpperCase()}
                  </div>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{team.name}</span>
                      {team.channels?.length > 0 && (
                        <div className="flex-shrink-0">
                          {expandedTeams[team._id] ? (
                            <ChevronDownIcon className="w-4 h-4" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </button>

                {/* Team Channels */}
                {!collapsed && expandedTeams[team._id] && team.channels?.length > 0 && (
                  <div className="ml-6 space-y-1">
                    {team.channels.map((channel) => (
                      <button
                        key={channel._id}
                        onClick={() => navigate(`/teams/${team._id}/channels/${channel._id}`)}
                        className="w-full flex items-center space-x-2 px-3 py-1 rounded-md text-sm text-gray-400 hover:text-white hover:bg-[#242424] transition-colors duration-200"
                      >
                        <HashtagIcon className="w-4 h-4" />
                        <span className="truncate">{channel.name}</span>
                        {channel.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {channel.unreadCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Empty State */}
            {(!teams || teams.length === 0) && !collapsed && (
              <div className="text-center py-8">
                <UserGroupIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-3">No teams yet</p>
                <button className="btn-primary text-xs px-3 py-1">
                  Create Team
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle (Desktop) */}
        <div className="hidden lg:block border-t border-[#333333] p-4">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center p-2 hover:bg-[#242424] rounded-lg transition-colors duration-200"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;