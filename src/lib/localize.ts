import type { LocalizedString, SupportedLanguage } from '@/types/portfolio';

/**
 * Resolves a LocalizedString field for the given language.
 * Falls back to English, then to empty string.
 * Never returns undefined or raw key names.
 */
export function localize(
  field: LocalizedString | string | undefined | null,
  lang: SupportedLanguage = 'en'
): string {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.en || '';
}

/**
 * Resolves an array of LocalizedString items.
 */
export function localizeArray(
  items: (LocalizedString | string)[] | undefined | null,
  lang: SupportedLanguage = 'en'
): string[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map((item) => localize(item, lang));
}
