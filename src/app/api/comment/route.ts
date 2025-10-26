import { NextRequest, NextResponse } from 'next/server';
import { 
  readUsersData, 
  writeUsersData, 
  readCommentsData, 
  writeCommentsData,
  getUserIp
} from '../../../utils/data';
import { generateCommentId } from '../../../types/voting';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proposalId, text, firstName, lastName } = body;

    // Validate input
    if (!proposalId || !text || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!text.trim()) {
      return NextResponse.json(
        { error: 'Comment text cannot be empty' },
        { status: 400 }
      );
    }

    const userIp = getUserIp(request);
    const users = await readUsersData();
    const comments = await readCommentsData();

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

    // Create comment
    const commentId = generateCommentId();
    const comment = {
      id: commentId,
      proposalId,
      userIp,
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    comments[commentId] = comment;
    users[userIp].comments.push(commentId);

    // Save data (only in development)
    try {
      await writeUsersData(users);
      await writeCommentsData(comments);
    } catch (error) {
      // In production (Vercel), file writes are not allowed
      // Return success but don't persist the data
      console.log('File write not allowed in production environment');
    }

    return NextResponse.json({
      success: true,
      comment,
      message: process.env.NODE_ENV === 'production' ? 'Comment posted (demo mode - not persisted)' : 'Comment posted successfully'
    });

  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const proposalId = searchParams.get('proposalId');

    const comments = await readCommentsData();

    if (proposalId) {
      const proposalComments = Object.values(comments).filter(
        comment => comment.proposalId === proposalId
      );
      return NextResponse.json(proposalComments);
    }

    return NextResponse.json(Object.values(comments));

  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
