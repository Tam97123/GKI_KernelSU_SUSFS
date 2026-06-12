/**
 * Search functionality
 */

import { debounce } from './utils';
import { i18n } from './i18n';

class Search {
  private input: HTMLInputElement | null = null;
  private toggle: HTMLElement | null = null;
  private isOpen = false;

  init(): void {
    this.input = document.getElementById('searchInput') as HTMLInputElement;
    this.toggle = document.getElementById('searchToggle');

    this.toggle?.addEventListener('click', () => this.toggleSearch());
    this.input?.addEventListener(
      'input',
      debounce(() => this.handleSearch(), 300)
    );
    this.input?.addEventListener('blur', () => {
      setTimeout(() => this.closeSearch(), 200);
    });

    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleSearch();
      }
      if (e.key === 'Escape' && this.isOpen) {
        this.closeSearch();
      }
    });
  }

  private toggleSearch(): void {
    if (this.isOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  private openSearch(): void {
    if (!this.input || !this.toggle) return;
    this.isOpen = true;
    this.input.style.display = 'block';
    this.input.placeholder = i18n.t.searchPlaceholder;
    setTimeout(() => {
      this.input?.focus();
    }, 100);
  }

  private closeSearch(): void {
    if (!this.input) return;
    this.isOpen = false;
    this.input.style.display = 'none';
    this.input.value = '';
    this.clearSearch();
  }

  private handleSearch(): void {
    if (!this.input) return;
    const query = this.input.value.trim().toLowerCase();

    if (!query) {
      this.clearSearch();
      return;
    }

    const cards = document.querySelectorAll<HTMLElement>('.kernel-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const date = card.dataset.date?.toLowerCase() || '';
      const kernel = card.dataset.kernel?.toLowerCase() || '';
      const matches = date.includes(query) || kernel.includes(query);

      if (matches) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    this.updateNoResults(visibleCount === 0);
  }

  private clearSearch(): void {
    const cards = document.querySelectorAll<HTMLElement>('.kernel-card');
    cards.forEach(card => {
      card.style.display = '';
    });
    this.updateNoResults(false);
  }

  private updateNoResults(show: boolean): void {
    let noResultsEl = document.querySelector('.search-no-results');
    if (show && !noResultsEl) {
      const activePanel = document.querySelector('.tab-panel.active');
      if (activePanel) {
        noResultsEl = document.createElement('div');
        noResultsEl.className = 'search-no-results';
        noResultsEl.textContent = i18n.t.noResults;
        activePanel.appendChild(noResultsEl);
      }
    } else if (!show && noResultsEl) {
      noResultsEl.remove();
    }
  }
}

export const search = new Search();
