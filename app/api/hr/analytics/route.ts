import { NextRequest, NextResponse } from 'next/server';

// Mock analytics data
const analyticsData = {
  overview: {
    employeeSatisfaction: 87,
    retentionRate: 94,
    trainingCompletion: 78,
    performanceScore: 4.1,
    totalEmployees: 524,
    activeDepartments: 24,
    pendingRequests: 18,
    monthlyPayroll: 2400000
  },
  departmentPerformance: [
    {
      department: 'Engineering',
      satisfaction: 92,
      retention: 96,
      performance: 4.3,
      employeeCount: 156,
      turnoverRate: 4
    },
    {
      department: 'Marketing',
      satisfaction: 85,
      retention: 89,
      performance: 4.1,
      employeeCount: 45,
      turnoverRate: 11
    },
    {
      department: 'Sales',
      satisfaction: 88,
      retention: 91,
      performance: 4.0,
      employeeCount: 78,
      turnoverRate: 9
    },
    {
      department: 'HR',
      satisfaction: 90,
      retention: 95,
      performance: 4.2,
      employeeCount: 23,
      turnoverRate: 5
    },
    {
      department: 'Finance',
      satisfaction: 83,
      retention: 87,
      performance: 3.9,
      employeeCount: 34,
      turnoverRate: 13
    },
    {
      department: 'Operations',
      satisfaction: 86,
      retention: 92,
      performance: 4.0,
      employeeCount: 67,
      turnoverRate: 8
    },
    {
      department: 'Design',
      satisfaction: 89,
      retention: 93,
      performance: 4.2,
      employeeCount: 28,
      turnoverRate: 7
    },
    {
      department: 'Product',
      satisfaction: 91,
      retention: 94,
      performance: 4.3,
      employeeCount: 41,
      turnoverRate: 6
    }
  ],
  trends: {
    satisfaction: [
      { month: 'Jan', value: 85 },
      { month: 'Feb', value: 86 },
      { month: 'Mar', value: 87 },
      { month: 'Apr', value: 88 },
      { month: 'May', value: 87 },
      { month: 'Jun', value: 89 }
    ],
    retention: [
      { month: 'Jan', value: 92 },
      { month: 'Feb', value: 93 },
      { month: 'Mar', value: 94 },
      { month: 'Apr', value: 93 },
      { month: 'May', value: 94 },
      { month: 'Jun', value: 95 }
    ],
    performance: [
      { month: 'Jan', value: 3.9 },
      { month: 'Feb', value: 4.0 },
      { month: 'Mar', value: 4.1 },
      { month: 'Apr', value: 4.0 },
      { month: 'May', value: 4.1 },
      { month: 'Jun', value: 4.2 }
    ]
  },
  recentActivity: [
    {
      id: 1,
      type: 'new_employee',
      message: 'New employee onboarded',
      details: 'John Smith joined Engineering team',
      timestamp: '2024-01-12T10:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'leave_request',
      message: 'Leave request pending',
      details: 'Sarah Johnson requested 5 days off',
      timestamp: '2024-01-12T08:15:00Z',
      status: 'pending'
    },
    {
      id: 3,
      type: 'performance_review',
      message: 'Performance review completed',
      details: 'Michael Chen - Q4 2023 review',
      timestamp: '2024-01-11T16:45:00Z',
      status: 'completed'
    },
    {
      id: 4,
      type: 'training',
      message: 'Training session completed',
      details: '15 employees completed cybersecurity training',
      timestamp: '2024-01-11T14:20:00Z',
      status: 'completed'
    },
    {
      id: 5,
      type: 'promotion',
      message: 'Employee promoted',
      details: 'Emily Rodriguez promoted to Senior UX Designer',
      timestamp: '2024-01-10T11:00:00Z',
      status: 'completed'
    }
  ]
};

// GET /api/hr/analytics - Get HR analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'overview') {
      return NextResponse.json({
        success: true,
        data: analyticsData.overview
      });
    }

    if (type === 'departments') {
      return NextResponse.json({
        success: true,
        data: analyticsData.departmentPerformance
      });
    }

    if (type === 'trends') {
      return NextResponse.json({
        success: true,
        data: analyticsData.trends
      });
    }

    if (type === 'activity') {
      return NextResponse.json({
        success: true,
        data: analyticsData.recentActivity
      });
    }

    // Return all analytics data if no specific type requested
    return NextResponse.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
