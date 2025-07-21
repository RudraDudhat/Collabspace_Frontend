import React, { useState } from 'react';
import { Bell, MessageSquare, Users, FileText, Calendar, Filter, MoreVertical } from 'lucide-react';

const ActivityView = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'mention',
      icon: MessageSquare,
      title: 'Sarah Chen mentioned you',
      description: 'in #design-reviews channel',
      content: '@you what do you think about the new navigation structure?',
      timestamp: '2 minutes ago',
      unread: true,
      team: 'Design Team'
    },
    {
      id: 2,
      type: 'message',
      icon: MessageSquare,
      title: 'New message in Design Team',
      description: 'Mike Johnson in #general',
      content: 'The client approval came through! We can proceed with the next phase.',
      timestamp: '15 minutes ago',
      unread: true,
      team: 'Design Team'
    },
    {
      id: 3,
      type: 'file',
      icon: FileText,
      title: 'File shared',
      description: 'Emily Rodriguez shared a file',
      content: 'project-requirements-v3.pdf in #development-team',
      timestamp: '1 hour ago',
      unread: false,
      team: 'Development Team'
    },
    {
      id: 4,
      type: 'meeting',
      icon: Calendar,
      title: 'Meeting reminder',
      description: 'Design Review Meeting',
      content: 'Starting in 30 minutes - Weekly design review with stakeholders',
      timestamp: '2 hours ago',
      unread: false,
      team: 'Design Team'
    },
    {
      id: 5,
      type: 'team',
      icon: Users,
      title: 'New team member',
      description: 'Alex Thompson joined',
      content: 'Marketing Team - Welcome Alex to the team!',
      timestamp: '3 hours ago',
      unread: false,
      team: 'Marketing Team'
    },
    {
      id: 6,
      type: 'mention',
      icon: MessageSquare,
      title: 'You were mentioned',
      description: 'in Direct Message',
      content: 'Thanks for the quick feedback on the wireframes! @you',
      timestamp: '5 hours ago',
      unread: false,
      team: null
    },
    {
      id: 7,
      type: 'file',
      icon: FileText,
      title: 'File updated',
      description: 'Brand Guidelines v2.1',
      content: 'Updated color palette and typography guidelines',
      timestamp: '1 day ago',
      unread: false,
      team: 'Design Team'
    },
    {
      id: 8,
      type: 'message',
      icon: MessageSquare,
      title: 'New message in Development Team',
      description: 'Lisa Park in #deployments',
      content: 'Production deployment completed successfully. All systems are green.',
      timestamp: '1 day ago',
      unread: false,
      team: 'Development Team'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Activity', count: activities.length },
    { id: 'unread', label: 'Unread', count: activities.filter(a => a.unread).length },
    { id: 'mentions', label: 'Mentions', count: activities.filter(a => a.type === 'mention').length },
    { id: 'messages', label: 'Messages', count: activities.filter(a => a.type === 'message').length },
    { id: 'files', label: 'Files', count: activities.filter(a => a.type === 'file').length }
  ];

  const filteredActivities = activities.filter(activity => {
    switch (selectedFilter) {
      case 'unread':
        return activity.unread;
      case 'mentions':
        return activity.type === 'mention';
      case 'messages':
        return activity.type === 'message';
      case 'files':
        return activity.type === 'file';
      default:
        return true;
    }
  });

  const getActivityColor = (type) => {
    switch (type) {
      case 'mention':
        return 'text-red-600 bg-red-100';
      case 'message':
        return 'text-blue-600 bg-blue-100';
      case 'file':
        return 'text-green-600 bg-green-100';
      case 'meeting':
        return 'text-purple-600 bg-purple-100';
      case 'team':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all activities as read
    console.log('Marking all as read');
  };

  return (
    <div className="flex h-full">
      {/* Filters Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Filters</h3>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
            <Filter className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                selectedFilter === filter.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === filter.id
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={markAllAsRead}
            className="w-full px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
              <p className="text-sm text-gray-600 mt-1">
                Stay updated with your team's latest activities
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto">
          {filteredActivities.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No activities to show</p>
                <p className="text-sm">Check back later for updates</p>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {filteredActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border transition-colors duration-200 hover:bg-gray-50 ${
                      activity.unread
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {activity.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {activity.unread && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        
                        {activity.content && (
                          <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                            <p className="text-sm text-gray-800">{activity.content}</p>
                          </div>
                        )}
                        
                        {activity.team && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {activity.team}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityView;