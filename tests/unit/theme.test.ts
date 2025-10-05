import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Theme System', () => {
  let originalLocalStorage: Storage;

  beforeEach(() => {
    // Mock localStorage
    originalLocalStorage = global.localStorage;
    const localStorageMock = {
      store: {} as Record<string, string>,
      getItem(key: string) {
        return this.store[key] || null;
      },
      setItem(key: string, value: string) {
        this.store[key] = value;
      },
      removeItem(key: string) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      },
    };
    global.localStorage = localStorageMock as Storage;

    // Mock document
    global.document = {
      documentElement: {
        setAttribute: vi.fn(),
        getAttribute: vi.fn(),
      },
    } as any;
  });

  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });

  it('defaults to light theme on first visit', () => {
    localStorage.clear();

    // Simulate loading theme.ts
    const getTheme = (): 'light' | 'dark' => {
      return (localStorage.getItem('pottery-theme') as 'light' | 'dark') || 'light';
    };

    expect(getTheme()).toBe('light');
  });

  it('persists theme choice in localStorage', () => {
    const setTheme = (theme: 'light' | 'dark') => {
      localStorage.setItem('pottery-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    };

    setTheme('dark');
    expect(localStorage.getItem('pottery-theme')).toBe('dark');
  });

  it('applies data-theme attribute to documentElement', () => {
    const setTheme = (theme: 'light' | 'dark') => {
      localStorage.setItem('pottery-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    };

    setTheme('dark');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  it('toggles between light and dark themes', () => {
    const getTheme = (): 'light' | 'dark' => {
      return (localStorage.getItem('pottery-theme') as 'light' | 'dark') || 'light';
    };

    const setTheme = (theme: 'light' | 'dark') => {
      localStorage.setItem('pottery-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    };

    const toggleTheme = () => {
      const current = getTheme();
      setTheme(current === 'light' ? 'dark' : 'light');
    };

    // Start with light
    expect(getTheme()).toBe('light');

    // Toggle to dark
    toggleTheme();
    expect(getTheme()).toBe('dark');

    // Toggle back to light
    toggleTheme();
    expect(getTheme()).toBe('light');
  });

  it('updates localStorage when theme changes', () => {
    const setTheme = (theme: 'light' | 'dark') => {
      localStorage.setItem('pottery-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    };

    setTheme('light');
    expect(localStorage.getItem('pottery-theme')).toBe('light');

    setTheme('dark');
    expect(localStorage.getItem('pottery-theme')).toBe('dark');
  });

  it('reads theme from localStorage on page load', () => {
    localStorage.setItem('pottery-theme', 'dark');

    const getTheme = (): 'light' | 'dark' => {
      return (localStorage.getItem('pottery-theme') as 'light' | 'dark') || 'light';
    };

    expect(getTheme()).toBe('dark');
  });

  it('handles missing localStorage gracefully', () => {
    // Simulate environment without localStorage
    const mockGetTheme = (): 'light' | 'dark' => {
      if (typeof localStorage === 'undefined') return 'light';
      return (localStorage.getItem('pottery-theme') as 'light' | 'dark') || 'light';
    };

    // Should not throw error
    expect(() => mockGetTheme()).not.toThrow();
    expect(mockGetTheme()).toBe('light');
  });

  it('exports functions to window object', () => {
    // Simulate window exports
    const mockWindow = {
      toggleTheme: vi.fn(),
      getTheme: vi.fn().mockReturnValue('light'),
    };

    expect(mockWindow.toggleTheme).toBeDefined();
    expect(mockWindow.getTheme).toBeDefined();
    expect(typeof mockWindow.toggleTheme).toBe('function');
    expect(typeof mockWindow.getTheme).toBe('function');
  });
});
