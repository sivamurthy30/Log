import { NextRequest, NextResponse } from 'next/server';

// Mock data for candidates
let candidates = [
  {
    id: 1,
    name: 'Alex Thompson',
    position: 'Offshore Engineer',
    experience: '5 years',
    status: 'shortlisted',
    appliedDate: '2024-01-10',
    skills: ['Drilling', 'Safety', 'Maintenance'],
    email: 'alex.thompson@email.com',
    phone: '+1-555-0123',
    location: 'Houston, TX',
    resume: 'alex_thompson_resume.pdf',
    jobId: 1
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    position: 'Marine Technician',
    experience: '3 years',
    status: 'new',
    appliedDate: '2024-01-11',
    skills: ['Navigation', 'Equipment', 'Safety'],
    email: 'maria.rodriguez@email.com',
    phone: '+1-555-0124',
    location: 'Miami, FL',
    resume: 'maria_rodriguez_resume.pdf',
    jobId: 2
  },
  {
    id: 3,
    name: 'James Wilson',
    position: 'Rig Supervisor',
    experience: '8 years',
    status: 'interviewed',
    appliedDate: '2024-01-09',
    skills: ['Leadership', 'Operations', 'Safety'],
    email: 'james.wilson@email.com',
    phone: '+1-555-0125',
    location: 'New Orleans, LA',
    resume: 'james_wilson_resume.pdf',
    jobId: 3
  },
  {
    id: 4,
    name: 'Sarah Chen',
    position: 'Environmental Specialist',
    experience: '4 years',
    status: 'shortlisted',
    appliedDate: '2024-01-08',
    skills: ['Compliance', 'Monitoring', 'Reporting'],
    email: 'sarah.chen@email.com',
    phone: '+1-555-0126',
    location: 'San Francisco, CA',
    resume: 'sarah_chen_resume.pdf',
    jobId: 4
  },
  {
    id: 5,
    name: 'David Kumar',
    position: 'Mechanical Engineer',
    experience: '6 years',
    status: 'new',
    appliedDate: '2024-01-07',
    skills: ['Maintenance', 'Troubleshooting', 'Safety'],
    email: 'david.kumar@email.com',
    phone: '+1-555-0127',
    location: 'Dallas, TX',
    resume: 'david_kumar_resume.pdf',
    jobId: 1
  }
];

// GET /api/hr/candidates - Get all candidates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const jobId = searchParams.get('jobId');
    const limit = searchParams.get('limit');

    let filteredCandidates = candidates;

    if (status) {
      filteredCandidates = filteredCandidates.filter(candidate => candidate.status === status);
    }

    if (jobId) {
      filteredCandidates = filteredCandidates.filter(candidate => candidate.jobId === parseInt(jobId));
    }

    if (limit) {
      const limitNum = parseInt(limit);
      filteredCandidates = filteredCandidates.slice(0, limitNum);
    }

    // Calculate statistics
    const totalCandidates = candidates.length;
    const newCandidates = candidates.filter(c => c.status === 'new').length;
    const shortlistedCandidates = candidates.filter(c => c.status === 'shortlisted').length;
    const interviewedCandidates = candidates.filter(c => c.status === 'interviewed').length;
    const hiredCandidates = candidates.filter(c => c.status === 'hired').length;

    return NextResponse.json({
      success: true,
      data: filteredCandidates,
      statistics: {
        total: totalCandidates,
        new: newCandidates,
        shortlisted: shortlistedCandidates,
        interviewed: interviewedCandidates,
        hired: hiredCandidates
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch candidates' },
      { status: 500 }
    );
  }
}

// POST /api/hr/candidates - Create a new candidate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newCandidate = {
      id: candidates.length + 1,
      name: body.name,
      position: body.position,
      experience: body.experience,
      status: 'new',
      appliedDate: new Date().toISOString().split('T')[0],
      skills: body.skills || [],
      email: body.email,
      phone: body.phone,
      location: body.location,
      resume: body.resume,
      jobId: body.jobId
    };

    candidates.push(newCandidate);

    return NextResponse.json({
      success: true,
      data: newCandidate,
      message: 'Candidate added successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create candidate' },
      { status: 500 }
    );
  }
}
