/**
 * Tiny class-name joiner. No dependencies.
 * Filters out falsy values and trims whitespace.
 */
export type ClassValue = string | number | null | false | undefined;

export const cn = (...inputs: ClassValue[]): string =>
  inputs.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
