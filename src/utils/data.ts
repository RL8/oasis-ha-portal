import { promises as fs } from 'fs';
import path from 'path';
import { UsersData, ProposalsData, CommentsData } from '../types/voting';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// Safe JSON read operations
export const readUsersData = async (): Promise<UsersData> => {
  try {
    const filePath = path.join(DATA_DIR, 'users.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users data:', error);
    return {};
  }
};

export const readProposalsData = async (): Promise<ProposalsData> => {
  try {
    const filePath = path.join(DATA_DIR, 'proposals.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading proposals data:', error);
    return {};
  }
};

export const readCommentsData = async (): Promise<CommentsData> => {
  try {
    const filePath = path.join(DATA_DIR, 'comments.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading comments data:', error);
    return {};
  }
};

// Safe JSON write operations
export const writeUsersData = async (data: UsersData): Promise<void> => {
  try {
    const filePath = path.join(DATA_DIR, 'users.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing users data:', error);
    throw error;
  }
};

export const writeProposalsData = async (data: ProposalsData): Promise<void> => {
  try {
    const filePath = path.join(DATA_DIR, 'proposals.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing proposals data:', error);
    throw error;
  }
};

export const writeCommentsData = async (data: CommentsData): Promise<void> => {
  try {
    const filePath = path.join(DATA_DIR, 'comments.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing comments data:', error);
    throw error;
  }
};

// Helper function to get user IP from request
export const getUserIp = (req: Request): string => {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const remoteAddr = req.headers.get('x-remote-addr');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (remoteAddr) {
    return remoteAddr;
  }
  
  // Fallback for development
  return '127.0.0.1';
};

// Calculate vote totals for a proposal
export const calculateVoteTotals = (proposalId: string, users: UsersData) => {
  const totals = { yes: 0, no: 0, abstain: 0 };
  
  Object.values(users).forEach(user => {
    const vote = user.votes[proposalId];
    if (vote) {
      totals[vote.choice]++;
    }
  });
  
  return totals;
};
