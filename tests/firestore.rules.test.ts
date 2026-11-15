import { describe, it, beforeAll, beforeEach, afterAll } from 'vitest';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';

const PROJECT_ID = 'demo-rahat-me';
const ADMIN_UID = 'admin-rahat-uid';
const ADMIN_EMAIL = 'rahatmdmahadihasan@gmail.com';
const NON_ADMIN_UID = 'user-random-123';

describe('Firestore Security Rules', () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    const rulesPath = resolve(__dirname, '../firestore.rules');
    const rules = readFileSync(rulesPath, 'utf8');

    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules,
        host: '127.0.0.1',
        port: 8080,
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();

    // Seed test data with admin context (bypasses rules)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, 'skills', 'skill-pub'), {
        name: 'Python',
        status: 'published',
      });
      await setDoc(doc(db, 'skills', 'skill-draft'), {
        name: 'Secret Skill',
        status: 'draft',
      });
      await setDoc(doc(db, 'projects', 'proj-pub'), {
        title: { en: 'DOB Attendance' },
        status: 'published',
      });
      await setDoc(doc(db, 'projects', 'proj-draft'), {
        title: { en: 'Unreleased Project' },
        status: 'draft',
      });
      await setDoc(doc(db, 'messages', 'msg-1'), {
        name: 'Alice',
        email: 'alice@example.com',
        message: 'Hello Rahat, love your portfolio!',
        createdAt: new Date().toISOString(),
      });
      await setDoc(doc(db, 'profile', 'main'), {
        name: { en: 'Rahat' },
      });
    });
  });

  // ─── 1. Public Read: Published vs Draft ──────────────────────────────────
  describe('1. Public Read (Published vs Draft)', () => {
    it('allows public unauthenticated read of published skills', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(getDoc(doc(unauthedDb, 'skills', 'skill-pub')));
    });

    it('denies public unauthenticated read of draft skills', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(getDoc(doc(unauthedDb, 'skills', 'skill-draft')));
    });

    it('allows public unauthenticated read of published projects', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(getDoc(doc(unauthedDb, 'projects', 'proj-pub')));
    });

    it('denies public unauthenticated read of draft projects', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(getDoc(doc(unauthedDb, 'projects', 'proj-draft')));
    });

    it('allows public read of profile document', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(getDoc(doc(unauthedDb, 'profile', 'main')));
    });

    it('allows admin by UID to read draft items', async () => {
      const adminDb = testEnv.authenticatedContext(ADMIN_UID).firestore();
      await assertSucceeds(getDoc(doc(adminDb, 'skills', 'skill-draft')));
      await assertSucceeds(getDoc(doc(adminDb, 'projects', 'proj-draft')));
    });
  });

  // ─── 2. Public Write Denied Everywhere ───────────────────────────────────
  describe('2. Public Write Denied Everywhere', () => {
    it('denies unauthenticated write to profile', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(setDoc(doc(unauthedDb, 'profile', 'main'), { name: 'Hacked' }));
    });

    it('denies unauthenticated write to skills', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(setDoc(doc(unauthedDb, 'skills', 'new-skill'), { name: 'Rust', status: 'published' }));
    });

    it('denies unauthenticated write to projects', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(setDoc(doc(unauthedDb, 'projects', 'new-proj'), { title: { en: 'Fake' }, status: 'published' }));
    });

    it('denies authenticated non-admin write to skills', async () => {
      const nonAdminDb = testEnv.authenticatedContext(NON_ADMIN_UID, { email: 'random@test.com' }).firestore();
      await assertFails(setDoc(doc(nonAdminDb, 'skills', 'skill-pub'), { name: 'Tampered' }));
    });

    it('denies authenticated non-admin write to profile', async () => {
      const nonAdminDb = testEnv.authenticatedContext(NON_ADMIN_UID, { email: 'random@test.com' }).firestore();
      await assertFails(setDoc(doc(nonAdminDb, 'profile', 'main'), { name: { en: 'Tampered' } }));
    });
  });

  // ─── 3. Contact Message Validation & Honeypot ───────────────────────────
  describe('3. Contact Message Validation & Honeypot', () => {
    it('allows message create with valid fields and empty honeypot', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(
        addDoc(collection(unauthedDb, 'messages'), {
          name: 'Recruiter Kim',
          email: 'recruiter@company.kr',
          message: 'We are very impressed by your portfolio and would like to interview you.',
          hp: '',
        })
      );
    });

    it('allows message create when honeypot field is omitted', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(
        addDoc(collection(unauthedDb, 'messages'), {
          name: 'Recruiter Lee',
          email: 'lee@company.com',
          message: 'Hello Rahat! Let us connect for an internship opportunity.',
        })
      );
    });

    it('denies message create when honeypot field is filled (bot detection)', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        addDoc(collection(unauthedDb, 'messages'), {
          name: 'Spam Bot',
          email: 'bot@spammer.com',
          message: 'Buy cheap tokens now at spam-site.com!',
          hp: 'I am a bot payload',
        })
      );
    });

    it('denies message create with name shorter than 2 characters', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        addDoc(collection(unauthedDb, 'messages'), {
          name: 'A',
          email: 'valid@example.com',
          message: 'This message is long enough to pass validation.',
        })
      );
    });

    it('denies message create with message shorter than 10 characters', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        addDoc(collection(unauthedDb, 'messages'), {
          name: 'Valid Name',
          email: 'valid@example.com',
          message: 'Short',
        })
      );
    });

    it('denies message create with email shorter than 5 characters', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        addDoc(collection(unauthedDb, 'messages'), {
          name: 'Valid Name',
          email: 'a@b',
          message: 'This message is long enough to pass validation.',
        })
      );
    });
  });

  // ─── 4. Message Read & Update Denied ─────────────────────────────────────
  describe('4. Message Read & Update Denied for Public', () => {
    it('denies public unauthenticated read of messages', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(getDoc(doc(unauthedDb, 'messages', 'msg-1')));
    });

    it('denies public unauthenticated update of messages', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(updateDoc(doc(unauthedDb, 'messages', 'msg-1'), { message: 'Updated' }));
    });

    it('denies public unauthenticated delete of messages', async () => {
      const unauthedDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(deleteDoc(doc(unauthedDb, 'messages', 'msg-1')));
    });

    it('denies authenticated non-admin read of messages', async () => {
      const nonAdminDb = testEnv.authenticatedContext(NON_ADMIN_UID, { email: 'user@test.com' }).firestore();
      await assertFails(getDoc(doc(nonAdminDb, 'messages', 'msg-1')));
    });
  });

  // ─── 5. Admin Authorization ──────────────────────────────────────────────
  describe('5. Admin Authorization', () => {
    it('allows admin identified by UID full write access to collections', async () => {
      const adminDb = testEnv.authenticatedContext(ADMIN_UID).firestore();
      await assertSucceeds(
        setDoc(doc(adminDb, 'skills', 'skill-new'), {
          name: 'Go',
          category: 'backend',
          status: 'published',
        })
      );
    });

    it('allows admin identified by UID to read and delete messages', async () => {
      const adminDb = testEnv.authenticatedContext(ADMIN_UID).firestore();
      await assertSucceeds(getDoc(doc(adminDb, 'messages', 'msg-1')));
      await assertSucceeds(deleteDoc(doc(adminDb, 'messages', 'msg-1')));
    });

    it('allows admin identified by email with email_verified: true', async () => {
      const adminEmailDb = testEnv
        .authenticatedContext('any-uid', {
          email: ADMIN_EMAIL,
          email_verified: true,
        })
        .firestore();
      await assertSucceeds(getDoc(doc(adminEmailDb, 'skills', 'skill-draft')));
      await assertSucceeds(getDoc(doc(adminEmailDb, 'messages', 'msg-1')));
    });

    it('denies admin privileges if email matches but email_verified is false', async () => {
      const unverifiedAdminDb = testEnv
        .authenticatedContext('impostor-uid', {
          email: ADMIN_EMAIL,
          email_verified: false,
        })
        .firestore();
      await assertFails(getDoc(doc(unverifiedAdminDb, 'skills', 'skill-draft')));
      await assertFails(getDoc(doc(unverifiedAdminDb, 'messages', 'msg-1')));
    });
  });
});
