/**
 * Back to top button
 */

class BackToTop {
  private button: HTMLElement | null = null;

  init(): void {
    this.button = document.getElementById('backToTop');
    this.button?.addEventListener('click', () => this.scrollToTop());

    window.addEventListener('scroll', () => this.toggleVisibility(), { passive: true });
    this.toggleVisibility();
  }

  private toggleVisibility(): void {
    if (!this.button) return;
    if (window.scrollY > 300) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export const backToTop = new BackToTop();
