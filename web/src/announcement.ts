/**
 * Announcement modal component
 */

import type { AnnouncementData } from './types';
import { i18n } from './i18n';
import { fetchJsonFresh } from './utils';

class Announcement {
  private overlay: HTMLElement | null = null;
  private closeBtn: HTMLElement | null = null;
  private dismissBtn: HTMLElement | null = null;
  private titleEl: HTMLElement | null = null;
  private bodyEl: HTMLElement | null = null;

  init(): void {
    this.overlay = document.getElementById('announceModal');
    this.closeBtn = document.getElementById('announceModalClose');
    this.dismissBtn = document.getElementById('announceDismissToday');
    this.titleEl = document.getElementById('announceModalTitle');
    this.bodyEl = document.getElementById('announceModalBody');

    this.closeBtn?.addEventListener('click', () => this.hide());
    document.getElementById('announceClose')?.addEventListener('click', () => this.hide());
    this.dismissBtn?.addEventListener('click', () => this.dismissToday());

    this.overlay?.addEventListener('click', e => {
      if (e.target === this.overlay) this.hide();
    });
  }

  async load(): Promise<void> {
    try {
      const data = await fetchJsonFresh<AnnouncementData>('data/announcement.json');
      if (!data.enabled) return;

      const today = new Date().toISOString().split('T')[0];
      const dismissed = localStorage.getItem('announcement-dismissed');
      if (dismissed === today) return;

      this.show(data);
    } catch (err) {
      console.warn('Failed to load announcement:', err);
    }
  }

  private show(data: AnnouncementData): void {
    if (!this.overlay || !this.titleEl || !this.bodyEl || !this.dismissBtn) return;

    const t = i18n.t;
    const lang = i18n.lang;

    this.titleEl.textContent = data.title[lang] || '';
    this.bodyEl.innerHTML = data.content[lang] || '';
    this.dismissBtn.textContent = t.announceDismiss;
    const closeBtn = document.getElementById('announceClose');
    if (closeBtn) closeBtn.textContent = t.announceClose;

    this.overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  hide(): void {
    if (!this.overlay) return;
    this.overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  dismissToday(): void {
    const today = new Date().toISOString().split('T')[0]!;
    localStorage.setItem('announcement-dismissed', today);
    this.hide();
  }
}

export const announcement = new Announcement();
