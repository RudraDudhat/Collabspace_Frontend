import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberToTeam, resetAddMemberStatus } from '../features/team/teamSlice';
import { XMarkIcon, UserPlusIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AddMemberModal = ({ isOpen, onClose, teamId, onMemberAdded }) => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { addMemberStatus, addMemberError } = useSelector((state) => state.team);

  // Handle error messages from Redux state
  useEffect(() => {
    if (addMemberError) {
      setErrorMessage(addMemberError);
    }
  }, [addMemberError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!email.trim()) {
      setErrorMessage('Please enter an email address.');
      return;
    }

    try {
      const result = await dispatch(addMemberToTeam({ teamId, email })).unwrap();
      setSuccessMessage(result.message || 'Member added successfully');
      setEmail('');
      
      // Wait for 2 seconds to show success message
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After showing success message, refresh team and close modal
      onMemberAdded();
      onClose();
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear messages when user starts typing
    if (successMessage || errorMessage) {
      setSuccessMessage('');
      setErrorMessage('');
    }
  };

  const handleClose = () => {
    onClose();
    setEmail('');
    setSuccessMessage('');
    setErrorMessage('');
    dispatch(resetAddMemberStatus());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl shadow-2xl w-full max-w-md mx-4 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333333]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <UserPlusIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Add Team Member</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[#242424] rounded-lg transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="memberEmail" className="block text-white text-sm font-medium mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="memberEmail"
                value={email}
                onChange={handleEmailChange}
                placeholder="member@example.com"
                required
                className="input-primary w-full"
                disabled={addMemberStatus === 'loading'}
              />
              <p className="mt-2 text-sm text-gray-400">
                Enter the email address of the person you want to invite to your team
              </p>
            </div>

            {/* Status Messages */}
            {addMemberStatus === 'loading' && (
              <div className="flex items-center space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
                <p className="text-blue-400 text-sm">Adding member...</p>
              </div>
            )}

            {errorMessage && (
              <div className="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div className="flex items-start space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-400 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleClose}
                disabled={addMemberStatus === 'loading'}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={addMemberStatus === 'loading'}
              >
                <UserPlusIcon className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;