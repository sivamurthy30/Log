'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'accepted';
}

export default function MyApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockApplications: JobApplication[] = [
          {
            id: '1',
            jobId: '1',
            jobTitle: 'Frontend Developer',
            company: 'Tech Solutions Inc.',
            appliedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            status: 'interview'
          },
          {
            id: '2',
            jobId: '2',
            jobTitle: 'Backend Engineer',
            company: 'Data Systems Corp',
            appliedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            status: 'pending'
          },
          {
            id: '3',
            jobId: '3',
            jobTitle: 'UX Designer',
            company: 'Creative Minds',
            appliedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
            status: 'rejected'
          }
        ];
        
        setApplications(mockApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">Pending</span>;
      case 'reviewed':
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Reviewed</span>;
      case 'interview':
        return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Interview</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded">Rejected</span>;
      case 'accepted':
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">Accepted</span>;
      default:
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
              <p className="text-slate-300">
                Track your job applications
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/jobs/landing"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all"
              >
                Browse Jobs
              </Link>
              <Link
                href="/dashboard"
                className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-all"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Applications List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-white text-xl">Loading applications...</div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-white text-xl">You haven't applied to any jobs yet</div>
              <Link
                href="/jobs/landing"
                className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-700 text-slate-300 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 rounded-tl-lg">Job</th>
                    <th className="px-6 py-3">Company</th>
                    <th className="px-6 py-3">Applied On</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {applications.map(application => (
                    <tr key={application.id} className="bg-slate-800 hover:bg-slate-700 transition-all">
                      <td className="px-6 py-4 text-white">{application.jobTitle}</td>
                      <td className="px-6 py-4 text-slate-300">{application.company}</td>
                      <td className="px-6 py-4 text-slate-300">{new Date(application.appliedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{getStatusBadge(application.status)}</td>
                      <td className="px-6 py-4">
                        <button 
                          className="text-blue-400 hover:text-blue-300 transition-all"
                          onClick={() => alert(`View details for application ${application.id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Application Stats */}
          {applications.length > 0 && (
            <div className="mt-8 p-6 bg-slate-700 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Application Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Total Applications</p>
                  <p className="text-white text-2xl font-bold">{applications.length}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Pending</p>
                  <p className="text-yellow-400 text-2xl font-bold">
                    {applications.filter(app => app.status === 'pending').length}
                  </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Interviews</p>
                  <p className="text-purple-400 text-2xl font-bold">
                    {applications.filter(app => app.status === 'interview').length}
                  </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Response Rate</p>
                  <p className="text-blue-400 text-2xl font-bold">
                    {Math.round((applications.filter(app => app.status !== 'pending').length / applications.length) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}