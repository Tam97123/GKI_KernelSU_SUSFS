/**
 * Render kernel data cards and statistics
 */

import type { DatasetWithMeta } from './types';
import { i18n } from './i18n';
import { isDeprecated, isSusfsCompatible } from './utils';
import { SUSFS_COMPAT_MIN } from './config';
import { modal } from './modal';

export function renderTabs(datasets: DatasetWithMeta[]): void {
  const tabsContainer = document.getElementById('tabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = datasets
    .map((ds, index) => {
      const deprecated = isDeprecated(ds.meta.deprecatedCutoff);
      return `
        <button class="tab ${index === 0 ? 'active' : ''}" data-index="${index}">
          ${ds.meta.label}
          ${deprecated ? '<span class="tab-deprecated"></span>' : ''}
        </button>
      `;
    })
    .join('');

  tabsContainer.querySelectorAll('.tab').forEach((tab, index) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.querySelector(`.tab-panel[data-index="${index}"]`);
      panel?.classList.add('active');

      animateCounters(panel as HTMLElement);
    });
  });
}

export function renderPanels(datasets: DatasetWithMeta[]): void {
  const content = document.getElementById('content');
  if (!content) return;

  content.innerHTML = datasets
    .map((ds, index) => {
      const t = i18n.t;
      const { meta, data } = ds;
      const { entries } = data;
      const deprecated = isDeprecated(meta.deprecatedCutoff);
      const minSusfs = SUSFS_COMPAT_MIN[meta.kernel] ?? 0;

      const firstEntry = entries[0];
      const latestEntry = entries[entries.length - 1];
      const latestKernel = data.lts;

      return `
        <div class="tab-panel ${index === 0 ? 'active' : ''}" data-index="${index}">
          ${
            deprecated
              ? `
            <div class="deprecated-notice">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div>
                <strong>${t.deprecated}</strong>
                <span>${t.deprecatedInfo}</span>
              </div>
            </div>
          `
              : ''
          }

          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-label">${t.releases}</div>
              <div class="stat-value" data-count="${entries.length}">0</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">${t.first}</div>
              <div class="stat-value">${firstEntry?.date || '—'}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">${t.latest}</div>
              <div class="stat-value">${latestEntry?.date || '—'}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">${t.latestKernel}</div>
              <div class="stat-value">${latestKernel}</div>
            </div>
          </div>

          <div class="cards-grid">
            ${entries
              .map((entry, entryIndex) => {
                const isNew = entryIndex === entries.length - 1;
                const susfsCompat = isSusfsCompatible(entry.kernel, minSusfs);
                return `
                  <div class="kernel-card ${deprecated ? 'deprecated' : ''}"
                       data-date="${entry.date}"
                       data-kernel="${entry.kernel}"
                       data-dataset="${index}"
                       data-entry="${entryIndex}">
                    <div class="card-header">
                      <span class="card-date">${entry.date}</span>
                      ${isNew ? `<span class="badge badge-new">${t.newBadge}</span>` : ''}
                      ${susfsCompat ? `<span class="badge badge-susfs" title="${t.susfsCompatInfo}">${t.susfsCompat}</span>` : ''}
                    </div>
                    <div class="card-body">
                      <div class="card-kernel">${entry.kernel}</div>
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      `;
    })
    .join('');

  content.querySelectorAll('.kernel-card').forEach(card => {
    card.addEventListener('click', () => {
      const datasetIndex = parseInt(card.getAttribute('data-dataset')!, 10);
      const entryIndex = parseInt(card.getAttribute('data-entry')!, 10);
      const dataset = datasets[datasetIndex];
      const entry = dataset?.data.entries[entryIndex];
      if (dataset && entry) {
        modal.show(dataset, entry);
      }
    });
  });
}

export function animateCounters(panel: HTMLElement | null): void {
  if (!panel) return;
  panel.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count!, 10);
    let current = 0;
    const duration = 800;
    const step = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toString();
    }, 16);
  });
}
