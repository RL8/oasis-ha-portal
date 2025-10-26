import { NextRequest, NextResponse } from 'next/server';
import {
  readUsersData,
  writeUsersData,
  readProposalRequestsData,
  writeProposalRequestsData,
  getUserIp
} from '../../../utils/data';
import { generateRequestId } from '../../../types/voting';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { requestText, firstName, lastName } = body;

    // Validate input
    if (!requestText || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!requestText.trim()) {
      return NextResponse.json(
        { error: 'Request text cannot be empty' },
        { status: 400 }
      );
    }

    const userIp = getUserIp(request);
    const users = await readUsersData();
    const proposalRequests = await readProposalRequestsData();

    // Create or update user
    const fullName = `${firstName} ${lastName}`;
    if (!users[userIp]) {
      users[userIp] = {
        name: fullName,
        role: 'General Member',
        committee: 'None',
        tags: [],
        votes: {},
        comments: [],
        proposals: []
      };
    } else {
      // Update name if provided
      users[userIp].name = fullName;
    }

    // Create proposal request
    const requestId = generateRequestId();
    const proposalRequest = {
      id: requestId,
      requestText: requestText.trim(),
      status: 'pending' as const,
      createdBy: userIp,
      createdAt: new Date().toISOString()
    };

    proposalRequests[requestId] = proposalRequest;

    // Save data (only in development)
    try {
      await writeUsersData(users);
      await writeProposalRequestsData(proposalRequests);
    } catch (error) {
      // In production (Vercel), file writes are not allowed
      // Return success but don't persist the data
      console.log('File write not allowed in production environment');
    }

    return NextResponse.json({
      success: true,
      proposalRequest,
      message: process.env.NODE_ENV === 'production'
        ? 'Proposal request submitted (demo mode - not persisted)'
        : 'Proposal request submitted successfully. An admin will review it shortly.'
    });

  } catch (error) {
    console.error('Error submitting proposal request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const proposalRequests = await readProposalRequestsData();

    if (status) {
      const filteredRequests = Object.values(proposalRequests).filter(
        req => req.status === status
      );
      return NextResponse.json(filteredRequests);
    }

    return NextResponse.json(Object.values(proposalRequests));

  } catch (error) {
    console.error('Error fetching proposal requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
