'use client';

import { useState } from 'react';
import Button from './Button';

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (firstName: string, lastName: string) => void;
  action: 'vote' | 'comment' | 'propose' | 'access';
  required?: boolean; // If true, hides the cancel button
}

export default function NameModal({ isOpen, onClose, onSubmit, action, required = false }: NameModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim()) {
      alert('Please provide both first and last name');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(firstName.trim(), lastName.trim());
      setFirstName('');
      setLastName('');
      onClose();
    } catch (error) {
      console.error('Error submitting name:', error);
      alert('Error submitting name. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActionText = () => {
    switch (action) {
      case 'vote':
        return 'vote on proposals';
      case 'comment':
        return 'add comments';
      case 'propose':
        return 'create proposals';
      case 'access':
        return 'access the voting system';
      default:
        return 'participate';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Demo Access Required
          </h3>
          <p className="text-gray-600 text-sm">
            This is a demo of OHA&apos;s leadership platform. Please provide your first and last name so we can track your votes, comments and proposals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-oasis-green focus:border-oasis-green"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-oasis-green focus:border-oasis-green"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Once you provide your name, you&apos;ll be able to {getActionText()} on this demo platform.
            </p>
          </div>

          <div className={`flex ${required ? 'justify-end' : 'justify-end space-x-3'} pt-4`}>
            {!required && (
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={!firstName.trim() || !lastName.trim()}
              isLoading={isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
