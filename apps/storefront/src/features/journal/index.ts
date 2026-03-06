/**
 * Journal/Blog Feature
 */

// Types
export interface JournalPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

// Query keys
export const journalKeys = {
  all: ['journal'] as const,
  list: (filters?: object) => [...journalKeys.all, 'list', filters] as const,
  detail: (slug: string) => [...journalKeys.all, 'detail', slug] as const,
};

// Domain
export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}

export function getPostExcerpt(content: string, maxLength: number = 150): string {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength).trim() + '...';
}
