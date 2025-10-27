import { NextRequest, NextResponse } from 'next/server';
import {
  readUsersData,
  writeUsersData,
  getUserIp
} from '../../../utils/redis';

export interface MembershipApplication {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  additionalInfo: string;
  ipAddress: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phoneNumber, email, additionalInfo } = body;

    // Validate input
    if (!name || !phoneNumber || !email) {
      return NextResponse.json(
        { error: 'Name, phone number, and email are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const userIp = getUserIp(request);
    const users = await readUsersData();

    // Create application ID
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create application object
    const application: MembershipApplication = {
      id: applicationId,
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      additionalInfo: additionalInfo?.trim() || '',
      ipAddress: userIp,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    // Store in users data structure (we can create a separate applications structure later)
    if (!users[userIp]) {
      users[userIp] = {
        name: application.name,
        role: 'Applicant',
        committee: 'None',
        tags: ['applicant'],
        votes: {},
        comments: [],
        proposals: []
      };
    }

    // Add application to user data
    if (!(users[userIp] as any).applications) {
      (users[userIp] as any).applications = [];
    }
    (users[userIp] as any).applications.push(application);

    // Save to Redis
    await writeUsersData(users);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your application! We will be in touch soon.',
      applicationId: application.id
    });

  } catch (error) {
    console.error('Error submitting membership application:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const users = await readUsersData();
    const applications: MembershipApplication[] = [];

    // Collect all applications
    Object.values(users).forEach((user: any) => {
      if (user.applications && Array.isArray(user.applications)) {
        applications.push(...user.applications);
      }
    });

    // Sort by submission date (most recent first)
    applications.sort((a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return NextResponse.json({ applications });

  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
