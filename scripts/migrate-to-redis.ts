import { Redis } from '@upstash/redis';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Redis keys
const KEYS = {
  USERS: 'oha:users',
  PROPOSALS: 'oha:proposals',
  COMMENTS: 'oha:comments',
  PROPOSAL_REQUESTS: 'oha:proposal-requests',
};

async function migrate() {
  console.log('🚀 Starting migration to Redis...\n');

  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');

    // Migrate users.json
    try {
      const usersPath = path.join(dataDir, 'users.json');
      if (fs.existsSync(usersPath)) {
        const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        await redis.set(KEYS.USERS, usersData);
        console.log('✅ Migrated users.json');
      } else {
        await redis.set(KEYS.USERS, {});
        console.log('ℹ️  No users.json found, initialized empty users data');
      }
    } catch (error) {
      console.error('⚠️  Error migrating users:', error);
      await redis.set(KEYS.USERS, {});
    }

    // Migrate proposals.json
    try {
      const proposalsPath = path.join(dataDir, 'proposals.json');
      if (fs.existsSync(proposalsPath)) {
        const proposalsData = JSON.parse(fs.readFileSync(proposalsPath, 'utf8'));
        await redis.set(KEYS.PROPOSALS, proposalsData);
        console.log('✅ Migrated proposals.json');
        console.log(`   Found ${Object.keys(proposalsData).length} proposals`);
      } else {
        await redis.set(KEYS.PROPOSALS, {});
        console.log('ℹ️  No proposals.json found, initialized empty proposals data');
      }
    } catch (error) {
      console.error('⚠️  Error migrating proposals:', error);
      await redis.set(KEYS.PROPOSALS, {});
    }

    // Migrate comments.json
    try {
      const commentsPath = path.join(dataDir, 'comments.json');
      if (fs.existsSync(commentsPath)) {
        const commentsData = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
        await redis.set(KEYS.COMMENTS, commentsData);
        console.log('✅ Migrated comments.json');
      } else {
        await redis.set(KEYS.COMMENTS, {});
        console.log('ℹ️  No comments.json found, initialized empty comments data');
      }
    } catch (error) {
      console.error('⚠️  Error migrating comments:', error);
      await redis.set(KEYS.COMMENTS, {});
    }

    // Migrate proposal-requests.json
    try {
      const requestsPath = path.join(dataDir, 'proposal-requests.json');
      if (fs.existsSync(requestsPath)) {
        const requestsData = JSON.parse(fs.readFileSync(requestsPath, 'utf8'));
        await redis.set(KEYS.PROPOSAL_REQUESTS, requestsData);
        console.log('✅ Migrated proposal-requests.json');
      } else {
        await redis.set(KEYS.PROPOSAL_REQUESTS, {});
        console.log('ℹ️  No proposal-requests.json found, initialized empty proposal requests data');
      }
    } catch (error) {
      console.error('⚠️  Error migrating proposal requests:', error);
      await redis.set(KEYS.PROPOSAL_REQUESTS, {});
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\nYou can now run: npm run dev');
    console.log('Your voting system is now powered by Redis! 🚀');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
