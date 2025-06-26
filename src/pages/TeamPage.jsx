import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMemberToTeam, resetAddMemberStatus, generateJoinLink, fetchTeamById } from "../features/team/teamSlice";
import { logout } from "../features/auth/authSlice";
import CopyTeamLinkModal from "../components/CopyTeamLinkModal";
import AddMemberModal from "../components/AddMemberModal";
import CreateChannelModal from '../components/CreateChannelModal';
import Layout from '../components/Layout/Layout';
import {
  PlusIcon,
  HashtagIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  LinkIcon,
  EllipsisVerticalIcon,
  ChatBubbleLeftRightIcon,
  DocumentIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function TeamPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAddMember, setShowAddMember] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [copyLink, setCopyLink] = useState("");
  const [copyLinkLoading, setCopyLinkLoading] = useState(false);
  const [copyLinkError, setCopyLinkError] = useState("");
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { user, token } = useSelector((state) => state.auth);
  const { addMemberStatus, addMemberError, currentTeam, fetchTeamByIdStatus, fetchTeamByIdError } = useSelector((state) => state.team);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && teamId) {
      dispatch(fetchTeamById(teamId));
    } else if (!token) {
      navigate('/login');
    }
  }, [teamId, token, dispatch, navigate]);

  const fetchTeam = useCallback(() => {
    if (teamId) {
      dispatch(fetchTeamById(teamId));
    }
  }, [dispatch, teamId]);

  const handleCopyTeamLink = async () => {
    if (!teamId) return;

    setCopyLinkLoading(true);
    setCopyLinkError("");
    setShowCopyLinkModal(true);

    try {
      const result = await dispatch(generateJoinLink(teamId));
      if (generateJoinLink.fulfilled.match(result)) {
        setCopyLink(result.payload);
      } else {
        setCopyLinkError(result.payload || "Failed to generate link");
      }
    } catch (err) {
      setCopyLinkError("Failed to generate link");
    } finally {
      setCopyLinkLoading(false);
    }
  };

  useEffect(() => {
    if (addMemberStatus === 'failed' && showAddMember) {
      setError(addMemberError);
    }
  }, [addMemberStatus, addMemberError, showAddMember, dispatch]);

  if (fetchTeamByIdStatus === 'loading') {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
            <p className="text-gray-400">Loading team data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (fetchTeamByIdStatus === 'failed' || !currentTeam) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <div className="card max-w-md w-full mx-4 text-center">
            {error && <div className="text-red-400 mb-4">{error}</div>}
            <div className="text-red-400 mb-4">{fetchTeamByIdError || "Team data could not be loaded"}</div>
            <div className="flex justify-center space-x-4">
              <button
                className="btn-primary"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
              {fetchTeamByIdError?.includes("log in") && (
                <button
                  className="btn-secondary"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChatBubbleLeftRightIcon },
    { id: 'channels', name: 'Channels', icon: HashtagIcon },
    { id: 'files', name: 'Files', icon: DocumentIcon },
    { id: 'calendar', name: 'Calendar', icon: CalendarIcon },
  ];

  return (
    <Layout>
      <div className="h-full flex flex-col">
        {/* Team Header */}
        <div className="bg-[#1a1a1a] border-b border-[#333333] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                {currentTeam.name ? currentTeam.name[0].toUpperCase() : '?'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{currentTeam.name}</h1>
                <p className="text-gray-400 flex items-center space-x-4">
                  <span className="flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-1" />
                    {currentTeam.members?.length || 0} members
                  </span>
                  <span className="flex items-center">
                    <HashtagIcon className="w-4 h-4 mr-1" />
                    {currentTeam.channels?.length || 0} channels
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddMember(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Member</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="btn-secondary p-2"
                >
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 top-12 mt-2 w-48 bg-[#1e1e1e] border border-[#333333] rounded-xl shadow-xl z-20 py-1 fade-in">
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#242424] transition-colors duration-200 flex items-center space-x-2"
                      onClick={() => { handleCopyTeamLink(); setShowMenu(false); }}
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>Copy Team Link</span>
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#242424] transition-colors duration-200 flex items-center space-x-2"
                      onClick={() => { navigate(`/teams/${currentTeam._id}/manage`); setShowMenu(false); }}
                    >
                      <Cog6ToothIcon className="w-4 h-4" />
                      <span>Manage Team</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6 fade-in">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Members</p>
                      <p className="text-2xl font-bold text-white">{currentTeam.members?.length || 0}</p>
                    </div>
                    <UserGroupIcon className="w-8 h-8 text-teal-500" />
                  </div>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Channels</p>
                      <p className="text-2xl font-bold text-white">{currentTeam.channels?.length || 0}</p>
                    </div>
                    <HashtagIcon className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Messages Today</p>
                      <p className="text-2xl font-bold text-white">42</p>
                    </div>
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card">
                <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 hover:bg-[#242424] rounded-lg transition-colors duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      JD
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        <span className="font-medium">John Doe</span> created a new channel <span className="text-teal-400">#design-review</span>
                      </p>
                      <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 hover:bg-[#242424] rounded-lg transition-colors duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      JS
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        <span className="font-medium">Jane Smith</span> uploaded a file to <span className="text-teal-400">#general</span>
                      </p>
                      <p className="text-gray-400 text-xs mt-1">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 hover:bg-[#242424] rounded-lg transition-colors duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      MJ
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        <span className="font-medium">Mike Johnson</span> joined the team
                      </p>
                      <p className="text-gray-400 text-xs mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="space-y-6 fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Team Channels</h2>
                <button
                  onClick={() => setShowCreateChannel(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Create Channel</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTeam?.channels && currentTeam.channels.length > 0 ? (
                  currentTeam.channels.map(channel => (
                    <div 
                      key={channel._id} 
                      className="card-hover cursor-pointer"
                      onClick={() => navigate(`/teams/${teamId}/channels/${channel._id}`)}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <HashtagIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{channel.name}</h3>
                          <p className="text-gray-400 text-sm">{channel.visibility}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{channel.members?.length || 0} members</span>
                        <span>Last message 2h ago</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <HashtagIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-2">No channels yet</p>
                    <p className="text-gray-500 mb-4">Create your first channel to start collaborating</p>
                    <button
                      onClick={() => setShowCreateChannel(true)}
                      className="btn-primary"
                    >
                      Create Channel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-6 fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Shared Files</h2>
                <button className="btn-primary flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Upload File</span>
                </button>
              </div>

              <div className="text-center py-12">
                <DocumentIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No files shared yet</p>
                <p className="text-gray-500 mb-4">Upload files to share with your team</p>
                <button className="btn-primary">
                  Upload First File
                </button>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6 fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Team Calendar</h2>
                <button className="btn-primary flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Event</span>
                </button>
              </div>

              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No events scheduled</p>
                <p className="text-gray-500 mb-4">Add events to keep your team organized</p>
                <button className="btn-primary">
                  Create First Event
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        teamId={teamId}
        onMemberAdded={() => {
          dispatch(fetchTeamById(teamId));
          setError(null);
        }}
      />
      <CopyTeamLinkModal
        isOpen={showCopyLinkModal}
        onClose={() => { setShowCopyLinkModal(false); setCopyLink(''); setCopyLinkError(''); }}
        link={copyLink}
        loading={copyLinkLoading}
        error={copyLinkError}
      />
      <CreateChannelModal
        isOpen={showCreateChannel}
        onClose={() => setShowCreateChannel(false)}
        teamId={teamId}
        onChannelCreated={() => dispatch(fetchTeamById(teamId))}
      />
    </Layout>
  );
}