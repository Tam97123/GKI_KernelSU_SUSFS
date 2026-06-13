/**
 * Internationalization (i18n) module
 */

import type { Language, TranslationStrings } from './types';

const translations: Record<Language, TranslationStrings> = {
  en: {
    title: 'GKI Kernel Versions',
    subtitle: 'Android Generic Kernel Image — version tracking dashboard',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    loading: 'Loading kernel data…',
    errorTitle: 'Failed to load kernel data.',
    errorHint: 'Make sure <code>data/</code> contains the JSON files.',
    releases: 'Releases',
    first: 'First',
    latest: 'Latest',
    latestKernel: 'Latest Kernel',
    date: 'Security Patch',
    kernelVersion: 'Kernel Version',
    deprecated: 'Deprecated',
    deprecatedInfo: 'No longer receives security patch merges',
    susfsCompatInfo: 'SUSFS patches work directly after installing KSU, no extra patching needed',
    footerPre: 'Data sourced from',
    footerPost: '. Updated automatically via GitHub Actions.',
    announce: 'Announcement',
    announceClose: 'Close',
    announceDismiss: "Don't show today",
    modalTitle: 'GitHub Action Parameters',
    modalAndroid: 'Android Version',
    modalKernel: 'Kernel Version',
    modalSublevel: 'Sublevel',
    modalPatch: 'Security Patch Level',
    modalSectionSource: 'Source Code',
    modalRepoInit: 'Repo Init',
    modalSectionSusfs: 'SUSFS Patch',
    modalSusfsClone: 'Clone',
    copy: 'Copy',
    copied: 'Copied',
    tcTitle: 'Time Converter',
    tcDate: 'Date',
    tcTime: 'Time (UTC)',
    tcToast: 'Copied to clipboard',
    langSwitch: '中文',
    searchPlaceholder: 'Search date or kernel version…',
    noResults: 'No matching results',
    newBadge: 'NEW',
    susfsCompat: 'SUSFS',
    guide: 'Guide',
  },
  zh: {
    title: 'GKI 内核版本',
    subtitle: 'Android 通用内核镜像 — 版本跟踪看板',
    light: '浅色',
    dark: '深色',
    system: '跟随系统',
    loading: '正在加载内核数据…',
    errorTitle: '加载内核数据失败。',
    errorHint: '请确保 <code>data/</code> 包含 JSON 文件。',
    releases: '发布数',
    first: '起始',
    latest: '最新',
    latestKernel: '最新内核',
    date: '安全补丁日期',
    kernelVersion: '内核版本',
    deprecated: '已弃用',
    deprecatedInfo: '不再接受安全补丁的合并',
    susfsCompatInfo: '安装 KSU 后可直接使用 SUSFS 补丁，无需二次修复',
    footerPre: '数据来源于',
    footerPost: '。通过 GitHub Actions 自动更新。',
    announce: '公告',
    announceClose: '关闭',
    announceDismiss: '今日不再显示',
    modalTitle: 'GitHub Action 参数',
    modalAndroid: 'Android 版本',
    modalKernel: '内核版本',
    modalSublevel: '子版本号',
    modalPatch: '安全补丁级别',
    modalSectionSource: '源码拉取',
    modalRepoInit: 'Repo 初始化',
    modalSectionSusfs: 'SUSFS 补丁拉取',
    modalSusfsClone: '克隆',
    copy: '复制',
    copied: '已复制',
    tcTitle: '时间转换',
    tcDate: '日期',
    tcTime: '时间 (UTC)',
    tcToast: '已复制到剪贴板',
    langSwitch: 'EN',
    searchPlaceholder: '搜索日期或内核版本…',
    noResults: '无匹配结果',
    newBadge: '最新',
    susfsCompat: 'SUSFS兼容',
    guide: '教程',
  },
};

class I18n {
  private currentLang: Language;
  private translations: Record<Language, TranslationStrings>;

  constructor() {
    const saved = localStorage.getItem('lang') as Language | null;
    const browserLang = /^zh\b/i.test(navigator.language) ? 'zh' : 'en';
    this.currentLang = saved || browserLang;
    this.translations = translations;
  }

  get lang(): Language {
    return this.currentLang;
  }

  get t(): TranslationStrings {
    return this.translations[this.currentLang];
  }

  setLang(lang: Language): void {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }

  toggleLang(): void {
    const newLang = this.currentLang === 'zh' ? 'en' : 'zh';
    this.setLang(newLang);
    location.reload();
  }
}

export const i18n = new I18n();
export const t = i18n.t;
