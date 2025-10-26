import { NextRequest, NextResponse } from 'next/server';
import { readUsersData } from '../../../utils/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const proposalId = searchParams.get('proposalId');
    const questionId = searchParams.get('questionId');

    const users = await readUsersData();

    // Collect all votes with user information
    const allVotes: Array<{
      userName: string;
      userRole: string;
      questionId: string;
      selectedOptions: string[];
      justification: string;
      timestamp: string;
    }> = [];

    Object.values(users).forEach((user) => {
      Object.entries(user.votes || {}).forEach(([voteKey, vote]) => {
        // Filter by proposalId and questionId if provided
        if (proposalId && !voteKey.startsWith(`${proposalId}-`)) {
          return;
        }
        if (questionId && vote.questionId !== questionId) {
          return;
        }

        allVotes.push({
          userName: user.name,
          userRole: user.role,
          questionId: vote.questionId,
          selectedOptions: vote.selectedOptions,
          justification: vote.justification,
          timestamp: vote.timestamp
        });
      });
    });

    // Sort by timestamp (most recent first)
    allVotes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({ votes: allVotes });

  } catch (error) {
    console.error('Error fetching all votes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
