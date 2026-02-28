type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * Combines class names into a single string
 * Filters out falsy values and flattens arrays
 * 
 * For enhanced functionality with Tailwind CSS conflict resolution,
 * install clsx and tailwind-merge:
 * npm install clsx tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter((x): x is string | number => Boolean(x) && typeof x !== 'boolean')
    .map(String)
    .join(' ')
    .trim();
}
