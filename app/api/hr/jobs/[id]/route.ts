import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
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

// GET /api/hr/jobs/[id] - Get a specific job
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = parseInt(params.id);
    const job = jobs.find(j => j.id === jobId);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

// PUT /api/hr/jobs/[id] - Update a specific job
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = parseInt(params.id);
    const body = await request.json();
    
    const jobIndex = jobs.findIndex(j => j.id === jobId);
    
    if (jobIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    jobs[jobIndex] = {
      ...jobs[jobIndex],
      ...body,
      id: jobId,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    return NextResponse.json({
      success: true,
      data: jobs[jobIndex],
      message: 'Job updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE /api/hr/jobs/[id] - Delete a specific job
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = parseInt(params.id);
    const jobIndex = jobs.findIndex(j => j.id === jobId);
    
    if (jobIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    const deletedJob = jobs.splice(jobIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedJob,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
