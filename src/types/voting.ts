// TypeScript interfaces for the voting system

export interface Vote {
  choice: 'yes' | 'no' | 'abstain';
  justification: string;
  timestamp: string;
}

export interface User {
  name: string;
  role: string;
  committee: string;
  tags: string[];
  votes: Record<string, Vote>;
  comments: string[];
  proposals: string[];
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active';
  createdBy: string;
  createdAt: string;
  lockInDate: string;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
}

export interface Comment {
  id: string;
  proposalId: string;
  userIp: string;
  text: string;
  timestamp: string;
}

export interface UsersData {
  [userIp: string]: User;
}

export interface ProposalsData {
  [proposalId: string]: Proposal;
}

export interface CommentsData {
  [commentId: string]: Comment;
}

// Validation functions
export const validateVote = (choice: string, justification: string): boolean => {
  return ['yes', 'no', 'abstain'].includes(choice) && justification.trim().length > 0;
};

export const validateProposal = (proposal: unknown): proposal is Proposal => {
  return proposal !== null &&
         typeof proposal === 'object' &&
         proposal !== null &&
         'title' in proposal &&
         'description' in proposal &&
         'status' in proposal &&
         'createdBy' in proposal &&
         'lockInDate' in proposal &&
         typeof (proposal as Record<string, unknown>).title === 'string' &&
         typeof (proposal as Record<string, unknown>).description === 'string' &&
         ['draft', 'active'].includes((proposal as Record<string, unknown>).status as string) &&
         typeof (proposal as Record<string, unknown>).createdBy === 'string' &&
         typeof (proposal as Record<string, unknown>).lockInDate === 'string';
};

export const validateUser = (user: unknown): user is User => {
  return user !== null &&
         typeof user === 'object' &&
         user !== null &&
         'name' in user &&
         'role' in user &&
         'committee' in user &&
         'tags' in user &&
         'votes' in user &&
         'comments' in user &&
         'proposals' in user &&
         typeof (user as Record<string, unknown>).name === 'string' &&
         typeof (user as Record<string, unknown>).role === 'string' &&
         typeof (user as Record<string, unknown>).committee === 'string' &&
         Array.isArray((user as Record<string, unknown>).tags) &&
         typeof (user as Record<string, unknown>).votes === 'object' &&
         Array.isArray((user as Record<string, unknown>).comments) &&
         Array.isArray((user as Record<string, unknown>).proposals);
};

export const validateComment = (comment: unknown): comment is Comment => {
  return comment !== null &&
         typeof comment === 'object' &&
         comment !== null &&
         'id' in comment &&
         'proposalId' in comment &&
         'userIp' in comment &&
         'text' in comment &&
         'timestamp' in comment &&
         typeof (comment as Record<string, unknown>).id === 'string' &&
         typeof (comment as Record<string, unknown>).proposalId === 'string' &&
         typeof (comment as Record<string, unknown>).userIp === 'string' &&
         typeof (comment as Record<string, unknown>).text === 'string' &&
         typeof (comment as Record<string, unknown>).timestamp === 'string';
};

// Type guards
export const isUser = (obj: unknown): obj is User => {
  return validateUser(obj);
};

export const isProposal = (obj: unknown): obj is Proposal => {
  return validateProposal(obj);
};

export const isComment = (obj: unknown): obj is Comment => {
  return validateComment(obj);
};

// Utility functions
export const generateId = (): string => {
  return `prop${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
};

export const generateCommentId = (): string => {
  return `comment${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
};

export const isLockedIn = (lockInDate: string): boolean => {
  return new Date() > new Date(lockInDate);
};

export const getTimeUntilLockIn = (lockInDate: string): string => {
  const now = new Date();
  const lockIn = new Date(lockInDate);
  const diff = lockIn.getTime() - now.getTime();
  
  if (diff <= 0) return 'Voting has closed';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days} days, ${hours} hours remaining`;
  return `${hours} hours remaining`;
};
