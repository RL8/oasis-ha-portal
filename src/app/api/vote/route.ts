import { NextRequest, NextResponse } from 'next/server';
import { 
  readUsersData, 
  writeUsersData, 
  readProposalsData, 
  writeProposalsData,
  getUserIp,
  calculateVoteTotals
} from '../../../utils/data';
import { validateVote } from '../../../types/voting';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proposalId, choice, justification, firstName, lastName } = body;

    // Validate input
    if (!proposalId || !choice || !justification || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!validateVote(choice, justification)) {
      return NextResponse.json(
        { error: 'Invalid vote choice or missing justification' },
        { status: 400 }
      );
    }

    const userIp = getUserIp(request);
    const users = await readUsersData();
    const proposals = await readProposalsData();

    // Check if proposal exists and is active
    const proposal = proposals[proposalId];
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    if (proposal.status !== 'active') {
      return NextResponse.json(
        { error: 'Proposal is not active for voting' },
        { status: 400 }
      );
    }

    // Check if voting is locked in
    const isLockedIn = new Date() > new Date(proposal.lockInDate);
    if (isLockedIn) {
      return NextResponse.json(
        { error: 'Voting has closed' },
        { status: 400 }
      );
    }

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

    // Update vote
    users[userIp].votes[proposalId] = {
      choice,
      justification,
      timestamp: new Date().toISOString()
    };

    // Recalculate vote totals
    proposals[proposalId].votes = calculateVoteTotals(proposalId, users);

    // Save data
    await writeUsersData(users);
    await writeProposalsData(proposals);

    return NextResponse.json({
      success: true,
      vote: users[userIp].votes[proposalId],
      totals: proposals[proposalId].votes
    });

  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userIp = getUserIp(request);
    const users = await readUsersData();
    const proposals = await readProposalsData();

    const user = users[userIp];
    const userVotes = user ? user.votes : {};

    return NextResponse.json({
      userVotes,
      proposals: Object.values(proposals)
    });

  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
