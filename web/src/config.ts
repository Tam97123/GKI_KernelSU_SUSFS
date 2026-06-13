/**
 * Global configuration constants
 */

import type { DataFileMeta } from './types';

export const DATA_FILES: DataFileMeta[] = [
  { android: 'android12', kernel: '5.10', label: 'android12 / 5.10', deprecatedCutoff: '2024-08' },
  { android: 'android13', kernel: '5.15', label: 'android13 / 5.15', deprecatedCutoff: '2024-09' },
  { android: 'android14', kernel: '6.1', label: 'android14 / 6.1', deprecatedCutoff: '2024-09' },
  { android: 'android15', kernel: '6.6', label: 'android15 / 6.6', deprecatedCutoff: '' },
  { android: 'android16', kernel: '6.12', label: 'android16 / 6.12', deprecatedCutoff: '' },
];

export const RUNTIME_CACHE_KEY = Date.now().toString(36);

export const SUSFS_COMPAT_MIN: Record<string, number> = {
  '5.10': 218,
  '5.15': 148,
  '6.1': 145,
  '6.6': 98,
  '6.12': 0,
};

export const GOATCOUNTER_URL = 'https://zzh20188.goatcounter.com/count';
export const GITHUB_REPO = 'https://github.com/zzh20188/GKI_KernelSU_SUSFS';
export const DATA_SOURCE = 'https://android.googlesource.com/kernel/common';
