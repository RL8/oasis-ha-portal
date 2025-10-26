'use client';

import { useState } from 'react';
import { Vote } from '../types/voting';

interface VoteFormProps {
  proposalId: string;
  currentVote?: Vote;
  onVote: (proposalId: string, choice: 'yes' | 'no' | 'abstain', justification: string) => void;
  isLockedIn: boolean;
  timeUntilLockIn: string;
}

export default function VoteForm({ proposalId, currentVote, onVote, isLockedIn, timeUntilLockIn }: VoteFormProps) {
  const [selectedChoice, setSelectedChoice] = useState<'yes' | 'no' | 'abstain' | null>(
    currentVote?.choice || null
  );
  const [justification, setJustification] = useState(currentVote?.justification || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedChoice || !justification.trim()) {
      alert('Please select a vote and provide justification');
      return;
    }

    setIsSubmitting(true);
    try {
      await onVote(proposalId, selectedChoice, justification.trim());
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Error submitting vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLockedIn) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg border-2 border-red-300">
        <p className="text-red-600 font-semibold">Voting has closed</p>
        <p className="text-sm text-gray-600 mt-1">Final votes have been locked in</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800 font-medium">
          Final votes lock in: {timeUntilLockIn}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          You can change your vote until then
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Your Vote
        </label>
        <div className="space-y-2">
          {(['yes', 'no', 'abstain'] as const).map((choice) => (
            <label key={choice} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="vote"
                value={choice}
                checked={selectedChoice === choice}
                onChange={() => setSelectedChoice(choice)}
                className="w-4 h-4 text-oasis-green border-gray-300 focus:ring-oasis-green"
              />
              <span className="text-sm font-medium capitalize">
                {choice === 'yes' && 'Yes'}
                {choice === 'no' && 'No'}
                {choice === 'abstain' && 'Abstain'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-2">
          Justification (required)
        </label>
        <textarea
          id="justification"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          placeholder="Explain your reasoning for this vote..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-oasis-green focus:border-oasis-green"
          rows={3}
          required
        />
      </div>

      <div className="flex justify-between items-center">
        {currentVote && (
          <p className="text-sm text-gray-600">
            Current vote: <span className="font-medium capitalize">{currentVote.choice}</span>
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !selectedChoice || !justification.trim()}
          className="px-4 py-2 bg-oasis-green text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
        >
          {isSubmitting ? 'Submitting...' : currentVote ? 'Update Vote' : 'Cast Vote'}
        </button>
      </div>
    </form>
  );
}
