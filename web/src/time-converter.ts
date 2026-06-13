/**
 * Time converter utility
 */

import { copyText } from './utils';
import { i18n } from './i18n';
import { showCopyToast } from './toast';

class TimeConverter {
  private dateInput: HTMLInputElement | null = null;
  private timeInput: HTMLInputElement | null = null;
  private resultEl: HTMLElement | null = null;
  private copyBtn: HTMLElement | null = null;

  init(): void {
    this.dateInput = document.getElementById('tcDate') as HTMLInputElement;
    this.timeInput = document.getElementById('tcTime') as HTMLInputElement;
    this.resultEl = document.getElementById('tcResult');
    this.copyBtn = document.getElementById('tcCopy');

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toISOString().split('T')[1]?.substring(0, 8);

    if (this.dateInput) this.dateInput.value = dateStr!;
    if (this.timeInput) this.timeInput.value = timeStr!;

    this.dateInput?.addEventListener('change', () => this.update());
    this.timeInput?.addEventListener('input', () => this.update());
    this.copyBtn?.addEventListener('click', () => this.copy());

    this.update();
  }

  private update(): void {
    if (!this.dateInput || !this.timeInput || !this.resultEl) return;

    const date = this.dateInput.value;
    const time = this.timeInput.value;

    if (!date || !time) {
      this.resultEl.textContent = '—';
      return;
    }

    try {
      const timestamp = Math.floor(new Date(`${date}T${time}Z`).getTime() / 1000);
      this.resultEl.textContent = timestamp.toString();
    } catch {
      this.resultEl.textContent = '—';
    }
  }

  private async copy(): Promise<void> {
    if (!this.resultEl || !this.copyBtn) return;
    const text = this.resultEl.textContent;
    if (!text || text === '—') return;

    await copyText(text);
    const originalText = this.copyBtn.textContent;
    this.copyBtn.textContent = i18n.t.copied;
    showCopyToast();
    setTimeout(() => {
      this.copyBtn!.textContent = originalText;
    }, 1500);
  }
}

export const timeConverter = new TimeConverter();
