import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Plus, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'

  const events = [
    {
      id: 1,
      title: 'Design Review Meeting',
      description: 'Weekly design review with stakeholders',
      date: '2025-01-21',
      time: '10:00 AM - 11:00 AM',
      attendees: ['Sarah Chen', 'Mike Johnson', 'Emily Rodriguez'],
      type: 'meeting',
      location: 'Conference Room A',
      isOnline: true
    },
    {
      id: 2,
      title: 'Sprint Planning',
      description: 'Planning session for next sprint',
      date: '2025-01-21',
      time: '2:00 PM - 3:30 PM',
      attendees: ['Development Team'],
      type: 'planning',
      location: 'Online',
      isOnline: true
    },
    {
      id: 3,
      title: 'Client Presentation',
      description: 'Present Q1 progress to client',
      date: '2025-01-22',
      time: '11:00 AM - 12:00 PM',
      attendees: ['Sarah Chen', 'Project Manager'],
      type: 'presentation',
      location: 'Client Office',
      isOnline: false
    },
    {
      id: 4,
      title: 'Team Standup',
      description: 'Daily standup meeting',
      date: '2025-01-23',
      time: '9:00 AM - 9:30 AM',
      attendees: ['Design Team'],
      type: 'standup',
      location: 'Online',
      isOnline: true
    },
    {
      id: 5,
      title: 'Code Review Session',
      description: 'Review recent pull requests',
      date: '2025-01-24',
      time: '3:00 PM - 4:00 PM',
      attendees: ['Mike Johnson', 'Lisa Park', 'Dev Team'],
      type: 'review',
      location: 'Online',
      isOnline: true
    }
  ];

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date().setHours(0, 0, 0, 0))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'planning':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'presentation':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'standup':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'review':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const formatDateShort = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });
      
      days.push({
        date: date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        events: dayEvents
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
  };

  const calendarDays = generateCalendarDays();
  const monthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);

  return (
    <div className="flex h-full">
      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Calendar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">{monthYear}</h1>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </button>
              
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                {['month', 'week', 'day'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 text-sm font-medium transition-colors duration-200 ${
                      viewMode === mode
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 p-6">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-px mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`bg-white p-2 min-h-[120px] ${
                  !day.isCurrentMonth ? 'text-gray-400' : ''
                } ${day.isToday ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  day.isToday ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {day.date.getDate()}
                </div>
                
                <div className="space-y-1">
                  {day.events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`px-2 py-1 rounded text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity duration-200 ${getEventColor(event.type)}`}
                    >
                      <div className="truncate">{event.title}</div>
                      <div className="text-xs opacity-75">{event.time.split(' - ')[0]}</div>
                    </div>
                  ))}
                  {day.events.length > 3 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{day.events.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Sidebar */}
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDateShort(event.date)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      {event.isOnline ? (
                        <Video className="h-4 w-4 mr-2" />
                      ) : (
                        <Users className="h-4 w-4 mr-2" />
                      )}
                      {event.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {Array.isArray(event.attendees) 
                        ? `${event.attendees.length} attendees`
                        : event.attendees
                      }
                    </div>
                  </div>
                </div>
                
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-3 flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Join
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Details
                </button>
              </div>
            </div>
          ))}
          
          {upcomingEvents.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;