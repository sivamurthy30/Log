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

export default function JobsLandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    jobType: '',
    experienceLevel: '',
    industry: ''
  });

  // Redirect if not logged in
  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const mockJobs: Job[] = [
          {
            id: '1',
            title: 'Frontend Developer',
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            description: 'We are looking for a skilled frontend developer to join our team.',
            requirements: 'React, TypeScript, CSS, 3+ years experience',
            salary: '$90,000 - $120,000',
            contactEmail: 'jobs@techsolutions.com',
            jobType: 'full-time',
            industry: 'Technology',
            experienceLevel: 'mid',
            postedBy: 'HR Manager',
            postedAt: new Date().toISOString(),
            views: 45,
            applications: 12
          },
          {
            id: '2',
            title: 'Backend Engineer',
            company: 'Data Systems Corp',
            location: 'Remote',
            description: 'Join our backend team to build scalable APIs and services.',
            requirements: 'Node.js, Python, AWS, 2+ years experience',
            salary: '$85,000 - $110,000',
            contactEmail: 'careers@datasystems.com',
            jobType: 'full-time',
            industry: 'Technology',
            experienceLevel: 'mid',
            postedBy: 'Technical Director',
            postedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            views: 32,
            applications: 8
          },
          {
            id: '3',
            title: 'UX Designer',
            company: 'Creative Minds',
            location: 'New York, NY',
            description: 'Design intuitive user experiences for our clients.',
            requirements: 'Figma, Adobe XD, User Research, 1+ years experience',
            salary: '$70,000 - $90,000',
            contactEmail: 'design@creativeminds.com',
            jobType: 'part-time',
            industry: 'Design',
            experienceLevel: 'entry',
            postedBy: 'Design Lead',
            postedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            views: 28,
            applications: 15
          }
        ];
        
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesJobType = filterOptions.jobType ? job.jobType === filterOptions.jobType : true;
    const matchesExperience = filterOptions.experienceLevel ? job.experienceLevel === filterOptions.experienceLevel : true;
    const matchesIndustry = filterOptions.industry ? job.industry === filterOptions.industry : true;
    
    return matchesSearch && matchesJobType && matchesExperience && matchesIndustry;
  });

  const handleApply = (jobId: string) => {
    // In a real app, this would submit an application
    alert(`Applied to job ${jobId}! In a real app, this would submit your application.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Job Listings</h1>
              <p className="text-slate-300">
                Find your next opportunity
              </p>
            </div>
            <Link
              href="/dashboard"
              className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-all"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 p-6 bg-slate-700 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterOptions.jobType}
                  onChange={(e) => setFilterOptions({...filterOptions, jobType: e.target.value})}
                >
                  <option value="">All Job Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
                <select
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterOptions.experienceLevel}
                  onChange={(e) => setFilterOptions({...filterOptions, experienceLevel: e.target.value})}
                >
                  <option value="">All Experience Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-white text-xl">Loading jobs...</div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-white text-xl">No jobs found matching your criteria</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                      <p className="text-slate-300 mb-1">{job.company} • {job.location}</p>
                      <p className="text-blue-400 text-sm mb-3">{job.jobType} • {job.experienceLevel} level • {job.industry}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">{job.salary}</p>
                      <p className="text-slate-400 text-sm">
                        Posted: {new Date(job.postedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="border-t border-slate-600 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-slate-400 text-sm">
                        <span className="mr-4">{job.views} views</span>
                        <span>{job.applications} applications</span>
                      </div>
                      <button
                        onClick={() => handleApply(job.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}