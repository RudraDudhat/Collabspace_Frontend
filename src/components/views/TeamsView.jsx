import React, { useState } from 'react';

// Import individual components
import CreateChannel from '../teams/CreateChannel';
import AddMember from '../teams/AddMember';
import GetLink from '../teams/GetLink';
import ManageTeams from '../teams/ManageTeams';
import CreateTeam from '../teams/CreateTeam';
import JoinTeam from '../teams/JoinTeam';
import TeamsOverview from '../teams/TeamsOverview';
import TeamChat from '../teams/TeamChat';

const TeamsView = () => {
  // State management
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [messageInput, setMessageInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Modal states
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [showManageTeams, setShowManageTeams] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showGetLink, setShowGetLink] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  
  // Teams data
  const [teams, setTeams] = useState([
    {
      id: 'design-team',
      name: 'Design Team',
      description: 'UI/UX Design and Branding',
      memberCount: 12,
      channels: [
        { id: 'general', name: 'General', type: 'public', unread: 0 },
        { id: 'announcements', name: 'Announcements', type: 'public', unread: 2 },
        { id: 'design-reviews', name: 'Design Reviews', type: 'private', unread: 5 },
        { id: 'resources', name: 'Resources', type: 'public', unread: 0 }
      ]
    },
    {
      id: 'development-team',
      name: 'Development Team',
      description: 'Frontend & Backend Development',
      memberCount: 8,
      channels: [
        { id: 'general', name: 'General', type: 'public', unread: 3 },
        { id: 'code-review', name: 'Code Review', type: 'public', unread: 1 },
        { id: 'deployments', name: 'Deployments', type: 'private', unread: 0 }
      ]
    },
    {
      id: 'marketing-team',
      name: 'Marketing Team',
      description: 'Growth and Marketing Initiatives',
      memberCount: 6,
      channels: [
        { id: 'general', name: 'General', type: 'public', unread: 0 },
        { id: 'campaigns', name: 'Campaigns', type: 'public', unread: 7 },
        { id: 'analytics', name: 'Analytics', type: 'private', unread: 2 }
      ]
    }
  ]);

  // Get current team
  const currentTeam = teams.find(team => team.id === selectedTeam);

  // Event handlers
  const handleTeamClick = (teamId) => {
    setSelectedTeam(teamId);
    setSelectedChannel('general');
  };

  const handleBackToTeams = () => {
    setSelectedTeam(null);
    setSelectedChannel('general');
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCreateTeam = (teamName) => {
    const newTeam = {
      id: teamName.toLowerCase().replace(/\s+/g, '-'),
      name: teamName,
      description: 'New team workspace',
      memberCount: 1,
      channels: [
        { id: 'general', name: 'General', type: 'public', unread: 0 }
      ]
    };
    setTeams([...teams, newTeam]);
    console.log('Created team:', teamName);
  };

  const handleJoinTeam = (teamLink) => {
    console.log('Joining team with link:', teamLink);
    // In a real app, this would parse the link and join the team
  };

  const handleAddMember = (members) => {
    console.log('Adding members:', members);
    // In a real app, this would send invitations
  };

  const handleCreateChannel = (channelData) => {
    console.log('Creating channel:', channelData);
    // In a real app, this would create the channel
  };

  // Modal handlers
  const modalHandlers = {
    onCreateTeam: () => setShowCreateTeam(true),
    onJoinTeam: () => setShowJoinTeam(true),
    onManageTeams: () => setShowManageTeams(true),
    onAddMember: () => setShowAddMember(true),
    onGetLink: () => setShowGetLink(true),
    onCreateChannel: () => setShowCreateChannel(true)
  };

  // If no team is selected, show teams overview
  if (!selectedTeam) {
    return (
      <>
        <TeamsOverview
          teams={teams}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          onTeamClick={handleTeamClick}
          {...modalHandlers}
        />

        {/* Modals */}
        {showCreateTeam && (
          <CreateTeam
            onClose={() => setShowCreateTeam(false)}
            onCreateTeam={handleCreateTeam}
          />
        )}

        {showJoinTeam && (
          <JoinTeam
            onClose={() => setShowJoinTeam(false)}
            onJoinTeam={handleJoinTeam}
          />
        )}

        {showManageTeams && (
          <ManageTeams
            onClose={() => setShowManageTeams(false)}
            team={teams[0]}
            onCreateChannel={handleCreateChannel}
          />
        )}

        {showAddMember && (
          <AddMember
            onClose={() => setShowAddMember(false)}
            onAddMember={handleAddMember}
          />
        )}

        {showGetLink && (
          <GetLink
            onClose={() => setShowGetLink(false)}
            teamId={teams[0]?.id}
          />
        )}
      </>
    );
  }

  // Show selected team chat view
  return (
    <>
      <TeamChat
        currentTeam={currentTeam}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        onBackToTeams={handleBackToTeams}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        {...modalHandlers}
      />

      {/* Modals */}
      {showManageTeams && (
        <ManageTeams
          onClose={() => setShowManageTeams(false)}
          team={currentTeam}
          onCreateChannel={handleCreateChannel}
        />
      )}

      {showAddMember && (
        <AddMember
          onClose={() => setShowAddMember(false)}
          onAddMember={handleAddMember}
        />
      )}

      {showGetLink && (
        <GetLink
          onClose={() => setShowGetLink(false)}
          teamId={currentTeam?.id}
        />
      )}

      {showCreateChannel && (
        <CreateChannel
          onClose={() => setShowCreateChannel(false)}
          onCreateChannel={handleCreateChannel}
        />
      )}
    </>
  );
};

export default TeamsView;