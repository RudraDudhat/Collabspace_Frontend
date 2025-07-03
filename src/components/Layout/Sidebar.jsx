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
  UserGroupIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { Avatar, Badge, Button, Tooltip } from '../ui';

const Sidebar = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teams } = useSelector((state) => state.team);
  const [expandedTeams, setExpandedTeams] = useState({});

  const navigationItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard', badge: null },
    { name: 'Chat', icon: ChatBubbleLeftRightIcon, path: '/chat', badge: 3 },
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
        bg-[var(--secondary-bg)] border-r border-[var(--border-color)] transition-all duration-300 ease-in-out
        flex flex-col h-screen
      `}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[var(--border-color)]">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Workspace</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden"
                icon={Bars3Icon}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                icon={Bars3Icon}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <Tooltip
              key={item.name}
              content={collapsed ? item.name : ''}
              position="right"
              disabled={!collapsed}
            >
              <button
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive(item.path) 
                    ? 'bg-[var(--brand-primary)]/10 text-[var(--text-primary)] border border-[var(--brand-primary)]/20' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--tertiary-bg)]'
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">{item.name}</span>
                    {item.badge && (
                      <Badge variant="primary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            </Tooltip>
          ))}
        </nav>

        {/* Teams Section */}
        <div className="border-t border-[var(--border-color)] p-4">
          {!collapsed && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Teams</h3>
              <Tooltip content="Create Team">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={PlusIcon}
                  className="p-1"
                />
              </Tooltip>
            </div>
          )}

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {teams?.map((team) => (
              <div key={team._id} className="space-y-1">
                <Tooltip
                  content={collapsed ? team.name : ''}
                  position="right"
                  disabled={!collapsed}
                >
                  <button
                    onClick={() => {
                      if (collapsed) {
                        navigate(`/teams/${team._id}`);
                      } else {
                        toggleTeamExpansion(team._id);
                      }
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${location.pathname.includes(`/teams/${team._id}`)
                        ? 'bg-[var(--brand-primary)]/10 text-[var(--text-primary)] border border-[var(--brand-primary)]/20'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--tertiary-bg)]'
                      }
                    `}
                  >
                    <Avatar
                      size="sm"
                      fallback={team.name[0]?.toUpperCase()}
                      className="flex-shrink-0"
                    />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate font-medium">{team.name}</span>
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
                </Tooltip>

                {/* Team Channels */}
                {!collapsed && expandedTeams[team._id] && team.channels?.length > 0 && (
                  <div className="ml-6 space-y-1">
                    {team.channels.map((channel) => (
                      <button
                        key={channel._id}
                        onClick={() => navigate(`/teams/${team._id}/channels/${channel._id}`)}
                        className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--tertiary-bg)] transition-colors duration-200"
                      >
                        <HashtagIcon className="w-4 h-4" />
                        <span className="truncate">{channel.name}</span>
                        {channel.unreadCount > 0 && (
                          <Badge variant="error" className="text-xs">
                            {channel.unreadCount}
                          </Badge>
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
                <UserGroupIcon className="w-12 h-12 text-[var(--text-subtle)] mx-auto mb-3" />
                <p className="text-sm text-[var(--text-muted)] mb-3">No teams yet</p>
                <Button size="sm">
                  Create Team
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle (Desktop) */}
        <div className="hidden lg:block border-t border-[var(--border-color)] p-4">
          <Tooltip
            content={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            position="right"
          >
            <Button
              variant="ghost"
              onClick={onToggle}
              className="w-full flex items-center justify-center"
            >
              <svg 
                className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Tooltip>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;