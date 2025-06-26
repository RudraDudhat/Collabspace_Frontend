import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { XMarkIcon, HashtagIcon, LockClosedIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const CreateChannelModal = ({ isOpen, onClose, teamId, onChannelCreated }) => {
  const [channelName, setChannelName] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      setChannelName('');
      setVisibility('public');
      setLoading(false);
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!channelName.trim()) {
      setError('Please enter a channel name.');
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post(`/channels/${teamId}`, {
        name: channelName.trim(),
        visibility,
      });
      setSuccess('Channel created successfully!');
      setChannelName('');
      setTimeout(() => {
        if (onChannelCreated) onChannelCreated();
        onClose();
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to create channel.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl shadow-2xl w-full max-w-md mx-4 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333333]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <HashtagIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Create Channel</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#242424] rounded-lg transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="channelName" className="block text-white text-sm font-medium mb-3">
                Channel Name
              </label>
              <div className="relative">
                <HashtagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="channelName"
                  type="text"
                  value={channelName}
                  onChange={e => setChannelName(e.target.value)}
                  placeholder="Enter channel name"
                  required
                  className="input-primary w-full pl-10"
                  disabled={loading}
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Choose a name that describes the purpose of this channel
              </p>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Channel Visibility
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border border-[#333333] rounded-lg hover:border-[#444444] transition-colors duration-200 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === 'public'}
                    onChange={() => setVisibility('public')}
                    disabled={loading}
                    className="text-teal-500 bg-[#242424] border-[#333333] focus:ring-teal-500 focus:ring-2"
                  />
                  <div className="flex items-center space-x-3">
                    <GlobeAltIcon className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Public</div>
                      <div className="text-sm text-gray-400">Anyone in the team can join</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-[#333333] rounded-lg hover:border-[#444444] transition-colors duration-200 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === 'private'}
                    onChange={() => setVisibility('private')}
                    disabled={loading}
                    className="text-teal-500 bg-[#242424] border-[#333333] focus:ring-teal-500 focus:ring-2"
                  />
                  <div className="flex items-center space-x-3">
                    <LockClosedIcon className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-white font-medium">Private</div>
                      <div className="text-sm text-gray-400">Only invited members can join</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <HashtagIcon className="w-4 h-4" />
                    <span>Create Channel</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChannelModal;