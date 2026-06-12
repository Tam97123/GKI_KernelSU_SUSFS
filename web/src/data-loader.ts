/**
 * Data loading and orchestration
 */

import type { DatasetWithMeta } from './types';
import { DATA_FILES } from './config';
import { fetchJsonFresh } from './utils';
import { i18n } from './i18n';
import { renderTabs, renderPanels, animateCounters } from './render';

export async function loadKernelData(): Promise<void> {
  const content = document.getElementById('content');
  if (!content) return;

  try {
    const results = await Promise.allSettled(
      DATA_FILES.map(meta =>
        fetchJsonFresh(`data/${meta.android}/${meta.kernel}.json`).then(data => ({
          meta,
          data,
        }))
      )
    );

    const datasets: DatasetWithMeta[] = results
      .filter((r): r is PromiseFulfilledResult<DatasetWithMeta> => r.status === 'fulfilled')
      .map(r => r.value);

    if (datasets.length === 0) {
      throw new Error('No data loaded');
    }

    renderTabs(datasets);
    renderPanels(datasets);

    const firstTab = document.querySelector<HTMLElement>('.tab');
    const firstPanel = document.querySelector<HTMLElement>('.tab-panel.active');
    if (firstTab && firstPanel) {
      animateCounters(firstPanel);
    }
  } catch (err) {
    console.error('Failed to load kernel data:', err);
    const t = i18n.t;
    content.innerHTML = `
      <div class="error">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>${t.errorTitle}</p>
        <p style="margin-top:0.5rem;color:var(--text-muted);font-size:0.875rem">${t.errorHint}</p>
      </div>
    `;
  }
}
