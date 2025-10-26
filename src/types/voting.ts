// TypeScript interfaces for the voting system

export interface Vote {
  questionId: string;
  selectedOptions: string[]; // Array of option IDs
  justification: string;
  timestamp: string;
}

export interface User {
  name: string;
  role: string;
  committee: string;
  tags: string[];
  votes: Record<string, Vote>; // proposalId -> Vote
  comments: string[];
  proposals: string[];
}

export interface VoteOption {
  id: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  type: 'single-choice' | 'multiple-choice' | 'ranking';
  options: VoteOption[];
  required: boolean;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed';
  createdBy: string;
  createdAt: string;
  lockInDate: string;
  questions: Question[];
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

// Proposal Request - Plain text submissions from users
export interface ProposalRequest {
  id: string;
  requestText: string;        // Plain text description of what user wants to propose
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;           // User IP
  createdAt: string;
  reviewedBy?: string;         // Admin who reviewed it
  reviewedAt?: string;
  proposalId?: string;         // If approved, links to the created proposal
}

export interface ProposalRequestsData {
  [requestId: string]: ProposalRequest;
}

// Validation functions
export const validateVote = (questionId: string, selectedOptions: string[], justification: string): boolean => {
  return questionId.trim().length > 0 && selectedOptions.length > 0 && justification.trim().length > 0;
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
         ['draft', 'active', 'completed'].includes((proposal as Record<string, unknown>).status as string) &&
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

export const validateProposalRequest = (request: unknown): request is ProposalRequest => {
  return request !== null &&
         typeof request === 'object' &&
         request !== null &&
         'id' in request &&
         'requestText' in request &&
         'status' in request &&
         'createdBy' in request &&
         'createdAt' in request &&
         typeof (request as Record<string, unknown>).id === 'string' &&
         typeof (request as Record<string, unknown>).requestText === 'string' &&
         ['pending', 'approved', 'rejected'].includes((request as Record<string, unknown>).status as string) &&
         typeof (request as Record<string, unknown>).createdBy === 'string' &&
         typeof (request as Record<string, unknown>).createdAt === 'string';
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

export const isProposalRequest = (obj: unknown): obj is ProposalRequest => {
  return validateProposalRequest(obj);
};

// Utility functions
export const generateId = (): string => {
  return `prop${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
};

export const generateCommentId = (): string => {
  return `comment${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
};

export const generateRequestId = (): string => {
  return `request${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
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
