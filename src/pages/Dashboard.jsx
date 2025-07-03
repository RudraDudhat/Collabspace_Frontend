import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { fetchTeams, createTeam, joinTeamWithLink, generateJoinLink } from '../features/team/teamSlice';
import CreateOrJoinTeamModal from '../components/CreateOrJoinTeamModal';
import CopyTeamLinkModal from '../components/CopyTeamLinkModal';
import Layout from '../components/Layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
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
  StarIcon,
  SparklesIcon
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

    // Enhanced dashboard stats with trends
    const dashboardStats = {
        activeTasks: { value: 12, trend: '+12%', positive: true },
        completedTasks: { value: 8, trend: '+8%', positive: true },
        totalMessages: { value: 156, trend: '+23%', positive: true },
        activeTeams: { value: teams?.length || 0, trend: '+2', positive: true }
    };

    const recentTasks = [
        { 
          id: 1, 
          title: 'Design new landing page', 
          priority: 'high', 
          dueDate: '2024-01-15', 
          status: 'in-progress', 
          assignee: { name: 'John Doe', avatar: 'JD' }, 
          team: 'Design Team',
          progress: 75
        },
        { 
          id: 2, 
          title: 'Fix authentication bug', 
          priority: 'high', 
          dueDate: '2024-01-14', 
          status: 'todo', 
          assignee: { name: 'Jane Smith', avatar: 'JS' }, 
          team: 'Dev Team',
          progress: 0
        },
        { 
          id: 3, 
          title: 'Update documentation', 
          priority: 'medium', 
          dueDate: '2024-01-16', 
          status: 'in-progress', 
          assignee: { name: 'Mike Johnson', avatar: 'MJ' }, 
          team: 'Product',
          progress: 45
        },
        { 
          id: 4, 
          title: 'Code review for API', 
          priority: 'low', 
          dueDate: '2024-01-17', 
          status: 'todo', 
          assignee: { name: 'Sarah Wilson', avatar: 'SW' }, 
          team: 'Dev Team',
          progress: 0
        },
    ];

    const recentMessages = [
        { 
          id: 1, 
          channel: '#design', 
          user: 'Alice Cooper', 
          message: 'The new mockups look great! 🎨', 
          time: '5m ago', 
          avatar: 'AC', 
          team: 'Design Team',
          unread: true
        },
        { 
          id: 2, 
          channel: '#development', 
          user: 'Bob Smith', 
          message: 'Deployed the latest changes to staging', 
          time: '12m ago', 
          avatar: 'BS', 
          team: 'Dev Team',
          unread: true
        },
        { 
          id: 3, 
          channel: '#general', 
          user: 'Carol Johnson', 
          message: 'Team meeting at 3 PM today', 
          time: '1h ago', 
          avatar: 'CJ', 
          team: 'Product',
          unread: false
        },
        { 
          id: 4, 
          channel: '#design', 
          user: 'David Lee', 
          message: 'New design system components ready for review', 
          time: '2h ago', 
          avatar: 'DL', 
          team: 'Design Team',
          unread: false
        },
    ];

    const upcomingEvents = [
        { id: 1, title: 'Sprint Planning', time: '10:00 AM', date: 'Today', type: 'meeting', attendees: 8 },
        { id: 2, title: 'Design Review', time: '2:00 PM', date: 'Today', type: 'review', attendees: 5 },
        { id: 3, title: 'Team Standup', time: '9:00 AM', date: 'Tomorrow', type: 'standup', attendees: 12 },
        { id: 4, title: 'Product Demo', time: '3:00 PM', date: 'Friday', type: 'demo', attendees: 15 },
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

    const getPriorityVariant = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'secondary';
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'in-progress': return 'primary';
            case 'todo': return 'secondary';
            default: return 'secondary';
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

    const StatCard = ({ title, value, trend, positive, icon: Icon, color }) => (
        <Card hover className="group">
            <CardContent>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[var(--text-muted)] text-sm font-medium">{title}</p>
                        <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{value}</p>
                    </div>
                    <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                    <ArrowTrendingUpIcon className={`w-4 h-4 mr-2 ${positive ? 'text-[var(--success)]' : 'text-[var(--error)]'}`} />
                    <span className={`font-medium ${positive ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>{trend}</span>
                    <span className="text-[var(--text-muted)] ml-2">from last week</span>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <Layout>
            <div className="p-6 space-y-8 overflow-y-auto h-full bg-gradient-to-br from-[var(--primary-bg)] to-[var(--secondary-bg)]">
                {/* Welcome Section */}
                <div className="fade-in">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <h1 className="text-4xl font-bold text-[var(--text-primary)]">
                                    Welcome back, {user?.name?.split(' ')[0]}!
                                </h1>
                                <div className="flex items-center space-x-1 bg-gradient-to-r from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 border border-[var(--brand-primary)]/30 rounded-full px-3 py-1">
                                    <SparklesIcon className="w-4 h-4 text-[var(--brand-primary)]" />
                                    <span className="text-sm text-[var(--brand-primary)] font-medium">Pro</span>
                                </div>
                            </div>
                            <p className="text-[var(--text-secondary)] text-lg">Here's what's happening with your teams today.</p>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <Button
                                onClick={() => setShowTeamModal(true)}
                                icon={PlusIcon}
                            >
                                Create Team
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
                    <StatCard
                        title="Active Tasks"
                        value={dashboardStats.activeTasks.value}
                        trend={dashboardStats.activeTasks.trend}
                        positive={dashboardStats.activeTasks.positive}
                        icon={CheckCircleIcon}
                        color="from-blue-500 to-blue-600"
                    />
                    <StatCard
                        title="Completed Tasks"
                        value={dashboardStats.completedTasks.value}
                        trend={dashboardStats.completedTasks.trend}
                        positive={dashboardStats.completedTasks.positive}
                        icon={CheckCircleIcon}
                        color="from-green-500 to-green-600"
                    />
                    <StatCard
                        title="Messages"
                        value={dashboardStats.totalMessages.value}
                        trend={dashboardStats.totalMessages.trend}
                        positive={dashboardStats.totalMessages.positive}
                        icon={ChatBubbleLeftRightIcon}
                        color="from-purple-500 to-purple-600"
                    />
                    <StatCard
                        title="Active Teams"
                        value={dashboardStats.activeTeams.value}
                        trend={dashboardStats.activeTeams.trend}
                        positive={dashboardStats.activeTeams.positive}
                        icon={UserGroupIcon}
                        color="from-teal-500 to-teal-600"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column - Teams & Messages */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* My Teams */}
                        <Card className="fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <UserGroupIcon className="w-6 h-6 mr-3 text-[var(--brand-primary)]" />
                                    My Teams
                                </CardTitle>
                                <Button
                                    onClick={() => setShowTeamModal(true)}
                                    icon={PlusIcon}
                                    size="sm"
                                >
                                    Create Team
                                </Button>
                            </CardHeader>

                            <CardContent>
                                {status === 'loading' && (
                                    <div className="text-center py-12">
                                        <div className="spinner h-10 w-10 mx-auto mb-4"></div>
                                        <p className="text-[var(--text-muted)]">Loading teams...</p>
                                    </div>
                                )}

                                {isError && (
                                    <div className="text-center py-8 bg-[var(--error)]/10 rounded-lg border border-[var(--error)]/20">
                                        <p className="text-[var(--error)] mb-4">Error: {message}</p>
                                        <Button
                                            onClick={() => dispatch(fetchTeams())}
                                            variant="secondary"
                                        >
                                            Try Again
                                        </Button>
                                    </div>
                                )}

                                {status !== 'loading' && !isError && (
                                    <div className="space-y-4">
                                        {Array.isArray(teams) && teams.length === 0 ? (
                                            <div className="text-center py-12">
                                                <UserGroupIcon className="w-20 h-20 text-[var(--text-subtle)] mx-auto mb-4" />
                                                <p className="text-[var(--text-muted)] text-xl mb-2">No teams yet</p>
                                                <p className="text-[var(--text-subtle)] mb-6">Create a new team or join an existing one to get started</p>
                                                <Button
                                                    onClick={() => setShowTeamModal(true)}
                                                >
                                                    Create Your First Team
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {Array.isArray(teams) && teams.map((team) => (
                                                    <Card
                                                        key={team._id}
                                                        hover
                                                        className="cursor-pointer group"
                                                        onClick={() => navigate(`/teams/${team._id}`)}
                                                    >
                                                        <CardContent>
                                                            <div className="flex items-center space-x-4 mb-4">
                                                                <Avatar
                                                                    size="lg"
                                                                    fallback={team.name[0].toUpperCase()}
                                                                    className="group-hover:scale-110 transition-transform duration-200"
                                                                />
                                                                <div className="flex-1">
                                                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
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
                                                                            <Avatar
                                                                                key={index}
                                                                                size="sm"
                                                                                fallback={member.name?.[0]?.toUpperCase() || '?'}
                                                                                className="border-2 border-[var(--card-bg)]"
                                                                            />
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
                                                                <div className="text-[var(--brand-primary)] group-hover:translate-x-1 transition-transform text-xl">
                                                                    →
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Messages */}
                        <Card className="fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <ChatBubbleLeftRightIcon className="w-6 h-6 mr-3 text-purple-500" />
                                    Recent Messages
                                </CardTitle>
                                <Button variant="ghost" size="sm">
                                    View all
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentMessages.map((message) => (
                                        <div key={message.id} className="flex items-start space-x-4 p-4 hover:bg-[var(--tertiary-bg)] rounded-lg transition-colors duration-200 cursor-pointer group">
                                            <Avatar
                                                size="md"
                                                fallback={message.avatar}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-sm font-semibold text-[var(--text-primary)]">{message.user}</span>
                                                    <span className="text-sm text-[var(--brand-primary)] font-medium">{message.channel}</span>
                                                    <span className="text-xs text-[var(--text-subtle)]">{message.time}</span>
                                                    {message.unread && (
                                                        <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                                                    )}
                                                </div>
                                                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{message.message}</p>
                                                <p className="text-xs text-[var(--text-subtle)] mt-1">{message.team}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Tasks & Calendar */}
                    <div className="space-y-8">
                        {/* My Active Tasks */}
                        <Card className="fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                                    My Active Tasks
                                </CardTitle>
                                <Button variant="ghost" size="sm">
                                    View all
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentTasks.map((task) => (
                                        <div key={task.id} className="task-card">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-2">{task.title}</h3>
                                                <Badge variant={getPriorityVariant(task.priority)}>
                                                    {task.priority}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                                                <span>{task.assignee.name}</span>
                                                <div className="flex items-center space-x-1">
                                                    <CalendarIcon className="w-3 h-3" />
                                                    <span>{task.dueDate}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge variant={getStatusVariant(task.status)}>
                                                    {task.status.replace('-', ' ')}
                                                </Badge>
                                                <span className="text-xs text-[var(--text-subtle)]">{task.team}</span>
                                            </div>
                                            {task.progress > 0 && (
                                                <div className="mt-2">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-[var(--text-muted)]">Progress</span>
                                                        <span className="text-[var(--text-primary)]">{task.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-[var(--tertiary-bg)] rounded-full h-2">
                                                        <div 
                                                            className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] h-2 rounded-full transition-all duration-500" 
                                                            style={{ width: `${task.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Events */}
                        <Card className="fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CalendarIcon className="w-5 h-5 mr-2 text-amber-500" />
                                    Upcoming Events
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
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
                                                    <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
                                                        <span>{event.date} at {event.time}</span>
                                                        <span>•</span>
                                                        <span>{event.attendees} attendees</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Team Analytics */}
                        <Card className="fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <ChartBarIcon className="w-5 h-5 mr-2 text-blue-500" />
                                    Team Analytics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
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
                            </CardContent>
                        </Card>
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