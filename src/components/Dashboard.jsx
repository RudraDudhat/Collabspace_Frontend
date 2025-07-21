import React, { useState } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import ProfilePage from './profile/ProfilePage';
import TeamsView from './views/TeamsView';
import ChatView from './views/ChatView';
import ActivityView from './views/ActivityView';
import CalendarView from './views/CalendarView';
import FilesView from './views/FilesView';

const Dashboard = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('teams');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const handleUpdateProfile = (profileData) => {
    setCurrentUser(prev => ({
      ...prev,
      username: profileData.username,
      email: profileData.email,
      avatar: profileData.avatar
    }));
    console.log('Profile updated:', profileData);
  };

  const handleChangePassword = (passwordData) => {
    console.log('Password changed');
    // In a real app, this would call an API to change the password
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'teams':
        return <TeamsView />;
      case 'chat':
        return <ChatView />;
      case 'activity':
        return <ActivityView />;
      case 'calendar':
        return <CalendarView />;
      case 'files':
        return <FilesView />;
      default:
        return <TeamsView />;
    }
  };

  // If profile page is open, show it as full screen
  if (showProfilePage) {
    return (
      <ProfilePage
        user={currentUser}
        onClose={() => setShowProfilePage(false)}
        onUpdateProfile={handleUpdateProfile}
        onChangePassword={handleChangePassword}
      />
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Navigation Sidebar */}
      <Navigation
        activeView={activeView}
        onViewChange={setActiveView}
        isCollapsed={isNavCollapsed}
        onToggleCollapse={setIsNavCollapsed}
        user={currentUser}
        onViewProfile={() => setShowProfilePage(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Only show for non-teams views */}
        {activeView !== 'teams' && (
          <Header
            user={currentUser}
            onLogout={onLogout}
            activeView={activeView}
            onViewProfile={() => setShowProfilePage(true)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;