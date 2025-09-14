'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'employees', name: 'Employees', icon: '👥' },
    { id: 'payroll', name: 'Payroll', icon: '💰' },
    { id: 'reports', name: 'Reports', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">HR Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">Welcome, HR Admin</span>
              <Link 
                href="/" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-2 mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total Employees</p>
                    <p className="text-3xl font-bold text-white">524</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+12 this month</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Active Departments</p>
                    <p className="text-3xl font-bold text-white">24</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+2 this quarter</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Pending Requests</p>
                    <p className="text-3xl font-bold text-white">18</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-orange-400 text-sm">Requires attention</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Monthly Payroll</p>
                    <p className="text-3xl font-bold text-white">$2.4M</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+5.2% from last month</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">New employee onboarded</p>
                    <p className="text-slate-300 text-sm">John Smith joined Engineering team</p>
                  </div>
                  <span className="text-slate-400 text-sm">2 hours ago</span>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <span className="text-orange-400">!</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Leave request pending</p>
                    <p className="text-slate-300 text-sm">Sarah Johnson requested 5 days off</p>
                  </div>
                  <span className="text-slate-400 text-sm">4 hours ago</span>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400">📊</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Monthly report generated</p>
                    <p className="text-slate-300 text-sm">Employee performance report ready</p>
                  </div>
                  <span className="text-slate-400 text-sm">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <span className="text-white font-medium">Add New Employee</span>
                </button>
                <button className="w-full text-left p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <span className="text-white font-medium">Process Payroll</span>
                </button>
                <button className="w-full text-left p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <span className="text-white font-medium">Generate Report</span>
                </button>
                <button className="w-full text-left p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <span className="text-white font-medium">Schedule Meeting</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-white font-medium">Team Meeting</p>
                  <p className="text-slate-300 text-sm">Tomorrow, 2:00 PM</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-white font-medium">Performance Reviews</p>
                  <p className="text-slate-300 text-sm">Next Monday</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-white font-medium">Training Session</p>
                  <p className="text-slate-300 text-sm">Friday, 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
