import { db, isFirebaseConfigured } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  seedProfile,
  seedSkills,
  seedExperience,
  seedProjects,
  seedResearch,
  seedCertifications,
  seedActivities,
  seedSettings,
} from '@/data/seed';
import type {
  ProfileData,
  SkillItem,
  ExperienceItem,
  ProjectItem,
  ResearchItem,
  CertificationItem,
  ActivityItem,
  SiteSettings,
  ContactMessage,
} from '@/types/portfolio';

export const repository = {
  async getProfile(): Promise<ProfileData> {
    if (!isFirebaseConfigured || !db) return seedProfile;
    try {
      const snap = await getDoc(doc(db, 'profile', 'main'));
      if (snap.exists()) {
        return snap.data() as ProfileData;
      }
      return seedProfile;
    } catch {
      return seedProfile;
    }
  },

  async getSettings(): Promise<SiteSettings> {
    if (!isFirebaseConfigured || !db) return seedSettings;
    try {
      const snap = await getDoc(doc(db, 'settings', 'main'));
      if (snap.exists()) {
        return snap.data() as SiteSettings;
      }
      return seedSettings;
    } catch {
      return seedSettings;
    }
  },

  async getSkills(): Promise<SkillItem[]> {
    if (!isFirebaseConfigured || !db) return seedSkills;
    try {
      const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SkillItem));
      }
      return seedSkills;
    } catch {
      return seedSkills;
    }
  },

  async getExperience(): Promise<ExperienceItem[]> {
    if (!isFirebaseConfigured || !db) return seedExperience;
    try {
      const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ExperienceItem));
      }
      return seedExperience;
    } catch {
      return seedExperience;
    }
  },

  async getProjects(): Promise<ProjectItem[]> {
    if (!isFirebaseConfigured || !db) return seedProjects;
    try {
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ProjectItem));
      }
      return seedProjects;
    } catch {
      return seedProjects;
    }
  },

  async getResearch(): Promise<ResearchItem[]> {
    if (!isFirebaseConfigured || !db) return seedResearch;
    try {
      const q = query(collection(db, 'research'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ResearchItem));
      }
      return seedResearch;
    } catch {
      return seedResearch;
    }
  },

  async getCertifications(): Promise<CertificationItem[]> {
    if (!isFirebaseConfigured || !db) return seedCertifications;
    try {
      const q = query(collection(db, 'certifications'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CertificationItem));
      }
      return seedCertifications;
    } catch {
      return seedCertifications;
    }
  },

  async getActivities(): Promise<ActivityItem[]> {
    if (!isFirebaseConfigured || !db) return seedActivities;
    try {
      const q = query(collection(db, 'activities'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ActivityItem));
      }
      return seedActivities;
    } catch {
      return seedActivities;
    }
  },

  async submitMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    // If honeypot is filled, silent reject
    if (msg.hp && msg.hp.trim().length > 0) {
      return { success: true, message: 'Message recorded.' };
    }

    if (!isFirebaseConfigured || !db) {
      // Local fallback simulation when offline or unconfigured
      console.info('[Repository] Local submission (no Firebase):', msg);
      return { success: true, message: 'Message sent successfully (Offline Mode).' };
    }

    try {
      await addDoc(collection(db, 'messages'), {
        name: msg.name.trim(),
        email: msg.email.trim(),
        message: msg.message.trim(),
        createdAt: serverTimestamp(),
      });
      return { success: true, message: 'Message sent successfully.' };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to send message';
      return { success: false, message: errMsg };
    }
  },

  /**
   * Imports seed data into Firestore for all 8 collections.
   * By default, it preserves existing documents (overwrite: false).
   */
  async importStarterContent(
    overwrite = false
  ): Promise<{ success: boolean; count: number; message: string }> {
    if (!isFirebaseConfigured || !db) {
      return {
        success: false,
        count: 0,
        message: 'Firebase is not configured or offline. Running on local seed data.',
      };
    }
    let count = 0;
    try {
      // 1. Profile
      const profileRef = doc(db, 'profile', 'main');
      if (overwrite || !(await getDoc(profileRef)).exists()) {
        await setDoc(profileRef, seedProfile);
        count++;
      }

      // 2. Settings
      const settingsRef = doc(db, 'settings', 'main');
      if (overwrite || !(await getDoc(settingsRef)).exists()) {
        await setDoc(settingsRef, seedSettings);
        count++;
      }

      // 3. Skills
      for (const skill of seedSkills) {
        const ref = doc(db, 'skills', skill.id);
        if (overwrite || !(await getDoc(ref)).exists()) {
          await setDoc(ref, skill);
          count++;
        }
      }

      // 4. Experience
      for (const exp of seedExperience) {
        const ref = doc(db, 'experience', exp.id);
        if (overwrite || !(await getDoc(ref)).exists()) {
          await setDoc(ref, exp);
          count++;
        }
      }

      // 5. Projects
      for (const proj of seedProjects) {
        const ref = doc(db, 'projects', proj.id);
        if (overwrite || !(await getDoc(ref)).exists()) {
          await setDoc(ref, proj);
          count++;
        }
      }

      // 6. Research
      for (const item of seedResearch) {
        const ref = doc(db, 'research', item.id);
        if (overwrite || !(await getDoc(ref)).exists()) {
          await setDoc(ref, item);
          count++;
        }
      }

      // 7. Certifications
      for (const cert of seedCertifications) {
        const ref = doc(db, 'certifications', cert.id);
        if (overwrite || !(await getDoc(ref)).exists()) {
          await setDoc(ref, cert);
          count++;
        }
      }

      // 8. Activities
      for (const act of seedActivities) {
        const ref = doc(db, 'activities', act.id);
        if (overwrite || !(await getDoc(ref)).exists()) {
          await setDoc(ref, act);
          count++;
        }
      }

      return {
        success: true,
        count,
        message: `Successfully seeded ${count} documents into Firestore.`,
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Unknown seeding error';
      return { success: false, count, message: errMsg };
    }
  },
};

// Global browser hook for seeding Firestore prior to Stage 8 Admin CMS
if (typeof window !== 'undefined') {
  (window as unknown as { __seedFirestore: (overwrite?: boolean) => Promise<unknown> }).__seedFirestore =
    (overwrite = false) => repository.importStarterContent(overwrite);
}


