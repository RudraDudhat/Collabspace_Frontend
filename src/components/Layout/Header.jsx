import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  SunIcon, 
  MoonIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  DocumentIcon,
  ChevronDownIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const teamDropdownRef = useRef(null);
  
  const { user } = useSelector((state) => state.auth);
  const { teams } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Mock notifications data
  const notifications = [
    { id: 1, type: 'message', title: 'New message in #design', time: '2m ago', unread: true },
    { id: 2, type: 'task', title: 'Task assigned: Finish Login Page', time: '1h ago', unread: true },
    { id: 3, type: 'mention', title: 'You were mentioned in #general', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Chat', icon: ChatBubbleLeftRightIcon, path: '/chat' },
    { name: 'Tasks', icon: CheckCircleIcon, path: '/tasks' },
    { name: 'Files', icon: DocumentIcon, path: '/files' },
    { name: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchExpanded(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target)) {
        setTeamDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  const currentTeam = teams?.find(team => location.pathname.includes(team._id)) || teams?.[0];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--secondary-bg)]/95 backdrop-blur-md border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                CollabSpace
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Team Selector */}
            {teams && teams.length > 0 && (
              <div className="relative hidden md:block" ref={teamDropdownRef}>
                <button
                  onClick={() => setTeamDropdownOpen(!teamDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-[var(--tertiary-bg)] border border-[var(--border-color)] rounded-lg hover:border-[var(--border-hover)] transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-md flex items-center justify-center text-white text-xs font-semibold">
                    {currentTeam?.name?.[0]?.toUpperCase() || 'T'}
                  </div>
                  <span className="text-[var(--text-primary)] font-medium max-w-32 truncate">
                    {currentTeam?.name || 'Select Team'}
                  </span>
                  <ChevronDownIcon className="w-4 h-4 text-[var(--text-muted)]" />
                </button>

                {teamDropdownOpen && (
                  <div className="absolute top-12 left-0 dropdown-menu fade-in min-w-64">
                    <div className="px-4 py-2 border-b border-[var(--border-color)]">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">Switch Team</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {teams.map((team) => (
                        <button
                          key={team._id}
                          onClick={() => {
                            navigate(`/teams/${team._id}`);
                            setTeamDropdownOpen(false);
                          }}
                          className="dropdown-item w-full"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                            {team.name[0]?.toUpperCase()}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-[var(--text-primary)]">{team.name}</div>
                            <div className="text-xs text-[var(--text-muted)]">
                              {team.members?.length || 0} members
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-8 hidden md:block" ref={searchRef}>
            <div className={`relative transition-all duration-300 ${searchExpanded ? 'w-full' : 'w-12'}`}>
              <button
                onClick={() => setSearchExpanded(!searchExpanded)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Search teams, channels, messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`input-search transition-all duration-300 ${
                  searchExpanded ? 'pl-10 pr-4 opacity-100' : 'pl-10 pr-4 opacity-0 pointer-events-none'
                }`}
                onFocus={() => setSearchExpanded(true)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon lg:hidden"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5 text-[var(--text-muted)]" />
              ) : (
                <Bars3Icon className="w-5 h-5 text-[var(--text-muted)]" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn-icon hidden md:flex"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-[var(--text-muted)] hover:text-yellow-400 transition-colors duration-200" />
              ) : (
                <MoonIcon className="w-5 h-5 text-[var(--text-muted)] hover:text-blue-400 transition-colors duration-200" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="btn-icon relative"
              >
                <BellIcon className="w-5 h-5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 dropdown-menu w-80 fade-in">
                  <div className="px-4 py-3 border-b border-[var(--border-color)]">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-[var(--tertiary-bg)] transition-colors duration-200 cursor-pointer ${
                          notification.unread ? 'border-l-2 border-teal-500' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-teal-500' : 'bg-[var(--text-subtle)]'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-[var(--text-primary)]">{notification.title}</p>
                            <p className="text-xs text-[var(--text-muted)] mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-[var(--border-color)]">
                    <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 p-2 hover:bg-[var(--tertiary-bg)] rounded-lg transition-colors duration-200"
              >
                <div className="relative">
                  <div className="avatar-md bg-gradient-to-r from-teal-500 to-teal-600">
                    {getInitials(user?.name)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 status-online"></div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{user?.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">Online</p>
                </div>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-12 dropdown-menu fade-in">
                  <div className="px-4 py-3 border-b border-[var(--border-color)]">
                    <div className="flex items-center space-x-3">
                      <div className="avatar-lg bg-gradient-to-r from-teal-500 to-teal-600">
                        {getInitials(user?.name)}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{user?.name}</p>
                        <p className="text-sm text-[var(--text-muted)]">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button className="dropdown-item w-full">
                      <UserIcon className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button className="dropdown-item w-full">
                      <Cog6ToothIcon className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                  </div>
                  
                  <div className="border-t border-[var(--border-color)] pt-2">
                    <button
                      onClick={handleLogout}
                      className="dropdown-item w-full text-red-400 hover:text-red-300"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 bg-[var(--secondary-bg)] border-l border-[var(--border-color)] shadow-xl slide-in-right">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-icon"
                >
                  <XMarkIcon className="w-5 h-5 text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="input-search pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-6">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`nav-item w-full ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>

              {/* Mobile Teams */}
              {teams && teams.length > 0 && (
                <div className="border-t border-[var(--border-color)] pt-6">
                  <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Teams</h3>
                  <div className="space-y-2">
                    {teams.map((team) => (
                      <button
                        key={team._id}
                        onClick={() => {
                          navigate(`/teams/${team._id}`);
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full p-3 hover:bg-[var(--tertiary-bg)] rounded-lg transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                          {team.name[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-[var(--text-primary)]">{team.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">
                            {team.members?.length || 0} members
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;