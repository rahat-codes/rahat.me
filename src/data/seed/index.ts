import { seedProfile as rawProfile } from './profile';
import { seedSkills as rawSkills } from './skills';
import { seedExperience as rawExperience } from './experience';
import { seedProjects as rawProjects } from './projects';
import { seedResearch as rawResearch } from './research';
import { seedCertifications as rawCertifications } from './certifications';
import { seedActivities as rawActivities } from './activities';
import { seedSettings as rawSettings } from './settings';
import type {
  ProfileData,
  SkillItem,
  ExperienceItem,
  ProjectItem,
  ResearchItem,
  CertificationItem,
  ActivityItem,
  SiteSettings,
} from '@/types/portfolio';

/**
 * Deeply traverses data structures and ensures that every LocalizedString
 * carrying KO or BN translations explicitly includes reviewed: { ko: false, bn: false }
 * as mandated by SPEC.md section 8 rule 6 (marking machine translations unreviewed for admin).
 */
export function markUnreviewed<T>(item: T): T {
  if (!item || typeof item !== 'object') return item;
  if (Array.isArray(item)) {
    return item.map(markUnreviewed) as unknown as T;
  }
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(item)) {
    if (val && typeof val === 'object') {
      result[key] = markUnreviewed(val);
    } else {
      result[key] = val;
    }
  }
  if ('en' in result && ('ko' in result || 'bn' in result)) {
    const existing = (result.reviewed as Record<string, boolean> | undefined) || {};
    result.reviewed = {
      ko: existing.ko ?? false,
      bn: existing.bn ?? false,
    };
  }
  return result as T;
}

export const seedProfile: ProfileData = markUnreviewed(rawProfile);
export const seedSkills: SkillItem[] = markUnreviewed(rawSkills);
export const seedExperience: ExperienceItem[] = markUnreviewed(rawExperience);
export const seedProjects: ProjectItem[] = markUnreviewed(rawProjects);
export const seedResearch: ResearchItem[] = markUnreviewed(rawResearch);
export const seedCertifications: CertificationItem[] = markUnreviewed(rawCertifications);
export const seedActivities: ActivityItem[] = markUnreviewed(rawActivities);
export const seedSettings: SiteSettings = markUnreviewed(rawSettings);
