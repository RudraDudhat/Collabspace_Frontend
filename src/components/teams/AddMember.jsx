import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddMember = ({ onClose, onAddMember }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock member database - replace with API call later
  const allMembers = [
    { id: 1, name: 'John Test', email: 'john.test@example.com', role: 'STUDENT', avatar: 'JT' },
    { id: 2, name: 'Sarah Test Manager', email: 'sarah.test@example.com', role: 'TEACHER', avatar: 'ST' },
    { id: 3, name: 'Mike Tester', email: 'mike.tester@example.com', role: 'STUDENT', avatar: 'MT' },
    { id: 4, name: 'Emily Testing', email: 'emily.testing@example.com', role: 'STUDENT', avatar: 'ET' },
    { id: 5, name: 'David Test User', email: 'david.test.user@example.com', role: 'TEACHER', avatar: 'DT' },
    { id: 6, name: 'Lisa Test Admin', email: 'lisa.test.admin@example.com', role: 'ADMIN', avatar: 'LT' },
    { id: 7, name: 'Alex Testing Lead', email: 'alex.testing.lead@example.com', role: 'TEACHER', avatar: 'AT' },
    { id: 8, name: 'Rachel Test Student', email: 'rachel.test.student@example.com', role: 'STUDENT', avatar: 'RT' },
    { id: 9, name: 'Chris Tester Pro', email: 'chris.tester.pro@example.com', role: 'STUDENT', avatar: 'CT' },
    { id: 10, name: 'Anna Test Expert', email: 'anna.test.expert@example.com', role: 'TEACHER', avatar: 'AT' }
  ];

  // Filter members based on search term - only show results if there's a search query
  const filteredMembers = searchTerm.trim() 
    ? allMembers.filter(member =>
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const toggleMemberSelection = (member) => {
    setSelectedMembers(prev => {
      const isSelected = prev.find(m => m.id === member.id);
      if (isSelected) {
        return prev.filter(m => m.id !== member.id);
      } else {
        return [...prev, member];
      }
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'TEACHER':
        return 'bg-blue-100 text-blue-800';
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'STUDENT':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvatarColor = (role) => {
    switch (role) {
      case 'TEACHER':
        return 'bg-blue-500 text-white';
      case 'ADMIN':
        return 'bg-purple-500 text-white';
      case 'STUDENT':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMembers.length === 0) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onAddMember(selectedMembers);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Send a request to add people to the team</h2>
            <p className="text-sm text-gray-600 mt-1">
              Start typing a name or email. We recommend making teachers into owners and students into members.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Search by name or email..."
            />
            {selectedMembers.length > 0 && (
              <div className="absolute right-3 top-3 bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                {selectedMembers.length}
              </div>
            )}
          </div>
        </div>

        {/* Members List - Only show when searching */}
        <div className="flex-1 overflow-y-auto">
          {searchTerm.trim() ? (
            filteredMembers.length > 0 ? (
              <div className="p-6 space-y-1">
                {filteredMembers.map((member) => {
                  const isSelected = selectedMembers.find(m => m.id === member.id);
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => toggleMemberSelection(member)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold mr-4 ${getAvatarColor(member.role)}`}>
                        {member.avatar}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">({member.email})</p>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getRoleColor(member.role)}`}>
                              {member.role}
                            </span>
                            {isSelected && (
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-500">No members found matching your search</p>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-400">Start typing to search for members...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedMembers.length === 0 || isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? 'Sending...' : 'Send request'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;