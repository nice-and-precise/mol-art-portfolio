/**
 * Global Theme System
 * Manages light/dark theme toggle with localStorage persistence
 */

export type Theme = 'light' | 'dark';

/**
 * Get current theme from localStorage or default to light
 */
export function getTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'light';
  const stored = localStorage.getItem('pottery-theme');
  return (stored as Theme) || 'light';
}

/**
 * Set theme and persist to localStorage
 */
export function setTheme(theme: Theme): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('pottery-theme', theme);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): void {
  const current = getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
}

// Apply theme immediately on load to prevent FOUC
if (typeof document !== 'undefined') {
  setTheme(getTheme());
}

// Export to window for use in components
declare global {
  interface Window {
    toggleTheme: () => void;
    getTheme: () => Theme;
    setTheme: (theme: Theme) => void;
  }
}

if (typeof window !== 'undefined') {
  window.toggleTheme = toggleTheme;
  window.getTheme = getTheme;
  window.setTheme = setTheme;
}
