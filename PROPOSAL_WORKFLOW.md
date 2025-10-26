# Proposal Workflow Documentation

## Overview

The OHA voting system uses a **two-tier proposal workflow** designed to simplify user submissions while maintaining structured, detailed proposals for voting.

---

## Workflow Stages

### 1. User Submission (Plain Text Request)

**What users do:**
- Submit a simple plain text description of what they want to propose
- No need to structure questions, options, or details
- Just describe the idea in natural language

**Example submissions:**
```
"I think we should hire a lawyer to help with land acquisition"

"We need to decide on membership fees for next year"

"Can we vote on which marketing strategy to use?"
```

**Technical implementation:**
- Stored in `/src/data/proposal-requests.json`
- Type: `ProposalRequest`
- Status: `pending`

---

### 2. Admin Review & Structuring

**What admins do:**
- Review pending proposal requests
- Flesh out the plain text into structured proposals with:
  - **Title** - Clear, concise proposal name
  - **Description** - Detailed context and background
  - **Questions** - One or multiple questions for voting
  - **Options** - Custom voting options per question

**Admin converts:**
```
Plain text: "I think we should hire a lawyer"

↓

Structured Proposal:
├─ Title: "Legal Counsel Selection"
├─ Description: "Selection of legal counsel for group land buying..."
└─ Questions:
    ├─ Question 1: "Which law firm should OHA engage?"
    │   ├─ Option 1: Law firm of Mr Maposa
    │   ├─ Option 2: Takundwa Mbereko Attorneys
    │   └─ Option 3: Other Firm
    └─ Question 2: "How should we conduct due diligence?"
        ├─ Option 1: Member Voting
        ├─ Option 2: Committee Decision
        └─ Option 3: Professional Review
```

**Technical implementation:**
- Create new `Proposal` with full structure
- Update `ProposalRequest` status to `approved`
- Link request to proposal via `proposalId`

---

### 3. Active Voting

**What users do:**
- View structured proposals with all questions
- Vote on each question
- Provide justification for their votes

**Technical implementation:**
- Proposal status: `active`
- Votes stored per question in `users.json`
- Lock-in date enforced

---

## Data Structure

### ProposalRequest (Plain Text Submission)

```typescript
{
  id: "request123",
  requestText: "I want to propose we hire a lawyer",
  status: "pending" | "approved" | "rejected",
  createdBy: "192.168.1.1",
  createdAt: "2025-10-26T10:00:00Z",
  reviewedBy: "192.168.1.2",      // Admin who reviewed
  reviewedAt: "2025-10-26T11:00:00Z",
  proposalId: "prop1"              // Links to created proposal
}
```

### Proposal (Structured Voting Document)

```typescript
{
  id: "prop1",
  title: "Legal Counsel Selection",
  description: "Selection of legal counsel for group land buying...",
  status: "draft" | "active" | "completed",
  createdBy: "192.168.1.2",        // Admin who structured it
  createdAt: "2025-10-26T11:00:00Z",
  lockInDate: "2025-11-15T23:59:59Z",
  questions: [
    {
      id: "q1",
      title: "Which law firm should OHA engage?",
      description: "Select the legal counsel for our activities.",
      type: "single-choice",
      required: true,
      options: [
        {
          id: "maposa",
          label: "Law firm of Mr Maposa",
          description: "Has existing knowledge on group buying"
        },
        {
          id: "mbereko",
          label: "Takundwa Mbereko Attorneys",
          description: "Recommended by member with experience"
        },
        {
          id: "other",
          label: "Other Firm",
          description: "Continue searching for alternatives"
        }
      ]
    }
  ]
}
```

---

## Question Types

### 1. Single Choice (Yes/No)
```typescript
{
  type: "single-choice",
  options: [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
    { id: "abstain", label: "Abstain" }
  ]
}
```

### 2. Single Choice (Selection from List)
```typescript
{
  type: "single-choice",
  options: [
    { id: "firm-a", label: "Smith & Associates", description: "$250/hr" },
    { id: "firm-b", label: "Jones Legal", description: "$300/hr" },
    { id: "firm-c", label: "Williams Law", description: "$275/hr" }
  ]
}
```

### 3. Multiple Choice
```typescript
{
  type: "multiple-choice",
  options: [
    { id: "brochure", label: "Professional Brochure" },
    { id: "website", label: "Official Website" },
    { id: "video", label: "Promotional Video" },
    { id: "presentation", label: "Presentation Deck" }
  ]
}
```

