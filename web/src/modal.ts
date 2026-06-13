/**
 * Modal dialog component
 */

import { copyText, isSusfsCompatible } from './utils';
import { SUSFS_COMPAT_MIN } from './config';
import { i18n } from './i18n';
import { showCopyToast } from './toast';
import type { KernelEntry, DatasetWithMeta } from './types';

class Modal {
  private overlay: HTMLElement | null = null;
  private closeBtn: HTMLElement | null = null;
  private body: HTMLElement | null = null;

  init(): void {
    this.overlay = document.getElementById('modal');
    this.closeBtn = document.getElementById('modalClose');
    this.body = document.getElementById('modalBody');

    this.closeBtn?.addEventListener('click', () => this.hide());
    this.overlay?.addEventListener('click', e => {
      if (e.target === this.overlay) this.hide();
    });
  }

  show(dataset: DatasetWithMeta, entry: KernelEntry): void {
    if (!this.body || !this.overlay) return;

    const t = i18n.t;
    const { meta } = dataset;
    const { kernel, date } = entry;
    const [major, minor, patch] = kernel.split('.');

    const minSusfs = SUSFS_COMPAT_MIN[meta.kernel] ?? 0;
    const susfsCompat = isSusfsCompatible(kernel, minSusfs);

    const repoInit = `repo init -u https://android.googlesource.com/kernel/manifest -b common-${meta.android}-${meta.kernel} --depth=1`;
    const susfsClone = `git clone https://gitlab.com/simonpunk/susfs4ksu.git -b gki-${meta.android} --depth=1 KernelSU/susfs4ksu`;

    this.body.innerHTML = `
      <div class="modal-row">
        <span class="modal-label">${t.modalAndroid}</span>
        <span class="modal-value">${meta.android}</span>
      </div>
      <div class="modal-row">
        <span class="modal-label">${t.modalKernel}</span>
        <span class="modal-value">${major}.${minor}</span>
      </div>
      <div class="modal-row">
        <span class="modal-label">${t.modalSublevel}</span>
        <span class="modal-value">${patch}</span>
      </div>
      <div class="modal-row">
        <span class="modal-label">${t.modalPatch}</span>
        <span class="modal-value">${date}</span>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">${t.modalSectionSource}</div>
        <div class="modal-code-block">
          <div class="modal-code-label">${t.modalRepoInit}</div>
          <div class="modal-code-content">
            <code>${repoInit}</code>
            <button class="modal-copy" data-copy="${repoInit}">${t.copy}</button>
          </div>
        </div>
      </div>

      ${
        susfsCompat
          ? `
        <div class="modal-section">
          <div class="modal-section-title">${t.modalSectionSusfs}</div>
          <div class="modal-code-block">
            <div class="modal-code-label">${t.modalSusfsClone}</div>
            <div class="modal-code-content">
              <code>${susfsClone}</code>
              <button class="modal-copy" data-copy="${susfsClone}">${t.copy}</button>
            </div>
          </div>
        </div>
      `
          : ''
      }
    `;

    this.overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    this.body.querySelectorAll<HTMLButtonElement>('.modal-copy').forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = btn.dataset.copy;
        if (!text) return;
        await copyText(text);
        const originalText = btn.textContent;
        btn.textContent = t.copied;
        btn.classList.add('copied');
        showCopyToast();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 1500);
      });
    });
  }

  hide(): void {
    if (!this.overlay) return;
    this.overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

export const modal = new Modal();
