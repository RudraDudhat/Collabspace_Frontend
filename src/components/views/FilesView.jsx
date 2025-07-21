import React, { useState } from 'react';
import { File, Folder, Upload, Search, Download, MoreVertical, Grid, List, Star, Share2, Trash2, Eye } from 'lucide-react';

const FilesView = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('root');

  const folders = [
    {
      id: 'design-assets',
      name: 'Design Assets',
      type: 'folder',
      itemCount: 24,
      modified: '2 days ago',
      size: '45.2 MB'
    },
    {
      id: 'project-docs',
      name: 'Project Documents',
      type: 'folder',
      itemCount: 12,
      modified: '1 week ago',
      size: '12.8 MB'
    },
    {
      id: 'meeting-recordings',
      name: 'Meeting Recordings',
      type: 'folder',
      itemCount: 8,
      modified: '3 days ago',
      size: '256 MB'
    }
  ];

  const files = [
    {
      id: 1,
      name: 'Brand Guidelines 2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2 hours ago',
      modifiedBy: 'Sarah Chen',
      isStarred: true,
      thumbnail: null
    },
    {
      id: 2,
      name: 'Homepage Mockup.figma',
      type: 'figma',
      size: '8.1 MB',
      modified: '1 day ago',
      modifiedBy: 'Mike Johnson',
      isStarred: false,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 3,
      name: 'User Research Report.docx',
      type: 'docx',
      size: '1.2 MB',
      modified: '3 days ago',
      modifiedBy: 'Emily Rodriguez',
      isStarred: true,
      thumbnail: null
    },
    {
      id: 4,
      name: 'API Documentation.xlsx',
      type: 'xlsx',
      size: '892 KB',
      modified: '1 week ago',
      modifiedBy: 'Lisa Park',
      isStarred: false,
      thumbnail: null
    },
    {
      id: 5,
      name: 'Team Photo 2024.jpg',
      type: 'jpg',
      size: '3.2 MB',
      modified: '2 weeks ago',
      modifiedBy: 'HR Team',
      isStarred: false,
      thumbnail: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 6,
      name: 'Product Demo.mp4',
      type: 'mp4',
      size: '45.6 MB',
      modified: '3 weeks ago',
      modifiedBy: 'Marketing Team',
      isStarred: false,
      thumbnail: 'https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const getFileIcon = (type) => {
    const iconClass = "h-5 w-5";
    
    switch (type) {
      case 'pdf':
        return <File className={`${iconClass} text-red-500`} />;
      case 'docx':
        return <File className={`${iconClass} text-blue-500`} />;
      case 'xlsx':
        return <File className={`${iconClass} text-green-500`} />;
      case 'figma':
        return <File className={`${iconClass} text-purple-500`} />;
      case 'jpg':
      case 'png':
        return <File className={`${iconClass} text-yellow-500`} />;
      case 'mp4':
        return <File className={`${iconClass} text-orange-500`} />;
      default:
        return <File className={`${iconClass} text-gray-500`} />;
    }
  };

  const getFileIconLarge = (type) => {
    const iconClass = "h-12 w-12";
    
    switch (type) {
      case 'pdf':
        return <File className={`${iconClass} text-red-500`} />;
      case 'docx':
        return <File className={`${iconClass} text-blue-500`} />;
      case 'xlsx':
        return <File className={`${iconClass} text-green-500`} />;
      case 'figma':
        return <File className={`${iconClass} text-purple-500`} />;
      case 'jpg':
      case 'png':
        return <File className={`${iconClass} text-yellow-500`} />;
      case 'mp4':
        return <File className={`${iconClass} text-orange-500`} />;
      default:
        return <File className={`${iconClass} text-gray-500`} />;
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const toggleStar = (fileId) => {
    // In a real app, this would update the file's starred status
    console.log('Toggle star for file:', fileId);
  };

  return (
    <div className="flex h-full">
      {/* Main Files Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Files Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Files</h1>
              
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Search files..."
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <button className="hover:text-gray-700 transition-colors duration-200">
              My Files
            </button>
            {currentFolder !== 'root' && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{currentFolder}</span>
              </>
            )}
          </div>
        </div>

        {/* Files Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Folders Section */}
          {folders.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Folders</h3>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-6 gap-4">
                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setCurrentFolder(folder.id)}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-left"
                    >
                      <Folder className="h-12 w-12 text-blue-500 mb-3" />
                      <h4 className="font-medium text-gray-900 truncate">{folder.name}</h4>
                      <p className="text-sm text-gray-500">{folder.itemCount} items</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setCurrentFolder(folder.id)}
                      className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Folder className="h-8 w-8 text-blue-500 mr-3" />
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-900">{folder.name}</h4>
                        <p className="text-sm text-gray-500">{folder.itemCount} items • {folder.size}</p>
                      </div>
                      <span className="text-sm text-gray-500">{folder.modified}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Files Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Files</h3>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-6 gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={`p-4 bg-white border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer ${
                      selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div className="relative">
                      {file.thumbnail ? (
                        <img
                          src={file.thumbnail}
                          alt={file.name}
                          className="w-full h-24 object-cover rounded-lg mb-3"
                        />
                      ) : (
                        <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                          {getFileIconLarge(file.type)}
                        </div>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(file.id);
                        }}
                        className={`absolute top-2 right-2 p-1 rounded-full transition-colors duration-200 ${
                          file.isStarred
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Star className="h-4 w-4" fill={file.isStarred ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 truncate mb-1">{file.name}</h4>
                    <p className="text-sm text-gray-500">{file.size}</p>
                    <p className="text-xs text-gray-400">{file.modified}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                      selectedFiles.includes(file.id) ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => toggleFileSelection(file.id)}
                      className="mr-3"
                    />
                    
                    {file.thumbnail ? (
                      <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded mr-3 flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{file.name}</h4>
                      <p className="text-sm text-gray-500">Modified by {file.modifiedBy}</p>
                    </div>
                    
                    <div className="text-right mr-4">
                      <p className="text-sm text-gray-900">{file.size}</p>
                      <p className="text-sm text-gray-500">{file.modified}</p>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(file.id);
                      }}
                      className={`p-1 rounded transition-colors duration-200 mr-2 ${
                        file.isStarred
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Star className="h-4 w-4" fill={file.isStarred ? 'currentColor' : 'none'} />
                    </button>
                    
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors duration-200">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Actions Sidebar */}
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Upload className="h-5 w-5 text-gray-500 mr-3" />
            Upload Files
          </button>
          
          <button className="w-full flex items-center px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Folder className="h-5 w-5 text-gray-500 mr-3" />
            New Folder
          </button>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
            </h4>
            
            <div className="space-y-2">
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors duration-200">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors duration-200">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors duration-200">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Brand Guidelines uploaded</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Share2 className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Mockup shared with team</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <File className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Research report updated</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesView;