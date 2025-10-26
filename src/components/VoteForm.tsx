'use client';

import { useState } from 'react';
import { Vote, Question } from '../types/voting';
import Button from './Button';

interface VoteFormProps {
  question: Question;
  currentVote?: Vote;
  onVote: (selectedOptions: string[], justification: string) => void;
  isLockedIn: boolean;
  timeUntilLockIn: string;
}

export default function VoteForm({ question, currentVote, onVote, isLockedIn, timeUntilLockIn }: VoteFormProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentVote?.selectedOptions || []
  );
  const [justification, setJustification] = useState(currentVote?.justification || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (optionId: string) => {
    if (question.type === 'single-choice') {
      setSelectedOptions([optionId]);
    } else if (question.type === 'multiple-choice') {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedOptions.length === 0 || !justification.trim()) {
      alert('Please select at least one option and provide justification');
      return;
    }

    setIsSubmitting(true);
    try {
      await onVote(selectedOptions, justification.trim());
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
        <div className="space-y-3">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
              <input
                type={question.type === 'single-choice' ? 'radio' : 'checkbox'}
                name={question.type === 'single-choice' ? 'vote' : undefined}
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
                className={`mt-1 ${question.type === 'single-choice' ? 'w-4 h-4' : 'w-4 h-4'} text-oasis-green border-gray-300 focus:ring-oasis-green`}
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-xs text-gray-600 mt-1">
                    {option.description}
                  </div>
                )}
              </div>
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
            Current vote: <span className="font-medium">
              {currentVote.selectedOptions.map(optionId => {
                const option = question.options.find(opt => opt.id === optionId);
                return option?.label;
              }).join(', ')}
            </span>
          </p>
        )}
        <Button
          type="submit"
          disabled={selectedOptions.length === 0 || !justification.trim()}
          isLoading={isSubmitting}
        >
          {currentVote ? 'Update Vote' : 'Cast Vote'}
        </Button>
      </div>
    </form>
  );
}