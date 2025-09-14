'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
  contactEmail: string;
  jobType: string;
  industry: string;
  experienceLevel: string;
  postedBy: string;
  postedAt: string;
  views: number;
  applications: number;
}

export default function JobsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalViews: 0,
    totalApplications: 0,
    averageViewsPerJob: 0
  });

  // Redirect if not logged in
  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }
  
  // Check if user is HR type
  useEffect(() => {
    if (status === 'authenticated') {
      // Check if the user is an HR user
      const isHrUser = session?.user?.loginType === 'hr';
      
      // Also check localStorage for demo users
      const demoUser = localStorage.getItem('demoUser') ? JSON.parse(localStorage.getItem('demoUser') || '{}') : null;
      const isDemoHrUser = demoUser && demoUser.loginType === 'hr';
      
      // If not HR user, redirect to dashboard
      if (!isHrUser && !isDemoHrUser) {
        router.push('/dashboard');
      }
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === 'authenticated' || status === 'loading') {
      // Load jobs from localStorage (in a real app, this would be an API call)
      const loadJobs = () => {
        try {
          const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
          // Filter jobs posted by the current user
          // Use optional chaining and nullish coalescing to safely access user email
          const userEmail = session?.user?.email || '';
          const userJobs = storedJobs.filter((job: Job) => job.postedBy === userEmail);
          setJobs(userJobs);
          
          // Calculate stats
          const totalViews = userJobs.reduce((sum: number, job: Job) => sum + job.views, 0);
          const totalApplications = userJobs.reduce((sum: number, job: Job) => sum + job.applications, 0);
          
          setStats({
            totalJobs: userJobs.length,
            totalViews,
            totalApplications,
            averageViewsPerJob: userJobs.length > 0 ? totalViews / userJobs.length : 0
          });
          
          setLoading(false);
        } catch (error) {
          console.error('Error loading jobs:', error);
          setLoading(false);
        }
      };
      
      loadJobs();
    }
  }, [session, status]);

  const incrementViews = (jobId: string) => {
    // Simulate a user viewing the job
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, views: job.views + 1 };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    
    // Update in localStorage
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const updatedAllJobs = allJobs.map((job: Job) => {
      if (job.id === jobId) {
        return { ...job, views: job.views + 1 };
      }
      return job;
    });
    
    localStorage.setItem('jobs', JSON.stringify(updatedAllJobs));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalViews: prev.totalViews + 1,
      averageViewsPerJob: (prev.totalViews + 1) / prev.totalJobs
    }));
  };

  const simulateApplication = (jobId: string) => {
    // Simulate a user applying to the job
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, applications: job.applications + 1 };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    
    // Update in localStorage
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const updatedAllJobs = allJobs.map((job: Job) => {
      if (job.id === jobId) {
        return { ...job, applications: job.applications + 1 };
      }
      return job;
    });
    
    localStorage.setItem('jobs', JSON.stringify(updatedAllJobs));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalApplications: prev.totalApplications + 1
    }));
  };

  const deleteJob = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      // Remove from state
      const jobToDelete = jobs.find(job => job.id === jobId);
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      
      // Remove from localStorage
      const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const updatedAllJobs = allJobs.filter((job: Job) => job.id !== jobId);
      localStorage.setItem('jobs', JSON.stringify(updatedAllJobs));
      
      // Update stats
      if (jobToDelete) {
        setStats(prev => ({
          totalJobs: prev.totalJobs - 1,
          totalViews: prev.totalViews - jobToDelete.views,
          totalApplications: prev.totalApplications - jobToDelete.applications,
          averageViewsPerJob: prev.totalJobs > 1 
            ? (prev.totalViews - jobToDelete.views) / (prev.totalJobs - 1) 
            : 0
        }));
      }
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Job Dashboard</h1>
              <p className="text-slate-300">
                Manage your job postings and track applicant engagement
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/dashboard" className="text-slate-300 hover:text-white">
                Main Dashboard
              </Link>
              <Link href="/jobs/create" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all">
                Create New Job
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Total Jobs</h3>
              <p className="text-3xl font-bold text-blue-400">{stats.totalJobs}</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-green-400">{stats.totalViews}</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Applications</h3>
              <p className="text-3xl font-bold text-purple-400">{stats.totalApplications}</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Avg. Views/Job</h3>
              <p className="text-3xl font-bold text-orange-400">{stats.averageViewsPerJob.toFixed(1)}</p>
            </div>
          </div>

          {/* Job Listings */}
          <div className="bg-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Your Job Postings</h2>
            
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-300 mb-4">You haven't posted any jobs yet.</p>
                <Link href="/jobs/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                  Create Your First Job Posting
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="pb-3 text-slate-300">Job Title</th>
                      <th className="pb-3 text-slate-300">Company</th>
                      <th className="pb-3 text-slate-300">Posted</th>
                      <th className="pb-3 text-slate-300">Views</th>
                      <th className="pb-3 text-slate-300">Applications</th>
                      <th className="pb-3 text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => {
                      const postedDate = new Date(job.postedAt);
                      const formattedDate = postedDate.toLocaleDateString();
                      
                      return (
                        <tr key={job.id} className="border-b border-slate-600 hover:bg-slate-600/30">
                          <td className="py-4 text-white">{job.title}</td>
                          <td className="py-4 text-slate-300">{job.company}</td>
                          <td className="py-4 text-slate-300">{formattedDate}</td>
                          <td className="py-4 text-green-400">{job.views}</td>
                          <td className="py-4 text-purple-400">{job.applications}</td>
                          <td className="py-4 space-x-2">
                            <button 
                              onClick={() => incrementViews(job.id)}
                              className="text-blue-400 hover:text-blue-300"
                              title="Simulate View"
                            >
                              👁️
                            </button>
                            <button 
                              onClick={() => simulateApplication(job.id)}
                              className="text-green-400 hover:text-green-300"
                              title="Simulate Application"
                            >
                              📝
                            </button>
                            <button 
                              onClick={() => deleteJob(job.id)}
                              className="text-red-400 hover:text-red-300"
                              title="Delete Job"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}