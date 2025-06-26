import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { fetchTeams, createTeam, joinTeamWithLink, generateJoinLink } from '../features/team/teamSlice';
import CreateOrJoinTeamModal from '../components/CreateOrJoinTeamModal';
import CopyTeamLinkModal from '../components/CopyTeamLinkModal';
import Layout from '../components/Layout/Layout';
import {
  PlusIcon,
  ChartBarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  DocumentIcon,
  BellIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);
    const { teams, status, error: isError, error: message } = useSelector((state) => state.team);

    const [showTeamModal, setShowTeamModal] = useState(false);
    const [joinTeamMessage, setJoinTeamMessage] = useState('');
    const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
    const [copyLink, setCopyLink] = useState('');
    const [copyLinkLoading, setCopyLinkLoading] = useState(false);
    const [copyLinkError, setCopyLinkError] = useState('');

    // Mock data for dashboard widgets
    const dashboardStats = {
        activeTasks: 12,
        completedTasks: 8,
        totalMessages: 156,
        activeTeams: teams?.length || 0
    };

    const recentTasks = [
        { id: 1, title: 'Design new landing page', priority: 'high', dueDate: '2024-01-15', status: 'in-progress', assignee: 'John Doe', team: 'Design Team' },
        { id: 2, title: 'Fix authentication bug', priority: 'high', dueDate: '2024-01-14', status: 'todo', assignee: 'Jane Smith', team: 'Dev Team' },
        { id: 3, title: 'Update documentation', priority: 'medium', dueDate: '2024-01-16', status: 'in-progress', assignee: 'Mike Johnson', team: 'Product' },
        { id: 4, title: 'Code review for API', priority: 'low', dueDate: '2024-01-17', status: 'todo', assignee: 'Sarah Wilson', team: 'Dev Team' },
    ];

    const recentMessages = [
        { id: 1, channel: '#design', user: 'Alice Cooper', message: 'The new mockups look great! 🎨', time: '5m ago', avatar: 'AC', team: 'Design Team' },
        { id: 2, channel: '#development', user: 'Bob Smith', message: 'Deployed the latest changes to staging', time: '12m ago', avatar: 'BS', team: 'Dev Team' },
        { id: 3, channel: '#general', user: 'Carol Johnson', message: 'Team meeting at 3 PM today', time: '1h ago', avatar: 'CJ', team: 'Product' },
        { id: 4, channel: '#design', user: 'David Lee', message: 'New design system components ready for review', time: '2h ago', avatar: 'DL', team: 'Design Team' },
    ];

    const upcomingEvents = [
        { id: 1, title: 'Sprint Planning', time: '10:00 AM', date: 'Today', type: 'meeting' },
        { id: 2, title: 'Design Review', time: '2:00 PM', date: 'Today', type: 'review' },
        { id: 3, title: 'Team Standup', time: '9:00 AM', date: 'Tomorrow', type: 'standup' },
        { id: 4, title: 'Product Demo', time: '3:00 PM', date: 'Friday', type: 'demo' },
    ];

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
            return;
        }
        if (status === 'idle') {
            dispatch(fetchTeams());
        }
    }, [user, token, dispatch, navigate, status]);

    const handleCreateTeam = async (teamName) => {
        if (teamName) {
            return await dispatch(createTeam({ name: teamName }));
        }
    };

    const handleJoinTeam = async ({ teamId, token }) => {
        setJoinTeamMessage('');
        try {
            const resultAction = await dispatch(joinTeamWithLink({ teamId, token }));
            if (joinTeamWithLink.fulfilled.match(resultAction)) {
                const { message } = resultAction.payload;
                if (message && message.toLowerCase().includes('already')) {
                    setJoinTeamMessage('You are already a member of this team.');
                } else if (message && message.toLowerCase().includes('expired')) {
                    setJoinTeamMessage('This team link has expired.');
                } else {
                    setJoinTeamMessage('You have joined the team.');
                }
            } else {
                setJoinTeamMessage(resultAction.payload || 'Failed to join the team.');
            }
        } catch (err) {
            setJoinTeamMessage('An error occurred while joining the team.');
        }
        setTimeout(() => setJoinTeamMessage(''), 5000);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
            case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
            case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
            default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
            case 'in-progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
            case 'todo': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
            default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
        }
    };

    const getEventTypeIcon = (type) => {
        switch (type) {
            case 'meeting': return CalendarIcon;
            case 'review': return DocumentIcon;
            case 'standup': return UserGroupIcon;
            case 'demo': return StarIcon;
            default: return CalendarIcon;
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-8 overflow-y-auto h-full bg-gradient-to-br from-[var(--primary-bg)] to-[var(--secondary-bg)]">
                {/* Welcome Section */}
                <div className="fade-in">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">
                                Welcome back, {user?.name?.split(' ')[0]}! 👋
                            </h1>
                            <p className="text-[var(--text-secondary)] text-lg">Here's what's happening with your teams today.</p>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => setShowTeamModal(true)}
                                className="btn-primary flex items-center space-x-2"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>Create Team</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
                    <div className="card-hover group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--text-muted)] text-sm font-medium">Active Tasks</p>
                                <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{dashboardStats.activeTasks}</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                <CheckCircleIcon className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <ArrowTrendingUpIcon className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-green-400 font-medium">+12%</span>
                            <span className="text-[var(--text-muted)] ml-2">from last week</span>
                        </div>
                    </div>

                    <div className="card-hover group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--text-muted)] text-sm font-medium">Completed Tasks</p>
                                <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{dashboardStats.completedTasks}</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                <CheckCircleIcon className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <ArrowTrendingUpIcon className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-green-400 font-medium">+8%</span>
                            <span className="text-[var(--text-muted)] ml-2">from last week</span>
                        </div>
                    </div>

                    <div className="card-hover group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--text-muted)] text-sm font-medium">Messages</p>
                                <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{dashboardStats.totalMessages}</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <ArrowTrendingUpIcon className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-green-400 font-medium">+23%</span>
                            <span className="text-[var(--text-muted)] ml-2">from last week</span>
                        </div>
                    </div>

                    <div className="card-hover group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--text-muted)] text-sm font-medium">Active Teams</p>
                                <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{dashboardStats.activeTeams}</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                                <UserGroupIcon className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <ArrowTrendingUpIcon className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-green-400 font-medium">+2</span>
                            <span className="text-[var(--text-muted)] ml-2">new this month</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column - Teams & Messages */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* My Teams */}
                        <div className="card fade-in">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center">
                                    <UserGroupIcon className="w-6 h-6 mr-3 text-teal-500" />
                                    My Teams
                                </h2>
                                <button
                                    onClick={() => setShowTeamModal(true)}
                                    className="btn-primary flex items-center space-x-2"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    <span>Create Team</span>
                                </button>
                            </div>

                            {status === 'loading' && (
                                <div className="text-center py-12">
                                    <div className="spinner h-10 w-10 mx-auto mb-4"></div>
                                    <p className="text-[var(--text-muted)]">Loading teams...</p>
                                </div>
                            )}

                            {isError && (
                                <div className="text-center py-8 bg-red-500/10 rounded-lg border border-red-500/20">
                                    <p className="text-red-400 mb-4">Error: {message}</p>
                                    <button
                                        onClick={() => dispatch(fetchTeams())}
                                        className="btn-primary"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}

                            {status !== 'loading' && !isError && (
                                <div className="space-y-4">
                                    {Array.isArray(teams) && teams.length === 0 ? (
                                        <div className="text-center py-12">
                                            <UserGroupIcon className="w-20 h-20 text-[var(--text-subtle)] mx-auto mb-4" />
                                            <p className="text-[var(--text-muted)] text-xl mb-2">No teams yet</p>
                                            <p className="text-[var(--text-subtle)] mb-6">Create a new team or join an existing one to get started</p>
                                            <button
                                                onClick={() => setShowTeamModal(true)}
                                                className="btn-primary"
                                            >
                                                Create Your First Team
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Array.isArray(teams) && teams.map((team) => (
                                                <div
                                                    key={team._id}
                                                    onClick={() => navigate(`/teams/${team._id}`)}
                                                    className="card-hover cursor-pointer group"
                                                >
                                                    <div className="flex items-center space-x-4 mb-4">
                                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                                                            {team.name[0].toUpperCase()}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-teal-400 transition-colors">
                                                                {team.name}
                                                            </h3>
                                                            <p className="text-sm text-[var(--text-muted)]">
                                                                Created {new Date(team.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex -space-x-2">
                                                                {team.members?.slice(0, 3).map((member, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="avatar-sm bg-gradient-to-r from-purple-500 to-purple-600 border-2 border-[var(--card-bg)]"
                                                                        title={member.name}
                                                                    >
                                                                        {member.name?.[0]?.toUpperCase() || '?'}
                                                                    </div>
                                                                ))}
                                                                {team.members?.length > 3 && (
                                                                    <div className="avatar-sm bg-[var(--tertiary-bg)] border-2 border-[var(--card-bg)] text-[var(--text-muted)]">
                                                                        +{team.members.length - 3}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <span className="text-sm text-[var(--text-muted)]">
                                                                {team.members?.length || 0} members
                                                            </span>
                                                        </div>
                                                        <div className="text-teal-400 group-hover:translate-x-1 transition-transform text-xl">
                                                            →
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Recent Messages */}
                        <div className="card fade-in">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                                <ChatBubbleLeftRightIcon className="w-6 h-6 mr-3 text-purple-500" />
                                Recent Messages
                            </h2>
                            <div className="space-y-4">
                                {recentMessages.map((message) => (
                                    <div key={message.id} className="flex items-start space-x-4 p-4 hover:bg-[var(--tertiary-bg)] rounded-lg transition-colors duration-200 cursor-pointer group">
                                        <div className="avatar-md bg-gradient-to-r from-blue-500 to-blue-600">
                                            {message.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="text-sm font-semibold text-[var(--text-primary)]">{message.user}</span>
                                                <span className="text-sm text-teal-400 font-medium">{message.channel}</span>
                                                <span className="text-xs text-[var(--text-subtle)]">{message.time}</span>
                                            </div>
                                            <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{message.message}</p>
                                            <p className="text-xs text-[var(--text-subtle)] mt-1">{message.team}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200 font-medium">
                                View all messages
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Tasks & Calendar */}
                    <div className="space-y-8">
                        {/* My Active Tasks */}
                        <div className="card fade-in">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center">
                                    <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                                    My Active Tasks
                                </h2>
                                <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200 font-medium">
                                    View all
                                </button>
                            </div>
                            <div className="space-y-3">
                                {recentTasks.map((task) => (
                                    <div key={task.id} className="task-card">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-2">{task.title}</h3>
                                            <span className={`badge ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                                            <span>{task.assignee}</span>
                                            <div className="flex items-center space-x-1">
                                                <CalendarIcon className="w-3 h-3" />
                                                <span>{task.dueDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`badge ${getStatusColor(task.status)}`}>
                                                {task.status.replace('-', ' ')}
                                            </span>
                                            <span className="text-xs text-[var(--text-subtle)]">{task.team}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="card fade-in">
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                                <CalendarIcon className="w-5 h-5 mr-2 text-amber-500" />
                                Upcoming Events
                            </h2>
                            <div className="space-y-3">
                                {upcomingEvents.map((event) => {
                                    const IconComponent = getEventTypeIcon(event.type);
                                    return (
                                        <div key={event.id} className="flex items-center space-x-3 p-3 hover:bg-[var(--tertiary-bg)] rounded-lg transition-colors duration-200 cursor-pointer">
                                            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                                                <IconComponent className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{event.title}</h3>
                                                <p className="text-xs text-[var(--text-muted)]">{event.date} at {event.time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Team Analytics */}
                        <div className="card fade-in">
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                                <ChartBarIcon className="w-5 h-5 mr-2 text-blue-500" />
                                Team Analytics
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[var(--text-muted)]">Tasks Completed</span>
                                        <span className="text-[var(--text-primary)] font-semibold">75%</span>
                                    </div>
                                    <div className="w-full bg-[var(--tertiary-bg)] rounded-full h-3">
                                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[var(--text-muted)]">Team Activity</span>
                                        <span className="text-[var(--text-primary)] font-semibold">92%</span>
                                    </div>
                                    <div className="w-full bg-[var(--tertiary-bg)] rounded-full h-3">
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[var(--text-muted)]">Messages Sent</span>
                                        <span className="text-[var(--text-primary)] font-semibold">68%</span>
                                    </div>
                                    <div className="w-full bg-[var(--tertiary-bg)] rounded-full h-3">
                                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CreateOrJoinTeamModal
                isOpen={showTeamModal}
                onClose={() => setShowTeamModal(false)}
                onCreateTeam={handleCreateTeam}
                onJoinTeam={handleJoinTeam}
            />
            <CopyTeamLinkModal
                isOpen={showCopyLinkModal}
                onClose={() => setShowCopyLinkModal(false)}
                link={copyLink}
                isLoading={copyLinkLoading}
                error={copyLinkError}
            />
        </Layout>
    );
};

export default Dashboard;