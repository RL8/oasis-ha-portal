'use client';

import { useState, useEffect } from 'react';
import { Proposal, Comment, User } from '../../../types/voting';

interface AdminData {
  users: User[];
  proposals: Proposal[];
  comments: Comment[];
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData>({ users: [], proposals: [], comments: [] });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscodeForm, setShowPasscodeForm] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin');
      if (response.ok) {
        const adminData = await response.json();
        setData(adminData);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passcode === '6526') {
      setIsAdmin(true);
      setShowPasscodeForm(false);
    } else {
      alert('Invalid passcode');
    }
  };

  const handleProposalStatusChange = async (proposalId: string, newStatus: 'draft' | 'active') => {
    if (!isAdmin) return;

    setActionLoading(proposalId);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateProposalStatus',
          passcode: '6526',
          proposalId,
          status: newStatus
        }),
      });

      if (response.ok) {
        await loadData(); // Reload data
      } else {
        const error = await response.json();
        alert(error.error || 'Error updating proposal status');
      }
    } catch (error) {
      console.error('Error updating proposal status:', error);
      alert('Error updating proposal status. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUserRoleUpdate = async (userIp: string, field: 'role' | 'committee' | 'tags', value: string | string[]) => {
    if (!isAdmin) return;

    setActionLoading(userIp);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateUserRole',
          passcode: '6526',
          userIp,
          [field]: value
        }),
      });

      if (response.ok) {
        await loadData(); // Reload data
      } else {
        const error = await response.json();
        alert(error.error || 'Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oasis-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (showPasscodeForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter admin passcode to access the management panel</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Passcode
              </label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-oasis-green focus:border-oasis-green"
                placeholder="Enter passcode"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-oasis-green text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Access Admin Panel
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/voting"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to Voting System
            </a>
          </div>
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
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-3 shadow-lg border-2 border-red-700">
                <span className="text-white text-2xl font-black">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-600">Admin Panel</h1>
                <p className="text-sm text-gray-600">OHA Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsAdmin(false);
                  setShowPasscodeForm(true);
                  setPasscode('');
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 text-sm"
              >
                Logout
              </button>
              <a
                href="/voting"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
              >
                Voting System
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{data.users.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Proposals</h3>
            <p className="text-3xl font-bold text-green-600">{data.proposals.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Comments</h3>
            <p className="text-3xl font-bold text-purple-600">{data.comments.length}</p>
          </div>
        </div>

        {/* Users Management */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">User Management</h2>
          
          {data.users.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No users yet</p>
          ) : (
            <div className="space-y-4">
              {data.users.map((user, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">IP: {Object.keys(data.users).find(key => data.users[parseInt(key)] === user) || 'Unknown'}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Role:</span>
                          <select
                            value={user.role}
                            onChange={(e) => handleUserRoleUpdate(Object.keys(data.users)[index], 'role', e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                            disabled={actionLoading === Object.keys(data.users)[index]}
                          >
                            <option value="General Member">General Member</option>
                            <option value="Founding Member">Founding Member</option>
                            <option value="Board Member">Board Member</option>
                            <option value="Committee Lead">Committee Lead</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Committee:</span>
                          <select
                            value={user.committee}
                            onChange={(e) => handleUserRoleUpdate(Object.keys(data.users)[index], 'committee', e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                            disabled={actionLoading === Object.keys(data.users)[index]}
                          >
                            <option value="None">None</option>
                            <option value="Finance">Finance</option>
                            <option value="Legal">Legal</option>
                            <option value="Technical Services">Technical Services</option>
                            <option value="Ethics">Ethics</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Proposals: {user.proposals.length}</p>
                      <p>Votes: {Object.keys(user.votes).length}</p>
                      <p>Comments: {user.comments.length}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Proposals Management */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Proposal Management</h2>
          
          {data.proposals.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No proposals yet</p>
          ) : (
            <div className="space-y-4">
              {data.proposals.map((proposal) => (
                <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{proposal.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{proposal.description.substring(0, 200)}...</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Created: {new Date(proposal.createdAt).toLocaleDateString()}</span>
                        <span>Lock-in: {new Date(proposal.lockInDate).toLocaleDateString()}</span>
                        <span>Questions: {proposal.questions.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        proposal.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {proposal.status}
                      </span>
                      {proposal.status === 'draft' && (
                        <button
                          onClick={() => handleProposalStatusChange(proposal.id, 'active')}
                          disabled={actionLoading === proposal.id}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-500 disabled:text-gray-300 text-sm"
                        >
                          {actionLoading === proposal.id ? 'Updating...' : 'Approve'}
                        </button>
                      )}
                      {proposal.status === 'active' && (
                        <button
                          onClick={() => handleProposalStatusChange(proposal.id, 'draft')}
                          disabled={actionLoading === proposal.id}
                          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-500 disabled:text-gray-300 text-sm"
                        >
                          {actionLoading === proposal.id ? 'Updating...' : 'Reject'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
