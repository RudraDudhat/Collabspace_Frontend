import React from 'react';
import { Plus, ChevronDown, MoreVertical, Users, Hash, Settings2, UserPlus, Link } from 'lucide-react';

const TeamsOverview = ({ 
  teams, 
  showDropdown, 
  setShowDropdown, 
  onTeamClick, 
  onCreateTeam, 
  onJoinTeam, 
  onManageTeams, 
  onAddMember, 
  onGetLink 
}) => {
  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Teams</h1>
              <p className="text-gray-600">Choose a team to start collaborating</p>
            </div>
            
            {/* Join or Create Team Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Join or Create Team
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onCreateTeam();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Create Team
                  </button>
                  <button
                    onClick={() => {
                      onJoinTeam();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Join Team
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => onTeamClick(team.id)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 text-left group border border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {team.name.split(' ').map(word => word[0]).join('')}
                </div>
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(showDropdown === team.id ? null : team.id);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  
                  {showDropdown === team.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onManageTeams();
                          setShowDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                      >
                        <Settings2 className="h-4 w-4 mr-2" />
                        Manage Teams
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddMember();
                          setShowDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Member
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onGetLink();
                          setShowDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Get Link to Team
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{team.name}</h3>
              <p className="text-gray-600 mb-4">{team.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {team.memberCount} members
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Hash className="h-4 w-4 mr-1" />
                  {team.channels.length} channels
                </div>
              </div>

              {team.channels.some(channel => channel.unread > 0) && (
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  New activity
                </div>
              )}
            </button>
          ))}
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

export default TeamsOverview;