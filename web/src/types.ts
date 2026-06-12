/**
 * Type definitions for the GKI kernel data structures
 */

export interface KernelEntry {
  date: string;
  kernel: string;
}

export interface KernelDataset {
  android_version: string;
  kernel_version: string;
  lts: string;
  entries: KernelEntry[];
}

export interface DataFileMeta {
  android: string;
  kernel: string;
  label: string;
  deprecatedCutoff: string;
}

export interface DatasetWithMeta {
  meta: DataFileMeta;
  data: KernelDataset;
}

export interface AnnouncementData {
  enabled: boolean;
  title: {
    en: string;
    zh: string;
  };
  content: {
    en: string;
    zh: string;
  };
}

export type Language = 'en' | 'zh';
export type Theme = 'light' | 'dark' | 'system';

export interface TranslationStrings {
  title: string;
  subtitle: string;
  light: string;
  dark: string;
  system: string;
  loading: string;
  errorTitle: string;
  errorHint: string;
  releases: string;
  first: string;
  latest: string;
  latestKernel: string;
  date: string;
  kernelVersion: string;
  deprecated: string;
  deprecatedInfo: string;
  susfsCompatInfo: string;
  footerPre: string;
  footerPost: string;
  announce: string;
  announceClose: string;
  announceDismiss: string;
  modalTitle: string;
  modalAndroid: string;
  modalKernel: string;
  modalSublevel: string;
  modalPatch: string;
  modalSectionSource: string;
  modalRepoInit: string;
  modalSectionSusfs: string;
  modalSusfsClone: string;
  copy: string;
  copied: string;
  tcTitle: string;
  tcDate: string;
  tcTime: string;
  tcToast: string;
  langSwitch: string;
  searchPlaceholder: string;
  noResults: string;
  newBadge: string;
  susfsCompat: string;
  guide: string;
}
