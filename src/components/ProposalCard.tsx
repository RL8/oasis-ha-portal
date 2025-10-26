'use client';

import { useState } from 'react';
import { Proposal, Comment, Question } from '../types/voting';
import VoteForm from './VoteForm';

interface ProposalCardProps {
  proposal: Proposal;
  comments: Comment[];
  currentUser?: any;
  clientVotes?: Record<string, any>;
  onVote: (proposalId: string, questionId: string, selectedOptions: string[], justification: string) => void;
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

  // Calculate vote totals for each question
  const getQuestionVoteTotals = (question: Question) => {
    const totals: Record<string, number> = {};
    
    // Initialize all options to 0
    question.options.forEach(option => {
      totals[option.id] = 0;
    });
    
    // Count votes from all users
    if (currentUser) {
      Object.values(currentUser.votes || {}).forEach((vote: any) => {
        if (vote.questionId === question.id) {
          vote.selectedOptions.forEach((optionId: string) => {
            totals[optionId] = (totals[optionId] || 0) + 1;
          });
        }
      });
    }
    
    return totals;
  };

  const getTotalVotesForQuestion = (question: Question) => {
    const totals = getQuestionVoteTotals(question);
    return Object.values(totals).reduce((sum, count) => sum + count, 0);
  };

  const getCurrentVoteForQuestion = (question: Question) => {
    if (!currentUser?.votes) return null;
    
    const voteKey = `${proposal.id}-${question.id}`;
    return clientVotes?.[voteKey] || currentUser.votes[voteKey];
  };

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

      {/* Questions */}
      {proposal.questions.map((question) => {
        const voteTotals = getQuestionVoteTotals(question);
        const totalVotes = getTotalVotesForQuestion(question);
        const currentVote = getCurrentVoteForQuestion(question);

        return (
          <div key={question.id} className="mb-8 border border-gray-200 rounded-lg p-4">
            {/* Question Header */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{question.title}</h4>
              <p className="text-gray-600 text-sm">{question.description}</p>
              <div className="mt-2 text-xs text-gray-500">
                Type: {question.type === 'single-choice' ? 'Single Choice' : 
                      question.type === 'multiple-choice' ? 'Multiple Choice' : 'Ranking'} 
                {question.required && ' • Required'}
              </div>
            </div>

            {/* Vote Results */}
            {(proposal.status === 'active' || proposal.status === 'completed') && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-gray-900">Vote Results</h5>
                  <span className="text-sm text-gray-600">{totalVotes} total votes</span>
                </div>
                
                <div className="space-y-3">
                  {question.options.map((option) => {
                    const voteCount = voteTotals[option.id] || 0;
                    const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                    
                    return (
                      <div key={option.id} className="flex items-center space-x-3">
                        <div className="w-48 text-sm font-medium text-gray-700">
                          {option.label}
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6">
                          <div 
                            className="bg-oasis-green h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${percentage}%` }}
                          >
                            <span className="text-white text-xs font-medium">{voteCount}</span>
                          </div>
                        </div>
                        <div className="w-12 text-sm text-gray-600">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>

                {/* Current Vote Display */}
                {currentVote && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="text-sm font-medium text-blue-800 mb-1">Your Vote:</div>
                    <div className="text-sm text-blue-700">
                      {currentVote.selectedOptions.map(optionId => {
                        const option = question.options.find(opt => opt.id === optionId);
                        return option?.label;
                      }).join(', ')}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      "{currentVote.justification}"
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
                  question={question}
                  currentVote={currentVote}
                  onVote={(selectedOptions, justification) => 
                    onVote(proposal.id, question.id, selectedOptions, justification)
                  }
                  isLockedIn={isLockedIn}
                  timeUntilLockIn={timeUntilLockIn()}
                />
              </div>
            )}
          </div>
        );
      })}

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