/**
 * Main entry point for the GKI Kernel Versions dashboard
 */

import './styles/main.scss';

import { i18n } from './i18n';
import { themeManager } from './theme';
import { search } from './search';
import { timeConverter } from './time-converter';
import { backToTop } from './back-to-top';
import { modal } from './modal';
import { announcement } from './announcement';
import { toast } from './toast';
import { loadKernelData } from './data-loader';

class App {
  init(): void {
    this.setupI18n();
    this.setupTheme();
    this.initModules();
    this.setupEventListeners();
    this.loadData();
  }

  private setupI18n(): void {
    const t = i18n.t;
    document.documentElement.lang = i18n.lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t.title;

    const elements = {
      headerTitle: t.title,
      headerSubtitle: t.subtitle,
      loadingText: t.loading,
      footerPre: t.footerPre,
      footerPost: t.footerPost,
      tcTitle: t.tcTitle,
      tcDateLabel: t.tcDate,
      tcTimeLabel: t.tcTime,
      tcCopy: t.copy,
      guideLabel: t.guide,
      langLabel: t.langSwitch,
    };

    Object.entries(elements).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });

    document.getElementById('langToggle')?.addEventListener('click', () => {
      i18n.toggleLang();
    });
  }

  private setupTheme(): void {
    themeManager.init();
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');

    if (themeIcon) themeIcon.textContent = themeManager.getThemeIcon();
    if (themeLabel) themeLabel.textContent = themeManager.getThemeLabel();

    themeToggle?.addEventListener('click', () => {
      themeManager.cycleTheme();
      if (themeIcon) themeIcon.textContent = themeManager.getThemeIcon();
      if (themeLabel) themeLabel.textContent = themeManager.getThemeLabel();
    });
  }

  private initModules(): void {
    modal.init();
    announcement.init();
    search.init();
    timeConverter.init();
    backToTop.init();
    toast.init();
  }

  private setupEventListeners(): void {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        modal.hide();
        announcement.hide();
      }
    });
  }

  private async loadData(): Promise<void> {
    await Promise.all([loadKernelData(), announcement.load()]);
  }
}

const app = new App();
app.init();
