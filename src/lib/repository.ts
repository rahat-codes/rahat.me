import { db, isFirebaseConfigured } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
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
};

