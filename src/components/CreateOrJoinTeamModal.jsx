import React, { useState } from 'react';
import { XMarkIcon, UserGroupIcon, LinkIcon } from '@heroicons/react/24/outline';

const CreateOrJoinTeamModal = ({ isOpen, onClose, onCreateTeam, onJoinTeam }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [teamName, setTeamName] = useState('');
  const [joinLink, setJoinLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      setIsSubmitting(true);
      await onCreateTeam(teamName.trim());
      setIsSubmitting(false);
      setTeamName('');
      onClose();
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (joinLink.trim()) {
      setIsSubmitting(true);
      try {
        const url = new URL(joinLink.trim());
        let teamId = '';
        let token = '';
        if (url.pathname.includes('/team/')) {
          const parts = url.pathname.split('/');
          teamId = parts[parts.length - 1] || parts[parts.length - 2];
          token = url.searchParams.get('token') || '';
        }
        if (!teamId) throw new Error('Invalid team link');
        await onJoinTeam({ teamId, token });
      } catch (err) {
        if (typeof window !== 'undefined' && window.setJoinTeamMessage) {
          window.setJoinTeamMessage('Invalid team link');
        }
      }
      setIsSubmitting(false);
      setJoinLink('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl shadow-2xl w-full max-w-md mx-4 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333333]">
          <h2 className="text-xl font-semibold text-white">Create or Join Team</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#242424] rounded-lg transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#333333]">
          <button
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'create' 
                ? 'text-teal-400 border-b-2 border-teal-500 bg-teal-500/5' 
                : 'text-gray-400 hover:text-white hover:bg-[#242424]'
            }`}
            onClick={() => setActiveTab('create')}
          >
            <div className="flex items-center justify-center space-x-2">
              <UserGroupIcon className="w-4 h-4" />
              <span>Create Team</span>
            </div>
          </button>
          <button
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'join' 
                ? 'text-teal-400 border-b-2 border-teal-500 bg-teal-500/5' 
                : 'text-gray-400 hover:text-white hover:bg-[#242424]'
            }`}
            onClick={() => setActiveTab('join')}
          >
            <div className="flex items-center justify-center space-x-2">
              <LinkIcon className="w-4 h-4" />
              <span>Join Team</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'create' ? (
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Team Name
                </label>
                <input
                  type="text"
                  className="input-primary w-full"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  required
                  disabled={isSubmitting}
                />
                <p className="mt-2 text-sm text-gray-400">
                  Choose a name that represents your team or project
                </p>
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Team...
                  </>
                ) : (
                  'Create Team'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoin} className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Team Invitation Link
                </label>
                <input
                  type="text"
                  className="input-primary w-full"
                  value={joinLink}
                  onChange={e => setJoinLink(e.target.value)}
                  placeholder="Paste your invitation link here"
                  required
                  disabled={isSubmitting}
                />
                <p className="mt-2 text-sm text-gray-400">
                  Paste the full team invitation link provided by your team administrator
                </p>
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining Team...
                  </>
                ) : (
                  'Join Team'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOrJoinTeamModal;