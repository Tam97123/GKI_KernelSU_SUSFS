/**
 * Toast notification component
 */

import { i18n } from './i18n';

class Toast {
  private element: HTMLElement | null = null;
  private timeoutId: number | undefined;

  init(): void {
    this.element = document.getElementById('toast');
  }

  show(message: string, duration = 3000): void {
    if (!this.element) return;

    this.element.textContent = message;
    this.element.classList.add('show');

    clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide(): void {
    if (!this.element) return;
    this.element.classList.remove('show');
  }
}

export const toast = new Toast();

export function showCopyToast(): void {
  toast.show(i18n.t.tcToast);
}
