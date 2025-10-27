'use client';

import { useState } from 'react';

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <main>
      {/* Dismissable Banner */}
      {showBanner && (
        <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-3 relative">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm text-yellow-800 font-medium">
               📋 Draft webportal for OHA based on meeting notes of 21 Sep &apos;25
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className="text-yellow-600 hover:text-yellow-800 ml-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header & Navigation */}
      <header className="shadow-lg sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-oasis-green flex items-center">
            <div className="w-12 h-12 bg-oasis-green rounded-xl flex items-center justify-center mr-3 shadow-lg border-2 border-green-600">
              <span className="text-white text-2xl font-black">O</span>
            </div>
            Oasis HA - Draft Web Portal [WIP]
          </h1>
          <nav className="hidden md:flex space-x-6 font-medium text-sm">
            <a href="#vision" className="hover:text-oasis-green transition duration-300">Our Vision</a>
            <a href="#transparency" className="hover:text-oasis-green transition duration-300">Finance</a>
            <a href="#leadership" className="hover:text-oasis-green transition duration-300">Leadership</a>
            <a href="#timeline" className="hover:text-oasis-green transition duration-300">Timeline</a>
            <a 
              href="/voting"
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 font-semibold"
            >
              🗳️ Voting System
            </a>
            <button 
              onClick={() => setShowLoginPopup(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Member Login
            </button>
          </nav>
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-gray-700 hover:text-oasis-green transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <a 
              href="#vision" 
              className="block py-2 text-gray-700 hover:text-oasis-green transition duration-300 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Our Vision
            </a>
            <a 
              href="#transparency" 
              className="block py-2 text-gray-700 hover:text-oasis-green transition duration-300 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Finance
            </a>
            <a 
              href="#leadership" 
              className="block py-2 text-gray-700 hover:text-oasis-green transition duration-300 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Leadership
          </a>
            <a
              href="#timeline" 
              className="block py-2 text-gray-700 hover:text-oasis-green transition duration-300 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Timeline
            </a>
            <a
              href="/voting" 
              className="block py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
              onClick={() => setShowMobileMenu(false)}
            >
              🗳️ Voting System
            </a>
            <button 
              onClick={() => {
                setShowLoginPopup(true);
                setShowMobileMenu(false);
              }}
              className="w-full text-left py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Member Login
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-oasis-blue text-white pt-24 pb-20 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
             Building the Future: <br className="sm:hidden" /> A Diaspora Lifestyle Community
           </h2>
           <p className="text-xl sm:text-2xl font-light max-w-3xl mx-auto mb-6">
             The Oasis Housing Association is dedicated to acquiring affordable, high-quality land to develop a legally secure, integrated community with residential, commercial, and agricultural facilities in Zimbabwe.
           </p>
           <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
             <strong>Together, we achieve more.</strong> By combining our resources, skills, and collective vision, we can secure land and build communities that would be impossible to create individually.
           </p>
          <div className="space-x-4">
            <a href="#commitment" className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg transition duration-300 transform hover:scale-105">
              Secure Your Spot
          </a>
        </div>
        </div>
      </section>

      {/* Our Vision & Strategy */}
      <section id="vision" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h3 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900">
             Our Secure Path Forward
           </h3>
           <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
             <strong>Strength in numbers:</strong> Our collective approach enables us to negotiate better land prices, access professional services, and create economies of scale that benefit every member.
           </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Vision Card */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg border-t-4 border-oasis-green transition duration-500 hover:shadow-2xl">
              <div className="text-4xl text-oasis-green mb-4">🏡</div>
              <h4 className="text-xl font-semibold mb-3">Community Vision</h4>
              <p className="text-gray-600">We aim to create an integrated community with <strong>residential, commercial, and small-scale farming</strong> zones. This includes planned space for schools, hospitals, and business to support employment and high standards of living.</p>
            </div>

            {/* Strategy Card 1: Exclusion of Harare */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg border-t-4 border-red-500 transition duration-500 hover:shadow-2xl">
              <div className="text-4xl text-red-500 mb-4">🚫</div>
              <h4 className="text-xl font-semibold mb-3">Strategic Land Shift</h4>
              <p className="text-gray-600">Based on financial capacity surveys, the plan to acquire land in <strong>Harare Province has been ruled out</strong>. This decision avoids high costs, congestion, and complex legal dramas associated with urban land.</p>
            </div>

            {/* Strategy Card 2: New Location Focus */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg border-t-4 border-oasis-green transition duration-500 hover:shadow-2xl">
              <div className="text-4xl text-oasis-green mb-4">📍</div>
              <h4 className="text-xl font-semibold mb-3">New Acquisition Focus</h4>
              <p className="text-gray-600">The current strategy targets acquiring a <strong>privately owned farm</strong> located within a <strong>one-hour radius of Harare</strong>. This strategy ensures affordability, large plot sizes (minimum 1,000 sqm), and clean title deeds.</p>
            </div>
          </div>

          {/* Plot Size and Quality */}
           <div className="mt-12 text-center max-w-4xl mx-auto p-6 bg-gray-100 rounded-xl shadow-inner">
             <h4 className="text-2xl font-semibold mb-2 text-gray-700">Land Size and Architectural Control</h4>
             <p className="text-lg text-gray-700">The majority preference is for plot sizes between <strong>1,000 and 2,000 square meters</strong>. The association will implement a system of <strong>pre-approved architectural plans</strong> to maintain uniformity and quality across the development. <em>Our collective approach ensures better planning, shared infrastructure costs, and enhanced property values for all members.</em></p>
           </div>
        </div>
      </section>
      
      {/* Financial Transparency Hub (RESTRICTED CONTENT) */}
      <section id="transparency" className="py-16 sm:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="restricted-draft">
            <p className="font-bold text-red-600">🔒 RESTRICTED ACCESS (DRAFT): Financial Details</p>
            <p className="text-sm text-red-500 mt-1">This section will require Member Login upon final launch to view live fund balances and detailed expenditure reports.</p>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Financial Integrity & Funds Status
          </h3>
          <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-2xl border-2 border-oasis-blue">
            <p className="text-xl font-semibold text-center text-red-500 mb-6">
              Data for this section will be activated once the bank accounts are finalized and initial Commitment Fees are received.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-green-50 rounded-lg shadow-inner border border-green-200">
                <p className="text-sm font-medium text-gray-600">Total Funds Raised (Fees/Deposits)</p>
                <p className="text-3xl font-bold text-green-700 mt-1">$0.00</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg shadow-inner border border-yellow-200">
                <p className="text-sm font-medium text-gray-600">Expenditures (Legal/Admin)</p>
                <p className="text-3xl font-bold text-yellow-700 mt-1">$0.00</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-inner border border-blue-200">
                <p className="text-sm font-medium text-gray-600">Committed Member Count</p>
                <p className="text-3xl font-bold text-blue-700 mt-1">0</p>
              </div>
            </div>
            <p className="mt-6 text-center text-gray-600">
              *The Finance Committee is committed to providing <strong>monthly transparency reports</strong> with full legal and accounting documentation to all Founding Members.*
            </p>
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section id="timeline" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Project Roadmap & Key Milestones
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gray-200 before:transform">
              <div className="relative pl-12">
                <div className="absolute w-10 h-10 bg-oasis-green rounded-full text-white text-center font-bold flex items-center justify-center -left-0.5 shadow-xl">1</div>
                <h4 className="font-semibold text-xl mb-1 text-oasis-green">Phase 1: Legal Formalisation (Current)</h4>
                <p className="text-gray-600">Secure Commitment Fees, officially register the Oasis Housing Association, and finalize the Constitution and Rules & Regulations.</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute w-10 h-10 bg-gray-400 rounded-full text-white text-center font-bold flex items-center justify-center -left-0.5 shadow-xl">2</div>
                <h4 className="font-semibold text-xl mb-1 text-gray-700">Phase 2: Land Acquisition (Target: Q4 2025)</h4>
                <p className="text-gray-600">Engage legal counsel for rigorous <strong>due diligence</strong> on shortlisted private farms and execute the land purchase using member deposits.</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute w-10 h-10 bg-gray-400 rounded-full text-white text-center font-bold flex items-center justify-center -left-0.5 shadow-xl">3</div>
                <h4 className="font-semibold text-xl mb-1 text-gray-700">Phase 3: Planning & Permits (Pending Land Acquisition)</h4>
                <p className="text-gray-600">Engage Town Planners and Surveyors. Apply for the crucial <strong>subdivision permit</strong> to create individual stands and secure full legal compliance.</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute w-10 h-10 bg-gray-400 rounded-full text-white text-center font-bold flex items-center justify-center -left-0.5 shadow-xl">4</div>
                <h4 className="font-semibold text-xl mb-1 text-gray-700">Phase 4: Infrastructure & Development</h4>
                <p className="text-gray-600">Commence development of roads, utilities (water, power), commercial zones, and social facilities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership and Integrity Section */}
      <section id="leadership" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
            Meet Your Committed Leadership Team
          </h3>
           <p className="text-center text-lg text-gray-600 mb-12">
             Transparency and professionalism are our core values. These volunteer leaders bring diverse skills and expertise, demonstrating how <strong>combining individual talents creates a powerful collective force</strong> for community development.
           </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {/* Mimi */}
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-5 text-center transition duration-300 hover:shadow-xl border-t-4 border-oasis-green">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-200 flex items-center justify-center text-2xl font-bold text-white" style={{backgroundColor: '#22c55e'}}>M</div>
              <h5 className="text-xl font-semibold">Mimi</h5>
              <p className="text-oasis-green font-medium">Chair / Founder</p>
              <p className="text-sm text-gray-500 mt-2">Drove strategic land decision; confirmed association name.</p>
            </div>
            {/* Sekai */}
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-5 text-center transition duration-300 hover:shadow-xl border-t-4 border-oasis-green">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-200 flex items-center justify-center text-2xl font-bold text-white" style={{backgroundColor: '#0e7490'}}>S</div>
              <h5 className="text-xl font-semibold">Sekai</h5>
              <p className="text-oasis-green font-medium">Executive Coordinator</p>
              <p className="text-sm text-gray-500 mt-2">Oversaw committee updates and meeting flow.</p>
            </div>
            {/* Frank */}
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-5 text-center transition duration-300 hover:shadow-xl border-t-4 border-oasis-green">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-200 flex items-center justify-center text-2xl font-bold text-white" style={{backgroundColor: '#6366f1'}}>F</div>
              <h5 className="text-xl font-semibold">Frank</h5>
              <p className="text-oasis-green font-medium">Legal Team Lead</p>
              <p className="text-sm text-gray-500 mt-2">Practicing attorney; drafted the <strong>Draft Constitution</strong>.</p>
            </div>
            {/* Biggie (Gima Rowan) */}
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-5 text-center transition duration-300 hover:shadow-xl border-t-4 border-oasis-green">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-200 flex items-center justify-center text-2xl font-bold text-white" style={{backgroundColor: '#f97316'}}>B</div>
              <h5 className="text-xl font-semibold">Biggie (Gima Rowan)</h5>
              <p className="text-oasis-green font-medium">Finance Committee Lead</p>
              <p className="text-sm text-gray-500 mt-2">Proposed initial <strong>Commitment and Annual Fees</strong>.</p>
            </div>
            {/* Fiona */}
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-5 text-center transition duration-300 hover:shadow-xl border-t-4 border-oasis-green">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-200 flex items-center justify-center text-2xl font-bold text-white" style={{backgroundColor: '#ec4899'}}>Fi</div>
              <h5 className="text-xl font-semibold">Fiona</h5>
              <p className="text-oasis-green font-medium">Ethics Committee Lead</p>
              <p className="text-sm text-gray-500 mt-2">Responsible for the <strong>Rules and Regulations</strong> document.</p>
            </div>
            {/* Sydney */}
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-5 text-center transition duration-300 hover:shadow-xl border-t-4 border-oasis-green">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-200 flex items-center justify-center text-2xl font-bold text-white" style={{backgroundColor: '#facc15'}}>Sy</div>
              <h5 className="text-xl font-semibold">Sydney</h5>
              <p className="text-oasis-green font-medium">Technical Services Lead</p>
              <p className="text-sm text-gray-500 mt-2">Leads engineers/project managers for development.</p>
            </div>
            {/* Tafadzwa Mukonda */}
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-5 text-center transition duration-300 hover:shadow-xl border-t-4 border-oasis-green">
              <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-200 flex items-center justify-center text-2xl font-bold text-white" style={{backgroundColor: '#10b981'}}>T</div>
              <h5 className="text-xl font-semibold">Tafadzwa Mukonda</h5>
              <p className="text-oasis-green font-medium">Media & Graphics Lead</p>
              <p className="text-sm text-gray-500 mt-2">Manages branding, web, and monetization strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Documentation */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Resources & Documentation
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Strategic Analysis</h4>
                  <p className="text-gray-600 mb-4">Comprehensive analysis of OHA&apos;s strategic direction, market positioning, and development roadmap.</p>
                   <a 
                     href="/docs/Strategic%20Analysis%20of%20Oasis%20HA.pdf" 
                     target="_blank"
                     title="Strategic Analysis of Oasis HA - Phase I De-Risking Strategy"
                     className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                   >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Download PDF
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Meeting Minutes #2</h4>
                  <p className="text-gray-600 mb-4">Official minutes from OHA Meeting #2 covering key decisions, discussions, and action items.</p>
                   <a 
                     href="/docs/Minutes%20of%20OHA%20meeting%20%232.pdf" 
                     target="_blank"
                     title="Minutes of OHA Meeting #2 - Key Decisions and Action Items"
                     className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                   >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Additional documentation will be added as the association progresses through its development phases.
            </p>
          </div>
        </div>
      </section>
      
      {/* Legal Documents & Land Details (RESTRICTED CONTENT) */}
      <section id="documents" className="py-16 sm:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="restricted-draft">
            <p className="font-bold text-red-600">🔒 RESTRICTED ACCESS (DRAFT): Legal and Land Details</p>
            <p className="text-sm text-red-500 mt-1">Finalized legal documents and specific land maps will require Member Login for security and version control.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Legal Documents */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="text-4xl mr-3 text-oasis-green">⚖️</span> Governance & Documents
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                The legal foundation of Oasis Housing Association ensures long-term security and stability for all members.
              </p>
              <ul className="space-y-4">
                <li>
                  <div className="block p-4 bg-white rounded-xl shadow-md border-l-4 border-gray-300 opacity-75">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-lg text-gray-600">Association Constitution (Final)</p>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">UPLOAD PENDING</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Document finalizing the structure, roles, and member rights. <strong>Will be uploaded after official registration.</strong></p>
                  </div>
                </li>
                <li>
                  <div className="block p-4 bg-white rounded-xl shadow-md border-l-4 border-gray-300 opacity-75">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-lg text-gray-600">Community Rules & Regulations</p>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">DRAFTING</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Details on architecture, noise, levies, and communal area usage. <strong>Drafting will commence post-registration.</strong></p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Land Details */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="text-4xl mr-3 text-oasis-green">🗺️</span> Land Acquisition Evaluation
              </h3>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center text-gray-600 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📍</div>
                    <p className="font-medium">Interactive Map Coming Soon</p>
                    <p className="text-sm">Pre-acquisition evaluation tools</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Current Search Criteria</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>Location:</strong> Within 1-hour radius of Harare</li>
                      <li>• <strong>Size:</strong> Minimum 1,000 sqm plots (1,000-2,000 sqm preferred)</li>
                      <li>• <strong>Ownership:</strong> Privately owned farms with clean title deeds</li>
                      <li>• <strong>Access:</strong> Good road connectivity and utilities potential</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Pre-Acquisition Evaluation Features</h4>
                    <p className="text-sm text-blue-700">This section will include interactive maps, land analysis tools, and detailed property evaluations to help members assess potential acquisition sites before final purchase decisions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment and Next Steps (RESTRICTED CONTENT) */}
      <section id="commitment" className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="restricted-draft">
            <p className="font-bold text-red-600">🔒 RESTRICTED ACCESS (DRAFT): Fee and Deposit Requirements</p>
            <p className="text-sm text-red-500 mt-1">Specific financial requirements and exclusive benefits for Founding Members will require Member Login.</p>
          </div>

           <h3 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900">
             Your Commitment to Becoming a Founding Member
           </h3>
           <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
             <strong>Join the collective:</strong> Your individual contribution becomes part of something greater. Together, we pool resources, share expertise, and build a community that none of us could create alone.
           </p>

          <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl border-2 border-oasis-green space-y-8">
            {/* Founding Member Status */}
            <div className="border-b pb-4">
              <h4 className="text-2xl font-bold text-oasis-green flex items-center mb-4">
                <span className="mr-3">⭐</span> Initial Founding Contributions
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                  <p className="text-sm font-medium text-gray-700">Commitment Fee (Once-off)</p>
                  <p className="text-2xl font-extrabold text-blue-800 mt-1">US$100</p>
                  <p className="text-xs text-red-600 font-semibold">Non-Refundable</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm font-medium text-gray-700">Annual Membership Fee</p>
                  <p className="text-2xl font-extrabold text-green-800 mt-1">US$100</p>
                  <p className="text-xs text-gray-600 font-semibold">Paid Yearly</p>
                </div>
              </div>
              <p className="text-base text-gray-700 mt-4">
                These funds secure your position and finance the immediate legal registration of the association.
              </p>
            </div>

            {/* Financial Target */}
            <div className="border-b pb-4">
              <h4 className="text-2xl font-bold text-oasis-green flex items-center mb-2">
                <span className="mr-3">💰</span> Land Deposit Goal
              </h4>
              <p className="text-lg text-gray-700">
                The collective target is for all members to have the full deposit ready for immediate land purchase upon identification.
              </p>
              <ul className="list-disc list-inside ml-4 mt-3 text-gray-600 space-y-1">
                <li><strong>Deposit Target:</strong> <strong>US$10,000</strong> per member.</li>
                <li><strong>Deadline:</strong> December 31, 2025.</li>
                <li><em>Note:</em> Members who can only commit <strong>US$5,000</strong> by the deadline must commit to a monthly payment plan for the remainder.</li>
              </ul>
            </div>

            {/* Key Benefits */}
            <div>
              <h4 className="text-2xl font-bold text-oasis-green flex items-center mb-2">
                <span className="mr-3">✅</span> Exclusive Founding Member Benefits
              </h4>
              <p className="text-lg text-gray-700">
                Your early commitment guarantees premium advantages:
              </p>
              <ul className="list-disc list-inside ml-4 mt-3 text-gray-600 space-y-1">
                <li>More <strong>Affordable Land Rates</strong> compared to later members.</li>
                <li><strong>First Right of Refusal</strong> on valuable commercial plots.</li>
                <li><strong>Discounts</strong> on future social facilities (e.g., gyms, schools).</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl font-medium text-gray-700">
              Ready to secure your place? Complete your fee payment and review the Draft Constitution today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact/Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 text-lg font-semibold">Oasis Housing Association</p>
          <p className="text-sm text-gray-400">&copy; 2025 Oasis Housing Association. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">For urgent enquiries, please use the designated WhatsApp group.</p>
        </div>
      </footer>

      {/* Member Login Popup */}
      {showLoginPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => setShowLoginPopup(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Member Login Portal</h3>
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110 transform"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 font-medium">🚧 Coming Soon</p>
                  <p className="text-yellow-700 text-sm mt-1">This feature is currently under development and will be available to Founding Members upon launch.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Expected Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-oasis-green mr-3">📊</span>
                      <div>
                        <p className="font-medium text-gray-900">Financial Dashboard</p>
                        <p className="text-sm text-gray-600">Real-time fund balances, expenditure reports, and transparency metrics</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-oasis-green mr-3">📋</span>
                      <div>
                        <p className="font-medium text-gray-900">Document Access</p>
                        <p className="text-sm text-gray-600">Constitution, Rules & Regulations, and legal documents</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-oasis-green mr-3">🗺️</span>
                      <div>
                        <p className="font-medium text-gray-900">Land Details</p>
                        <p className="text-sm text-gray-600">Interactive maps, plot information, and development updates</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-oasis-green mr-3">👥</span>
                      <div>
                        <p className="font-medium text-gray-900">Member Directory</p>
                        <p className="text-sm text-gray-600">Contact information and member profiles</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-oasis-green mr-3">💬</span>
                      <div>
                        <p className="font-medium text-gray-900">Communication Hub</p>
                        <p className="text-sm text-gray-600">Announcements, meeting schedules, and community updates</p>
                      </div>
                    </li>
                     <li className="flex items-start">
                       <span className="text-oasis-green mr-3">💰</span>
                       <div>
                         <p className="font-medium text-gray-900">Personal Finance Portal</p>
                         <p className="text-sm text-gray-600">View transaction history, payment plans, payment options, and manage your financial commitments</p>
                       </div>
                     </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Access Requirements:</strong> This portal will be available exclusively to Founding Members who have completed their initial commitment fee payment and are registered with the association.
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowLoginPopup(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-300"
                  >
                    Close
                  </button>
                  <a
                    href="#commitment"
                    onClick={() => setShowLoginPopup(false)}
                    className="px-6 py-2 bg-oasis-green text-white rounded-lg hover:bg-green-700 transition duration-300 font-medium"
                  >
                    Become a Founding Member
                  </a>
                </div>
              </div>
            </div>
          </div>
    </div>
      )}
    </main>
  );
}

