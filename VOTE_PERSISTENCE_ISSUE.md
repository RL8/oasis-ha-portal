# Vote Persistence Issue - Critical Fix Needed

## Problem

**Votes are NOT being saved in production!**

### Why This Happens

The OHA Voting System currently uses **file-based storage** (JSON files in `/src/data/`):
- `users.json` - Stores user votes
- `proposals.json` - Stores proposals
- `comments.json` - Stores comments

**This works locally** but **FAILS in production (Vercel)** because:
- Vercel uses serverless functions
- Serverless functions have **read-only filesystems**
- File writes fail silently
- Votes appear to save (success message) but are immediately lost

### Evidence in Code

**File:** `src/app/api/vote/route.ts` (Line 113-126)

```typescript
// Save data (only in development)
try {
  await writeUsersData(users);
  await writeProposalsData(proposals);
} catch (error) {
  // In production (Vercel), file writes are not allowed
  // Return success but don't persist the data
  console.log('File write not allowed in production environment');
}

return NextResponse.json({
  success: true,
  vote: users[userIp].votes[voteKey],
  message: process.env.NODE_ENV === 'production'
    ? 'Vote recorded (demo mode - not persisted)' ← THIS MESSAGE!
    : 'Vote recorded successfully'
});
```

The message says "demo mode - not persisted" but users might not notice or understand it.

---

## Impact

### What Doesn't Work:
- ❌ Votes are lost immediately after submission
- ❌ Users can't see each other's votes
- ❌ Comments are not persisted
- ❌ New proposals are not saved
- ❌ Vote counts don't update
- ❌ "View All Votes" shows nothing

### What Still Works:
- ✅ User interface and navigation
- ✅ Form validation
- ✅ Name entry modal
- ✅ Proposal display (from pre-seeded data)
- ✅ Vote submission UI (but data is lost)

---

## Solution Options

### Option 1: Supabase Database (RECOMMENDED) ⭐

**Pros:**
- ✅ Free tier available
- ✅ PostgreSQL database (reliable, scalable)
- ✅ Real-time subscriptions (votes update live)
- ✅ Built-in authentication
- ✅ Row-level security
- ✅ Easy Vercel integration

**Implementation Time:** 2-3 hours

**Steps:**
1. Create Supabase account and project
2. Create database tables (users, proposals, votes, comments)
3. Update API routes to use Supabase client
4. Add environment variables to Vercel
5. Migrate existing proposal data
6. Test and deploy

**Cost:** FREE (up to 500MB database, 2GB bandwidth)

---

### Option 2: Vercel KV (Redis)

**Pros:**
- ✅ Integrated with Vercel
- ✅ Fast key-value storage
- ✅ Simple API

**Cons:**
- ⚠️ Not ideal for relational data
- ⚠️ Limited free tier (256MB)
- ⚠️ Requires paid Vercel plan for production

**Implementation Time:** 1-2 hours

---

### Option 3: Vercel Postgres

**Pros:**
- ✅ Integrated with Vercel
- ✅ PostgreSQL database
- ✅ Easy setup

**Cons:**
- ⚠️ Requires paid Vercel plan ($20/month minimum)
- ⚠️ Limited free tier (256MB)

**Implementation Time:** 2-3 hours

---

### Option 4: MongoDB Atlas

**Pros:**
- ✅ Free tier available (512MB)
- ✅ Document database (good for JSON-like data)
- ✅ Easy to use

**Cons:**
- ⚠️ Requires separate account
- ⚠️ Slightly more complex queries

**Implementation Time:** 2-3 hours

---

## Recommended Solution: Supabase

I recommend **Supabase** because:

1. **Free tier** is generous and permanent
2. **PostgreSQL** is reliable and widely supported
3. **Real-time features** can show live vote updates
4. **Authentication** built-in (for future)
5. **Easy migration** from current JSON structure
6. **Vercel integration** is seamless

---

## Implementation Plan (Supabase)

### Phase 1: Setup (15 minutes)
1. Create Supabase account at https://supabase.com
2. Create new project
3. Get project URL and API keys
4. Add to Vercel environment variables

### Phase 2: Database Schema (30 minutes)

Create tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'General Member',
  committee TEXT DEFAULT 'None',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Proposals table
CREATE TABLE proposals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  lock_in_date TIMESTAMP NOT NULL,
  questions JSONB NOT NULL
);

-- Votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  proposal_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  selected_options TEXT[] NOT NULL,
  justification TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, proposal_id, question_id)
);

-- Comments table
CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  proposal_id TEXT NOT NULL,
  user_id UUID REFERENCES users(id),
  text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

### Phase 3: Update API Routes (1-2 hours)

Replace file I/O with Supabase queries:

**Before (File-based):**
```typescript
const users = await readUsersData();
users[userIp].votes[voteKey] = vote;
await writeUsersData(users);
```

**After (Supabase):**
```typescript
const { data, error } = await supabase
  .from('votes')
  .upsert({ user_id, proposal_id, question_id, ...vote });
```

### Phase 4: Testing (30 minutes)

- ✅ Test vote submission
- ✅ Test vote retrieval
- ✅ Test "View All Votes"
- ✅ Test comments
- ✅ Test proposal creation

### Phase 5: Deploy (15 minutes)

- Push to GitHub
- Vercel auto-deploys
- Verify in production

---

## Current Workaround (Temporary)

Until database is implemented, users can:

1. **Test Locally:**
   - Clone repository
   - Run `npm run dev`
   - Votes will persist in local JSON files

2. **Understand Limitation:**
   - Production votes are NOT saved
   - Message shows "demo mode - not persisted"
   - This is intentional until database is set up

---

## Migration Path

When migrating to database:

1. **Export current proposal data:**
   ```bash
   cat src/data/proposals.json
   ```

2. **Import to Supabase:**
   - Use Supabase SQL editor
   - Insert proposals as rows
   - Maintain same IDs and structure

3. **No user data loss:**
   - No real user data exists yet (production votes not persisted)
   - Fresh start with proper persistence

---

## Next Steps

**To fix this issue, you need to:**

1. **Choose a database solution** (I recommend Supabase)
2. **Provide credentials** or create account
3. **Let me implement** the database integration
4. **Test** the new persistent storage
5. **Deploy** to production

**Estimated Total Time:** 2-3 hours

**Cost:** FREE (using Supabase free tier)

---

## Questions for You

1. Do you want to use Supabase (recommended)?
2. Do you already have a Supabase account?
3. Can you create a Supabase project and provide:
   - Project URL
   - Anon/Public API Key
   - Service Role Key (for server-side operations)

4. Or would you prefer I guide you through creating the account?

---

## Immediate Action Required

**Your votes are currently being lost!**

To fix this ASAP:

1. Create Supabase account: https://supabase.com
2. Create new project (choose free tier)
3. Get API credentials from Project Settings → API
4. Share them with me (or add to Vercel environment variables)
5. I'll implement database integration
6. Deploy fix to production

**Timeline:** Can be fixed in 2-3 hours once credentials are available.

---

## Additional Benefits of Database Migration

Beyond fixing the vote persistence issue:

- ✅ **Real-time updates** - See votes as they come in
- ✅ **Better performance** - Database queries faster than file I/O
- ✅ **Scalability** - Handle thousands of users
- ✅ **Data integrity** - ACID transactions
- ✅ **Backup & recovery** - Automatic backups
- ✅ **Analytics** - Query voting patterns
- ✅ **Security** - Row-level security policies
- ✅ **Authentication** - Real user accounts (future)

---

Let me know how you'd like to proceed!
