import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
  PlusIcon,
  EllipsisVerticalIcon,
  CalendarIcon,
  UserIcon,
  FlagIcon,
  ChatBubbleLeftIcon,
  PaperClipIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);

  // Mock task data
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'from-gray-500 to-gray-600',
      tasks: [
        {
          id: 1,
          title: 'Design new landing page',
          description: 'Create a modern, responsive landing page for the new product launch',
          priority: 'high',
          dueDate: '2024-01-15',
          assignee: { name: 'John Doe', avatar: 'JD' },
          team: 'Design Team',
          labels: ['Design', 'Frontend'],
          comments: 3,
          attachments: 2
        },
        {
          id: 2,
          title: 'Update user documentation',
          description: 'Revise and update the user guide with new features',
          priority: 'medium',
          dueDate: '2024-01-18',
          assignee: { name: 'Sarah Wilson', avatar: 'SW' },
          team: 'Product',
          labels: ['Documentation'],
          comments: 1,
          attachments: 0
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'from-blue-500 to-blue-600',
      tasks: [
        {
          id: 3,
          title: 'Fix authentication bug',
          description: 'Resolve the login issue affecting mobile users',
          priority: 'high',
          dueDate: '2024-01-14',
          assignee: { name: 'Jane Smith', avatar: 'JS' },
          team: 'Dev Team',
          labels: ['Bug', 'Backend'],
          comments: 5,
          attachments: 1
        },
        {
          id: 4,
          title: 'Implement dark mode',
          description: 'Add dark mode support across the application',
          priority: 'medium',
          dueDate: '2024-01-20',
          assignee: { name: 'Mike Johnson', avatar: 'MJ' },
          team: 'Dev Team',
          labels: ['Feature', 'Frontend'],
          comments: 2,
          attachments: 0
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      color: 'from-amber-500 to-amber-600',
      tasks: [
        {
          id: 5,
          title: 'Code review for API endpoints',
          description: 'Review the new REST API implementation',
          priority: 'medium',
          dueDate: '2024-01-16',
          assignee: { name: 'Alice Cooper', avatar: 'AC' },
          team: 'Dev Team',
          labels: ['Review', 'Backend'],
          comments: 4,
          attachments: 3
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: 'from-green-500 to-green-600',
      tasks: [
        {
          id: 6,
          title: 'Setup CI/CD pipeline',
          description: 'Configure automated testing and deployment',
          priority: 'high',
          dueDate: '2024-01-12',
          assignee: { name: 'Bob Smith', avatar: 'BS' },
          team: 'DevOps',
          labels: ['DevOps', 'Infrastructure'],
          comments: 2,
          attachments: 1
        },
        {
          id: 7,
          title: 'User research interviews',
          description: 'Conduct interviews with 10 target users',
          priority: 'medium',
          dueDate: '2024-01-10',
          assignee: { name: 'Carol Johnson', avatar: 'CJ' },
          team: 'Product',
          labels: ['Research', 'UX'],
          comments: 8,
          attachments: 5
        }
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getLabelColor = (label) => {
    const colors = {
      'Design': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Frontend': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Backend': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Bug': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Feature': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'Documentation': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'Review': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'DevOps': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Infrastructure': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'Research': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'UX': 'bg-violet-500/20 text-violet-400 border-violet-500/30'
    };
    return colors[label] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `${diffDays} days`;
  };

  return (
    <Layout>
      <div className="h-full flex flex-col bg-[var(--primary-bg)]">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-color)] bg-[var(--secondary-bg)]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Task Board</h1>
              <p className="text-[var(--text-muted)]">Manage and track your team's tasks</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                Filter
              </button>
              <button
                onClick={() => setShowCreateTask(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Create Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 p-6 overflow-x-auto">
          <div className="flex space-x-6 h-full min-w-max">
            {columns.map((column) => (
              <div key={column.id} className="w-80 flex flex-col">
                {/* Column Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${column.color}`}></div>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)]">{column.title}</h2>
                      <span className="badge-secondary">{column.tasks.length}</span>
                    </div>
                    <button className="btn-icon">
                      <EllipsisVerticalIcon className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                  </div>
                  {column.id === 'todo' && (
                    <button
                      onClick={() => setShowCreateTask(true)}
                      className="w-full p-3 border-2 border-dashed border-[var(--border-color)] rounded-lg text-[var(--text-muted)] hover:border-teal-500 hover:text-teal-400 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add task</span>
                    </button>
                  )}
                </div>

                {/* Tasks */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="task-card group"
                    >
                      {/* Task Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-2 group-hover:text-teal-400 transition-colors">
                          {task.title}
                        </h3>
                        <button className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity">
                          <EllipsisVerticalIcon className="w-4 h-4 text-[var(--text-muted)]" />
                        </button>
                      </div>

                      {/* Task Description */}
                      <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">{task.description}</p>

                      {/* Labels */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.labels.map((label) => (
                          <span key={label} className={`badge text-xs ${getLabelColor(label)}`}>
                            {label}
                          </span>
                        ))}
                      </div>

                      {/* Task Meta */}
                      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-3 h-3" />
                            <span className={formatDate(task.dueDate).includes('ago') ? 'text-red-400' : ''}>
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                          <span className={`badge ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      {/* Task Footer */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-color)]">
                        <div className="flex items-center space-x-2">
                          <div className="avatar-sm bg-gradient-to-r from-teal-500 to-teal-600">
                            {task.assignee.avatar}
                          </div>
                          <span className="text-xs text-[var(--text-muted)]">{task.assignee.name}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-[var(--text-muted)]">
                          {task.comments > 0 && (
                            <div className="flex items-center space-x-1">
                              <ChatBubbleLeftIcon className="w-3 h-3" />
                              <span className="text-xs">{task.comments}</span>
                            </div>
                          )}
                          {task.attachments > 0 && (
                            <div className="flex items-center space-x-1">
                              <PaperClipIcon className="w-3 h-3" />
                              <span className="text-xs">{task.attachments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Detail Modal */}
        {selectedTask && (
          <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
            <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{selectedTask.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-[var(--text-muted)]">
                      <span>in {selectedTask.team}</span>
                      <span>•</span>
                      <span>Created 3 days ago</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="btn-icon"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Task Content */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Description</h3>
                    <p className="text-[var(--text-secondary)]">{selectedTask.description}</p>
                  </div>

                  {/* Task Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Assignee</h3>
                      <div className="flex items-center space-x-2">
                        <div className="avatar-sm bg-gradient-to-r from-teal-500 to-teal-600">
                          {selectedTask.assignee.avatar}
                        </div>
                        <span className="text-[var(--text-secondary)]">{selectedTask.assignee.name}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Due Date</h3>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)]">{selectedTask.dueDate}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Priority</h3>
                      <span className={`badge ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Labels</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedTask.labels.map((label) => (
                          <span key={label} className={`badge text-xs ${getLabelColor(label)}`}>
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Comments ({selectedTask.comments})</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="avatar-sm bg-gradient-to-r from-blue-500 to-blue-600">
                          AC
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-[var(--text-primary)]">Alice Cooper</span>
                            <span className="text-xs text-[var(--text-muted)]">2 hours ago</span>
                          </div>
                          <p className="text-sm text-[var(--text-secondary)]">Great progress on this! The design looks much cleaner now.</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Add Comment */}
                    <div className="mt-4 flex items-start space-x-3">
                      <div className="avatar-sm bg-gradient-to-r from-teal-500 to-teal-600">
                        U
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Add a comment..."
                          className="input-primary w-full h-20 resize-none"
                        />
                        <div className="flex justify-end mt-2">
                          <button className="btn-primary text-sm">
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Task Modal */}
        {showCreateTask && (
          <div className="modal-overlay" onClick={() => setShowCreateTask(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Create New Task</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Enter task title..."
                      className="input-primary w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Description</label>
                    <textarea
                      placeholder="Enter task description..."
                      className="input-primary w-full h-24 resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Assignee</label>
                      <select className="input-primary w-full">
                        <option>Select assignee...</option>
                        <option>John Doe</option>
                        <option>Jane Smith</option>
                        <option>Mike Johnson</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Priority</label>
                      <select className="input-primary w-full">
                        <option>Select priority...</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Due Date</label>
                    <input
                      type="date"
                      className="input-primary w-full"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateTask(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Create Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;