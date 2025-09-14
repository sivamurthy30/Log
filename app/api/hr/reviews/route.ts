import { NextRequest, NextResponse } from 'next/server';

// Mock data for reviews
let reviews = [
  {
    id: 1,
    employeeId: 101,
    name: 'Sarah Johnson',
    position: 'Software Engineer',
    department: 'Engineering',
    rating: 5,
    review: 'Great company culture and excellent work-life balance. The team is supportive and the projects are challenging.',
    date: '2024-01-10',
    status: 'published'
  },
  {
    id: 2,
    employeeId: 102,
    name: 'Michael Chen',
    position: 'Product Manager',
    department: 'Product',
    rating: 4,
    review: 'Good opportunities for growth. Management is responsive to feedback. Benefits could be better.',
    date: '2024-01-08',
    status: 'published'
  },
  {
    id: 3,
    employeeId: 103,
    name: 'Emily Rodriguez',
    position: 'UX Designer',
    department: 'Design',
    rating: 5,
    review: 'Amazing team collaboration and creative freedom. Love the flexible working arrangements.',
    date: '2024-01-05',
    status: 'published'
  },
  {
    id: 4,
    employeeId: 104,
    name: 'David Kim',
    position: 'Data Analyst',
    department: 'Analytics',
    rating: 3,
    review: 'Interesting projects but sometimes the workload can be overwhelming. Good learning opportunities.',
    date: '2024-01-03',
    status: 'published'
  },
  {
    id: 5,
    employeeId: 105,
    name: 'Lisa Wang',
    position: 'Marketing Specialist',
    department: 'Marketing',
    rating: 4,
    review: 'Creative environment with lots of autonomy. Great team dynamics and professional development opportunities.',
    date: '2024-01-01',
    status: 'pending'
  },
  {
    id: 6,
    employeeId: 106,
    name: 'James Wilson',
    position: 'Sales Manager',
    department: 'Sales',
    rating: 4,
    review: 'Competitive environment with clear goals. Good commission structure and supportive management.',
    date: '2023-12-28',
    status: 'pending'
  }
];

// GET /api/hr/reviews - Get all reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const department = searchParams.get('department');
    const limit = searchParams.get('limit');

    let filteredReviews = reviews;

    if (status) {
      filteredReviews = filteredReviews.filter(review => review.status === status);
    }

    if (department) {
      filteredReviews = filteredReviews.filter(review => 
        review.department.toLowerCase() === department.toLowerCase()
      );
    }

    if (limit) {
      const limitNum = parseInt(limit);
      filteredReviews = filteredReviews.slice(0, limitNum);
    }

    // Calculate statistics
    const totalReviews = reviews.length;
    const publishedReviews = reviews.filter(r => r.status === 'published');
    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const averageRating = publishedReviews.length > 0 
      ? (publishedReviews.reduce((sum, r) => sum + r.rating, 0) / publishedReviews.length).toFixed(1)
      : 0;

    return NextResponse.json({
      success: true,
      data: filteredReviews,
      statistics: {
        total: totalReviews,
        published: publishedReviews.length,
        pending: pendingReviews.length,
        averageRating: parseFloat(averageRating)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST /api/hr/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newReview = {
      id: reviews.length + 1,
      employeeId: body.employeeId,
      name: body.name,
      position: body.position,
      department: body.department,
      rating: body.rating,
      review: body.review,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    reviews.push(newReview);

    return NextResponse.json({
      success: true,
      data: newReview,
      message: 'Review submitted successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