### 4. Ranking (Defined but not yet implemented in UI)
```typescript
{
  type: "ranking",
  options: [
    { id: "option-a", label: "First Choice" },
    { id: "option-b", label: "Second Choice" },
    { id: "option-c", label: "Third Choice" }
  ]
}
```

---

## Benefits of This Workflow

### For Users
- ✅ Simple text box submission
- ✅ No need to understand proposal structure
- ✅ Lower barrier to participation
- ✅ Focus on the idea, not the format

### For Admins
- ✅ Control over proposal quality
- ✅ Ensure questions are clear and well-structured
- ✅ Maintain consistency across proposals
- ✅ Can add context and details users might miss

### For the Organization
- ✅ High-quality, structured proposals for voting
- ✅ Multiple questions per proposal (comprehensive)
- ✅ Flexible voting options (yes/no, lists, multiple choice)
- ✅ Clear vote tracking per question

---

## File Structure

```
src/
├── data/
│   ├── proposal-requests.json  (NEW - Plain text submissions)
│   ├── proposals.json           (Structured proposals)
│   ├── users.json               (User data and votes)
│   └── comments.json            (Comments on proposals)
├── types/
│   └── voting.ts                (Updated with ProposalRequest type)
├── utils/
│   └── data.ts                  (Updated with request functions)
└── app/api/
    ├── proposal-request/        (TODO - API for submissions)
    ├── proposal/                (Existing - Proposal CRUD)
    ├── vote/                    (Existing - Vote management)
    └── admin/                   (Update - Request review)
```

---

## Next Steps (Implementation)

1. **Create API endpoint** `/api/proposal-request/route.ts`
   - POST: Submit plain text request
   - GET: Fetch all requests (admin only)

2. **Update Admin Panel** to show pending requests
   - List pending proposal requests
   - Button to "Create Proposal" from request
   - Form to structure the proposal with questions

3. **Simplify User Submission Form**
   - Remove complex fields
   - Just: Plain text area + Submit button
   - Success message: "Request submitted for review"

4. **Implement Ranking Question Type** in UI
   - Drag-and-drop interface
   - Show ranked order
   - Validate ranking submissions

---

## Current State

### ✅ Completed
- Data structure defined
- TypeScript types created
- Data utility functions added
- Existing proposals follow the correct format
- Multiple questions per proposal working
- Vote tracking per question working

### 🔄 In Progress
- Documentation (this file)

### ⏳ To Do
- API endpoint for proposal requests
- Admin panel for request review
- Simplified user submission form
- Ranking question UI implementation

---

## Examples from Current System

### Example 1: Simple Yes/No Proposal
**Title:** "Land Acquisition Strategy"
**Questions:** 1
**Type:** Single-choice (Yes/No/Abstain)

### Example 2: Multiple Questions Proposal
**Title:** "Administrative Document Signing Process"
**Questions:** 2
- Q1: Which signing method? (3 options)
- Q2: Who handles emergencies? (3 options)

### Example 3: Multiple Choice Proposal
**Title:** "Marketing and Outreach Strategy"
**Questions:** 2
- Q1: Primary approach? (single-choice, 4 options)
- Q2: Materials to prioritize? (multiple-choice, 4 options)

---

## API Reference

### Read Proposal Requests
```typescript
import { readProposalRequestsData } from '@/utils/data';
const requests = await readProposalRequestsData();
```

### Write Proposal Requests
```typescript
import { writeProposalRequestsData } from '@/utils/data';
import { generateRequestId } from '@/types/voting';

const newRequest = {
  id: generateRequestId(),
  requestText: "User's plain text description",
  status: 'pending',
  createdBy: userIp,
  createdAt: new Date().toISOString()
};

requests[newRequest.id] = newRequest;
await writeProposalRequestsData(requests);
```

### Type Guards
```typescript
import { isProposalRequest } from '@/types/voting';

if (isProposalRequest(data)) {
  // TypeScript knows this is a ProposalRequest
}
```

---

## Conclusion

This two-tier system provides the best of both worlds:
- **Simple** for users to submit ideas
- **Structured** for voting and decision-making
- **Flexible** to support any type of question or voting option
- **Scalable** as the organization grows
