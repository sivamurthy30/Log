'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HRLandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: '',
    salary: ''
  });

  const handleHRLogin = () => {
    setIsLoading(true);
    // Simulate HR login process
    setTimeout(() => {
      // Redirect to HR dashboard or login form
      window.location.href = '/hr-dashboard';
    }, 1500);
  };

  // API Functions
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/hr/jobs');
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/hr/reviews');
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/hr/analytics');
      const data = await response.json();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/hr/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobForm),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Job posted successfully!');
        setShowJobForm(false);
        setJobForm({
          title: '',
          department: '',
          location: '',
          type: 'full-time',
          description: '',
          requirements: '',
          salary: ''
        });
        // Refresh jobs list
        await fetchJobs();
      } else {
        alert('Failed to create job: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Smooth tab switching with animation
  const handleTabChange = (tabId: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsAnimating(false);
    }, 150);
  };

  // Load data when component mounts and when tabs change
  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobs();
    } else if (activeTab === 'reviews') {
      fetchReviews();
    } else if (activeTab === 'analytics') {
      fetchAnalytics();
    }
    // Candidates and interviews tabs use static data for now
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">HR Portal</h1>
            </div>
            <Link 
              href="/" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-2 mb-8">
          <div className="flex space-x-1 relative">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'jobs', name: 'Job Management', icon: '💼' },
              { id: 'candidates', name: 'Candidates', icon: '👥' },
              { id: 'interviews', name: 'Interviews', icon: '🎯' },
              { id: 'reviews', name: 'Reviews & Feedback', icon: '⭐' },
              { id: 'analytics', name: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out relative z-10 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-lg z-20 hover:bg-orange-600'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50 hover:shadow-lg'
                }`}
              >
                <span className="mr-2 transition-transform duration-200">{tab.icon}</span>
                <span className="transition-all duration-200">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10 rounded-3xl animate-pulse"></div>
          <div className="relative">
            <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Welcome to <span className="text-orange-500 animate-gradient bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">HR Portal</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Manage your workforce, track employee performance, and streamline HR operations with our comprehensive HR management system.
            </p>
          </div>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        <div className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8 transition-all duration-300 hover:shadow-orange-500/20 hover:border-orange-500/30 hover:transform hover:-translate-y-1 group animate-fade-in-up animation-delay-100">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/30 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-orange-500 group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-100 transition-colors duration-300">Employee Management</h3>
              <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                Manage employee profiles, track attendance, and maintain comprehensive employee records.
              </p>
            </div>

            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8 transition-all duration-300 hover:shadow-orange-500/20 hover:border-orange-500/30 hover:transform hover:-translate-y-1 group animate-fade-in-up animation-delay-200">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/30 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-orange-500 group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-100 transition-colors duration-300">Performance Analytics</h3>
              <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                Track employee performance, generate reports, and analyze workforce metrics.
              </p>
            </div>

            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8 transition-all duration-300 hover:shadow-orange-500/20 hover:border-orange-500/30 hover:transform hover:-translate-y-1 group animate-fade-in-up animation-delay-300">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/30 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-orange-500 group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-100 transition-colors duration-300">Payroll Management</h3>
              <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                Process payroll, manage benefits, and handle compensation packages efficiently.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-8 mb-16">
            {/* Job Management Header */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Job Management</h2>
                <button
                  onClick={() => setShowJobForm(!showJobForm)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105"
                >
                  {showJobForm ? 'Cancel' : '+ Create New Job'}
                </button>
              </div>

              {/* Job Creation Form */}
              {showJobForm && (
                <form onSubmit={handleJobSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">Job Title</label>
                      <input
                        type="text"
                        name="title"
                        value={jobForm.title}
                        onChange={handleJobFormChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                        placeholder="e.g., Senior Software Engineer"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">Department</label>
                      <select
                        name="department"
                        value={jobForm.department}
                        onChange={handleJobFormChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="engineering">Engineering</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                        <option value="hr">Human Resources</option>
                        <option value="finance">Finance</option>
                        <option value="operations">Operations</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={jobForm.location}
                        onChange={handleJobFormChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                        placeholder="e.g., New York, NY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">Job Type</label>
                      <select
                        name="type"
                        value={jobForm.type}
                        onChange={handleJobFormChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">Salary Range</label>
                      <input
                        type="text"
                        name="salary"
                        value={jobForm.salary}
                        onChange={handleJobFormChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                        placeholder="e.g., $80,000 - $120,000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Job Description</label>
                    <textarea
                      name="description"
                      value={jobForm.description}
                      onChange={handleJobFormChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                      placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Requirements</label>
                    <textarea
                      name="requirements"
                      value={jobForm.requirements}
                      onChange={handleJobFormChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:bg-slate-700/80 hover:border-slate-500 hover:shadow-lg"
                      placeholder="List the required skills, experience, and qualifications..."
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowJobForm(false)}
                      className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 disabled:hover:translate-y-0 disabled:hover:scale-100"
                    >
                      {loading ? 'Posting Job...' : 'Post Job'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Active Jobs List */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Active Job Postings ({jobs.length})</h3>
              <div className="space-y-4">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div key={job.id} className="p-6 bg-slate-700/50 rounded-lg border border-slate-600 transition-all duration-300 hover:bg-slate-700/70 hover:border-orange-500/30 hover:transform hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                          <p className="text-slate-300 capitalize">{job.department} • {job.location}</p>
                          <p className="text-slate-300 text-sm mt-1">Type: {job.type} • Salary: {job.salary}</p>
                          <p className="text-orange-400 text-sm mt-2">{job.applicants} applicants</p>
                          <p className="text-slate-400 text-xs mt-2">Posted: {job.createdAt}</p>
                        </div>
                        <div className="flex space-x-2">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                            {job.status}
                          </span>
                          <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No jobs found. Create your first job posting!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="space-y-8 mb-16">
            {/* Candidates Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total Candidates</p>
                    <p className="text-3xl font-bold text-white">1,247</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+89 this week</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">New Applications</p>
                    <p className="text-3xl font-bold text-white">156</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+23 today</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Shortlisted</p>
                    <p className="text-3xl font-bold text-white">89</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-orange-400 text-sm">+12 this week</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Hired</p>
                    <p className="text-3xl font-bold text-white">34</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+8 this month</span>
                </div>
              </div>
            </div>

            {/* Recent Candidates */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Candidates</h3>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Alex Thompson', position: 'Offshore Engineer', experience: '5 years', status: 'shortlisted', appliedDate: '2 days ago', skills: ['Drilling', 'Safety', 'Maintenance'] },
                  { name: 'Maria Rodriguez', position: 'Marine Technician', experience: '3 years', status: 'new', appliedDate: '1 day ago', skills: ['Navigation', 'Equipment', 'Safety'] },
                  { name: 'James Wilson', position: 'Rig Supervisor', experience: '8 years', status: 'interviewed', appliedDate: '3 days ago', skills: ['Leadership', 'Operations', 'Safety'] },
                  { name: 'Sarah Chen', position: 'Environmental Specialist', experience: '4 years', status: 'shortlisted', appliedDate: '4 days ago', skills: ['Compliance', 'Monitoring', 'Reporting'] },
                  { name: 'David Kumar', position: 'Mechanical Engineer', experience: '6 years', status: 'new', appliedDate: '5 days ago', skills: ['Maintenance', 'Troubleshooting', 'Safety'] }
                ].map((candidate, index) => (
                  <div key={index} className="p-6 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white">{candidate.name}</h4>
                        <p className="text-slate-300">{candidate.position} • {candidate.experience} experience</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {candidate.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-slate-400 text-sm mt-2">Applied: {candidate.appliedDate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          candidate.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                          candidate.status === 'shortlisted' ? 'bg-orange-500/20 text-orange-400' :
                          candidate.status === 'interviewed' ? 'bg-green-500/20 text-green-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {candidate.status}
                        </span>
                        <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all text-sm">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interviews' && (
          <div className="space-y-8 mb-16">
            {/* Interview Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Scheduled Today</p>
                    <p className="text-3xl font-bold text-white">8</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-blue-400 text-sm">Next: 10:30 AM</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">This Week</p>
                    <p className="text-3xl font-bold text-white">24</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+5 from last week</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Completion Rate</p>
                    <p className="text-3xl font-bold text-white">92%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+3% this month</span>
                </div>
              </div>
            </div>

            {/* Today's Interviews */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Today's Interviews</h3>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all">
                  Schedule New
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { candidate: 'Alex Thompson', position: 'Offshore Engineer', time: '09:00 AM', type: 'Technical', interviewer: 'Sarah Johnson', status: 'upcoming' },
                  { candidate: 'Maria Rodriguez', position: 'Marine Technician', time: '10:30 AM', type: 'HR', interviewer: 'Mike Chen', status: 'upcoming' },
                  { candidate: 'James Wilson', position: 'Rig Supervisor', time: '02:00 PM', type: 'Panel', interviewer: 'Team Lead', status: 'upcoming' },
                  { candidate: 'David Kumar', position: 'Mechanical Engineer', time: '03:30 PM', type: 'Technical', interviewer: 'Engineering Team', status: 'upcoming' }
                ].map((interview, index) => (
                  <div key={index} className="p-6 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white">{interview.candidate}</h4>
                        <p className="text-slate-300">{interview.position}</p>
                        <div className="flex space-x-4 mt-2 text-sm text-slate-400">
                          <span>⏰ {interview.time}</span>
                          <span>👤 {interview.interviewer}</span>
                          <span>📋 {interview.type}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          interview.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                          interview.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {interview.status}
                        </span>
                        <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all text-sm">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8 mb-16">
            {/* Reviews Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total Reviews</p>
                    <p className="text-3xl font-bold text-white">247</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+23 this month</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Average Rating</p>
                    <p className="text-3xl font-bold text-white">4.2</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+0.3 from last month</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Pending Reviews</p>
                    <p className="text-3xl font-bold text-white">12</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-orange-400 text-sm">Needs attention</span>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Employee Reviews ({reviews.length})</h3>
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.slice(0, 6).map((review) => (
                    <div key={review.id} className="p-6 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{review.name}</h4>
                          <p className="text-slate-300">{review.position} • {review.department}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-slate-600'}`}>⭐</span>
                            ))}
                          </div>
                          <span className="text-slate-400 text-sm">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-slate-300">{review.review}</p>
                      <div className="mt-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          review.status === 'published' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {review.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No reviews found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8 mb-16">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Employee Satisfaction</p>
                    <p className="text-3xl font-bold text-white">
                      {analytics?.overview?.employeeSatisfaction || 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">😊</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+5% from last quarter</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Retention Rate</p>
                    <p className="text-3xl font-bold text-white">
                      {analytics?.overview?.retentionRate || 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+2% from last year</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Training Completion</p>
                    <p className="text-3xl font-bold text-white">
                      {analytics?.overview?.trainingCompletion || 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-orange-400 text-sm">+12% this month</span>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Performance Score</p>
                    <p className="text-3xl font-bold text-white">
                      {analytics?.overview?.performanceScore || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm">+0.2 from last month</span>
                </div>
              </div>
            </div>

            {/* Department Performance */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Department Performance</h3>
              <div className="space-y-4">
                {[
                  { department: 'Engineering', satisfaction: 92, retention: 96, performance: 4.3 },
                  { department: 'Marketing', satisfaction: 85, retention: 89, performance: 4.1 },
                  { department: 'Sales', satisfaction: 88, retention: 91, performance: 4.0 },
                  { department: 'HR', satisfaction: 90, retention: 95, performance: 4.2 },
                  { department: 'Finance', satisfaction: 83, retention: 87, performance: 3.9 }
                ].map((dept, index) => (
                  <div key={index} className="p-6 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{dept.department}</h4>
                        <div className="flex space-x-6 mt-2">
                          <span className="text-slate-300 text-sm">Satisfaction: <span className="text-green-400">{dept.satisfaction}%</span></span>
                          <span className="text-slate-300 text-sm">Retention: <span className="text-blue-400">{dept.retention}%</span></span>
                          <span className="text-slate-300 text-sm">Performance: <span className="text-orange-400">{dept.performance}/5</span></span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
            <div className="text-slate-300">Active Employees</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
            <div className="text-slate-300">Departments</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">99.9%</div>
            <div className="text-slate-300">Uptime</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
