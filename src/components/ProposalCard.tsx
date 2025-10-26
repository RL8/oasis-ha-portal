'use client';

import { useState } from 'react';
import { Proposal, Comment } from '../types/voting';
import VoteForm from './VoteForm';

interface ProposalCardProps {
  proposal: Proposal;
  comments: Comment[];
  currentUser?: any;
  clientVotes?: Record<string, any>;
  onVote: (proposalId: string, choice: 'yes' | 'no' | 'abstain', justification: string) => void;
  onComment: (proposalId: string, text: string) => void;
}

export default function ProposalCard({ 
  proposal, 
  comments, 
  currentUser, 
  clientVotes,
  onVote, 
  onComment
}: ProposalCardProps) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const proposalComments = comments.filter(comment => comment.proposalId === proposal.id);
  const currentVote = clientVotes?.[proposal.id] || currentUser?.votes[proposal.id];
  const isLockedIn = new Date() > new Date(proposal.lockInDate);
  
  const timeUntilLockIn = () => {
    const now = new Date();
    const lockIn = new Date(proposal.lockInDate);
    const diff = lockIn.getTime() - now.getTime();
    
    if (diff <= 0) return 'Voting has closed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours remaining`;
    return `${hours} hours remaining`;
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert('Please enter a comment');
      return;
    }

    setIsSubmittingComment(true);
    try {
      await onComment(proposal.id, newComment.trim());
      setNewComment('');
      setShowCommentForm(false);
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const totalVotes = proposal.votes.yes + proposal.votes.no + proposal.votes.abstain;
  const yesPercentage = totalVotes > 0 ? Math.round((proposal.votes.yes / totalVotes) * 100) : 0;
  const noPercentage = totalVotes > 0 ? Math.round((proposal.votes.no / totalVotes) * 100) : 0;
  const abstainPercentage = totalVotes > 0 ? Math.round((proposal.votes.abstain / totalVotes) * 100) : 0;

  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 p-6 ${
      proposal.status === 'draft' ? 'border-gray-300 opacity-75' : 'border-oasis-green'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{proposal.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              proposal.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : proposal.status === 'completed'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {proposal.status === 'active' ? 'Active' : 
               proposal.status === 'completed' ? 'Voting Ended' : 
               'Draft - Awaiting Approval'}
            </span>
            <span>Created: {new Date(proposal.createdAt).toLocaleDateString()}</span>
            <span>Lock-in: {new Date(proposal.lockInDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{proposal.description}</p>
      </div>

      {/* Vote Results */}
      {(proposal.status === 'active' || proposal.status === 'completed') && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-900">Current Vote Results</h4>
            <span className="text-sm text-gray-600">{totalVotes} total votes</span>
          </div>
          
          <div className="space-y-3">
            {/* Yes votes */}
            <div className="flex items-center space-x-3">
              <div className="w-16 text-sm font-medium text-green-700">Yes</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${yesPercentage}%` }}
                >
                  <span className="text-white text-xs font-medium">{proposal.votes.yes}</span>
                </div>
              </div>
              <div className="w-12 text-sm text-gray-600">{yesPercentage}%</div>
            </div>

            {/* No votes */}
            <div className="flex items-center space-x-3">
              <div className="w-16 text-sm font-medium text-red-700">No</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-red-500 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${noPercentage}%` }}
                >
                  <span className="text-white text-xs font-medium">{proposal.votes.no}</span>
                </div>
              </div>
              <div className="w-12 text-sm text-gray-600">{noPercentage}%</div>
            </div>

            {/* Abstain votes */}
            <div className="flex items-center space-x-3">
              <div className="w-16 text-sm font-medium text-gray-700">Abstain</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-gray-500 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${abstainPercentage}%` }}
                >
                  <span className="text-white text-xs font-medium">{proposal.votes.abstain}</span>
                </div>
              </div>
              <div className="w-12 text-sm text-gray-600">{abstainPercentage}%</div>
            </div>
          </div>

          {/* Individual Votes with Justifications */}
          {totalVotes > 0 && (
            <div className="mt-6">
              <h5 className="font-semibold text-gray-900 mb-3">Individual Votes & Justifications</h5>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {comments.map((comment) => {
                  // Find user who made this comment to get their votes
                  const user = comment.userIp;
                  const userVote = currentUser?.votes?.[proposal.id];
                  
                  // For demo purposes, we'll show sample votes
                  // In a real app, you'd fetch all users and their votes for this proposal
                  return null;
                })}
                
                {/* Sample individual votes for demo */}
                {proposal.id === 'prop1' && (
                  <>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-green-800">John Smith</span>
                        <span className="text-xs text-gray-500">Oct 21, 10:30 AM</span>
                      </div>
                      <p className="text-sm text-green-700">Good location with infrastructure potential and fair pricing</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-red-800">Mary Johnson</span>
                        <span className="text-xs text-gray-500">Oct 21, 11:15 AM</span>
                      </div>
                      <p className="text-sm text-red-700">Too far from Harare, high transport costs for members</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-800">Bob Wilson</span>
                        <span className="text-xs text-gray-500">Oct 21, 12:00 PM</span>
                      </div>
                      <p className="text-sm text-gray-700">Need more financial details before deciding</p>
                    </div>
                  </>
                )}
                
                {proposal.id === 'prop3' && (
                  <>
                    <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-red-800">John Smith</span>
                        <span className="text-xs text-gray-500">Oct 19, 2:15 PM</span>
                      </div>
                      <p className="text-sm text-red-700">Members should get priority over commercial development</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-green-800">Bob Wilson</span>
                        <span className="text-xs text-gray-500">Oct 19, 4:00 PM</span>
                      </div>
                      <p className="text-sm text-green-700">Commercial revenue can fund better infrastructure</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-800">Sarah Davis</span>
                        <span className="text-xs text-gray-500">Oct 19, 5:20 PM</span>
                      </div>
                      <p className="text-sm text-gray-700">Both approaches have merit, need more discussion</p>
                    </div>
                  </>
                )}
                
                {proposal.id === 'prop4' && (
                  <>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-green-800">John Smith</span>
                        <span className="text-xs text-gray-500">Oct 23, 9:45 AM</span>
                      </div>
                      <p className="text-sm text-green-700">Community gardens promote sustainability and member bonding</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-green-800">Mary Johnson</span>
                        <span className="text-xs text-gray-500">Oct 23, 10:20 AM</span>
                      </div>
                      <p className="text-sm text-green-700">Legal framework exists for community gardens</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-red-800">Bob Wilson</span>
                        <span className="text-xs text-gray-500">Oct 23, 11:30 AM</span>
                      </div>
                      <p className="text-sm text-red-700">Land should be used for housing, not gardening</p>
                    </div>
                  </>
                )}
                
                {proposal.id === 'prop5' && (
                  <>
                    <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-red-800">John Smith</span>
                        <span className="text-xs text-gray-500">Oct 16, 4:20 PM</span>
                      </div>
                      <p className="text-sm text-red-700">Too expensive for current budget constraints</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-800">Mary Johnson</span>
                        <span className="text-xs text-gray-500">Oct 16, 5:45 PM</span>
                      </div>
                      <p className="text-sm text-gray-700">Need more details on management scope and responsibilities</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-green-800">Bob Wilson</span>
                        <span className="text-xs text-gray-500">Oct 16, 6:15 PM</span>
                      </div>
                      <p className="text-sm text-green-700">Professional management will improve property values</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vote Form */}
      {proposal.status === 'active' && (
        <div className="mb-6">
          <VoteForm
            proposalId={proposal.id}
            currentVote={currentVote}
            onVote={onVote}
            isLockedIn={isLockedIn}
            timeUntilLockIn={timeUntilLockIn()}
          />
        </div>
      )}

      {/* Comments Section */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-900">
            Comments ({proposalComments.length})
          </h4>
          {proposal.status === 'active' && (
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
            >
              {showCommentForm ? 'Cancel' : 'Add Comment'}
            </button>
          )}
        </div>

        {/* Comment Form */}
        {showCommentForm && (
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this proposal..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-oasis-green focus:border-oasis-green mb-3"
              rows={3}
              required
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCommentForm(false)}
                className="px-3 py-1 text-gray-600 hover:text-gray-800 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingComment || !newComment.trim()}
                className="px-4 py-1 bg-oasis-green text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
              >
                {isSubmittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        )}

        {/* Comments List */}
        <div className="space-y-3">
          {proposalComments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-900">{comment.userIp}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
          
          {proposalComments.length === 0 && (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </div>
    </div>
  );
}
