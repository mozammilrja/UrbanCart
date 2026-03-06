/**
 * About Feature
 */

// Types
export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface AboutPageData {
  story: string;
  mission: string;
  vision: string;
  values: string[];
  team: TeamMember[];
  milestones: Milestone[];
}

// Query keys
export const aboutKeys = {
  all: ['about'] as const,
  page: () => [...aboutKeys.all, 'page'] as const,
  team: () => [...aboutKeys.all, 'team'] as const,
};
