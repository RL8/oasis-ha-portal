import { NextRequest, NextResponse } from 'next/server';
import { 
  readUsersData, 
  writeUsersData, 
  readProposalsData, 
  writeProposalsData,
  readCommentsData
} from '../../../utils/data';

export async function GET() {
  try {
    const users = await readUsersData();
    const proposals = await readProposalsData();
    const comments = await readCommentsData();

    return NextResponse.json({
      users: Object.values(users),
      proposals: Object.values(proposals),
      comments: Object.values(comments)
    });

  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, passcode, ...data } = body;

    // Verify admin passcode
    if (passcode !== '6526') {
      return NextResponse.json(
        { error: 'Invalid admin passcode' },
        { status: 401 }
      );
    }

    const users = await readUsersData();
    const proposals = await readProposalsData();

    switch (action) {
      case 'updateProposalStatus':
        const { proposalId, status } = data;
        if (!proposalId || !['draft', 'active'].includes(status)) {
          return NextResponse.json(
            { error: 'Invalid proposal ID or status' },
            { status: 400 }
          );
        }

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

      case 'updateUserRole':
        const { userIp, role, committee, tags } = data;
        if (!userIp || !users[userIp]) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }

        if (role) users[userIp].role = role;
        if (committee) users[userIp].committee = committee;
        if (tags) users[userIp].tags = tags;

        await writeUsersData(users);

        return NextResponse.json({
          success: true,
          user: users[userIp]
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error processing admin action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
