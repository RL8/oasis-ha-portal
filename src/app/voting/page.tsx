'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal, Comment, User } from '../../types/voting';
import ProposalCard from '../../components/ProposalCard';
import NameModal from '../../components/NameModal';

export default function VotingPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameModalAction, setNameModalAction] = useState<'vote' | 'comment' | 'propose'>('vote');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  
  // Client-side state for demo mode
  const [clientVotes, setClientVotes] = useState<Record<string, any>>({});
  const [clientComments, setClientComments] = useState<Comment[]>([]);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [proposalsRes, commentsRes] = await Promise.all([
        fetch('/api/proposal'),
        fetch('/api/comment')
      ]);

      if (proposalsRes.ok) {
        const proposalsData = await proposalsRes.json();
        setProposals(proposalsData);
      }

      if (commentsRes.ok) {
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      }

      // Try to get current user's votes
      const votesRes = await fetch('/api/vote');
      if (votesRes.ok) {
        const votesData = await votesRes.json();
        // Create a mock user object for the current user
        if (Object.keys(votesData.userVotes).length > 0) {
          setCurrentUser({
            name: 'Current User',
            role: 'General Member',
            committee: 'None',
            tags: [],
            votes: votesData.userVotes,
            comments: [],
            proposals: []
          });
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (proposalId: string, choice: 'yes' | 'no' | 'abstain', justification: string) => {
    if (!currentUser) {
      setNameModalAction('vote');
      setPendingAction(() => () => handleVote(proposalId, choice, justification));
      setShowNameModal(true);
      return;
    }

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proposalId,
          choice,
          justification,
          firstName: currentUser.name.split(' ')[0],
          lastName: currentUser.name.split(' ')[1] || ''
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update client-side state for demo mode
        setClientVotes(prev => ({
          ...prev,
          [proposalId]: {
            choice,
            justification,
            timestamp: new Date().toISOString()
          }
        }));
        
        // Update proposals with new vote totals
        setProposals(prev => prev.map(proposal => 
          proposal.id === proposalId 
            ? { ...proposal, votes: result.totals }
            : proposal
        ));
        
        // Show success message
        alert(result.message || 'Vote recorded successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Error submitting vote');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Error submitting vote. Please try again.');
    }
  };

  const handleComment = async (proposalId: string, text: string) => {
    if (!currentUser) {
      setNameModalAction('comment');
      setPendingAction(() => () => handleComment(proposalId, text));
      setShowNameModal(true);
      return;
    }

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proposalId,
          text,
          firstName: currentUser.name.split(' ')[0],
          lastName: currentUser.name.split(' ')[1] || ''
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update client-side state for demo mode
        setClientComments(prev => [...prev, result.comment]);
        
        // Show success message
        alert(result.message || 'Comment posted successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Error submitting comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    }
  };

  const handleCreateProposal = async (title: string, description: string) => {
    if (!currentUser) {
      setNameModalAction('propose');
      setPendingAction(() => () => handleCreateProposal(title, description));
      setShowNameModal(true);
      return;
    }

    try {
      const response = await fetch('/api/proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          firstName: currentUser.name.split(' ')[0],
          lastName: currentUser.name.split(' ')[1] || ''
        }),
      });

      if (response.ok) {
        await loadData(); // Reload data to get new proposal
        alert('Proposal created successfully! It will appear in the list once approved by an admin.');
      } else {
        const error = await response.json();
        alert(error.error || 'Error creating proposal');
      }
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('Error creating proposal. Please try again.');
    }
  };

  const handleNameSubmit = async (firstName: string, lastName: string) => {
    const fullName = `${firstName} ${lastName}`;
    setCurrentUser({
      name: fullName,
      role: 'General Member',
      committee: 'None',
      tags: [],
      votes: {},
      comments: [],
      proposals: []
    });
    setShowNameModal(false);

    // Execute pending action if any
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oasis-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading voting system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-oasis-green rounded-xl flex items-center justify-center mr-3 shadow-lg border-2 border-green-600">
                <span className="text-white text-2xl font-black">O</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-oasis-green">OHA Voting System</h1>
                <p className="text-sm text-gray-600">Democratic Decision Making</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser && (
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{currentUser.name}</span>
                </div>
              )}
              <a
                href="/voting/admin"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
              >
                Admin Panel
              </a>
              <Link
                href="/"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 text-sm"
              >
                Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Proposal Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Proposal</h2>
          <ProposalCreationForm onSubmit={handleCreateProposal} />
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Current Proposals</h2>
          
          {proposals.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600 text-lg">No proposals yet. Be the first to create one!</p>
            </div>
          ) : (
            <ProposalGroups 
              proposals={proposals}
              comments={[...comments, ...clientComments]}
              currentUser={currentUser}
              clientVotes={clientVotes}
              onVote={handleVote}
              onComment={handleComment}
            />
          )}
        </div>
      </main>

      {/* Name Modal */}
      <NameModal
        isOpen={showNameModal}
        onClose={() => {
          setShowNameModal(false);
          setPendingAction(null);
        }}
        onSubmit={handleNameSubmit}
        action={nameModalAction}
      />
    </div>
  );
}

