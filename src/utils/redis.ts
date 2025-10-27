import { Redis } from '@upstash/redis';
import { UsersData, ProposalsData, CommentsData, ProposalRequestsData } from '../types/voting';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Redis keys
const KEYS = {
  USERS: 'oha:users',
  PROPOSALS: 'oha:proposals',
  COMMENTS: 'oha:comments',
  PROPOSAL_REQUESTS: 'oha:proposal-requests',
};

// Read operations
export const readUsersData = async (): Promise<UsersData> => {
  try {
    const data = await redis.get<UsersData>(KEYS.USERS);
    return data || {};
  } catch (error) {
    console.error('Error reading users data from Redis:', error);
    return {};
  }
};

export const readProposalsData = async (): Promise<ProposalsData> => {
  try {
    const data = await redis.get<ProposalsData>(KEYS.PROPOSALS);
    return data || {};
  } catch (error) {
    console.error('Error reading proposals data from Redis:', error);
    return {};
  }
};

export const readCommentsData = async (): Promise<CommentsData> => {
  try {
    const data = await redis.get<CommentsData>(KEYS.COMMENTS);
    return data || {};
  } catch (error) {
    console.error('Error reading comments data from Redis:', error);
    return {};
  }
};

export const readProposalRequestsData = async (): Promise<ProposalRequestsData> => {
  try {
    const data = await redis.get<ProposalRequestsData>(KEYS.PROPOSAL_REQUESTS);
    return data || {};
  } catch (error) {
    console.error('Error reading proposal requests data from Redis:', error);
    return {};
  }
};

// Write operations
export const writeUsersData = async (data: UsersData): Promise<void> => {
  try {
    await redis.set(KEYS.USERS, data);
  } catch (error) {
    console.error('Error writing users data to Redis:', error);
    throw error;
  }
};

export const writeProposalsData = async (data: ProposalsData): Promise<void> => {
  try {
    await redis.set(KEYS.PROPOSALS, data);
  } catch (error) {
    console.error('Error writing proposals data to Redis:', error);
    throw error;
  }
};

export const writeCommentsData = async (data: CommentsData): Promise<void> => {
  try {
    await redis.set(KEYS.COMMENTS, data);
  } catch (error) {
    console.error('Error writing comments data to Redis:', error);
    throw error;
  }
};

export const writeProposalRequestsData = async (data: ProposalRequestsData): Promise<void> => {
  try {
    await redis.set(KEYS.PROPOSAL_REQUESTS, data);
  } catch (error) {
    console.error('Error writing proposal requests data to Redis:', error);
    throw error;
  }
};

// Helper function to get user IP from request (same as before)
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

// Export Redis client for direct access if needed
export { redis };
