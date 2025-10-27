'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Header & Navigation */}
      <header className="shadow-md sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-oasis-green flex items-center">
            <div className="w-12 h-12 bg-oasis-green rounded-xl flex items-center justify-center mr-3 shadow-lg border-2 border-green-600">
              <span className="text-white text-2xl font-black">O</span>
            </div>
            <span className="hidden sm:inline">Oasis Housing Association</span>
            <span className="sm:hidden">Oasis HA</span>
          </h1>
          <nav className="hidden md:flex space-x-6 font-medium text-sm items-center">
            <a href="#about" className="hover:text-oasis-green transition duration-300">About</a>
            <a href="#benefits" className="hover:text-oasis-green transition duration-300">Benefits</a>
            <a href="#amenities" className="hover:text-oasis-green transition duration-300">Amenities</a>
            <a href="#contact" className="hover:text-oasis-green transition duration-300">Contact</a>
            <Link
              href="/voting"
              className="px-6 py-2.5 bg-oasis-green text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 font-semibold"
            >
              Member Portal →
            </Link>
          </nav>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-gray-700 hover:text-oasis-green transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#about"
              className="block py-2 text-gray-700 hover:text-oasis-green transition duration-300 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              About
            </a>
            <a
              href="#benefits"
              className="block py-2 text-gray-700 hover:text-oasis-green transition duration-300 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Benefits
            </a>
            <a
              href="#amenities"
              className="block py-2 text-gray-700 hover:text-oasis-green transition duration-300 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Amenities
            </a>
            <a
              href="#contact"
              className="block py-2 text-gray-700 hover:text-oasis-green transition duration-300 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Contact
            </a>
            <Link
              href="/voting"
              className="block py-3 px-4 bg-oasis-green text-white rounded-lg hover:bg-green-700 transition duration-300 font-semibold text-center"
              onClick={() => setShowMobileMenu(false)}
            >
              Member Portal →
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-oasis-blue to-blue-700 text-white pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Building Trusted Communities<br />
              <span className="text-green-300">Through Collective Action</span>
            </h2>
            <p className="text-xl sm:text-2xl font-light mb-6 text-blue-100">
              Join like-minded individuals creating affordable, high-standard land ownership and community development in Zimbabwe.
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              We address the lack of access to quality social services and build trust through self-reliance and community-led development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#about"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Learn More
              </a>
              <Link
                href="/voting"
                className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-xl shadow-lg transition duration-300 transform hover:scale-105 hover:bg-green-700 hover:shadow-xl"
              >
                Access Portal →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Challenges We Solve
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Two primary barriers hinder relocation to Zimbabwe
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-500">
              <div className="text-4xl mb-4">🏥</div>
              <h4 className="text-2xl font-semibold mb-3 text-gray-900">Lack of Quality Services</h4>
              <p className="text-gray-600 leading-relaxed">
                Absence of professional, trustworthy, and reliable services in critical sectors including healthcare, education, finance, and employment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-orange-500">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-2xl font-semibold mb-3 text-gray-900">Lack of Trust & Confidence</h4>
              <p className="text-gray-600 leading-relaxed">
                A significant issue within the community is the lack of trust and confidence in service providers. This is a core problem we are determined to solve.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center max-w-4xl mx-auto bg-green-50 p-8 rounded-xl border-2 border-green-200">
            <h4 className="text-2xl font-bold text-oasis-green mb-3">Our Solution: Community-Led Development</h4>
            <p className="text-lg text-gray-700">
              Working together through <strong>Self-Reliance</strong> and <strong>Community-Led Development</strong> to create and maintain high-standard services that are transparent, professional, and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Who We Are & What We Do
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A group of like-minded individuals achieving collective goals through land ownership and community development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md border-l-4 border-oasis-green">
              <div className="text-4xl mb-3 text-oasis-green">⚖️</div>
              <h4 className="text-xl font-semibold mb-2">Legal Vehicle Creation</h4>
              <p className="text-gray-600">Creating a safe, transparent, and legal vehicle for the joint purchase of large pieces of land.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <div className="text-4xl mb-3 text-blue-500">📐</div>
              <h4 className="text-xl font-semibold mb-2">Land Subdivision</h4>
              <p className="text-gray-600">Legally subdividing land into private residential stands for individual members.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md border-l-4 border-purple-500">
              <div className="text-4xl mb-3 text-purple-500">🏗️</div>
              <h4 className="text-xl font-semibold mb-2">Infrastructure Investment</h4>
              <p className="text-gray-600">Reserving ~20% of land for shared development: roads, access ways, and security infrastructure.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border-2 border-blue-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">This Group is For You If You Are:</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span>Looking for <strong>affordable land</strong> with long-term value</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span>Seeking to live in a <strong>safe, private community</strong> and upscale suburbs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span>Open to <strong>shared development</strong> for private benefit</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-gray-900 mb-2">⏰ Why Now?</h4>
            <div className="grid sm:grid-cols-3 gap-4 text-gray-700">
              <div>
                <p className="font-semibold text-yellow-800">Land Prices Soaring</p>
                <p className="text-sm">Projected to continue rising</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-800">Individual Unaffordable</p>
                <p className="text-sm">Buying alone is out of reach</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-800">Collective Power</p>
                <p className="text-sm">Together we unlock premium land</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Membership
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Joining the group provides distinct advantages unavailable to individual buyers
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-oasis-green text-white">
                    <th className="px-6 py-4 text-left font-semibold">Benefit</th>
                    <th className="px-6 py-4 text-left font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">💪 Collective Bargaining Power</td>
                    <td className="px-6 py-4 text-gray-600">Negotiate better property prices, terms, and bulk discounts that would be difficult to access individually.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">💰 Increased Affordability</td>
                    <td className="px-6 py-4 text-gray-600">Spread costs across members, reducing individual financial burden for land acquisition, legal fees, and development.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">🧠 Shared Knowledge & Expertise</td>
                    <td className="px-6 py-4 text-gray-600">Benefit from pooled insights on legal processes, land verification, property trends, and investment strategies.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">🛡️ Risk Reduction</td>
                    <td className="px-6 py-4 text-gray-600">Mitigate risks through thorough due diligence, peer review, and shared accountability mechanisms.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">📜 Transparent Ownership</td>
                    <td className="px-6 py-4 text-gray-600">Acquire property through legally recognized collective ownership models that safeguard each member&apos;s stake.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">👔 Professional Support</td>
                    <td className="px-6 py-4 text-gray-600">Engage trusted service providers (lawyers, surveyors, developers) as a group, reducing cost and ensuring quality.</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">🌍 Community & Networking</td>
                    <td className="px-6 py-4 text-gray-600">Join a trusted network of like-minded Zimbabweans focused on long-term financial empowerment and generational wealth.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Operating Principles
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Four principles that guide every decision and operation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md border-t-4 border-blue-600">
              <div className="text-4xl mb-3">⚖️</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Legal First</h4>
              <p className="text-gray-700">No funds move without legal agreements clearly established and signed.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md border-t-4 border-green-600">
              <div className="text-4xl mb-3">🗳️</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Collective Decision-Making</h4>
              <p className="text-gray-700">All major decisions made through group consensus process.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md border-t-4 border-purple-600">
              <div className="text-4xl mb-3">💎</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Transparent Costing</h4>
              <p className="text-gray-700">Everyone has visibility of and agrees to all costs involved.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md border-t-4 border-orange-600">
              <div className="text-4xl mb-3">🏡</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Individual Ownership</h4>
              <p className="text-gray-700">Ultimate goal is for everyone to own their individual plot.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Amenities */}
      <section id="amenities" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Planned Community Amenities
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Creating useful, pleasant facilities to increase desirability, comfort, and property values
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Healthcare */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">🏥</div>
                <h4 className="text-2xl font-bold text-gray-900">Healthcare Vision</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Primary focus on maintaining a safe and healthy environment, especially for vulnerable members.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Hospital / Clinic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Pharmacy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Dental Facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Optical Facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Special needs support for all ages</span>
                </li>
              </ul>
            </div>

            {/* Education */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">🎓</div>
                <h4 className="text-2xl font-bold text-gray-900">Education Vision</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive educational facilities from nursery through skills training.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Nursery School</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Primary School</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Secondary School</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Skills Training Colleges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Special Educational Needs (SEN) support</span>
                </li>
              </ul>
            </div>

            {/* Employment */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">💼</div>
                <h4 className="text-2xl font-bold text-gray-900">Employment Opportunities</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Addressing the key concern of earning a living for those considering relocation.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Jobs created through community amenities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>High-quality services for members and outsiders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Good wages to maintain high living standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Every job valued as important and unique</span>
                </li>
              </ul>
            </div>

            {/* Other Amenities */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">🏪</div>
                <h4 className="text-2xl font-bold text-gray-900">Additional Amenities</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive facilities for daily needs and quality of life.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Shopping Centre & Food Services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Banking & Postal Facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Fitness Centres & Recreation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Library & Community Halls</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Public Transportation Access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Advanced Security Systems</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-xl shadow-xl text-center">
            <h4 className="text-2xl font-bold mb-3">Our Standards of Living</h4>
            <p className="text-lg mb-6">
              We aim to guarantee fundamental human necessities and go beyond to provide quality of life, comfort, and opportunities for growth.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="font-semibold">Safety & Security</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="font-semibold">Modern Conveniences</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="font-semibold">Economic Opportunities</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="font-semibold">Social & Leisure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-oasis-green to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h3>
          <p className="text-xl mb-8 text-green-100">
            Access the member portal to view proposals, participate in voting, and connect with fellow members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/voting"
              className="inline-block px-8 py-4 bg-white text-oasis-green font-bold rounded-xl shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Access Member Portal →
            </Link>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-green-800 text-white font-bold rounded-xl shadow-lg transition duration-300 transform hover:scale-105 hover:bg-green-900"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <div className="w-10 h-10 bg-oasis-green rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-lg font-black">O</span>
                </div>
                Oasis Housing Association
              </h4>
              <p className="text-gray-400">
                Building trusted communities through collective action and self-reliance.
              </p>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#benefits" className="hover:text-white transition">Benefits</a></li>
                <li><a href="#amenities" className="hover:text-white transition">Amenities</a></li>
                <li><Link href="/voting" className="hover:text-white transition">Member Portal</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Contact</h5>
              <p className="text-gray-400 mb-2">
                For enquiries, please use the designated WhatsApp group.
              </p>
              <p className="text-sm text-gray-500">
                Member portal access available to registered members.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Oasis Housing Association. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Together, we achieve more through collective action and shared vision.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