// Proposal Creation Form Component
function ProposalCreationForm({ onSubmit }: { onSubmit: (title: string, description: string) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating proposal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Proposal Title (Question)
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Should OHA purchase the Mazowe farm?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-oasis-green focus:border-oasis-green"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide background information and context for this proposal..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-oasis-green focus:border-oasis-green"
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !description.trim()}
          className="px-6 py-2 bg-oasis-green text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
        >
          {isSubmitting ? 'Creating...' : 'Create Proposal'}
        </button>
      </div>
    </form>
  );
}

// Proposal Groups Component
function ProposalGroups({ 
  proposals, 
  comments, 
  currentUser, 
  clientVotes,
  onVote, 
  onComment 
}: { 
  proposals: Proposal[]; 
  comments: Comment[]; 
  currentUser: User | null; 
  clientVotes: Record<string, any>;
  onVote: (proposalId: string, choice: 'yes' | 'no' | 'abstain', justification: string) => void;
  onComment: (proposalId: string, text: string) => void;
}) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['active']));

  // Group proposals by category and status
  const groupedProposals = proposals.reduce((groups, proposal) => {
    let category = 'other';
    
    if (proposal.id.startsWith('admin')) {
      category = 'administrative';
    } else if (proposal.id.startsWith('website')) {
      category = 'website';
    } else if (proposal.id.startsWith('marketing')) {
      category = 'marketing';
    } else if (proposal.id.startsWith('legal')) {
      category = 'legal';
    } else if (proposal.id.startsWith('prop')) {
      category = proposal.status === 'completed' ? 'completed' : 'active';
    }

    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(proposal);
    return groups;
  }, {} as Record<string, Proposal[]>);

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const groupConfig = {
    active: { title: 'Active Proposals', icon: '🟢', color: 'green' },
    completed: { title: 'Completed Proposals (Voting Ended)', icon: '✅', color: 'gray' },
    administrative: { title: 'Administrative & Signing', icon: '📋', color: 'blue' },
    website: { title: 'Website Development', icon: '🌐', color: 'purple' },
    marketing: { title: 'Marketing & Outreach', icon: '📢', color: 'orange' },
    legal: { title: 'Legal Counsel Selection', icon: '⚖️', color: 'red' },
    other: { title: 'Other Proposals', icon: '📄', color: 'gray' }
  };

  return (
    <div className="space-y-4">
      {Object.entries(groupedProposals).map(([groupName, groupProposals]) => {
        const config = groupConfig[groupName as keyof typeof groupConfig] || groupConfig.other;
        const isExpanded = expandedGroups.has(groupName);
        
        return (
          <div key={groupName} className="bg-white rounded-xl shadow-lg border border-gray-200">
            <button
              onClick={() => toggleGroup(groupName)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{config.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
                  <p className="text-sm text-gray-600">{groupProposals.length} proposal{groupProposals.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
                  {groupProposals.filter(p => p.status === 'active').length} active
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {isExpanded && (
              <div className="px-6 pb-6 space-y-4">
                {groupProposals.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    comments={comments}
                    currentUser={currentUser}
                    clientVotes={clientVotes}
                    onVote={onVote}
                    onComment={onComment}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
