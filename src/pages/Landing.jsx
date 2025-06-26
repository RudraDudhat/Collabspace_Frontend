import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Real-time Chat',
    description: 'Communicate instantly with your team members through group and private chats with message history.',
    icon: ChatBubbleLeftRightIcon,
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Team Collaboration',
    description: 'Create and manage teams, assign roles, and work together seamlessly across projects.',
    icon: UserGroupIcon,
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Document Sharing',
    description: 'Share and collaborate on documents, notes, and files in real-time with version control.',
    icon: DocumentTextIcon,
    gradient: 'from-green-500 to-green-600'
  },
  {
    name: 'Task Management',
    description: 'Organize tasks with due dates, priorities, and progress tracking using Kanban boards.',
    icon: CalendarIcon,
    gradient: 'from-teal-500 to-teal-600'
  },
];

const benefits = [
  'Unlimited teams and channels',
  'Real-time collaboration',
  'File sharing and storage',
  'Advanced task management',
  'Mobile and desktop apps',
  '24/7 customer support'
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative bg-[#1a1a1a]/80 backdrop-blur-md border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                CollabSpace
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-500/30 rounded-full px-4 py-2">
                <SparklesIcon className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-teal-400 font-medium">New: Real-time collaboration features</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Collaborate with your
              <span className="block bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                team in real-time
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              CollabSpace brings together chat, task management, and document sharing in one powerful platform. 
              Perfect for remote teams, startups, and student groups who want to stay connected and productive.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/register"
                className="btn-primary px-8 py-4 text-lg flex items-center space-x-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary px-8 py-4 text-lg"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 bg-[#1a1a1a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-base text-teal-400 font-semibold tracking-wide uppercase mb-4">Features</h2>
            <p className="text-4xl font-bold text-white mb-4">
              Everything you need to collaborate
            </p>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A comprehensive suite of tools designed to help your team work together effectively, no matter where you are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={feature.name} className={`card-hover fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-4xl font-bold text-white mb-6">
                Why teams choose CollabSpace
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of teams who have transformed their collaboration with our intuitive platform.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/register"
                  className="btn-primary px-6 py-3 inline-flex items-center space-x-2"
                >
                  <span>Start collaborating today</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative fade-in">
              <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl p-8 border border-teal-500/30">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <BoltIcon className="w-6 h-6 text-teal-400" />
                    <span className="text-white font-semibold">Lightning Fast</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="w-6 h-6 text-green-400" />
                    <span className="text-white font-semibold">Enterprise Security</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="w-6 h-6 text-purple-400" />
                    <span className="text-white font-semibold">Unlimited Teams</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-r from-teal-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 fade-in">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your team collaboration?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of teams already using CollabSpace to work better together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/register"
              className="btn-primary px-8 py-4 text-lg flex items-center space-x-2 group"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <p className="text-sm text-gray-400">
              No credit card required • Free forever • Setup in 2 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-[#1a1a1a] border-t border-[#333333]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                CollabSpace
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 CollabSpace. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;