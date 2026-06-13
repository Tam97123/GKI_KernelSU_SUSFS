/**
 * Theme management with system preference support
 */

import type { Theme } from './types';
import { i18n } from './i18n';

class ThemeManager {
  private theme: Theme;
  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    const saved = (localStorage.getItem('theme') as Theme) || 'system';
    this.theme = saved;
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  }

  private getEffectiveTheme(): 'light' | 'dark' {
    if (this.theme === 'system') {
      return this.mediaQuery?.matches ? 'dark' : 'light';
    }
    return this.theme;
  }

  init(): void {
    this.applyTheme();
    this.mediaQuery?.addEventListener('change', () => {
      if (this.theme === 'system') {
        this.applyTheme();
      }
    });
  }

  private applyTheme(): void {
    const effective = this.getEffectiveTheme();
    document.documentElement.setAttribute('data-theme', effective);
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  cycleTheme(): void {
    const cycle: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = cycle.indexOf(this.theme);
    const nextIndex = (currentIndex + 1) % cycle.length;
    this.setTheme(cycle[nextIndex]!);
  }

  getTheme(): Theme {
    return this.theme;
  }

  getThemeLabel(): string {
    const t = i18n.t;
    switch (this.theme) {
      case 'light':
        return t.light;
      case 'dark':
        return t.dark;
      case 'system':
        return t.system;
    }
  }

  getThemeIcon(): string {
    const effective = this.getEffectiveTheme();
    return effective === 'dark' ? '☽' : '☀';
  }
}

export const themeManager = new ThemeManager();
