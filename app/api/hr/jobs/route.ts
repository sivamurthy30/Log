import { NextRequest, NextResponse } from 'next/server';

// Mock data for jobs
let jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: '$120,000 - $160,000',
    description: 'We are looking for a senior frontend developer to join our engineering team...',
    requirements: '5+ years of React experience, TypeScript, CSS/SCSS',
    applicants: 24,
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'full-time',
    salary: '$80,000 - $100,000',
    description: 'Lead our marketing initiatives and drive brand awareness...',
    requirements: '3+ years marketing experience, digital marketing skills',
    applicants: 18,
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Chicago, IL',
    type: 'full-time',
    salary: '$60,000 - $80,000 + commission',
    description: 'Drive sales growth and build relationships with clients...',
    requirements: '2+ years sales experience, excellent communication',
    applicants: 32,
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 4,
    title: 'HR Specialist',
    department: 'Human Resources',
    location: 'Remote',
    type: 'full-time',
    salary: '$70,000 - $90,000',
    description: 'Support HR operations and employee relations...',
    requirements: 'HR degree or equivalent experience, strong interpersonal skills',
    applicants: 15,
    status: 'active',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
];

// GET /api/hr/jobs - Get all jobs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const department = searchParams.get('department');

    let filteredJobs = jobs;

    if (status) {
      filteredJobs = filteredJobs.filter(job => job.status === status);
    }

    if (department) {
      filteredJobs = filteredJobs.filter(job => job.department.toLowerCase() === department.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      data: filteredJobs,
      total: filteredJobs.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST /api/hr/jobs - Create a new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newJob = {
      id: jobs.length + 1,
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      salary: body.salary || 'Not specified',
      description: body.description,
      requirements: body.requirements,
      applicants: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    jobs.push(newJob);

    return NextResponse.json({
      success: true,
      data: newJob,
      message: 'Job created successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
