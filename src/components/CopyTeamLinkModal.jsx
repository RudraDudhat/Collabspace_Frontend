import React, { useState, useRef } from 'react';
import { XMarkIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

const CopyTeamLinkModal = ({ isOpen, onClose, link, loading, error }) => {
  const [copied, setCopied] = useState(false);
  const linkInputRef = useRef(null);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (link) {
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        if (linkInputRef.current) {
          linkInputRef.current.select();
        }
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl shadow-2xl w-full max-w-lg mx-4 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333333]">
          <h2 className="text-xl font-semibold text-white">Share Team Link</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#242424] rounded-lg transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-600 border-t-teal-500 mr-4"></div>
              <span className="text-gray-400">Generating invitation link...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XMarkIcon className="w-6 h-6 text-red-400" />
              </div>
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Team Invitation Link
                </label>
                <div className="relative">
                  <input
                    ref={linkInputRef}
                    type="text"
                    className="input-primary w-full pr-12"
                    value={link || ''}
                    readOnly
                  />
                  <button
                    onClick={handleCopy}
                    disabled={!link}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-[#333333] rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied ? (
                      <CheckIcon className="w-4 h-4 text-green-400" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="mt-2 text-sm text-green-400 flex items-center">
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Link copied to clipboard!
                  </p>
                )}
              </div>

              <div className="bg-[#242424] rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">How to use this link:</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Share this link with team members you want to invite</li>
                  <li>• The link will expire after 24 hours for security</li>
                  <li>• New members will need to create an account if they don't have one</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!link}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CopyTeamLinkModal;