/**
 * Utility functions
 */

import { RUNTIME_CACHE_KEY } from './config';

export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

export async function fetchJsonFresh<T = unknown>(url: string): Promise<T> {
  const cacheBuster = `?v=${RUNTIME_CACHE_KEY}`;
  const response = await fetch(url + cacheBuster);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
}

export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  return `${year}-${month?.padStart(2, '0')}`;
}

export function parseKernelVersion(version: string): {
  major: number;
  minor: number;
  patch: number;
} {
  const parts = version.split('.').map(Number);
  return {
    major: parts[0] || 0,
    minor: parts[1] || 0,
    patch: parts[2] || 0,
  };
}

export function isDeprecated(cutoff: string): boolean {
  if (!cutoff) return false;
  const now = new Date();
  const [year, month] = cutoff.split('-').map(Number);
  const cutoffDate = new Date(year!, month! - 1, 1);
  return now > cutoffDate;
}

export function isSusfsCompatible(kernelVersion: string, minSublevel: number): boolean {
  const { patch } = parseKernelVersion(kernelVersion);
  return patch >= minSublevel;
}

export function clsx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
