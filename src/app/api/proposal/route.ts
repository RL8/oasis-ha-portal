import { NextRequest, NextResponse } from 'next/server';
import { 
  readUsersData, 
  writeUsersData, 
  readProposalsData, 
  writeProposalsData,
  getUserIp
} from '../../../utils/data';
import { generateId } from '../../../types/voting';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, firstName, lastName } = body;

    // Validate input
    if (!title || !description || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!title.trim() || !description.trim()) {
      return NextResponse.json(
        { error: 'Title and description cannot be empty' },
        { status: 400 }
      );
    }

    const userIp = getUserIp(request);
    const users = await readUsersData();
    const proposals = await readProposalsData();

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

    // Create proposal
    const proposalId = generateId();
    const proposal = {
      id: proposalId,
      title: title.trim(),
      description: description.trim(),
      status: 'draft' as const,
      createdBy: userIp,
      createdAt: new Date().toISOString(),
      lockInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      votes: {
        yes: 0,
        no: 0,
        abstain: 0
      }
    };

    proposals[proposalId] = proposal;
    users[userIp].proposals.push(proposalId);

    // Save data
    await writeUsersData(users);
    await writeProposalsData(proposals);

    return NextResponse.json({
      success: true,
      proposal
    });

  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const proposals = await readProposalsData();
    return NextResponse.json(Object.values(proposals));

  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { proposalId, status } = body;

    // Validate input
    if (!proposalId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['draft', 'active'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const proposals = await readProposalsData();
    const proposal = proposals[proposalId];

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    proposal.status = status;
    await writeProposalsData(proposals);

    return NextResponse.json({
      success: true,
      proposal
    });

  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
