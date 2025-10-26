<!-- 2d408862-5148-425a-b252-ebb4e1120908 0b2106ec-5e58-4f28-bc39-2a6b6fb9b434 -->
# MVP Voting System Implementation

## Overview

Build a democratic voting system for OHA members to create proposals, vote with justifications, and manage decisions through an admin panel.

## Storage & Type Safety

- JSON files in `/src/data/` for users, proposals, comments
- TypeScript interfaces for all data structures
- Runtime validation to prevent type errors
- Cookie-based admin session management

## Implementation Phases

### Phase 1: Setup & Type Definitions

- Create `/src/data/` folder with sample JSON files
- Define TypeScript interfaces (User, Proposal, Vote, Comment)
- Add validation helper functions
- **Build check**: Run `npm run build` to verify types

### Phase 2: Core Components

- `VoteForm.tsx`: Vote buttons + justification input + name popup
- `ProposalCard.tsx`: Display proposal with votes/comments
- `CommentSection.tsx`: Show and add comments
- **Build check**: Run `npm run build` to verify types

### Phase 3: API Routes

- `/api/vote/route.ts`: Handle vote submission/updates
- `/api/proposal/route.ts`: Create and manage proposals
- `/api/admin/route.ts`: Admin actions (approve proposals, edit users)
- **Build check**: Run `npm run build` to verify types

### Phase 4: Pages & Integration

- `/voting/page.tsx`: Main voting dashboard
- `/voting/admin/page.tsx`: Admin panel with passcode 6526
- Connect components to API endpoints
- **Build check**: Run `npm run build` to verify types

### Phase 5: Polish & Testing

- Error handling and loading states
- Lock-in date warnings
- Final styling consistency
- **Build check**: Run `npm run build` to verify production build

## Key Features

- Name popup on vote/comment/propose
- Fluid voting with justification requirement
- Proposal states: Draft → Active (admin approval)
- Admin panel: User management + proposal approval
- All votes/comments visible to everyone
- "Final Vote Lock In Date" terminology

### To-dos

- [ ] Create data structure with sample users, proposals, and comments in /src/data/
- [ ] Build API routes for vote, comment, proposal, user, and admin operations
- [ ] Create NameModal, VoteForm, and ProposalCard components
- [ ] Build voting dashboard with proposal listing and creation form
- [ ] Build admin dashboard with user and proposal management
- [ ] Add voting navigation links and update main site
- [ ] Test all flows and apply final polish